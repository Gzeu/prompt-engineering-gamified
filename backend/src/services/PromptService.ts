import { AppError } from '@/middleware/errorHandler'

interface PromptEvaluation {
  userId: string
  questId: string
  prompt: string
  context?: string
}

interface AIEvaluation {
  prompt: string
  criteria: string[]
  context?: string
}

export class PromptService {
  async evaluatePrompt(data: PromptEvaluation): Promise<any> {
    try {
      // Mock evaluation logic - replace with real AI evaluation
      const scores = {
        clarity: Math.floor(Math.random() * 30) + 70,
        specificity: Math.floor(Math.random() * 30) + 70,
        effectiveness: Math.floor(Math.random() * 30) + 70,
        creativity: Math.floor(Math.random() * 30) + 70
      }

      const overallScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length
      const passed = overallScore >= 75
      
      const feedback = this.generateFeedback(scores, overallScore)
      const improvements = this.generateImprovements(scores)
      
      return {
        id: `eval-${Date.now()}`,
        questId: data.questId,
        prompt: data.prompt,
        scores,
        overallScore: Math.round(overallScore),
        passed,
        feedback,
        improvements,
        xpEarned: passed ? 100 : 30,
        evaluatedAt: new Date()
      }
    } catch (error) {
      throw new AppError('Failed to evaluate prompt', 500)
    }
  }

  async getAIEvaluation(data: AIEvaluation): Promise<any> {
    try {
      // Mock AI evaluation - integrate with OpenAI/Anthropic in production
      const evaluation = {
        clarity: {
          score: Math.floor(Math.random() * 30) + 70,
          feedback: 'Your prompt is clear and easy to understand. Good use of specific language.'
        },
        specificity: {
          score: Math.floor(Math.random() * 30) + 70,
          feedback: 'The prompt could be more specific about the desired output format.'
        },
        effectiveness: {
          score: Math.floor(Math.random() * 30) + 70,
          feedback: 'This prompt should effectively achieve the desired outcome.'
        }
      }

      const overallScore = Object.values(evaluation).reduce((sum, item) => sum + item.score, 0) / Object.keys(evaluation).length

      return {
        evaluation,
        overallScore: Math.round(overallScore),
        suggestions: [
          'Try adding more specific examples',
          'Consider including the desired output format',
          'Be more explicit about the context or constraints'
        ],
        evaluatedAt: new Date()
      }
    } catch (error) {
      throw new AppError('Failed to get AI evaluation', 500)
    }
  }

  async getUserPromptHistory(userId: string, options: { page: number; limit: number; questId?: string }): Promise<any> {
    try {
      // Mock history data - replace with real database queries
      const mockHistory = [
        {
          id: 'prompt-1',
          questId: 'basics-1',
          prompt: 'Explain quantum computing to a 10-year-old',
          score: 85,
          passed: true,
          submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        },
        {
          id: 'prompt-2',
          questId: 'basics-2',
          prompt: 'Write a product review for wireless headphones',
          score: 78,
          passed: true,
          submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
        }
      ]

      let filtered = mockHistory
      if (options.questId) {
        filtered = filtered.filter(h => h.questId === options.questId)
      }

      const startIndex = (options.page - 1) * options.limit
      const endIndex = startIndex + options.limit
      const paginatedHistory = filtered.slice(startIndex, endIndex)

      return {
        history: paginatedHistory,
        pagination: {
          page: options.page,
          limit: options.limit,
          total: filtered.length,
          pages: Math.ceil(filtered.length / options.limit)
        }
      }
    } catch (error) {
      throw new AppError('Failed to get prompt history', 500)
    }
  }

  async getPromptSuggestions(data: { questId: string; currentPrompt?: string; userId: string }): Promise<string[]> {
    try {
      // Mock suggestions - integrate with AI in production
      const suggestions = [
        'Try being more specific about the target audience',
        'Consider adding examples to clarify your intent',
        'Include the desired format or structure of the response',
        'Add context about the use case or scenario',
        'Be more explicit about any constraints or limitations'
      ]

      return suggestions.slice(0, 3) // Return top 3 suggestions
    } catch (error) {
      throw new AppError('Failed to get prompt suggestions', 500)
    }
  }

  private generateFeedback(scores: any, overallScore: number): string {
    if (overallScore >= 90) {
      return 'Excellent work! Your prompt demonstrates mastery of the key principles.'
    } else if (overallScore >= 80) {
      return 'Great job! Your prompt is well-structured with minor areas for improvement.'
    } else if (overallScore >= 70) {
      return 'Good effort! Your prompt shows understanding but could be enhanced.'
    } else {
      return 'Keep practicing! Focus on the feedback to improve your prompt quality.'
    }
  }

  private generateImprovements(scores: any): string[] {
    const improvements = []
    
    if (scores.clarity < 75) {
      improvements.push('Make your instructions clearer and more direct')
    }
    if (scores.specificity < 75) {
      improvements.push('Be more specific about what you want')
    }
    if (scores.effectiveness < 75) {
      improvements.push('Consider adding examples or context')
    }
    if (scores.creativity < 75) {
      improvements.push('Think about more creative approaches to the problem')
    }

    return improvements
  }
}