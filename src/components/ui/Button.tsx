'use client'

import { forwardRef } from 'react'
import { motion, MotionProps } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  animated?: boolean
  fullWidth?: boolean
  children: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((
  { 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    animated = false,
    fullWidth = false,
    disabled, 
    children, 
    ...props 
  }, 
  ref
) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }
  
  const variantClasses = {
    primary: 'bg-game-primary hover:bg-game-primary/90 text-white shadow-lg hover:shadow-xl focus:ring-game-primary transform hover:scale-105',
    secondary: 'bg-game-secondary hover:bg-game-secondary/90 text-white shadow-lg hover:shadow-xl focus:ring-game-secondary transform hover:scale-105',
    outline: 'border-2 border-game-primary text-game-primary hover:bg-game-primary hover:text-white focus:ring-game-primary',
    ghost: 'text-gray-300 hover:text-white hover:bg-gray-800 focus:ring-gray-500',
    danger: 'bg-game-danger hover:bg-game-danger/90 text-white shadow-lg hover:shadow-xl focus:ring-game-danger transform hover:scale-105'
  }
  
  const Component = animated ? motion.button : 'button'
  const animationProps: MotionProps = animated ? {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
    transition: { duration: 0.2 }
  } : {}

  return (
    <Component
      ref={ref}
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || loading}
      {...animationProps}
      {...props}
    >
      {loading && (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      )}
      {children}
    </Component>
  )
})

Button.displayName = 'Button'

export { Button }

// Specialized button variants
export function PrimaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="primary" animated {...props} />
}

export function SecondaryButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="secondary" animated {...props} />
}

export function OutlineButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="outline" animated {...props} />
}

export function GhostButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="ghost" {...props} />
}

export function DangerButton(props: Omit<ButtonProps, 'variant'>) {
  return <Button variant="danger" animated {...props} />
}