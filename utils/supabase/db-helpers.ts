import { createClient } from './client'
import type { Database } from '@/types/supabase'

type Tables = Database['public']['Tables']

// User operations
export async function getUserById(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
  
  return { data, error }
}

export async function updateUserProfile(userId: string, updates: Tables['users']['Update']) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  return { data, error }
}

// Rights Information operations
export async function getRightsInformation(filters?: { category?: string; published?: boolean }) {
  const supabase = createClient()
  let query = supabase.from('rights_information').select('*')
  
  if (filters?.category) {
    query = query.eq('category', filters.category)
  }
  if (filters?.published !== undefined) {
    query = query.eq('is_published', filters.published)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  return { data, error }
}

export async function createRightsInfo(info: Tables['rights_information']['Insert']) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('rights_information')
    .insert(info)
    .select()
    .single()
  
  return { data, error }
}

// Rapid Response Incidents operations
export async function getIncidents(filters?: { status?: string; priority?: number }) {
  const supabase = createClient()
  let query = supabase.from('rapid_response_incidents').select(`
    *,
    reported_by:users!rapid_response_incidents_reported_by_fkey(full_name, email),
    assigned_to:users!rapid_response_incidents_assigned_to_fkey(full_name, email)
  `)
  
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  if (filters?.priority) {
    query = query.eq('priority', filters.priority)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  return { data, error }
}

export async function createIncident(incident: Tables['rapid_response_incidents']['Insert']) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('rapid_response_incidents')
    .insert(incident)
    .select()
    .single()
  
  return { data, error }
}

export async function updateIncidentStatus(
  incidentId: string, 
  status: Tables['rapid_response_incidents']['Row']['status'],
  resolution_notes?: string
) {
  const supabase = createClient()
  const updates: Tables['rapid_response_incidents']['Update'] = { status }
  
  if (status === 'resolved') {
    updates.resolved_at = new Date().toISOString()
    if (resolution_notes) {
      updates.resolution_notes = resolution_notes
    }
  }
  
  const { data, error } = await supabase
    .from('rapid_response_incidents')
    .update(updates)
    .eq('id', incidentId)
    .select()
    .single()
  
  return { data, error }
}

// FOIA Requests operations
export async function getFOIARequests(filters?: { status?: string; agency?: string }) {
  const supabase = createClient()
  let query = supabase.from('foia_requests').select(`
    *,
    submitted_by:users!foia_requests_submitted_by_fkey(full_name, email)
  `)
  
  if (filters?.status) {
    query = query.eq('status', filters.status)
  }
  if (filters?.agency) {
    query = query.ilike('agency_name', `%${filters.agency}%`)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  return { data, error }
}

export async function createFOIARequest(request: Tables['foia_requests']['Insert']) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('foia_requests')
    .insert(request)
    .select()
    .single()
  
  return { data, error }
}

// Evidence Vault operations
export async function getEvidenceByIncident(incidentId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('evidence_vault')
    .select(`
      *,
      uploaded_by:users!evidence_vault_uploaded_by_fkey(full_name, email),
      verified_by:users!evidence_vault_verified_by_fkey(full_name, email)
    `)
    .eq('incident_id', incidentId)
    .order('created_at', { ascending: false })
  
  return { data, error }
}

export async function uploadEvidence(evidence: Tables['evidence_vault']['Insert']) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('evidence_vault')
    .insert(evidence)
    .select()
    .single()
  
  return { data, error }
}

// Network Connections operations
export async function getUserConnections(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('network_connections')
    .select(`
      *,
      connected_user:users!network_connections_connected_user_id_fkey(
        id, full_name, email, role, organization, avatar_url
      )
    `)
    .eq('user_id', userId)
    .eq('status', 'accepted')
  
  return { data, error }
}

export async function requestConnection(
  userId: string, 
  connectedUserId: string, 
  connectionType: string,
  notes?: string
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('network_connections')
    .insert({
      user_id: userId,
      connected_user_id: connectedUserId,
      connection_type: connectionType,
      notes
    })
    .select()
    .single()
  
  return { data, error }
}

// Activity Logging
export async function logActivity(
  action: string,
  entityType: string,
  entityId?: string,
  metadata?: any,
  userId?: string
) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('activity_logs')
    .insert({
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      metadata
    })
  
  return { data, error }
}

// Comments operations
export async function getCommentsByIncident(incidentId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('comments')
    .select(`
      *,
      author:users!comments_author_id_fkey(full_name, email, avatar_url)
    `)
    .eq('incident_id', incidentId)
    .order('created_at', { ascending: true })
  
  return { data, error }
}

export async function addComment(comment: Tables['comments']['Insert']) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('comments')
    .insert(comment)
    .select(`
      *,
      author:users!comments_author_id_fkey(full_name, email, avatar_url)
    `)
    .single()
  
  return { data, error }
}
