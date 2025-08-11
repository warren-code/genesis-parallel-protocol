'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { UserRole } from '@/types/supabase';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: UserRole[];
  fallbackPath?: string;
  requireAuth?: boolean;
  fallback?: React.ReactNode;
}

export default function ProtectedRoute({
  children,
  requiredRoles,
  fallbackPath = '/auth/login',
  requireAuth = true,
  fallback = null,
}: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Not authenticated
      if (requireAuth && !user) {
        router.push(fallbackPath);
        return;
      }

      // Check roles if specified
      if (requiredRoles && requiredRoles.length > 0 && profile) {
        const hasRequiredRole = requiredRoles.includes(profile.role);
        if (!hasRequiredRole) {
          router.push('/unauthorized');
        }
      }
    }
  }, [user, profile, loading, requiredRoles, fallbackPath, router, requireAuth]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <GlassmorphicCard blur="lg" opacity={0.1} borderGlow className="p-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-gray font-body">Verifying access...</p>
          </div>
        </GlassmorphicCard>
      </div>
    );
  }

  // Not authenticated or doesn't have required role
  if (requireAuth && !user) {
    return <>{fallback}</>;
  }
  
  if (requiredRoles && requiredRoles.length > 0 && profile && !requiredRoles.includes(profile.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

// Higher-order component for protecting pages
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<ProtectedRouteProps, 'children'>
) {
  return function ProtectedComponent(props: P) {
    return (
      <ProtectedRoute {...options}>
        <Component {...props} />
      </ProtectedRoute>
    );
  };
}
