'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, Calendar, Tag, MapPin, FileText, X, ChevronDown } from 'lucide-react'
import { useMemory } from './MemoryContext'

export default function SearchFilter() {
  const { evidence, searchEvidence, filterByTags, filterByDateRange } = useMemory()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null
  })
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilter, setActiveFilter] = useState<'tags' | 'date' | 'type' | null>(null)

  // Extract all unique tags from evidence
  const allTags = Array.from(new Set(evidence.flatMap(item => item.tags)))

  // Evidence types
  const evidenceTypes = [
    { value: 'document', label: 'Documents', icon: FileText },
    { value: 'image', label: 'Images', icon: FileText },
    { value: 'video', label: 'Videos', icon: FileText },
    { value: 'audio', label: 'Audio', icon: FileText }
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    // The actual search is handled by the parent component
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTags([])
    setDateRange({ start: null, end: null })
  }

  const activeFilterCount = 
    selectedTags.length + 
    (dateRange.start || dateRange.end ? 1 : 0)

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search evidence by title, description, or tags..."
            className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl
                     text-white placeholder-white/40
                     focus:border-[#60E6D6]/50 focus:bg-white/10 focus:outline-none
                     transition-all duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearch('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg
                   hover:bg-white/10 transition-colors"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 bg-[#60E6D6] text-black text-xs font-bold rounded-full">
              {activeFilterCount}
            </span>
          )}
          <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-6">
              {/* Tags Filter */}
              <div>
                <button
                  onClick={() => setActiveFilter(activeFilter === 'tags' ? null : 'tags')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div className="flex items-center gap-2">
                    <Tag className="w-5 h-5 text-[#60E6D6]" />
                    <h3 className="font-medium text-white">Tags</h3>
                    {selectedTags.length > 0 && (
                      <span className="text-sm text-white/60">({selectedTags.length} selected)</span>
                    )}
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-white/60 transition-transform ${
                      activeFilter === 'tags' ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                <AnimatePresence>
                  {activeFilter === 'tags' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="flex flex-wrap gap-2">
                        {allTags.map(tag => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`
                              px-3 py-1.5 rounded-full text-sm font-medium transition-all
                              ${selectedTags.includes(tag)
                                ? 'bg-[#60E6D6] text-black'
                                : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                              }
                            `}
                          >
                            {tag}
                          </button>
                        ))}
                        {allTags.length === 0 && (
                          <p className="text-white/40 text-sm">No tags available</p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Date Range Filter */}
              <div>
                <button
                  onClick={() => setActiveFilter(activeFilter === 'date' ? null : 'date')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#60E6D6]" />
                    <h3 className="font-medium text-white">Date Range</h3>
                    {(dateRange.start || dateRange.end) && (
                      <span className="text-sm text-white/60">(Active)</span>
                    )}
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-white/60 transition-transform ${
                      activeFilter === 'date' ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                <AnimatePresence>
                  {activeFilter === 'date' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-white/60 mb-2">Start Date</label>
                          <input
                            type="date"
                            value={dateRange.start ? dateRange.start.toISOString().split('T')[0] : ''}
                            onChange={(e) => setDateRange(prev => ({ 
                              ...prev, 
                              start: e.target.value ? new Date(e.target.value) : null 
                            }))}
                            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg
                                     text-white focus:border-[#60E6D6] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-white/60 mb-2">End Date</label>
                          <input
                            type="date"
                            value={dateRange.end ? dateRange.end.toISOString().split('T')[0] : ''}
                            onChange={(e) => setDateRange(prev => ({ 
                              ...prev, 
                              end: e.target.value ? new Date(e.target.value) : null 
                            }))}
                            className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg
                                     text-white focus:border-[#60E6D6] focus:outline-none"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Evidence Type Filter */}
              <div>
                <button
                  onClick={() => setActiveFilter(activeFilter === 'type' ? null : 'type')}
                  className="flex items-center justify-between w-full text-left"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#60E6D6]" />
                    <h3 className="font-medium text-white">Evidence Type</h3>
                  </div>
                  <ChevronDown 
                    className={`w-4 h-4 text-white/60 transition-transform ${
                      activeFilter === 'type' ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                <AnimatePresence>
                  {activeFilter === 'type' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-3">
                        {evidenceTypes.map(type => (
                          <label
                            key={type.value}
                            className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-lg
                                     hover:bg-white/10 cursor-pointer transition-colors"
                          >
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-[#60E6D6] bg-white/10 border-white/20 rounded
                                       focus:ring-[#60E6D6] focus:ring-offset-0"
                            />
                            <type.icon className="w-4 h-4 text-white/60" />
                            <span className="text-sm text-white">{type.label}</span>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Filters Display */}
      {(searchQuery || selectedTags.length > 0 || dateRange.start || dateRange.end) && (
        <div className="flex flex-wrap gap-2">
          {searchQuery && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#60E6D6]/20 rounded-full">
              <Search className="w-3 h-3 text-[#60E6D6]" />
              <span className="text-sm text-[#60E6D6]">"{searchQuery}"</span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#60E6D6] hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          {selectedTags.map(tag => (
            <div key={tag} className="flex items-center gap-2 px-3 py-1.5 bg-[#60E6D6]/20 rounded-full">
              <Tag className="w-3 h-3 text-[#60E6D6]" />
              <span className="text-sm text-[#60E6D6]">{tag}</span>
              <button
                onClick={() => toggleTag(tag)}
                className="text-[#60E6D6] hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}

          {(dateRange.start || dateRange.end) && (
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#60E6D6]/20 rounded-full">
              <Calendar className="w-3 h-3 text-[#60E6D6]" />
              <span className="text-sm text-[#60E6D6]">
                {dateRange.start ? dateRange.start.toLocaleDateString() : 'Any'} - 
                {dateRange.end ? dateRange.end.toLocaleDateString() : 'Any'}
              </span>
              <button
                onClick={() => setDateRange({ start: null, end: null })}
                className="text-[#60E6D6] hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
