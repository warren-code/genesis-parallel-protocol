import { createClient } from './client'

const EVIDENCE_BUCKET = 'evidence'
const DOCUMENTS_BUCKET = 'documents'
const AVATARS_BUCKET = 'avatars'

// Initialize storage buckets (run once)
export async function initializeStorageBuckets() {
  const supabase = createClient()
  
  const buckets = [
    { name: EVIDENCE_BUCKET, public: false },
    { name: DOCUMENTS_BUCKET, public: false },
    { name: AVATARS_BUCKET, public: true }
  ]
  
  for (const bucket of buckets) {
    const { error } = await supabase.storage.createBucket(bucket.name, {
      public: bucket.public,
      fileSizeLimit: bucket.name === AVATARS_BUCKET ? 5242880 : 52428800, // 5MB for avatars, 50MB for others
      allowedMimeTypes: bucket.name === AVATARS_BUCKET 
        ? ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
        : undefined
    })
    
    if (error && error.message !== 'Bucket already exists') {
      console.error(`Error creating ${bucket.name} bucket:`, error)
    }
  }
}

// Upload evidence file
export async function uploadEvidenceFile(
  file: File,
  incidentId: string,
  userId: string
): Promise<{ url: string | null; error: any }> {
  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${incidentId}/${userId}_${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from(EVIDENCE_BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) {
    return { url: null, error }
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from(EVIDENCE_BUCKET)
    .getPublicUrl(fileName)
  
  return { url: publicUrl, error: null }
}

// Upload document file (for FOIA responses, SOPs, etc.)
export async function uploadDocumentFile(
  file: File,
  category: 'foia' | 'sop' | 'rights',
  referenceId: string
): Promise<{ url: string | null; error: any }> {
  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${category}/${referenceId}_${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from(DOCUMENTS_BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) {
    return { url: null, error }
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from(DOCUMENTS_BUCKET)
    .getPublicUrl(fileName)
  
  return { url: publicUrl, error: null }
}

// Upload avatar image
export async function uploadAvatarImage(
  file: File,
  userId: string
): Promise<{ url: string | null; error: any }> {
  const supabase = createClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}.${fileExt}`
  
  // Delete existing avatar if it exists
  await supabase.storage
    .from(AVATARS_BUCKET)
    .remove([fileName])
  
  const { data, error } = await supabase.storage
    .from(AVATARS_BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: true
    })
  
  if (error) {
    return { url: null, error }
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from(AVATARS_BUCKET)
    .getPublicUrl(fileName)
  
  return { url: publicUrl, error: null }
}

// Get signed URL for private file access
export async function getSignedUrl(
  bucket: string,
  path: string,
  expiresIn: number = 3600
): Promise<{ url: string | null; error: any }> {
  const supabase = createClient()
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn)
  
  return { url: data?.signedUrl || null, error }
}

// Delete file from storage
export async function deleteFile(
  bucket: string,
  paths: string[]
): Promise<{ error: any }> {
  const supabase = createClient()
  
  const { error } = await supabase.storage
    .from(bucket)
    .remove(paths)
  
  return { error }
}

// List files in a directory
export async function listFiles(
  bucket: string,
  path: string,
  options?: {
    limit?: number
    offset?: number
    sortBy?: { column: string; order: 'asc' | 'desc' }
  }
): Promise<{ files: any[] | null; error: any }> {
  const supabase = createClient()
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(path, {
      limit: options?.limit || 100,
      offset: options?.offset || 0,
      sortBy: options?.sortBy
    })
  
  return { files: data, error }
}

// Calculate file hash for integrity verification
export async function calculateFileHash(file: File): Promise<string> {
  const buffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}
