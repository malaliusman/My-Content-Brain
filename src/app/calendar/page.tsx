'use client';

import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function CalendarPage() {
  const { user, isLoading } = useAuth();

  return (
    <ProtectedRoute isLoading={isLoading} isAuthorized={!!user}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">📅 Content Calendar</h1>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="text-center text-muted-foreground py-12">
            <p className="text-lg">Content calendar feature coming soon!</p>
            <p className="text-sm">Schedule and manage your content publishing across all platforms.</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
