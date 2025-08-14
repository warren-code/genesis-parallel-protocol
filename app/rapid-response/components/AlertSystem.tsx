'use client';

import React, { useEffect, useState } from 'react';
import { useRapidResponse } from '../context/RapidResponseContext';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { motion, AnimatePresence } from 'framer-motion';
import type { Alert } from '../types';

export default function AlertSystem() {
  const { alerts, unreadAlerts, acknowledgeAlert, subscribeToAlerts } = useRapidResponse();
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<'all' | 'unread' | 'urgent'>('unread');

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Subscribe to real-time alerts
    const unsubscribe = subscribeToAlerts();
    return unsubscribe;
  }, [subscribeToAlerts]);

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'unread') return !alert.acknowledgedAt;
    if (filter === 'urgent') return alert.priority === 'urgent' || alert.priority === 'high';
    return true;
  });

  const getPriorityColor = (priority: Alert['priority']) => {
    switch (priority) {
      case 'urgent': return 'border-red-500 bg-red-500/10';
      case 'high': return 'border-orange-500 bg-orange-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-green-500 bg-green-500/10';
    }
  };

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'new_incident': return '🚨';
      case 'assignment': return '👤';
      case 'status_update': return '📊';
      case 'urgent_request': return '⚡';
      case 'resolution': return '✅';
      case 'system': return '🔔';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  };

  return (
    <div className="space-y-4">
      {/* Alert Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-ink">Alerts</h3>
          {unreadAlerts > 0 && (
            <span className="px-2 py-1 bg-accent text-primary rounded-full text-sm font-medium">
              {unreadAlerts} new
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {/* Filter Buttons */}
          <div className="flex gap-1 bg-white/5 rounded-lg p-1">
            {(['all', 'unread', 'urgent'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-md text-sm capitalize transition-all ${
                  filter === f
                    ? 'bg-accent text-primary'
                    : 'text-gray hover:text-ink'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => setShowAll(!showAll)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {showAll ? '📥' : '📤'}
          </button>
        </div>
      </div>

      {/* Alert List */}
      <div className={`space-y-2 ${!showAll ? 'max-h-96 overflow-y-auto' : ''}`}>
        <AnimatePresence>
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-8 text-gray">
              No {filter !== 'all' ? filter : ''} alerts
            </div>
          ) : (
            filteredAlerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.2 }}
              >
                <GlassmorphicCard
                  blur="sm"
                  opacity={0.05}
                  className={`p-4 border-2 ${getPriorityColor(alert.priority)} ${
                    !alert.acknowledgedAt ? 'shadow-lg' : 'opacity-75'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getAlertIcon(alert.type)}</span>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="text-ink font-medium">{alert.message}</p>
                          {alert.actionRequired && (
                            <p className="text-sm text-gray mt-1">
                              Action: {alert.actionRequired}
                            </p>
                          )}
                          <p className="text-xs text-gray mt-2">
                            {formatTime(alert.createdAt)}
                          </p>
                        </div>
                        
                        {!alert.acknowledgedAt && (
                          <button
                            onClick={() => acknowledgeAlert(alert.id)}
                            className="ml-4 px-3 py-1 bg-accent text-primary rounded-lg text-sm hover:bg-accent/90 transition-colors"
                          >
                            Acknowledge
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Priority Badge */}
                  <div className="absolute top-2 right-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      alert.priority === 'urgent' ? 'bg-red-500 text-white' :
                      alert.priority === 'high' ? 'bg-orange-500 text-white' :
                      alert.priority === 'medium' ? 'bg-yellow-500 text-black' :
                      'bg-green-500 text-white'
                    }`}>
                      {alert.priority}
                    </span>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
