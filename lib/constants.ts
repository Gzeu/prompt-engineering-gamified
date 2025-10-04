// App Configuration
export const APP_CONFIG = {
  name: 'Prompt Engineering Gamified',
  description: 'Learn prompt engineering through gamification',
  version: '0.1.0',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
} as const

// XP and Leveling
export const XP_CONFIG = {
  baseXpPerLevel: 100,
  levelMultiplier: 1.5,
  maxLevel: 100,
  dailyStreakBonus: 10,
  questCompletionBonus: 25,
} as const

// Quest Configuration
export const QUEST_CONFIG = {
  maxAttempts: 3,
  timeoutMinutes: 30,
  minScore: 70, // minimum score to pass
  perfectScore: 100,
} as const

// XP Rewards by Quest Type and Difficulty
export const XP_REWARDS = {
  tutorial: {
    beginner: 25,
    intermediate: 35,
    advanced: 50,
    expert: 75,
  },
  challenge: {
    beginner: 50,
    intermediate: 75,
    advanced: 100,
    expert: 150,
  },
  battle: {
    beginner: 100,
    intermediate: 150,
    advanced: 200,
    expert: 300,
  },
  creative: {
    beginner: 75,
    intermediate: 100,
    advanced: 150,
    expert: 225,
  },
  practice: {
    beginner: 15,
    intermediate: 25,
    advanced: 35,
    expert: 50,
  },
} as const

// World Themes and Colors
export const WORLD_THEMES = {
  basics: {
    name: 'Prompt Basics',
    color: '#10b981',
    gradient: 'from-emerald-500 to-emerald-600',
    icon: '🌱',
    description: 'Master the fundamentals of prompt engineering',
  },
  advanced: {
    name: 'Advanced Techniques',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-blue-600',
    icon: '⚡',
    description: 'Learn sophisticated prompting strategies',
  },
  mastery: {
    name: 'AI Model Mastery',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-violet-600',
    icon: '🧠',
    description: 'Optimize prompts for specific AI models',
  },
  creative: {
    name: 'Creative Applications',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-amber-600',
    icon: '🎨',
    description: 'Apply prompting to real-world scenarios',
  },
} as const

// Achievement Categories
export const ACHIEVEMENT_CATEGORIES = {
  progress: {
    name: 'Progress',
    icon: '📈',
    color: '#3b82f6',
  },
  skill: {
    name: 'Skill',
    icon: '🎯',
    color: '#10b981',
  },
  social: {
    name: 'Social',
    icon: '👥',
    color: '#8b5cf6',
  },
  streak: {
    name: 'Streak',
    icon: '🔥',
    color: '#ef4444',
  },
  special: {
    name: 'Special',
    icon: '⭐',
    color: '#f59e0b',
  },
} as const

// Rarity Colors and Values
export const RARITY_CONFIG = {
  common: {
    name: 'Common',
    color: '#6b7280',
    xpMultiplier: 1,
    dropRate: 0.6,
  },
  rare: {
    name: 'Rare',
    color: '#3b82f6',
    xpMultiplier: 1.5,
    dropRate: 0.3,
  },
  epic: {
    name: 'Epic',
    color: '#8b5cf6',
    xpMultiplier: 2,
    dropRate: 0.08,
  },
  legendary: {
    name: 'Legendary',
    color: '#f59e0b',
    xpMultiplier: 3,
    dropRate: 0.02,
  },
} as const

// Level Requirements
export const LEVEL_REQUIREMENTS = Array.from({ length: 100 }, (_, i) => {
  const level = i + 1
  return Math.floor(XP_CONFIG.baseXpPerLevel * Math.pow(XP_CONFIG.levelMultiplier, level - 1))
})

// Route Paths
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
  worlds: '/worlds',
  profile: '/profile',
  leaderboard: '/leaderboard',
  achievements: '/achievements',
  settings: '/settings',
  quest: (worldId: string, questId: string) => `/worlds/${worldId}/quests/${questId}`,
  world: (worldId: string) => `/worlds/${worldId}`,
} as const

// API Endpoints
export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    refresh: '/api/auth/refresh',
    me: '/api/auth/me',
  },
  users: {
    profile: '/api/users/profile',
    progress: '/api/users/progress',
    achievements: '/api/users/achievements',
    leaderboard: '/api/users/leaderboard',
  },
  quests: {
    list: '/api/quests',
    detail: (id: string) => `/api/quests/${id}`,
    submit: (id: string) => `/api/quests/${id}/submit`,
    progress: (id: string) => `/api/quests/${id}/progress`,
  },
  worlds: {
    list: '/api/worlds',
    detail: (id: string) => `/api/worlds/${id}`,
    progress: (id: string) => `/api/worlds/${id}/progress`,
  },
  battles: {
    list: '/api/battles',
    join: (id: string) => `/api/battles/${id}/join`,
    submit: (id: string) => `/api/battles/${id}/submit`,
  },
} as const

// Validation Constants
export const VALIDATION = {
  username: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_-]+$/,
  },
  password: {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
  },
  prompt: {
    minLength: 10,
    maxLength: 2000,
  },
  displayName: {
    minLength: 2,
    maxLength: 50,
  },
} as const

// Rate Limiting
export const RATE_LIMITS = {
  auth: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 attempts per window
  },
  api: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
  },
  quest_submission: {
    windowMs: 60 * 1000, // 1 minute
    max: 3, // 3 submissions per minute
  },
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  authToken: 'auth_token',
  refreshToken: 'refresh_token',
  userSettings: 'user_settings',
  gameProgress: 'game_progress',
  tutorialCompleted: 'tutorial_completed',
} as const

// Animation Durations (in milliseconds)
export const ANIMATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  levelUp: 800,
  xpGain: 1000,
  badgeUnlock: 600,
  questComplete: 2000,
} as const

// Sound Effects
export const SOUNDS = {
  success: '/sounds/success.mp3',
  levelUp: '/sounds/level-up.mp3',
  badgeUnlock: '/sounds/badge-unlock.mp3',
  questComplete: '/sounds/quest-complete.mp3',
  battle: '/sounds/battle.mp3',
  click: '/sounds/click.mp3',
  error: '/sounds/error.mp3',
} as const

// Error Messages
export const ERROR_MESSAGES = {
  auth: {
    invalidCredentials: 'Invalid email or password',
    emailExists: 'Email already exists',
    usernameExists: 'Username already exists',
    weakPassword: 'Password is too weak',
    tokenExpired: 'Session expired, please login again',
  },
  quest: {
    notFound: 'Quest not found',
    locked: 'Quest is locked',
    alreadyCompleted: 'Quest already completed',
    submissionFailed: 'Failed to submit quest',
    timeExpired: 'Time limit exceeded',
  },
  general: {
    networkError: 'Network error, please try again',
    serverError: 'Server error, please try again later',
    unauthorized: 'You are not authorized to perform this action',
    forbidden: 'Access denied',
  },
} as const

// Success Messages
export const SUCCESS_MESSAGES = {
  auth: {
    loginSuccess: 'Welcome back!',
    registerSuccess: 'Account created successfully!',
    logoutSuccess: 'Logged out successfully',
  },
  quest: {
    completed: 'Quest completed successfully!',
    submitted: 'Quest submitted for review',
    levelUp: 'Congratulations! You leveled up!',
    badgeUnlocked: 'New badge unlocked!',
  },
  profile: {
    updated: 'Profile updated successfully',
    settingsSaved: 'Settings saved successfully',
  },
} as const