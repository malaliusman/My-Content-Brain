'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export function Navigation() {
  const { user, logout } = useAuth();

  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Content Brain
        </Link>

        {user ? (
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="hover:text-primary">
              Dashboard
            </Link>
            <Link href="/ai-writer" className="hover:text-primary">
              AI Writer
            </Link>
            <Link href="/knowledge-chat" className="hover:text-primary">
              Knowledge Brain
            </Link>
            <Link href="/library" className="hover:text-primary">
              Library
            </Link>
            <Link href="/profile" className="hover:text-primary">
              {user.name || user.email}
            </Link>
            <button
              onClick={() => logout()}
              className="px-4 py-2 bg-destructive text-destructive-foreground rounded hover:opacity-90"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-4 py-2 bg-primary text-primary-foreground rounded hover:opacity-90"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded hover:opacity-90"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
