'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Shield, AlertTriangle, CheckCircle, Share2, TrendingDown, Users, BarChart3 } from 'lucide-react';
import MythFactComparison from './components/MythFactComparison';
import SourceVerification from './components/SourceVerification';
import CollaborativeFactChecking from './components/CollaborativeFactChecking';
import ShareableTruthCard from './components/ShareableTruthCard';
import MisinformationDashboard from './dashboard/MisinformationDashboard';
import { supabase } from '@/lib/supabase';

export default function TruthMapPage() {
  const [activeView, setActiveView] = useState<'comparison' | 'verification' | 'collaborative' | 'dashboard'>('comparison');
  const [searchQuery, setSearchQuery] = useState('');
  const [truthEntries, setTruthEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [showShareCard, setShowShareCard] = useState(false);

  useEffect(() => {
    fetchTruthEntries();
    
    // Subscribe to real-time updates
    const subscription = supabase
      .channel('truth-map-updates')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'lie_truth_map' }, 
        handleRealtimeUpdate
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchTruthEntries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('lie_truth_map')
        .select(`
          *,
          created_by:users!lie_truth_map_created_by_fkey(full_name, email),
          verified_by:users!lie_truth_map_verified_by_fkey(full_name, email)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTruthEntries(data || []);
    } catch (error) {
      console.error('Error fetching truth entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRealtimeUpdate = (payload: any) => {
    if (payload.eventType === 'INSERT') {
      setTruthEntries(prev => [payload.new, ...prev]);
    } else if (payload.eventType === 'UPDATE') {
      setTruthEntries(prev => 
        prev.map(entry => entry.id === payload.new.id ? payload.new : entry)
      );
    } else if (payload.eventType === 'DELETE') {
      setTruthEntries(prev => prev.filter(entry => entry.id !== payload.old.id));
    }
  };

  const filteredEntries = truthEntries.filter(entry => 
    entry.original_claim?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.counter_evidence?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.tags?.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const viewComponents = {
    comparison: <MythFactComparison entries={filteredEntries} onSelectEntry={setSelectedEntry} />,
    verification: <SourceVerification entries={filteredEntries} />,
    collaborative: <CollaborativeFactChecking entries={filteredEntries} onUpdate={fetchTruthEntries} />,
    dashboard: <MisinformationDashboard entries={truthEntries} />
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <div className="bg-black/30 backdrop-blur-lg border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <Shield className="w-8 h-8 text-purple-400" />
                Lie→Truth Map
              </h1>
              <p className="text-purple-200 mt-1">
                Debunk misinformation with verified facts and collaborative fact-checking
              </p>
            </div>
            
            <button
              onClick={() => setShowShareCard(!showShareCard)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share Truth Card
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search claims, evidence, or tags..."
              className="w-full pl-10 pr-4 py-3 bg-black/40 border border-purple-500/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-6 overflow-x-auto">
            {[
              { id: 'comparison', label: 'Myth vs Fact', icon: AlertTriangle },
              { id: 'verification', label: 'Source Verification', icon: CheckCircle },
              { id: 'collaborative', label: 'Collaborative Check', icon: Users },
              { id: 'dashboard', label: 'Tracking Dashboard', icon: BarChart3 }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
                  activeView === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-black/40 text-purple-300 hover:bg-purple-600/20'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
          </div>
        ) : (
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {viewComponents[activeView]}
          </motion.div>
        )}
      </div>

      {/* Shareable Truth Card Modal */}
      {showShareCard && selectedEntry && (
        <ShareableTruthCard
          entry={selectedEntry}
          onClose={() => setShowShareCard(false)}
        />
      )}

      {/* Stats Banner */}
      <div className="bg-black/40 backdrop-blur-lg border-t border-purple-500/20 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-400">
                {truthEntries.filter(e => e.status === 'verified').length}
              </p>
              <p className="text-purple-200">Verified Facts</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-400">
                {truthEntries.filter(e => e.status === 'debunked').length}
              </p>
              <p className="text-purple-200">Debunked Claims</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-400">
                {truthEntries.filter(e => e.status === 'under_review').length}
              </p>
              <p className="text-purple-200">Under Review</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-400">
                {truthEntries.reduce((acc, e) => acc + (e.confidence_score || 0), 0) / truthEntries.length || 0}%
              </p>
              <p className="text-purple-200">Avg Confidence</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
