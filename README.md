# My Content Brain 🧠

An AI-powered personal writing assistant and knowledge management platform that helps users store, organize, and create content such as articles, blogs, stories, and social media posts.

## ✨ Features

### 🤖 AI Knowledge Bot
- Answer questions using ONLY your uploaded content
- Source attribution for every answer
- No hallucinations - says "I don't know" when unsure
- Full-text and semantic search across all content
- Gravatar integration for personalized user profiles

### ✍️ AI Writing Assistant
Create content for:
- Blog articles & WordPress posts
- LinkedIn articles & Substack newsletters
- Social media (Twitter/X, Threads, Facebook, Instagram)
- Email newsletters & Quotes
- SEO meta descriptions, titles, hooks, hashtags

### 🎨 Writing Styles
Professional | Inspirational | Storytelling | Thought-provoking | Philosophical | Witty | Sarcastic | Humorous | Corporate | Motivational | Gen Z | Formal

### 🛠️ Content Tools
- Grammar correction & plagiarism-free rewriting
- Expand/Shorten content
- Summarize articles
- Generate FAQs & bullet points
- Reading time & word count estimation
- SEO optimization
- Internal linking suggestions
- Content analytics & performance metrics

### 📊 Dashboard Analytics
- Total articles, stories, views, subscribers
- Most popular content
- Engagement & search analytics
- Content performance metrics

## 🏗️ Project Structure

```
my-content-brain/
├── frontend/          # Next.js + React application
├── backend/           # Node.js Express API
├── ai/                # AI services & LLM prompts
├── database/          # PostgreSQL schema & migrations
├── docs/              # Project documentation
├── docker/            # Docker configurations
├── .github/           # CI/CD workflows & templates
└── config/            # Environment & deployment configs
```

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL + pgvector (Supabase) |
| AI | OpenAI GPT-4, Embeddings, LangChain |
| Auth | JWT + Google OAuth + Gravatar |
| Storage | Cloudinary |
| Deployment | Vercel (frontend) + Railway (backend) |

## 📚 Quick Start

### Prerequisites
- Node.js 18+
- pnpm 8+
- PostgreSQL 16+
- Docker (optional)

### Installation

```bash
# Clone the repository
git clone https://github.com/malaliusman/my-content-brain.git
cd my-content-brain

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start development servers
pnpm dev
```

### Services
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Docs: http://localhost:5000/api/docs

## 🔧 Configuration

See [config/README.md](config/README.md) for detailed environment setup.

## 📖 Documentation

- [Frontend Setup](docs/FRONTEND.md)
- [Backend API Guide](docs/BACKEND.md)
- [AI Services](docs/AI.md)
- [Database Schema](database/README.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Support

- Create an [issue](https://github.com/malaliusman/my-content-brain/issues) for bugs
- Start a [discussion](https://github.com/malaliusman/my-content-brain/discussions) for questions
- Star the repo if you like it ⭐

---

Built with ❤️ by [Your Name]
