'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ChecklistItemProps {
  id: string;
  label: string;
  checked: boolean;
  description?: string;
  priority?: 'critical' | 'high' | 'medium' | 'low';
  onChange: (checked: boolean) => void;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({
  id,
  label,
  checked,
  description,
  priority,
  onChange
}) => {
  const getPriorityIndicator = () => {
    if (!priority) return null;
    
    const colors = {
      critical: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-yellow-500',
      low: 'bg-green-500'
    };

    return (
      <span className={`w-2 h-2 rounded-full ${colors[priority]} mr-2`} />
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="checklist-item"
    >
      <label
        htmlFor={id}
        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
      >
        <div className="flex items-center mt-0.5">
          <input
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center">
            {getPriorityIndicator()}
            <span className={`font-medium ${checked ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
              {label}
            </span>
          </div>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
        </div>
      </label>
    </motion.div>
  );
};

export default ChecklistItem;
