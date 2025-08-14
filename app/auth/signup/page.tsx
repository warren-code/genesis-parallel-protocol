'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import Button from '@/app/components/ui/Button';
import { UserRole } from '@/types/supabase';

export default function SignupPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'member' as UserRole,
    organization: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const roles: { value: UserRole; label: string; description: string }[] = [
    { 
      value: 'admin', 
      label: 'Administrator', 
      description: 'Full system access and management capabilities' 
    },
    { 
      value: 'ops_lead', 
      label: 'Operations Lead', 
      description: 'Manage incidents, FOIA requests, and coordinate responses' 
    },
    { 
      value: 'legal_lead', 
      label: 'Legal Lead', 
      description: 'Oversee legal cases and attorney network' 
    },
    { 
      value: 'attorney', 
      label: 'Volunteer Attorney', 
      description: 'Provide legal assistance and case support' 
    },
    { 
      value: 'member', 
      label: 'Community Member', 
      description: 'Access resources and participate in the network' 
    },
    { 
      value: 'viewer', 
      label: 'Observer', 
      description: 'Read-only access to public information' 
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setLoading(false);
      return;
    }

    try {
      const { error } = await signUp(
        formData.email,
        formData.password,
        formData.fullName,
        formData.role,
        formData.organization
      );
      
      if (error) {
        setError(error.message);
      } else {
        // Redirect to onboarding or dashboard
        router.push('/auth/onboarding');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display font-bold text-ink mb-2">
            Join the Protocol
          </h1>
          <p className="text-gray">Create your account to enter the loop</p>
        </div>

        <GlassmorphicCard blur="lg" opacity={0.1} borderGlow>
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="p-4 bg-danger/10 border border-danger/20 rounded-lg">
                <p className="text-sm text-danger">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="md:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-ink/5 border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-ink placeholder-gray/50"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div className="md:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-ink/5 border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-ink placeholder-gray/50"
                  placeholder="your@email.com"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-ink/5 border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-ink placeholder-gray/50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray hover:text-ink transition-colors"
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-ink/5 border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-ink placeholder-gray/50"
                  placeholder="••••••••"
                />
              </div>

              {/* Role Selection */}
              <div className="md:col-span-2">
                <label htmlFor="role" className="block text-sm font-medium text-gray mb-2">
                  Select Your Role
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-ink/5 border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-ink"
                >
                  {roles.map(role => (
                    <option key={role.value} value={role.value}>
                      {role.label} - {role.description}
                    </option>
                  ))}
                </select>
              </div>

              {/* Organization (optional) */}
              <div className="md:col-span-2">
                <label htmlFor="organization" className="block text-sm font-medium text-gray mb-2">
                  Organization (Optional)
                </label>
                <input
                  id="organization"
                  name="organization"
                  type="text"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-ink/5 border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-ink placeholder-gray/50"
                  placeholder="Your organization or affiliation"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <div className="text-center">
                <span className="text-sm text-gray">
                  Already have an account?{' '}
                  <Link
                    href="/auth/login"
                    className="text-accent hover:text-accent/80 transition-colors font-medium"
                  >
                    Sign in
                  </Link>
                </span>
              </div>
            </div>

            {/* Terms and Privacy */}
            <div className="text-center text-xs text-gray/70">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="underline hover:text-gray">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="underline hover:text-gray">
                Privacy Policy
              </Link>
            </div>
          </form>
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
