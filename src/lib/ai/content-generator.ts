'use server';

import { openai } from '@/lib/openai';

interface GenerateContentParams {
  prompt: string;
  type: string;
  tone?: string;
  length?: string;
}

const systemPrompts: Record<string, string> = {
  blog: 'You are an expert blog writer. Write engaging, well-structured blog articles with an introduction, body paragraphs, and conclusion.',
  story: 'You are a creative storyteller. Write engaging, narrative-driven stories with characters, plot, and vivid descriptions.',
  linkedin: 'You are a professional LinkedIn content creator. Write compelling, professional posts that encourage engagement and provide value.',
  facebook: 'You are a social media expert. Write engaging Facebook posts that are conversational, relatable, and encourage shares and comments.',
  wordpress: 'You are a WordPress content specialist. Write well-formatted articles optimized for WordPress with proper structure and headings.',
  substack: 'You are a Substack newsletter writer. Write personable, engaging newsletter content that builds community and encourages subscriptions.',
  quote: 'You are an inspirational quote creator. Generate meaningful, original quotes that inspire and resonate with readers.',
  caption: 'You are a social media caption expert. Write short, punchy, engaging captions for social media posts.',
  hashtag: 'You are a hashtag strategist. Generate relevant, trending hashtags that increase visibility and engagement.',
  seo_title: 'You are an SEO expert. Create compelling, keyword-rich titles that improve search rankings and click-through rates.',
  meta_description: 'You are an SEO specialist. Write concise, compelling meta descriptions that improve search visibility and encourage clicks.',
};

const lengthGuides: Record<string, string> = {
  short: 'Keep the response between 100-300 words.',
  medium: 'Keep the response between 300-800 words.',
  long: 'Keep the response between 800-2000 words.',
};

const toneGuides: Record<string, string> = {
  professional: 'Use a professional, formal tone.',
  casual: 'Use a casual, friendly tone.',
  creative: 'Use a creative, imaginative tone.',
  formal: 'Use a formal, academic tone.',
};

export async function generateContent(params: GenerateContentParams) {
  const { prompt, type, tone, length } = params;

  let systemPrompt = systemPrompts[type] || systemPrompts.blog;

  if (tone && toneGuides[tone]) {
    systemPrompt += ` ${toneGuides[tone]}`;
  }

  if (length && lengthGuides[length]) {
    systemPrompt += ` ${lengthGuides[length]}`;
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  const content = response.choices[0]?.message?.content || '';
  const tokensUsed = response.usage?.total_tokens || 0;

  return {
    content,
    tokensUsed,
    model: response.model,
  };
}

export async function improveContent(originalContent: string, instruction: string) {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: 'You are a professional editor and content optimizer. Help improve and refine content based on user instructions.',
      },
      {
        role: 'user',
        content: `Original content:\n${originalContent}\n\nInstruction: ${instruction}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  });

  const content = response.choices[0]?.message?.content || '';
  const tokensUsed = response.usage?.total_tokens || 0;

  return {
    content,
    tokensUsed,
  };
}
