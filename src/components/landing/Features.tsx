'use client'

import { motion } from 'framer-motion'
import { 
  Gamepad2, 
  Trophy, 
  Users, 
  BookOpen, 
  Zap, 
  Target,
  Star,
  Crown
} from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: Gamepad2,
      title: 'Gamified Learning',
      description: 'Earn XP, level up, and unlock new content as you master prompt engineering techniques.',
      gradient: 'from-game-primary to-blue-400'
    },
    {
      icon: Trophy,
      title: 'Achievement System',
      description: 'Collect rare badges and achievements that showcase your prompt engineering expertise.',
      gradient: 'from-game-xp to-yellow-400'
    },
    {
      icon: Users,
      title: 'Community Challenges',
      description: 'Join guilds, compete in tournaments, and learn from fellow prompt engineers.',
      gradient: 'from-game-secondary to-purple-400'
    },
    {
      icon: BookOpen,
      title: '4 Learning Worlds',
      description: 'Progress through structured worlds from basics to advanced prompt engineering mastery.',
      gradient: 'from-world-basics to-emerald-400'
    },
    {
      icon: Zap,
      title: 'Real-time Feedback',
      description: 'Get instant AI-powered feedback on your prompts with detailed improvement suggestions.',
      gradient: 'from-game-accent to-cyan-400'
    },
    {
      icon: Target,
      title: 'Skill-Based Progression',
      description: 'Unlock new challenges and content based on your demonstrated skills and achievements.',
      gradient: 'from-world-advanced to-blue-400'
    },
    {
      icon: Star,
      title: 'Boss Battles',
      description: 'Face epic challenges at the end of each world to prove your mastery.',
      gradient: 'from-world-mastery to-violet-400'
    },
    {
      icon: Crown,
      title: 'Leaderboards',
      description: 'Compete globally and showcase your prompt engineering skills on public leaderboards.',
      gradient: 'from-world-creative to-amber-400'
    }
  ]

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  }

  return (
    <section className="section-padding bg-gray-900/50">
      <div className="container-game">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="heading-secondary mb-6">
            Why Choose <span className="text-gradient">PromptCraft</span>?
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the most engaging way to master prompt engineering through 
            game mechanics that make learning addictive and effective.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="card-hover group"
            >
              <div className="mb-6">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-gradient transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}