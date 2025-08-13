'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Send, ThumbsUp, ThumbsDown, Flag, Award, CheckCircle } from 'lucide-react';
import { addTruthMapComment } from '../lib/truth-map-helpers';

interface CollaborativeFactCheckingProps {
  entries: any[];
  onUpdate: () => void;
}

export default function CollaborativeFactChecking({ entries, onUpdate }: CollaborativeFactCheckingProps) {
  const [selectedEntry, setSelectedEntry] = useState<any | null>(null);
  const [newComment, setNewComment] = useState('');
  const [newEvidence, setNewEvidence] = useState('');
  const [evidenceSource, setEvidenceSource] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddComment = async (entryId: string) => {
    if (!newComment.trim()) return;
    
    setLoading(true);
    try {
      // In production, this would use the actual user ID from context
      const { error } = await addTruthMapComment(entryId, 'current-user-id', newComment);
      
      if (!error) {
        setNewComment('');
        onUpdate();
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitEvidence = async () => {
    if (!selectedEntry || !newEvidence.trim()) return;
    
    // In production, this would submit new evidence to the API
    console.log('Submitting evidence:', { entryId: selectedEntry.id, evidence: newEvidence, source: evidenceSource });
    setNewEvidence('');
    setEvidenceSource('');
    onUpdate();
  };

  const getContributorBadge = (contributionCount: number) => {
    if (contributionCount >= 50) return { color: 'text-yellow-400', label: 'Gold Contributor' };
    if (contributionCount >= 20) return { color: 'text-gray-400', label: 'Silver Contributor' };
    if (contributionCount >= 5) return { color: 'text-orange-600', label: 'Bronze Contributor' };
    return { color: 'text-purple-400', label: 'Contributor' };
  };

  return (
    <div className="space-y-6">
      {/* Collaboration Instructions */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-400" />
          How to Contribute
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
          <div>
            <h4 className="font-semibold text-purple-400 mb-2">1. Submit Evidence</h4>
            <p>Provide credible sources that support or refute claims</p>
          </div>
          <div>
            <h4 className="font-semibold text-purple-400 mb-2">2. Vote on Accuracy</h4>
            <p>Help validate evidence through community consensus</p>
          </div>
          <div>
            <h4 className="font-semibold text-purple-400 mb-2">3. Report Issues</h4>
            <p>Flag misleading or incomplete information</p>
          </div>
        </div>
      </div>

      {/* Active Collaborations */}
      <div className="grid gap-4">
        {entries.map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl overflow-hidden"
          >
            {/* Entry Header */}
            <div className="p-6 border-b border-purple-500/20">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {entry.title || 'Untitled Claim'}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {entry.original_claim?.substring(0, 150)}...
                  </p>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-medium ${
                    entry.status === 'verified' ? 'text-green-400' :
                    entry.status === 'debunked' ? 'text-red-400' :
                    'text-yellow-400'
                  }`}>
                    {entry.status?.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Collaboration Stats */}
              <div className="flex items-center gap-6 mt-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {entry.comments?.length || 0} Comments
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  {entry.evidence_sources?.length || 0} Sources
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {entry.contributors?.length || 3} Contributors
                </span>
              </div>
            </div>

            {/* Collaboration Actions */}
            <div className="p-4 bg-black/20">
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  Verify
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors">
                  <ThumbsDown className="w-4 h-4" />
                  Dispute
                </button>
                <button className="flex items-center gap-2 px-3 py-2 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 rounded-lg transition-colors">
                  <Flag className="w-4 h-4" />
                  Report
                </button>
                <button
                  onClick={() => setSelectedEntry(entry)}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 rounded-lg transition-colors ml-auto"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contribute
                </button>
              </div>
            </div>

            {/* Expanded Contribution Form */}
            {selectedEntry?.id === entry.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-purple-500/20"
              >
                <div className="p-6 space-y-4">
                  {/* Add Evidence */}
                  <div>
                    <label className="block text-sm font-medium text-purple-400 mb-2">
                      Submit New Evidence
                    </label>
                    <textarea
                      value={newEvidence}
                      onChange={(e) => setNewEvidence(e.target.value)}
                      placeholder="Describe the evidence or counter-evidence..."
                      className="w-full px-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 resize-none"
                      rows={3}
                    />
                    <input
                      type="url"
                      value={evidenceSource}
                      onChange={(e) => setEvidenceSource(e.target.value)}
                      placeholder="Source URL (optional)"
                      className="w-full mt-2 px-4 py-2 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
                    />
                    <button
                      onClick={handleSubmitEvidence}
                      disabled={!newEvidence.trim()}
                      className="mt-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                    >
                      Submit Evidence
                    </button>
                  </div>

                  {/* Add Comment */}
                  <div>
                    <label className="block text-sm font-medium text-purple-400 mb-2">
                      Add Comment
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment(entry.id)}
                        placeholder="Share your insights..."
                        className="flex-1 px-4 py-2 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
                      />
                      <button
                        onClick={() => handleAddComment(entry.id)}
                        disabled={loading || !newComment.trim()}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white rounded-lg transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* No entries */}
      {entries.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <p className="text-gray-400">No claims available for collaborative fact-checking.</p>
        </div>
      )}

      {/* Top Contributors */}
      <div className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Award className="w-6 h-6 text-purple-400" />
          Top Contributors
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[1, 2, 3].map((rank) => {
            const contributions = 50 - (rank - 1) * 15;
            const badge = getContributorBadge(contributions);
            return (
              <div key={rank} className="flex items-center gap-3 p-3 bg-black/40 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">#{rank}</div>
                <div className="flex-1">
                  <p className="text-white font-medium">Contributor {rank}</p>
                  <p className="text-xs text-gray-400">{contributions} contributions</p>
                </div>
                <Award className={`w-5 h-5 ${badge.color}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
