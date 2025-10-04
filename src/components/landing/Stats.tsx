'use client'

import { motion } from 'framer-motion'
import { Users, Trophy, Clock, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

export function Stats() {
  const [counts, setCounts] = useState({
    users: 0,
    achievements: 0,
    hours: 0,
    rating: 0
  })

  const finalStats = {
    users: 12500,
    achievements: 450000,
    hours: 89000,
    rating: 4.9
  }

  const stats = [
    {
      icon: Users,
      label: 'Active Learners',
      value: counts.users,
      suffix: '+',
      gradient: 'from-game-primary to-blue-400'
    },
    {
      icon: Trophy,
      label: 'Achievements Unlocked',
      value: counts.achievements,
      suffix: '+',
      gradient: 'from-game-xp to-yellow-400'
    },
    {
      icon: Clock,
      label: 'Learning Hours',
      value: counts.hours,
      suffix: '+',
      gradient: 'from-game-secondary to-purple-400'
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: counts.rating,
      suffix: '/5',
      gradient: 'from-game-accent to-cyan-400',
      isRating: true
    }
  ]

  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      
      setCounts({
        users: Math.floor(finalStats.users * progress),
        achievements: Math.floor(finalStats.achievements * progress),
        hours: Math.floor(finalStats.hours * progress),
        rating: parseFloat((finalStats.rating * progress).toFixed(1))
      })

      if (step >= steps) {
        clearInterval(timer)
        setCounts(finalStats)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section className="section-padding bg-gray-900/30">
      <div className="container-game">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary mb-6">
            Join the <span className="text-gradient">Learning Revolution</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Thousands of learners worldwide are already mastering prompt engineering through our gamified platform.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="mb-4">
                <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <div className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                {stat.isRating ? stat.value.toFixed(1) : stat.value.toLocaleString()}{stat.suffix}
              </div>
              
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}