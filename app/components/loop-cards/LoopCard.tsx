'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GlassmorphicCard from '../ui/GlassmorphicCard';

export interface LoopCardColumn {
  title: string;
  icon: React.ReactNode;
  content: string | React.ReactNode;
  items?: string[];
  color?: 'gold' | 'signal' | 'quantum' | 'white' | 'charcoal';
}

interface LoopCardProps {
  title: string;
  description?: string;
  input: LoopCardColumn;
  process: LoopCardColumn;
  output: LoopCardColumn;
  feedback: LoopCardColumn;
  recursion: LoopCardColumn;
  variant?: 'horizontal' | 'vertical' | 'compact';
  animationDelay?: number;
}

const LoopCard: React.FC<LoopCardProps> = ({
  title,
  description,
  input,
  process,
  output,
  feedback,
  recursion,
  variant = 'horizontal',
  animationDelay = 0,
}) => {
  const columns = [
    { ...input, defaultColor: 'signal' },
    { ...process, defaultColor: 'gold' },
    { ...output, defaultColor: 'quantum' },
    { ...feedback, defaultColor: 'white' },
    { ...recursion, defaultColor: 'gold' },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: Record<string, string> = {
      gold: 'text-gold border-gold/30 bg-gold/5',
      signal: 'text-signal border-signal/30 bg-signal/5',
      quantum: 'text-quantum border-quantum/30 bg-quantum/5',
      white: 'text-white border-white/30 bg-white/5',
      charcoal: 'text-charcoal border-charcoal/30 bg-charcoal/5',
    };
    return colorMap[color] || colorMap.gold;
  };

  const containerAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: animationDelay,
        staggerChildren: 0.1,
      },
    },
  };

  const columnAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerAnimation}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <GlassmorphicCard blur="lg" className="p-8" borderGlow>
        {/* Header */}
        <div className="mb-8 text-center">
          <h3 className="text-2xl font-display font-bold text-gold mb-2">
            {title}
          </h3>
          {description && (
            <p className="text-gray font-body max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Columns Container */}
        <div
          className={`
            ${variant === 'horizontal' ? 'grid grid-cols-1 md:grid-cols-5 gap-6' : ''}
            ${variant === 'vertical' ? 'space-y-6' : ''}
            ${variant === 'compact' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4' : ''}
          `}
        >
          {columns.map((column, index) => {
            const color = column.color || column.defaultColor;
            const colorClasses = getColorClasses(color);

            return (
              <motion.div
                key={index}
                variants={columnAnimation}
                className={`
                  relative
                  ${variant === 'vertical' ? 'grid grid-cols-5 gap-4' : ''}
                `}
              >
                {/* Column Content */}
                <div
                  className={`
                    relative p-6 rounded-xl border backdrop-blur-sm
                    ${colorClasses}
                    transition-all duration-300
                    hover:shadow-gold-glow hover:scale-105
                    ${variant === 'vertical' ? 'col-span-4' : ''}
                  `}
                >
                  {/* Icon and Title */}
                  <div className="flex items-center mb-4">
                    <div className="mr-3">{column.icon}</div>
                    <h4 className="font-display font-semibold text-lg">
                      {column.title}
                    </h4>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    {typeof column.content === 'string' ? (
                      <p className="text-sm font-body opacity-90">
                        {column.content}
                      </p>
                    ) : (
                      column.content
                    )}

                    {/* Items List */}
                    {column.items && column.items.length > 0 && (
                      <ul className="space-y-2 mt-3">
                        {column.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-start text-sm"
                          >
                            <span className="mr-2 mt-1">•</span>
                            <span className="opacity-90">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Connecting Arrow (except for last column) */}
                  {index < columns.length - 1 && variant === 'horizontal' && (
                    <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 hidden md:block">
                      <motion.div
                        animate={{
                          x: [0, 5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: 'loop',
                        }}
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="text-gold"
                        >
                          <path
                            d="M9 5l7 7-7 7"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Vertical Arrow */}
                {index < columns.length - 1 && variant === 'vertical' && (
                  <div className="col-span-1 flex items-center justify-center">
                    <motion.div
                      animate={{
                        y: [0, 5, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: 'loop',
                      }}
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-gold transform rotate-90"
                      >
                        <path
                          d="M9 5l7 7-7 7"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Feedback Loop Indicator */}
        <motion.div
          className="mt-8 text-center"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: 'loop',
          }}
        >
          <div className="inline-flex items-center space-x-2 text-gold">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className="animate-spin"
              style={{ animationDuration: '8s' }}
            >
              <path
                d="M10 2v2m0 12v2m8-8h-2M4 10H2m15.364-5.364l-1.414 1.414M6.05 13.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-sm font-display">Continuous Loop System</span>
          </div>
        </motion.div>
      </GlassmorphicCard>
    </motion.div>
  );
};

export default LoopCard;
