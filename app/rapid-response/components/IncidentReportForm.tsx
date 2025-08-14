'use client';

import React, { useState } from 'react';
import { useRapidResponse } from '../context/RapidResponseContext';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import Button from '@/app/components/ui/Button';
import type { IncidentType } from '../types';

const incidentTypes: IncidentType[] = [
  { id: 'community-crisis', name: 'Community Crisis', icon: '🚨', color: 'red', requiredSkills: ['crisis-response', 'first-aid'] },
  { id: 'resource-need', name: 'Resource Need', icon: '📦', color: 'orange', requiredSkills: ['logistics', 'coordination'] },
  { id: 'safety-concern', name: 'Safety Concern', icon: '⚠️', color: 'yellow', requiredSkills: ['security', 'de-escalation'] },
  { id: 'infrastructure', name: 'Infrastructure Issue', icon: '🔧', color: 'blue', requiredSkills: ['technical', 'repair'] },
  { id: 'coordination', name: 'Coordination Request', icon: '🤝', color: 'green', requiredSkills: ['leadership', 'communication'] },
  { id: 'other', name: 'Other', icon: '📋', color: 'gray', requiredSkills: [] },
];

export default function IncidentReportForm({ onClose }: { onClose?: () => void }) {
  const { createIncident, loading } = useRapidResponse();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: incidentTypes[0],
    severity: 'medium' as 'low' | 'medium' | 'high' | 'critical',
    respondersNeeded: 1,
    tags: [] as string[],
    location: {
      region: '',
      district: '',
      gridReference: '',
    },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.location.region.trim()) newErrors.region = 'Region is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await createIncident({
        ...formData,
        location: formData.location.region ? formData.location : undefined,
      });
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        type: incidentTypes[0],
        severity: 'medium',
        respondersNeeded: 1,
        tags: [],
        location: {
          region: '',
          district: '',
          gridReference: '',
        },
      });
      
      onClose?.();
    } catch (error) {
      console.error('Failed to create incident:', error);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag),
    }));
  };

  const requestGeolocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Convert to grid reference (privacy-preserving)
          const gridRef = `${Math.floor(position.coords.latitude * 10) / 10},${Math.floor(position.coords.longitude * 10) / 10}`;
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              gridReference: gridRef,
            },
          }));
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <GlassmorphicCard blur="md" opacity={0.1}>
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-display font-semibold text-ink">Report Incident</h2>
          
          {/* Incident Type */}
          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Incident Type
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {incidentTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.type.id === type.id
                      ? 'border-accent bg-accent/10'
                      : 'border-gray/20 hover:border-gray/40'
                  }`}
                >
                  <div className="text-2xl mb-1">{type.icon}</div>
                  <div className="text-sm font-medium">{type.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, title: e.target.value }));
                setErrors(prev => ({ ...prev, title: '' }));
              }}
              className="w-full px-4 py-2 bg-white/5 border border-gray/20 rounded-lg focus:border-accent focus:outline-none"
              placeholder="Brief description of the incident"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-400">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, description: e.target.value }));
                setErrors(prev => ({ ...prev, description: '' }));
              }}
              rows={4}
              className="w-full px-4 py-2 bg-white/5 border border-gray/20 rounded-lg focus:border-accent focus:outline-none resize-none"
              placeholder="Provide details about the incident..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Severity */}
          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Severity
            </label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high', 'critical'] as const).map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, severity: level }))}
                  className={`px-4 py-2 rounded-lg capitalize transition-all ${
                    formData.severity === level
                      ? level === 'critical' ? 'bg-red-500 text-white' :
                        level === 'high' ? 'bg-orange-500 text-white' :
                        level === 'medium' ? 'bg-yellow-500 text-black' :
                        'bg-green-500 text-white'
                      : 'bg-white/5 border border-gray/20 hover:border-gray/40'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray mb-2">
              Location (Privacy-Preserving)
            </label>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  value={formData.location.region}
                  onChange={(e) => {
                    setFormData(prev => ({
                      ...prev,
                      location: { ...prev.location, region: e.target.value },
                    }));
                    setErrors(prev => ({ ...prev, region: '' }));
                  }}
                  className="w-full px-4 py-2 bg-white/5 border border-gray/20 rounded-lg focus:border-accent focus:outline-none"
                  placeholder="Region *"
                />
                {errors.region && (
                  <p className="mt-1 text-sm text-red-400">{errors.region}</p>
                )}
              </div>
              
              <input
                type="text"
                value={formData.location.district}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  location: { ...prev.location, district: e.target.value },
                }))}
                className="w-full px-4 py-2 bg-white/5 border border-gray/20 rounded-lg focus:border-accent focus:outline-none"
                placeholder="District (optional)"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={requestGeolocation}
                className="px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-lg hover:bg-accent/20 transition-all flex items-center gap-2"
              >
                <span>📍</span>
                Use Approximate Location
              </button>
              {formData.location.gridReference && (
                <span className="text-sm text-gray">
                  Grid: {formData.location.gridReference}
                </span>
              )}
            </div>
          </div>

          {/* Responders Needed */}
          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Responders Needed
            </label>
            <input
              type="number"
              min="1"
              max="50"
              value={formData.respondersNeeded}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                respondersNeeded: Math.max(1, Math.min(50, parseInt(e.target.value) || 1))
              }))}
              className="w-full px-4 py-2 bg-white/5 border border-gray/20 rounded-lg focus:border-accent focus:outline-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Tags
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="flex-1 px-4 py-2 bg-white/5 border border-gray/20 rounded-lg focus:border-accent focus:outline-none"
                placeholder="Add tags..."
              />
              <button
                type="button"
                onClick={addTag}
                className="px-4 py-2 bg-accent/10 text-accent border border-accent/20 rounded-lg hover:bg-accent/20 transition-all"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-red-400 transition-colors"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              variant="primary"
              disabled={loading}
              className="flex-1"
            >
              {loading ? 'Reporting...' : 'Report Incident'}
            </Button>
            {onClose && (
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
            )}
          </div>
        </div>
      </GlassmorphicCard>
    </form>
  );
}
