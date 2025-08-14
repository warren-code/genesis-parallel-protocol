'use client'

import React, { useState } from 'react'
import { LegalCase, CaseDocument, VolunteerAttorney } from '../types'
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard'
import Button from '@/app/components/ui/Button'

interface CaseTrackerProps {
  cases: LegalCase[]
  attorneys: VolunteerAttorney[]
  onSelectCase?: (legalCase: LegalCase) => void
  onUploadDocument?: (caseId: string, file: File) => void
}

export default function CaseTracker({ cases, attorneys, onSelectCase, onUploadDocument }: CaseTrackerProps) {
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterType, setFilterType] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCases = cases.filter(legalCase => {
    const matchesSearch = 
      legalCase.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      legalCase.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      legalCase.case_number?.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || legalCase.status === filterStatus
    const matchesType = filterType === 'all' || legalCase.type === filterType
    
    return matchesSearch && matchesStatus && matchesType
  })

  const getAttorneyName = (attorneyId?: string) => {
    if (!attorneyId) return 'Unassigned'
    const attorney = attorneys.find(a => a.id === attorneyId)
    return attorney?.full_name || 'Unknown'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-500/20 text-blue-500'
      case 'in_progress': return 'bg-yellow-500/20 text-yellow-500'
      case 'closed': return 'bg-signal/20 text-signal'
      case 'appeal': return 'bg-orange-500/20 text-orange-500'
      case 'dismissed': return 'bg-gray/20 text-gray'
      default: return 'bg-gray/20 text-gray'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'protest': return '✊'
      case 'civil_rights': return '⚖️'
      case 'wrongful_arrest': return '🚨'
      case 'police_brutality': return '⛔'
      default: return '📋'
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedCase || !e.target.files?.[0]) return
    onUploadDocument?.(selectedCase.id, e.target.files[0])
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassmorphicCard blur="sm" opacity={0.1}>
          <div className="p-4">
            <div className="text-2xl font-bold text-accent">{cases.length}</div>
            <div className="text-sm text-gray">Total Cases</div>
          </div>
        </GlassmorphicCard>
        
        <GlassmorphicCard blur="sm" opacity={0.1}>
          <div className="p-4">
            <div className="text-2xl font-bold text-yellow-500">
              {cases.filter(c => c.status === 'open' || c.status === 'in_progress').length}
            </div>
            <div className="text-sm text-gray">Active Cases</div>
          </div>
        </GlassmorphicCard>

        <GlassmorphicCard blur="sm" opacity={0.1}>
          <div className="p-4">
            <div className="text-2xl font-bold text-signal">
              {cases.filter(c => c.status === 'closed').length}
            </div>
            <div className="text-sm text-gray">Resolved Cases</div>
          </div>
        </GlassmorphicCard>

        <GlassmorphicCard blur="sm" opacity={0.1}>
          <div className="p-4">
            <div className="text-2xl font-bold text-neural">
              ${cases.reduce((sum, c) => sum + (c.bail_amount || 0), 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray">Total Bail Amount</div>
          </div>
        </GlassmorphicCard>
      </div>

      {/* Search and Filters */}
      <GlassmorphicCard blur="sm" opacity={0.05}>
        <div className="p-4 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search cases by title, client, or case number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 px-4 py-2 bg-ink/10 border border-gray/20 rounded-lg 
                     text-ink placeholder-gray focus:outline-none focus:border-accent/50"
          />

          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-ink/10 border border-gray/20 rounded-lg text-ink 
                       focus:outline-none focus:border-accent/50"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
              <option value="appeal">Appeal</option>
              <option value="dismissed">Dismissed</option>
            </select>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-ink/10 border border-gray/20 rounded-lg text-ink 
                       focus:outline-none focus:border-accent/50"
            >
              <option value="all">All Types</option>
              <option value="protest">Protest</option>
              <option value="civil_rights">Civil Rights</option>
              <option value="wrongful_arrest">Wrongful Arrest</option>
              <option value="police_brutality">Police Brutality</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </GlassmorphicCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredCases.map((legalCase) => (
            <div
              key={legalCase.id}
              onClick={() => {
                setSelectedCase(legalCase)
                onSelectCase?.(legalCase)
              }}
              className="cursor-pointer"
            >
              <GlassmorphicCard 
                blur="sm" 
                opacity={0.05}
                className="hover:border-accent/50 transition-all"
              >
                <div className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{getTypeIcon(legalCase.type)}</span>
                    <div>
                      <h3 className="font-semibold text-ink">{legalCase.title}</h3>
                      <p className="text-sm text-gray">Case #{legalCase.case_number}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(legalCase.status)}`}>
                    {legalCase.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray">Client: </span>
                    <span className="text-ink">{legalCase.client_name}</span>
                  </div>
                  <div>
                    <span className="text-gray">Attorney: </span>
                    <span className="text-ink">{getAttorneyName(legalCase.attorney_id)}</span>
                  </div>
                  <div>
                    <span className="text-gray">Incident Date: </span>
                    <span className="text-ink">
                      {new Date(legalCase.incident_date).toLocaleDateString()}
                    </span>
                  </div>
                  {legalCase.court_date && (
                    <div>
                      <span className="text-gray">Court Date: </span>
                      <span className="text-accent font-medium">
                        {new Date(legalCase.court_date).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {legalCase.bail_amount && (
                  <div className="mt-3 pt-3 border-t border-gray/20 flex items-center justify-between">
                    <div>
                      <span className="text-gray text-sm">Bail Amount: </span>
                      <span className="font-semibold text-ink">
                        ${legalCase.bail_amount.toLocaleString()}
                      </span>
                    </div>
                    {legalCase.bond_posted && (
                      <span className="text-sm text-signal flex items-center gap-1">
                        <span className="inline-block w-2 h-2 bg-signal rounded-full"></span>
                        Bond Posted
                      </span>
                    )}
                  </div>
                )}
                </div>
              </GlassmorphicCard>
            </div>
          ))}

          {filteredCases.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray">No cases found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Case Details */}
        <div className="lg:col-span-1">
          {selectedCase ? (
            <GlassmorphicCard blur="sm" opacity={0.05} className="sticky top-24">
              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-ink mb-1">Case Details</h3>
                  <p className="text-sm text-gray">Case #{selectedCase.case_number}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray mb-2">Description</h4>
                    <p className="text-sm text-ink">{selectedCase.description}</p>
                  </div>

                  {selectedCase.charges && selectedCase.charges.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray mb-2">Charges</h4>
                      <div className="space-y-1">
                        {selectedCase.charges.map((charge, idx) => (
                          <div key={idx} className="text-sm text-ink flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                            {charge}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedCase.court_name && (
                    <div>
                      <h4 className="text-sm font-medium text-gray mb-1">Court Information</h4>
                      <div className="text-sm text-ink space-y-1">
                        <div>{selectedCase.court_name}</div>
                        {selectedCase.judge_name && <div>Judge: {selectedCase.judge_name}</div>}
                        {selectedCase.prosecutor && <div>Prosecutor: {selectedCase.prosecutor}</div>}
                      </div>
                    </div>
                  )}

                  {selectedCase.outcome && (
                    <div>
                      <h4 className="text-sm font-medium text-gray mb-1">Outcome</h4>
                      <p className="text-sm text-ink">{selectedCase.outcome}</p>
                    </div>
                  )}
                </div>

                {/* Document Upload */}
                <div className="pt-4 border-t border-gray/20">
                  <h4 className="text-sm font-medium text-gray mb-3">Documents</h4>
                  
                  {selectedCase.documents && selectedCase.documents.length > 0 ? (
                    <div className="space-y-2 mb-4">
                      {selectedCase.documents.map((doc) => (
                        <div key={doc.id} className="flex items-center justify-between p-2 
                                                    bg-ink/5 rounded-lg text-sm">
                          <div className="flex items-center gap-2">
                            <span>📄</span>
                            <span className="text-ink">{doc.title}</span>
                          </div>
                          <span className="text-xs text-gray">{doc.document_type}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray mb-4">No documents uploaded</p>
                  )}

                  <div className="relative">
                    <input
                      type="file"
                      id="document-upload"
                      className="hidden"
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <label htmlFor="document-upload">
                      <Button variant="secondary" size="sm" className="w-full cursor-pointer">
                        Upload Document
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
            </GlassmorphicCard>
          ) : (
            <GlassmorphicCard blur="sm" opacity={0.05}>
              <div className="p-6 text-center">
                <p className="text-gray">Select a case to view details</p>
              </div>
            </GlassmorphicCard>
          )}
        </div>
      </div>
    </div>
  )
}
