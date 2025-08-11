'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import Button from '@/app/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';

export default function UnauthorizedPage() {
  const router = useRouter();
  const { profile } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <GlassmorphicCard blur="lg" opacity={0.1} borderGlow>
          <div className="p-8 text-center space-y-6">
            {/* Access Denied Icon */}
            <div className="w-20 h-20 mx-auto mb-4">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 border-4 border-danger rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-danger"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-display font-bold text-ink mb-2">
                Access Denied
              </h1>
              <p className="text-gray">
                You don't have permission to access this area.
              </p>
            </div>

            {profile && (
              <div className="bg-ink/5 rounded-lg p-4">
                <p className="text-sm text-gray">
                  Your current role: <span className="font-medium text-ink capitalize">{profile.role}</span>
                </p>
                <p className="text-xs text-gray/70 mt-1">
                  Contact an administrator if you believe you should have access.
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                variant="primary"
                onClick={() => router.back()}
                className="w-full"
              >
                Go Back
              </Button>

              <Link href="/dashboard">
                <Button variant="secondary" className="w-full">
                  Go to Dashboard
                </Button>
              </Link>
            </div>

            <div className="pt-4 text-sm text-gray">
              Need help?{' '}
              <Link href="/support" className="text-accent hover:underline">
                Contact Support
              </Link>
            </div>
          </div>
        </GlassmorphicCard>

        {/* Loop Animation */}
        <div className="mt-8 flex justify-center">
          <div className="relative w-16 h-16 opacity-50">
            <div className="absolute inset-0 border-2 border-danger/20 rounded-full animate-spin-slow" />
            <div className="absolute inset-2 border-2 border-danger/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
