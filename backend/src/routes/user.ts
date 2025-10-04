import express from 'express'
import { UserService } from '@/services/UserService'
import { auth } from '@/middleware/auth'
import { validateRequest } from '@/middleware/validation'
import Joi from 'joi'

const router = express.Router()
const userService = new UserService()

// Get user profile
router.get('/profile', auth, async (req, res, next) => {
  try {
    const user = await userService.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Remove sensitive data
    const { password, ...userProfile } = user as any
    res.json(userProfile)
  } catch (error) {
    next(error)
  }
})

// Update user profile
const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  avatar: Joi.string().uri().optional(),
  preferences: Joi.object({
    theme: Joi.string().valid('dark', 'light', 'auto').optional(),
    notifications: Joi.object({
      email: Joi.boolean().optional(),
      push: Joi.boolean().optional(),
      achievements: Joi.boolean().optional(),
      social: Joi.boolean().optional()
    }).optional(),
    privacy: Joi.object({
      profileVisible: Joi.boolean().optional(),
      showProgress: Joi.boolean().optional(),
      allowFriendRequests: Joi.boolean().optional()
    }).optional()
  }).optional()
})

router.put('/profile', auth, validateRequest(updateProfileSchema), async (req, res, next) => {
  try {
    const updatedUser = await userService.updateById(req.user.id, req.body)
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Remove sensitive data
    const { password, ...userProfile } = updatedUser as any
    res.json({
      message: 'Profile updated successfully',
      user: userProfile
    })
  } catch (error) {
    next(error)
  }
})

// Get user progress
router.get('/progress', auth, async (req, res, next) => {
  try {
    const user = await userService.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const progress = {
      level: user.level,
      xp: user.xp,
      totalXp: user.totalXp,
      xpToNextLevel: user.xpToNextLevel,
      completedQuests: user.completedQuests,
      currentWorld: user.currentWorld,
      badges: user.badges,
      stats: user.stats
    }

    res.json(progress)
  } catch (error) {
    next(error)
  }
})

// Get user stats
router.get('/stats', auth, async (req, res, next) => {
  try {
    const user = await userService.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json(user.stats)
  } catch (error) {
    next(error)
  }
})

// Get user achievements/badges
router.get('/achievements', auth, async (req, res, next) => {
  try {
    const user = await userService.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    res.json({
      badges: user.badges,
      totalBadges: user.badges.length,
      recentBadges: user.badges
        .sort((a, b) => new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime())
        .slice(0, 5)
    })
  } catch (error) {
    next(error)
  }
})

export default router