'use client'

import Link from 'next/link'
import { Zap, Github, Twitter, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'Worlds', href: '/worlds' },
        { label: 'Challenges', href: '/challenges' },
        { label: 'Leaderboard', href: '/leaderboard' },
        { label: 'Achievements', href: '/achievements' }
      ]
    },
    {
      title: 'Learning',
      links: [
        { label: 'Getting Started', href: '/docs/getting-started' },
        { label: 'Tutorials', href: '/tutorials' },
        { label: 'Best Practices', href: '/best-practices' },
        { label: 'Examples', href: '/examples' }
      ]
    },
    {
      title: 'Community',
      links: [
        { label: 'Discord', href: 'https://discord.gg/promptcraft' },
        { label: 'Forum', href: '/forum' },
        { label: 'Blog', href: '/blog' },
        { label: 'Events', href: '/events' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' }
      ]
    }
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/promptcraft', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/promptcraft', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/promptcraft', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@promptcraft.ai', label: 'Email' }
  ]

  return (
    <footer className="bg-gray-950 border-t border-gray-800">
      <div className="container-game py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-game-primary to-game-secondary rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gradient">PromptCraft</span>
            </Link>
            
            <p className="text-gray-400 mb-6 max-w-md">
              Master prompt engineering through gamified learning. Level up your AI skills 
              with interactive challenges and real-world applications.
            </p>

            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} PromptCraft. All rights reserved. Built with ❤️ for the AI community.
          </p>
          
          <div className="flex space-x-6">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}