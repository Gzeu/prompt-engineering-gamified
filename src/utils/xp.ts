import { XP_REQUIREMENTS } from './constants'

export function calculateLevel(totalXp: number): number {
  let level = 1
  
  for (const [levelStr, requirement] of Object.entries(XP_REQUIREMENTS)) {
    const levelNum = parseInt(levelStr)
    if (totalXp >= requirement && levelNum > level) {
      level = levelNum
    }
  }
  
  return Math.min(level, 25) // Max level 25
}

export function calculateXpToNextLevel(currentLevel: number, currentXp: number): number {
  const nextLevel = Math.min(currentLevel + 1, 25)
  const nextLevelRequirement = XP_REQUIREMENTS[nextLevel as keyof typeof XP_REQUIREMENTS]
  const currentLevelRequirement = XP_REQUIREMENTS[currentLevel as keyof typeof XP_REQUIREMENTS]
  
  return nextLevelRequirement - currentLevelRequirement
}

export function calculateCurrentLevelXp(currentLevel: number, totalXp: number): number {
  const currentLevelRequirement = XP_REQUIREMENTS[currentLevel as keyof typeof XP_REQUIREMENTS]
  return totalXp - currentLevelRequirement
}

export function getXpRequirement(level: number): number {
  return XP_REQUIREMENTS[level as keyof typeof XP_REQUIREMENTS] || XP_REQUIREMENTS[25]
}

export function formatXp(xp: number): string {
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(1)}M`
  }
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K`
  }
  return xp.toString()
}

// XP rewards based on quest difficulty and performance
export function calculateXpReward(difficulty: string, score: number, baseXp: number): number {
  const difficultyMultiplier = {
    beginner: 1,
    intermediate: 1.5,
    advanced: 2,
    expert: 3
  }[difficulty] || 1
  
  const performanceMultiplier = score >= 90 ? 1.5 : score >= 80 ? 1.2 : score >= 70 ? 1 : 0.5
  
  return Math.floor(baseXp * difficultyMultiplier * performanceMultiplier)
}