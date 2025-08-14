import type { 
  CooperativeMember, 
  VolunteerAttorney, 
  LegalCase, 
  BondFund,
  BondContribution,
  BondDisbursement
} from '../types'

export const mockMembers: CooperativeMember[] = [
  {
    id: '1',
    email: 'sarah.johnson@email.com',
    full_name: 'Sarah Johnson',
    phone: '555-0123',
    city: 'Oakland',
    state: 'CA',
    status: 'active',
    member_since: '2023-01-15',
    contribution_amount: 50,
    contribution_frequency: 'monthly',
    cases_helped: 3,
    total_contributed: 600,
    emergency_contact: {
      name: 'Michael Johnson',
      phone: '555-0124',
      relationship: 'Spouse'
    },
    created_at: '2023-01-15T10:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    email: 'marcus.williams@email.com',
    full_name: 'Marcus Williams',
    phone: '555-0125',
    city: 'San Francisco',
    state: 'CA',
    status: 'active',
    member_since: '2023-03-20',
    contribution_amount: 100,
    contribution_frequency: 'monthly',
    cases_helped: 5,
    total_contributed: 1000,
    created_at: '2023-03-20T10:00:00Z',
    updated_at: '2024-03-20T10:00:00Z'
  },
  {
    id: '3',
    email: 'elena.rodriguez@email.com',
    full_name: 'Elena Rodriguez',
    phone: '555-0126',
    city: 'Berkeley',
    state: 'CA',
    status: 'active',
    member_since: '2023-06-10',
    contribution_amount: 25,
    contribution_frequency: 'biweekly',
    cases_helped: 2,
    total_contributed: 650,
    created_at: '2023-06-10T10:00:00Z',
    updated_at: '2024-06-10T10:00:00Z'
  },
  {
    id: '4',
    email: 'james.chen@email.com',
    full_name: 'James Chen',
    phone: '555-0127',
    city: 'San Jose',
    state: 'CA',
    status: 'pending',
    member_since: '2024-01-01',
    contribution_amount: 75,
    contribution_frequency: 'monthly',
    cases_helped: 0,
    total_contributed: 0,
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z'
  }
]

export const mockAttorneys: VolunteerAttorney[] = [
  {
    id: '1',
    full_name: 'Amanda Torres, Esq.',
    email: 'atorres@lawfirm.com',
    phone: '555-1001',
    bar_number: 'CA123456',
    bar_state: 'CA',
    firm_name: 'Torres & Associates',
    specializations: ['civil_rights', 'protest', 'constitutional'],
    years_experience: 15,
    pro_bono_hours_available: 20,
    cases_handled: 45,
    availability: 'within_week',
    languages: ['English', 'Spanish'],
    verified: true,
    verified_date: '2023-01-10',
    rating: 4.8,
    reviews_count: 32,
    created_at: '2023-01-10T10:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    full_name: 'David Park, Esq.',
    email: 'dpark@parklaw.com',
    phone: '555-1002',
    bar_number: 'CA789012',
    bar_state: 'CA',
    firm_name: 'Park Law Group',
    specializations: ['criminal', 'protest', 'appeals'],
    years_experience: 20,
    pro_bono_hours_available: 15,
    cases_handled: 78,
    availability: 'immediate',
    languages: ['English', 'Korean'],
    verified: true,
    verified_date: '2023-02-15',
    rating: 4.9,
    reviews_count: 56,
    created_at: '2023-02-15T10:00:00Z',
    updated_at: '2024-02-15T10:00:00Z'
  },
  {
    id: '3',
    full_name: 'Nicole Washington, Esq.',
    email: 'nwashington@justice.law',
    phone: '555-1003',
    bar_number: 'CA345678',
    bar_state: 'CA',
    specializations: ['civil_rights', 'constitutional', 'general'],
    years_experience: 8,
    pro_bono_hours_available: 30,
    cases_handled: 23,
    availability: 'within_week',
    languages: ['English'],
    verified: true,
    verified_date: '2023-05-20',
    rating: 4.7,
    reviews_count: 18,
    created_at: '2023-05-20T10:00:00Z',
    updated_at: '2024-05-20T10:00:00Z'
  }
]

