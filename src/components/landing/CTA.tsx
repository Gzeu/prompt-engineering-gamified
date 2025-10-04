'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export function CTA() {
  return (
    <section className="section-padding bg-gradient-to-r from-game-primary/20 via-game-secondary/20 to-game-accent/20">
      <div className="container-game">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto bg-gradient-to-r from-game-primary to-game-secondary rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to <span className="text-gradient-cosmic">Level Up</span> Your AI Skills?
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join thousands of learners who are already mastering prompt engineering through 
            our innovative gamified platform. Start your journey today!
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { title: 'Free to Start', desc: 'Begin your journey with free courses' },
              { title: 'Learn by Doing', desc: 'Practice with real AI models' },
              { title: 'Join Community', desc: 'Connect with fellow learners' }
            ].map((benefit) => (
              <div key={benefit.title} className="text-center">
                <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary text-lg px-10 py-4 group">
              Start Learning Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/worlds" className="btn-outline text-lg px-10 py-4">
              Explore Worlds
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <p className="text-sm text-gray-500 mb-4">Trusted by learners from</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {['Google', 'Microsoft', 'OpenAI', 'Meta', 'Tesla', 'Netflix'].map((company) => (
                <span key={company} className="text-gray-400 font-semibold text-lg">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}