import { User } from '@/types/user'
import { v4 as uuidv4 } from 'uuid'
import { AppError } from '@/middleware/errorHandler'

// Mock database - replace with real database in production
let users: User[] = []

export class UserService {
  async findById(id: string): Promise<User | null> {
    const user = users.find(u => u.id === id)
    return user || null
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = users.find(u => u.email === email)
    return user || null
  }

  async create(userData: Omit<User, 'id'> & { id?: string; password: string }): Promise<User> {
    const user: User = {
      ...userData,
      id: userData.id || uuidv4(),
      createdAt: new Date(),
      lastLoginAt: new Date()
    }

    users.push(user)
    return user
  }

  async updateById(id: string, updates: Partial<User>): Promise<User | null> {
    const userIndex = users.findIndex(u => u.id === id)
    if (userIndex === -1) {
      return null
    }

    users[userIndex] = { ...users[userIndex], ...updates }
    return users[userIndex]
  }

  async updateLastLogin(id: string): Promise<void> {
    await this.updateById(id, { lastLoginAt: new Date() })
  }

  async addXP(id: string, xpAmount: number): Promise<User | null> {
    const user = await this.findById(id)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    const newXP = user.xp + xpAmount
    const newTotalXP = user.totalXp + xpAmount
    
    // Check for level up
    let newLevel = user.level
    let xpToNextLevel = user.xpToNextLevel
    
    while (newXP >= xpToNextLevel && newLevel < 25) {
      newLevel++
      xpToNextLevel = this.getXPRequirement(newLevel + 1) - newTotalXP
    }

    return await this.updateById(id, {
      xp: newXP >= user.xpToNextLevel ? newXP - user.xpToNextLevel : newXP,
      level: newLevel,
      totalXp: newTotalXP,
      xpToNextLevel: xpToNextLevel
    })
  }

  async addBadge(id: string, badge: any): Promise<User | null> {
    const user = await this.findById(id)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    const badges = [...user.badges, badge]
    return await this.updateById(id, { badges })
  }

  async completeQuest(id: string, questId: string): Promise<User | null> {
    const user = await this.findById(id)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    if (user.completedQuests.includes(questId)) {
      return user // Already completed
    }

    const completedQuests = [...user.completedQuests, questId]
    return await this.updateById(id, { completedQuests })
  }

  async updateStats(id: string, stats: Partial<any>): Promise<User | null> {
    const user = await this.findById(id)
    if (!user) {
      throw new AppError('User not found', 404)
    }

    const updatedStats = { ...user.stats, ...stats }
    return await this.updateById(id, { stats: updatedStats })
  }

  async getLeaderboard(limit: number = 50): Promise<User[]> {
    return users
      .sort((a, b) => b.totalXp - a.totalXp)
      .slice(0, limit)
      .map((user, index) => ({ ...user, rank: index + 1 }))
  }

  private getXPRequirement(level: number): number {
    const requirements: { [key: number]: number } = {
      1: 0, 2: 100, 3: 250, 4: 500, 5: 1000,
      6: 1750, 7: 2750, 8: 4250, 9: 6500, 10: 10000,
      11: 15000, 12: 22500, 13: 33750, 14: 50625, 15: 75937,
      16: 113906, 17: 170859, 18: 256289, 19: 384433, 20: 576650,
      21: 864975, 22: 1297462, 23: 1946194, 24: 2919291, 25: 4378937
    }
    return requirements[level] || requirements[25]
  }

  // Initialize with some demo users
  async initializeDemoData(): Promise<void> {
    if (users.length === 0) {
      const demoUsers = [
        {
          id: 'demo-user-1',
          email: 'demo@promptcraft.ai',
          name: 'Demo User',
          level: 5,
          xp: 750,
          xpToNextLevel: 1000,
          totalXp: 1750,
          rank: 1,
          badges: [],
          completedQuests: ['basics-1', 'basics-2', 'basics-3'],
          currentWorld: 2,
          preferences: {
            theme: 'dark' as const,
            notifications: {
              email: true,
              push: true,
              achievements: true,
              social: true,
            },
            privacy: {
              profileVisible: true,
              showProgress: true,
              allowFriendRequests: true,
            },
          },
          stats: {
            questsCompleted: 12,
            challengesWon: 3,
            streak: 7,
            longestStreak: 15,
            timeSpent: 480,
            favoriteWorld: 1,
            accuracyRate: 85.5,
            averageScore: 87.2,
          },
          createdAt: new Date('2024-01-15'),
          lastLoginAt: new Date(),
        }
      ]

      for (const userData of demoUsers) {
        await this.create({ ...userData, password: 'demo-password' })
      }
    }
  }
}