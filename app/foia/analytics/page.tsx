'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { PolicyAnalysis } from '@/types/foia';
import { ChartBarIcon } from '@heroicons/react/24/outline';

export default function FOIAAnalyticsPage() {
  const [analyses, setAnalyses] = useState<PolicyAnalysis[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const { data, error } = await supabase
        .from('policy_analyses')
        .select('*')
        .order('published_date', { ascending: false });

      if (error) throw error;

      setAnalyses(data || []);
    } catch (error) {
      console.error('Error fetching analyses:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Policy Analysis</h1>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 mt-2">Loading analyses...</p>
        </div>
      ) : analyses.length === 0 ? (
        <div className="text-center py-12">
          <ChartBarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No policy analyses available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {analyses.map((analysis) => (
            <div key={analysis.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">{analysis.title}</h3>
                <p className="text-sm text-gray-600 mt-1 mb-3">{analysis.description}</p>
                <p className="text-sm text-gray-500">
                  Published: {analysis.published_date ? new Date(analysis.published_date).toLocaleDateString() : 'N/A'}
                </p>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 text-center px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
                    View Analysis
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