export const mockCases: LegalCase[] = [
  {
    id: '1',
    case_number: 'LC-2024-001',
    title: 'Peaceful Protest Arrest - Downtown Oakland',
    type: 'protest',
    status: 'in_progress',
    client_name: 'Alex Thompson',
    attorney_id: '1',
    description: 'Client was arrested during peaceful BLM protest. Charges include unlawful assembly and failure to disperse.',
    incident_date: '2024-01-15',
    arrest_date: '2024-01-15',
    court_date: '2024-02-20',
    court_name: 'Alameda County Superior Court',
    judge_name: 'Hon. Maria Gonzalez',
    charges: ['Unlawful assembly', 'Failure to disperse'],
    bail_amount: 5000,
    bond_posted: true,
    bond_disbursement_id: 'BD-001',
    created_at: '2024-01-16T10:00:00Z',
    updated_at: '2024-01-20T10:00:00Z'
  },
  {
    id: '2',
    case_number: 'LC-2024-002',
    title: 'Police Brutality During Traffic Stop',
    type: 'police_brutality',
    status: 'open',
    client_name: 'Maria Santos',
    description: 'Client was subjected to excessive force during routine traffic stop. Seeking damages and accountability.',
    incident_date: '2024-01-20',
    charges: [],
    created_at: '2024-01-21T10:00:00Z',
    updated_at: '2024-01-21T10:00:00Z'
  },
  {
    id: '3',
    case_number: 'LC-2023-089',
    title: 'Wrongful Arrest - Mistaken Identity',
    type: 'wrongful_arrest',
    status: 'closed',
    client_name: 'Robert Davis',
    attorney_id: '2',
    description: 'Client was wrongfully arrested due to mistaken identity. All charges dropped.',
    incident_date: '2023-10-05',
    arrest_date: '2023-10-05',
    court_date: '2023-11-15',
    court_name: 'San Francisco Superior Court',
    charges: ['Armed robbery'],
    bail_amount: 50000,
    bond_posted: true,
    outcome: 'All charges dismissed. Civil suit pending.',
    created_at: '2023-10-06T10:00:00Z',
    updated_at: '2023-11-20T10:00:00Z'
  }
]

export const mockBondFunds: BondFund[] = [
  {
    id: '1',
    name: 'Oakland Community Bail Fund',
    description: 'Community-funded bail support for activists and protesters in Oakland area',
    target_amount: 100000,
    current_amount: 75000,
    disbursed_amount: 45000,
    available_amount: 30000,
    status: 'active',
    created_by: 'admin',
    managed_by: ['admin', 'treasurer1'],
    beneficiaries_count: 23,
    contribution_count: 156,
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Emergency Legal Defense Fund',
    description: 'Rapid response fund for urgent legal defense needs',
    target_amount: 50000,
    current_amount: 35000,
    disbursed_amount: 20000,
    available_amount: 15000,
    status: 'active',
    created_by: 'admin',
    managed_by: ['admin', 'legal_lead'],
    beneficiaries_count: 15,
    contribution_count: 89,
    created_at: '2023-03-15T00:00:00Z',
    updated_at: '2024-01-10T10:00:00Z'
  }
]

export const mockContributions: BondContribution[] = [
  {
    id: '1',
    fund_id: '1',
    member_id: '1',
    amount: 50,
    contribution_date: '2024-01-01',
    payment_method: 'bank_transfer',
    created_at: '2024-01-01T10:00:00Z',
    updated_at: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    fund_id: '1',
    member_id: '2',
    amount: 100,
    contribution_date: '2024-01-01',
    payment_method: 'card',
    created_at: '2024-01-01T11:00:00Z',
    updated_at: '2024-01-01T11:00:00Z'
  }
]

export const mockDisbursements: BondDisbursement[] = [
  {
    id: 'BD-001',
    fund_id: '1',
    case_id: '1',
    beneficiary_name: 'Alex Thompson',
    amount: 5000,
    disbursement_date: '2024-01-16',
    purpose: 'Bail payment for protest arrest',
    approved_by: 'admin',
    created_at: '2024-01-16T09:00:00Z',
    updated_at: '2024-01-16T09:00:00Z'
  }
]
