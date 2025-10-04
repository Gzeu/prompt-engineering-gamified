import { formatDistanceToNow, format } from 'date-fns'

export function formatRelativeTime(date: Date): string {
  return formatDistanceToNow(date, { addSuffix: true })
}

export function formatDate(date: Date, pattern: string = 'PPP'): string {
  return format(date, pattern)
}

export function formatTime(date: Date): string {
  return format(date, 'HH:mm')
}

export function formatDateTime(date: Date): string {
  return format(date, 'PPP pp')
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`
  }
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (hours < 24) {
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`
  }
  
  const days = Math.floor(hours / 24)
  const remainingHours = hours % 24
  
  if (remainingHours > 0) {
    return `${days}d ${remainingHours}h`
  }
  
  return `${days}d`
}

export function formatNumber(num: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('en-US', options).format(num)
}

export function formatPercent(value: number, total: number): string {
  if (total === 0) return '0%'
  return `${Math.round((value / total) * 100)}%`
}

export function formatScore(score: number): string {
  return `${Math.round(score)}/100`
}

export function formatRank(rank: number): string {
  const suffix = getRankSuffix(rank)
  return `${rank}${suffix}`
}

function getRankSuffix(rank: number): string {
  if (rank >= 11 && rank <= 13) {
    return 'th'
  }
  
  switch (rank % 10) {
    case 1: return 'st'
    case 2: return 'nd'
    case 3: return 'rd'
    default: return 'th'
  }
}