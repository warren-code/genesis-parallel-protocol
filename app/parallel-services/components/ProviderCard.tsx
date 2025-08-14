'use client';

import React from 'react';
import { ServiceProvider } from '../types';
import { motion } from 'framer-motion';

interface ProviderCardProps {
  provider: ServiceProvider;
  onSelect?: (provider: ServiceProvider) => void;
}

export const ProviderCard: React.FC<ProviderCardProps> = ({ provider, onSelect }) => {
  const getVerificationBadge = () => {
    switch (provider.verification.status) {
      case 'certified':
        return <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">✓ Certified</span>;
      case 'verified':
        return <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">✓ Verified</span>;
      case 'pending':
        return <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">⏳ Pending</span>;
      default:
        return null;
    }
  };

  const getPricingDisplay = () => {
    switch (provider.pricing.type) {
      case 'free':
        return <span className="text-green-400 font-semibold">Free</span>;
      case 'pro-bono':
        return <span className="text-green-400 font-semibold">Pro Bono</span>;
      case 'sliding-scale':
        return <span className="text-blue-400">Sliding Scale</span>;
      case 'insurance':
        return <span className="text-purple-400">Insurance Accepted</span>;
      default:
        return <span className="text-gray-400">{provider.pricing.type}</span>;
    }
  };

  const getAvailabilityIcon = () => {
    switch (provider.availability) {
      case '24/7':
        return '🔴';
      case 'emergency-only':
        return '🚨';
      case 'on-demand':
        return '📱';
      case 'appointment':
        return '📅';
      default:
        return '🕐';
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all cursor-pointer"
      onClick={() => onSelect?.(provider)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{provider.name}</h3>
          <div className="flex items-center gap-2 mb-2">
            {getVerificationBadge()}
            {provider.metadata.featured && (
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 text-xs rounded-full">⭐ Featured</span>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 text-yellow-400">
            <span className="text-lg">★</span>
            <span className="font-semibold">{provider.ratings.overall.toFixed(1)}</span>
          </div>
          <p className="text-xs text-gray-400">({provider.ratings.totalReviews} reviews)</p>
        </div>
      </div>

      <p className="text-gray-300 text-sm mb-4 line-clamp-2">{provider.description}</p>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Category:</span>
          <span className="text-white">{provider.category}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Availability:</span>
          <span className="text-white flex items-center gap-1">
            {getAvailabilityIcon()} {provider.availability}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Pricing:</span>
          {getPricingDisplay()}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">Languages:</span>
          <div className="flex flex-wrap gap-1">
            {provider.languages.map(lang => (
              <span key={lang} className="px-2 py-1 bg-white/10 text-white text-xs rounded">
                {lang}
              </span>
            ))}
          </div>
        </div>

        {provider.specializations.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {provider.specializations.slice(0, 3).map(spec => (
              <span key={spec} className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded">
                {spec}
              </span>
            ))}
            {provider.specializations.length > 3 && (
              <span className="px-2 py-1 text-gray-400 text-xs">
                +{provider.specializations.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-gray-400">
          <span>{provider.experience.yearsInService} years exp.</span>
          {provider.coverage.remote && <span>📡 Remote</span>}
          {provider.coverage.onsite && <span>📍 On-site</span>}
        </div>
        {provider.contact.emergencyContact && (
          <span className="text-red-400 text-xs">🚨 Emergency available</span>
        )}
      </div>
    </motion.div>
  );
};
