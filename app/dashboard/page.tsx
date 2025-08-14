'use client';

import React from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import DashboardLayout from '@/app/components/dashboard/DashboardLayout';
import RealTimeStats from '@/app/components/dashboard/RealTimeStats';
import KPIBanner from '@/app/components/dashboard/KPIBanner';
import ActivityFeed from '@/app/components/dashboard/ActivityFeed';
import QuickActions from '@/app/components/dashboard/QuickActions';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { user, profile } = useAuth();

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Header */}
          <div>
            <h1 className="text-4xl font-display font-bold text-ink mb-2">
              Welcome back, {profile?.full_name || 'Traveler'}
            </h1>
            <p className="text-gray">Your consciousness journey continues...</p>
          </div>

          {/* KPI Banner with Chart.js visualizations */}
          <KPIBanner />

          {/* Real-Time Statistics */}
          <RealTimeStats />

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Activity Feed - Takes up 2 columns */}
            <div className="lg:col-span-2">
              <ActivityFeed />
            </div>

            {/* Quick Actions - Takes up 1 column */}
            <div>
              <QuickActions />
            </div>
          </div>

          {/* Role-Specific Sections */}
          {profile?.role === 'admin' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GlassmorphicCard blur="md" opacity={0.05} borderGlow>
                <div className="p-6">
                  <h3 className="text-lg font-display font-semibold text-ink mb-4">System Health</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray">Database Status</span>
                      <span className="text-sm text-green-500">● Healthy</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray">API Response Time</span>
                      <span className="text-sm text-accent">45ms avg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray">Active Sessions</span>
                      <span className="text-sm text-signal">247</span>
                    </div>
                  </div>
                </div>
              </GlassmorphicCard>

              <GlassmorphicCard blur="md" opacity={0.05} borderGlow>
                <div className="p-6">
                  <h3 className="text-lg font-display font-semibold text-ink mb-4">Pending Reviews</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-danger/10 rounded-lg border border-danger/20">
                      <p className="text-sm text-ink">5 incident reports await review</p>
                    </div>
                    <div className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                      <p className="text-sm text-ink">3 new member applications</p>
                    </div>
                    <div className="p-3 bg-signal/10 rounded-lg border border-signal/20">
                      <p className="text-sm text-ink">2 FOIA requests need approval</p>
                    </div>
                  </div>
                </div>
              </GlassmorphicCard>
            </div>
          )}

          {profile?.role === 'ops_lead' && (
            <GlassmorphicCard blur="md" opacity={0.05} borderGlow>
              <div className="p-6">
                <h3 className="text-lg font-display font-semibold text-ink mb-4">Operations Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-danger/10 rounded-lg">
                    <div className="text-2xl font-bold text-danger mb-1">3</div>
                    <div className="text-sm text-gray">Active Incidents</div>
                  </div>
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <div className="text-2xl font-bold text-accent mb-1">12</div>
                    <div className="text-sm text-gray">Volunteers On Call</div>
                  </div>
                  <div className="text-center p-4 bg-signal/10 rounded-lg">
                    <div className="text-2xl font-bold text-signal mb-1">5m</div>
                    <div className="text-sm text-gray">Avg Response Time</div>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>
          )}

          {profile?.role === 'legal_lead' && (
            <GlassmorphicCard blur="md" opacity={0.05} borderGlow>
              <div className="p-6">
                <h3 className="text-lg font-display font-semibold text-ink mb-4">Legal Department Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <div className="text-2xl font-bold text-accent mb-1">8</div>
                    <div className="text-sm text-gray">Active Cases</div>
                  </div>
                  <div className="text-center p-4 bg-signal/10 rounded-lg">
                    <div className="text-2xl font-bold text-signal mb-1">$125k</div>
                    <div className="text-sm text-gray">Bond Fund Available</div>
                  </div>
                  <div className="text-center p-4 bg-green-500/10 rounded-lg">
                    <div className="text-2xl font-bold text-green-500 mb-1">15</div>
                    <div className="text-sm text-gray">FOIA Requests Pending</div>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>
          )}

          {/* Personal Progress Section */}
          <GlassmorphicCard blur="md" opacity={0.05} borderGlow>
            <div className="p-6">
              <h3 className="text-lg font-display font-semibold text-ink mb-6">Your Loop Progress</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray">Consciousness Level</span>
                    <span className="text-sm text-accent">72%</span>
                  </div>
                  <div className="w-full h-2 bg-ink/10 rounded-full overflow-hidden">
                    <div className="h-full w-[72%] bg-gradient-to-r from-accent to-signal rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray">Community Impact</span>
                    <span className="text-sm text-signal">High</span>
                  </div>
                  <div className="w-full h-2 bg-ink/10 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-signal to-green-500 rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray">Knowledge Gained</span>
                    <span className="text-sm text-purple-500">156 XP</span>
                  </div>
                  <div className="w-full h-2 bg-ink/10 rounded-full overflow-hidden">
                    <div className="h-full w-[60%] bg-gradient-to-r from-purple-500 to-accent rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray">Loop Completion</span>
                    <span className="text-sm text-green-500">8/10</span>
                  </div>
                  <div className="w-full h-2 bg-ink/10 rounded-full overflow-hidden">
                    <div className="h-full w-[80%] bg-gradient-to-r from-green-500 to-signal rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </GlassmorphicCard>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
