# My Content Brain

An AI-powered content creation and knowledge management platform built with Next.js 15, TypeScript, Supabase, and OpenAI.

## Features

### Current Phase
- ✅ Project initialization with Next.js 15 + TypeScript
- ✅ Tailwind CSS setup
- ✅ ESLint + Prettier configuration
- ✅ Supabase integration (auth & database)
- ✅ Prisma ORM setup
- ✅ OpenAI API integration

### Planned Features

#### Phase 1: Core Pages
- [ ] Authentication (/login, /register, /profile)
- [ ] Dashboard (/dashboard)
- [ ] Library (/library)
- [ ] Settings (/settings)

#### Phase 2: AI Writer
Generate content in multiple formats:
- [ ] Blog articles
- [ ] Stories
- [ ] LinkedIn posts
- [ ] Facebook posts
- [ ] WordPress articles
- [ ] Substack newsletters
- [ ] Quotes
- [ ] Captions
- [ ] Hashtags
- [ ] SEO titles
- [ ] Meta descriptions

#### Phase 3: Knowledge Brain
- [ ] File upload (PDF, DOCX, TXT, Markdown)
- [ ] Vector embeddings
- [ ] Semantic search
- [ ] Content Q&A
- [ ] Content rewriting

#### Phase 4: Publishing & Analytics
- [ ] WordPress publishing
- [ ] Facebook publishing
- [ ] LinkedIn publishing
- [ ] Analytics dashboard

#### Phase 5: Advanced Features
- [ ] Dark mode
- [ ] Mobile-responsive UI
- [ ] AI content memory
- [ ] Subscription system

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/malaliusman/my-content-brain.git
cd my-content-brain
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Then fill in the values:
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key
- `OPENAI_API_KEY` - Your OpenAI API key
- `DATABASE_URL` - Your PostgreSQL connection string
- `JWT_SECRET` - A secret key for JWT tokens

4. Set up the database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
my-content-brain/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/              # Utility functions
│   │   ├── supabase/     # Supabase client
│   │   └── openai.ts     # OpenAI client
│   └── types/            # TypeScript types
├── prisma/
│   └── schema.prisma     # Database schema
└── public/               # Static assets
```

## Development

```bash
# Format code
npm run format

# Lint code
npm run lint

# View Prisma Studio
npm run prisma:studio
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
