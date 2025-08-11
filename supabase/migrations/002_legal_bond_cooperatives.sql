-- Create cooperative_members table
CREATE TABLE IF NOT EXISTS cooperative_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT,
  zip_code TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'pending', 'suspended', 'inactive')),
  member_since TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  contribution_amount NUMERIC,
  contribution_frequency TEXT CHECK (contribution_frequency IN ('weekly', 'biweekly', 'monthly', 'quarterly', 'annually')),
  cases_helped INTEGER DEFAULT 0,
  total_contributed NUMERIC DEFAULT 0,
  emergency_contact JSONB,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create bond_funds table
CREATE TABLE IF NOT EXISTS bond_funds (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  target_amount NUMERIC NOT NULL,
  current_amount NUMERIC NOT NULL DEFAULT 0,
  disbursed_amount NUMERIC NOT NULL DEFAULT 0,
  available_amount NUMERIC GENERATED ALWAYS AS (current_amount - disbursed_amount) STORED,
  status TEXT NOT NULL CHECK (status IN ('active', 'paused', 'closed')),
  created_by UUID REFERENCES auth.users(id),
  managed_by TEXT[],
  beneficiaries_count INTEGER DEFAULT 0,
  contribution_count INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create volunteer_attorneys table
CREATE TABLE IF NOT EXISTS volunteer_attorneys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  bar_number TEXT NOT NULL,
  bar_state TEXT NOT NULL,
  firm_name TEXT,
  specializations TEXT[] NOT NULL,
  years_experience INTEGER NOT NULL,
  pro_bono_hours_available INTEGER,
  cases_handled INTEGER DEFAULT 0,
  availability TEXT CHECK (availability IN ('immediate', 'within_week', 'within_month', 'on_call')),
  languages TEXT[],
  verified BOOLEAN DEFAULT FALSE,
  verified_date TIMESTAMPTZ,
  rating NUMERIC,
  reviews_count INTEGER DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(bar_number, bar_state)
);

-- Create legal_cases table
CREATE TABLE IF NOT EXISTS legal_cases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_number TEXT UNIQUE,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('protest', 'civil_rights', 'wrongful_arrest', 'police_brutality', 'other')),
  status TEXT NOT NULL CHECK (status IN ('open', 'in_progress', 'closed', 'appeal', 'dismissed')),
  client_name TEXT NOT NULL,
  client_id UUID REFERENCES cooperative_members(id),
  attorney_id UUID REFERENCES volunteer_attorneys(id),
  description TEXT NOT NULL,
  incident_date DATE NOT NULL,
  arrest_date DATE,
  court_date DATE,
  court_name TEXT,
  judge_name TEXT,
  prosecutor TEXT,
  charges TEXT[],
  bail_amount NUMERIC,
  bond_posted BOOLEAN DEFAULT FALSE,
  bond_disbursement_id UUID,
  outcome TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create bond_contributions table
CREATE TABLE IF NOT EXISTS bond_contributions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fund_id UUID NOT NULL REFERENCES bond_funds(id),
  member_id UUID NOT NULL REFERENCES cooperative_members(id),
  amount NUMERIC NOT NULL CHECK (amount > 0),
  contribution_date DATE NOT NULL DEFAULT CURRENT_DATE,
  payment_method TEXT CHECK (payment_method IN ('cash', 'check', 'bank_transfer', 'card', 'crypto')),
  transaction_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create bond_disbursements table
CREATE TABLE IF NOT EXISTS bond_disbursements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  fund_id UUID NOT NULL REFERENCES bond_funds(id),
  case_id UUID NOT NULL REFERENCES legal_cases(id),
  beneficiary_name TEXT NOT NULL,
  amount NUMERIC NOT NULL CHECK (amount > 0),
  disbursement_date DATE NOT NULL DEFAULT CURRENT_DATE,
  purpose TEXT NOT NULL,
  approved_by UUID REFERENCES auth.users(id),
  receipt_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create case_documents table
CREATE TABLE IF NOT EXISTS case_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES legal_cases(id),
  document_type TEXT NOT NULL CHECK (document_type IN ('complaint', 'evidence', 'motion', 'brief', 'court_order', 'police_report', 'witness_statement', 'other')),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  uploaded_by UUID REFERENCES auth.users(id),
  is_confidential BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create case_notes table
