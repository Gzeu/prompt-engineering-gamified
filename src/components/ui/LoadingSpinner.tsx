'use client'

import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
  text?: string
}

export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className={cn(
          'text-game-primary',
          sizeClasses[size]
        )}
      >
        <Loader2 className="w-full h-full" />
      </motion.div>
      
      {text && (
        <p className="mt-3 text-sm text-gray-400 text-center">
          {text}
        </p>
      )}
    </div>
  )
}

export function LoadingPage({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <LoadingSpinner size="lg" text={text} />
    </div>
  )
}

export function LoadingCard({ className }: { className?: string }) {
  return (
    <div className={cn('card animate-pulse', className)}>
      <div className="space-y-4">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
      </div>
    </div>
  )
}