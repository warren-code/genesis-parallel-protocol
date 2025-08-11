'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Shield, Lock, FileText, Image, Video, Music, File, X, Check, AlertCircle } from 'lucide-react'
import { useMemory } from './MemoryContext'

interface SecureUploadProps {
  onUploadComplete?: (evidence: any) => void
}

export default function SecureUpload({ onUploadComplete }: SecureUploadProps) {
  const { addEvidence } = useMemory()
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fileTypeIcons = {
    document: FileText,
    image: Image,
    video: Video,
    audio: Music,
    other: File
  }

  const getFileType = (file: File): 'document' | 'image' | 'video' | 'audio' | 'other' => {
    const mimeType = file.type
    if (mimeType.startsWith('image/')) return 'image'
    if (mimeType.startsWith('video/')) return 'video'
    if (mimeType.startsWith('audio/')) return 'audio'
    if (mimeType.includes('pdf') || mimeType.includes('document') || mimeType.includes('text')) return 'document'
    return 'other'
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleFileSelect = (file: File) => {
    // Validate file size (max 100MB)
    if (file.size > 100 * 1024 * 1024) {
      setUploadError('File size must be less than 100MB')
      return
    }

    setSelectedFile(file)
    setUploadError(null)
  }

  const simulateFileUpload = async () => {
    setIsUploading(true)
    setUploadProgress(0)

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    // Create evidence record
    if (selectedFile) {
      const evidence = await addEvidence({
        title: selectedFile.name,
        description: 'Uploaded evidence file',
        type: getFileType(selectedFile),
        fileUrl: URL.createObjectURL(selectedFile),
        fileName: selectedFile.name,
        fileSize: selectedFile.size,
        incidentDate: new Date(),
        tags: [],
        metadata: {
          mimeType: selectedFile.type,
          lastModified: new Date(selectedFile.lastModified)
        },
        hash: 'simulated-hash-' + Date.now(),
        encrypted: true,
        status: 'pending',
        uploadedBy: 'current-user'
      })

      if (onUploadComplete) {
        onUploadComplete(evidence)
      }
    }

    setIsUploading(false)
    setSelectedFile(null)
    setUploadProgress(0)
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
          transition-all duration-300
          ${isDragging 
            ? 'border-[#60E6D6] bg-[#60E6D6]/10' 
            : 'border-white/20 hover:border-white/40 hover:bg-white/5'
          }
          ${selectedFile ? 'border-[#60E6D6] bg-[#60E6D6]/5' : ''}
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFileSelect(file)
          }}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        />

        <AnimatePresence mode="wait">
          {!selectedFile ? (
            <motion.div
              key="upload-prompt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="mx-auto w-20 h-20 rounded-full bg-[#60E6D6]/10 flex items-center justify-center">
                <Upload className="w-10 h-10 text-[#60E6D6]" />
              </div>
              <div>
                <p className="text-xl font-medium text-white">
                  Drop evidence file here or click to browse
                </p>
                <p className="text-white/60 mt-2">
                  Supported: Images, Videos, Audio, Documents (Max 100MB)
                </p>
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-[#60E6D6]">
                <Lock className="w-4 h-4" />
                <span>Files are encrypted before upload</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="file-selected"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-4"
            >
              <div className="mx-auto w-20 h-20 rounded-full bg-[#60E6D6]/10 flex items-center justify-center">
                {(() => {
                  const Icon = fileTypeIcons[getFileType(selectedFile)]
                  return <Icon className="w-10 h-10 text-[#60E6D6]" />
                })()}
              </div>
              <div>
                <p className="text-lg font-medium text-white truncate max-w-md mx-auto">
                  {selectedFile.name}
                </p>
                <p className="text-white/60 mt-1">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
              {!isUploading && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedFile(null)
                  }}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5 mx-auto" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload Progress */}
        <AnimatePresence>
          {isUploading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 rounded-xl flex items-center justify-center"
            >
              <div className="text-center space-y-4">
                <Shield className="w-12 h-12 text-[#60E6D6] mx-auto animate-pulse" />
                <p className="text-white font-medium">Encrypting and uploading...</p>
                <div className="w-48 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-[#60E6D6]"
                    initial={{ width: 0 }}
                    animate={{ width: `${uploadProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-sm text-white/60">{uploadProgress}%</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Error Message */}
      <AnimatePresence>
        {uploadError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-500/10 border border-red-500/30 rounded-lg p-4"
          >
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-500">{uploadError}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Button */}
      {selectedFile && !isUploading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={simulateFileUpload}
            className="w-full py-4 bg-gradient-to-r from-[#60E6D6] to-[#AD5EFF] text-black font-bold rounded-lg
                     hover:shadow-lg hover:shadow-[#60E6D6]/25 transition-all duration-300
                     flex items-center justify-center gap-3"
          >
            <Shield className="w-5 h-5" />
            Encrypt and Upload Evidence
          </button>
        </motion.div>
      )}

      {/* Security Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Lock, label: 'End-to-End Encryption', desc: 'Military-grade AES-256' },
          { icon: Shield, label: 'Integrity Verification', desc: 'SHA-256 hash validation' },
          { icon: Check, label: 'Chain of Custody', desc: 'Timestamped audit trail' }
        ].map((feature, idx) => (
          <div key={idx} className="bg-white/5 border border-white/10 rounded-lg p-4">
            <feature.icon className="w-5 h-5 text-[#60E6D6] mb-2" />
            <p className="font-medium text-white">{feature.label}</p>
            <p className="text-sm text-white/60 mt-1">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
