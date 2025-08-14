'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaBook } from 'react-icons/fa';

interface GlossaryTerm {
  term: string;
  definition: string;
  related?: string[];
}

interface GlossarySectionProps {
  terms: GlossaryTerm[];
  title?: string;
  icon?: React.ReactNode;
  accentColor?: string;
}

export const GlossarySection: React.FC<GlossarySectionProps> = ({
  terms,
  title = "Key Terms & Concepts",
  icon = <FaBook className="text-2xl" />,
  accentColor = "amber"
}) => {
  const colorClasses = {
    amber: {
      border: 'border-amber-500/20',
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      iconBg: 'from-amber-500/20 to-orange-500/20',
      termBg: 'bg-amber-500/5',
      termBorder: 'border-amber-500/20',
      relatedBg: 'bg-amber-500/10',
      relatedText: 'text-amber-300'
    },
    yellow: {
      border: 'border-yellow-500/20',
      bg: 'bg-yellow-500/10',
      text: 'text-yellow-400',
      iconBg: 'from-yellow-500/20 to-orange-500/20',
      termBg: 'bg-yellow-500/5',
      termBorder: 'border-yellow-500/20',
      relatedBg: 'bg-yellow-500/10',
      relatedText: 'text-yellow-300'
    },
    green: {
      border: 'border-green-500/20',
      bg: 'bg-green-500/10',
      text: 'text-green-400',
      iconBg: 'from-green-500/20 to-emerald-500/20',
      termBg: 'bg-green-500/5',
      termBorder: 'border-green-500/20',
      relatedBg: 'bg-green-500/10',
      relatedText: 'text-green-300'
    },
    blue: {
      border: 'border-blue-500/20',
      bg: 'bg-blue-500/10',
      text: 'text-blue-400',
      iconBg: 'from-blue-500/20 to-cyan-500/20',
      termBg: 'bg-blue-500/5',
      termBorder: 'border-blue-500/20',
      relatedBg: 'bg-blue-500/10',
      relatedText: 'text-blue-300'
    },
    purple: {
      border: 'border-purple-500/20',
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      iconBg: 'from-purple-500/20 to-indigo-500/20',
      termBg: 'bg-purple-500/5',
      termBorder: 'border-purple-500/20',
      relatedBg: 'bg-purple-500/10',
      relatedText: 'text-purple-300'
    },
    pink: {
      border: 'border-pink-500/20',
      bg: 'bg-pink-500/10',
      text: 'text-pink-400',
      iconBg: 'from-pink-500/20 to-rose-500/20',
      termBg: 'bg-pink-500/5',
      termBorder: 'border-pink-500/20',
      relatedBg: 'bg-pink-500/10',
      relatedText: 'text-pink-300'
    },
    cyan: {
      border: 'border-cyan-500/20',
      bg: 'bg-cyan-500/10',
      text: 'text-cyan-400',
      iconBg: 'from-cyan-500/20 to-blue-500/20',
      termBg: 'bg-cyan-500/5',
      termBorder: 'border-cyan-500/20',
      relatedBg: 'bg-cyan-500/10',
      relatedText: 'text-cyan-300'
    }
  };

  const colors = colorClasses[accentColor as keyof typeof colorClasses] || colorClasses.amber;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.0 }}
      className="max-w-7xl mx-auto mb-16"
    >
      <div className={`glassmorphic-card p-8 border ${colors.border}`}>
        <h2 className={`text-2xl font-bold ${colors.text} mb-6 flex items-center gap-3`}>
          <div className={`p-3 rounded-lg bg-gradient-to-br ${colors.iconBg}`}>
            {icon}
          </div>
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {terms.map((term, index) => (
            <motion.div
              key={term.term}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className={`p-4 rounded-lg ${colors.termBg} border ${colors.termBorder}`}
            >
              <h3 className={`font-semibold ${colors.text} mb-2`}>{term.term}</h3>
              <p className="text-sm text-gray-300 mb-2">{term.definition}</p>
              
              {term.related && term.related.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  <span className="text-xs text-gray-500">Related:</span>
                  {term.related.map((relatedTerm, idx) => (
                    <span
                      key={idx}
                      className={`text-xs px-2 py-1 rounded ${colors.relatedBg} ${colors.relatedText}`}
                    >
                      {relatedTerm}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-700">
          <p className="text-xs text-gray-500 text-center">
            These terms are fundamental to understanding Loop Economics and circular systems. 
            Hover over any highlighted term in the content above for detailed definitions.
          </p>
        </div>
      </div>
    </motion.section>
  );
};
