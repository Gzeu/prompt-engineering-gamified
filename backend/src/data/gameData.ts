import { World, Quest, Challenge } from '@/types/game'

export const gameData = {
  worlds: [
    {
      id: 1,
      name: 'basics',
      title: 'Prompt Fundamentals',
      description: 'Master the essential building blocks of effective prompt engineering',
      icon: '📚',
      gradient: 'from-emerald-500 to-green-600',
      unlockLevel: 1,
      quests: [],
      rewards: {
        xp: 2500,
        badge: 'basics-master',
        title: 'Prompt Apprentice',
        unlocks: ['world-2']
      }
    },
    {
      id: 2,
      name: 'advanced',
      title: 'Advanced Techniques',
      description: 'Explore sophisticated strategies and optimization methods',
      icon: '🧠',
      gradient: 'from-blue-500 to-indigo-600',
      unlockLevel: 5,
      quests: [],
      rewards: {
        xp: 5000,
        badge: 'advanced-master',
        title: 'Prompt Specialist',
        unlocks: ['world-3']
      }
    },
    {
      id: 3,
      name: 'mastery',
      title: 'AI Mastery',
      description: 'Become an expert with cutting-edge techniques and deep AI understanding',
      icon: '✨',
      gradient: 'from-violet-500 to-purple-600',
      unlockLevel: 12,
      quests: [],
      rewards: {
        xp: 7500,
        badge: 'mastery-expert',
        title: 'Prompt Expert',
        unlocks: ['world-4']
      }
    },
    {
      id: 4,
      name: 'creative',
      title: 'Creative Applications',
      description: 'Unlock artistic and innovative applications of prompt engineering',
      icon: '🎨',
      gradient: 'from-amber-500 to-orange-600',
      unlockLevel: 20,
      quests: [],
      rewards: {
        xp: 10000,
        badge: 'creative-master',
        title: 'Prompt Virtuoso',
        unlocks: ['master-tier']
      }
    }
  ] as World[],

  quests: [
    // World 1 - Basics
    {
      id: 'basics-1',
      worldId: 1,
      name: 'first-prompt',
      title: 'Your First Prompt',
      description: 'Learn to write clear and effective prompts',
      difficulty: 'beginner' as const,
      type: 'tutorial' as const,
      prerequisites: [],
      objectives: [
        {
          id: 'obj-1',
          description: 'Write a prompt with clear instructions',
          type: 'prompt_quality' as const,
          target: 1,
          current: 0,
          completed: false
        }
      ],
      rewards: {
        xp: 100,
        badges: ['first-prompt'],
        items: [],
        unlocks: ['basics-2']
      },
      unlockLevel: 1,
      tags: ['fundamentals', 'clarity'],
      content: {
        instructions: 'Create a prompt that asks an AI to explain quantum computing to a 10-year-old.',
        examples: [
          {
            prompt: 'Explain how a car works to a 5-year-old',
            output: 'A car is like a big toy that uses special juice called gasoline...',
            explanation: 'This prompt is clear about the audience and complexity level',
            rating: 90
          }
        ],
        hints: [
          'Be specific about your audience',
          'Use simple, clear language',
          'Give context about the expected complexity'
        ],
        resources: [
          'https://platform.openai.com/docs/guides/prompt-engineering'
        ],
        evaluationCriteria: [
          {
            name: 'Clarity',
            description: 'How clear and unambiguous is the prompt?',
            weight: 0.3,
            maxScore: 100
          },
          {
            name: 'Specificity',
            description: 'How specific is the request?',
            weight: 0.3,
            maxScore: 100
          },
          {
            name: 'Audience Awareness',
            description: 'Does it consider the target audience?',
            weight: 0.4,
            maxScore: 100
          }
        ]
      }
    },
    {
      id: 'basics-2',
      worldId: 1,
      name: 'context-matters',
      title: 'Context is Key',
      description: 'Learn how to provide effective context in your prompts',
      difficulty: 'beginner' as const,
      type: 'practice' as const,
      prerequisites: ['basics-1'],
      objectives: [
        {
          id: 'obj-2',
          description: 'Include relevant context in your prompt',
          type: 'prompt_quality' as const,
          target: 1,
          current: 0,
          completed: false
        }
      ],
      rewards: {
        xp: 150,
        badges: [],
        items: [],
        unlocks: ['basics-3']
      },
      unlockLevel: 1,
      tags: ['context', 'fundamentals'],
      content: {
        instructions: 'Write a prompt that asks for a product review, providing relevant context about the product and review style.',
        examples: [
          {
            prompt: 'Write a review for a wireless headphone. Context: Budget-friendly, used for 3 months, mainly for podcast listening. Style: Honest, detailed, mention pros and cons.',
            output: 'After 3 months of daily podcast listening with these budget wireless headphones...',
            explanation: 'This provides clear context about usage, timeframe, and desired review style',
            rating: 95
          }
        ],
        hints: [
          'Think about what information would be helpful',
          'Consider the background needed to give a good response',
          'Be specific about the style or format you want'
        ],
        evaluationCriteria: [
          {
            name: 'Context Completeness',
            description: 'Does the prompt provide sufficient context?',
            weight: 0.4,
            maxScore: 100
          },
          {
            name: 'Relevance',
            description: 'Is the provided context relevant to the task?',
            weight: 0.3,
            maxScore: 100
          },
          {
            name: 'Structure',
            description: 'Is the prompt well-organized?',
            weight: 0.3,
            maxScore: 100
          }
        ]
      }
    }
  ] as Quest[],

  challenges: [
    {
      id: 'daily-prompt-1',
      name: 'daily-creative',
      title: 'Daily Creative Challenge',
      description: 'Create the most creative prompt for generating story ideas',
      type: 'daily' as const,
      difficulty: 'medium' as const,
      startDate: new Date(),
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
      participants: 145,
      rewards: {
        first: {
          xp: 1000,
          badges: ['daily-champion'],
          items: ['golden-quill'],
          titles: ['Daily Champion']
        },
        second: {
          xp: 750,
          badges: ['daily-runner-up'],
          items: ['silver-quill'],
          titles: []
        },
        third: {
          xp: 500,
          badges: ['daily-bronze'],
          items: ['bronze-quill'],
          titles: []
        },
        participation: {
          xp: 100,
          badges: [],
          items: [],
          titles: []
        }
      },
      leaderboard: [
        {
          userId: 'user-1',
          username: 'CreativeGenius',
          score: 98,
          rank: 1,
          completionTime: 300,
          avatar: null
        },
        {
          userId: 'user-2',
          username: 'PromptWizard',
          score: 95,
          rank: 2,
          completionTime: 420,
          avatar: null
        }
      ],
      requirements: [
        'Submit an original prompt',
        'Focus on creativity and uniqueness',
        'Maximum 200 characters'
      ]
    }
  ] as Challenge[]
}