'use server';

import { openai } from '@/lib/openai';

interface GenerateVariationsParams {
  content: string;
  type: string;
  count?: number;
}

export async function generateVariations(params: GenerateVariationsParams) {
  const { content, type, count = 3 } = params;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are a content variation expert. Generate ${count} different variations of the given content for ${type}. 
        Each variation should have a unique angle or perspective while maintaining the core message.
        Format your response as numbered variations (1. ... 2. ... etc.)`,
      },
      {
        role: 'user',
        content: `Generate ${count} variations of this content:\n${content}`,
      },
    ],
    temperature: 0.8,
    max_tokens: 3000,
  });

  const result = response.choices[0]?.message?.content || '';
  const tokensUsed = response.usage?.total_tokens || 0;

  // Parse variations from the response
  const variations = result
    .split(/\d+\.\s+/)
    .filter((v) => v.trim())
    .map((v) => v.trim());

  return {
    variations,
    tokensUsed,
  };
}

export async function rewriteForPlatform(content: string, targetPlatform: string) {
  const platformGuides: Record<string, string> = {
    linkedin: 'Rewrite this as a professional LinkedIn post with industry insights and engagement hooks.',
    facebook: 'Rewrite this as a casual, shareable Facebook post that encourages comments and reactions.',
    twitter: 'Rewrite this as compelling Twitter threads (max 280 chars per tweet).',
    instagram: 'Rewrite this as an engaging Instagram caption with emojis and hashtags.',
    tiktok: 'Rewrite this as a TikTok script that is trendy, entertaining, and viral-worthy.',
  };

  const guide = platformGuides[targetPlatform] || `Rewrite this for ${targetPlatform}.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content:
          'You are a social media expert who understands the unique requirements and audience expectations of different platforms.',
      },
      {
        role: 'user',
        content: `${guide}\n\nOriginal content:\n${content}`,
      },
    ],
    temperature: 0.7,
    max_tokens: 1500,
  });

  const rewrittenContent = response.choices[0]?.message?.content || '';
  const tokensUsed = response.usage?.total_tokens || 0;

  return {
    content: rewrittenContent,
    tokensUsed,
  };
}
