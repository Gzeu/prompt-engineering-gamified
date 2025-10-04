'use client'

import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Brain, 
  Sparkles, 
  Palette,
  ArrowRight,
  Lock,
  CheckCircle
} from 'lucide-react'
import Link from 'next/link'

export function Worlds() {
  const worlds = [
    {
      id: 1,
      title: 'Prompt Fundamentals',
      description: 'Master the basics of prompt construction, syntax, and core principles.',
      icon: BookOpen,
      gradient: 'gradient-world-1',
      textGradient: 'text-gradient-world-1',
      progress: 100,
      unlocked: true,
      quests: 12,
      completedQuests: 12,
      xpReward: '2,500 XP',
      features: ['Basic Syntax', 'Prompt Structure', 'Common Patterns', 'Best Practices']
    },
    {
      id: 2,
      title: 'Advanced Techniques',
      description: 'Dive deep into complex prompting strategies and optimization methods.',
      icon: Brain,
      gradient: 'gradient-world-2',
      textGradient: 'text-gradient-world-2',
      progress: 65,
      unlocked: true,
      quests: 15,
      completedQuests: 10,
      xpReward: '5,000 XP',
      features: ['Chain of Thought', 'Few-Shot Learning', 'Context Windows', 'Fine-tuning']
    },
    {
      id: 3,
      title: 'AI Mastery',
      description: 'Become an expert with cutting-edge techniques and AI model understanding.',
      icon: Sparkles,
      gradient: 'gradient-world-3',
      textGradient: 'text-gradient-world-3',
      progress: 25,
      unlocked: true,
      quests: 18,
      completedQuests: 4,
      xpReward: '7,500 XP',
      features: ['Multi-Modal Prompts', 'Model Alignment', 'Reasoning Chains', 'Advanced RAG']
    },
    {
      id: 4,
      title: 'Creative Applications',
      description: 'Explore artistic and innovative applications of prompt engineering.',
      icon: Palette,
      gradient: 'gradient-world-4',
      textGradient: 'text-gradient-world-4',
      progress: 0,
      unlocked: false,
      quests: 20,
      completedQuests: 0,
      xpReward: '10,000 XP',
      features: ['Creative Writing', 'Art Generation', 'Music & Audio', 'Interactive Stories']
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  }

  return (
    <section className="section-padding cosmic-bg">
      <div className="container-game">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary mb-6">
            Explore <span className="text-gradient-cosmic">4 Unique Worlds</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Each world presents unique challenges and learning opportunities, 
            progressively building your expertise from beginner to master level.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {worlds.map((world) => (
            <motion.div
              key={world.id}
              variants={itemVariants}
              className={`card-world relative overflow-hidden ${
                world.unlocked ? 'cursor-pointer' : 'opacity-60'
              }`}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-${world.gradient} opacity-10`} />
              
              {/* Lock Overlay */}
              {!world.unlocked && (
                <div className="absolute inset-0 bg-gray-900/80 flex items-center justify-center z-10">
                  <div className="text-center">
                    <Lock className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400 font-semibold">Complete World {world.id - 1} to unlock</p>
                  </div>
                </div>
              )}

              <div className="relative z-20 p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-14 h-14 rounded-2xl bg-${world.gradient} flex items-center justify-center`}>
                      <world.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${world.textGradient} mb-1`}>
                        {world.title}
                      </h3>
                      <p className="text-gray-400">{world.description}</p>
                    </div>
                  </div>
                  {world.progress === 100 && (
                    <CheckCircle className="w-6 h-6 text-game-success" />
                  )}
                </div>

                {/* Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-400">
                      Progress: {world.completedQuests}/{world.quests} quests
                    </span>
                    <span className="text-sm font-semibold text-game-xp">
                      {world.xpReward}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className={`progress-fill bg-${world.gradient}`}
                      style={{ width: `${world.progress}%` }}
                    />
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {world.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-game-accent rounded-full" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {world.unlocked && (
                  <Link 
                    href={`/worlds/${world.id}`}
                    className="inline-flex items-center text-game-primary hover:text-game-primary/80 transition-colors group"
                  >
                    {world.progress === 100 ? 'Review World' : 'Continue Learning'}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}