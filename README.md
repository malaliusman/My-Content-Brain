

### *STEP 1: Create the project folders*

Open terminal / VS Code terminal and run this:
mkdir my-content-brain
cd my-content-brain
mkdir -p apps/web packages/database packages/ai packages/publishers
Then create the root `package.json`:
{
  "name": "my-content-brain",
  "private": true,
  "packageManager": "pnpm@9.0.0",
  "workspaces": [
    "apps/*",
    "packages/*"
  ]
}
### *STEP 2: Install http://Next.js in apps/web*
cd apps/web
pnpm dlx create-next-app@latest . --ts --tailwind --eslint --app --src-dir false --import-alias "@/*"
When it asks questions, just hit Enter for defaults.

Then install Supabase client:
pnpm add @supabase/supabase-js
### *STEP 3: Create .env.local file*

In `apps/web/` create `.env.local` and paste this for now:
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
We'll fill these in Step 4.

---

#### *Check point*
Run this to make sure http://Next.js works:
pnpm dev
Open `http://localhost:3000` - you should see the http://Next.js landing page.

No problem — we'll make them together right now. Takes 5 minutes total.

### *STEP 4A: Create Supabase Account + Project*

1. Go to: https://app.supabase.com
2. Click `Start your project` > `Sign up with GitHub` or Email
3. Click `New Project`
   - *Name*: `my-content-brain`
   - *Database Password*: make something strong and SAVE IT
   - *Region*: Pick `Mumbai, India` since you're in Virar - faster
4. Wait 1-2 min for it to provision

*Get your keys:*
5. Left sidebar > `Project Settings` > `API`
6. Copy 3 things into `apps/web/.env.local`:
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # keep this secret
### *STEP 4B: Create OpenAI Account + API Key*

1. Go to: https://platform.openai.com/signup
2. Sign up with email/phone
3. Go to: https://platform.openai.com/api-keys
4. Click `Create new secret key` > Name: `My Content Brain`
5. Copy key that starts with `sk-` and paste in `.env.local`:
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxx
6. Add billing: https://platform.openai.com/account/billing > `Add payment method`
   It’s pay-as-you-go. `gpt-4o-mini` costs like $0.15 per 1M tokens so $5 credit lasts a long time

### *STEP 4C: Run the Database Schema*

1. In Supabase: Left sidebar > `SQL Editor` > `New Query`
2. Paste the full SQL from earlier. Here’s the full version again:
CREATE TABLE profiles ( id UUID PRIMARY KEY REFERENCES auth.users(id), email TEXT UNIQUE NOT NULL, full_name TEXT, avatar_url TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() );

CREATE TABLE content_items ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES profiles(id) NOT NULL, title TEXT NOT NULL, content TEXT, content_type TEXT, status TEXT DEFAULT 'draft', created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() );

CREATE TABLE knowledge_base ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES profiles(id) NOT NULL, title TEXT NOT NULL, content TEXT NOT NULL, embedding vector(1536), created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() );

CREATE TABLE publishing_queue ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES profiles(id) NOT NULL, content_item_id UUID REFERENCES content_items(id) NOT NULL, platform TEXT, status TEXT DEFAULT 'pending', created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() );

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE publishing_queue ENABLE ROW LEVEL SECURITY;
3. Click `Run`

---

#### *Quick Test*
After you paste keys, restart:
pnpm dev
Tell me when you have:
1. `NEXT_PUBLIC_SUPABASE_URL` filled
2. `OPENAI_API_KEY` filled

No problem — we'll make them together right now. Takes 5 minutes total.

### *STEP 4A: Create Supabase Account + Project*

1. Go to: https://app.supabase.com
2. Click `Start your project` > `Sign up with GitHub` or Email
3. Click `New Project`
   - *Name*: `my-content-brain`
   - *Database Password*: make something strong and SAVE IT
   - *Region*: Pick `Mumbai, India` since you're in Virar - faster
4. Wait 1-2 min for it to provision

*Get your keys:*
5. Left sidebar > `Project Settings` > `API`
6. Copy 3 things into `apps/web/.env.local`:
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...  # keep this secret
### *STEP 4B: Create OpenAI Account + API Key*

1. Go to: https://platform.openai.com/signup
2. Sign up with email/phone
3. Go to: https://platform.openai.com/api-keys
4. Click `Create new secret key` > Name: `My Content Brain`
5. Copy key that starts with `sk-` and paste in `.env.local`:
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxx
6. Add billing: https://platform.openai.com/account/billing > `Add payment method`
   It’s pay-as-you-go. `gpt-4o-mini` costs like $0.15 per 1M tokens so $5 credit lasts a long time

