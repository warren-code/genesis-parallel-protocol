export type UserRole = 'ops_lead' | 'legal_lead' | 'admin' | 'viewer' | 'attorney' | 'member'
export type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'archived'
export type ClaimStatus = 'unverified' | 'investigating' | 'debunked' | 'confirmed' | 'partially_true'
export type CooperativeMemberStatus = 'active' | 'pending' | 'suspended' | 'inactive'
export type LegalCaseStatus = 'open' | 'in_progress' | 'closed' | 'appeal' | 'dismissed'
export type CaseType = 'protest' | 'civil_rights' | 'wrongful_arrest' | 'police_brutality' | 'other'
export type AttorneySpecialization = 'criminal' | 'civil_rights' | 'constitutional' | 'protest' | 'appeals' | 'general'
export type DocumentType = 'complaint' | 'evidence' | 'motion' | 'brief' | 'court_order' | 'police_report' | 'witness_statement' | 'other'
export type FOIARequestStatus = 'draft' | 'submitted' | 'acknowledged' | 'processing' | 'fulfilled' | 'denied' | 'appealed' | 'closed'

export interface User {
  id: string
  email: string
  role: UserRole
  full_name?: string
  organization?: string
  bio?: string
  skills?: string[]
  interests?: string[]
  availability?: 'always' | 'weekdays' | 'weekends' | 'occasionally'
  avatar_url?: string
  onboarded?: boolean
  created_at: string
  updated_at: string
}

