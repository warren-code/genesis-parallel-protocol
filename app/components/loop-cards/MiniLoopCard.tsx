'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MiniLoopCardProps {
  title: string;
  steps: {
    label: string;
    icon?: React.ReactNode;
  }[];
  color?: 'gold' | 'signal' | 'quantum' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

const MiniLoopCard: React.FC<MiniLoopCardProps> = ({
  title,
  steps,
  color = 'gold',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'p-4 text-xs',
    md: 'p-6 text-sm',
    lg: 'p-8 text-base',
  };

  const colorClasses = {
    gold: 'border-gold/30 bg-gold/5',
    signal: 'border-signal/30 bg-signal/5',
    quantum: 'border-quantum/30 bg-quantum/5',
    white: 'border-white/30 bg-white/5',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className={`
        relative rounded-xl border backdrop-blur-md
        ${colorClasses[color]}
        ${sizeClasses[size]}
        hover:shadow-gold-glow transition-all duration-300
      `}
    >
      <h4 className={`font-display font-semibold mb-4 text-${color}`}>
        {title}
      </h4>

      <div className="relative">
        {/* Loop Visualization */}
        <div className="flex items-center justify-center space-x-2">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center"
              >
                {step.icon && (
                  <div className={`mb-1 text-${color}`}>{step.icon}</div>
                )}
                <span className="text-center opacity-90">{step.label}</span>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.span
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.05 }}
                  className={`text-${color} opacity-50`}
                >
                  →
                </motion.span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Loop Back Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.5 }}
          className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
        >
          <svg
            width="100%"
            height="20"
            viewBox="0 0 200 20"
            className={`text-${color} opacity-30`}
          >
            <path
              d="M 10 15 Q 100 25 190 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 2"
            />
            <path
              d="M 10 15 L 5 12 L 5 18 Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MiniLoopCard;