### *STEP 4C: Run the Database Schema*

1. In Supabase: Left sidebar > `SQL Editor` > `New Query`
2. Paste the full SQL from earlier. Here’s the full version again:
CREATE TABLE profiles ( id UUID PRIMARY KEY REFERENCES auth.users(id), email TEXT UNIQUE NOT NULL, full_name TEXT, avatar_url TEXT, created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() );

CREATE TABLE content_items ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES profiles(id) NOT NULL, title TEXT NOT NULL, content TEXT, content_type TEXT, status TEXT DEFAULT 'draft', created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(), updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() );

CREATE TABLE knowledge_base ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES profiles(id) NOT NULL, title TEXT NOT NULL, content TEXT NOT NULL, embedding vector(1536), created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() );

CREATE TABLE publishing_queue ( id UUID PRIMARY KEY DEFAULT gen_random_uuid(), user_id UUID REFERENCES profiles(id) NOT NULL, content_item_id UUID REFERENCES content_items(id) NOT NULL, platform TEXT, status TEXT DEFAULT 'pending', created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() );

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE publishing_queue ENABLE ROW LEVEL SECURITY;
3. Click `Run`

---

#### *Quick Test*
After you paste keys, restart:
pnpm dev
Tell me when you have:
1. `NEXT_PUBLIC_SUPABASE_URL` filled
2.  `OPENAI_API_KEY` filled
Got it — *STEP 5: Create the Core Packages* ### *5.1 Create Database Package*
cd packages/database
pnpm init -y
pnpm add @supabase/supabase-js
Create `packages/database/client.ts`:
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Use this only on the server for admin tasks
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
Create `packages/database/package.json`:
{
  "name": "@my-content-brain/database",
  "version": "1.0.0",
  "type": "module",
  "main": "./client.ts"
}
### *5.2 Create AI Package*
cd../ai
pnpm init -y
pnpm add openai
Create `packages/ai/openai.ts`:
import OpenAI from 'openai'

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function generateContent(prompt: string) {
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a helpful content assistant.' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7
  })
  return res.choices[0].message.content
}
Create `packages/ai/package.json`:
{
  "name": "@my-content-brain/ai",
  "version": "1.0.0",
  "type": "module",
  "main": "./openai.ts"
}
### *5.3 Link Packages to http://Next.js*

Go back to root:
cd../..
pnpm install
pnpm add @my-content-brain/database @my-content-brain/ai --workspace
This tells http://Next.js "hey use the code from packages/"

### *5.4 Test It With an API Route*

Create `apps/web/app/api/generate/route.ts`:
import { NextResponse } from 'next/server'
import { generateContent } from '@my-content-brain/ai'

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()
    if (!prompt) return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })

    const content = await generateContent(prompt)
    return NextResponse.json({ content })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
---

### *5.5 Run + Test*

1. `pnpm dev`
2. Open Postman or just test in browser console:
curl -X POST http://localhost:3000/api/generate \
-H "Content-Type: application/json" \
-d '{"prompt":"Write 3 LinkedIn hooks about AI for founders"}'
You should get back 3 hooks from 
Perfect — *STEP 6: Save to Supabase + Build Simple UI* 💾

Now we’ll take the generated content and save it to your database, then show it on a page.

---

### *6.1 Update API Route to Save to Supabase*

Replace `apps/web/app/api/generate/route.ts` with this:
import { NextResponse } from 'next/server'
import { generateContent } from '@my-content-brain/ai'
import { supabaseAdmin } from '@my-content-brain/database'

export async function POST(req: Request) {
  try {
    const { prompt, user_id } = await req.json()
    if (!prompt) return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })

    // 1. Generate with OpenAI
    const content = await generateContent(prompt)

    // 2. Save to Supabase
    const { data, error } = await supabaseAdmin
      .from('content_items')
      .insert({
        user_id: user_id || '00000000-0000-0000-0000-000000000000', // temp user for now
        title: prompt.slice(0, 60),
        content: content,
        content_type: 'note',
        status: 'draft'
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ content, id: data.id })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
Note: We’re using a fake `user_id` for now. We’ll add real auth in Step 7.

### *6.2 Create a Simple UI Page*

