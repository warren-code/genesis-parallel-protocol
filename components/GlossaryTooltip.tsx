'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlossary } from '@/contexts/GlossaryContext';
import { FaInfoCircle, FaExternalLinkAlt } from 'react-icons/fa';

interface GlossaryTooltipProps {
  term: string;
  children?: React.ReactNode;
  className?: string;
}

export const GlossaryTooltip: React.FC<GlossaryTooltipProps> = ({ 
  term, 
  children, 
  className = '' 
}) => {
  const { getTermDefinition } = useGlossary();
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  
  const termData = getTermDefinition(term);

  useEffect(() => {
    if (isOpen && triggerRef.current && tooltipRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Check if tooltip would go off screen at top
      if (triggerRect.top - tooltipRect.height < 10) {
        setPosition('bottom');
      } else if (triggerRect.bottom + tooltipRect.height > viewportHeight - 10) {
        setPosition('top');
      }
    }
  }, [isOpen]);

  if (!termData) {
    return <span className={className}>{children || term}</span>;
  }

  const handleToggle = () => setIsOpen(!isOpen);
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  // Portal rendering
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <>
      <span className="relative inline-block">
        <span
          ref={triggerRef}
          className={`border-b-2 border-dotted border-amber-500/50 cursor-help hover:border-amber-500 transition-colors ${className}`}
          onClick={handleToggle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {children || term}
          <FaInfoCircle className="inline-block ml-1 text-xs text-amber-500/70" />
        </span>
      </span>
      
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && triggerRef.current && (
            <div className="fixed inset-0 z-[9999] pointer-events-none">
              <motion.div
                ref={tooltipRef}
                initial={{ opacity: 0, scale: 0.9, y: position === 'top' ? 10 : -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: position === 'top' ? 10 : -10 }}
                transition={{ duration: 0.2 }}
                className="pointer-events-auto absolute"
                style={{
                  top: position === 'top' 
                    ? triggerRef.current.getBoundingClientRect().top - 8
                    : triggerRef.current.getBoundingClientRect().bottom + 8,
                  left: triggerRef.current.getBoundingClientRect().left + (triggerRef.current.getBoundingClientRect().width / 2),
                  transform: position === 'top' ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
                  width: '20rem',
                  maxWidth: '90vw'
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
              <div className="bg-gray-900/95 backdrop-blur-xl p-4 rounded-lg border border-amber-500/30 shadow-2xl">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-amber-400 font-semibold text-lg">
                    {termData.term}
                  </h4>
                  {termData.category && (
                    <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-400">
                      {termData.category}
                    </span>
                  )}
                </div>
                
                <p className="text-gray-300 text-sm mb-3">
                  {termData.definition}
                </p>
              
                {termData.expandedContent && (
                  <div className="text-gray-400 text-xs mb-3 p-3 bg-black/50 rounded-lg border border-gray-700">
                    {termData.expandedContent}
                  </div>
                )}
                
                {termData.relatedTerms && termData.relatedTerms.length > 0 && (
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-xs text-gray-500">Related:</span>
                    {termData.relatedTerms.map((relatedTerm, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 rounded bg-amber-500/10 text-amber-400 cursor-pointer hover:bg-amber-500/20 transition-colors"
                      >
                        {relatedTerm}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Click outside to close</span>
                  <FaExternalLinkAlt className="text-xs text-gray-500" />
                </div>
              </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
