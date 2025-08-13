'use client'

import { motion } from 'framer-motion'
import { FileText, Image, Video, Music, Eye, Download, Share2, MoreVertical, Lock, Calendar, MapPin } from 'lucide-react'
import { useMemory } from './MemoryContext'
import { format } from 'date-fns'

interface EvidenceGridProps {
  onSelectEvidence?: (evidence: any) => void
}

export default function EvidenceGrid({ onSelectEvidence }: EvidenceGridProps) {
  const { evidence } = useMemory()

  const fileTypeIcons: Record<string, any> = {
    document: FileText,
    image: Image,
    video: Video,
    audio: Music,
    other: FileText
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {evidence.map((item, idx) => {
        const Icon = fileTypeIcons[item.type] || FileText
        
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => onSelectEvidence?.(item)}
            className="group relative bg-white/5 border border-white/10 rounded-xl overflow-hidden
                     hover:border-[#60E6D6]/30 hover:bg-[#60E6D6]/5 
                     transition-all duration-300 cursor-pointer"
          >
            {/* Preview Area */}
            <div className="aspect-video bg-black/50 relative overflow-hidden">
              {/* File Type Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Icon className="w-16 h-16 text-white/20" />
              </div>

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100
                            transition-opacity duration-300 flex items-center justify-center gap-4">
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <Eye className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <Download className="w-5 h-5 text-white" />
                </button>
                <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <Share2 className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <div className={`
                  px-2 py-1 rounded text-xs font-medium backdrop-blur-sm
                  ${item.status === 'verified' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : ''}
                  ${item.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : ''}
                  ${item.status === 'archived' ? 'bg-gray-500/20 text-gray-400 border border-gray-500/30' : ''}
                `}>
                  {item.status}
                </div>
              </div>

              {/* Encrypted Badge */}
              {item.encrypted && (
                <div className="absolute top-3 left-3">
                  <div className="p-1.5 bg-black/60 backdrop-blur-sm rounded">
                    <Lock className="w-4 h-4 text-[#60E6D6]" />
                  </div>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 space-y-3">
              {/* Title */}
              <h3 className="font-medium text-white group-hover:text-[#60E6D6] transition-colors
                           line-clamp-1">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-white/60 line-clamp-2">
                {item.description}
              </p>

              {/* Metadata */}
              <div className="flex flex-wrap gap-3 text-xs text-white/40">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {format(item.incidentDate, 'MMM d, yyyy')}
                </div>
                {item.location && (
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </div>
                )}
                <div>{formatFileSize(item.fileSize)}</div>
              </div>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {item.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-white/10 rounded text-xs text-white/60">
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="px-2 py-0.5 bg-white/10 rounded text-xs text-white/60">
                      +{item.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Bar */}
            <div className="px-4 py-3 bg-black/30 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white/20" />
                <span className="text-xs text-white/60">
                  {format(item.uploadedAt, 'MMM d, yyyy')}
                </span>
              </div>
              <button className="text-white/40 hover:text-white transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )
      })}

      {/* Empty State */}
      {evidence.length === 0 && (
        <div className="col-span-full text-center py-12">
          <FileText className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <p className="text-white/60">No evidence found matching your criteria</p>
        </div>
      )}
    </div>
  )
}
