// Client exports
export { createClient } from './client'
export { createClient as createServerClient } from './server'

// Auth exports
export {
  signUp,
  signIn,
  signOut,
  getCurrentUser,
  updatePassword,
  sendPasswordResetEmail,
  verifyEmail,
  hasRole,
  canPerformAction,
  refreshSession
} from './auth-helpers'

// Database operation exports
export {
  // User operations
  getUserById,
  updateUserProfile,
  
  // Rights Information operations
  getRightsInformation,
  createRightsInfo,
  
  // Rapid Response Incidents operations
  getIncidents,
  createIncident,
  updateIncidentStatus,
  
  // FOIA Requests operations
  getFOIARequests,
  createFOIARequest,
  
  // Evidence Vault operations
  getEvidenceByIncident,
  uploadEvidence,
  
  // Network Connections operations
  getUserConnections,
  requestConnection,
  
  // Activity Logging
  logActivity,
  
  // Comments operations
  getCommentsByIncident,
  addComment
} from './db-helpers'

// Storage operation exports
export {
  initializeStorageBuckets,
  uploadEvidenceFile,
  uploadDocumentFile,
  uploadAvatarImage,
  getSignedUrl,
  deleteFile,
  listFiles,
  calculateFileHash
} from './storage-helpers'

// Type exports
export type { Database } from '@/types/supabase'
