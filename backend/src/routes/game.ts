import express from 'express'
import { GameService } from '@/services/GameService'
import { auth } from '@/middleware/auth'

const router = express.Router()
const gameService = new GameService()

// Get all worlds
router.get('/worlds', auth, async (req, res, next) => {
  try {
    const worlds = await gameService.getWorlds()
    const userProgress = await gameService.getUserWorldProgress(req.user.id)
    
    const worldsWithProgress = worlds.map(world => ({
      ...world,
      progress: userProgress.find(p => p.worldId === world.id)?.progress || 0,
      unlocked: userProgress.find(p => p.worldId === world.id)?.unlocked || world.id === 1,
      completed: userProgress.find(p => p.worldId === world.id)?.completed || false,
    }))
    
    res.json(worldsWithProgress)
  } catch (error) {
    next(error)
  }
})

// Get world details
router.get('/worlds/:worldId', auth, async (req, res, next) => {
  try {
    const worldId = parseInt(req.params.worldId)
    const world = await gameService.getWorld(worldId)
    
    if (!world) {
      return res.status(404).json({ error: 'World not found' })
    }
    
    const userProgress = await gameService.getUserWorldProgress(req.user.id, worldId)
    
    res.json({
      ...world,
      progress: userProgress?.progress || 0,
      unlocked: userProgress?.unlocked || worldId === 1,
      completed: userProgress?.completed || false,
    })
  } catch (error) {
    next(error)
  }
})

// Get quests for a world
router.get('/worlds/:worldId/quests', auth, async (req, res, next) => {
  try {
    const worldId = parseInt(req.params.worldId)
    const quests = await gameService.getWorldQuests(worldId)
    const userProgress = await gameService.getUserQuestProgress(req.user.id, worldId)
    
    const questsWithProgress = quests.map(quest => {
      const progress = userProgress.find(p => p.questId === quest.id)
      return {
        ...quest,
        status: progress?.status || 'locked',
        progress: progress?.progress || 0,
        attempts: progress?.attempts || 0,
        bestScore: progress?.bestScore || 0,
      }
    })
    
    res.json(questsWithProgress)
  } catch (error) {
    next(error)
  }
})

// Get specific quest
router.get('/quests/:questId', auth, async (req, res, next) => {
  try {
    const questId = req.params.questId
    const quest = await gameService.getQuest(questId)
    
    if (!quest) {
      return res.status(404).json({ error: 'Quest not found' })
    }
    
    const userProgress = await gameService.getUserQuestProgress(req.user.id, quest.worldId, questId)
    
    res.json({
      ...quest,
      status: userProgress?.status || 'locked',
      progress: userProgress?.progress || 0,
      attempts: userProgress?.attempts || 0,
      bestScore: userProgress?.bestScore || 0,
    })
  } catch (error) {
    next(error)
  }
})

// Get active challenges
router.get('/challenges', auth, async (req, res, next) => {
  try {
    const challenges = await gameService.getActiveChallenges()
    const userProgress = await gameService.getUserChallengeProgress(req.user.id)
    
    const challengesWithProgress = challenges.map(challenge => {
      const progress = userProgress.find(p => p.challengeId === challenge.id)
      return {
        ...challenge,
        status: progress?.status || 'not_started',
        score: progress?.score || 0,
        rank: progress?.rank,
        submissions: progress?.submissions?.length || 0,
      }
    })
    
    res.json(challengesWithProgress)
  } catch (error) {
    next(error)
  }
})

// Get leaderboard
router.get('/leaderboard', auth, async (req, res, next) => {
  try {
    const type = req.query.type as string || 'global'
    const limit = parseInt(req.query.limit as string) || 50
    
    const leaderboard = await gameService.getLeaderboard(type, limit)
    
    res.json(leaderboard)
  } catch (error) {
    next(error)
  }
})

// Get user achievements
router.get('/achievements', auth, async (req, res, next) => {
  try {
    const achievements = await gameService.getUserAchievements(req.user.id)
    
    res.json(achievements)
  } catch (error) {
    next(error)
  }
})

export default router