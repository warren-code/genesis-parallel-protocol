'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, TrendingDown, PieChart, Calendar, Globe, AlertTriangle, CheckCircle } from 'lucide-react';

interface MisinformationDashboardProps {
  entries: any[];
}

export default function MisinformationDashboard({ entries }: MisinformationDashboardProps) {
  const [dateRange, setDateRange] = useState<'week' | 'month' | 'year'>('month');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Calculate statistics
  const stats = {
    total: entries.length,
    verified: entries.filter(e => e.status === 'verified').length,
    debunked: entries.filter(e => e.status === 'debunked').length,
    underReview: entries.filter(e => e.status === 'under_review').length,
    avgConfidence: entries.reduce((acc, e) => acc + (e.confidence_score || 0), 0) / entries.length || 0
  };

  // Category breakdown
  const categories = ['politics', 'health', 'technology', 'finance', 'social', 'environment'];
  const categoryData = categories.map(cat => ({
    name: cat,
    count: entries.filter(e => e.category === cat).length,
    verified: entries.filter(e => e.category === cat && e.status === 'verified').length,
    debunked: entries.filter(e => e.category === cat && e.status === 'debunked').length
  }));

  // Timeline data (mock for last 7 days)
  const timelineData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dayEntries = entries.filter(e => {
      const entryDate = new Date(e.created_at);
      return entryDate.toDateString() === date.toDateString();
    });
    return {
      date: date.toLocaleDateString('en-US', { weekday: 'short' }),
      total: dayEntries.length,
      verified: dayEntries.filter(e => e.status === 'verified').length,
      debunked: dayEntries.filter(e => e.status === 'debunked').length
    };
  }).reverse();

  // Top spreaders (mock data)
  const topSpreaders = [
    { source: 'Social Media Platform A', count: 45, impact: 'high' },
    { source: 'News Outlet B', count: 32, impact: 'medium' },
    { source: 'Blog Network C', count: 28, impact: 'low' },
    { source: 'Forum D', count: 19, impact: 'medium' },
    { source: 'Video Platform E', count: 15, impact: 'high' }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">{stats.total}</span>
          </div>
          <p className="text-purple-200">Total Claims</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-black/40 backdrop-blur-lg border border-green-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-white">{stats.verified}</span>
          </div>
          <p className="text-green-200">Verified Facts</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black/40 backdrop-blur-lg border border-red-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <span className="text-2xl font-bold text-white">{stats.debunked}</span>
          </div>
          <p className="text-red-200">Debunked Claims</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-black/40 backdrop-blur-lg border border-yellow-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 text-yellow-400" />
            <span className="text-2xl font-bold text-white">{stats.avgConfidence.toFixed(0)}%</span>
          </div>
          <p className="text-yellow-200">Avg Confidence</p>
        </motion.div>
      </div>

      {/* Timeline Chart */}
      <div className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-400" />
            Misinformation Timeline
          </h3>
          <div className="flex gap-2">
            {['week', 'month', 'year'].map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range as any)}
                className={`px-3 py-1 rounded text-sm transition-all ${
                  dateRange === range
                    ? 'bg-purple-600 text-white'
                    : 'bg-black/40 text-purple-300 hover:bg-purple-600/20'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {timelineData.map((day, idx) => (
            <div key={idx} className="text-center">
              <p className="text-xs text-gray-400 mb-2">{day.date}</p>
              <div className="space-y-1">
                <div 
                  className="bg-purple-600 rounded"
                  style={{ height: `${Math.max(day.total * 10, 10)}px` }}
                  title={`Total: ${day.total}`}
                />
                <div 
                  className="bg-green-600 rounded"
                  style={{ height: `${Math.max(day.verified * 10, 5)}px` }}
                  title={`Verified: ${day.verified}`}
                />
                <div 
                  className="bg-red-600 rounded"
                  style={{ height: `${Math.max(day.debunked * 10, 5)}px` }}
                  title={`Debunked: ${day.debunked}`}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-600 rounded"></div>
            <span className="text-gray-400">Total</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-600 rounded"></div>
            <span className="text-gray-400">Verified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-600 rounded"></div>
            <span className="text-gray-400">Debunked</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown & Top Spreaders */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <PieChart className="w-6 h-6 text-purple-400" />
            Category Breakdown
          </h3>
          <div className="space-y-3">
            {categoryData.map(cat => (
              <div key={cat.name} className="flex items-center justify-between">
                <span className="text-gray-300 capitalize">{cat.name}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-400">{cat.verified}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span className="text-xs text-gray-400">{cat.debunked}</span>
                  </div>
                  <span className="text-sm text-white font-medium w-12 text-right">{cat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Spreaders */}
        <div className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Globe className="w-6 h-6 text-purple-400" />
            Top Misinformation Sources
          </h3>
          <div className="space-y-3">
            {topSpreaders.map((spreader, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-black/40 rounded-lg">
                <div>
                  <p className="text-gray-300">{spreader.source}</p>
                  <p className="text-xs text-gray-500">
                    Impact: <span className={getImpactColor(spreader.impact)}>{spreader.impact}</span>
                  </p>
                </div>
                <span className="text-lg font-medium text-white">{spreader.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <TrendingDown className="w-6 h-6 text-purple-400" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          {entries.slice(0, 5).map((entry, idx) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between p-3 bg-black/40 rounded-lg"
            >
              <div className="flex-1">
                <p className="text-gray-300">{entry.title || 'Untitled Claim'}</p>
                <p className="text-xs text-gray-500">
                  {new Date(entry.created_at).toLocaleDateString()} • {entry.category}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                entry.status === 'verified' ? 'bg-green-400/20 text-green-400' :
                entry.status === 'debunked' ? 'bg-red-400/20 text-red-400' :
                'bg-yellow-400/20 text-yellow-400'
              }`}>
                {entry.status.replace('_', ' ')}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
