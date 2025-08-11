'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { rightsDatabase } from '../data/rightsDatabase';
import { useLanguage } from '../context/LanguageContext';

const MobileQuickReference = () => {
  const [expandedRight, setExpandedRight] = useState<string | null>(null);
  const { language } = useLanguage();

  // Group rights by category for mobile view
  const rightsByCategory = rightsDatabase.reduce((acc, right) => {
    if (!acc[right.category]) {
      acc[right.category] = [];
    }
    acc[right.category].push(right);
    return acc;
  }, {} as Record<string, typeof rightsDatabase>);

  return (
    <div className="bg-ink/10 backdrop-blur-sm rounded-lg border border-ink/20 p-4">
      <h3 className="text-lg font-display font-bold text-accent mb-4">
        Quick Reference
      </h3>
      
      <div className="space-y-3">
        {Object.entries(rightsByCategory).map(([category, rights]) => (
          <div key={category} className="space-y-2">
            <h4 className="text-sm font-semibold text-signal uppercase tracking-wider">
              {category}
            </h4>
            
            {rights.map((right) => (
              <motion.div
                key={right.id}
                className="bg-ink/5 rounded-lg border border-ink/10"
              >
                <button
                  onClick={() => setExpandedRight(
                    expandedRight === right.id ? null : right.id
                  )}
                  className="w-full p-3 text-left flex items-center justify-between"
                >
                  <span className="text-sm font-medium text-ink">
                    {right.title[language]}
                  </span>
                  <motion.svg
                    animate={{ rotate: expandedRight === right.id ? 180 : 0 }}
                    className="w-4 h-4 text-gray"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </button>
                
                <AnimatePresence>
                  {expandedRight === right.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-3 pt-0">
                        <p className="text-xs text-gray leading-relaxed">
                          {right.description[language]}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {right.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 bg-ink/10 rounded-full text-xs text-signal"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20">
        <p className="text-xs text-accent text-center font-medium">
          💡 Tap any right to expand details
        </p>
      </div>
    </div>
  );
};

export default MobileQuickReference;
