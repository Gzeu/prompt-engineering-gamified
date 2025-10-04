export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  level: number
  xp: number
  xpToNextLevel: number
  totalXp: number
  rank: number
  badges: Badge[]
  completedQuests: string[]
  currentWorld: number
  guild?: Guild
  preferences: UserPreferences
  stats: UserStats
  createdAt: Date
  lastLoginAt: Date
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  category: string
  unlockedAt: Date
}

export interface Guild {
  id: string
  name: string
  description: string
  memberCount: number
  level: number
  xp: number
  rank: number
}

export interface UserPreferences {
  theme: 'dark' | 'light' | 'auto'
  notifications: {
    email: boolean
    push: boolean
    achievements: boolean
    social: boolean
  }
  privacy: {
    profileVisible: boolean
    showProgress: boolean
    allowFriendRequests: boolean
  }
}

export interface UserStats {
  questsCompleted: number
  challengesWon: number
  streak: number
  longestStreak: number
  timeSpent: number // in minutes
  favoriteWorld: number
  accuracyRate: number
  averageScore: number
}