export const WORLDS = {
  BASICS: 1,
  ADVANCED: 2,
  MASTERY: 3,
  CREATIVE: 4,
} as const

export const QUEST_TYPES = {
  TUTORIAL: 'tutorial',
  PRACTICE: 'practice',
  CHALLENGE: 'challenge',
  BOSS: 'boss',
} as const

export const DIFFICULTY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  EXPERT: 'expert',
} as const

export const BADGE_RARITIES = {
  COMMON: 'common',
  RARE: 'rare',
  EPIC: 'epic',
  LEGENDARY: 'legendary',
} as const

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  ACHIEVEMENT: 'achievement',
} as const

export const XP_REQUIREMENTS = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 1000,
  6: 1750,
  7: 2750,
  8: 4250,
  9: 6500,
  10: 10000,
  11: 15000,
  12: 22500,
  13: 33750,
  14: 50625,
  15: 75937,
  16: 113906,
  17: 170859,
  18: 256289,
  19: 384433,
  20: 576650,
  21: 864975,
  22: 1297462,
  23: 1946194,
  24: 2919291,
  25: 4378937,
} as const

export const WORLD_THEMES = {
  [WORLDS.BASICS]: {
    name: 'Prompt Fundamentals',
    color: '#10b981',
    gradient: 'from-emerald-500 to-green-600',
    icon: '📚',
  },
  [WORLDS.ADVANCED]: {
    name: 'Advanced Techniques',
    color: '#3b82f6',
    gradient: 'from-blue-500 to-indigo-600',
    icon: '🧠',
  },
  [WORLDS.MASTERY]: {
    name: 'AI Mastery',
    color: '#8b5cf6',
    gradient: 'from-violet-500 to-purple-600',
    icon: '✨',
  },
  [WORLDS.CREATIVE]: {
    name: 'Creative Applications',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    icon: '🎨',
  },
} as const

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',
    VALIDATE: '/api/auth/validate',
  },
  USER: {
    PROFILE: '/api/user/profile',
    PROGRESS: '/api/user/progress',
    STATS: '/api/user/stats',
    ACHIEVEMENTS: '/api/user/achievements',
  },
  GAME: {
    WORLDS: '/api/game/worlds',
    QUESTS: '/api/game/quests',
    CHALLENGES: '/api/game/challenges',
    LEADERBOARD: '/api/game/leaderboard',
  },
  PROMPT: {
    SUBMIT: '/api/prompt/submit',
    EVALUATE: '/api/prompt/evaluate',
    HISTORY: '/api/prompt/history',
  },
} as const

export const GAME_CONFIG = {
  MAX_ATTEMPTS_PER_QUEST: 3,
  DAILY_QUEST_RESET_HOUR: 0, // UTC
  STREAK_RESET_HOURS: 24,
  LEADERBOARD_UPDATE_INTERVAL: 300, // 5 minutes
  XP_MULTIPLIER_STREAK: {
    3: 1.1,
    7: 1.2,
    14: 1.3,
    30: 1.5,
  },
  BADGE_UNLOCK_DELAY: 2000, // 2 seconds
  LEVEL_UP_ANIMATION_DURATION: 3000, // 3 seconds
} as const

export const PROMPT_EVALUATION = {
  CRITERIA: {
    CLARITY: 'clarity',
    SPECIFICITY: 'specificity',
    CREATIVITY: 'creativity',
    EFFECTIVENESS: 'effectiveness',
  },
  WEIGHTS: {
    CLARITY: 0.25,
    SPECIFICITY: 0.25,
    CREATIVITY: 0.25,
    EFFECTIVENESS: 0.25,
  },
  SCORE_RANGES: {
    EXCELLENT: [90, 100],
    GOOD: [75, 89],
    SATISFACTORY: [60, 74],
    NEEDS_IMPROVEMENT: [0, 59],
  },
} as const