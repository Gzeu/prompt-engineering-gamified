'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User as UserIcon, 
  Settings, 
  LogOut, 
  Trophy, 
  Star,
  ChevronDown
} from 'lucide-react'
import { User } from '@/types/user'
import { useAuth } from '@/hooks/useAuth'

interface UserProfileProps {
  user: User | null
}

export function UserProfile({ user }: UserProfileProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { logout } = useAuth()

  if (!user) {
    return null
  }

  const xpPercentage = (user.xp / user.xpToNextLevel) * 100

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-game-primary to-game-secondary rounded-full flex items-center justify-center">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <UserIcon className="w-4 h-4 text-white" />
          )}
        </div>
        
        <div className="hidden md:block text-left">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-white">{user.name}</span>
            <div className="level-badge text-xs px-2 py-0.5">
              {user.level}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-16 h-1 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-game-xp to-yellow-400 transition-all duration-300"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
            <span className="text-xs text-gray-400">{user.xp} XP</span>
          </div>
        </div>
        
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-72 bg-gray-800 border border-gray-700 rounded-xl shadow-xl z-50"
          >
            {/* Profile Header */}
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-game-primary to-game-secondary rounded-full flex items-center justify-center">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name}
                      className="w-12 h-12 rounded-full"
                    />
                  ) : (
                    <UserIcon className="w-6 h-6 text-white" />
                  )}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{user.name}</h3>
                  <p className="text-sm text-gray-400">{user.email}</p>
                  
                  <div className="flex items-center space-x-3 mt-2">
                    <div className="level-badge">
                      Level {user.level}
                    </div>
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <Trophy className="w-3 h-3" />
                      <span>#{user.rank}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* XP Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">XP Progress</span>
                  <span className="text-game-xp font-medium">
                    {user.xp.toLocaleString()} / {user.xpToNextLevel.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="h-2 bg-gradient-to-r from-game-xp to-yellow-400 rounded-full transition-all duration-500"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-4 border-b border-gray-700">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-white">{user.badges.length}</div>
                  <div className="text-xs text-gray-400">Badges</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">{user.completedQuests.length}</div>
                  <div className="text-xs text-gray-400">Quests</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">{user.stats.streak}</div>
                  <div className="text-xs text-gray-400">Streak</div>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2">
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 rounded-lg transition-colors">
                <UserIcon className="w-4 h-4 text-gray-400" />
                <span className="text-white">View Profile</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 rounded-lg transition-colors">
                <Trophy className="w-4 h-4 text-gray-400" />
                <span className="text-white">Achievements</span>
              </button>
              
              <button className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700 rounded-lg transition-colors">
                <Settings className="w-4 h-4 text-gray-400" />
                <span className="text-white">Settings</span>
              </button>
              
              <div className="border-t border-gray-700 my-2" />
              
              <button 
                onClick={logout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-red-600/10 rounded-lg transition-colors text-red-400 hover:text-red-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}