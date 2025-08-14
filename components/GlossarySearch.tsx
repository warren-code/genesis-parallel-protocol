'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGlossary } from '@/contexts/GlossaryContext';
import { FaSearch, FaTimes, FaBook } from 'react-icons/fa';

export const GlossarySearch: React.FC = () => {
  const { searchTerms } = useGlossary();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ReturnType<typeof searchTerms>>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (query.trim()) {
      setResults(searchTerms(query));
    } else {
      setResults([]);
    }
  }, [query, searchTerms]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(true);
    setQuery('');
    setResults([]);
  };

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={handleOpen}
        className="flex items-center gap-2 px-4 py-2 rounded-lg glassmorphic-card border border-white/10 hover:border-text-glow-gold/50 transition-all group"
      >
        <FaBook className="text-text-glow-gold" />
        <span className="text-sm text-gray-300 group-hover:text-white">Glossary</span>
        <FaSearch className="text-xs text-gray-500" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 w-96 max-w-[90vw] z-50"
          >
            <div className="glassmorphic-card p-4 border border-border-glow-gold/30 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <FaSearch className="text-text-glow-gold" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search glossary terms..."
                  className="flex-1 bg-transparent border-b border-white/20 focus:border-text-glow-gold/50 outline-none text-white placeholder-gray-500 transition-colors"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:text-red-400 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="max-h-96 overflow-y-auto custom-scrollbar">
                {query.trim() === '' ? (
                  <div className="text-center py-8 text-gray-500">
                    <FaBook className="text-4xl mx-auto mb-2 opacity-20" />
                    <p className="text-sm">Type to search the glossary</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No terms found for "{query}"</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {results.map((term) => (
                      <motion.div
                        key={term.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-3 rounded-lg bg-black/30 border border-white/10 hover:border-text-glow-gold/30 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-semibold text-text-glow-gold group-hover:text-shadow-gold">
                            {term.term}
                          </h4>
                          {term.category && (
                            <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary">
                              {term.category}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-300 mb-2">{term.definition}</p>
                        {term.relatedTerms && term.relatedTerms.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            <span className="text-xs text-gray-500">Related:</span>
                            {term.relatedTerms.map((related, idx) => (
                              <span key={idx} className="text-xs text-primary">
                                {related}{idx < (term.relatedTerms?.length ?? 0) - 1 ? ',' : ''}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {results.length > 5 && (
                <div className="mt-3 pt-3 border-t border-white/10 text-center">
                  <p className="text-xs text-gray-500">
                    Showing {results.length} results
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
