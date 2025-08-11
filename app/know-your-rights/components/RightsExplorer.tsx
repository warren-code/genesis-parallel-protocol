'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { rightsDatabase } from '../data/rightsDatabase';
import { useLanguage } from '../context/LanguageContext';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';

const RightsExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { language } = useLanguage();

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['all', ...new Set(rightsDatabase.map(right => right.category))];
    return cats;
  }, []);

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    rightsDatabase.forEach(right => {
      right.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, []);

  // Filter rights based on search, category, and tags
  const filteredRights = useMemo(() => {
    return rightsDatabase.filter(right => {
      const matchesSearch = searchQuery === '' || 
        right.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
        right.description[language].toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || right.category === selectedCategory;
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.every(tag => right.tags.includes(tag));
      
      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchQuery, selectedCategory, selectedTags, language]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="space-y-8">
      {/* Search and Filters Section */}
      <GlassmorphicCard className="p-6">
        <h2 className="text-2xl font-display font-bold mb-6 text-accent">
          Search Rights Database
        </h2>
        
        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for rights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 bg-ink/10 border border-ink/20 rounded-lg 
                     text-ink placeholder-gray focus:outline-none focus:border-accent/50
                     transition-all duration-300"
          />
          <svg
            className="absolute right-3 top-3.5 w-5 h-5 text-gray"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray mb-3">Categories</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                  ${selectedCategory === category
                    ? 'bg-accent text-primary'
                    : 'bg-ink/10 text-gray hover:bg-ink/20 hover:text-ink border border-ink/20'
                  }`}
              >
                {category === 'all' ? 'All Categories' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Tags Filter */}
        <div>
          <h3 className="text-sm font-medium text-gray mb-3">Filter by Tags</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300
                  ${selectedTags.includes(tag)
                    ? 'bg-signal text-primary'
                    : 'bg-ink/10 text-gray hover:bg-ink/20 hover:text-ink border border-ink/20'
                  }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </GlassmorphicCard>

      {/* Results Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-display font-semibold text-ink">
            {filteredRights.length} Rights Found
          </h3>
          {selectedTags.length > 0 && (
            <button
              onClick={() => setSelectedTags([])}
              className="text-sm text-signal hover:text-signal/80 transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        <AnimatePresence mode="popLayout">
          {filteredRights.map((right, index) => (
            <motion.div
              key={right.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <GlassmorphicCard className="p-6 hover:scale-[1.02] transition-transform duration-300">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-display font-bold text-accent">
                    {right.title[language]}
                  </h3>
                  <span className="px-3 py-1 bg-signal/10 text-signal rounded-full text-sm font-medium">
                    {right.category}
                  </span>
                </div>
                
                <p className="text-gray mb-4 leading-relaxed">
                  {right.description[language]}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {right.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-ink/10 rounded-full text-xs text-signal"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredRights.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray text-lg">
              No rights found matching your criteria.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RightsExplorer;
