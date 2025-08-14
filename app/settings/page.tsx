'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContext';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import Button from '@/app/components/ui/Button';
import { updatePassword } from '@/utils/supabase/auth-helpers';
import { createClient } from '@/utils/supabase/client';
import { UserRole } from '@/types/supabase';

interface ProfileFormData {
  fullName: string;
  email: string;
  organization: string;
  role: UserRole;
}

export default function SettingsPage() {
  const router = useRouter();
  const { user, profile, refreshAuth } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'preferences'>('profile');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  // Profile form state
  const [profileData, setProfileData] = useState<ProfileFormData>({
    fullName: '',
    email: '',
    organization: '',
    role: 'member'
  });
  
  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Load user profile data
  useEffect(() => {
    if (user && profile) {
      setProfileData({
        fullName: profile.full_name || '',
        email: profile.email || user.email || '',
        organization: profile.organization || '',
        role: profile.role
      });
    }
  }, [user, profile]);
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    try {
      const supabase = createClient();
      
      // Update user profile
      const { error } = await supabase
        .from('users')
        .update({
          full_name: profileData.fullName,
          organization: profileData.organization,
          updated_at: new Date().toISOString()
        })
        .eq('id', user!.id);
      
      if (error) throw error;
      
      await refreshAuth();
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update profile' });
    } finally {
      setLoading(false);
    }
  };
  
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    // Validate passwords
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      setLoading(false);
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long' });
      setLoading(false);
      return;
    }
    
    try {
      const { error } = await updatePassword(passwordData.newPassword);
      
      if (error) throw error;
      
      // Clear password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      setMessage({ type: 'success', text: 'Password updated successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update password' });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ProtectedRoute>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-display font-bold text-ink mb-2">Settings</h1>
            <p className="text-gray">Manage your account and preferences</p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-8">
            {(['profile', 'security', 'preferences'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium capitalize rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-accent text-white'
                    : 'text-gray hover:text-ink hover:bg-ink/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Tab Content */}
          <GlassmorphicCard blur="lg" opacity={0.1} borderGlow>
            <div className="p-8">
              {message && (
                <div
                  className={`p-4 mb-6 rounded-lg ${
                    message.type === 'success'
                      ? 'bg-success/10 border border-success/20 text-success'
                      : 'bg-danger/10 border border-danger/20 text-danger'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              )}
              
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray mb-2">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={profileData.fullName}
                      onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-ink/5 border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-ink"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray mb-2">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={profileData.email}
                      disabled
                      className="w-full px-4 py-3 bg-ink/5 border border-ink/10 rounded-lg text-gray/70 cursor-not-allowed"
                    />
                    <p className="mt-1 text-xs text-gray/60">Email cannot be changed</p>
                  </div>
                  
                  <div>
                    <label htmlFor="organization" className="block text-sm font-medium text-gray mb-2">
                      Organization
                    </label>
                    <input
                      id="organization"
                      type="text"
                      value={profileData.organization}
                      onChange={(e) => setProfileData({ ...profileData, organization: e.target.value })}
                      className="w-full px-4 py-3 bg-ink/5 border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-ink"
                      placeholder="Your organization or affiliation"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray mb-2">
                      Role
                    </label>
                    <input
                      id="role"
                      type="text"
                      value={profileData.role}
                      disabled
                      className="w-full px-4 py-3 bg-ink/5 border border-ink/10 rounded-lg text-gray/70 cursor-not-allowed capitalize"
                    />
                    <p className="mt-1 text-xs text-gray/60">Contact an administrator to change your role</p>
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Profile'}
                  </Button>
                </form>
              )}
              
              {/* Security Tab */}
              {activeTab === 'security' && (
                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-ink mb-4">Change Password</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray mb-2">
                          New Password
                        </label>
                        <input
                          id="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                          className="w-full px-4 py-3 bg-ink/5 border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-ink"
                          required
                          minLength={8}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray mb-2">
                          Confirm New Password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                          className="w-full px-4 py-3 bg-ink/5 border border-ink/10 rounded-lg focus:outline-none focus:border-accent transition-colors text-ink"
                          required
                          minLength={8}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </Button>
                </form>
              )}
              
              {/* Preferences Tab */}
              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-ink mb-4">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-accent focus:ring-accent border-gray rounded"
                        defaultChecked
                      />
                      <span className="text-ink">Email notifications for critical alerts</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-accent focus:ring-accent border-gray rounded"
                        defaultChecked
                      />
                      <span className="text-ink">Weekly digest of network activity</span>
                    </label>
                    
                    <label className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-accent focus:ring-accent border-gray rounded"
                      />
                      <span className="text-ink">SMS alerts for urgent incidents</span>
                    </label>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="primary" disabled>
                      Save Preferences
                    </Button>
                    <p className="mt-2 text-sm text-gray/60">Preference management coming soon</p>
                  </div>
                </div>
              )}
            </div>
          </GlassmorphicCard>
          
          {/* Danger Zone */}
          <GlassmorphicCard blur="lg" opacity={0.1} className="mt-8 border-danger/20">
            <div className="p-8">
              <h3 className="text-xl font-bold text-danger mb-4">Danger Zone</h3>
              <p className="text-gray mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button variant="secondary" className="border-danger text-danger hover:bg-danger/10">
                Delete Account
              </Button>
            </div>
          </GlassmorphicCard>
        </div>
      </div>
    </ProtectedRoute>
  );
}
