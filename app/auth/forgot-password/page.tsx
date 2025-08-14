'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { sendPasswordResetEmail } from '@/utils/supabase/auth-helpers';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import Button from '@/app/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { error } = await sendPasswordResetEmail(email);
      
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-ink mb-2">
            Reset Your Password
          </h1>
          <p className="text-gray">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        <GlassmorphicCard blur="lg" opacity={0.1} borderGlow>
          <div className="p-8">
            {success ? (
              <div className="space-y-6">
                <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                  <p className="text-sm text-success text-center">
                    Password reset instructions have been sent to your email!
                  </p>
                </div>
                
                <div className="text-center">
                  <p className="text-sm text-gray mb-4">
                    Check your email for a link to reset your password.
                    If it doesn't appear within a few minutes, check your spam folder.
                  </p>
                  
                  <Link
                    href="/auth/login"
                    className="text-accent hover:text-accent/80 transition-colors font-medium"
                  >
                    Return to sign in
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg">
                    <p className="text-sm text-danger">{error}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-ink/5 border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-ink placeholder-gray/50"
                    placeholder="your@email.com"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </Button>

                <div className="text-center">
                  <span className="text-sm text-gray">
                    Remember your password?{' '}
                    <Link
                      href="/auth/login"
                      className="text-accent hover:text-accent/80 transition-colors font-medium"
                    >
                      Sign in
                    </Link>
                  </span>
                </div>
              </form>
            )}
          </div>
        </GlassmorphicCard>

        {/* Loop Animation */}
        <div className="mt-8 flex justify-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 border-2 border-accent/20 rounded-full animate-spin-slow" />
            <div className="absolute inset-2 border-2 border-signal/20 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
            <div className="absolute inset-4 border-2 border-accent/20 rounded-full animate-spin-slow" />
          </div>
        </div>
      </div>
    </div>
  );
}
