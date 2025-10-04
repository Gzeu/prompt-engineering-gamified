import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { LEVEL_REQUIREMENTS, XP_CONFIG } from './constants'
import type { User, QuestDifficulty, QuestType } from './types'

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Calculate the level based on total XP
 */
export function calculateLevel(totalXp: number): number {
  for (let level = 1; level <= XP_CONFIG.maxLevel; level++) {
    if (totalXp < LEVEL_REQUIREMENTS[level - 1]) {
      return level - 1
    }
  }
  return XP_CONFIG.maxLevel
}

/**
 * Calculate XP required for next level
 */
export function getXpForNextLevel(currentLevel: number): number {
  if (currentLevel >= XP_CONFIG.maxLevel) {
    return LEVEL_REQUIREMENTS[XP_CONFIG.maxLevel - 1]
  }
  return LEVEL_REQUIREMENTS[currentLevel]
}

/**
 * Calculate current level progress (0-1)
 */
export function getLevelProgress(totalXp: number): number {
  const currentLevel = calculateLevel(totalXp)
  if (currentLevel >= XP_CONFIG.maxLevel) return 1
  
  const currentLevelXp = currentLevel > 1 ? LEVEL_REQUIREMENTS[currentLevel - 2] : 0
  const nextLevelXp = LEVEL_REQUIREMENTS[currentLevel - 1]
  const progressXp = totalXp - currentLevelXp
  const requiredXp = nextLevelXp - currentLevelXp
  
  return Math.min(progressXp / requiredXp, 1)
}

/**
 * Format XP display with thousands separator
 */
export function formatXp(xp: number): string {
  return new Intl.NumberFormat('en-US').format(xp)
}

/**
 * Get difficulty color class
 */
export function getDifficultyColor(difficulty: QuestDifficulty): string {
  const colors = {
    beginner: 'text-green-500',
    intermediate: 'text-yellow-500',
    advanced: 'text-orange-500',
    expert: 'text-red-500',
  }
  return colors[difficulty]
}

/**
 * Get quest type icon
 */
export function getQuestTypeIcon(type: QuestType): string {
  const icons = {
    tutorial: '📚',
    challenge: '🏆',
    battle: '⚔️',
    creative: '🎨',
    practice: '🎯',
  }
  return icons[type]
}

/**
 * Calculate estimated time display
 */
export function formatEstimatedTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
}

/**
 * Format date for display
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date)
}

/**
 * Format date with time
 */
export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

/**
 * Calculate time ago
 */
export function timeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'week', seconds: 604800 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ]
  
  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds)
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`
    }
  }
  
  return 'just now'
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate username format
 */
export function isValidUsername(username: string): boolean {
  const usernameRegex = /^[a-zA-Z0-9_-]{3,20}$/
  return usernameRegex.test(username)
}

/**
 * Check password strength
 */
export function checkPasswordStrength(password: string): {
  isValid: boolean
  score: number
  feedback: string[]
} {
  const feedback: string[] = []
  let score = 0
  
  if (password.length >= 8) {
    score += 1
  } else {
    feedback.push('Password must be at least 8 characters long')
  }
  
  if (/[a-z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Password must contain at least one lowercase letter')
  }
  
  if (/[A-Z]/.test(password)) {
    score += 1
  } else {
    feedback.push('Password must contain at least one uppercase letter')
  }
  
  if (/\d/.test(password)) {
    score += 1
  } else {
    feedback.push('Password must contain at least one number')
  }
  
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 1
  } else {
    feedback.push('Password must contain at least one special character')
  }
  
  return {
    isValid: score >= 4,
    score,
    feedback,
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

/**
 * Download file
 */
export function downloadFile(data: string, filename: string, type: string = 'text/plain'): void {
  const blob = new Blob([data], { type })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Get user avatar URL or initials
 */
export function getUserAvatar(user: User): { type: 'url' | 'initials'; value: string } {
  if (user.avatar) {
    return { type: 'url', value: user.avatar }
  }
  
  const initials = (user.displayName || user.username)
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
  
  return { type: 'initials', value: initials }
}

/**
 * Calculate reading time for text
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): number {
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

/**
 * Truncate text
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3) + '...'
}

/**
 * Slugify string for URLs
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Get ordinal suffix for numbers (1st, 2nd, 3rd, etc.)
 */
export function getOrdinalSuffix(num: number): string {
  const ones = num % 10
  const tens = Math.floor(num / 10) % 10
  
  if (tens === 1) {
    return num + 'th'
  }
  
  switch (ones) {
    case 1:
      return num + 'st'
    case 2:
      return num + 'nd'
    case 3:
      return num + 'rd'
    default:
      return num + 'th'
  }
}

/**
 * Convert file size to human readable format
 */
export function formatFileSize(bytes: number): string {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Bytes'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
}

/**
 * Check if code is running on client side
 */
export const isClient = typeof window !== 'undefined'

/**
 * Check if code is running on server side
 */
export const isServer = typeof window === 'undefined'