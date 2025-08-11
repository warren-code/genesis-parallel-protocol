'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import Button from '@/app/components/ui/Button';
import { createClient } from '@/utils/supabase/client';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  component: React.ComponentType<any>;
}

// Step Components
const WelcomeStep = ({ onNext }: { onNext: () => void }) => {
  const { profile } = useAuth();
  
  return (
    <div className="text-center space-y-6">
      <h2 className="text-3xl font-display font-bold text-ink">
        Welcome to Genesis Parallel Protocol, {profile?.full_name || 'Friend'}!
      </h2>
      <p className="text-lg text-gray max-w-2xl mx-auto">
        You're about to enter a decentralized network designed to protect and empower communities.
        Let's get you set up in just a few steps.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-accent/5 rounded-lg border border-accent/20">
          <div className="text-4xl mb-4">🛡️</div>
          <h3 className="font-bold text-ink mb-2">Protect</h3>
          <p className="text-sm text-gray">
            Document incidents and protect your community with our secure evidence system
          </p>
        </div>
        
        <div className="p-6 bg-signal/5 rounded-lg border border-signal/20">
          <div className="text-4xl mb-4">🤝</div>
          <h3 className="font-bold text-ink mb-2">Connect</h3>
          <p className="text-sm text-gray">
            Join a network of advocates, attorneys, and community members
          </p>
        </div>
        
        <div className="p-6 bg-success/5 rounded-lg border border-success/20">
          <div className="text-4xl mb-4">💪</div>
          <h3 className="font-bold text-ink mb-2">Empower</h3>
          <p className="text-sm text-gray">
            Access resources and tools to know your rights and take action
          </p>
        </div>
      </div>
      
      <Button variant="primary" size="lg" onClick={onNext}>
        Let's Get Started
      </Button>
    </div>
  );
};

