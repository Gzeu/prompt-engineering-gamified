'use client'

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  barClassName?: string
  showLabel?: boolean
  label?: string
  animated?: boolean
  color?: 'primary' | 'secondary' | 'xp' | 'success' | 'warning' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function ProgressBar({
  value,
  max = 100,
  className,
  barClassName,
  showLabel = false,
  label,
  animated = true,
  color = 'primary',
  size = 'md'
}: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100)
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }
  
  const colorClasses = {
    primary: 'bg-gradient-to-r from-game-primary to-game-secondary',
    secondary: 'bg-gradient-to-r from-game-secondary to-purple-400',
    xp: 'bg-gradient-to-r from-game-xp to-yellow-400',
    success: 'bg-gradient-to-r from-game-success to-green-400',
    warning: 'bg-gradient-to-r from-game-warning to-amber-400',
    danger: 'bg-gradient-to-r from-game-danger to-red-400'
  }

  return (
    <div className={cn('w-full', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-300">
            {label || `Progress`}
          </span>
          <span className="text-sm font-medium text-white">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      
      <div className={cn(
        'w-full bg-gray-700 rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        <motion.div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            colorClasses[color],
            barClassName
          )}
          initial={animated ? { width: 0 } : undefined}
          animate={{ width: `${percentage}%` }}
          transition={animated ? { duration: 1, ease: 'easeOut' } : undefined}
        />
      </div>
    </div>
  )
}

// Specialized progress bars
export function XpProgressBar({ 
  currentXp, 
  requiredXp, 
  className,
  showLabel = true 
}: { 
  currentXp: number
  requiredXp: number
  className?: string
  showLabel?: boolean
}) {
  return (
    <ProgressBar
      value={currentXp}
      max={requiredXp}
      color="xp"
      className={className}
      showLabel={showLabel}
      label="XP Progress"
    />
  )
}

export function QuestProgressBar({ 
  completed, 
  total, 
  className 
}: { 
  completed: number
  total: number
  className?: string
}) {
  return (
    <ProgressBar
      value={completed}
      max={total}
      color="success"
      className={className}
      showLabel={true}
      label={`Quests: ${completed}/${total}`}
    />
  )
}