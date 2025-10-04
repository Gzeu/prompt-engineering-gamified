# 🎮 Prompt Engineering Gamified

> Master prompt engineering through an immersive gamified learning experience with XP, levels, quests, and community challenges.

## 🌟 Features

- **🎮 Gamified Learning**: Earn XP, level up, and unlock new content
- **🏆 Achievement System**: Collect rare badges and achievements
- **🌍 4 Learning Worlds**: From basics to advanced mastery
- **💪 Boss Battles**: Epic challenges to prove your skills
- **👥 Community**: Join guilds and compete in tournaments
- **🤖 AI-Powered Feedback**: Real-time evaluation and suggestions
- **📈 Progress Tracking**: Detailed analytics and leaderboards

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gzeu/prompt-engineering-gamified.git
   cd prompt-engineering-gamified
   ```

2. **Run setup script**
   ```bash
   chmod +x scripts/setup.sh
   ./scripts/setup.sh
   ```

3. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development server**
   ```bash
   npm run full:dev
   ```

5. **Open your browser**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## 📝 Documentation

### Project Structure

```
prompt-engineering-gamified/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── src/
│   ├── components/        # React components
│   ├── hooks/             # Custom hooks
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── backend/              # Express.js API
│   ├── src/
│   │   ├── routes/        # API endpoints
│   │   ├── services/      # Business logic
│   │   └── middleware/    # Express middleware
│   └── dist/             # Compiled TypeScript
└── scripts/              # Setup and deployment
```

### Available Scripts

```bash
# Development
npm run dev              # Start frontend only
npm run backend:dev      # Start backend only
npm run full:dev         # Start both frontend and backend

# Building
npm run build            # Build frontend
npm run backend:build    # Build backend
npm run full:build       # Build both

# Testing
npm test                 # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Run tests with coverage

# Linting
npm run lint             # Lint code
npm run lint:fix         # Fix linting issues

# Type checking
npm run type-check       # Check TypeScript types
```

## 🎮 Game Mechanics

### XP and Levels
- Complete quests to earn XP
- Level up to unlock new content
- 25 levels with increasing requirements
- Special rewards at milestone levels

### Worlds and Quests
1. **📚 Prompt Fundamentals** - Learn the basics
2. **🧠 Advanced Techniques** - Master complex strategies
3. **✨ AI Mastery** - Cutting-edge prompt engineering
4. **🎨 Creative Applications** - Artistic and innovative uses

### Achievement System
- **Common** - Basic progression achievements
- **Rare** - Skill-based accomplishments
- **Epic** - Major milestones and challenges
- **Legendary** - Elite achievements for masters

## 🔧 Development

### Tech Stack

**Frontend**
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Zustand (State Management)
- React Query (Server State)

**Backend**
- Node.js + Express
- TypeScript
- JWT Authentication
- Joi Validation
- Rate Limiting
- CORS & Helmet Security

**Future Enhancements**
- PostgreSQL + Prisma ORM
- Redis for caching
- OpenAI/Anthropic integration
- Real-time features with Socket.io

### Environment Variables

```bash
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000

# Backend
BACKEND_PORT=5000
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# External APIs (Optional)
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key
```

### API Endpoints

**Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/validate` - Validate token
- `POST /api/auth/refresh` - Refresh token

**Game**
- `GET /api/game/worlds` - Get all worlds
- `GET /api/game/worlds/:id` - Get world details
- `GET /api/game/quests/:id` - Get quest details
- `GET /api/game/challenges` - Get active challenges
- `GET /api/game/leaderboard` - Get leaderboard

**Prompts**
- `POST /api/prompt/submit` - Submit prompt for evaluation
- `POST /api/prompt/evaluate` - Get AI evaluation
- `GET /api/prompt/history` - Get user's prompt history

## 🚀 Deployment

### Production Deployment

1. **Using deployment script**
   ```bash
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```

2. **Using Docker**
   ```bash
   # Build and start services
   docker-compose up --build
   
   # For development
   docker-compose -f docker-compose.dev.yml up
   ```

3. **Manual deployment**
   ```bash
   # Install dependencies
   npm ci --only=production
   cd backend && npm ci --only=production && cd ..
   
   # Build applications
   npm run full:build
   
   # Start with PM2 (recommended)
   pm2 start ecosystem.config.js
   ```

### Deployment Platforms

**Vercel (Frontend)**
```bash
npm i -g vercel
vercel --prod
```

**Railway/Render (Full Stack)**
- Connect GitHub repository
- Set environment variables
- Deploy automatically on push

**Docker (Self-hosted)**
- Use provided Docker configurations
- Supports development and production modes
- Includes PostgreSQL and Redis services

## 📊 Monitoring

### Health Checks
- `GET /health` - Backend health status
- Includes uptime, environment, and system info

### Performance
- Bundle analysis with webpack-bundle-analyzer
- Core Web Vitals tracking
- API response time monitoring

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Use TypeScript for type safety
- Follow ESLint configuration
- Write tests for new features
- Use conventional commit messages
- Maintain code coverage above 80%

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for GPT API integration
- Anthropic for Claude API support
- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Framer Motion for smooth animations

## 📞 Support

For support, email support@promptcraft.ai or join our Discord community.

---

**Built with ❤️ by the PromptCraft Team**

[Website](https://promptcraft.ai) | [Discord](https://discord.gg/promptcraft) | [Twitter](https://twitter.com/promptcraft)