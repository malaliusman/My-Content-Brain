'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Plus, Trash2, Share2 } from 'lucide-react';

export default function LibraryPage() {
  const { user, isLoading } = useAuth();
  const [contents] = useState([
    {
      id: '1',
      title: 'How to Start a Blog in 2024',
      type: 'blog',
      preview: 'Learn the essential steps to launch your blogging career...',
      createdAt: new Date('2024-01-15'),
      published: true,
    },
    {
      id: '2',
      title: 'LinkedIn Post: Growth Mindset',
      type: 'linkedin',
      preview: 'Your mindset determines your success. Here\'s why...',
      createdAt: new Date('2024-01-10'),
      published: false,
    },
  ]);

  return (
    <ProtectedRoute isLoading={isLoading} isAuthorized={!!user}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">📚 Library</h1>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90 flex items-center gap-2">
            <Plus size={20} />
            New Content
          </button>
        </div>

        {contents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No content yet. Start creating with AI Writer!</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {contents.map((content) => (
              <div key={content.id} className="bg-card border border-border rounded-lg p-6 flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold">{content.title}</h2>
                    <span className="text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded">{content.type}</span>
                    {content.published && (
                      <span className="text-sm bg-green-500 text-white px-2 py-1 rounded">Published</span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{content.preview}</p>
                  <p className="text-sm text-muted-foreground mt-2">{content.createdAt.toLocaleDateString()}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-secondary text-secondary-foreground rounded hover:opacity-90" title="Share">
                    <Share2 size={20} />
                  </button>
                  <button className="p-2 bg-destructive text-destructive-foreground rounded hover:opacity-90" title="Delete">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
