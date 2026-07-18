'use client';

import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function PublishPage() {
  const { user, isLoading } = useAuth();

  return (
    <ProtectedRoute isLoading={isLoading} isAuthorized={!!user}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">🚀 Publish</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {['WordPress', 'LinkedIn', 'Facebook', 'Twitter'].map((platform) => (
            <div key={platform} className="bg-card border border-border rounded-lg p-6 space-y-4">
              <h2 className="text-2xl font-bold">{platform}</h2>
              <p className="text-muted-foreground">Publish your content directly to {platform}</p>
              <button className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90">
                Connect {platform}
              </button>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
