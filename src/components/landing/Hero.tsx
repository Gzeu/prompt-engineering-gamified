'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Play, Zap, Target, Trophy } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  const features = [
    { icon: Zap, text: 'Interactive Learning' },
    { icon: Target, text: 'Skill-Based Progression' },
    { icon: Trophy, text: 'Achievements & Badges' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center cosmic-bg constellation">
      <div className="container-game text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-game-primary/20 border border-game-primary/30 rounded-full text-sm text-game-primary mb-8">
            <Zap className="w-4 h-4 mr-2" />
            Welcome to the Future of AI Learning
          </div>

          {/* Main Heading */}
          <h1 className="heading-primary mb-6 max-w-4xl mx-auto">
            Master{' '}
            <span className="text-gradient-cosmic">Prompt Engineering</span>
            {' '}Through Epic Adventures
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Embark on a gamified journey through 4 unique worlds, earn XP, unlock badges, 
            and become a prompt engineering master through hands-on challenges.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/register" className="btn-primary text-lg px-8 py-3 group">
              Start Your Adventure
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/demo" className="btn-outline text-lg px-8 py-3 group">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Link>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="flex items-center justify-center space-x-3 text-gray-300"
              >
                <feature.icon className="w-5 h-5 text-game-accent" />
                <span>{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-16 h-16 bg-game-primary/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-game-secondary/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [-5, 15, -5] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/2 right-1/3 w-12 h-12 bg-game-accent/20 rounded-full blur-lg"
        />
      </div>
    </section>
  )
}