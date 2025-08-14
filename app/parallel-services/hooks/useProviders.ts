'use client';

import { useState, useEffect, useMemo } from 'react';
import { ServiceProvider, ProviderFilter } from '../types';
import { searchProviders, filterProviders, sortProviders } from '../utils/search';
import { mockProviders } from '../data/mockProviders';

export function useProviders() {
  const [providers, setProviders] = useState<ServiceProvider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ProviderFilter>({
    sortBy: 'rating',
    sortOrder: 'desc'
  });

  // Load providers (mock data for now)
  useEffect(() => {
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setProviders(mockProviders);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load providers');
      setLoading(false);
    }
  }, []);

  // Apply search, filters, and sorting
  const filteredProviders = useMemo(() => {
    let result = [...providers];
    
    // Apply search
    if (searchQuery) {
      result = searchProviders(result, searchQuery);
    }
    
    // Apply filters
    result = filterProviders(result, filters);
    
    // Apply sorting
    result = sortProviders(result, filters.sortBy, filters.sortOrder);
    
    return result;
  }, [providers, searchQuery, filters]);

  const updateFilter = (key: keyof ProviderFilter, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      sortBy: 'rating',
      sortOrder: 'desc'
    });
    setSearchQuery('');
  };

  const toggleArrayFilter = (key: keyof ProviderFilter, value: any) => {
    setFilters(prev => {
      const currentArray = (prev[key] as any[]) || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      
      return { ...prev, [key]: newArray };
    });
  };

  return {
    providers: filteredProviders,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    filters,
    updateFilter,
    clearFilters,
    toggleArrayFilter,
    totalProviders: providers.length,
    filteredCount: filteredProviders.length
  };
}
