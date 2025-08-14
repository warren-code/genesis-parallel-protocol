'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, ArrowRight, ExternalLink, Calendar, User, TrendingUp } from 'lucide-react';

interface MythFactComparisonProps {
  entries: any[];
  onSelectEntry: (entry: any) => void;
}

export default function MythFactComparison({ entries, onSelectEntry }: MythFactComparisonProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  const categories = ['all', 'politics', 'health', 'technology', 'finance', 'social', 'environment'];

  const filteredEntries = selectedCategory === 'all' 
    ? entries 
    : entries.filter(entry => entry.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'text-green-400 bg-green-400/20';
      case 'debunked': return 'text-red-400 bg-red-400/20';
      case 'under_review': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getConfidenceColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg capitalize transition-all whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-black/40 text-purple-300 hover:bg-purple-600/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Comparison Cards */}
      <div className="grid gap-6">
        {filteredEntries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-purple-500/20">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(entry.status)}`}>
                      {entry.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-gray-400 text-sm flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(entry.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{entry.title || 'Untitled Claim'}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {entry.created_by?.full_name || 'Anonymous'}
                    </span>
                    <span className={`flex items-center gap-1 ${getConfidenceColor(entry.confidence_score || 0)}`}>
                      <TrendingUp className="w-4 h-4" />
                      {entry.confidence_score || 0}% Confidence
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onSelectEntry(entry);
                    setExpandedEntry(expandedEntry === entry.id ? null : entry.id);
                  }}
                  className="p-2 hover:bg-purple-600/20 rounded-lg transition-colors"
                >
                  <ArrowRight className={`w-5 h-5 text-purple-400 transition-transform ${
                    expandedEntry === entry.id ? 'rotate-90' : ''
                  }`} />
                </button>
              </div>

              {/* Tags */}
              {entry.tags && entry.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {entry.tags.map((tag: string) => (
                    <span key={tag} className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Myth vs Fact Comparison */}
            <div className="grid md:grid-cols-2 divide-x divide-purple-500/20">
              {/* Myth/Claim Side */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <h4 className="text-lg font-semibold text-red-400">The Claim</h4>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {entry.original_claim || 'No claim text available'}
                </p>
                {entry.claim_source && (
                  <a
                    href={entry.claim_source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 mt-4 text-sm text-red-300 hover:text-red-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Original Source
                  </a>
                )}
              </div>

              {/* Truth/Evidence Side */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                  <h4 className="text-lg font-semibold text-green-400">The Truth</h4>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  {entry.counter_evidence || 'Evidence pending verification'}
                </p>
                {entry.evidence_sources && entry.evidence_sources.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {entry.evidence_sources.map((source: string, idx: number) => (
                      <a
                        key={idx}
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-green-300 hover:text-green-200"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Verified Source {idx + 1}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Expanded Details */}
            {expandedEntry === entry.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-purple-500/20"
              >
                <div className="p-6 space-y-4">
                  {/* Impact Assessment */}
                  {entry.impact_assessment && (
                    <div>
                      <h5 className="text-sm font-semibold text-purple-400 mb-2">Impact Assessment</h5>
                      <p className="text-gray-300 text-sm">{entry.impact_assessment}</p>
                    </div>
                  )}

                  {/* Verification Details */}
                  {entry.verified_by && (
                    <div>
                      <h5 className="text-sm font-semibold text-purple-400 mb-2">Verified By</h5>
                      <p className="text-gray-300 text-sm">
                        {entry.verified_by.full_name} on {new Date(entry.verified_at).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {/* Additional Notes */}
                  {entry.notes && (
                    <div>
                      <h5 className="text-sm font-semibold text-purple-400 mb-2">Additional Notes</h5>
                      <p className="text-gray-300 text-sm">{entry.notes}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {filteredEntries.length === 0 && (
        <div className="text-center py-12">
          <AlertTriangle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <p className="text-gray-400">No myth/fact comparisons found for this category.</p>
        </div>
      )}
    </div>
  );
}
