'use client'

import React, { useState, useMemo } from 'react'
import { VolunteerAttorney, LegalCase, AttorneyMatch, AttorneySpecialization } from '../types'
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard'
import Button from '@/app/components/ui/Button'

interface AttorneyMatcherProps {
  attorneys: VolunteerAttorney[]
  legalCase: LegalCase
  onMatchAttorney?: (match: Partial<AttorneyMatch>) => void
}

export default function AttorneyMatcher({ attorneys, legalCase, onMatchAttorney }: AttorneyMatcherProps) {
  const [selectedAttorney, setSelectedAttorney] = useState<VolunteerAttorney | null>(null)
  const [filterSpecialization, setFilterSpecialization] = useState<string>('all')
  const [filterAvailability, setFilterAvailability] = useState<string>('all')
  const [showOnlyVerified, setShowOnlyVerified] = useState(false)

  // Calculate match scores for attorneys
  const attorneysWithScores = useMemo(() => {
    return attorneys.map(attorney => {
      let matchScore = 0
      const matchReasons: string[] = []

      // Case type specialization match
      const caseTypeSpecializations: Record<string, AttorneySpecialization[]> = {
        'protest': ['protest', 'criminal', 'civil_rights'],
        'civil_rights': ['civil_rights', 'constitutional'],
        'wrongful_arrest': ['criminal', 'civil_rights', 'constitutional'],
        'police_brutality': ['civil_rights', 'constitutional'],
        'other': ['general']
      }

      const relevantSpecs = caseTypeSpecializations[legalCase.type] || ['general']
      const hasRelevantSpec = relevantSpecs.some(spec => 
        attorney.specializations.includes(spec)
      )

      if (hasRelevantSpec) {
        matchScore += 40
        matchReasons.push('Specialization match')
      }

      // Experience score
      if (attorney.years_experience >= 10) {
        matchScore += 20
        matchReasons.push('Extensive experience')
      } else if (attorney.years_experience >= 5) {
        matchScore += 10
        matchReasons.push('Good experience')
      }

      // Availability score
      if (attorney.availability === 'immediate') {
        matchScore += 20
        matchReasons.push('Immediately available')
      } else if (attorney.availability === 'within_week') {
        matchScore += 10
        matchReasons.push('Available soon')
      }

      // Pro bono hours available
      if ((attorney.pro_bono_hours_available || 0) >= 20) {
        matchScore += 10
        matchReasons.push('High pro bono availability')
      }

      // Rating score
      if ((attorney.rating || 0) >= 4.5) {
        matchScore += 10
        matchReasons.push('Highly rated')
      }

      return {
        ...attorney,
        matchScore,
        matchReasons
      }
    }).sort((a, b) => b.matchScore - a.matchScore)
  }, [attorneys, legalCase])

  // Apply filters
  const filteredAttorneys = attorneysWithScores.filter(attorney => {
    if (filterSpecialization !== 'all' && 
        !attorney.specializations.includes(filterSpecialization as AttorneySpecialization)) {
      return false
    }
    
    if (filterAvailability !== 'all' && attorney.availability !== filterAvailability) {
      return false
    }
    
    if (showOnlyVerified && !attorney.verified) {
      return false
    }
    
    return true
  })

  const handleMatchAttorney = (attorney: VolunteerAttorney & { matchScore: number; matchReasons: string[] }) => {
    const match: Partial<AttorneyMatch> = {
      case_id: legalCase.id,
      attorney_id: attorney.id,
      match_score: attorney.matchScore,
      match_reasons: attorney.matchReasons,
      status: 'proposed',
      proposed_date: new Date().toISOString(),
      created_at: new Date().toISOString()
    }
    
    onMatchAttorney?.(match)
    setSelectedAttorney(attorney)
  }

  const getAvailabilityColor = (availability?: string) => {
    switch (availability) {
      case 'immediate': return 'text-signal'
      case 'within_week': return 'text-yellow-500'
      case 'within_month': return 'text-orange-500'
      default: return 'text-gray'
    }
  }

  const getScoreBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-signal/20 text-signal'
    if (score >= 60) return 'bg-yellow-500/20 text-yellow-500'
    if (score >= 40) return 'bg-orange-500/20 text-orange-500'
    return 'bg-gray/20 text-gray'
  }

  return (
    <div className="space-y-6">
      {/* Case Summary */}
      <GlassmorphicCard blur="sm" opacity={0.1}>
        <div className="p-4">
          <h4 className="font-semibold text-ink mb-2">Finding Attorney for:</h4>
          <div className="space-y-1 text-sm">
            <div><span className="text-gray">Case:</span> <span className="text-ink">{legalCase.title}</span></div>
            <div><span className="text-gray">Type:</span> <span className="text-ink">{legalCase.type.replace('_', ' ')}</span></div>
            <div><span className="text-gray">Client:</span> <span className="text-ink">{legalCase.client_name}</span></div>
          </div>
        </div>
      </GlassmorphicCard>

      {/* Filters */}
      <GlassmorphicCard blur="sm" opacity={0.05}>
        <div className="p-4 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <div className="flex flex-wrap gap-4">
            <select
              value={filterSpecialization}
              onChange={(e) => setFilterSpecialization(e.target.value)}
              className="px-4 py-2 bg-ink/10 border border-gray/20 rounded-lg text-ink 
                       focus:outline-none focus:border-accent/50"
            >
              <option value="all">All Specializations</option>
              <option value="criminal">Criminal</option>
              <option value="civil_rights">Civil Rights</option>
              <option value="constitutional">Constitutional</option>
              <option value="protest">Protest Law</option>
              <option value="appeals">Appeals</option>
              <option value="general">General</option>
            </select>

            <select
              value={filterAvailability}
              onChange={(e) => setFilterAvailability(e.target.value)}
              className="px-4 py-2 bg-ink/10 border border-gray/20 rounded-lg text-ink 
                       focus:outline-none focus:border-accent/50"
            >
              <option value="all">All Availability</option>
              <option value="immediate">Immediate</option>
              <option value="within_week">Within Week</option>
              <option value="within_month">Within Month</option>
              <option value="on_call">On Call</option>
            </select>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlyVerified}
                onChange={(e) => setShowOnlyVerified(e.target.checked)}
                className="w-4 h-4 rounded border-gray/30 bg-ink/10 text-accent 
                         focus:ring-accent/50"
              />
              <span className="text-sm text-ink">Verified Only</span>
            </label>
          </div>

          <div className="text-sm text-gray">
            {filteredAttorneys.length} attorneys found
          </div>
        </div>
      </GlassmorphicCard>

      {/* Attorney List */}
      <div className="space-y-4">
        {filteredAttorneys.map((attorney) => (
          <GlassmorphicCard 
            key={attorney.id}
            blur="sm" 
            opacity={0.05}
            className={`hover:border-accent/50 transition-all cursor-pointer ${
              selectedAttorney?.id === attorney.id ? 'border-accent/50' : ''
            }`}
            onClick={() => setSelectedAttorney(attorney)}
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-signal 
                                flex items-center justify-center text-white font-semibold">
                    {attorney.full_name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink flex items-center gap-2">
                      {attorney.full_name}
                      {attorney.verified && (
                        <span className="text-accent" title="Verified">✓</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray">
                      {attorney.firm_name || 'Independent Practice'}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray">
                        {attorney.years_experience} years exp.
                      </span>
                      {attorney.rating && (
                        <span className="text-xs text-gray flex items-center gap-1">
                          ⭐ {attorney.rating} ({attorney.reviews_count})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 text-xs rounded-full ${getScoreBadgeColor(attorney.matchScore)}`}>
                    {attorney.matchScore}% Match
                  </span>
                  <p className={`text-xs mt-2 ${getAvailabilityColor(attorney.availability)}`}>
                    {attorney.availability?.replace('_', ' ')}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray">Specializations: </span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {attorney.specializations.map((spec, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-ink/10 rounded text-xs text-ink">
                        {spec.replace('_', ' ')}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-gray">Languages: </span>
                  <span className="text-ink">
                    {attorney.languages?.join(', ') || 'English'}
                  </span>
                </div>
              </div>

              {attorney.matchReasons.length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray/20">
                  <p className="text-xs text-gray mb-1">Match Reasons:</p>
                  <div className="flex flex-wrap gap-2">
                    {attorney.matchReasons.map((reason, idx) => (
                      <span key={idx} className="text-xs text-signal flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-signal rounded-full"></span>
                        {reason}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-gray">Pro Bono Hours: </span>
                  <span className="font-medium text-ink">
                    {attorney.pro_bono_hours_available || 0} available
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleMatchAttorney(attorney)
                  }}
                >
                  Request Match
                </Button>
              </div>
            </div>
          </GlassmorphicCard>
        ))}
      </div>

      {filteredAttorneys.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray">No attorneys found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
