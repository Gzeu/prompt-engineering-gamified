# Prompt Engineering Gamified - Project Structure

## 📁 Directory Structure

```
prompt-engineering-gamified/
├── 📁 app/                          # Next.js 14+ App Router
│   ├── 📁 (auth)/                   # Route groups for auth pages
│   │   ├── 📄 login/page.tsx
│   │   ├── 📄 register/page.tsx
│   │   └── 📄 forgot-password/page.tsx
│   ├── 📁 (dashboard)/              # Protected dashboard routes
│   │   ├── 📄 worlds/page.tsx
│   │   ├── 📄 profile/page.tsx
│   │   ├── 📄 leaderboard/page.tsx
│   │   └── 📄 achievements/page.tsx
│   ├── 📁 api/                      # API routes
│   │   ├── 📁 auth/
│   │   ├── 📁 users/
│   │   ├── 📁 quests/
│   │   ├── 📁 achievements/
│   │   └── 📁 leaderboard/
│   ├── 📄 layout.tsx                # Root layout
│   ├── 📄 page.tsx                  # Landing page
│   ├── 📄 loading.tsx               # Global loading UI
│   └── 📄 error.tsx                 # Global error UI
├── 📁 components/                   # Reusable UI components
│   ├── 📁 ui/                       # Base UI components
│   │   ├── 📄 Button.tsx
│   │   ├── 📄 Card.tsx
│   │   ├── 📄 Modal.tsx
│   │   ├── 📄 ProgressBar.tsx
│   │   └── 📄 Badge.tsx
│   ├── 📁 game/                     # Game-specific components
│   │   ├── 📄 XPBar.tsx
│   │   ├── 📄 LevelIndicator.tsx
│   │   ├── 📄 QuestCard.tsx
│   │   ├── 📄 WorldMap.tsx
│   │   └── 📄 BattleArena.tsx
│   ├── 📁 forms/                    # Form components
│   │   ├── 📄 LoginForm.tsx
│   │   ├── 📄 RegisterForm.tsx
│   │   └── 📄 PromptSubmissionForm.tsx
│   └── 📁 layout/                   # Layout components
│       ├── 📄 Navbar.tsx
│       ├── 📄 Sidebar.tsx
│       └── 📄 Footer.tsx
├── 📁 lib/                          # Utility libraries
│   ├── 📄 auth.ts                   # Authentication logic
│   ├── 📄 db.ts                     # Database connection
│   ├── 📄 validations.ts            # Zod schemas
│   ├── 📄 utils.ts                  # Helper functions
│   ├── 📄 constants.ts              # App constants
│   └── 📄 types.ts                  # TypeScript type definitions
├── 📁 store/                        # Zustand state management
│   ├── 📄 authStore.ts              # Authentication state
│   ├── 📄 gameStore.ts              # Game progress state
│   ├── 📄 userStore.ts              # User profile state
│   └── 📄 index.ts                  # Store exports
├── 📁 hooks/                        # Custom React hooks
│   ├── 📄 useAuth.ts                # Authentication hook
│   ├── 📄 useGame.ts                # Game logic hook
│   ├── 📄 useLocalStorage.ts        # Local storage hook
│   └── 📄 useApi.ts                 # API interaction hook
├── 📁 styles/                       # Global styles
│   ├── 📄 globals.css               # Global CSS + Tailwind
│   ├── 📄 components.css            # Component-specific styles
│   └── 📄 animations.css            # Framer Motion animations
├── 📁 data/                         # Static game data
│   ├── 📄 worlds.json               # World configurations
│   ├── 📄 quests.json               # Quest definitions
│   ├── 📄 achievements.json         # Achievement definitions
│   └── 📄 prompts.json              # Sample prompts
├── 📁 public/                       # Static assets
│   ├── 📁 images/
│   │   ├── 📁 worlds/               # World-themed images
│   │   ├── 📁 badges/               # Achievement badges
│   │   ├── 📁 avatars/              # User avatars
│   │   └── 📁 ui/                   # UI icons and graphics
│   ├── 📁 sounds/                   # Audio files
│   │   ├── 📄 success.mp3
│   │   ├── 📄 level-up.mp3
│   │   └── 📄 battle.mp3
│   └── 📄 favicon.ico
├── 📁 backend/                      # Express.js backend (optional microservice)
│   ├── 📁 routes/
│   ├── 📁 controllers/
│   ├── 📁 middleware/
│   ├── 📁 models/
│   └── 📄 server.js
├── 📁 database/                     # Database related files
│   ├── 📁 migrations/               # Prisma migrations
│   ├── 📁 seeds/                    # Database seeds
│   └── 📄 schema.prisma             # Prisma schema
├── 📁 tests/                        # Test files
│   ├── 📁 __tests__/
│   ├── 📁 components/
│   ├── 📁 pages/
 │   └── 📄 setup.ts
├── 📄 package.json                  # Dependencies and scripts
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 tailwind.config.js            # Tailwind CSS configuration
├── 📄 next.config.js                # Next.js configuration
├── 📄 .env.local                    # Environment variables (local)
├── 📄 .env.example                  # Environment variables template
├── 📄 .gitignore                    # Git ignore rules
├── 📄 docker-compose.yml            # Docker configuration
├── 📄 Dockerfile                    # Docker image
└── 📄 README.md                     # Project documentation
```

## 🚀 Quick Start Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "db:generate": "prisma generate",
    "db:migrate": "prisma migrate dev",
    "db:seed": "prisma db seed",
    "db:studio": "prisma studio",
    "test": "jest",
    "test:watch": "jest --watch",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down",
    "full:dev": "npm run docker:up && npm run db:migrate && npm run db:seed && npm run dev",
    "full:reset": "npm run docker:down && npm run docker:up && npm run db:migrate && npm run db:seed"
  }
}
```

## 🎮 Core Game Architecture

### User Progress System
- **XP System**: Experience points for quest completion
- **Level System**: Progressive unlocking of content
- **Badge System**: Achievement tracking and rewards
- **Streak System**: Daily engagement rewards

### World Structure
1. **Prompt Basics World** - Fundamentals of prompt engineering
2. **Advanced Techniques World** - Complex prompting strategies
3. **AI Model Mastery World** - Model-specific optimizations
4. **Creative Applications World** - Real-world use cases

### Quest Types
- **Tutorial Quests** - Interactive learning modules
- **Challenge Quests** - Skill-testing scenarios
- **Battle Quests** - Competitive prompt battles
- **Creative Quests** - Open-ended prompt creation

## 🔧 Technology Stack Integration

### Frontend Technologies
- **Next.js 14+**: App Router, Server Components, Streaming
- **TypeScript**: Full type safety across the application
- **Tailwind CSS**: Utility-first styling with custom game themes
- **Framer Motion**: Smooth animations and transitions
- **Zustand**: Lightweight state management
- **React Query**: Server state management and caching

### Backend Technologies
- **Node.js + Express**: RESTful API development
- **PostgreSQL**: Primary database for user data and progress
- **Redis**: Session management and caching
- **Prisma**: Type-safe database ORM
- **JWT**: Secure authentication tokens

### Development Tools
- **ESLint + Prettier**: Code quality and formatting
- **Jest + Testing Library**: Unit and integration testing
- **Docker**: Containerized development environment
- **GitHub Actions**: CI/CD pipeline automation

This structure provides a solid foundation for building a scalable, maintainable gamified learning platform while keeping the codebase organized and developer-friendly.