'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const QuickActions = () => {
  const [activeAction, setActiveAction] = useState<string | null>(null);

  const actions = [
    {
      id: 'report',
      icon: '🚨',
      title: 'Report Incident',
      description: 'Quick report an incident happening now',
      link: '#incident-map',
      color: 'from-red-500 to-orange-500',
    },
    {
      id: 'alert',
      icon: '📢',
      title: 'Send Alert',
      description: 'Broadcast urgent safety information',
      link: '#alerts',
      color: 'from-yellow-500 to-amber-500',
    },
    {
      id: 'coordinate',
      icon: '🤝',
      title: 'Coordinate Action',
      description: 'Organize or join peaceful protests',
      link: '#coordination',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'resources',
      icon: '📦',
      title: 'Find Resources',
      description: 'Access supplies and support',
      link: '#resources',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'training',
      icon: '📚',
      title: 'Get Training',
      description: 'Learn de-escalation and safety',
      link: '#training',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 'secure',
      icon: '🔐',
      title: 'Secure Comms',
      description: 'Join encrypted channels',
      link: '#secure-comms',
      color: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section className="relative py-12 px-6 bg-gradient-to-b from-transparent to-[#0a0a0a]/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Quick Actions</h3>
          <p className="text-gray-400">Access critical tools instantly</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {actions.map((action, index) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setActiveAction(action.id)}
              onHoverEnd={() => setActiveAction(null)}
            >
              <Link href={action.link}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative overflow-hidden rounded-2xl bg-[#1a1a1a] border border-gray-800 p-6 cursor-pointer group"
                >
                  {/* Gradient Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Icon */}
                  <motion.div
                    animate={{
                      rotate: activeAction === action.id ? [0, -10, 10, -10, 0] : 0,
                    }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl mb-3 block"
                  >
                    {action.icon}
                  </motion.div>

                  {/* Title */}
                  <h4 className="font-semibold text-white mb-1 text-sm group-hover:text-[#00ff00] transition-colors">
                    {action.title}
                  </h4>

                  {/* Description (show on hover) */}
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: activeAction === action.id ? 1 : 0,
                      height: activeAction === action.id ? 'auto' : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-xs text-gray-400 overflow-hidden"
                  >
                    {action.description}
                  </motion.p>

                  {/* Action Indicator */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: activeAction === action.id ? 1 : 0 }}
                    className="absolute top-2 right-2 w-2 h-2 bg-[#00ff00] rounded-full"
                  />
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Emergency Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-colors shadow-lg shadow-red-600/25"
          >
            <span className="animate-pulse">🆘</span>
            <span>EMERGENCY ASSISTANCE</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default QuickActions;
