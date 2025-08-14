export type CooperativeMemberStatus = 'active' | 'pending' | 'suspended' | 'inactive'
export type LegalCaseStatus = 'open' | 'in_progress' | 'closed' | 'appeal' | 'dismissed'
export type CaseType = 'protest' | 'civil_rights' | 'wrongful_arrest' | 'police_brutality' | 'other'
export type AttorneySpecialization = 'criminal' | 'civil_rights' | 'constitutional' | 'protest' | 'appeals' | 'general'
export type DocumentType = 'complaint' | 'evidence' | 'motion' | 'brief' | 'court_order' | 'police_report' | 'witness_statement' | 'other'

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
  emergency_contact?: {
    name: string
    phone: string
    relationship: string
  }
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

export interface BondContribution {
  id: string
  fund_id: string
  member_id: string
  amount: number
  contribution_date: string
  payment_method?: 'cash' | 'check' | 'bank_transfer' | 'card' | 'crypto'
  transaction_id?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface BondDisbursement {
  id: string
  fund_id: string
  case_id: string
  beneficiary_name: string
  amount: number
  disbursement_date: string
  purpose: string
  approved_by: string
  receipt_url?: string
  notes?: string
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
  documents?: CaseDocument[]
  notes?: CaseNote[]
  metadata?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface CaseDocument {
  id: string
  case_id: string
  document_type: DocumentType
  title: string
  description?: string
  file_url: string
  file_size?: number
  uploaded_by: string
  is_confidential: boolean
  created_at: string
}

export interface CaseNote {
  id: string
  case_id: string
  author_id: string
  author_name: string
  content: string
  is_private: boolean
  created_at: string
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

export interface AttorneyMatch {
  id: string
  case_id: string
  attorney_id: string
  match_score: number
  match_reasons: string[]
  status: 'proposed' | 'accepted' | 'declined' | 'completed'
  proposed_date: string
  response_date?: string
  completion_date?: string
  client_feedback?: number
  attorney_notes?: string
  created_at: string
  updated_at: string
}

export interface BondCalculation {
  principal: number
  interest_rate: number
  term_months: number
  monthly_payment: number
  total_interest: number
  total_amount: number
  payment_schedule: {
    payment_number: number
    payment_date: string
    principal_payment: number
    interest_payment: number
    total_payment: number
    remaining_balance: number
  }[]
}

export interface CooperativeStats {
  total_members: number
  active_members: number
  total_funds_raised: number
  total_funds_disbursed: number
  active_cases: number
  resolved_cases: number
  volunteer_attorneys: number
  average_case_duration: number
  success_rate: number
}
