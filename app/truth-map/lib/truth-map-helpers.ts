import { createClient } from '@/utils/supabase/client';
import type { Database } from '@/types/supabase';

type Tables = Database['public']['Tables'];
type TruthMapEntry = Tables['lie_truth_map']['Row'];
type TruthMapInsert = Tables['lie_truth_map']['Insert'];
type TruthMapUpdate = Tables['lie_truth_map']['Update'];

// Create a new truth map entry
export async function createTruthMapEntry(entry: TruthMapInsert) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('lie_truth_map')
    .insert(entry)
    .select()
    .single();
  
  return { data, error };
}

// Get truth map entries with filters
export async function getTruthMapEntries(filters?: {
  status?: string;
  category?: string;
  verified_by?: string;
  search?: string;
}) {
  const supabase = createClient();
  let query = supabase
    .from('lie_truth_map')
    .select(`
      *,
      created_by:users!lie_truth_map_created_by_fkey(full_name, email),
      verified_by:users!lie_truth_map_verified_by_fkey(full_name, email)
    `);
  
  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  if (filters?.verified_by) {
    query = query.eq('verified_by', filters.verified_by);
  }
  if (filters?.search) {
    query = query.or(`original_claim.ilike.%${filters.search}%,counter_evidence.ilike.%${filters.search}%,title.ilike.%${filters.search}%`);
  }
  
  const { data, error } = await query.order('created_at', { ascending: false });
  return { data, error };
}

// Update truth map entry
export async function updateTruthMapEntry(id: string, updates: TruthMapUpdate) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('lie_truth_map')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
}

// Verify a truth map entry
export async function verifyTruthMapEntry(
  id: string,
  verifierId: string,
  status: 'verified' | 'debunked',
  confidenceScore?: number,
  notes?: string
) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('lie_truth_map')
    .update({
      status,
      verified_by: verifierId,
      verified_at: new Date().toISOString(),
      confidence_score: confidenceScore,
      notes
    })
    .eq('id', id)
    .select()
    .single();
  
  return { data, error };
}

// Add collaborative comment
export async function addTruthMapComment(
  entryId: string,
  userId: string,
  comment: string
) {
  const supabase = createClient();
  
  // This would require a separate comments table
  // For now, we'll update the entry's notes field
  const { data: entry, error: fetchError } = await supabase
    .from('lie_truth_map')
    .select('notes')
    .eq('id', entryId)
    .single();
  
  if (fetchError) return { data: null, error: fetchError };
  
  const existingNotes = entry.notes || '';
  const newNote = `[${new Date().toISOString()}] ${comment}`;
  const updatedNotes = existingNotes ? `${existingNotes}\n${newNote}` : newNote;
  
  const { data, error } = await supabase
    .from('lie_truth_map')
    .update({ notes: updatedNotes })
    .eq('id', entryId)
    .select()
    .single();
  
  return { data, error };
}

// Get truth map statistics
export async function getTruthMapStats() {
  const supabase = createClient();
  
  const { data: entries, error } = await supabase
    .from('lie_truth_map')
    .select('status, category, confidence_score, created_at');
  
  if (error) return { stats: null, error };
  
  const stats = {
    total: entries.length,
    verified: entries.filter(e => e.status === 'verified').length,
    debunked: entries.filter(e => e.status === 'debunked').length,
    underReview: entries.filter(e => e.status === 'under_review').length,
    avgConfidence: entries.reduce((acc, e) => acc + (e.confidence_score || 0), 0) / entries.length || 0,
    byCategory: {} as Record<string, number>,
    recentActivity: entries.filter(e => {
      const date = new Date(e.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return date > weekAgo;
    }).length
  };
  
  // Count by category
  entries.forEach(entry => {
    if (entry.category) {
      stats.byCategory[entry.category] = (stats.byCategory[entry.category] || 0) + 1;
    }
  });
  
  return { stats, error: null };
}

// Search for similar claims
export async function searchSimilarClaims(claim: string, limit = 5) {
  const supabase = createClient();
  
  // Simple text search - in production, you'd want to use vector similarity or full-text search
  const searchTerms = claim.toLowerCase().split(' ').filter(term => term.length > 3);
  const searchQuery = searchTerms.join(' | ');
  
  const { data, error } = await supabase
    .from('lie_truth_map')
    .select('*')
    .or(`original_claim.ilike.%${searchQuery}%,counter_evidence.ilike.%${searchQuery}%`)
    .limit(limit);
  
  return { data, error };
}

// Export truth map data
export async function exportTruthMapData(format: 'json' | 'csv' = 'json') {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('lie_truth_map')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) return { data: null, error };
  
  if (format === 'json') {
    return { data: JSON.stringify(data, null, 2), error: null };
  }
  
  // Convert to CSV
  if (data.length === 0) return { data: '', error: null };
  
  const headers = Object.keys(data[0]).join(',');
  const rows = data.map(entry => 
    Object.values(entry).map(val => 
      typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val
    ).join(',')
  );
  
  const csv = [headers, ...rows].join('\n');
  return { data: csv, error: null };
}
