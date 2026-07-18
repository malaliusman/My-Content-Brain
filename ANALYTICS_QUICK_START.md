# Analytics Dashboard - Quick Start Guide

## 🚀 Getting Started

### Installation & Setup

#### 1. Install Dependencies
```bash
npm install
npm install recharts
```

#### 2. Database Migration
```bash
# Generate the Prisma client
npm run prisma:generate

# Run migrations to create new tables
npm run prisma:migrate
# When prompted, name it: add_analytics_tables
```

#### 3. Environment Setup
Ensure your `.env.local` has:
```env
DATABASE_URL=your_database_url
OPENAI_API_KEY=your_openai_api_key
```

#### 4. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000/dashboard/analytics` to see the dashboard!

---

## 📊 What's Included

### Database Tables (3 New Models)

| Table | Purpose | Key Fields |
|-------|---------|-----------|
| `content_analytics` | Track content performance | views, likes, shares, comments, platform |
| `ai_usage_logs` | Monitor AI usage & costs | model, tokens_used, request_type, cost |
| `publishing_logs` | Track publishing attempts | platform, status, error_message, published_at |

### API Endpoints (6 Routes)

| Endpoint | Purpose | Query Params |
|----------|---------|--------------|
| `/api/analytics/overview` | High-level metrics | `range` |
| `/api/analytics/content-performance` | Content-level details | `range` |
| `/api/analytics/ai-usage` | AI usage breakdown | `range` |
| `/api/analytics/publishing` | Publishing statistics | `range` |
| `/api/analytics/export` | Export data | `range`, `format` |
| `/api/analytics/ai-advisor` | AI recommendations | — |

### Frontend Components (7 Components)

| Component | Purpose |
|-----------|---------|
| `AnalyticsDashboard` | Main dashboard page |
| `StatCard` | Display key metrics |
| `ContentChart` | Line chart - content trends |
| `AIUsageChart` | Pie chart - AI usage breakdown |
| `PublishingChart` | Bar chart - platform performance |
| `AIContentAdvisor` | AI recommendations |
| `TimeRangeFilter` | Date range selector |
| `ExportButton` | CSV/PDF export |

---

## 💡 How to Use

### Viewing the Dashboard

1. Navigate to `/dashboard/analytics`
2. Choose a time range (24h, 7d, 30d, all-time)
3. View your content metrics in real-time
4. Check AI recommendations from the Content Advisor
5. Export data as CSV or PDF

### Filtering Data

```typescript
// All endpoints support date range filtering
GET /api/analytics/overview?range=30days

// Supported ranges:
// - 24hours
// - 7days
// - 30days (default)
// - all
```

### Exporting Data

```typescript
// Export as CSV
GET /api/analytics/export?range=30days&format=csv

// Export as PDF
GET /api/analytics/export?range=30days&format=pdf
```

---

## 📝 Integration Examples

### Track Content Analytics

After publishing content, log its metrics:

```typescript
import { prisma } from '@/lib/prisma';

await prisma.contentAnalytics.create({
  data: {
    contentId: 'content-123',
    userId: 'user-456',
    views: 540,
    likes: 42,
    shares: 15,
    comments: 8,
    platform: 'linkedin',
    published: true,
  },
});
```

### Log AI Usage

After generating content with AI:

```typescript
await prisma.aIUsageLog.create({
  data: {
    userId: 'user-456',
    model: 'gpt-4',
    tokensUsed: 3500,
    requestType: 'article-generation',
    estimatedCost: 0.14,
  },
});
```

### Track Publishing Attempts

After attempting to publish:

```typescript
await prisma.publishingLog.create({
  data: {
    userId: 'user-456',
    contentId: 'content-123',
    platform: 'linkedin',
    status: 'SUCCESS',
    publishedAt: new Date(),
  },
});

// For failures:
await prisma.publishingLog.create({
  data: {
    userId: 'user-456',
    contentId: 'content-123',
    platform: 'wordpress',
    status: 'FAILED',
    errorMessage: 'Invalid credentials',
  },
});
```

---

## 🧠 AI Content Advisor

The AI Content Advisor uses GPT-4 to analyze your content performance and provide personalized recommendations.

### How It Works

1. **Analyzes** last 30 days of content performance
2. **Calculates** engagement rates by content type
3. **Uses GPT-4** to generate insights and recommendations
4. **Returns** actionable advice to improve your strategy

