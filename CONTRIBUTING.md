# Contributing Guide

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/malaliusman/my-content-brain.git
   cd my-content-brain
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start development servers**
   ```bash
   pnpm dev
   ```

## Development Workflow

### Frontend Development
```bash
cd frontend
pnpm dev
# http://localhost:3000
```

### Backend Development
```bash
cd backend
pnpm dev
# http://localhost:5000
```

### Database
```bash
# Start PostgreSQL
docker-compose up -d postgres

# Push migrations
pnpm db:push

# Open Prisma Studio
pnpm db:studio
```

## Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Format code with Prettier
- Write meaningful commit messages

## Branching Strategy

- `main` - Production ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

## Commit Messages

Format: `type: description`

Types:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

Example:
```
feat: Add AI content generation for blog posts
fix: Resolve vector search timeout issue
docs: Update API documentation
```

## Pull Requests

1. Create a feature branch from `develop`
2. Make your changes
3. Ensure tests pass: `pnpm type-check && pnpm lint`
4. Create a PR with a clear description
5. Request review from maintainers
6. Address feedback and merge when approved

## Testing

```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Run tests
pnpm test
```

## Deployment

### Frontend (Vercel)
- Automatic deployment on push to main
- Set environment variables in Vercel dashboard

### Backend (Railway)
- Configure Railway token in GitHub secrets
- Automatic deployment on push to main

## Need Help?

- Check existing [issues](https://github.com/malaliusman/my-content-brain/issues)
- Open a [discussion](https://github.com/malaliusman/my-content-brain/discussions)
- Create a new [issue](https://github.com/malaliusman/my-content-brain/issues/new)

## License

MIT License - see LICENSE file for details