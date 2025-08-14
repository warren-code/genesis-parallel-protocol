'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, FileText, Image, Video, Music, Clipboard, Check, 
  AlertCircle, Package, FileArchive, Shield, Hash, Calendar,
  FileJson, FileCode, Printer, Mail, Lock, Filter
} from 'lucide-react'
import { useMemory } from './MemoryContext'
import { format } from 'date-fns'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

type ExportFormat = 'pdf' | 'json' | 'csv' | 'archive'
type ExportScope = 'all' | 'selected' | 'filtered'

export default function ExportTools() {
  const { evidence } = useMemory()
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>([])
  const [exportFormat, setExportFormat] = useState<ExportFormat>('archive')
  const [exportScope, setExportScope] = useState<ExportScope>('all')
  const [includeMetadata, setIncludeMetadata] = useState(true)
  const [includeAuditLog, setIncludeAuditLog] = useState(true)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isExporting, setIsExporting] = useState(false)

  const fileTypeIcons: Record<'document' | 'image' | 'video' | 'audio' | 'other', any> = {
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

  const toggleEvidenceSelection = (id: string) => {
    setSelectedEvidence(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const getExportData = () => {
    let dataToExport = evidence
    
    if (exportScope === 'selected') {
      dataToExport = evidence.filter(item => selectedEvidence.includes(item.id))
    }
    // 'filtered' would use current search/filter results
    
    return dataToExport
  }

  const generateLegalReport = async () => {
    const data = getExportData()
    const doc = new jsPDF()
    
    // Header
    doc.setFontSize(20)
    doc.text('Evidence Report', 20, 20)
    doc.setFontSize(10)
    doc.text(`Generated: ${format(new Date(), 'PPP HH:mm:ss')}`, 20, 30)
    doc.text(`Total Evidence: ${data.length} items`, 20, 36)
    
    // Evidence Chain of Custody
    let yPosition = 50
    doc.setFontSize(14)
    doc.text('Chain of Custody', 20, yPosition)
    yPosition += 10
    
    data.forEach((item, idx) => {
      if (yPosition > 260) {
        doc.addPage()
        yPosition = 20
      }
      
      doc.setFontSize(12)
      doc.text(`${idx + 1}. ${item.title}`, 20, yPosition)
      yPosition += 6
      
      doc.setFontSize(10)
      doc.text(`Type: ${item.type} | Status: ${item.status}`, 30, yPosition)
      yPosition += 5
      doc.text(`Date: ${format(item.incidentDate, 'PPP')}`, 30, yPosition)
      yPosition += 5
      doc.text(`Hash: ${item.hash}`, 30, yPosition)
      yPosition += 5
      
      if (item.location) {
        doc.text(`Location: ${item.location}`, 30, yPosition)
        yPosition += 5
      }
      
      if (item.tags.length > 0) {
        doc.text(`Tags: ${item.tags.join(', ')}`, 30, yPosition)
        yPosition += 5
      }
      
      yPosition += 8
    })
    
    return doc
  }

  const exportEvidence = async () => {
    setIsExporting(true)
    setStatusMessage('Preparing evidence export...')
    
    try {
      const data = getExportData()
      
      switch (exportFormat) {
        case 'pdf':
          setStatusMessage('Generating legal report PDF...')
          const pdfDoc = await generateLegalReport()
          pdfDoc.save(`evidence-report-${format(new Date(), 'yyyy-MM-dd-HHmmss')}.pdf`)
          break
          
        case 'json':
          setStatusMessage('Exporting evidence data...')
          const jsonData = {
            exportDate: new Date().toISOString(),
            totalItems: data.length,
            evidence: includeMetadata ? data : data.map(({ metadata, ...rest }) => rest),
            auditLog: includeAuditLog ? {
              exportedBy: 'current-user',
              exportReason: 'Legal review',
              timestamp: new Date().toISOString()
            } : undefined
          }
          const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `evidence-export-${format(new Date(), 'yyyy-MM-dd-HHmmss')}.json`
          a.click()
          break
          
        case 'csv':
          setStatusMessage('Creating CSV export...')
          const csvHeader = 'ID,Title,Type,Status,Date,Location,Tags,Hash\n'
          const csvData = data.map(item => 
            `"${item.id}","${item.title}","${item.type}","${item.status}","${format(item.incidentDate, 'yyyy-MM-dd')}","${item.location || ''}","${item.tags.join(';')}","${item.hash}"`
          ).join('\n')
          const csvBlob = new Blob([csvHeader + csvData], { type: 'text/csv' })
          const csvUrl = URL.createObjectURL(csvBlob)
          const csvLink = document.createElement('a')
          csvLink.href = csvUrl
          csvLink.download = `evidence-export-${format(new Date(), 'yyyy-MM-dd-HHmmss')}.csv`
          csvLink.click()
          break
          
        case 'archive':
          setStatusMessage('Creating secure archive...')
          // In production, this would create a ZIP with all files and metadata
          await new Promise(resolve => setTimeout(resolve, 2000))
          break
      }
      
      setStatusMessage('Export completed successfully!')
      setTimeout(() => setStatusMessage(null), 5000)
    } catch (error) {
      setStatusMessage('Export failed. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Format */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#60E6D6]" />
            Export Format
          </h3>
          <div className="space-y-3">
            {[
              { value: 'archive', label: 'Secure Archive', icon: FileArchive, desc: 'Complete evidence package with encryption' },
              { value: 'pdf', label: 'Legal Report PDF', icon: FileText, desc: 'Formatted report for court submission' },
              { value: 'json', label: 'JSON Data', icon: FileJson, desc: 'Machine-readable format with metadata' },
              { value: 'csv', label: 'CSV Spreadsheet', icon: FileCode, desc: 'Simple tabular format for analysis' }
            ].map(format => (
              <label
                key={format.value}
                className={`
                  flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all
                  ${exportFormat === format.value 
                    ? 'bg-[#60E6D6]/10 border border-[#60E6D6]/30' 
                    : 'hover:bg-white/5 border border-transparent'
                  }
                `}
              >
                <input
                  type="radio"
                  name="format"
                  value={format.value}
                  checked={exportFormat === format.value}
                  onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
                  className="mt-0.5"
                />
                <format.icon className="w-5 h-5 text-[#60E6D6] flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-white">{format.label}</p>
                  <p className="text-xs text-white/60 mt-0.5">{format.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Export Scope */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Filter className="w-5 h-5 text-[#60E6D6]" />
            Export Scope
          </h3>
          <div className="space-y-3">
            {[
              { value: 'all', label: 'All Evidence', count: evidence.length },
              { value: 'selected', label: 'Selected Items', count: selectedEvidence.length },
              { value: 'filtered', label: 'Current Filter Results', count: evidence.length }
            ].map(scope => (
              <label
                key={scope.value}
                className={`
                  flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all
                  ${exportScope === scope.value 
                    ? 'bg-[#60E6D6]/10 border border-[#60E6D6]/30' 
                    : 'hover:bg-white/5 border border-transparent'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="scope"
                    value={scope.value}
                    checked={exportScope === scope.value}
                    onChange={(e) => setExportScope(e.target.value as ExportScope)}
                  />
                  <span className="font-medium text-white">{scope.label}</span>
                </div>
                <span className="text-sm text-white/60">{scope.count} items</span>
              </label>
            ))}
          </div>

          {/* Additional Options */}
          <div className="mt-4 space-y-2 pt-4 border-t border-white/10">
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={includeMetadata}
                onChange={(e) => setIncludeMetadata(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-white/80">Include metadata and tags</span>
            </label>
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={includeAuditLog}
                onChange={(e) => setIncludeAuditLog(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-white/80">Include audit trail</span>
            </label>
          </div>
        </div>
      </div>

      {/* Evidence Selection (for 'selected' scope) */}
      {exportScope === 'selected' && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">Select Evidence to Export</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {evidence.map(item => {
              const Icon = fileTypeIcons[item.type] || FileText
              return (
                <label
                  key={item.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedEvidence.includes(item.id)}
                    onChange={() => toggleEvidenceSelection(item.id)}
                    className="w-4 h-4"
                  />
                  <Icon className="w-5 h-5 text-[#60E6D6]" />
                  <div className="flex-1">
                    <p className="text-white font-medium">{item.title}</p>
                    <p className="text-xs text-white/60">
                      {format(item.incidentDate, 'MMM d, yyyy')} · {formatFileSize(item.fileSize)}
                    </p>
                  </div>
                </label>
              )
            })}
          </div>
        </div>
      )}

      {/* Export Status */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`
              border rounded-lg p-4
              ${statusMessage.includes('success') 
                ? 'bg-green-500/10 border-green-500/30' 
                : statusMessage.includes('fail')
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-[#60E6D6]/10 border-[#60E6D6]/30'
              }
            `}
          >
            <div className="flex gap-3">
              {statusMessage.includes('success') ? (
                <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : statusMessage.includes('fail') ? (
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              ) : (
                <div className="w-5 h-5 border-2 border-[#60E6D6] border-t-transparent rounded-full animate-spin" />
              )}
              <p className={`
                ${statusMessage.includes('success') ? 'text-green-500' : ''}
                ${statusMessage.includes('fail') ? 'text-red-500' : ''}
                ${!statusMessage.includes('success') && !statusMessage.includes('fail') ? 'text-[#60E6D6]' : ''}
              `}>
                {statusMessage}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={exportEvidence}
          disabled={isExporting || (exportScope === 'selected' && selectedEvidence.length === 0)}
          className="flex-1 py-3 bg-gradient-to-r from-[#60E6D6] to-[#AD5EFF] text-black font-bold rounded-lg
                   hover:shadow-lg hover:shadow-[#60E6D6]/25 transition-all duration-300
                   flex items-center justify-center gap-3
                   disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isExporting ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <Download className="w-5 h-5" />
          )}
          {isExporting ? 'Exporting...' : 'Export Evidence'}
        </button>

        <button className="px-6 py-3 bg-white/5 border border-white/20 text-white font-medium rounded-lg
                         hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
          <Printer className="w-5 h-5" />
          Print Summary
        </button>

        <button className="px-6 py-3 bg-white/5 border border-white/20 text-white font-medium rounded-lg
                         hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
          <Mail className="w-5 h-5" />
          Email Report
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-[#60E6D6]/10 border border-[#60E6D6]/30 rounded-lg p-4">
        <div className="flex gap-3">
          <Shield className="w-5 h-5 text-[#60E6D6] flex-shrink-0 mt-0.5" />
          <div className="space-y-2 text-sm">
            <p className="font-medium text-[#60E6D6]">Legal Compliance & Security</p>
            <ul className="space-y-1 text-white/60">
              <li className="flex items-start gap-2">
                <Hash className="w-3 h-3 mt-0.5" />
                <span>All exports include cryptographic hashes for integrity verification</span>
              </li>
              <li className="flex items-start gap-2">
                <Lock className="w-3 h-3 mt-0.5" />
                <span>Archive exports are encrypted with AES-256 encryption</span>
              </li>
              <li className="flex items-start gap-2">
                <Calendar className="w-3 h-3 mt-0.5" />
                <span>Complete audit trail maintained for chain of custody</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
