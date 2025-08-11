'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useProviders } from './hooks/useProviders';
import { ProviderCard } from './components/ProviderCard';
import { ProviderFilters } from './components/ProviderFilters';
import { ProviderDetailModal } from './components/ProviderDetailModal';
import { ServiceRequestForm } from './components/ServiceRequestForm';
import { ServiceProvider, ServiceRequest } from './types';
import { getUniqueLanguages, getUniqueAreas, getUniqueSpecializations } from './utils/search';
import { matchProvidersToRequest, calculateMatchPercentage } from './utils/matching';
import Button from '../components/ui/Button';

export default function ParallelServicesPage() {
  const {
    providers,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    clearFilters,
    toggleArrayFilter,
    totalProviders,
    filteredCount
  } = useProviders();

  const [selectedProvider, setSelectedProvider] = useState<ServiceProvider | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [serviceRequest, setServiceRequest] = useState<Partial<ServiceRequest> | null>(null);
  const [viewMode, setViewMode] = useState<'browse' | 'request'>('browse');

  // Get unique values for filters
  const uniqueLanguages = useMemo(() => getUniqueLanguages(providers), [providers]);
  const uniqueAreas = useMemo(() => getUniqueAreas(providers), [providers]);
  const uniqueSpecializations = useMemo(() => getUniqueSpecializations(providers), [providers]);

  // Handle provider selection
  const handleProviderSelect = (provider: ServiceProvider) => {
    setSelectedProvider(provider);
    setShowDetailModal(true);
  };

  // Handle service request submission
  const handleRequestSubmit = (request: Partial<ServiceRequest>) => {
    setServiceRequest(request);
    setShowRequestForm(false);
    setViewMode('browse');
    
    // Apply filters based on the request
    if (request.category) {
      updateFilter('categories', [request.category]);
    }
    if (request.subcategories && request.subcategories.length > 0) {
      updateFilter('subcategories', request.subcategories);
    }
    if (request.preferredLanguages && request.preferredLanguages.length > 0) {
      updateFilter('languages', request.preferredLanguages);
    }
    if (request.location?.remote) {
      updateFilter('location', { ...filters.location, remote: true });
    }
  };

  // Calculate matches if there's a service request
  const matchedProviders = useMemo(() => {
    if (!serviceRequest || viewMode !== 'browse') return null;
    const matches = matchProvidersToRequest(serviceRequest as ServiceRequest, providers);
    return matches;
  }, [serviceRequest, providers, viewMode]);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Parallel Services Directory</h1>
              <p className="text-gray-400 mt-1">
                Connect with verified service providers in our network
              </p>
            </div>
            <Button
              onClick={() => setShowRequestForm(!showRequestForm)}
              variant="primary"
              className="hidden md:block"
            >
              {showRequestForm ? 'Browse Providers' : 'Request Service'}
            </Button>
          </div>

          {/* Search Bar */}
          {!showRequestForm && (
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search providers, services, specializations..."
                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 pl-12 text-white placeholder-gray-500 focus:border-white/20 focus:outline-none"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
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
            </div>
          )}
        </div>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden sticky top-[120px] z-30 bg-black/50 backdrop-blur-sm border-b border-white/10 p-4">
        <Button
          onClick={() => setShowRequestForm(!showRequestForm)}
          variant="primary"
          className="w-full"
        >
          {showRequestForm ? 'Browse Providers' : 'Request Service'}
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {showRequestForm ? (
          <ServiceRequestForm
            onSubmit={handleRequestSubmit}
            onCancel={() => setShowRequestForm(false)}
          />
        ) : (
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <ProviderFilters
                filters={filters}
                updateFilter={updateFilter}
                toggleArrayFilter={toggleArrayFilter}
                clearFilters={clearFilters}
                uniqueLanguages={uniqueLanguages}
                uniqueAreas={uniqueAreas}
                uniqueSpecializations={uniqueSpecializations}
              />
            </div>

            {/* Provider List */}
            <div className="lg:col-span-3">
              {/* Results Summary */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-400">
                  Showing {filteredCount} of {totalProviders} providers
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
                {serviceRequest && (
                  <button
                    onClick={() => setServiceRequest(null)}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Clear service request
                  </button>
                )}
              </div>

              {/* Match Summary */}
              {matchedProviders && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6"
                >
                  <h3 className="text-blue-300 font-semibold mb-2">
                    Service Request Matches
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Found {matchedProviders.length} providers matching your request.
                    Top matches are highlighted below.
                  </p>
                </motion.div>
              )}

              {/* Loading State */}
              {loading && (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  <p className="text-gray-400 mt-4">Loading providers...</p>
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 text-center">
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              {/* Provider Grid */}
              {!loading && !error && filteredCount > 0 && (
                <div className="grid md:grid-cols-2 gap-6">
                  {providers.map(provider => {
                    const match = matchedProviders?.find(m => m.provider.id === provider.id);
                    const matchPercentage = match ? calculateMatchPercentage(match.score) : 0;

                    return (
                      <motion.div
                        key={provider.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative"
                      >
                        {match && (
                          <div className="absolute -top-3 -right-3 bg-blue-500 text-white text-sm font-bold rounded-full w-12 h-12 flex items-center justify-center z-10">
                            {matchPercentage}%
                          </div>
                        )}
                        <ProviderCard
                          provider={provider}
                          onSelect={handleProviderSelect}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* No Results */}
              {!loading && !error && filteredCount === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-400 text-lg mb-4">
                    No providers found matching your criteria.
                  </p>
                  <Button onClick={clearFilters} variant="secondary">
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Provider Detail Modal */}
      <ProviderDetailModal
        provider={selectedProvider}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedProvider(null);
        }}
      />
    </div>
  );
}
