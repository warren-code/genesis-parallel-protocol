'use client'

import React, { useState, useMemo } from 'react'
import { CooperativeMember } from '../types'
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard'

interface MemberDirectoryProps {
  members: CooperativeMember[]
  onSelectMember?: (member: CooperativeMember) => void
}

export default function MemberDirectory({ members, onSelectMember }: MemberDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'contribution'>('name')

  const filteredAndSortedMembers = useMemo(() => {
    const filtered = members.filter(member => {
      const matchesSearch = 
        member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.city?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || member.status === statusFilter
      
      return matchesSearch && matchesStatus
    })

    // Sort members
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.full_name.localeCompare(b.full_name)
        case 'date':
          return new Date(b.member_since).getTime() - new Date(a.member_since).getTime()
        case 'contribution':
          return (b.total_contributed || 0) - (a.total_contributed || 0)
        default:
          return 0
      }
    })

    return filtered
  }, [members, searchTerm, statusFilter, sortBy])

  const totalContributions = members.reduce((sum, member) => sum + (member.total_contributed || 0), 0)
  const activeMembers = members.filter(m => m.status === 'active').length

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassmorphicCard blur="sm" opacity={0.1}>
          <div className="p-4">
            <div className="text-2xl font-bold text-accent">{members.length}</div>
            <div className="text-sm text-gray">Total Members</div>
          </div>
        </GlassmorphicCard>
        
        <GlassmorphicCard blur="sm" opacity={0.1}>
          <div className="p-4">
            <div className="text-2xl font-bold text-signal">{activeMembers}</div>
            <div className="text-sm text-gray">Active Members</div>
          </div>
        </GlassmorphicCard>

        <GlassmorphicCard blur="sm" opacity={0.1}>
          <div className="p-4">
            <div className="text-2xl font-bold text-neural">${totalContributions.toLocaleString()}</div>
            <div className="text-sm text-gray">Total Contributions</div>
          </div>
        </GlassmorphicCard>

        <GlassmorphicCard blur="sm" opacity={0.1}>
          <div className="p-4">
            <div className="text-2xl font-bold text-ink">
              {members.reduce((sum, m) => sum + (m.cases_helped || 0), 0)}
            </div>
            <div className="text-sm text-gray">Cases Supported</div>
          </div>
        </GlassmorphicCard>
      </div>

      {/* Search and Filters */}
      <GlassmorphicCard blur="sm" opacity={0.05}>
        <div className="p-4 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Search members by name, email, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-96 px-4 py-2 bg-ink/10 border border-gray/20 rounded-lg 
                     text-ink placeholder-gray focus:outline-none focus:border-accent/50"
          />

          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-ink/10 border border-gray/20 rounded-lg text-ink 
                       focus:outline-none focus:border-accent/50"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="inactive">Inactive</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-ink/10 border border-gray/20 rounded-lg text-ink 
                       focus:outline-none focus:border-accent/50"
            >
              <option value="name">Sort by Name</option>
              <option value="date">Sort by Join Date</option>
              <option value="contribution">Sort by Contribution</option>
            </select>
          </div>
        </div>
      </GlassmorphicCard>

      {/* Member List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAndSortedMembers.map((member) => (
          <div
            key={member.id}
            onClick={() => onSelectMember?.(member)}
            className="cursor-pointer"
          >
            <GlassmorphicCard 
              blur="sm" 
              opacity={0.05}
              className="hover:border-accent/50 transition-all"
            >
              <div className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-ink">{member.full_name}</h3>
                  <p className="text-sm text-gray">{member.email}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  member.status === 'active' ? 'bg-signal/20 text-signal' :
                  member.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                  member.status === 'suspended' ? 'bg-red-500/20 text-red-500' :
                  'bg-gray/20 text-gray'
                }`}>
                  {member.status}
                </span>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray">Location:</span>
                  <span className="text-ink">{member.city}, {member.state}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray">Member Since:</span>
                  <span className="text-ink">
                    {new Date(member.member_since).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray">Contribution:</span>
                  <span className="text-ink">
                    ${member.contribution_amount}/{member.contribution_frequency}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray/20">
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-gray">Total: </span>
                    <span className="font-semibold text-accent">
                      ${member.total_contributed?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray">Cases: </span>
                    <span className="font-semibold text-neural">
                      {member.cases_helped || 0}
                    </span>
                  </div>
                </div>
              </div>
              </div>
            </GlassmorphicCard>
          </div>
        ))}
      </div>

      {filteredAndSortedMembers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray">No members found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