CREATE TABLE IF NOT EXISTS case_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES legal_cases(id),
  author_id UUID NOT NULL REFERENCES auth.users(id),
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  is_private BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create attorney_matches table
CREATE TABLE IF NOT EXISTS attorney_matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  case_id UUID NOT NULL REFERENCES legal_cases(id),
  attorney_id UUID NOT NULL REFERENCES volunteer_attorneys(id),
  match_score INTEGER NOT NULL,
  match_reasons TEXT[],
  status TEXT NOT NULL CHECK (status IN ('proposed', 'accepted', 'declined', 'completed')),
  proposed_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  response_date TIMESTAMPTZ,
  completion_date TIMESTAMPTZ,
  client_feedback INTEGER CHECK (client_feedback >= 1 AND client_feedback <= 5),
  attorney_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(case_id, attorney_id)
);

-- Create indexes for better performance
CREATE INDEX idx_cooperative_members_status ON cooperative_members(status);
CREATE INDEX idx_cooperative_members_city_state ON cooperative_members(city, state);
CREATE INDEX idx_bond_funds_status ON bond_funds(status);
CREATE INDEX idx_legal_cases_status ON legal_cases(status);
CREATE INDEX idx_legal_cases_type ON legal_cases(type);
CREATE INDEX idx_legal_cases_client_id ON legal_cases(client_id);
CREATE INDEX idx_legal_cases_attorney_id ON legal_cases(attorney_id);
CREATE INDEX idx_volunteer_attorneys_specializations ON volunteer_attorneys USING GIN(specializations);
CREATE INDEX idx_volunteer_attorneys_availability ON volunteer_attorneys(availability);
CREATE INDEX idx_case_documents_case_id ON case_documents(case_id);
CREATE INDEX idx_attorney_matches_case_id ON attorney_matches(case_id);
CREATE INDEX idx_attorney_matches_attorney_id ON attorney_matches(attorney_id);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cooperative_members_updated_at BEFORE UPDATE ON cooperative_members
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bond_funds_updated_at BEFORE UPDATE ON bond_funds
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_volunteer_attorneys_updated_at BEFORE UPDATE ON volunteer_attorneys
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_legal_cases_updated_at BEFORE UPDATE ON legal_cases
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bond_contributions_updated_at BEFORE UPDATE ON bond_contributions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bond_disbursements_updated_at BEFORE UPDATE ON bond_disbursements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_attorney_matches_updated_at BEFORE UPDATE ON attorney_matches
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create RLS policies
ALTER TABLE cooperative_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE bond_funds ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_attorneys ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE bond_contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE bond_disbursements ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE attorney_matches ENABLE ROW LEVEL SECURITY;

-- Policies for cooperative_members
CREATE POLICY "Cooperative members are viewable by authenticated users" ON cooperative_members
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Cooperative members can update their own profile" ON cooperative_members
  FOR UPDATE USING (auth.uid()::text = email);

CREATE POLICY "Admin and legal_lead can manage cooperative members" ON cooperative_members
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'legal_lead')
    )
  );

-- Policies for legal_cases
CREATE POLICY "Legal cases are viewable by authenticated users" ON legal_cases
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Clients can view their own cases" ON legal_cases
  FOR SELECT USING (
    client_id IN (
      SELECT id FROM cooperative_members 
      WHERE email = auth.uid()::text
    )
  );

CREATE POLICY "Attorneys can view their assigned cases" ON legal_cases
  FOR SELECT USING (
    attorney_id IN (
      SELECT id FROM volunteer_attorneys 
      WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Admin and legal_lead can manage all cases" ON legal_cases
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'legal_lead')
    )
  );

-- Policies for case_documents
CREATE POLICY "Case documents are viewable by case participants" ON case_documents
  FOR SELECT USING (
    case_id IN (
      SELECT id FROM legal_cases
      WHERE client_id IN (
        SELECT id FROM cooperative_members 
        WHERE email = auth.uid()::text
      )
      OR attorney_id IN (
        SELECT id FROM volunteer_attorneys 
        WHERE user_id = auth.uid()
      )
    )
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'legal_lead')
    )
  );

-- Add more RLS policies as needed for other tables...
