import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Helper functions for common operations

// Auth helpers
export const signUp = async (email, password, metadata = {}) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: metadata,
    },
  })
  return { data, error }
}

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) return { user: null, error }
  
  // Get user role from users table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()
    
  return { user: userData, error: userError }
}

// Database helpers
export const createIncidentReport = async (reportData) => {
  const { data, error } = await supabase
    .from('incident_reports')
    .insert(reportData)
    .select()
    .single()
  return { data, error }
}

export const getIncidentReports = async (filters = {}) => {
  let query = supabase.from('incident_reports').select('*')
  
  if (filters.agency) {
    query = query.eq('agency', filters.agency)
  }
  if (filters.status) {
    query = query.eq('status', filters.status)
  }
  if (filters.startDate) {
    query = query.gte('report_date', filters.startDate)
  }
  if (filters.endDate) {
    query = query.lte('report_date', filters.endDate)
  }
  
  const { data, error } = await query.order('report_date', { ascending: false })
  return { data, error }
}

export const createVendorAudit = async (auditData) => {
  const { data, error } = await supabase
    .from('vendor_audits')
    .insert(auditData)
    .select()
    .single()
  return { data, error }
}

export const getVendorAudits = async (filters = {}) => {
  let query = supabase.from('vendor_audits').select('*')
  
  if (filters.agency) {
    query = query.eq('agency', filters.agency)
  }
  if (filters.vendor) {
    query = query.eq('vendor_name', filters.vendor)
  }
  
  const { data, error } = await query.order('audit_date', { ascending: false })
  return { data, error }
}

export const createMemoryArchive = async (archiveData) => {
  const { data, error } = await supabase
    .from('memory_archive')
    .insert(archiveData)
    .select()
    .single()
  return { data, error }
}

export const getMemoryArchive = async (filters = {}) => {
  let query = supabase.from('memory_archive').select('*')
  
  if (filters.location) {
    query = query.eq('location', filters.location)
  }
  if (filters.tacticClass) {
    query = query.eq('tactic_class', filters.tacticClass)
  }
  
  const { data, error } = await query.order('archive_date', { ascending: false })
  return { data, error }
}

export const createLieTruthEntry = async (entryData) => {
  const { data, error } = await supabase
    .from('lie_truth_map')
    .insert(entryData)
    .select()
    .single()
  return { data, error }
}

export const getLieTruthMap = async (filters = {}) => {
  let query = supabase.from('lie_truth_map').select('*')
  
  if (filters.status) {
    query = query.eq('status', filters.status)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  return { data, error }
}

// Storage helpers
export const uploadEvidence = async (file, path) => {
  const { data, error } = await supabase.storage
    .from('evidence')
    .upload(path, file)
  return { data, error }
}

export const uploadDocument = async (file, path) => {
  const { data, error } = await supabase.storage
    .from('documents')
    .upload(path, file)
  return { data, error }
}

export const uploadVendorAuditDoc = async (file, path) => {
  const { data, error } = await supabase.storage
    .from('vendor-audits')
    .upload(path, file)
  return { data, error }
}

export const getStorageUrl = (bucket, path) => {
  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path)
  return data.publicUrl
}

// Real-time subscriptions
export const subscribeToIncidents = (callback) => {
  return supabase
    .channel('incident-reports')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'incident_reports' }, 
      callback
    )
    .subscribe()
}

export const subscribeToLieTruthMap = (callback) => {
  return supabase
    .channel('lie-truth-map')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'lie_truth_map' }, 
      callback
    )
    .subscribe()
}

// Learning Platform helpers
export const getCourses = async (filters = {}) => {
  let query = supabase.from('courses').select('*')
  
  if (filters.level) {
    query = query.eq('level', filters.level)
  }
  if (filters.tags && filters.tags.length > 0) {
    query = query.contains('tags', filters.tags)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  return { data, error }
}

export const getCourseById = async (courseId) => {
  const { data, error } = await supabase
    .from('courses')
    .select(`
      *,
      course_instructors(
        instructors(
          *,
          users(full_name)
        )
      )
    `)
    .eq('id', courseId)
    .single()
  
  return { data, error }
}

export const enrollInCourse = async (userId, courseId) => {
  const { data, error } = await supabase
    .from('course_enrollments')
    .insert({
      user_id: userId,
      course_id: courseId,
      status: 'active'
    })
    .select()
    .single()
  
  if (!error) {
    // Initialize progress
    await supabase
      .from('course_progress')
      .insert({
        user_id: userId,
        course_id: courseId,
        completed_percentage: 0
      })
  }
  
  return { data, error }
}

export const updateCourseProgress = async (userId, courseId, percentage) => {
  const { data, error } = await supabase
    .from('course_progress')
    .upsert({
      user_id: userId,
      course_id: courseId,
      completed_percentage: percentage,
      last_accessed: new Date()
    })
    .select()
    .single()
  
  return { data, error }
}

export const updateMaterialProgress = async (userId, materialId, completed, progressPercentage = null) => {
  const updateData = {
    user_id: userId,
    material_id: materialId,
    completed,
    progress_percentage: progressPercentage || (completed ? 100 : 0)
  }
  
  if (completed) {
    updateData.completed_at = new Date()
  }
  
  const { data, error } = await supabase
    .from('material_progress')
    .upsert(updateData)
    .select()
    .single()
  
  return { data, error }
}

export const submitQuizAttempt = async (attemptData) => {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .insert(attemptData)
    .select()
    .single()
  
  return { data, error }
}

export const issueCertificate = async (userId, courseId) => {
  const certificateUrl = `/certificates/${userId}-${courseId}.pdf`
  
  const { data, error } = await supabase
    .from('certifications')
    .insert({
      user_id: userId,
      course_id: courseId,
      certificate_url: certificateUrl
    })
    .select()
    .single()
  
  return { data, error }
}

export const createForumPost = async (postData) => {
  const { data, error } = await supabase
    .from('forum_posts')
    .insert(postData)
    .select('*, users(full_name)')
    .single()
  
  return { data, error }
}

export const getForumPosts = async (forumId, parentPostId = null) => {
  let query = supabase
    .from('forum_posts')
    .select('*, users(full_name)')
    .eq('forum_id', forumId)
  
  if (parentPostId) {
    query = query.eq('parent_post_id', parentPostId)
  } else {
    query = query.is('parent_post_id', null)
  }
  
  const { data, error } = await query.order('created_at', { ascending: false })
  return { data, error }
}

export const uploadCourseMaterial = async (file, courseId) => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${courseId}/${Date.now()}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('course-materials')
    .upload(fileName, file)
  
  return { data, error }
}
