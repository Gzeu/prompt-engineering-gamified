// User types
export interface User {
  id: string
  email: string
  username: string
  displayName?: string
  avatar?: string
  level: number
  xp: number
  totalXp: number
  streak: number
  lastLoginAt: Date
  createdAt: Date
  updatedAt: Date
  settings: UserSettings
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system'
  soundEnabled: boolean
  animationsEnabled: boolean
  emailNotifications: boolean
  pushNotifications: boolean
}

// Game types
export interface World {
  id: string
  name: string
  description: string
  icon: string
  color: string
  order: number
  isLocked: boolean
  requiredLevel: number
  quests: Quest[]
}

export interface Quest {
  id: string
  worldId: string
  title: string
  description: string
  type: QuestType
  difficulty: QuestDifficulty
  xpReward: number
  badgeReward?: string
  order: number
  isLocked: boolean
  requiredLevel: number
  estimatedTime: number // in minutes
  content: QuestContent
}

export enum QuestType {
  TUTORIAL = 'tutorial',
  CHALLENGE = 'challenge',
  BATTLE = 'battle',
  CREATIVE = 'creative',
  PRACTICE = 'practice'
}

export enum QuestDifficulty {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export interface QuestContent {
  instruction: string
  examples?: PromptExample[]
  hints?: string[]
  resources?: Resource[]
  evaluationCriteria: EvaluationCriteria[]
}

export interface PromptExample {
  input: string
  output: string
  explanation?: string
}

export interface Resource {
  title: string
  url: string
  type: 'article' | 'video' | 'documentation' | 'tool'
}

export interface EvaluationCriteria {
  name: string
  description: string
  weight: number // 0-1
}

// Progress tracking
export interface UserProgress {
  userId: string
  questId: string
  status: ProgressStatus
  score?: number
  submittedPrompt?: string
  feedback?: string
  completedAt?: Date
  attempts: number
  timeSpent: number // in seconds
}

export enum ProgressStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

// Achievements
export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: AchievementCategory
  rarity: AchievementRarity
  xpReward: number
  condition: AchievementCondition
}

export enum AchievementCategory {
  PROGRESS = 'progress',
  SKILL = 'skill',
  SOCIAL = 'social',
  STREAK = 'streak',
  SPECIAL = 'special'
}

export enum AchievementRarity {
  COMMON = 'common',
  RARE = 'rare',
  EPIC = 'epic',
  LEGENDARY = 'legendary'
}

export interface AchievementCondition {
  type: 'quests_completed' | 'level_reached' | 'streak_days' | 'score_achieved' | 'world_completed'
  value: number
  additional?: Record<string, any>
}

export interface UserAchievement {
  userId: string
  achievementId: string
  unlockedAt: Date
  progress: number // 0-1
}

// Leaderboard
export interface LeaderboardEntry {
  userId: string
  username: string
  displayName?: string
  avatar?: string
  level: number
  xp: number
  rank: number
  streak: number
  achievements: number
}

// Battle system
export interface Battle {
  id: string
  name: string
  description: string
  prompt: string
  timeLimit: number // in minutes
  maxParticipants: number
  startTime: Date
  endTime: Date
  status: BattleStatus
  participants: BattleParticipant[]
  winners: string[] // user IDs
}

export enum BattleStatus {
  UPCOMING = 'upcoming',
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface BattleParticipant {
  userId: string
  username: string
  submission?: string
  score?: number
  submittedAt?: Date
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Form types
export interface LoginForm {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterForm {
  email: string
  username: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export interface PromptSubmissionForm {
  prompt: string
  explanation?: string
}

// State types
export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface GameState {
  currentWorld: World | null
  currentQuest: Quest | null
  userProgress: Record<string, UserProgress>
  achievements: Achievement[]
  userAchievements: UserAchievement[]
  leaderboard: LeaderboardEntry[]
  isLoading: boolean
  error: string | null
}

// Component prop types
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
}

// Utility types
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type WithId<T> = T & { id: string }

export type WithTimestamps<T> = T & {
  createdAt: Date
  updatedAt: Date
}