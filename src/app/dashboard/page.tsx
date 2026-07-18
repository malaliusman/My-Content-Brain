'use client';

import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isLoading } = useAuth();

  return (
    <ProtectedRoute isLoading={isLoading} isAuthorized={!!user}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Welcome, {user?.name || user?.email}!</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/ai-writer"
            className="p-6 bg-card border border-border rounded-lg hover:border-primary hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-2">✍️ AI Writer</h2>
            <p className="text-muted-foreground">Generate blog posts, stories, social media content, and more</p>
          </Link>

          <Link
            href="/knowledge-chat"
            className="p-6 bg-card border border-border rounded-lg hover:border-primary hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-2">🧠 Knowledge Brain</h2>
            <p className="text-muted-foreground">Upload and query your documents with AI</p>
          </Link>

          <Link
            href="/library"
            className="p-6 bg-card border border-border rounded-lg hover:border-primary hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-2">📚 Library</h2>
            <p className="text-muted-foreground">View and manage all your generated content</p>
          </Link>

          <Link
            href="/calendar"
            className="p-6 bg-card border border-border rounded-lg hover:border-primary hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-2">📅 Calendar</h2>
            <p className="text-muted-foreground">Schedule and publish your content</p>
          </Link>

          <Link
            href="/publish"
            className="p-6 bg-card border border-border rounded-lg hover:border-primary hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-2">🚀 Publish</h2>
            <p className="text-muted-foreground">Publish to WordPress, LinkedIn, Facebook, and more</p>
          </Link>

          <Link
            href="/settings"
            className="p-6 bg-card border border-border rounded-lg hover:border-primary hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-2">⚙️ Settings</h2>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