const ProfileSetupStep = ({ onNext }: { onNext: () => void }) => {
  const { profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bio: '',
    skills: [] as string[],
    interests: [] as string[],
    availability: 'occasionally' as 'always' | 'weekdays' | 'weekends' | 'occasionally'
  });
  
  const skillOptions = [
    'Legal Research',
    'Community Organizing',
    'Documentation',
    'Technical Support',
    'Translation',
    'Media & Communications',
    'First Aid',
    'Security & Safety'
  ];
  
  const interestOptions = [
    'Civil Rights',
    'Police Accountability',
    'Environmental Justice',
    'Housing Rights',
    'Worker Rights',
    'Immigration',
    'Criminal Justice Reform',
    'Education Equity'
  ];
  
  const handleSkillToggle = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };
  
  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      
      // Update user profile with additional info
      await supabase
        .from('users')
        .update({
          bio: formData.bio,
          skills: formData.skills,
          interests: formData.interests,
          availability: formData.availability,
          onboarded: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile?.id);
      
      onNext();
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-ink">Tell Us About Yourself</h2>
        <p className="text-gray mt-2">
          This helps us connect you with the right resources and people
        </p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray mb-2">
            Brief Bio (Optional)
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 bg-ink/5 border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-ink placeholder-gray/50"
            placeholder="Tell us a bit about yourself and why you're here..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray mb-4">
            Skills You Can Contribute
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {skillOptions.map(skill => (
              <button
                key={skill}
                type="button"
                onClick={() => handleSkillToggle(skill)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  formData.skills.includes(skill)
                    ? 'bg-accent text-white border-accent'
                    : 'bg-transparent text-ink border-ink/20 hover:border-accent/50'
                }`}
              >
                {skill}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray mb-4">
            Areas of Interest
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {interestOptions.map(interest => (
              <button
                key={interest}
                type="button"
                onClick={() => handleInterestToggle(interest)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  formData.interests.includes(interest)
                    ? 'bg-signal text-white border-signal'
                    : 'bg-transparent text-ink border-ink/20 hover:border-signal/50'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray mb-2">
            Availability for Volunteer Work
          </label>
          <select
            value={formData.availability}
            onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
            className="w-full px-4 py-3 bg-ink/5 border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-ink"
          >
            <option value="always">Always available</option>
            <option value="weekdays">Weekdays only</option>
            <option value="weekends">Weekends only</option>
            <option value="occasionally">Occasionally</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-center pt-4">
        <Button
          variant="primary"
          size="lg"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

const SecurityStep = ({ onNext }: { onNext: () => void }) => {
  const [understood, setUnderstood] = useState({
    encryption: false,
    privacy: false,
    safety: false
  });
  
  const allUnderstood = Object.values(understood).every(v => v);
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display font-bold text-ink">Security & Privacy</h2>
        <p className="text-gray mt-2">
          Your safety is our priority. Please review these important points.
        </p>
      </div>
      
      <div className="space-y-4">
        <label className="flex items-start space-x-3 p-4 bg-ink/5 rounded-lg cursor-pointer hover:bg-ink/10 transition-colors">
          <input
            type="checkbox"
            checked={understood.encryption}
            onChange={(e) => setUnderstood({ ...understood, encryption: e.target.checked })}
            className="mt-1 w-4 h-4 text-accent focus:ring-accent border-gray rounded"
          />
          <div>
            <h3 className="font-bold text-ink mb-1">🔐 End-to-End Encryption</h3>
            <p className="text-sm text-gray">
              All sensitive data is encrypted. However, always be cautious about what information
              you share, especially in public forums.
            </p>
          </div>
        </label>
        
        <label className="flex items-start space-x-3 p-4 bg-ink/5 rounded-lg cursor-pointer hover:bg-ink/10 transition-colors">
          <input
            type="checkbox"
            checked={understood.privacy}
            onChange={(e) => setUnderstood({ ...understood, privacy: e.target.checked })}
            className="mt-1 w-4 h-4 text-accent focus:ring-accent border-gray rounded"
          />
          <div>
            <h3 className="font-bold text-ink mb-1">👤 Privacy First</h3>
            <p className="text-sm text-gray">
              We never share your data with third parties. You control what information is visible
              to other network members.
            </p>
          </div>
        </label>
        
        <label className="flex items-start space-x-3 p-4 bg-ink/5 rounded-lg cursor-pointer hover:bg-ink/10 transition-colors">
          <input
            type="checkbox"
            checked={understood.safety}
            onChange={(e) => setUnderstood({ ...understood, safety: e.target.checked })}
            className="mt-1 w-4 h-4 text-accent focus:ring-accent border-gray rounded"
          />
          <div>
            <h3 className="font-bold text-ink mb-1">⚠️ Digital Safety</h3>
            <p className="text-sm text-gray">
              Use unique passwords, enable 2FA when available, and be mindful of your digital
              footprint. Consider using a VPN for additional security.
            </p>
          </div>
        </label>
      </div>
      
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
        <p className="text-sm text-warning text-center">
          <strong>Remember:</strong> No system is 100% secure. Always use your best judgment
          when sharing sensitive information.
        </p>
      </div>
      
      <div className="flex justify-center pt-4">
        <Button
          variant="primary"
          size="lg"
          onClick={onNext}
          disabled={!allUnderstood}
        >
          I Understand & Accept
        </Button>
      </div>
    </div>
  );
};

const CompletionStep = () => {
  const router = useRouter();
  const { profile } = useAuth();
  
  return (
    <div className="text-center space-y-6">
      <div className="w-24 h-24 mx-auto mb-6">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 border-4 border-success rounded-full animate-pulse" />
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            ✓
          </div>
        </div>
      </div>
      
      <h2 className="text-3xl font-display font-bold text-ink">
        You're All Set!
      </h2>
      
      <p className="text-lg text-gray max-w-2xl mx-auto">
        Welcome to the network, {profile?.full_name}. You're now part of a growing community
        working towards justice and accountability.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-6">
        <Button
          variant="secondary"
          onClick={() => router.push('/learn')}
        >
          📚 Explore Resources
        </Button>
        
        <Button
          variant="primary"
          onClick={() => router.push('/dashboard')}
        >
          🚀 Go to Dashboard
        </Button>
      </div>
      
      <p className="text-sm text-gray pt-6">
        Need help? Check out our{' '}
        <a href="/help" className="text-accent hover:underline">
          getting started guide
        </a>{' '}
        or{' '}
        <a href="/community" className="text-accent hover:underline">
          join the community forum
        </a>.
      </p>
    </div>
  );
};

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  
  const steps: OnboardingStep[] = [
    {
      id: 0,
      title: 'Welcome',
      description: 'Get introduced to the platform',
      component: WelcomeStep
    },
    {
      id: 1,
      title: 'Profile',
      description: 'Tell us about yourself',
      component: ProfileSetupStep
    },
    {
      id: 2,
      title: 'Security',
      description: 'Review security practices',
      component: SecurityStep
    },
    {
      id: 3,
      title: 'Complete',
      description: "You're all set!",
      component: CompletionStep
    }
  ];
  
  const CurrentStepComponent = steps[currentStep].component;
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="relative">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                        index <= currentStep
                          ? 'bg-accent text-white'
                          : 'bg-ink/10 text-gray'
                      }`}
                    >
                      {index < currentStep ? '✓' : index + 1}
                    </div>
                    <p className="absolute top-12 left-1/2 -translate-x-1/2 text-xs text-gray whitespace-nowrap">
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-colors ${
                        index < currentStep ? 'bg-accent' : 'bg-ink/10'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Step Content */}
          <GlassmorphicCard blur="lg" opacity={0.1} borderGlow>
            <div className="p-8 md:p-12">
              <CurrentStepComponent onNext={handleNext} />
            </div>
          </GlassmorphicCard>
        </div>
      </div>
    </ProtectedRoute>
  );
}
