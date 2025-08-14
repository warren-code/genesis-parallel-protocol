'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import GlassmorphicCard from '../ui/GlassmorphicCard';
import RecursionRing from '../animations/RecursionRing';

interface Stat {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  color: 'accent' | 'signal' | 'danger' | 'ink';
}

interface StatsDashboardProps {
  stats: Stat[];
  title?: string;
  className?: string;
}

const AnimatedCounter: React.FC<{
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}> = ({ value, duration = 2, prefix = '', suffix = '' }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateValue = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(value * easeOutQuart);
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(updateValue);
      }
    };

    updateValue();
  }, [value, duration]);

  return (
    <span>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
};

const StatsDashboard: React.FC<StatsDashboardProps> = ({
  stats,
  title = 'Community Impact',
  className = '',
}) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    });
  }, [controls]);

  const colorClasses = {
    accent: 'text-accent',
    signal: 'text-signal',
    danger: 'text-danger',
    ink: 'text-ink',
  };

  const glowClasses = {
    accent: 'shadow-accent/20',
    signal: 'shadow-signal/20',
    danger: 'shadow-danger/20',
    ink: 'shadow-ink/20',
  };

  return (
    <div className={`${className}`}>
      {title && (
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-display font-bold text-center text-ink mb-12"
        >
          {title}
        </motion.h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <GlassmorphicCard
              blur="md"
              className={`p-6 text-center relative overflow-hidden shadow-lg ${glowClasses[stat.color]}`}
            >
              {/* Background animation */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
                <RecursionRing
                  size={120}
                  rings={3}
                  speed={4}
                  color={stat.color}
                />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className={`text-3xl md:text-4xl font-display font-bold ${colorClasses[stat.color]} mb-2`}>
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    duration={2}
                  />
                </div>
                <div className="text-gray font-body text-sm md:text-base">
                  {stat.label}
                </div>
              </div>

              {/* Bottom accent bar */}
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-current to-transparent ${colorClasses[stat.color]}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
              />
            </GlassmorphicCard>
          </motion.div>
        ))}
      </div>

      {/* Additional insights section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12"
      >
        <GlassmorphicCard blur="sm" className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-accent font-display text-2xl mb-2">24/7</div>
              <div className="text-gray text-sm">Active Community</div>
            </div>
            <div>
              <div className="text-signal font-display text-2xl mb-2">∞</div>
              <div className="text-gray text-sm">Recursive Possibilities</div>
            </div>
            <div>
              <div className="text-danger font-display text-2xl mb-2">1.618</div>
              <div className="text-gray text-sm">Golden Ratio Harmony</div>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.div>
    </div>
  );
};

export default StatsDashboard;
