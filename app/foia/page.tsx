'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createBrowserClient } from '@supabase/ssr';
import { FOIARequest, FOIAStatus } from '@/types/foia';
import { 
  DocumentTextIcon, 
  ClockIcon, 
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
  ArchiveBoxIcon
} from '@heroicons/react/24/outline';

const statusColors: Record<FOIAStatus, string> = {
  draft: 'bg-gray-100 text-gray-800',
  submitted: 'bg-blue-100 text-blue-800',
  acknowledged: 'bg-indigo-100 text-indigo-800',
  processing: 'bg-yellow-100 text-yellow-800',
  partially_fulfilled: 'bg-orange-100 text-orange-800',
  fulfilled: 'bg-green-100 text-green-800',
  denied: 'bg-red-100 text-red-800',
  appealed: 'bg-purple-100 text-purple-800',
  withdrawn: 'bg-gray-100 text-gray-800'
};

export default function FOIADashboard() {
  const [requests, setRequests] = useState<FOIARequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    fulfilled: 0,
    denied: 0
  });
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data: foiaRequests, error } = await supabase
        .from('foia_requests')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      setRequests(foiaRequests || []);

      // Calculate stats
      const allRequests = foiaRequests || [];
      setStats({
        total: allRequests.length,
        pending: allRequests.filter(r => ['submitted', 'acknowledged', 'processing'].includes(r.status)).length,
        fulfilled: allRequests.filter(r => r.status === 'fulfilled').length,
        denied: allRequests.filter(r => r.status === 'denied').length
      });
    } catch (error) {
      console.error('Error fetching FOIA requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    {
      title: 'New Request',
      description: 'Create a new FOIA request',
      icon: PlusIcon,
      href: '/foia/requests/new',
      color: 'bg-blue-500'
    },
    {
      title: 'Templates',
      description: 'Browse request templates',
      icon: DocumentDuplicateIcon,
      href: '/foia/templates',
      color: 'bg-purple-500'
    },
    {
      title: 'Analytics',
      description: 'View policy analysis',
      icon: ChartBarIcon,
      href: '/foia/analytics',
      color: 'bg-green-500'
    },
    {
      title: 'Archive',
      description: 'Response archive',
      icon: ArchiveBoxIcon,
      href: '/foia/archive',
      color: 'bg-indigo-500'
    }
  ];

  const statCards = [
    {
      title: 'Total Requests',
      value: stats.total,
      icon: DocumentTextIcon,
      color: 'text-blue-600'
    },
    {
      title: 'Pending',
      value: stats.pending,
      icon: ClockIcon,
      color: 'text-yellow-600'
    },
    {
      title: 'Fulfilled',
      value: stats.fulfilled,
      icon: CheckCircleIcon,
      color: 'text-green-600'
    },
    {
      title: 'Denied',
      value: stats.denied,
      icon: XCircleIcon,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              href={action.href}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${action.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Requests</h2>
            <Link
              href="/foia/requests"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              View all →
            </Link>
          </div>
        </div>
        <div className="divide-y divide-gray-200">
          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading requests...</div>
          ) : requests.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 mb-4">No FOIA requests yet</p>
              <Link
                href="/foia/requests/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <PlusIcon className="h-5 w-5 mr-2" />
                Create your first request
              </Link>
            </div>
          ) : (
            requests.map((request) => (
              <Link
                key={request.id}
                href={`/foia/requests/${request.id}`}
                className="block px-6 py-4 hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {request.subject}
                      </h3>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[request.status]}`}>
                        {request.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {request.agency_name} • {request.request_number || 'Draft'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(request.created_at).toLocaleDateString()}
                    </p>
                    {request.due_date && (
                      <p className="text-xs text-gray-400">
                        Due: {new Date(request.due_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
