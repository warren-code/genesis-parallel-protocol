'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createClient } from '@supabase/supabase-js'

interface Evidence {
  id: string
  title: string
  description: string
  type: 'document' | 'image' | 'video' | 'audio' | 'other'
  fileUrl: string
  fileName: string
  fileSize: number
  uploadedAt: Date
  incidentDate: Date
  location?: string
  tags: string[]
  metadata: Record<string, any>
  hash: string
  encrypted: boolean
  status: 'pending' | 'verified' | 'archived'
  uploadedBy: string
  lastModified: Date
}

interface MemoryContextType {
  evidence: Evidence[]
  addEvidence: (evidence: Omit<Evidence, 'id' | 'uploadedAt' | 'lastModified'>) => Promise<Evidence>
  updateEvidence: (id: string, updates: Partial<Evidence>) => Promise<void>
  deleteEvidence: (id: string) => Promise<void>
  getEvidenceById: (id: string) => Evidence | undefined
  searchEvidence: (query: string) => Evidence[]
  filterByTags: (tags: string[]) => Evidence[]
  filterByDateRange: (startDate: Date, endDate: Date) => Evidence[]
  isLoading: boolean
  error: string | null
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined)

export function MemoryProvider({ children }: { children: ReactNode }) {
  const [evidence, setEvidence] = useState<Evidence[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize with sample data for development
  useEffect(() => {
    // In production, this would fetch from Supabase
    const sampleEvidence: Evidence[] = [
      {
        id: '1',
        title: 'Incident Report - March 2024',
        description: 'Documentation of peaceful protest incident',
        type: 'document',
        fileUrl: '/sample-evidence/report1.pdf',
        fileName: 'incident_report_march_2024.pdf',
        fileSize: 2048576,
        uploadedAt: new Date('2024-03-15T14:30:00'),
        incidentDate: new Date('2024-03-10T10:00:00'),
        location: 'Downtown Plaza',
        tags: ['protest', 'peaceful', 'documentation'],
        metadata: {
          witnesses: 5,
          duration: '2 hours',
          outcome: 'resolved peacefully'
        },
        hash: 'abc123def456',
        encrypted: true,
        status: 'verified',
        uploadedBy: 'user123',
        lastModified: new Date('2024-03-15T14:30:00')
      }
    ]
    
    setEvidence(sampleEvidence)
    setIsLoading(false)
  }, [])

  const addEvidence = async (newEvidence: Omit<Evidence, 'id' | 'uploadedAt' | 'lastModified'>): Promise<Evidence> => {
    try {
      const evidence: Evidence = {
        ...newEvidence,
        id: Date.now().toString(),
        uploadedAt: new Date(),
        lastModified: new Date()
      }
      
      setEvidence(prev => [...prev, evidence])
      return evidence
    } catch (err) {
      setError('Failed to add evidence')
      throw err
    }
  }

  const updateEvidence = async (id: string, updates: Partial<Evidence>) => {
    try {
      setEvidence(prev => prev.map(item => 
        item.id === id 
          ? { ...item, ...updates, lastModified: new Date() }
          : item
      ))
    } catch (err) {
      setError('Failed to update evidence')
      throw err
    }
  }

  const deleteEvidence = async (id: string) => {
    try {
      setEvidence(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      setError('Failed to delete evidence')
      throw err
    }
  }

  const getEvidenceById = (id: string) => {
    return evidence.find(item => item.id === id)
  }

  const searchEvidence = (query: string) => {
    const lowerQuery = query.toLowerCase()
    return evidence.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }

  const filterByTags = (tags: string[]) => {
    if (tags.length === 0) return evidence
    return evidence.filter(item =>
      tags.some(tag => item.tags.includes(tag))
    )
  }

  const filterByDateRange = (startDate: Date, endDate: Date) => {
    return evidence.filter(item => 
      item.incidentDate >= startDate && item.incidentDate <= endDate
    )
  }

  return (
    <MemoryContext.Provider value={{
      evidence,
      addEvidence,
      updateEvidence,
      deleteEvidence,
      getEvidenceById,
      searchEvidence,
      filterByTags,
      filterByDateRange,
      isLoading,
      error
    }}>
      {children}
    </MemoryContext.Provider>
  )
}

export function useMemory() {
  const context = useContext(MemoryContext)
  if (!context) {
    throw new Error('useMemory must be used within a MemoryProvider')
  }
  return context
}
