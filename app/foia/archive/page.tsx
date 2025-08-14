'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FOIAResponse, FOIARequest } from '@/types/foia';
import { 
  ArchiveBoxIcon, 
  DocumentTextIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';

interface ResponseWithRequest extends FOIAResponse {
  request?: FOIARequest;
}

export default function FOIAArchivePage() {
  const [responses, setResponses] = useState<ResponseWithRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const supabase = createClientComponentClient();

  useEffect(() => {
    fetchResponses();
  }, []);

  const fetchResponses = async () => {
    try {
      const { data, error } = await supabase
        .from('foia_responses')
        .select(`
          *,
          request:foia_requests(*)
        `)
        .order('response_date', { ascending: false });

      if (error) throw error;

      setResponses(data || []);
    } catch (error) {
      console.error('Error fetching responses:', error);
    } finally {
      setLoading(false);
    }
  };

  const responseTypeColors: Record<string, string> = {
    acknowledgment: 'bg-gray-100 text-gray-800',
    partial: 'bg-yellow-100 text-yellow-800',
    final: 'bg-green-100 text-green-800',
    denial: 'bg-red-100 text-red-800',
    appeal_response: 'bg-purple-100 text-purple-800'
  };

  const filteredResponses = responses.filter(response => {
    const matchesSearch = searchTerm === '' || 
      response.request?.agency_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      response.request?.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      response.response_content?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || response.response_type === filterType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">FOIA Response Archive</h1>
        <p className="text-gray-600 mt-2">
          Browse and search through archived FOIA responses
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search responses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Types</option>
              <option value="acknowledgment">Acknowledgment</option>
              <option value="partial">Partial</option>
              <option value="final">Final</option>
              <option value="denial">Denial</option>
              <option value="appeal_response">Appeal Response</option>
            </select>
          </div>
        </div>
      </div>

      {/* Response List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-500 mt-2">Loading archived responses...</p>
        </div>
      ) : filteredResponses.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <ArchiveBoxIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No archived responses found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResponses.map((response) => (
            <div key={response.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {response.request?.subject || 'Unknown Request'}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        responseTypeColors[response.response_type] || 'bg-gray-100 text-gray-800'
                      }`}>
                        {response.response_type.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                        {response.request?.agency_name || 'Unknown Agency'}
                      </span>
                      <span className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        {new Date(response.response_date).toLocaleDateString()}
                      </span>
                      {response.request?.request_number && (
                        <span className="flex items-center">
                          <DocumentTextIcon className="h-4 w-4 mr-1" />
                          {response.request.request_number}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {response.response_content && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-700 line-clamp-3">
                      {response.response_content}
                    </p>
                  </div>
                )}

                {response.exemptions_cited && response.exemptions_cited.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs text-gray-500 mb-1">Exemptions cited:</p>
                    <div className="flex flex-wrap gap-1">
                      {response.exemptions_cited.map((exemption, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-0.5 text-xs bg-red-50 text-red-700 rounded"
                        >
                          {exemption}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 flex gap-2">
                  <button className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium">
                    View Full Response
                  </button>
                  {response.documents && response.documents.length > 0 && (
                    <button className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm font-medium">
                      View Documents ({response.documents.length})
                    </button>
                  )}
                  {response.appeal_deadline && new Date(response.appeal_deadline) > new Date() && (
                    <button className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm font-medium">
                      File Appeal
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
