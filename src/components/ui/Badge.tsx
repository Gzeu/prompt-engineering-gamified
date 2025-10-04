'use client'

import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'common' | 'rare' | 'epic' | 'legendary' | 'level'
  size?: 'sm' | 'md' | 'lg'
  animate?: boolean
  className?: string
}

export function Badge({ 
  children, 
  variant = 'common', 
  size = 'md', 
  animate = false,
  className 
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-semibold'
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }
  
  const variantClasses = {
    common: 'bg-gray-600 text-gray-200 border border-gray-500',
    rare: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border border-blue-400 shadow-lg',
    epic: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border border-purple-400 shadow-lg glow-secondary',
    legendary: 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white border border-yellow-300 shadow-xl glow-primary animate-pulse-glow',
    level: 'bg-gradient-to-r from-game-level to-blue-400 text-white shadow-lg'
  }
  
  const Component = animate ? motion.div : 'div'
  const animationProps = animate ? {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { duration: 0.6, ease: 'easeOut' }
  } : {}

  return (
    <Component
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...animationProps}
    >
      {children}
    </Component>
  )
}

// Specialized badge components
export function LevelBadge({ level, className }: { level: number; className?: string }) {
  return (
    <Badge variant="level" size="sm" className={className}>
      Level {level}
    </Badge>
  )
}

export function XpBadge({ xp, className }: { xp: number; className?: string }) {
  return (
    <Badge 
      variant="common" 
      size="sm" 
      className={cn('bg-game-xp text-gray-900', className)}
    >
      +{xp.toLocaleString()} XP
    </Badge>
  )
}

export function RarityBadge({ rarity, className }: { rarity: string; className?: string }) {
  return (
    <Badge 
      variant={rarity as any} 
      size="sm" 
      className={className}
    >
      {rarity.charAt(0).toUpperCase() + rarity.slice(1)}
    </Badge>
  )
}