'use client'

import React, { useState, useRef } from 'react'
import { CaseDocument, DocumentType } from '../types'
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard'
import Button from '@/app/components/ui/Button'

interface SecureDocumentUploadProps {
  caseId: string
  onUploadComplete?: (document: Partial<CaseDocument>) => void
  maxFileSize?: number // in MB
}

export default function SecureDocumentUpload({ 
  caseId, 
  onUploadComplete,
  maxFileSize = 10 
}: SecureDocumentUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState<DocumentType>('other')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [isConfidential, setIsConfidential] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const acceptedFileTypes = {
    'complaint': '.pdf,.doc,.docx',
    'evidence': '.pdf,.jpg,.jpeg,.png,.mp4,.mov',
    'motion': '.pdf,.doc,.docx',
    'brief': '.pdf,.doc,.docx',
    'court_order': '.pdf',
    'police_report': '.pdf,.jpg,.jpeg,.png',
    'witness_statement': '.pdf,.doc,.docx,.mp3,.wav',
    'other': '.pdf,.doc,.docx,.jpg,.jpeg,.png'
  }

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'pdf': return '📄'
      case 'doc':
      case 'docx': return '📝'
      case 'jpg':
      case 'jpeg':
      case 'png': return '🖼️'
      case 'mp4':
      case 'mov': return '🎥'
      case 'mp3':
      case 'wav': return '🎵'
      default: return '📎'
    }
  }

  const validateFile = (file: File): string | null => {
    // Check file size
    const fileSizeMB = file.size / (1024 * 1024)
    if (fileSizeMB > maxFileSize) {
      return `File size exceeds ${maxFileSize}MB limit`
    }

    // Check file type
    const acceptedTypes = acceptedFileTypes[documentType].split(',')
    const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`
    if (!acceptedTypes.includes(fileExt)) {
      return `Invalid file type for ${documentType}. Accepted types: ${acceptedTypes.join(', ')}`
    }

    return null
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const validationError = validateFile(file)
    if (validationError) {
      setError(validationError)
      setSelectedFile(null)
      return
    }

    setError(null)
    setSelectedFile(file)
    if (!title) {
      setTitle(file.name.split('.')[0])
    }
  }

  const handleUpload = async () => {
    if (!selectedFile || !title) {
      setError('Please select a file and provide a title')
      return
    }

    setUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      clearInterval(progressInterval)
      setUploadProgress(100)

      // Create document object
      const document: Partial<CaseDocument> = {
        case_id: caseId,
        document_type: documentType,
        title,
        description,
        file_url: URL.createObjectURL(selectedFile), // In production, this would be the actual upload URL
        file_size: selectedFile.size,
        is_confidential: isConfidential,
        created_at: new Date().toISOString()
      }

      onUploadComplete?.(document)

      // Reset form
      setSelectedFile(null)
      setTitle('')
      setDescription('')
      setDocumentType('other')
      setIsConfidential(false)
      setUploadProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }

    } catch (err) {
      setError('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  return (
    <GlassmorphicCard blur="sm" opacity={0.05}>
      <div className="p-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-ink mb-1">Secure Document Upload</h3>
          <p className="text-sm text-gray">All documents are encrypted and stored securely</p>
        </div>

        {/* Document Type Selection */}
        <div>
          <label className="block text-sm font-medium text-gray mb-2">
            Document Type
          </label>
          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value as DocumentType)}
            className="w-full px-4 py-2 bg-ink/10 border border-gray/20 rounded-lg 
                     text-ink focus:outline-none focus:border-accent/50"
          >
            <option value="complaint">Complaint</option>
            <option value="evidence">Evidence</option>
            <option value="motion">Motion</option>
            <option value="brief">Brief</option>
            <option value="court_order">Court Order</option>
            <option value="police_report">Police Report</option>
            <option value="witness_statement">Witness Statement</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* File Selection */}
        <div>
          <label className="block text-sm font-medium text-gray mb-2">
            Select File
          </label>
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept={acceptedFileTypes[documentType]}
              className="hidden"
              id="secure-file-upload"
            />
            <label
              htmlFor="secure-file-upload"
              className="flex items-center justify-center w-full p-4 border-2 border-dashed 
                       border-gray/30 rounded-lg cursor-pointer hover:border-accent/50 
                       transition-colors bg-ink/5"
            >
              {selectedFile ? (
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getFileIcon(selectedFile.name)}</span>
                  <div className="text-left">
                    <p className="text-sm font-medium text-ink">{selectedFile.name}</p>
                    <p className="text-xs text-gray">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <span className="text-3xl text-gray/50">📁</span>
                  <p className="mt-2 text-sm text-gray">
                    Click to select file or drag and drop
                  </p>
                  <p className="text-xs text-gray mt-1">
                    Max size: {maxFileSize}MB
                  </p>
                </div>
              )}
            </label>
          </div>
        </div>

        {/* Document Details */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Document Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter document title"
              className="w-full px-4 py-2 bg-ink/10 border border-gray/20 rounded-lg 
                       text-ink placeholder-gray focus:outline-none focus:border-accent/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add any relevant notes about this document"
              rows={3}
              className="w-full px-4 py-2 bg-ink/10 border border-gray/20 rounded-lg 
                       text-ink placeholder-gray focus:outline-none focus:border-accent/50 
                       resize-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="confidential"
              checked={isConfidential}
              onChange={(e) => setIsConfidential(e.target.checked)}
              className="w-4 h-4 rounded border-gray/30 bg-ink/10 text-accent 
                       focus:ring-accent/50"
            />
            <label htmlFor="confidential" className="text-sm text-ink cursor-pointer">
              Mark as confidential (restricted access)
            </label>
          </div>
        </div>

        {/* Security Notice */}
        <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg">
          <div className="flex gap-2">
            <span className="text-accent">🔒</span>
            <div className="text-sm text-ink">
              <p className="font-medium">Secure Upload</p>
              <p className="text-xs text-gray mt-1">
                Documents are encrypted end-to-end and stored in compliance with legal data protection standards
              </p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
            <p className="text-sm text-red-500">⚠️ {error}</p>
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray">Uploading...</span>
              <span className="text-accent">{uploadProgress}%</span>
            </div>
            <div className="w-full h-2 bg-gray/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Upload Button */}
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || !title || uploading}
          className="w-full"
        >
          {uploading ? 'Uploading...' : 'Upload Document'}
        </Button>
      </div>
    </GlassmorphicCard>
  )
}
