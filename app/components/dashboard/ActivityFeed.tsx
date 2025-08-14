'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GlassmorphicCard from '../ui/GlassmorphicCard';
import { useAuth } from '@/contexts/AuthContext';

export interface Activity {
  id: string;
  type: 'incident' | 'foia' | 'member_joined' | 'case_update' | 'audit' | 'truth_map' | 'bond_fund' | 'system';
  action: string;
  description: string;
  timestamp: Date;
  actor: {
    name: string;
    role?: string;
    avatar?: string;
  };
  target?: {
    type: string;
    name: string;
    href?: string;
  };
  icon: string;
  color: 'accent' | 'signal' | 'danger' | 'success' | 'warning';
}

interface ActivityFeedProps {
  limit?: number;
  showHeader?: boolean;
  className?: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ 
  limit = 10, 
  showHeader = true,
  className = '' 
}) => {
  const { user, profile } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock activities for demo - in production, these would come from Supabase
  useEffect(() => {
    const mockActivities: Activity[] = [
      {
        id: '1',
        type: 'incident',
        action: 'reported',
        description: 'New incident reported in downtown area',
        timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
        actor: {
          name: 'Alex Rivera',
          role: 'ops_lead',
        },
        target: {
          type: 'incident',
          name: 'Peaceful Protest Support',
          href: '/rapid-response/incident/123'
        },
        icon: '🚨',
        color: 'danger'
      },
      {
        id: '2',
        type: 'foia',
        action: 'submitted',
        description: 'FOIA request submitted to Seattle PD',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        actor: {
          name: 'Sarah Chen',
          role: 'legal_lead',
        },
        target: {
          type: 'foia',
          name: 'Body Camera Footage Request',
          href: '/foia/requests/456'
        },
        icon: '📄',
        color: 'accent'
      },
      {
        id: '3',
        type: 'member_joined',
        action: 'joined',
        description: 'New member joined the cooperative',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
        actor: {
          name: 'Jordan Taylor',
          role: 'member',
        },
        icon: '👥',
        color: 'success'
      },
      {
        id: '4',
        type: 'case_update',
        action: 'updated',
        description: 'Legal case status updated',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        actor: {
          name: 'Michelle Davis',
          role: 'attorney',
        },
        target: {
          type: 'case',
          name: 'Case #2024-001',
          href: '/legal-bond/cases/2024-001'
        },
        icon: '⚖️',
        color: 'signal'
      },
      {
        id: '5',
        type: 'truth_map',
        action: 'debunked',
        description: 'Misinformation claim debunked',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        actor: {
          name: 'Chris Wong',
          role: 'admin',
        },
        target: {
          type: 'claim',
          name: 'False arrest narrative',
          href: '/truth-map/claim/789'
        },
        icon: '🛡️',
        color: 'warning'
      },
      {
        id: '6',
        type: 'audit',
        action: 'completed',
        description: 'Vendor audit completed',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        actor: {
          name: 'Pat Johnson',
          role: 'admin',
        },
        target: {
          type: 'audit',
          name: 'Surveillance Vendor X',
          href: '/data-privacy-audits/vendor/x'
        },
        icon: '🔍',
        color: 'accent'
      },
      {
        id: '7',
        type: 'bond_fund',
        action: 'disbursed',
        description: 'Bond fund disbursement approved',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        actor: {
          name: 'Community Fund',
          role: 'system',
        },
        target: {
          type: 'disbursement',
          name: '$5,000 to Case #2024-002',
          href: '/legal-bond/disbursements/101'
        },
        icon: '💰',
        color: 'success'
      },
      {
        id: '8',
        type: 'system',
        action: 'achievement',
        description: 'Community milestone reached',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        actor: {
          name: 'Genesis Protocol',
          role: 'system',
        },
        target: {
          type: 'milestone',
          name: '1,000 members strong!',
        },
        icon: '🎉',
        color: 'signal'
      }
    ];

    // Filter activities based on user role
    const filteredActivities = mockActivities.filter(activity => {
      // Admin sees everything
      if (profile?.role === 'admin') return true;
      
      // Filter based on role permissions
      if (profile?.role === 'ops_lead' && ['incident', 'truth_map'].includes(activity.type)) return true;
      if (profile?.role === 'legal_lead' && ['foia', 'case_update', 'bond_fund'].includes(activity.type)) return true;
      if (profile?.role === 'attorney' && ['case_update', 'bond_fund'].includes(activity.type)) return true;
      
      // All authenticated users see member and system activities
      if (['member_joined', 'system'].includes(activity.type)) return true;
      
      return false;
    });

    setActivities(filteredActivities.slice(0, limit));
    setLoading(false);
  }, [user, profile, limit]);

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const colorClasses = {
    accent: 'text-accent',
    signal: 'text-signal',
    danger: 'text-danger',
    success: 'text-green-500',
    warning: 'text-yellow-500'
  };

  const roleColors: Record<string, string> = {
    admin: 'bg-danger/10 text-danger',
    ops_lead: 'bg-accent/10 text-accent',
    legal_lead: 'bg-signal/10 text-signal',
    attorney: 'bg-purple-500/10 text-purple-500',
    member: 'bg-gray/10 text-gray',
    system: 'bg-ink/10 text-ink'
  };

  if (loading) {
    return (
      <GlassmorphicCard blur="md" opacity={0.05} className={className}>
        <div className="p-6 text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-ink/10 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-4 bg-ink/10 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      </GlassmorphicCard>
    );
  }

  return (
    <GlassmorphicCard blur="md" opacity={0.05} borderGlow className={className}>
      <div className="p-6">
        {showHeader && (
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-display font-semibold text-ink">
              Recent Activity
            </h3>
            <Link
              href="/activity"
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              View all →
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start space-x-4 group"
            >
              {/* Icon */}
              <div className={`text-2xl ${colorClasses[activity.color]} flex-shrink-0`}>
                {activity.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-ink">
                      <span className="font-medium">{activity.actor.name}</span>
                      {activity.actor.role && (
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                          roleColors[activity.actor.role] || roleColors.member
                        }`}>
                          {activity.actor.role.replace('_', ' ')}
                        </span>
                      )}
                      <span className="text-gray mx-2">{activity.action}</span>
                      {activity.target && (
                        <>
                          {activity.target.href ? (
                            <Link
                              href={activity.target.href}
                              className="text-accent hover:text-accent/80 transition-colors"
                            >
                              {activity.target.name}
                            </Link>
                          ) : (
                            <span className="font-medium">{activity.target.name}</span>
                          )}
                        </>
                      )}
                    </p>
                    <p className="text-xs text-gray mt-1">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-gray/70 ml-4 flex-shrink-0">
                    {formatTimestamp(activity.timestamp)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}

          {activities.length === 0 && (
            <p className="text-center text-gray py-8">
              No recent activity to display
            </p>
          )}
        </div>
      </div>
    </GlassmorphicCard>
  );
};

export default ActivityFeed;
