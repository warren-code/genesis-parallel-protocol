'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  height?: string;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  showPercentage = true,
  height = 'h-6',
  className = ''
}) => {
  const getProgressColor = () => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    if (progress >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className={`progress-bar ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-300">Progress</span>
        {showPercentage && (
          <span className="text-sm font-medium text-gray-300">{progress}%</span>
        )}
      </div>
      <div className={`w-full bg-gray-700 rounded-full overflow-hidden ${height}`}>
        <motion.div
          className={`h-full ${getProgressColor()} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
        >
          <div className="h-full flex items-center justify-end pr-2">
            {progress > 10 && showPercentage && (
              <span className="text-xs font-medium text-white">
                {progress}%
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressBar;
