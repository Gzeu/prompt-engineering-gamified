import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Joi from 'joi'
import { v4 as uuidv4 } from 'uuid'
import { AuthService } from '@/services/AuthService'
import { UserService } from '@/services/UserService'
import { auth } from '@/middleware/auth'
import { validateRequest } from '@/middleware/validation'

const router = express.Router()
const authService = new AuthService()
const userService = new UserService()

// Validation schemas
const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name: Joi.string().min(2).max(50).required(),
})

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

// Register new user
router.post('/register', validateRequest(registerSchema), async (req, res, next) => {
  try {
    const { email, password, name } = req.body

    // Check if user already exists
    const existingUser = await userService.findByEmail(email)
    if (existingUser) {
      return res.status(400).json({
        error: 'User with this email already exists'
      })
    }

    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    // Create new user
    const userId = uuidv4()
    const user = await userService.create({
      id: userId,
      email,
      password: hashedPassword,
      name,
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      totalXp: 0,
      rank: 0,
      badges: [],
      completedQuests: [],
      currentWorld: 1,
      preferences: {
        theme: 'dark',
        notifications: {
          email: true,
          push: true,
          achievements: true,
          social: true,
        },
        privacy: {
          profileVisible: true,
          showProgress: true,
          allowFriendRequests: true,
        },
      },
      stats: {
        questsCompleted: 0,
        challengesWon: 0,
        streak: 0,
        longestStreak: 0,
        timeSpent: 0,
        favoriteWorld: 1,
        accuracyRate: 0,
        averageScore: 0,
      },
      createdAt: new Date(),
      lastLoginAt: new Date(),
    })

    // Generate JWT token
    const token = authService.generateToken(userId)
    const refreshToken = authService.generateRefreshToken(userId)

    // Remove password from response
    const { password: _, ...userResponse } = user

    res.status(201).json({
      message: 'User registered successfully',
      user: userResponse,
      token,
      refreshToken,
    })
  } catch (error) {
    next(error)
  }
})

// Login user
router.post('/login', validateRequest(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await userService.findByEmail(email)
    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Invalid email or password'
      })
    }

    // Update last login
    await userService.updateLastLogin(user.id)

    // Generate tokens
    const token = authService.generateToken(user.id)
    const refreshToken = authService.generateRefreshToken(user.id)

    // Remove password from response
    const { password: _, ...userResponse } = user

    res.json({
      message: 'Login successful',
      user: userResponse,
      token,
      refreshToken,
    })
  } catch (error) {
    next(error)
  }
})

// Validate token
router.get('/validate', auth, async (req, res, next) => {
  try {
    const user = await userService.findById(req.user.id)
    if (!user) {
      return res.status(404).json({
        error: 'User not found'
      })
    }

    // Remove password from response
    const { password: _, ...userResponse } = user

    res.json(userResponse)
  } catch (error) {
    next(error)
  }
})

// Refresh token
router.post('/refresh', async (req, res, next) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      return res.status(400).json({
        error: 'Refresh token is required'
      })
    }

    const decoded = authService.verifyRefreshToken(refreshToken)
    const newToken = authService.generateToken(decoded.userId)
    const newRefreshToken = authService.generateRefreshToken(decoded.userId)

    res.json({
      token: newToken,
      refreshToken: newRefreshToken,
    })
  } catch (error) {
    res.status(401).json({
      error: 'Invalid refresh token'
    })
  }
})

// Logout (client-side token removal)
router.post('/logout', auth, (req, res) => {
  res.json({ message: 'Logged out successfully' })
})

export default router