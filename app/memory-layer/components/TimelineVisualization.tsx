'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, FileText, Image, Video, Music, Filter, ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemory } from './MemoryContext'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay } from 'date-fns'

interface TimelineVisualizationProps {
  onSelectEvidence?: (evidence: any) => void
}

export default function TimelineVisualization({ onSelectEvidence }: TimelineVisualizationProps) {
  const { evidence, filterByDateRange } = useMemory()
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar'>('timeline')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [filteredEvidence, setFilteredEvidence] = useState(evidence)

  const fileTypeIcons: Record<'document' | 'image' | 'video' | 'audio' | 'other', any> = {
    document: FileText,
    image: Image,
    video: Video,
    audio: Music,
    other: FileText
  }

  useEffect(() => {
    // Group evidence by date
    const start = startOfMonth(selectedDate)
    const end = endOfMonth(selectedDate)
    setFilteredEvidence(filterByDateRange(start, end))
  }, [selectedDate, evidence, filterByDateRange])

  const groupEvidenceByDate = () => {
    const groups: Record<string, typeof evidence> = {}
    
    filteredEvidence.forEach(item => {
      const dateKey = format(item.incidentDate, 'yyyy-MM-dd')
      if (!groups[dateKey]) {
        groups[dateKey] = []
      }
      groups[dateKey].push(item)
    })

    return Object.entries(groups)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([date, items]) => ({
        date,
        items: items.sort((a, b) => b.incidentDate.getTime() - a.incidentDate.getTime())
      }))
  }

  const renderTimeline = () => {
    const groupedEvidence = groupEvidenceByDate()

    return (
      <div className="space-y-8">
        {groupedEvidence.map(({ date, items }, groupIdx) => (
          <motion.div
            key={date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: groupIdx * 0.1 }}
            className="relative"
          >
            {/* Date Header */}
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-[#60E6D6]/10 border border-[#60E6D6]/30 rounded-lg px-4 py-2">
                <p className="text-[#60E6D6] font-bold">
                  {format(new Date(date), 'MMMM d, yyyy')}
                </p>
              </div>
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-white/60 text-sm">{items.length} items</span>
            </div>

            {/* Timeline Items */}
            <div className="space-y-4 ml-8">
              {items.map((item, idx) => {
                const Icon = fileTypeIcons[item.type] || FileText
                
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (groupIdx * 0.1) + (idx * 0.05) }}
                    onClick={() => onSelectEvidence?.(item)}
                    className="relative group cursor-pointer"
                  >
                    {/* Timeline Line */}
                    {idx < items.length - 1 && (
                      <div className="absolute left-6 top-12 bottom-0 w-px bg-white/10" />
                    )}

                    {/* Content */}
                    <div className="flex gap-4">
                      {/* Time */}
                      <div className="flex-shrink-0 w-16 text-right">
                        <p className="text-sm text-white/60">
                          {format(item.incidentDate, 'HH:mm')}
                        </p>
                      </div>

                      {/* Icon */}
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-black border-2 border-white/20 
                                      group-hover:border-[#60E6D6] transition-colors
                                      flex items-center justify-center">
                          <Icon className="w-5 h-5 text-white/60 group-hover:text-[#60E6D6] transition-colors" />
                        </div>
                      </div>

                      {/* Card */}
                      <div className="flex-1 bg-white/5 border border-white/10 rounded-lg p-4
                                    group-hover:border-[#60E6D6]/30 group-hover:bg-[#60E6D6]/5
                                    transition-all duration-300">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium text-white group-hover:text-[#60E6D6] transition-colors">
                              {item.title}
                            </h3>
                            <p className="text-sm text-white/60 mt-1">{item.description}</p>
                            
                            {/* Metadata */}
                            <div className="flex flex-wrap gap-4 mt-3 text-xs text-white/40">
                              {item.location && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="w-3 h-3" />
                                  {item.location}
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {format(item.uploadedAt, 'MMM d, yyyy')}
                              </div>
                            </div>

                            {/* Tags */}
                            {item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {item.tags.map(tag => (
                                  <span key={tag} className="px-2 py-1 bg-white/10 rounded text-xs text-white/60">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Status Badge */}
                          <div className={`
                            px-2 py-1 rounded text-xs font-medium
                            ${item.status === 'verified' ? 'bg-green-500/20 text-green-400' : ''}
                            ${item.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                            ${item.status === 'archived' ? 'bg-gray-500/20 text-gray-400' : ''}
                          `}>
                            {item.status}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}

        {groupedEvidence.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-white/60">No evidence found for this time period</p>
          </div>
        )}
      </div>
    )
  }

  const renderCalendar = () => {
    const monthStart = startOfMonth(selectedDate)
    const monthEnd = endOfMonth(selectedDate)
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd })

    // Create a map of dates with evidence
    const evidenceByDate = new Map()
    filteredEvidence.forEach(item => {
      const dateKey = format(item.incidentDate, 'yyyy-MM-dd')
      if (!evidenceByDate.has(dateKey)) {
        evidenceByDate.set(dateKey, [])
      }
      evidenceByDate.get(dateKey).push(item)
    })

    return (
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">
            {format(selectedDate, 'MMMM yyyy')}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-4 py-2 hover:bg-white/10 rounded-lg transition-colors text-sm"
            >
              Today
            </button>
            <button
              onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {/* Day Headers */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-xs text-white/40 font-medium py-2">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {days.map((day, idx) => {
            const dateKey = format(day, 'yyyy-MM-dd')
            const dayEvidence = evidenceByDate.get(dateKey) || []
            const isToday = isSameDay(day, new Date())
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.01 }}
                className={`
                  relative aspect-square p-2 border border-white/10 rounded-lg
                  ${dayEvidence.length > 0 ? 'bg-[#60E6D6]/10 border-[#60E6D6]/30 cursor-pointer hover:bg-[#60E6D6]/20' : ''}
                  ${isToday ? 'ring-2 ring-[#AD5EFF]' : ''}
                  transition-all duration-300
                `}
                onClick={() => {
                  if (dayEvidence.length > 0 && onSelectEvidence) {
                    // Show evidence for this day
                    onSelectEvidence(dayEvidence[0])
                  }
                }}
              >
                <p className={`text-sm ${isToday ? 'font-bold text-[#AD5EFF]' : 'text-white/60'}`}>
                  {format(day, 'd')}
                </p>
                
                {dayEvidence.length > 0 && (
                  <div className="absolute bottom-1 right-1">
                    <div className="w-6 h-6 bg-[#60E6D6] rounded-full flex items-center justify-center">
                      <span className="text-xs text-black font-bold">{dayEvidence.length}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* View Mode Toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Evidence Timeline</h2>
        <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-4 py-2 rounded transition-all ${
              viewMode === 'timeline' 
                ? 'bg-[#60E6D6] text-black font-medium' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-4 py-2 rounded transition-all ${
              viewMode === 'calendar' 
                ? 'bg-[#60E6D6] text-black font-medium' 
                : 'text-white/60 hover:text-white'
            }`}
          >
            Calendar
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'timeline' ? renderTimeline() : renderCalendar()}
    </div>
  )
}
