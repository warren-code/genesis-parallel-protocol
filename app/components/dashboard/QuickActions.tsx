'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import GlassmorphicCard from '../ui/GlassmorphicCard';
import { useAuth } from '@/contexts/AuthContext';

interface QuickAction {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: string;
  color: 'accent' | 'signal' | 'danger' | 'success';
  roles?: string[]; // roles that can see this action
  external?: boolean; // opens in new tab
}

interface QuickActionsProps {
  className?: string;
}

const QuickActions: React.FC<QuickActionsProps> = ({ className = '' }) => {
  const { profile } = useAuth();
  const router = useRouter();

  const allActions: QuickAction[] = [
    // Ops Lead Actions
    {
      id: 'report_incident',
      label: 'Report Incident',
      description: 'Report a new police or protest incident',
      href: '/rapid-response/new',
      icon: '🚨',
      color: 'danger',
      roles: ['admin', 'ops_lead']
    },
    {
      id: 'truth_check',
      label: 'Fact Check Claim',
      description: 'Investigate and debunk misinformation',
      href: '/truth-map/new',
      icon: '🛡️',
      color: 'accent',
      roles: ['admin', 'ops_lead']
    },
    
    // Legal Lead Actions
    {
      id: 'new_foia',
      label: 'New FOIA Request',
      description: 'Submit a freedom of information request',
      href: '/foia/requests/new',
      icon: '📄',
      color: 'signal',
      roles: ['admin', 'legal_lead', 'attorney']
    },
    {
      id: 'new_case',
      label: 'Create Legal Case',
      description: 'Start a new legal case file',
      href: '/legal-bond/cases/new',
      icon: '⚖️',
      color: 'accent',
      roles: ['admin', 'legal_lead', 'attorney']
    },
    {
      id: 'bond_request',
      label: 'Request Bond Funds',
      description: 'Apply for bond fund assistance',
      href: '/legal-bond/request',
      icon: '💰',
      color: 'success',
      roles: ['admin', 'legal_lead', 'attorney']
    },
    
    // Member Actions
    {
      id: 'join_cooperative',
      label: 'Join Cooperative',
      description: 'Become a contributing member',
      href: '/community/join',
      icon: '🤝',
      color: 'signal'
    },
    {
      id: 'know_rights',
      label: 'Know Your Rights',
      description: 'Learn about your legal protections',
      href: '/know-your-rights',
      icon: '📚',
      color: 'accent'
    },
    {
      id: 'emergency_help',
      label: 'Emergency Help',
      description: 'Get immediate assistance',
      href: '/rapid-response/help',
      icon: '🆘',
      color: 'danger'
    },
    
    // Admin Actions
    {
      id: 'vendor_audit',
      label: 'New Vendor Audit',
      description: 'Audit surveillance vendor practices',
      href: '/data-privacy-audits/new',
      icon: '🔍',
      color: 'signal',
      roles: ['admin']
    },
    {
      id: 'manage_users',
      label: 'Manage Users',
      description: 'User and role management',
      href: '/admin/users',
      icon: '👤',
      color: 'accent',
      roles: ['admin']
    }
  ];

  // Filter actions based on user role
  const availableActions = allActions.filter(action => {
    if (!action.roles || action.roles.length === 0) return true;
    return action.roles.includes(profile?.role || '');
  });

  const colorClasses = {
    accent: 'bg-accent/10 hover:bg-accent/20 border-accent/20',
    signal: 'bg-signal/10 hover:bg-signal/20 border-signal/20',
    danger: 'bg-danger/10 hover:bg-danger/20 border-danger/20',
    success: 'bg-green-500/10 hover:bg-green-500/20 border-green-500/20'
  };

  const handleAction = (action: QuickAction) => {
    if (action.external) {
      window.open(action.href, '_blank');
    } else {
      router.push(action.href);
    }
  };

  return (
    <GlassmorphicCard blur="md" opacity={0.05} borderGlow className={className}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-display font-semibold text-ink">
            Quick Actions
          </h3>
          <span className="text-2xl text-accent">⚡</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {availableActions.map((action, index) => (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAction(action)}
              className={`p-4 rounded-lg border transition-all duration-200 text-left group ${
                colorClasses[action.color]
              }`}
            >
              <div className="flex items-start space-x-3">
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {action.icon}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-ink group-hover:text-accent transition-colors">
                    {action.label}
                  </h4>
                  <p className="text-xs text-gray mt-1">
                    {action.description}
                  </p>
                </div>
                <svg
                  className="w-4 h-4 text-gray opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>

        {availableActions.length === 0 && (
          <p className="text-center text-gray py-8">
            No quick actions available for your role
          </p>
        )}
      </div>
    </GlassmorphicCard>
  );
};

export default QuickActions;
