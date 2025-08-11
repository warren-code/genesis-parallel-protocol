-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('ops_lead', 'legal_lead', 'admin', 'viewer');
CREATE TYPE incident_status AS ENUM ('open', 'investigating', 'resolved', 'archived');
CREATE TYPE claim_status AS ENUM ('unverified', 'investigating', 'debunked', 'confirmed', 'partially_true');

-- Create users table with roles
CREATE TABLE public.users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'viewer',
    full_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create incident reports table
CREATE TABLE public.incident_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    report_date DATE NOT NULL,
    agency TEXT NOT NULL,
    location TEXT NOT NULL,
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8),
    description TEXT NOT NULL,
    evidence_links TEXT[],
    evidence_files TEXT[],
    status incident_status DEFAULT 'open',
    priority INTEGER CHECK (priority >= 1 AND priority <= 5),
    reported_by UUID REFERENCES public.users(id),
    assigned_to UUID REFERENCES public.users(id),
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create vendor audits table
CREATE TABLE public.vendor_audits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    agency TEXT NOT NULL,
    vendor_name TEXT NOT NULL,
    contract_value NUMERIC(15, 2),
    contract_start_date DATE,
    contract_end_date DATE,
    data_types TEXT[],
    surveillance_capabilities TEXT[],
    audit_date DATE NOT NULL,
    audit_findings TEXT,
    risk_level INTEGER CHECK (risk_level >= 1 AND risk_level <= 5),
    compliance_issues TEXT[],
    recommendations TEXT,
    audited_by UUID REFERENCES public.users(id),
    documents TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create memory archive table
CREATE TABLE public.memory_archive (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    archive_date DATE NOT NULL,
    location TEXT NOT NULL,
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8),
    tactic_class TEXT NOT NULL,
    description TEXT,
    evidence_links TEXT[],
    depth_score INTEGER CHECK (depth_score >= 1 AND depth_score <= 10),
    related_incidents UUID[],
    tags TEXT[],
    archived_by UUID REFERENCES public.users(id),
    verification_status TEXT DEFAULT 'pending',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create lie to truth map table
CREATE TABLE public.lie_truth_map (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    claim TEXT NOT NULL,
    claim_source TEXT,
    claim_date DATE,
    counter_evidence TEXT[],
    truth_statement TEXT,
    evidence_documents TEXT[],
    status claim_status DEFAULT 'unverified',
    confidence_score NUMERIC(3, 2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
    impact_assessment TEXT,
    debunked_by UUID REFERENCES public.users(id),
    related_incidents UUID[],
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_incident_reports_agency ON public.incident_reports(agency);
CREATE INDEX idx_incident_reports_status ON public.incident_reports(status);
CREATE INDEX idx_incident_reports_date ON public.incident_reports(report_date);
CREATE INDEX idx_vendor_audits_agency ON public.vendor_audits(agency);
CREATE INDEX idx_vendor_audits_vendor ON public.vendor_audits(vendor_name);
CREATE INDEX idx_memory_archive_location ON public.memory_archive(location);
CREATE INDEX idx_memory_archive_tactic ON public.memory_archive(tactic_class);
CREATE INDEX idx_lie_truth_map_status ON public.lie_truth_map(status);

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.incident_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vendor_audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memory_archive ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lie_truth_map ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view all users" ON public.users
    FOR SELECT USING (true);

CREATE POLICY "Only admins can insert users" ON public.users
    FOR INSERT WITH CHECK (
        auth.uid() IN (
            SELECT id FROM public.users WHERE role = 'admin'
        )
    );

CREATE POLICY "Only admins can update users" ON public.users
    FOR UPDATE USING (
        auth.uid() IN (
            SELECT id FROM public.users WHERE role = 'admin'
        )
    );

-- RLS Policies for incident_reports
CREATE POLICY "All authenticated users can view incident reports" ON public.incident_reports
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Ops and Legal leads can insert incident reports" ON public.incident_reports
    FOR INSERT WITH CHECK (
        auth.uid() IN (
            SELECT id FROM public.users WHERE role IN ('ops_lead', 'legal_lead', 'admin')
        )
    );

CREATE POLICY "Ops and Legal leads can update incident reports" ON public.incident_reports
    FOR UPDATE USING (
        auth.uid() IN (
            SELECT id FROM public.users WHERE role IN ('ops_lead', 'legal_lead', 'admin')
        )
        OR auth.uid() = assigned_to
    );

-- RLS Policies for vendor_audits
CREATE POLICY "All authenticated users can view vendor audits" ON public.vendor_audits
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Legal leads can manage vendor audits" ON public.vendor_audits
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM public.users WHERE role IN ('legal_lead', 'admin')
        )
    );

-- RLS Policies for memory_archive
CREATE POLICY "All authenticated users can view memory archive" ON public.memory_archive
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Ops leads can manage memory archive" ON public.memory_archive
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM public.users WHERE role IN ('ops_lead', 'admin')
        )
    );

-- RLS Policies for lie_truth_map
CREATE POLICY "All authenticated users can view lie truth map" ON public.lie_truth_map
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "All leads can manage lie truth map" ON public.lie_truth_map
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM public.users WHERE role IN ('ops_lead', 'legal_lead', 'admin')
        )
    );

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_incident_reports_updated_at BEFORE UPDATE ON public.incident_reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendor_audits_updated_at BEFORE UPDATE ON public.vendor_audits
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_memory_archive_updated_at BEFORE UPDATE ON public.memory_archive
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lie_truth_map_updated_at BEFORE UPDATE ON public.lie_truth_map
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
