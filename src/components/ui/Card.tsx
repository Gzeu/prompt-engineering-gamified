'use client'

import { forwardRef } from 'react'
import { motion, MotionProps } from 'framer-motion'
import { cn } from '@/utils/cn'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  animated?: boolean
  variant?: 'default' | 'game' | 'world' | 'quest'
  children: React.ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>((
  { className, hover = false, animated = false, variant = 'default', children, ...props },
  ref
) => {
  const baseClasses = 'rounded-xl shadow-lg backdrop-blur-sm'
  
  const variantClasses = {
    default: 'bg-gray-800/50 border border-gray-700',
    game: 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-600 relative overflow-hidden',
    world: 'bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-gray-600 relative overflow-hidden group',
    quest: 'bg-gray-800/50 border border-gray-700 border-l-4 border-l-game-primary relative'
  }
  
  const hoverClasses = hover ? 'hover:bg-gray-700/50 hover:border-gray-600 transition-all duration-300 cursor-pointer transform hover:scale-105' : ''
  
  const Component = animated ? motion.div : 'div'
  const animationProps: MotionProps = animated ? {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
    whileHover: hover ? { scale: 1.02 } : undefined
  } : {}

  return (
    <Component
      ref={ref}
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        className
      )}
      {...animationProps}
      {...props}
    >
      {children}
    </Component>
  )
})

Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((
  { className, ...props },
  ref
) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>((
  { className, ...props },
  ref
) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight text-white', className)}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>((
  { className, ...props },
  ref
) => (
  <p
    ref={ref}
    className={cn('text-sm text-gray-400', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((
  { className, ...props },
  ref
) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>((
  { className, ...props },
  ref
) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

// Specialized card variants
export function GameCard(props: Omit<CardProps, 'variant'>) {
  return <Card variant="game" {...props} />
}

export function WorldCard(props: Omit<CardProps, 'variant'>) {
  return <Card variant="world" hover animated {...props} />
}

export function QuestCard(props: Omit<CardProps, 'variant'>) {
  return <Card variant="quest" hover {...props} />
}