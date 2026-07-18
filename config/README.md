# Configuration Guide

## Environment Variables

All configuration is managed through environment variables. Copy `.env.example` to `.env` and update with your values.

### Required Variables

- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - OpenAI API key for GPT-4 and embeddings
- `JWT_SECRET` - Secret key for JWT token signing
- `CLOUDINARY_CLOUD_NAME` - Cloudinary account for file uploads
- `SUPABASE_URL` - Supabase project URL for vector database

### Optional Variables

- `GOOGLE_CLIENT_ID` - For Google OAuth authentication
- `WORDPRESS_API_URL` - For WordPress integration
- `SMTP_HOST` - For email notifications

## Local Development

1. Copy `.env.example` to `.env`
2. Update all required fields
3. Run `docker-compose up -d` to start PostgreSQL
4. Run `pnpm install && pnpm dev`

## Production Deployment

See `docs/DEPLOYMENT.md` for production configuration guidelines.
