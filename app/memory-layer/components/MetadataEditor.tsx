'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Tags, Calendar, MapPin, Users, FileText, Save, Plus } from 'lucide-react'
import { useMemory } from './MemoryContext'

interface MetadataEditorProps {
  evidence: any
  onClose: () => void
  onSave: (updatedEvidence: any) => void
}

export default function MetadataEditor({ evidence, onClose, onSave }: MetadataEditorProps) {
  const { updateEvidence } = useMemory()
  const [formData, setFormData] = useState({
    title: evidence.title,
    description: evidence.description,
    location: evidence.location || '',
    tags: evidence.tags || [],
    witnesses: evidence.metadata?.witnesses || '',
    notes: evidence.metadata?.notes || '',
    incidentDate: evidence.incidentDate ? new Date(evidence.incidentDate).toISOString().split('T')[0] : ''
  })
  const [newTag, setNewTag] = useState('')

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((tag: string) => tag !== tagToRemove)
    }))
  }

  const handleSave = async () => {
    const updatedEvidence = {
      ...evidence,
      title: formData.title,
      description: formData.description,
      location: formData.location,
      tags: formData.tags,
      incidentDate: formData.incidentDate ? new Date(formData.incidentDate) : evidence.incidentDate,
      metadata: {
        ...evidence.metadata,
        witnesses: formData.witnesses,
        notes: formData.notes
      }
    }

    await updateEvidence(evidence.id, updatedEvidence)
    onSave(updatedEvidence)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-black/90 border border-white/20 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-black/90 backdrop-blur-sm border-b border-white/10 p-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Edit Evidence Metadata</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white/60" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                <FileText className="w-4 h-4 text-[#60E6D6]" />
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg
                         text-white placeholder-white/40
                         focus:border-[#60E6D6] focus:bg-white/10 focus:outline-none
                         transition-all duration-300"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                <FileText className="w-4 h-4 text-[#60E6D6]" />
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg
                         text-white placeholder-white/40
                         focus:border-[#60E6D6] focus:bg-white/10 focus:outline-none
                         transition-all duration-300 resize-none"
              />
            </div>

            {/* Date and Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                  <Calendar className="w-4 h-4 text-[#60E6D6]" />
                  Incident Date
                </label>
                <input
                  type="date"
                  value={formData.incidentDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, incidentDate: e.target.value }))}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg
                           text-white placeholder-white/40
                           focus:border-[#60E6D6] focus:bg-white/10 focus:outline-none
                           transition-all duration-300"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                  <MapPin className="w-4 h-4 text-[#60E6D6]" />
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Enter location"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg
                           text-white placeholder-white/40
                           focus:border-[#60E6D6] focus:bg-white/10 focus:outline-none
                           transition-all duration-300"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                <Tags className="w-4 h-4 text-[#60E6D6]" />
                Tags
              </label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                    placeholder="Add a tag"
                    className="flex-1 px-4 py-2 bg-white/5 border border-white/20 rounded-lg
                             text-white placeholder-white/40
                             focus:border-[#60E6D6] focus:bg-white/10 focus:outline-none
                             transition-all duration-300"
                  />
                  <button
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-[#60E6D6] text-black font-medium rounded-lg
                             hover:bg-[#60E6D6]/80 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/10 rounded-full text-sm text-white
                               flex items-center gap-2 group"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="text-white/60 hover:text-white transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Witnesses */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                <Users className="w-4 h-4 text-[#60E6D6]" />
                Witnesses
              </label>
              <input
                type="text"
                value={formData.witnesses}
                onChange={(e) => setFormData(prev => ({ ...prev, witnesses: e.target.value }))}
                placeholder="Names of witnesses (comma separated)"
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg
                         text-white placeholder-white/40
                         focus:border-[#60E6D6] focus:bg-white/10 focus:outline-none
                         transition-all duration-300"
              />
            </div>

            {/* Additional Notes */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                <FileText className="w-4 h-4 text-[#60E6D6]" />
                Additional Notes
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows={4}
                placeholder="Any additional information..."
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg
                         text-white placeholder-white/40
                         focus:border-[#60E6D6] focus:bg-white/10 focus:outline-none
                         transition-all duration-300 resize-none"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-black/90 backdrop-blur-sm border-t border-white/10 p-6 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 py-3 bg-white/5 text-white font-medium rounded-lg
                       hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-3 bg-gradient-to-r from-[#60E6D6] to-[#AD5EFF] text-black font-bold rounded-lg
                       hover:shadow-lg hover:shadow-[#60E6D6]/25 transition-all duration-300
                       flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Changes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