export interface IncidentReport {
  id: string
  report_date: string
  agency: string
  location: string
  latitude?: number
  longitude?: number
  description: string
  evidence_links?: string[]
  evidence_files?: string[]
  status: IncidentStatus
  priority?: number
  reported_by?: string
  assigned_to?: string
  tags?: string[]
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface VendorAudit {
  id: string
  agency: string
  vendor_name: string
  contract_value?: number
  contract_start_date?: string
  contract_end_date?: string
  data_types?: string[]
  surveillance_capabilities?: string[]
  audit_date: string
  audit_findings?: string
  risk_level?: number
  compliance_issues?: string[]
  recommendations?: string
  audited_by?: string
  documents?: string[]
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface MemoryArchive {
  id: string
  archive_date: string
  location: string
  latitude?: number
  longitude?: number
  tactic_class: string
  description?: string
  evidence_links?: string[]
  depth_score?: number
  related_incidents?: string[]
  tags?: string[]
  archived_by?: string
  verification_status?: string
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface LieTruthMap {
  id: string
  claim: string
  claim_source?: string
  claim_date?: string
  counter_evidence?: string[]
  truth_statement?: string
  evidence_documents?: string[]
  status: ClaimStatus
  confidence_score?: number
  impact_assessment?: string
  debunked_by?: string
  related_incidents?: string[]
  tags?: string[]
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface CooperativeMember {
  id: string
  email: string
  full_name: string
  phone?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  status: CooperativeMemberStatus
  member_since: string
  contribution_amount?: number
  contribution_frequency?: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'annually'
  cases_helped?: number
  total_contributed?: number
  emergency_contact?: Record<string, any>
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface BondFund {
  id: string
  name: string
  description?: string
  target_amount: number
  current_amount: number
  disbursed_amount: number
  available_amount: number
  status: 'active' | 'paused' | 'closed'
  created_by: string
  managed_by?: string[]
  beneficiaries_count?: number
  contribution_count?: number
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface LegalCase {
  id: string
  case_number?: string
  title: string
  type: CaseType
  status: LegalCaseStatus
  client_name: string
  client_id?: string
  attorney_id?: string
  description: string
  incident_date: string
  arrest_date?: string
  court_date?: string
  court_name?: string
  judge_name?: string
  prosecutor?: string
  charges?: string[]
  bail_amount?: number
  bond_posted?: boolean
  bond_disbursement_id?: string
  outcome?: string
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface RapidResponseIncident {
  id: string
  title: string
  description: string
  location: string
  latitude?: number
  longitude?: number
  incident_date: string
  status: IncidentStatus
  priority: number
  reported_by: string
  assigned_to?: string
  resolved_at?: string
  resolution_notes?: string
  created_at: string
  updated_at: string
}

export interface FOIARequest {
  id: string
  request_number?: string
  agency: string
  subject: string
  description: string
  status: FOIARequestStatus
  submitted_date?: string
  response_date?: string
  requested_by: string
  documents?: string[]
  created_at: string
  updated_at: string
}

export interface EvidenceVault {
  id: string
  title: string
  description?: string
  file_url: string
  file_type: string
  file_size?: number
  incident_id?: string
  case_id?: string
  uploaded_by: string
  verified?: boolean
  created_at: string
  updated_at: string
}

export interface RightsInformation {
  id: string
  title: string
  content: string
  category: string
  tags?: string[]
  author_id: string
  published?: boolean
  created_at: string
  updated_at: string
}

export interface Comment {
  id: string
  content: string
  entity_type: string
  entity_id: string
  author_id: string
  parent_id?: string
  created_at: string
  updated_at: string
}

export interface VolunteerAttorney {
  id: string
  user_id?: string
  full_name: string
  email: string
  phone: string
  bar_number: string
  bar_state: string
  firm_name?: string
  specializations: AttorneySpecialization[]
  years_experience: number
  pro_bono_hours_available?: number
  cases_handled?: number
  availability?: 'immediate' | 'within_week' | 'within_month' | 'on_call'
  languages?: string[]
  verified: boolean
  verified_date?: string
  rating?: number
  reviews_count?: number
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: User
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<User, 'id' | 'created_at' | 'updated_at'>>
      }
      incident_reports: {
        Row: IncidentReport
        Insert: Omit<IncidentReport, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<IncidentReport, 'id' | 'created_at' | 'updated_at'>>
      }
      vendor_audits: {
        Row: VendorAudit
        Insert: Omit<VendorAudit, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<VendorAudit, 'id' | 'created_at' | 'updated_at'>>
      }
      memory_archive: {
        Row: MemoryArchive
        Insert: Omit<MemoryArchive, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<MemoryArchive, 'id' | 'created_at' | 'updated_at'>>
      }
      lie_truth_map: {
        Row: LieTruthMap
        Insert: Omit<LieTruthMap, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<LieTruthMap, 'id' | 'created_at' | 'updated_at'>>
      }
      cooperative_members: {
        Row: CooperativeMember
        Insert: Omit<CooperativeMember, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<CooperativeMember, 'id' | 'created_at' | 'updated_at'>>
      }
      bond_funds: {
        Row: BondFund
        Insert: Omit<BondFund, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<BondFund, 'id' | 'created_at' | 'updated_at'>>
      }
      legal_cases: {
        Row: LegalCase
        Insert: Omit<LegalCase, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<LegalCase, 'id' | 'created_at' | 'updated_at'>>
      }
      volunteer_attorneys: {
        Row: VolunteerAttorney
        Insert: Omit<VolunteerAttorney, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<VolunteerAttorney, 'id' | 'created_at' | 'updated_at'>>
      }
      rapid_response_incidents: {
        Row: RapidResponseIncident
        Insert: Omit<RapidResponseIncident, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<RapidResponseIncident, 'id' | 'created_at' | 'updated_at'>>
      }
      foia_requests: {
        Row: FOIARequest
        Insert: Omit<FOIARequest, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<FOIARequest, 'id' | 'created_at' | 'updated_at'>>
      }
      evidence_vault: {
        Row: EvidenceVault
        Insert: Omit<EvidenceVault, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<EvidenceVault, 'id' | 'created_at' | 'updated_at'>>
      }
      rights_information: {
        Row: RightsInformation
        Insert: Omit<RightsInformation, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<RightsInformation, 'id' | 'created_at' | 'updated_at'>>
      }
      comments: {
        Row: Comment
        Insert: Omit<Comment, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Comment, 'id' | 'created_at' | 'updated_at'>>
      }
    }
    Enums: {
      user_role: UserRole
      incident_status: IncidentStatus
      claim_status: ClaimStatus
      cooperative_member_status: CooperativeMemberStatus
      legal_case_status: LegalCaseStatus
      case_type: CaseType
      attorney_specialization: AttorneySpecialization
      document_type: DocumentType
    }
  }
}
