'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { handleAuthCallback } from '@/utils/supabase/auth-helpers';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const { user, session, error } = await handleAuthCallback();
        
        if (error) {
          console.error('Auth callback error:', error);
          router.push('/auth/login?error=auth_callback_failed');
          return;
        }
        
        if (user && session) {
          // Check if user needs onboarding
          const isNewUser = !user.user_metadata?.onboarded;
          
          if (isNewUser) {
            router.push('/auth/onboarding');
          } else {
            router.push('/dashboard');
          }
        } else {
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Unexpected error during auth callback:', error);
        router.push('/auth/login?error=unexpected_error');
      }
    };
    
    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <GlassmorphicCard blur="lg" opacity={0.1} borderGlow className="p-8 max-w-md">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
          <h2 className="text-2xl font-display font-bold text-ink">Authenticating...</h2>
          <p className="text-gray text-center">
            Please wait while we complete your sign in.
          </p>
        </div>
      </GlassmorphicCard>
    </div>
  );
}
