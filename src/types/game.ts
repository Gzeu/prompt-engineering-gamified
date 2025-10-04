export interface World {
  id: number
  name: string
  title: string
  description: string
  icon: string
  gradient: string
  unlockLevel: number
  quests: Quest[]
  boss?: BossChallenge
  rewards: WorldRewards
}

export interface Quest {
  id: string
  worldId: number
  name: string
  title: string
  description: string
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  type: 'tutorial' | 'practice' | 'challenge' | 'boss'
  prerequisites: string[]
  objectives: QuestObjective[]
  rewards: QuestRewards
  timeLimit?: number // in minutes
  attempts?: number
  unlockLevel: number
  tags: string[]
  content: QuestContent
}

export interface QuestObjective {
  id: string
  description: string
  type: 'prompt_quality' | 'response_accuracy' | 'creativity' | 'efficiency'
  target: number
  current: number
  completed: boolean
}

export interface QuestContent {
  instructions: string
  examples?: PromptExample[]
  hints?: string[]
  resources?: string[]
  prompt?: string
  expectedOutput?: string
  evaluationCriteria: EvaluationCriteria[]
}

export interface PromptExample {
  prompt: string
  output: string
  explanation: string
  rating: number
}

export interface EvaluationCriteria {
  name: string
  description: string
  weight: number
  maxScore: number
}

export interface QuestRewards {
  xp: number
  badges?: string[]
  items?: string[]
  unlocks?: string[]
}

export interface WorldRewards {
  xp: number
  badge: string
  title: string
  unlocks: string[]
}

export interface BossChallenge extends Quest {
  phases: BossPhase[]
  specialMechanics: string[]
  leaderboard: boolean
}

export interface BossPhase {
  id: string
  name: string
  description: string
  objectives: QuestObjective[]
  timeLimit: number
}

export interface Challenge {
  id: string
  name: string
  title: string
  description: string
  type: 'daily' | 'weekly' | 'monthly' | 'special'
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme'
  startDate: Date
  endDate: Date
  participants: number
  rewards: ChallengeRewards
  leaderboard: ChallengeLeaderboard[]
  requirements: string[]
}

export interface ChallengeRewards {
  first: Reward
  second: Reward
  third: Reward
  participation: Reward
}

export interface Reward {
  xp: number
  badges: string[]
  items: string[]
  titles: string[]
}

export interface ChallengeLeaderboard {
  userId: string
  username: string
  score: number
  rank: number
  completionTime: number
  avatar?: string
}

export interface Achievement {
  id: string
  name: string
  title: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  category: 'progress' | 'skill' | 'social' | 'special'
  requirements: AchievementRequirement[]
  rewards: AchievementRewards
  hidden: boolean
  progress?: number
  maxProgress?: number
}

export interface AchievementRequirement {
  type: string
  target: number
  description: string
}

export interface AchievementRewards {
  xp: number
  badge: string
  title?: string
}

export interface UserProgress {
  userId: string
  worldProgress: WorldProgress[]
  questProgress: QuestProgress[]
  challengeProgress: ChallengeProgress[]
  achievements: string[]
  stats: ProgressStats
}

export interface WorldProgress {
  worldId: number
  unlocked: boolean
  completed: boolean
  progress: number // 0-100
  completedQuests: string[]
  bossDefeated: boolean
  startedAt?: Date
  completedAt?: Date
}

export interface QuestProgress {
  questId: string
  status: 'locked' | 'available' | 'in_progress' | 'completed' | 'failed'
  progress: number // 0-100
  attempts: number
  bestScore: number
  objectives: ObjectiveProgress[]
  startedAt?: Date
  completedAt?: Date
}

export interface ObjectiveProgress {
  objectiveId: string
  completed: boolean
  progress: number
  value: number
}

export interface ChallengeProgress {
  challengeId: string
  status: 'not_started' | 'in_progress' | 'completed' | 'failed'
  score: number
  rank?: number
  completionTime?: number
  submissions: ChallengeSubmission[]
}

export interface ChallengeSubmission {
  id: string
  prompt: string
  output: string
  score: number
  feedback: string
  submittedAt: Date
}

export interface ProgressStats {
  totalXp: number
  totalQuests: number
  totalChallenges: number
  totalAchievements: number
  averageScore: number
  streakDays: number
  timeSpent: number // in minutes
}