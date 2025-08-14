'use client';

import React, { useState } from 'react';
import { RapidResponseProvider } from './context/RapidResponseContext';
import IncidentReportForm from './components/IncidentReportForm';
import AlertSystem from './components/AlertSystem';
import SecureMessaging from './components/SecureMessaging';
import CoordinationDashboard from './components/CoordinationDashboard';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import Button from '@/app/components/ui/Button';

function RapidResponseContent() {
  const [activeView, setActiveView] = useState<'overview' | 'report' | 'alerts' | 'messages' | 'coordination'>('overview');
  const [showReportForm, setShowReportForm] = useState(false);

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-display font-bold text-ink mb-2">
            Rapid Response Rings
          </h1>
          <p className="text-gray max-w-2xl mx-auto">
            Coordinate community responses to incidents with real-time alerts, secure messaging, and decentralized coordination.
          </p>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'report', label: 'Report', icon: '📝' },
              { id: 'alerts', label: 'Alerts', icon: '🔔' },
              { id: 'messages', label: 'Messages', icon: '💬' },
              { id: 'coordination', label: 'Coordinate', icon: '🎯' },
            ].map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeView === view.id
                    ? 'bg-accent text-primary'
                    : 'bg-white/5 text-gray hover:text-ink hover:bg-white/10'
                }`}
              >
                <span>{view.icon}</span>
                <span>{view.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 lg:gap-6">
          {/* Left Column - Incident Reporting */}
          <div className="space-y-6">
            <GlassmorphicCard blur="md" opacity={0.05}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-ink">Report Incident</h2>
                  <Button
                    onClick={() => setShowReportForm(!showReportForm)}
                    variant="primary"
                    size="sm"
                  >
                    New Report
                  </Button>
                </div>
                {showReportForm && (
                  <IncidentReportForm onClose={() => setShowReportForm(false)} />
                )}
              </div>
            </GlassmorphicCard>

            {/* Coordination Dashboard */}
            <GlassmorphicCard blur="md" opacity={0.05}>
              <div className="p-6">
                <CoordinationDashboard />
              </div>
            </GlassmorphicCard>
          </div>

          {/* Middle Column - Alerts */}
          <div>
            <GlassmorphicCard blur="md" opacity={0.05}>
              <div className="p-6">
                <AlertSystem />
              </div>
            </GlassmorphicCard>
          </div>

          {/* Right Column - Secure Messaging */}
          <div>
            <GlassmorphicCard blur="md" opacity={0.05} className="h-[600px]">
              <SecureMessaging />
            </GlassmorphicCard>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          {activeView === 'overview' && (
            <div className="space-y-6">
              {/* Quick Actions */}
              <GlassmorphicCard blur="md" opacity={0.05}>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-ink mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={() => setActiveView('report')}
                      variant="secondary"
                      className="flex flex-col items-center py-4"
                    >
                      <span className="text-2xl mb-1">🚨</span>
                      <span>Report Incident</span>
                    </Button>
                    <Button
                      onClick={() => setActiveView('alerts')}
                      variant="secondary"
                      className="flex flex-col items-center py-4"
                    >
                      <span className="text-2xl mb-1">🔔</span>
                      <span>View Alerts</span>
                    </Button>
                    <Button
                      onClick={() => setActiveView('messages')}
                      variant="secondary"
                      className="flex flex-col items-center py-4"
                    >
                      <span className="text-2xl mb-1">💬</span>
                      <span>Messages</span>
                    </Button>
                    <Button
                      onClick={() => setActiveView('coordination')}
                      variant="secondary"
                      className="flex flex-col items-center py-4"
                    >
                      <span className="text-2xl mb-1">🎯</span>
                      <span>Coordinate</span>
                    </Button>
                  </div>
                </div>
              </GlassmorphicCard>

              {/* Recent Activity Summary */}
              <GlassmorphicCard blur="md" opacity={0.05}>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-ink mb-4">Recent Activity</h2>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray">Active Incidents</span>
                      <span className="text-ink font-semibold">3</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray">Unread Alerts</span>
                      <span className="text-accent font-semibold">5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray">Available Responders</span>
                      <span className="text-green-500 font-semibold">12</span>
                    </div>
                  </div>
                </div>
              </GlassmorphicCard>
            </div>
          )}

          {activeView === 'report' && (
            <GlassmorphicCard blur="md" opacity={0.05}>
              <div className="p-6">
                <button
                  onClick={() => setActiveView('overview')}
                  className="mb-4 text-gray hover:text-ink transition-colors"
                >
                  ← Back
                </button>
                <IncidentReportForm />
              </div>
            </GlassmorphicCard>
          )}

          {activeView === 'alerts' && (
            <GlassmorphicCard blur="md" opacity={0.05}>
              <div className="p-6">
                <button
                  onClick={() => setActiveView('overview')}
                  className="mb-4 text-gray hover:text-ink transition-colors"
                >
                  ← Back
                </button>
                <AlertSystem />
              </div>
            </GlassmorphicCard>
          )}

          {activeView === 'messages' && (
            <GlassmorphicCard blur="md" opacity={0.05} className="h-[600px]">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray/20">
                  <button
                    onClick={() => setActiveView('overview')}
                    className="text-gray hover:text-ink transition-colors"
                  >
                    ← Back
                  </button>
                </div>
                <div className="flex-1">
                  <SecureMessaging />
                </div>
              </div>
            </GlassmorphicCard>
          )}

          {activeView === 'coordination' && (
            <GlassmorphicCard blur="md" opacity={0.05}>
              <div className="p-6">
                <button
                  onClick={() => setActiveView('overview')}
                  className="mb-4 text-gray hover:text-ink transition-colors"
                >
                  ← Back
                </button>
                <CoordinationDashboard />
              </div>
            </GlassmorphicCard>
          )}
        </div>
      </div>
    </div>
  );
}

export default function RapidResponsePage() {
  return (
    <RapidResponseProvider>
      <RapidResponseContent />
    </RapidResponseProvider>
  );
}
