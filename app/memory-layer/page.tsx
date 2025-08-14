'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Upload, Search, Filter, Clock, Tags, Download, Eye, Trash2, AlertCircle } from 'lucide-react'
import { MemoryProvider } from './components/MemoryContext'
import SecureUpload from './components/SecureUpload'
import TimelineVisualization from './components/TimelineVisualization'
import SearchFilter from './components/SearchFilter'
import ExportTools from './components/ExportTools'
import EvidenceGrid from './components/EvidenceGrid'
import MetadataEditor from './components/MetadataEditor'

export default function MemoryLayerPage() {
  const [activeTab, setActiveTab] = useState('upload')
  const [selectedEvidence, setSelectedEvidence] = useState(null)
  const [showMetadataEditor, setShowMetadataEditor] = useState(false)

  const tabs = [
    { id: 'upload', label: 'Upload Evidence', icon: Upload },
    { id: 'timeline', label: 'Timeline View', icon: Clock },
    { id: 'search', label: 'Search & Filter', icon: Search },
    { id: 'export', label: 'Export Tools', icon: Download }
  ]

  return (
    <MemoryProvider>
      <div className="min-h-screen bg-black/95 text-white">
        {/* Header */}
        <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Shield className="w-8 h-8 text-[#60E6D6]" />
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-[#60E6D6] to-[#AD5EFF] bg-clip-text text-transparent">
                    Memory Layer Archive
                  </h1>
                  <p className="text-white/60 mt-1">Secure Evidence Management System</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-white/60">Total Evidence</p>
                  <p className="text-2xl font-bold text-[#60E6D6]">0</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-white/10 bg-black/30 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-2 px-6 py-4 font-medium transition-all
                      border-b-2 whitespace-nowrap
                      ${activeTab === tab.id
                        ? 'text-[#60E6D6] border-[#60E6D6] bg-[#60E6D6]/5'
                        : 'text-white/60 border-transparent hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'upload' && (
              <div className="max-w-4xl mx-auto">
                <SecureUpload onUploadComplete={(evidence) => {
                  setSelectedEvidence(evidence)
                  setShowMetadataEditor(true)
                }} />
              </div>
            )}

            {activeTab === 'timeline' && (
              <TimelineVisualization onSelectEvidence={setSelectedEvidence} />
            )}

            {activeTab === 'search' && (
              <div className="space-y-6">
                <SearchFilter />
                <EvidenceGrid onSelectEvidence={setSelectedEvidence} />
              </div>
            )}

            {activeTab === 'export' && (
              <div className="max-w-4xl mx-auto">
                <ExportTools />
              </div>
            )}
          </motion.div>
        </div>

        {/* Metadata Editor Modal */}
        {showMetadataEditor && selectedEvidence && (
          <MetadataEditor
            evidence={selectedEvidence}
            onClose={() => {
              setShowMetadataEditor(false)
              setSelectedEvidence(null)
            }}
            onSave={(updatedEvidence) => {
              // Handle save
              setShowMetadataEditor(false)
              setSelectedEvidence(null)
            }}
          />
        )}

        {/* Security Notice */}
        <div className="fixed bottom-4 right-4 max-w-sm">
          <div className="bg-[#60E6D6]/10 border border-[#60E6D6]/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex gap-3">
              <AlertCircle className="w-5 h-5 text-[#60E6D6] flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-[#60E6D6]">End-to-End Encryption</p>
                <p className="text-white/60 mt-1">
                  All evidence is encrypted before upload and during storage
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MemoryProvider>
  )
}
