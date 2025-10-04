import express from 'express'
import { PromptService } from '@/services/PromptService'
import { auth } from '@/middleware/auth'
import { validateRequest } from '@/middleware/validation'
import Joi from 'joi'

const router = express.Router()
const promptService = new PromptService()

// Submit prompt for evaluation
const submitPromptSchema = Joi.object({
  questId: Joi.string().required(),
  prompt: Joi.string().min(10).max(2000).required(),
  context: Joi.string().max(1000).optional()
})

router.post('/submit', auth, validateRequest(submitPromptSchema), async (req, res, next) => {
  try {
    const { questId, prompt, context } = req.body
    
    const evaluation = await promptService.evaluatePrompt({
      userId: req.user.id,
      questId,
      prompt,
      context
    })

    res.json({
      message: 'Prompt evaluated successfully',
      evaluation
    })
  } catch (error) {
    next(error)
  }
})

// Get AI-powered evaluation
const evaluatePromptSchema = Joi.object({
  prompt: Joi.string().min(10).max(2000).required(),
  criteria: Joi.array().items(Joi.string()).optional(),
  context: Joi.string().max(1000).optional()
})

router.post('/evaluate', auth, validateRequest(evaluatePromptSchema), async (req, res, next) => {
  try {
    const { prompt, criteria, context } = req.body
    
    const evaluation = await promptService.getAIEvaluation({
      prompt,
      criteria: criteria || ['clarity', 'specificity', 'effectiveness'],
      context
    })

    res.json({
      message: 'AI evaluation completed',
      evaluation
    })
  } catch (error) {
    next(error)
  }
})

// Get user's prompt history
router.get('/history', auth, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 20
    const questId = req.query.questId as string
    
    const history = await promptService.getUserPromptHistory(req.user.id, {
      page,
      limit,
      questId
    })

    res.json(history)
  } catch (error) {
    next(error)
  }
})

// Get prompt suggestions
router.post('/suggestions', auth, async (req, res, next) => {
  try {
    const { questId, currentPrompt } = req.body
    
    const suggestions = await promptService.getPromptSuggestions({
      questId,
      currentPrompt,
      userId: req.user.id
    })

    res.json({
      suggestions
    })
  } catch (error) {
    next(error)
  }
})

export default router