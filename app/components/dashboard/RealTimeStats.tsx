'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GlassmorphicCard from '../ui/GlassmorphicCard';
import { useAuth } from '@/contexts/AuthContext';

interface Stat {
  id: string;
  label: string;
  value: number | string;
  unit?: string;
  change?: number; // percentage change
  trend?: 'up' | 'down' | 'neutral';
  icon: string;
  color: 'accent' | 'signal' | 'danger' | 'success';
  roles?: string[]; // roles that can see this stat
}

interface RealTimeStatsProps {
  className?: string;
}

const RealTimeStats: React.FC<RealTimeStatsProps> = ({ className = '' }) => {
  const { profile } = useAuth();
  const [stats, setStats] = useState<Stat[]>([]);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const updateStats = () => {
      const baseStats: Stat[] = [
        {
          id: 'active_incidents',
          label: 'Active Incidents',
          value: Math.floor(Math.random() * 5) + 3,
          trend: 'up',
          change: 12,
          icon: '🚨',
          color: 'danger',
          roles: ['admin', 'ops_lead']
        },
        {
          id: 'foia_pending',
          label: 'Pending FOIA Requests',
          value: Math.floor(Math.random() * 20) + 15,
          trend: 'neutral',
          icon: '📄',
          color: 'accent',
          roles: ['admin', 'legal_lead', 'attorney']
        },
        {
          id: 'active_members',
          label: 'Active Members',
          value: 1247 + Math.floor(Math.random() * 10),
          trend: 'up',
          change: 3.5,
          icon: '👥',
          color: 'success'
        },
        {
          id: 'bond_fund_available',
          label: 'Bond Fund Available',
          value: `$${(125000 + Math.random() * 5000).toFixed(0)}`,
          trend: 'up',
          change: 5.2,
          icon: '💰',
          color: 'signal',
          roles: ['admin', 'legal_lead']
        },
        {
          id: 'cases_active',
          label: 'Active Legal Cases',
          value: Math.floor(Math.random() * 10) + 8,
          trend: 'down',
          change: -8,
          icon: '⚖️',
          color: 'signal',
          roles: ['admin', 'legal_lead', 'attorney']
        },
        {
          id: 'truth_claims',
          label: 'Claims Debunked Today',
          value: Math.floor(Math.random() * 8) + 2,
          trend: 'up',
          change: 25,
          icon: '🛡️',
          color: 'success',
          roles: ['admin', 'ops_lead']
        },
        {
          id: 'response_time',
          label: 'Avg Response Time',
          value: Math.floor(Math.random() * 10) + 5,
          unit: 'min',
          trend: 'down',
          change: -15,
          icon: '⚡',
          color: 'accent',
          roles: ['admin', 'ops_lead']
        },
        {
          id: 'community_strength',
          label: 'Community Strength',
          value: '∞',
          trend: 'up',
          icon: '💪',
          color: 'signal'
        }
      ];

      // Filter stats based on user role
      const filteredStats = baseStats.filter(stat => {
        if (!stat.roles || stat.roles.length === 0) return true;
        return stat.roles.includes(profile?.role || '');
      });

      setStats(filteredStats);
      setLastUpdate(new Date());
    };

    // Initial update
    updateStats();

    // Update every 5 seconds
    const interval = setInterval(updateStats, 5000);

    return () => clearInterval(interval);
  }, [profile]);

  const getTrendIcon = (trend?: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return '↑';
      case 'down':
        return '↓';
      default:
        return '→';
    }
  };

  const getTrendColor = (trend?: 'up' | 'down' | 'neutral', isPositive: boolean = true) => {
    if (trend === 'up') return isPositive ? 'text-green-500' : 'text-danger';
    if (trend === 'down') return isPositive ? 'text-danger' : 'text-green-500';
    return 'text-gray';
  };

  const colorClasses = {
    accent: 'from-accent/20 to-accent/10 border-accent/20',
    signal: 'from-signal/20 to-signal/10 border-signal/20',
    danger: 'from-danger/20 to-danger/10 border-danger/20',
    success: 'from-green-500/20 to-green-500/10 border-green-500/20'
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-display font-semibold text-ink">
          Real-Time Overview
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray">Live</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassmorphicCard
              blur="sm"
              opacity={0.05}
              className={`p-4 bg-gradient-to-br ${colorClasses[stat.color]} border`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{stat.icon}</span>
                {stat.change !== undefined && (
                  <div className={`flex items-center space-x-1 text-xs ${
                    getTrendColor(stat.trend, stat.change > 0)
                  }`}>
                    <span>{getTrendIcon(stat.trend)}</span>
                    <span>{Math.abs(stat.change)}%</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-display font-bold text-ink">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-sm text-gray">{stat.unit}</span>
                  )}
                </div>
                <p className="text-xs text-gray">{stat.label}</p>
              </div>
            </GlassmorphicCard>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-gray/70">
          Last updated: {lastUpdate.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default RealTimeStats;
