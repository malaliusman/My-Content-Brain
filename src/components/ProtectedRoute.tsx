'use client';

import { ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  isLoading: boolean;
  isAuthorized: boolean;
  fallback?: ReactNode;
}

export function ProtectedRoute({
  children,
  isLoading,
  isAuthorized,
  fallback,
}: ProtectedRouteProps) {
  if (isLoading) {
    return fallback || <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthorized) {
    return fallback || (
      <div className="flex items-center justify-center h-screen">
        <a href="/login" className="text-blue-500 hover:underline">
          Please log in to continue
        </a>
      </div>
    );
  }

  return children;
}
