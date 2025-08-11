'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassmorphicCard from '../ui/GlassmorphicCard';
import { useAuth } from '@/contexts/AuthContext';
import { createClient } from '@/utils/supabase/client';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'urgent';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    href: string;
  };
  icon?: string;
}

interface NotificationSystemProps {
  className?: string;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Mock notifications for demo - in production, these would come from Supabase
  useEffect(() => {
    if (user) {
      // Simulate real-time notifications
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'success',
          title: 'Loop Completed',
          message: "You've completed a consciousness loop! New pathways unlocked.",
          timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
          read: false,
          icon: '✨'
        },
        {
          id: '2',
          type: 'info',
          title: 'New Community Member',
          message: 'Sarah Chen has joined the Quantum Realm collective.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
          read: false,
          icon: '👥'
        },
        {
          id: '3',
          type: 'urgent',
          title: 'Rapid Response Alert',
          message: 'Peaceful protest support needed in downtown area.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
          read: false,
          action: {
            label: 'View Details',
            href: '/rapid-response'
          },
          icon: '🚨'
        },
        {
          id: '4',
          type: 'warning',
          title: 'FOIA Deadline',
          message: 'Your FOIA request response deadline is in 3 days.',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          read: true,
          action: {
            label: 'View Request',
            href: '/foia/requests/123'
          },
          icon: '📄'
        }
      ];

      setNotifications(mockNotifications);
      setUnreadCount(mockNotifications.filter(n => !n.read).length);
    }
  }, [user]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const typeColors = {
    info: 'text-accent border-accent/20',
    success: 'text-signal border-signal/20',
    warning: 'text-yellow-500 border-yellow-500/20',
    error: 'text-danger border-danger/20',
    urgent: 'text-danger border-danger/40 animate-pulse'
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className={`relative ${className}`}>
      {/* Notification Bell */}
      <button
        onClick={() => setShowNotifications(!showNotifications)}
        className="relative p-2 rounded-lg hover:bg-ink/5 transition-colors"
      >
        <svg
          className="w-6 h-6 text-gray"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        
        {/* Unread Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Dropdown */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-12 w-96 z-50"
          >
            <GlassmorphicCard blur="md" opacity={0.1} borderGlow>
              <div className="p-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-display font-semibold text-ink">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-accent hover:text-accent/80 transition-colors"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* Notifications List */}
                <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                  {notifications.length === 0 ? (
                    <p className="text-center text-gray py-8">
                      No notifications yet
                    </p>
                  ) : (
                    notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-3 rounded-lg border ${
                          typeColors[notification.type]
                        } ${
                          !notification.read ? 'bg-ink/5' : ''
                        } hover:bg-ink/10 transition-colors cursor-pointer`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start space-x-3">
                          {/* Icon */}
                          <span className="text-2xl">
                            {notification.icon || '•'}
                          </span>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-ink">
                                  {notification.title}
                                </h4>
                                <p className="text-sm text-gray mt-1">
                                  {notification.message}
                                </p>
                                {notification.action && (
                                  <a
                                    href={notification.action.href}
                                    className="inline-block mt-2 text-sm text-accent hover:text-accent/80 transition-colors"
                                  >
                                    {notification.action.label} →
                                  </a>
                                )}
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteNotification(notification.id);
                                }}
                                className="text-gray hover:text-danger transition-colors ml-2"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                            <p className="text-xs text-gray/70 mt-2">
                              {formatTimestamp(notification.timestamp)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="mt-4 pt-4 border-t border-ink/10">
                  <a
                    href="/notifications"
                    className="text-sm text-center text-accent hover:text-accent/80 transition-colors block"
                  >
                    View all notifications
                  </a>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;
