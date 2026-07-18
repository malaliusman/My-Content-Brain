import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const ContentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  type: z.enum([
    'blog',
    'story',
    'linkedin',
    'facebook',
    'wordpress',
    'substack',
    'quote',
    'caption',
    'hashtag',
    'seo_title',
    'meta_description',
  ]),
  tags: z.string().optional(),
});

export const AIWriterSchema = z.object({
  prompt: z.string().min(10, 'Prompt must be at least 10 characters'),
  type: z.enum([
    'blog',
    'story',
    'linkedin',
    'facebook',
    'wordpress',
    'substack',
    'quote',
    'caption',
    'hashtag',
    'seo_title',
    'meta_description',
  ]),
  tone: z.enum(['professional', 'casual', 'creative', 'formal']).optional(),
  length: z.enum(['short', 'medium', 'long']).optional(),
});

export const KnowledgeBrainSchema = z.object({
  question: z.string().min(5, 'Question must be at least 5 characters'),
});

export type LoginInput = z.infer<typeof LoginSchema>;
export type RegisterInput = z.infer<typeof RegisterSchema>;
export type ContentInput = z.infer<typeof ContentSchema>;
export type AIWriterInput = z.infer<typeof AIWriterSchema>;
export type KnowledgeBrainInput = z.infer<typeof KnowledgeBrainSchema>;
