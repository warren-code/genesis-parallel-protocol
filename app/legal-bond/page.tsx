'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard'
import Button from '@/app/components/ui/Button'
import MemberDirectory from './components/MemberDirectory'
import BondCalculator from './components/BondCalculator'
import CaseTracker from './components/CaseTracker'
import SecureDocumentUpload from './components/SecureDocumentUpload'
import AttorneyMatcher from './components/AttorneyMatcher'
import { mockMembers, mockAttorneys, mockCases, mockBondFunds } from './data/mockData'
import { LegalCase } from './types'

export default function LegalBondCooperativesPage() {
  const [activeTab, setActiveTab] = useState<'members' | 'calculator' | 'cases' | 'attorneys'>('members')
  const [selectedCase, setSelectedCase] = useState<LegalCase | null>(null)

  const tabs = [
    { id: 'members', label: 'Member Directory', icon: '👥' },
    { id: 'calculator', label: 'Bond Calculator', icon: '💰' },
    { id: 'cases', label: 'Case Tracking', icon: '⚖️' },
    { id: 'attorneys', label: 'Attorney Matching', icon: '👨‍⚖️' }
  ]

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-secondary">
      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-signal/20 
                        transform rotate-12 scale-150" />
        </div>

        <motion.div 
          className="relative max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold text-ink mb-6">
            Legal & Bond
            <span className="block text-accent">Cooperatives</span>
          </h1>
          <p className="text-xl text-gray max-w-3xl mx-auto mb-8">
            Community-driven legal support and bail fund management. Together, we ensure 
            no one faces the justice system alone.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12">
            <GlassmorphicCard blur="sm" opacity={0.1}>
              <div className="p-6 text-center">
                <div className="text-3xl font-bold text-accent">{mockMembers.length}</div>
                <div className="text-sm text-gray mt-1">Active Members</div>
              </div>
            </GlassmorphicCard>
            <GlassmorphicCard blur="sm" opacity={0.1}>
              <div className="p-6 text-center">
                <div className="text-3xl font-bold text-signal">$110K</div>
                <div className="text-sm text-gray mt-1">Funds Available</div>
              </div>
            </GlassmorphicCard>
            <GlassmorphicCard blur="sm" opacity={0.1}>
              <div className="p-6 text-center">
                <div className="text-3xl font-bold text-neural">{mockCases.length}</div>
                <div className="text-sm text-gray mt-1">Cases Supported</div>
              </div>
            </GlassmorphicCard>
            <GlassmorphicCard blur="sm" opacity={0.1}>
              <div className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-500">{mockAttorneys.length}</div>
                <div className="text-sm text-gray mt-1">Pro Bono Attorneys</div>
              </div>
            </GlassmorphicCard>
          </div>
        </motion.div>
      </section>

      {/* Tab Navigation */}
      <section className="px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <GlassmorphicCard blur="sm" opacity={0.05}>
            <div className="p-2 flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'bg-accent text-primary'
                      : 'text-gray hover:text-ink hover:bg-ink/10'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </GlassmorphicCard>
        </div>
      </section>

      {/* Content Area */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div key={activeTab} {...fadeInUp}>
            {activeTab === 'members' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-ink">Cooperative Members</h2>
                    <p className="text-gray mt-1">Our community of contributors and supporters</p>
                  </div>
                  <Button>
                    Add New Member
                  </Button>
                </div>
                <MemberDirectory 
                  members={mockMembers}
                  onSelectMember={(member) => console.log('Selected member:', member)}
                />
              </div>
            )}

            {activeTab === 'calculator' && (
              <div className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-ink">Bond Fund Calculator</h2>
                  <p className="text-gray mt-1">Calculate bond payments and fund availability</p>
                </div>
                <BondCalculator bondFunds={mockBondFunds} />
              </div>
            )}

            {activeTab === 'cases' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-ink">Case Tracking System</h2>
                    <p className="text-gray mt-1">Monitor and manage legal cases</p>
                  </div>
                  <Button>
                    New Case
                  </Button>
                </div>
                <CaseTracker 
                  cases={mockCases}
                  attorneys={mockAttorneys}
                  onSelectCase={(legalCase) => setSelectedCase(legalCase)}
                  onUploadDocument={(caseId, file) => console.log('Upload document:', caseId, file)}
                />
                
                {selectedCase && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-ink mb-4">
                      Document Upload for Case #{selectedCase.case_number}
                    </h3>
                    <SecureDocumentUpload
                      caseId={selectedCase.id}
                      onUploadComplete={(doc) => console.log('Document uploaded:', doc)}
                    />
                  </div>
                )}
              </div>
            )}

            {activeTab === 'attorneys' && (
              <div className="space-y-6">
                <div className="mb-6">
                  <h2 className="text-2xl font-semibold text-ink">Attorney Matching System</h2>
                  <p className="text-gray mt-1">Find the right pro bono attorney for your case</p>
                </div>
                
                {selectedCase ? (
                  <AttorneyMatcher
                    attorneys={mockAttorneys}
                    legalCase={selectedCase}
                    onMatchAttorney={(match) => console.log('Attorney match:', match)}
                  />
                ) : (
                  <GlassmorphicCard blur="sm" opacity={0.05}>
                    <div className="p-12 text-center">
                      <p className="text-gray mb-4">
                        Please select a case from the Case Tracking tab to find matching attorneys
                      </p>
                      <Button
                        variant="secondary"
                        onClick={() => setActiveTab('cases')}
                      >
                        Go to Case Tracking
                      </Button>
                    </div>
                  </GlassmorphicCard>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-ink/5">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeInUp}>
            <h2 className="text-3xl font-semibold text-ink text-center mb-12">
              How It Works
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GlassmorphicCard blur="sm" opacity={0.05}>
                <div className="p-6 text-center">
                  <div className="text-4xl mb-4">🤝</div>
                  <h3 className="text-xl font-semibold text-ink mb-2">Join the Cooperative</h3>
                  <p className="text-gray">
                    Become a member and contribute to the community bail fund. 
                    Every contribution helps someone in need.
                  </p>
                </div>
              </GlassmorphicCard>

              <GlassmorphicCard blur="sm" opacity={0.05}>
                <div className="p-6 text-center">
                  <div className="text-4xl mb-4">⚖️</div>
                  <h3 className="text-xl font-semibold text-ink mb-2">Get Legal Support</h3>
                  <p className="text-gray">
                    Access our network of volunteer attorneys and track your case 
                    with our secure case management system.
                  </p>
                </div>
              </GlassmorphicCard>

              <GlassmorphicCard blur="sm" opacity={0.05}>
                <div className="p-6 text-center">
                  <div className="text-4xl mb-4">💪</div>
                  <h3 className="text-xl font-semibold text-ink mb-2">Community Power</h3>
                  <p className="text-gray">
                    Together, we ensure that financial constraints don't prevent 
                    access to justice and fair legal representation.
                  </p>
                </div>
              </GlassmorphicCard>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
