'use client';

import React from 'react';
import { motion } from 'framer-motion';
import GlassmorphicCard from './GlassmorphicCard';
import Button from './Button';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
  color?: 'accent' | 'signal' | 'danger' | 'ink';
  delay?: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  action,
  color = 'accent',
  delay = 0,
}) => {
  const colorClasses = {
    accent: 'text-accent',
    signal: 'text-signal',
    danger: 'text-danger',
    ink: 'text-ink',
  };

  const hoverColorClasses = {
    accent: 'hover:border-accent/50',
    signal: 'hover:border-signal/50',
    danger: 'hover:border-danger/50',
    ink: 'hover:border-ink/50',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <GlassmorphicCard
        blur="md"
        className={`p-6 h-full flex flex-col transition-all duration-300 ${hoverColorClasses[color]} hover:shadow-lg`}
        borderGlow
      >
        <div className={`${colorClasses[color]} mb-4`}>
          {icon}
        </div>
        
        <h3 className={`text-xl font-display font-semibold ${colorClasses[color]} mb-3`}>
          {title}
        </h3>
        
        <p className="text-gray font-body mb-6 flex-grow">
          {description}
        </p>
        
        <div className="mt-auto">
          <Button
            variant={color === 'ink' ? 'secondary' : color}
            size="sm"
            onClick={action.onClick}
            fullWidth
          >
            {action.label}
          </Button>
        </div>
      </GlassmorphicCard>
    </motion.div>
  );
};

export default FeatureCard;
