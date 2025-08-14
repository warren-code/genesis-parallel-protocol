'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

interface Alert {
  id: string;
  alert_type: string;
  title: string;
  message: string;
  location?: string;
  severity: number;
  created_at: string;
  acknowledgments: number;
}

const AlertSystem = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [filter, setFilter] = useState('all');
  const supabase = createClient();

  // Mock data for demonstration
  const mockAlerts: Alert[] = [
    {
      id: '1',
      alert_type: 'urgent',
      title: 'Police Presence Increasing',
      message: 'Heavy police presence reported at City Hall. Protesters advised to remain peaceful and document.',
      location: 'City Hall, Main St',
      severity: 4,
      created_at: new Date(Date.now() - 5 * 60000).toISOString(),
      acknowledgments: 234,
    },
    {
      id: '2',
      alert_type: 'safety',
      title: 'Medical Support Available',
      message: 'Street medics stationed at 3rd and Pine. Look for green crosses.',
      location: '3rd Ave & Pine St',
      severity: 2,
      created_at: new Date(Date.now() - 15 * 60000).toISOString(),
      acknowledgments: 89,
    },
    {
      id: '3',
      alert_type: 'legal',
      title: 'Legal Observers Present',
      message: 'National Lawyers Guild observers are on site. Green hats visible.',
      severity: 1,
      created_at: new Date(Date.now() - 30 * 60000).toISOString(),
      acknowledgments: 156,
    },
  ];

  useEffect(() => {
    // For demo, use mock data
    setAlerts(mockAlerts);

    // In production, would subscribe to real-time alerts
    /*
    const subscription = supabase
      .channel('protest_alerts')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'protest_alerts' },
        (payload) => {
          setAlerts(prev => [payload.new as Alert, ...prev]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
    */
  }, []);

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'urgent': return 'from-red-500/20 to-red-600/20 border-red-500';
      case 'safety': return 'from-yellow-500/20 to-yellow-600/20 border-yellow-500';
      case 'legal': return 'from-blue-500/20 to-blue-600/20 border-blue-500';
      case 'medical': return 'from-green-500/20 to-green-600/20 border-green-500';
      default: return 'from-gray-500/20 to-gray-600/20 border-gray-500';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'urgent': return '🚨';
      case 'safety': return '⚠️';
      case 'legal': return '⚖️';
      case 'medical': return '🏥';
      case 'location_change': return '📍';
      default: return '📢';
    }
  };

  const getSeverityBar = (severity: number) => {
    const bars = [];
    for (let i = 1; i <= 5; i++) {
      bars.push(
        <div
          key={i}
          className={`h-2 w-4 rounded-sm ${
            i <= severity ? 'bg-red-500' : 'bg-gray-600'
          }`}
        />
      );
    }
    return bars;
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.alert_type === filter);

  return (
    <section id="alerts" className="relative py-8 px-6 bg-[#0a0a0a]/80">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl"
            >
              🔔
            </motion.div>
            <h3 className="text-2xl font-bold text-white">Live Alerts</h3>
            <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full animate-pulse">
              {alerts.length} Active
            </span>
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-white transition-colors"
          >
            {isExpanded ? 'Collapse' : 'Expand'}
          </button>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto">
          {['all', 'urgent', 'safety', 'legal', 'medical'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === type
                  ? 'bg-[#00ff00] text-black'
                  : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Alerts Container */}
        <AnimatePresence mode="popLayout">
          <motion.div
            animate={{ height: isExpanded ? 'auto' : '200px' }}
            className="space-y-3 overflow-hidden"
          >
            {filteredAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-lg border bg-gradient-to-r p-4 ${getAlertColor(
                  alert.alert_type
                )}`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="text-2xl flex-shrink-0">
                    {getAlertIcon(alert.alert_type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white">{alert.title}</h4>
                      <span className="text-xs text-gray-400">
                        {formatTime(alert.created_at)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-300 mb-3">{alert.message}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {alert.location && (
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            📍 {alert.location}
                          </span>
                        )}
                        <div className="flex items-center gap-1">
                          {getSeverityBar(alert.severity)}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-400">
                          👁 {alert.acknowledgments}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white text-xs rounded-full transition-colors"
                        >
                          Acknowledge
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated Border */}
                <motion.div
                  animate={{ x: ['0%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-transparent via-white to-transparent"
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Create Alert Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#00ff00] text-black font-bold rounded-full hover:bg-[#00cc00] transition-colors"
          >
            <span>➕</span>
            <span>Create Alert</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default AlertSystem;