Create `apps/web/app/page.tsx`:
'use client'
import { useState } from 'react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    setLoading(true)
    setResult('')
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    })
    const data = await res.json()
    setResult(data.content)
    setLoading(false)
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Content Brain 🧠</h1>
      
      <textarea 
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask me to write: LinkedIn post about AI, Blog outline, Tweet thread..."
        className="w-full h-32 p-3 border rounded-lg mb-4"
      />
      
      <button 
        onClick={handleGenerate}
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate'}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap">
          <h2 className="font-bold mb-2">Generated Content:</h2>
          {result}
        </div>
      )}
    </main>
  )
}
### *6.3 Check Supabase to See Saved Data*

1. Go to Supabase > `Table Editor` > `content_items`
2. After you click "Generate" on localhost, you should see a new row appear

---

### *6.4 Test It*

1. `pnpm dev`
2. Go to `http://localhost:3000`
3. Type: `Write 5 Twitter hooks about productivity`
4. Click Generate
5. Check Supabase - your draft should be there

Let's go — *STEP 7: Add Real Auth with Supabase* 🔐

Right now everything saves with a fake user_id. This step makes it so you login and only see YOUR content.

---

### *7.1 Install Supabase Auth Helper*
cd apps/web
pnpm add @supabase/ssr
### *7.2 Create Supabase Client for Client + Server*

Create `apps/web/lib/supabase.ts`:
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
Create `apps/web/lib/supabase-server.ts`:
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
        set(name: string, value: string, options: any) { cookieStore.set({ name, value, ...options }) },
        remove(name: string, options: any) { cookieStore.set({ name, value: '', ...options }) },
      },
    }
  )
}
### *7.3 Create Login/Signup Pages*

Create `apps/web/app/(auth)/login/page.tsx`:
'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async () => {
    await supabase.auth.signInWithPassword({ email, password })
    router.push('/dashboard')
  }

  const handleSignup = async () => {
    await supabase.auth.signUp({ email, password })
    alert('Check email to confirm')
  }

  return (
    <div className="p-8 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <input className="border p-2 w-full mb-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-4" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="bg-black text-white px-4 py-2 w-full mb-2">Login</button>
      <button onClick={handleSignup} className="border px-4 py-2 w-full">Sign Up</button>
    </div>
  )
}
### *7.4 Create Protected Dashboard*

Create `apps/web/app/(dashboard)/dashboard/page.tsx`:
import { createClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) redirect('/login')

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Welcome {user.email}</h1>
      <p className="mt-2">Your User ID: {user.id}</p>
      <a href="/" className="text-blue-500 underline mt-4 block">Go to Generator</a>
    </div>
  )
}
### *7.5 Update API Route to Use Real User*

Replace `apps/web/app/api/generate/route.ts`:
import { NextResponse } from 'next/server'
import { generateContent } from '@my-content-brain/ai'
import { createClient } from '@/lib/supabase-server'

export async function POST(req: Request) {
  const supabase = await createClient()
  const { data: { user } = await supabase.auth.getUser()
  
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { prompt } = await req.json()
  const content = await generateContent(prompt)

  const { data, error } = await supabase
    .from('content_items')
    .insert({
      user_id: user.id, // REAL user now
      title: prompt.slice(0, 60),
      content: content,
      content_type: 'note',
      status: 'draft'
    })
    .select()
    .single()

  if (error) throw error
  return NextResponse.json({ content, id: data.id })
}
### *7.6 Add RLS Policy for Profiles*

In Supabase SQL Editor run this once:
-- Auto create profile on signup
CREATE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
### *7.7 Test Auth Flow*
1. `pnpm dev`
2. Go to `http://localhost:3000/login`
3. Sign up with your email
4. Check email and confirm
5. Go to `/dashboard` - you should see your email
6. Go to `/` and generate content. Check Supabase > `content_items` - now `user_id` is YOUR real id

Project URL
NEXT_PUBLIC_SUPABASE_URL
Anon Key
NEXT_PUBLIC_SUPABASE_ANON_KEY
These are available in Supabase → Project Settings → API.
2. OpenAI
From your OpenAI account:
OPENAI_API_KEY=sk-...
3. WordPress
WordPress doesn't use a traditional API key. Instead, use:
WordPress Site URL
Username
Application Password
Create it by going to: WordPress Dashboard → Users → Profile → Application Passwords
You'll use:
WORDPRESS_URL=https://yourdomain.com
WORDPRESS_USERNAME=your_username
WORDPRESS_APP_PASSWORD=your_application_password
4. Environment file (.env.local)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

OPENAI_API_KEY=sk-your-openai-api-key

WORDPRESS_URL=https://yourdomain.com
WORDPRESS_USERNAME=your_wordpress_username
WORDPRESS_APP_PASSWORD=your_wordpress_application_password