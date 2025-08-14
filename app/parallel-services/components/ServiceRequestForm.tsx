'use client';

import React, { useState } from 'react';
import { ServiceCategory, ServiceRequest } from '../types';
import { categoryTaxonomy } from '../data/categoryTaxonomy';
import { motion } from 'framer-motion';

interface ServiceRequestFormProps {
  onSubmit: (request: Partial<ServiceRequest>) => void;
  onCancel: () => void;
}

export const ServiceRequestForm: React.FC<ServiceRequestFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<Partial<ServiceRequest>>({
    category: 'legal' as ServiceCategory,
    subcategories: [],
    description: '',
    urgency: 'standard',
    preferredLanguages: ['English'],
    specialRequirements: [],
    budget: {
      type: 'negotiable'
    },
    location: {
      area: '',
      remote: false
    }
  });

  const selectedCategory = categoryTaxonomy.find(cat => cat.id === formData.category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const toggleSubcategory = (subcategoryId: string) => {
    setFormData(prev => ({
      ...prev,
      subcategories: prev.subcategories?.includes(subcategoryId)
        ? prev.subcategories.filter(id => id !== subcategoryId)
        : [...(prev.subcategories || []), subcategoryId]
    }));
  };

  const toggleLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      preferredLanguages: prev.preferredLanguages?.includes(language)
        ? prev.preferredLanguages.filter(lang => lang !== language)
        : [...(prev.preferredLanguages || []), language]
    }));
  };

  const addSpecialRequirement = (requirement: string) => {
    if (requirement.trim()) {
      setFormData(prev => ({
        ...prev,
        specialRequirements: [...(prev.specialRequirements || []), requirement.trim()]
      }));
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg p-8 max-w-2xl mx-auto"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Request Service</h2>

      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Service Category *
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value as ServiceCategory, subcategories: [] })}
          className="w-full bg-black/50 border border-white/10 rounded px-4 py-2 text-white focus:border-white/20"
          required
        >
          {categoryTaxonomy.map(category => (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategories */}
      {selectedCategory && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Specific Services
          </label>
          <div className="grid grid-cols-2 gap-2">
            {selectedCategory.subcategories.map(sub => (
              <label key={sub.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.subcategories?.includes(sub.id) || false}
                  onChange={() => toggleSubcategory(sub.id)}
                  className="rounded border-gray-600 bg-black/50 text-blue-500 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-300">{sub.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Description */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full bg-black/50 border border-white/10 rounded px-4 py-2 text-white focus:border-white/20 h-32"
          placeholder="Describe your service needs in detail..."
          required
        />
      </div>

      {/* Urgency */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Urgency Level *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { value: 'immediate', label: 'Immediate', icon: '🚨' },
            { value: 'urgent', label: 'Urgent', icon: '⚡' },
            { value: 'standard', label: 'Standard', icon: '📅' },
            { value: 'flexible', label: 'Flexible', icon: '🕐' }
          ].map(option => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFormData({ ...formData, urgency: option.value as any })}
              className={`p-3 rounded border transition-colors ${
                formData.urgency === option.value
                  ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20'
              }`}
            >
              <div className="text-2xl mb-1">{option.icon}</div>
              <div className="text-sm">{option.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Location & Availability
        </label>
        <input
          type="text"
          value={formData.location?.area || ''}
          onChange={(e) => setFormData({
            ...formData,
            location: { ...formData.location!, area: e.target.value }
          })}
          className="w-full bg-black/50 border border-white/10 rounded px-4 py-2 text-white focus:border-white/20 mb-2"
          placeholder="Your area or city"
        />
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.location?.remote || false}
            onChange={(e) => setFormData({
              ...formData,
              location: { ...formData.location!, remote: e.target.checked }
            })}
            className="rounded border-gray-600 bg-black/50 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-300">I'm open to remote services</span>
        </label>
      </div>

      {/* Languages */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Preferred Languages
        </label>
        <div className="flex flex-wrap gap-2">
          {['English', 'Spanish', 'Mandarin', 'French', 'Arabic', 'ASL'].map(lang => (
            <button
              key={lang}
              type="button"
              onClick={() => toggleLanguage(lang)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                formData.preferredLanguages?.includes(lang)
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-500'
                  : 'bg-white/10 text-gray-300 border border-white/10 hover:border-white/20'
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Budget */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Budget Information
        </label>
        <div className="grid grid-cols-3 gap-2 mb-2">
          {['hourly', 'fixed', 'negotiable'].map(type => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData({
                ...formData,
                budget: { ...formData.budget!, type: type as any }
              })}
              className={`p-2 rounded border text-sm transition-colors ${
                formData.budget?.type === type
                  ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:border-white/20'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
        {formData.budget?.type !== 'negotiable' && (
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              value={formData.budget?.min || ''}
              onChange={(e) => setFormData({
                ...formData,
                budget: { ...formData.budget!, min: parseFloat(e.target.value) || undefined }
              })}
              className="bg-black/50 border border-white/10 rounded px-4 py-2 text-white focus:border-white/20"
              placeholder="Min budget"
            />
            <input
              type="number"
              value={formData.budget?.max || ''}
              onChange={(e) => setFormData({
                ...formData,
                budget: { ...formData.budget!, max: parseFloat(e.target.value) || undefined }
              })}
              className="bg-black/50 border border-white/10 rounded px-4 py-2 text-white focus:border-white/20"
              placeholder="Max budget"
            />
          </div>
        )}
      </div>

      {/* Special Requirements */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Special Requirements
        </label>
        <div className="space-y-2">
          {formData.specialRequirements?.map((req, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <span className="flex-1 bg-white/10 rounded px-3 py-1 text-sm text-gray-300">
                {req}
              </span>
              <button
                type="button"
                onClick={() => setFormData({
                  ...formData,
                  specialRequirements: formData.specialRequirements?.filter((_, i) => i !== idx)
                })}
                className="text-red-400 hover:text-red-300"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Add a requirement and press Enter"
          className="w-full bg-black/50 border border-white/10 rounded px-4 py-2 text-white focus:border-white/20 mt-2"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSpecialRequirement((e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = '';
            }
          }}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-8">
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Submit Request
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </motion.form>
  );
};
