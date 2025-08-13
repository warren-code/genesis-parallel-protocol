'use client';

import React from 'react';
import { motion } from 'framer-motion';
import LoopCard from './LoopCard';
import MiniLoopCard from './MiniLoopCard';

interface LoopCardGridProps {
  cards: Array<{
    id: string;
    type: 'full' | 'mini';
    data: any;
  }>;
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  staggerAnimation?: boolean;
}

const LoopCardGrid: React.FC<LoopCardGridProps> = ({
  cards,
  columns = 2,
  gap = 'md',
  staggerAnimation = true,
}) => {
  const columnClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 lg:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerAnimation ? 0.2 : 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`grid ${columnClasses[columns]} ${gapClasses[gap]}`}
    >
      {cards.map((card) => (
        <motion.div
          key={card.id}
          variants={itemVariants}
          className="h-full"
        >
          {card.type === 'full' ? (
            <LoopCard {...card.data} />
          ) : (
            <MiniLoopCard {...card.data} />
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default LoopCardGrid;
