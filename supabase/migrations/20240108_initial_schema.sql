-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create enum types for user roles
CREATE TYPE user_role AS ENUM ('organizer', 'city_staff', 'advocate', 'admin');

-- Create enum types for incident status
CREATE TYPE incident_status AS ENUM ('reported', 'investigating', 'resolved', 'escalated');

-- Create enum types for FOIA request status
CREATE TYPE foia_status AS ENUM ('draft', 'submitted', 'acknowledged', 'processing', 'completed', 'appealed', 'denied');

-- Create enum types for evidence status
CREATE TYPE evidence_status AS ENUM ('uploaded', 'verified', 'disputed', 'archived');

-- Users table with roles
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role user_role NOT NULL DEFAULT 'advocate',
    organization TEXT,
    phone_number TEXT,
    avatar_url TEXT,
    bio TEXT,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rights information table
CREATE TABLE rights_information (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    is_published BOOLEAN DEFAULT false,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- SOPs (Standard Operating Procedures) documentation
CREATE TABLE sops_documentation (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    procedure_type TEXT NOT NULL,
    content TEXT NOT NULL,
    version VARCHAR(20) DEFAULT '1.0',
    is_current BOOLEAN DEFAULT true,
    tags TEXT[] DEFAULT '{}',
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    approved_by UUID REFERENCES users(id) ON DELETE SET NULL,
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Rapid response incidents
CREATE TABLE rapid_response_incidents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    incident_type TEXT NOT NULL,
    location TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    description TEXT NOT NULL,
    status incident_status DEFAULT 'reported',
    priority INTEGER DEFAULT 3 CHECK (priority >= 1 AND priority <= 5),
    reported_by UUID REFERENCES users(id) ON DELETE SET NULL,
    assigned_to UUID REFERENCES users(id) ON DELETE SET NULL,
    witness_count INTEGER DEFAULT 0,
    evidence_count INTEGER DEFAULT 0,
    resolution_notes TEXT,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FOIA requests
CREATE TABLE foia_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    request_number TEXT UNIQUE,
    agency_name TEXT NOT NULL,
    agency_contact TEXT,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    request_text TEXT NOT NULL,
    status foia_status DEFAULT 'draft',
    submitted_by UUID REFERENCES users(id) ON DELETE SET NULL,
    submitted_at TIMESTAMPTZ,
    acknowledged_at TIMESTAMPTZ,
    due_date DATE,
    response_received_at TIMESTAMPTZ,
    response_text TEXT,
    appeal_text TEXT,
    appeal_submitted_at TIMESTAMPTZ,
    documents_received TEXT[] DEFAULT '{}',
    fees_charged DECIMAL(10, 2),
    fees_paid BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Evidence vault entries
CREATE TABLE evidence_vault (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    file_type TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size BIGINT,
    mime_type TEXT,
    hash_value TEXT, -- For integrity verification
    status evidence_status DEFAULT 'uploaded',
    incident_id UUID REFERENCES rapid_response_incidents(id) ON DELETE CASCADE,
    foia_request_id UUID REFERENCES foia_requests(id) ON DELETE CASCADE,
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    verified_by UUID REFERENCES users(id) ON DELETE SET NULL,
    verified_at TIMESTAMPTZ,
    tags TEXT[] DEFAULT '{}',
    metadata JSONB DEFAULT '{}',
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Network connections (for connecting advocates, organizers, etc.)
CREATE TABLE network_connections (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    connected_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    connection_type TEXT NOT NULL, -- 'colleague', 'organization', 'trusted', etc.
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, connected_user_id)
);

-- Activity log for audit trail
CREATE TABLE activity_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Comments system for incidents and FOIA requests
CREATE TABLE comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    content TEXT NOT NULL,
    author_id UUID REFERENCES users(id) ON DELETE SET NULL,
    incident_id UUID REFERENCES rapid_response_incidents(id) ON DELETE CASCADE,
    foia_request_id UUID REFERENCES foia_requests(id) ON DELETE CASCADE,
    parent_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    is_internal BOOLEAN DEFAULT false, -- For internal notes
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CHECK (
        (incident_id IS NOT NULL AND foia_request_id IS NULL) OR
        (incident_id IS NULL AND foia_request_id IS NOT NULL)
    )
);

-- Tags for categorization
CREATE TABLE tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    category TEXT,
    color VARCHAR(7), -- Hex color code
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_rights_information_category ON rights_information(category);
CREATE INDEX idx_rights_information_tags ON rights_information USING GIN(tags);
CREATE INDEX idx_sops_documentation_category ON sops_documentation(category);
CREATE INDEX idx_rapid_response_incidents_status ON rapid_response_incidents(status);
CREATE INDEX idx_rapid_response_incidents_location ON rapid_response_incidents(latitude, longitude);
CREATE INDEX idx_foia_requests_status ON foia_requests(status);
CREATE INDEX idx_foia_requests_agency ON foia_requests(agency_name);
CREATE INDEX idx_evidence_vault_incident ON evidence_vault(incident_id);
CREATE INDEX idx_evidence_vault_foia ON evidence_vault(foia_request_id);
CREATE INDEX idx_network_connections_user ON network_connections(user_id);
CREATE INDEX idx_network_connections_connected ON network_connections(connected_user_id);
CREATE INDEX idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX idx_activity_logs_created ON activity_logs(created_at);
CREATE INDEX idx_comments_incident ON comments(incident_id);
CREATE INDEX idx_comments_foia ON comments(foia_request_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to tables
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rights_information_updated_at BEFORE UPDATE ON rights_information
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sops_documentation_updated_at BEFORE UPDATE ON sops_documentation
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rapid_response_incidents_updated_at BEFORE UPDATE ON rapid_response_incidents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_foia_requests_updated_at BEFORE UPDATE ON foia_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_evidence_vault_updated_at BEFORE UPDATE ON evidence_vault
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_network_connections_updated_at BEFORE UPDATE ON network_connections
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) Policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE rights_information ENABLE ROW LEVEL SECURITY;
ALTER TABLE sops_documentation ENABLE ROW LEVEL SECURITY;
ALTER TABLE rapid_response_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE foia_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_vault ENABLE ROW LEVEL SECURITY;
ALTER TABLE network_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- Basic RLS policies (you'll need to adjust these based on your specific requirements)
-- Users can read their own profile and public profiles
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id OR is_active = true);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Rights information is publicly readable when published
CREATE POLICY "Published rights info is public" ON rights_information
    FOR SELECT USING (is_published = true OR author_id = auth.uid());

CREATE POLICY "Authors can manage their rights info" ON rights_information
    FOR ALL USING (author_id = auth.uid());

-- Similar policies for other tables...
-- These are basic examples and should be expanded based on your specific access control needs
