'use client';

import React from 'react';
import { ServiceProvider } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

interface ProviderDetailModalProps {
  provider: ServiceProvider | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProviderDetailModal: React.FC<ProviderDetailModalProps> = ({ provider, isOpen, onClose }) => {
  if (!provider) return null;

  const getVerificationBadge = () => {
    switch (provider.verification.status) {
      case 'certified':
        return <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full">✓ Certified Provider</span>;
      case 'verified':
        return <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">✓ Verified Provider</span>;
      case 'pending':
        return <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full">⏳ Verification Pending</span>;
      default:
        return <span className="px-3 py-1 bg-gray-500/20 text-gray-300 rounded-full">Unverified</span>;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-black/90 backdrop-blur-md border border-white/20 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto">
              <div className="p-8">
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">{provider.name}</h2>
                    <div className="flex items-center gap-3">
                      {getVerificationBadge()}
                      {provider.metadata.featured && (
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full">⭐ Featured</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-white transition-colors text-2xl"
                  >
                    ✕
                  </button>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-lg mb-8">{provider.description}</p>

                {/* Main Info Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Services */}
                    <div>
                      <h3 className="text-white font-semibold mb-3">Services Offered</h3>
                      <ul className="space-y-2">
                        {provider.services.map((service, idx) => (
                          <li key={idx} className="text-gray-300 flex items-start gap-2">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specializations */}
                    <div>
                      <h3 className="text-white font-semibold mb-3">Specializations</h3>
                      <div className="flex flex-wrap gap-2">
                        {provider.specializations.map(spec => (
                          <span key={spec} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Experience */}
                    <div>
                      <h3 className="text-white font-semibold mb-3">Experience</h3>
                      <div className="space-y-2 text-gray-300">
                        <p>{provider.experience.yearsInService} years in service</p>
                        {provider.experience.casesHandled && (
                          <p>{provider.experience.casesHandled}+ cases handled</p>
                        )}
                        {provider.experience.successRate && (
                          <p>{provider.experience.successRate}% success rate</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    {/* Contact Information */}
                    <div>
                      <h3 className="text-white font-semibold mb-3">Contact Information</h3>
                      <div className="space-y-2 text-gray-300">
                        {provider.contact.phone && (
                          <p className="flex items-center gap-2">
                            <span className="text-gray-500">📞</span>
                            {provider.contact.phone}
                          </p>
                        )}
                        {provider.contact.email && (
                          <p className="flex items-center gap-2">
                            <span className="text-gray-500">✉️</span>
                            {provider.contact.email}
                          </p>
                        )}
                        {provider.contact.website && (
                          <p className="flex items-center gap-2">
                            <span className="text-gray-500">🌐</span>
                            <a href={provider.contact.website} target="_blank" rel="noopener noreferrer" 
                               className="text-blue-400 hover:underline">
                              {provider.contact.website}
                            </a>
                          </p>
                        )}
                        {provider.contact.address && (
                          <p className="flex items-center gap-2">
                            <span className="text-gray-500">📍</span>
                            {provider.contact.address}
                          </p>
                        )}
                        {provider.contact.emergencyContact && (
                          <p className="flex items-center gap-2 text-red-400">
                            <span>🚨</span>
                            Emergency: {provider.contact.emergencyContact}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Availability & Coverage */}
                    <div>
                      <h3 className="text-white font-semibold mb-3">Availability & Coverage</h3>
                      <div className="space-y-2 text-gray-300">
                        <p className="flex items-center gap-2">
                          <span className="text-gray-500">🕐</span>
                          {provider.availability}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="text-gray-500">🗣️</span>
                          Languages: {provider.languages.join(', ')}
                        </p>
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500 mt-1">📍</span>
                          <div>
                            <p>Service Areas: {provider.coverage.areas.join(', ')}</p>
                            <div className="flex gap-3 mt-1 text-sm">
                              {provider.coverage.remote && <span className="text-green-400">✓ Remote</span>}
                              {provider.coverage.onsite && <span className="text-green-400">✓ On-site</span>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div>
                      <h3 className="text-white font-semibold mb-3">Pricing</h3>
                      <div className="space-y-2 text-gray-300">
                        <p className="capitalize">{provider.pricing.type.replace('-', ' ')}</p>
                        {provider.pricing.details && (
                          <p className="text-sm">{provider.pricing.details}</p>
                        )}
                        {provider.pricing.acceptsInsurance && (
                          <div>
                            <p className="text-green-400">✓ Insurance Accepted</p>
                            {provider.pricing.insuranceTypes && (
                              <p className="text-sm mt-1">
                                Types: {provider.pricing.insuranceTypes.join(', ')}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ratings */}
                <div className="border-t border-white/10 pt-6 mb-6">
                  <h3 className="text-white font-semibold mb-4">Ratings & Reviews</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400">{provider.ratings.overall.toFixed(1)}</div>
                      <div className="text-sm text-gray-400">Overall Rating</div>
                      <div className="text-xs text-gray-500">({provider.ratings.totalReviews} reviews)</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-white">{provider.ratings.responsiveness.toFixed(1)}</div>
                      <div className="text-sm text-gray-400">Responsiveness</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-white">{provider.ratings.professionalism.toFixed(1)}</div>
                      <div className="text-sm text-gray-400">Professionalism</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-semibold text-white">{provider.ratings.effectiveness.toFixed(1)}</div>
                      <div className="text-sm text-gray-400">Effectiveness</div>
                    </div>
                  </div>
                </div>

                {/* Verification Details */}
                {provider.verification.status !== 'unverified' && (
                  <div className="border-t border-white/10 pt-6 mb-6">
                    <h3 className="text-white font-semibold mb-4">Verification Details</h3>
                    <div className="space-y-2 text-gray-300">
                      {provider.verification.verifiedAt && (
                        <p>Verified on: {format(new Date(provider.verification.verifiedAt), 'PPP')}</p>
                      )}
                      {provider.verification.verifiedBy && (
                        <p>Verified by: {provider.verification.verifiedBy}</p>
                      )}
                      {provider.verification.credentials && provider.verification.credentials.length > 0 && (
                        <div>
                          <p className="mb-2">Credentials:</p>
                          <ul className="list-disc list-inside pl-4">
                            {provider.verification.credentials.map((cred, idx) => (
                              <li key={idx}>{cred}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {provider.verification.licenses && provider.verification.licenses.length > 0 && (
                        <div>
                          <p className="mb-2">Licenses:</p>
                          <ul className="list-disc list-inside pl-4">
                            {provider.verification.licenses.map((license, idx) => (
                              <li key={idx}>
                                {license.type} - {license.number}
                                {license.expiresAt && (
                                  <span className="text-gray-500 text-sm">
                                    {' '}(Expires: {format(new Date(license.expiresAt), 'PP')})
                                  </span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                    Contact Provider
                  </button>
                  <button className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                    Save to Favorites
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
