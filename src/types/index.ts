export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Content {
  id: string;
  userId: string;
  title: string;
  content: string;
  type: ContentType;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Conversation {
  id: string;
  userId: string;
  question: string;
  answer: string;
  createdAt: Date;
}

export interface UploadedFile {
  id: string;
  userId: string;
  fileName: string;
  fileType: FileType;
  fileSize: number;
  fileUrl: string;
  content?: string;
  createdAt: Date;
}

export interface AIGeneration {
  id: string;
  userId: string;
  prompt: string;
  output: string;
  type: ContentType;
  tokensUsed: number;
  costUSD?: number;
  createdAt: Date;
}

export type ContentType =
  | 'blog'
  | 'story'
  | 'linkedin'
  | 'facebook'
  | 'wordpress'
  | 'substack'
  | 'quote'
  | 'caption'
  | 'hashtag'
  | 'seo_title'
  | 'meta_description';

export type FileType = 'pdf' | 'docx' | 'txt' | 'markdown';

export interface AuthSession {
  user: User | null;
  isLoading: boolean;
  error?: string;
}
