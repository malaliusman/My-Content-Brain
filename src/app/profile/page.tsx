'use client';

import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function ProfilePage() {
  const { user, isLoading } = useAuth();

  return (
    <ProtectedRoute isLoading={isLoading} isAuthorized={!!user}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Profile</h1>

        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
            <p className="text-lg">{user?.name || 'Not set'}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
            <p className="text-lg">{user?.email}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Member Since</label>
            <p className="text-lg">{user?.createdAt?.toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
