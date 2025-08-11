'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { FOIARequest } from '@/types/foia';
import { CalendarIcon, DocumentTextIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { use } from 'react';

export default function FOIARequestPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [request, setRequest] = useState<FOIARequest | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetchRequest(id);
    }
  }, [id]);

  const fetchRequest = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('foia_requests')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setRequest(data);
    } catch (error) {
      console.error('Error fetching FOIA request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (status: string) => {
    if (!request) return;

    try {
      const { error } = await supabase
        .from('foia_requests')
        .update({ status })
        .eq('id', request.id);

      if (error) throw error;

      // Re-fetch request to show updated status
      fetchRequest(request.id);
    } catch (error) {
      console.error('Error updating FOIA request status:', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">FOIA Request Details</h1>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : !request ? (
        <div className="text-center text-gray-500">FOIA request not found</div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <DocumentTextIcon className="h-5 w-5 text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-800">{request.subject}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Agency Name</label>
                <p className="mt-1 text-gray-900">{request.agency_name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Request Number</label>
                <p className="mt-1 text-gray-900">{request.request_number || "N/A"}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <p className="mt-1 text-gray-900 inline-flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800`}>{request.status.replace('_', ' ')}</span>
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Submission Date</label>
                <p className="mt-1 text-gray-900 inline-flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  {request.submitted_date ? new Date(request.submitted_date).toLocaleDateString() : "N/A"}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Due Date</label>
                <p className="mt-1 text-gray-900 inline-flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                  {request.due_date ? new Date(request.due_date).toLocaleDateString() : "N/A"}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Request Content</label>
              <p className="mt-1 text-gray-900 whitespace-pre-line">{request.request_content}</p>
            </div>

            <div className="space-x-4 mt-4">
              <button
                className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md shadow-sm text-white text-sm font-medium hover:bg-green-700"
                onClick={() => handleChangeStatus('fulfilled')}
              >
                <CheckIcon className="-ml-1 mr-2 h-5 w-5" /> Mark as Fulfilled
              </button>
              <button
                className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md shadow-sm text-white text-sm font-medium hover:bg-red-700"
                onClick={() => handleChangeStatus('denied')}
              >
                <XMarkIcon className="-ml-1 mr-2 h-5 w-5" /> Mark as Denied
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

