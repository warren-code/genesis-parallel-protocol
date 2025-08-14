'use client';

import React from 'react';
import { ProviderFilter, ServiceCategory, VerificationStatus, ServiceAvailability } from '../types';
import { categoryTaxonomy } from '../data/categoryTaxonomy';
import { motion } from 'framer-motion';

interface ProviderFiltersProps {
  filters: ProviderFilter;
  updateFilter: (key: keyof ProviderFilter, value: any) => void;
  toggleArrayFilter: (key: keyof ProviderFilter, value: any) => void;
  clearFilters: () => void;
  uniqueLanguages: string[];
  uniqueAreas: string[];
  uniqueSpecializations: string[];
}

export const ProviderFilters: React.FC<ProviderFiltersProps> = ({
  filters,
  updateFilter,
  toggleArrayFilter,
  clearFilters,
  uniqueLanguages,
  uniqueAreas,
  uniqueSpecializations
}) => {
  const verificationStatuses: VerificationStatus[] = ['certified', 'verified', 'pending', 'unverified'];
  const availabilityOptions: ServiceAvailability[] = ['24/7', 'on-demand', 'business-hours', 'appointment', 'emergency-only'];
  const priceTypes = ['free', 'pro-bono', 'sliding-scale', 'insurance', 'fixed'];
  
  const sortOptions = [
    { value: 'rating', label: 'Rating' },
    { value: 'reviews', label: 'Reviews' },
    { value: 'experience', label: 'Experience' },
    { value: 'price', label: 'Price' }
  ];

  const isFilterActive = (key: keyof ProviderFilter, value: any): boolean => {
    const filterValue = filters[key];
    if (Array.isArray(filterValue)) {
      return (filterValue as any[]).includes(value);
    }
    return filterValue === value;
  };

  return (
    <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          Clear all
        </button>
      </div>

      {/* Categories */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Categories</h4>
        <div className="space-y-2">
          {categoryTaxonomy.map(category => (
            <label key={category.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFilterActive('categories', category.id)}
                onChange={() => toggleArrayFilter('categories', category.id)}
                className="rounded border-gray-600 bg-black/50 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-300">{category.icon} {category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Verification Status */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Verification Status</h4>
        <div className="space-y-2">
          {verificationStatuses.map(status => (
            <label key={status} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFilterActive('verificationStatus', status)}
                onChange={() => toggleArrayFilter('verificationStatus', status)}
                className="rounded border-gray-600 bg-black/50 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-300 capitalize">{status}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Availability</h4>
        <div className="space-y-2">
          {availabilityOptions.map(availability => (
            <label key={availability} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFilterActive('availability', availability)}
                onChange={() => toggleArrayFilter('availability', availability)}
                className="rounded border-gray-600 bg-black/50 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-300">{availability}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Type */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Pricing</h4>
        <div className="space-y-2">
          {priceTypes.map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFilterActive('priceTypes', type)}
                onChange={() => toggleArrayFilter('priceTypes', type)}
                className="rounded border-gray-600 bg-black/50 text-blue-500 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-300 capitalize">{type.replace('-', ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Languages */}
      {uniqueLanguages.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Languages</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {uniqueLanguages.map(lang => (
              <label key={lang} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFilterActive('languages', lang)}
                  onChange={() => toggleArrayFilter('languages', lang)}
                  className="rounded border-gray-600 bg-black/50 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-300">{lang}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Minimum Rating */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Minimum Rating</h4>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={filters.minRating || 0}
            onChange={(e) => updateFilter('minRating', parseFloat(e.target.value) || undefined)}
            className="flex-1"
          />
          <span className="text-sm text-gray-300 w-12 text-right">
            {filters.minRating || 0}★
          </span>
        </div>
      </div>

      {/* Remote Services */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Service Location</h4>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.location?.remote === true}
            onChange={(e) => updateFilter('location', {
              ...filters.location,
              remote: e.target.checked ? true : undefined
            })}
            className="rounded border-gray-600 bg-black/50 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-300">Remote services available</span>
        </label>
      </div>

      {/* Sort Options */}
      <div>
        <h4 className="text-sm font-medium text-gray-300 mb-3">Sort By</h4>
        <select
          value={filters.sortBy || 'rating'}
          onChange={(e) => updateFilter('sortBy', e.target.value as ProviderFilter['sortBy'])}
          className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-white/20"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => updateFilter('sortOrder', 'asc')}
            className={`flex-1 px-3 py-1 rounded text-sm transition-colors ${
              filters.sortOrder === 'asc'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                : 'bg-white/5 text-gray-400 border border-white/10'
            }`}
          >
            Ascending
          </button>
          <button
            onClick={() => updateFilter('sortOrder', 'desc')}
            className={`flex-1 px-3 py-1 rounded text-sm transition-colors ${
              filters.sortOrder === 'desc'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/50'
                : 'bg-white/5 text-gray-400 border border-white/10'
            }`}
          >
            Descending
          </button>
        </div>
      </div>
    </div>
  );
};
