import { createClient } from './client'
import type { Database } from '@/types/supabase'

type UserRole = Database['public']['Enums']['user_role']

// Sign up new user
export async function signUp(
  email: string,
  password: string,
  fullName: string,
  role: UserRole,
  organization?: string
) {
  const supabase = createClient()
  
  // Create auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        role,
        organization
      }
    }
  })
  
  if (authError) {
    return { user: null, error: authError }
  }
  
  // Create user profile
  if (authData.user) {
    const { error: profileError } = await supabase
      .from('users')
      .insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        role,
        organization
      })
    
    if (profileError) {
      return { user: authData.user, error: profileError }
    }
  }
  
  return { user: authData.user, error: null }
}

// Sign in user
export async function signIn(email: string, password: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  return { user: data?.user, session: data?.session, error }
}

// Sign out user
export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Get current user
export async function getCurrentUser() {
  const supabase = createClient()
  
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  
  if (authError || !user) {
    return { user: null, profile: null, error: authError }
  }
  
  // Get user profile
  const { data: profile, error: profileError } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()
  
  return { user, profile, error: profileError }
}

// Update password
export async function updatePassword(newPassword: string) {
  const supabase = createClient()
  
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  })
  
  return { error }
}

// Send password reset email
export async function sendPasswordResetEmail(email: string) {
  const supabase = createClient()
  
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`
  })
  
  return { error }
}

// Verify email with OTP
export async function verifyEmail(email: string, token: string) {
  const supabase = createClient()
  
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email'
  })
  
  return { error }
}

// Check if user has role
export async function hasRole(userId: string, requiredRole: UserRole | UserRole[]) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single()
  
  if (error || !data) {
    return false
  }
  
  const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
  return roles.includes(data.role)
}

// Check if user can perform action
export async function canPerformAction(
  userId: string,
  action: string,
  resource?: string
): Promise<boolean> {
  const supabase = createClient()
  
  // Get user role
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('role')
    .eq('id', userId)
    .single()
  
  if (userError || !userData) {
    return false
  }
  
  // Define permissions based on roles
  const permissions: Record<UserRole, string[]> = {
    admin: ['*'], // Admin can do everything
    ops_lead: [
      'create_incident',
      'update_incident',
      'delete_incident',
      'manage_users',
      'manage_network',
      'view_all_data'
    ],
    legal_lead: [
      'create_case',
      'update_case',
      'manage_attorneys',
      'manage_bond_fund',
      'view_all_legal',
      'approve_foia'
    ],
    attorney: [
      'view_cases',
      'update_own_cases',
      'upload_documents',
      'communicate_clients',
      'view_evidence'
    ],
    member: [
      'create_incident',
      'view_incident',
      'create_foia',
      'view_foia',
      'upload_evidence',
      'view_evidence',
      'view_rights',
      'connect_network'
    ],
    viewer: [
      'view_incident',
      'view_foia',
      'view_evidence',
      'view_rights'
    ]
  }
  
  const userPermissions = permissions[userData.role as UserRole] || []
  
  // Check if user has permission
  return userPermissions.includes('*') || userPermissions.includes(action)
}

// Refresh session
export async function refreshSession() {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.refreshSession()
  
  return { session: data?.session, error }
}

// Sign in with OAuth provider
export async function signInWithProvider(
  provider: 'google' | 'github',
  redirectTo?: string
) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      }
    }
  })
  
  return { data, error }
}

// Handle OAuth callback
export async function handleAuthCallback() {
  const supabase = createClient()
  
  // Exchange code for session
  const { data, error } = await supabase.auth.exchangeCodeForSession(
    window.location.href
  )
  
  if (!error && data.user) {
    // Check if user profile exists
    const { data: profile } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single()
    
    // Create profile if it doesn't exist
    if (!profile) {
      await supabase.from('users').insert({
        id: data.user.id,
        email: data.user.email!,
        full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || '',
        role: 'member',
        avatar_url: data.user.user_metadata?.avatar_url || data.user.user_metadata?.picture,
      })
    }
  }
  
  return { user: data?.user, session: data?.session, error }
}