### Example Response

```json
{
  "recommendation": "Your philosophical posts receive 40% higher engagement than other content types. Increase philosophical content by 50% and reduce quote-based posts to achieve 30% engagement growth.",
  "topPerformingType": "blog",
  "engagementRates": [
    {
      "type": "blog",
      "engagementRate": 2.5,
      "averageViews": 540
    }
  ],
  "dataPointsAnalyzed": 245
}
```

---

## 📈 Dashboard Features

### Statistics Cards
- **Content Created** - Total articles, stories, posts created
- **Published Posts** - Successfully published content count
- **AI Tokens Used** - Total tokens consumed (in thousands)
- **Total Engagement** - Sum of all views, likes, shares, comments

### Charts

**Content Creation Trend**
- Line chart showing content creation over time
- Visual trend analysis

**AI Usage by Type**
- Pie chart of AI request types
- Color-coded segments

**Publishing Performance**
- Bar chart comparing platforms
- Shows SUCCESS, FAILED, PENDING statuses

### Time Range Filtering
- 24 Hours
- 7 Days
- 30 Days
- All Time

### Export Options
- **CSV** - For spreadsheet analysis
- **PDF** - For reports and sharing

---

## 🔍 Troubleshooting

### "Charts not showing"
```bash
# Make sure recharts is installed
npm list recharts

# If missing:
npm install recharts
```

### "AI Advisor not working"
- Check OpenAI API key is set in `.env.local`
- Verify account has API quota
- Check browser console for detailed errors

### "No data showing"
- Ensure you have content analytics data in database
- Try different date range
- Check that data creation integration is working

### "Export not working"
- Verify analytics data exists for selected range
- Check browser download settings
- Try different format (CSV vs PDF)

---

## 📦 Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   └── analytics/
│   │       └── page.tsx                 ← Main dashboard
│   └── api/
│       └── analytics/
│           ├── overview/route.ts        ← Overview endpoint
│           ├── content-performance/route.ts
│           ├── ai-usage/route.ts
│           ├── publishing/route.ts
│           ├── export/route.ts
│           └── ai-advisor/route.ts
└── components/
    └── analytics/
        ├── StatCard.tsx
        ├── ContentChart.tsx
        ├── AIUsageChart.tsx
        ├── PublishingChart.tsx
        ├── AIContentAdvisor.tsx
        ├── ExportButton.tsx
        └── TimeRangeFilter.tsx

prisma/
└── schema.prisma                        ← Updated with 3 new models
```

---

## 🎯 Next Steps

After successfully setting up the Analytics Dashboard:

### Phase 4: AI Writer Engine
- [ ] Create article generator
- [ ] Create story generator
- [ ] Create LinkedIn post generator
- [ ] Create WordPress article generator
- [ ] Integrate OpenAI API
- [ ] Add prompt templates

### Phase 5: Publishing Integration
- [ ] LinkedIn API integration
- [ ] WordPress API integration
- [ ] Facebook API integration
- [ ] Auto-publishing feature

### Phase 6: Advanced Features
- [ ] Predictive analytics
- [ ] Optimal posting time recommendations
- [ ] Content scheduling
- [ ] Anomaly detection
- [ ] Bulk operations

---

## ✅ Verification Checklist

- [ ] Dependencies installed (`npm install`)
- [ ] Database migrations run (`npm run prisma:migrate`)
- [ ] Dashboard accessible at `/dashboard/analytics`
- [ ] Statistics cards displaying correctly
- [ ] Charts rendering without errors
- [ ] Time range filter working
- [ ] Export button functional
- [ ] AI Content Advisor showing recommendations
- [ ] API endpoints responding with correct data
- [ ] No console errors in browser

---

## 📚 Additional Resources

- [Recharts Documentation](https://recharts.org)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [OpenAI API Docs](https://platform.openai.com/docs)

---

## 🆘 Support

If you encounter issues:

1. Check browser console for errors (F12)
2. Review server logs: `npm run dev`
3. Verify database connection
4. Ensure all environment variables are set
5. Check API endpoint responses with Postman
6. Review ANALYTICS_IMPLEMENTATION.md for detailed documentation

---

**Happy tracking! Your analytics dashboard is ready to help you understand your content performance.** 📊✨
