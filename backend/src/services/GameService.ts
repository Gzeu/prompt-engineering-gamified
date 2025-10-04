import { World, Quest, Challenge } from '@/types/game'
import { gameData } from '@/data/gameData'
import { AppError } from '@/middleware/errorHandler'

export class GameService {
  async getWorlds(): Promise<World[]> {
    return gameData.worlds
  }

  async getWorld(worldId: number): Promise<World | null> {
    return gameData.worlds.find(w => w.id === worldId) || null
  }

  async getWorldQuests(worldId: number): Promise<Quest[]> {
    return gameData.quests.filter(q => q.worldId === worldId)
  }

  async getQuest(questId: string): Promise<Quest | null> {
    return gameData.quests.find(q => q.id === questId) || null
  }

  async getActiveChallenges(): Promise<Challenge[]> {
    const now = new Date()
    return gameData.challenges.filter(
      c => c.startDate <= now && c.endDate >= now
    )
  }

  async getUserWorldProgress(userId: string, worldId?: number): Promise<any[]> {
    // Mock progress data - replace with real database queries
    const mockProgress = [
      {
        worldId: 1,
        unlocked: true,
        completed: true,
        progress: 100,
        completedQuests: ['basics-1', 'basics-2', 'basics-3', 'basics-boss'],
        bossDefeated: true,
        startedAt: new Date('2024-01-15'),
        completedAt: new Date('2024-01-20')
      },
      {
        worldId: 2,
        unlocked: true,
        completed: false,
        progress: 65,
        completedQuests: ['advanced-1', 'advanced-2'],
        bossDefeated: false,
        startedAt: new Date('2024-01-20')
      },
      {
        worldId: 3,
        unlocked: false,
        completed: false,
        progress: 0,
        completedQuests: [],
        bossDefeated: false
      },
      {
        worldId: 4,
        unlocked: false,
        completed: false,
        progress: 0,
        completedQuests: [],
        bossDefeated: false
      }
    ]

    if (worldId) {
      return mockProgress.filter(p => p.worldId === worldId)
    }
    
    return mockProgress
  }

  async getUserQuestProgress(userId: string, worldId?: number, questId?: string): Promise<any[]> {
    // Mock quest progress data
    const mockQuestProgress = [
      {
        questId: 'basics-1',
        status: 'completed',
        progress: 100,
        attempts: 1,
        bestScore: 95,
        objectives: [],
        startedAt: new Date('2024-01-15'),
        completedAt: new Date('2024-01-15')
      },
      {
        questId: 'basics-2',
        status: 'completed',
        progress: 100,
        attempts: 2,
        bestScore: 87,
        objectives: [],
        startedAt: new Date('2024-01-16'),
        completedAt: new Date('2024-01-16')
      },
      {
        questId: 'advanced-1',
        status: 'in_progress',
        progress: 60,
        attempts: 1,
        bestScore: 0,
        objectives: [],
        startedAt: new Date('2024-01-20')
      }
    ]

    let filtered = mockQuestProgress
    
    if (worldId) {
      const worldQuests = await this.getWorldQuests(worldId)
      const questIds = worldQuests.map(q => q.id)
      filtered = filtered.filter(p => questIds.includes(p.questId))
    }
    
    if (questId) {
      filtered = filtered.filter(p => p.questId === questId)
      return filtered.length > 0 ? filtered[0] : null
    }
    
    return filtered
  }

  async getUserChallengeProgress(userId: string): Promise<any[]> {
    // Mock challenge progress
    return [
      {
        challengeId: 'daily-prompt-1',
        status: 'completed',
        score: 92,
        rank: 15,
        completionTime: 450,
        submissions: [
          {
            id: 'sub-1',
            prompt: 'Create a prompt for creative writing',
            output: 'Generated creative prompt',
            score: 92,
            feedback: 'Excellent creativity and structure',
            submittedAt: new Date()
          }
        ]
      }
    ]
  }

  async getUserAchievements(userId: string): Promise<any[]> {
    // Mock achievements
    return [
      {
        id: 'first-quest',
        name: 'First Steps',
        title: 'Prompt Pioneer',
        description: 'Complete your first quest',
        icon: '🎯',
        rarity: 'common',
        category: 'progress',
        unlockedAt: new Date('2024-01-15')
      },
      {
        id: 'world-complete',
        name: 'World Conqueror',
        title: 'Master Explorer',
        description: 'Complete an entire world',
        icon: '🏆',
        rarity: 'rare',
        category: 'progress',
        unlockedAt: new Date('2024-01-20')
      }
    ]
  }

  async getLeaderboard(type: string = 'global', limit: number = 50): Promise<any[]> {
    // Mock leaderboard data
    return [
      {
        userId: 'user-1',
        username: 'PromptMaster',
        level: 15,
        xp: 25000,
        rank: 1,
        avatar: null,
        badges: 12,
        completedQuests: 45
      },
      {
        userId: 'user-2',
        username: 'AIWizard',
        level: 12,
        xp: 18500,
        rank: 2,
        avatar: null,
        badges: 8,
        completedQuests: 38
      },
      {
        userId: 'demo-user-1',
        username: 'Demo User',
        level: 5,
        xp: 1750,
        rank: 3,
        avatar: null,
        badges: 3,
        completedQuests: 12
      }
    ].slice(0, limit)
  }

  async submitQuestSolution(userId: string, questId: string, solution: any): Promise<any> {
    // Mock quest evaluation
    const quest = await this.getQuest(questId)
    if (!quest) {
      throw new AppError('Quest not found', 404)
    }

    // Simulate evaluation logic
    const score = Math.floor(Math.random() * 40) + 60 // Random score 60-100
    const passed = score >= 70
    
    return {
      questId,
      score,
      passed,
      feedback: passed 
        ? 'Excellent work! Your prompt demonstrates clear understanding.'
        : 'Good effort! Consider improving clarity and specificity.',
      xpEarned: passed ? quest.rewards.xp : Math.floor(quest.rewards.xp * 0.3),
      attempts: 1
    }
  }

  async submitChallenge(userId: string, challengeId: string, submission: any): Promise<any> {
    // Mock challenge submission
    const challenge = gameData.challenges.find(c => c.id === challengeId)
    if (!challenge) {
      throw new AppError('Challenge not found', 404)
    }

    const score = Math.floor(Math.random() * 40) + 60
    const rank = Math.floor(Math.random() * 100) + 1
    
    return {
      challengeId,
      score,
      rank,
      feedback: 'Your submission shows creativity and technical skill.',
      xpEarned: challenge.rewards.participation.xp + (rank <= 10 ? 500 : 0)
    }
  }
}