'use client';

import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function SettingsPage() {
  const { user, isLoading } = useAuth();

  return (
    <ProtectedRoute isLoading={isLoading} isAuthorized={!!user}>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Settings</h1>

        <div className="bg-card border border-border rounded-lg p-6 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
            <p className="text-muted-foreground">Manage your account preferences and integrations</p>
          </div>

          <hr className="border-border" />

          <div>
            <h3 className="text-lg font-semibold mb-2">API Integrations</h3>
            <p className="text-muted-foreground mb-4">Connect your OpenAI, WordPress, LinkedIn, and Facebook accounts</p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90">
              Connect Integrations
            </button>
          </div>

          <hr className="border-border" />

          <div>
            <h3 className="text-lg font-semibold mb-2">Preferences</h3>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span>Email notifications</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span>Dark mode</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
