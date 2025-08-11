'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import GlassmorphicCard from '../ui/GlassmorphicCard';
import { useAuth } from '@/contexts/AuthContext';

interface SearchResult {
  id: string;
  type: 'incident' | 'foia' | 'case' | 'member' | 'claim' | 'audit' | 'page';
  title: string;
  description: string;
  href: string;
  icon: string;
  highlight?: string;
}

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  className = '', 
  placeholder = 'Search across all features...',
  autoFocus = false 
}) => {
  const { profile } = useAuth();
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Simulate search with debouncing
  useEffect(() => {
    const searchTimer = setTimeout(() => {
      if (query.length > 2) {
        performSearch(query);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(searchTimer);
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    
    // Simulate search results - in production, this would query Supabase
    const mockResults: SearchResult[] = [
      // Incidents
      {
        id: '1',
        type: 'incident',
        title: 'Downtown Protest Support',
        description: 'Active incident requiring immediate response',
        href: '/rapid-response/incident/123',
        icon: '🚨',
        highlight: searchQuery
      },
      // FOIA
      {
        id: '2',
        type: 'foia',
        title: 'Body Camera Footage Request',
        description: 'FOIA request to Seattle PD - Pending',
        href: '/foia/requests/456',
        icon: '📄',
        highlight: searchQuery
      },
      // Legal Cases
      {
        id: '3',
        type: 'case',
        title: 'Case #2024-001: Wrongful Arrest',
        description: 'Legal case in progress - Court date pending',
        href: '/legal-bond/cases/2024-001',
        icon: '⚖️',
        highlight: searchQuery
      },
      // Members
      {
        id: '4',
        type: 'member',
        title: 'Sarah Chen',
        description: 'Legal Lead - Active member since 2023',
        href: '/community/members/sarah-chen',
        icon: '👤',
        highlight: searchQuery
      },
      // Truth Map Claims
      {
        id: '5',
        type: 'claim',
        title: 'False Arrest Narrative Debunked',
        description: 'Misinformation claim investigated and debunked',
        href: '/truth-map/claim/789',
        icon: '🛡️',
        highlight: searchQuery
      },
      // Pages
      {
        id: '6',
        type: 'page',
        title: 'Know Your Rights Guide',
        description: 'Comprehensive guide to your legal protections',
        href: '/know-your-rights',
        icon: '📚',
        highlight: searchQuery
      }
    ];

    // Filter results based on search query and user role
    const filteredResults = mockResults.filter(result => {
      // Text matching
      const matchesQuery = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          result.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesQuery) return false;

      // Role-based filtering
      if (profile?.role === 'admin') return true;
      
      if (result.type === 'incident' && !['ops_lead', 'admin'].includes(profile?.role || '')) return false;
      if (result.type === 'foia' && !['legal_lead', 'attorney', 'admin'].includes(profile?.role || '')) return false;
      if (result.type === 'case' && !['legal_lead', 'attorney', 'admin'].includes(profile?.role || '')) return false;
      
      return true;
    });

    setResults(filteredResults.slice(0, 6)); // Limit to 6 results
    setLoading(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Save to recent searches
      const updated = [query, ...recentSearches.filter(s => s !== query)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      
      // Navigate to search results page
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setShowResults(false);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    // Save to recent searches
    const searchTerm = result.title;
    const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
    
    router.push(result.href);
    setShowResults(false);
    setQuery('');
  };

  const handleRecentSearch = (search: string) => {
    setQuery(search);
    performSearch(search);
  };

  const typeColors = {
    incident: 'text-danger',
    foia: 'text-accent',
    case: 'text-signal',
    member: 'text-green-500',
    claim: 'text-yellow-500',
    audit: 'text-purple-500',
    page: 'text-gray'
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(true);
            }}
            onFocus={() => setShowResults(true)}
            placeholder={placeholder}
            autoFocus={autoFocus}
            className="w-full px-4 py-2 pl-10 pr-10 bg-ink/5 border border-ink/10 rounded-lg 
                     text-ink placeholder-gray/50 focus:outline-none focus:border-accent/50 
                     focus:bg-ink/10 transition-all duration-200"
          />
          
          {/* Search Icon */}
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray"
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

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray hover:text-ink transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showResults && (query.length > 0 || recentSearches.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 z-50"
          >
            <GlassmorphicCard blur="md" opacity={0.1} borderGlow>
              <div className="p-4 max-h-96 overflow-y-auto custom-scrollbar">
                {/* Loading State */}
                {loading && (
                  <div className="py-8 text-center">
                    <div className="animate-spin w-6 h-6 border-2 border-accent border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-sm text-gray mt-2">Searching...</p>
                  </div>
                )}

                {/* Search Results */}
                {!loading && results.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray mb-2">Search Results</p>
                    {results.map((result) => (
                      <motion.button
                        key={result.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => handleResultClick(result)}
                        className="w-full p-3 rounded-lg hover:bg-ink/5 transition-colors text-left group"
                      >
                        <div className="flex items-start space-x-3">
                          <span className={`text-xl ${typeColors[result.type]}`}>
                            {result.icon}
                          </span>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-ink group-hover:text-accent transition-colors">
                              {result.title}
                            </h4>
                            <p className="text-xs text-gray mt-1">
                              {result.description}
                            </p>
                          </div>
                          <span className="text-xs text-gray/50 uppercase">
                            {result.type}
                          </span>
                        </div>
                      </motion.button>
                    ))}
                    
                    <button
                      onClick={handleSearch}
                      className="w-full mt-2 p-2 text-sm text-accent hover:text-accent/80 transition-colors"
                    >
                      View all results for "{query}" →
                    </button>
                  </div>
                )}

                {/* No Results */}
                {!loading && query.length > 2 && results.length === 0 && (
                  <div className="py-8 text-center">
                    <p className="text-gray">No results found for "{query}"</p>
                    <button
                      onClick={handleSearch}
                      className="mt-2 text-sm text-accent hover:text-accent/80 transition-colors"
                    >
                      Try advanced search →
                    </button>
                  </div>
                )}

                {/* Recent Searches */}
                {!loading && query.length === 0 && recentSearches.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-gray mb-2">Recent Searches</p>
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearch(search)}
                        className="w-full p-2 rounded-lg hover:bg-ink/5 transition-colors text-left flex items-center space-x-2 group"
                      >
                        <svg
                          className="w-4 h-4 text-gray"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-sm text-ink group-hover:text-accent transition-colors">
                          {search}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </GlassmorphicCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;
