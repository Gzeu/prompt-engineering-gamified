# Contributing to Prompt Engineering Gamified

We love your input! We want to make contributing to this project as easy and transparent as possible, whether it's:

- Reporting a bug
- Discussing the current state of the code
- Submitting a fix
- Proposing new features
- Becoming a maintainer

## Development Process

We use GitHub to host code, to track issues and feature requests, as well as accept pull requests.

1. Fork the repo and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## Pull Request Process

1. **Create a feature branch**: `git checkout -b feature/amazing-feature`
2. **Make your changes**: Follow the coding standards below
3. **Test your changes**: `npm run test`
4. **Lint your code**: `npm run lint:fix`
5. **Commit your changes**: Use conventional commit format
6. **Push to your fork**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Provide a clear description of changes

## Coding Standards

### TypeScript
- Use strict TypeScript configuration
- Provide proper type definitions
- Avoid `any` types when possible
- Use interfaces for object types
- Use enums for constants with multiple values

### React/Next.js
- Use functional components with hooks
- Follow the component structure: imports, types, component, export
- Use `'use client'` directive for client components
- Implement proper error boundaries
- Use Suspense for loading states

### Styling
- Use Tailwind CSS utility classes
- Follow the design system colors and spacing
- Use CSS-in-JS only when necessary
- Maintain responsive design principles
- Test on multiple screen sizes

### Code Organization
- Keep components small and focused
- Use custom hooks for stateful logic
- Separate business logic into services
- Use proper file and folder naming conventions
- Keep imports organized (external, internal, relative)

## Conventional Commits

We use conventional commits for consistent commit messages:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Formatting, missing semicolons, etc.
- `refactor:` - Code restructuring without changing functionality
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Examples:
```
feat: add user authentication system
fix: resolve XP calculation bug
docs: update API documentation
style: format code with prettier
refactor: optimize quest loading performance
test: add unit tests for user service
chore: update dependencies
```

## Testing

### Frontend Testing
- Write unit tests for utilities and hooks
- Write component tests for UI components
- Write integration tests for complex features
- Aim for >80% code coverage

### Backend Testing
- Write unit tests for services and utilities
- Write integration tests for API endpoints
- Test error handling and edge cases
- Mock external dependencies

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run backend tests
cd backend && npm test
```

## Issue Reporting

Great issues tend to have:

- A quick summary and/or background
- Steps to reproduce (be specific!)
- What you expected would happen
- What actually happens
- Notes (possibly including why you think this might be happening, or stuff you tried that didn't work)

## Feature Requests

We'd love to hear your ideas! When suggesting features:

1. **Check existing issues** first to avoid duplicates
2. **Provide clear use cases** for the feature
3. **Consider the scope** - is it a small enhancement or major feature?
4. **Think about implementation** - any technical considerations?
5. **Consider alternatives** - are there other ways to solve the problem?

## Development Setup

1. **Clone your fork**:
   ```bash
   git clone https://github.com/yourusername/prompt-engineering-gamified.git
   cd prompt-engineering-gamified
   ```

2. **Install dependencies**:
   ```bash
   ./scripts/setup.sh
   ```

3. **Create .env file**:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start development**:
   ```bash
   npm run full:dev
   ```

## Code Review Process

The core team looks at Pull Requests on a regular basis. After feedback has been given we expect responses within two weeks. After two weeks we may close the pull request if it isn't showing any activity.

### Review Criteria

- **Code Quality**: Clean, readable, and maintainable
- **Testing**: Adequate test coverage for new features
- **Documentation**: Updated docs for API changes
- **Performance**: No unnecessary performance impacts
- **Security**: No security vulnerabilities introduced
- **Design**: Follows the established design patterns

## Community Guidelines

- **Be respectful**: Treat everyone with respect and kindness
- **Be collaborative**: Work together to improve the project
- **Be inclusive**: Welcome people of all backgrounds and experience levels
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Understand that everyone has different schedules

## Getting Help

If you need help with development:

- Check the [README.md](README.md) for setup instructions
- Look through existing [issues](https://github.com/Gzeu/prompt-engineering-gamified/issues)
- Join our [Discord community](https://discord.gg/promptcraft)
- Contact the maintainers

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (MIT License).

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes for significant contributions
- Special badges in the platform (for major contributors)

Thank you for contributing to Prompt Engineering Gamified! 🎆