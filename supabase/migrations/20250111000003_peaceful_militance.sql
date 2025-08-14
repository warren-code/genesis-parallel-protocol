-- Peaceful Militance Feature Tables

-- Create protest coordination table
CREATE TABLE public.peaceful_protests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    location TEXT NOT NULL,
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8),
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    organizer_id UUID REFERENCES public.users(id),
    expected_participants INTEGER,
    actual_participants INTEGER,
    type TEXT NOT NULL CHECK (type IN ('march', 'sit-in', 'vigil', 'boycott', 'strike', 'demonstration', 'other')),
    status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'active', 'completed', 'cancelled')),
    safety_coordinator_id UUID REFERENCES public.users(id),
    legal_observer_id UUID REFERENCES public.users(id),
    medic_coordinator_id UUID REFERENCES public.users(id),
    tags TEXT[],
    resources_needed TEXT[],
    permit_status TEXT CHECK (permit_status IN ('not_required', 'pending', 'approved', 'denied')),
    permit_number TEXT,
    emergency_contacts JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create incident tracking table for peaceful militance
CREATE TABLE public.peaceful_incidents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    protest_id UUID REFERENCES public.peaceful_protests(id),
    incident_type TEXT NOT NULL CHECK (incident_type IN ('police_aggression', 'counter_protest', 'medical_emergency', 'arrest', 'property_damage', 'de_escalation_success', 'other')),
    severity INTEGER CHECK (severity >= 1 AND severity <= 5),
    description TEXT NOT NULL,
    location TEXT,
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8),
    incident_time TIMESTAMPTZ NOT NULL,
    reported_by UUID REFERENCES public.users(id),
    witness_count INTEGER DEFAULT 0,
    evidence_links TEXT[],
    evidence_files TEXT[],
    response_actions TEXT[],
    resolution TEXT,
    status TEXT DEFAULT 'reported' CHECK (status IN ('reported', 'verified', 'investigating', 'resolved', 'disputed')),
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create resource sharing table
CREATE TABLE public.protest_resources (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    resource_type TEXT NOT NULL CHECK (resource_type IN ('supplies', 'transportation', 'legal_support', 'medical_support', 'communications', 'shelter', 'food_water', 'equipment', 'training', 'other')),
    name TEXT NOT NULL,
    description TEXT,
    quantity INTEGER,
    location TEXT,
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8),
    available_from TIMESTAMPTZ,
    available_until TIMESTAMPTZ,
    provider_id UUID REFERENCES public.users(id),
    contact_info JSONB,
    requirements TEXT,
    is_free BOOLEAN DEFAULT true,
    cost NUMERIC(10, 2),
    status TEXT DEFAULT 'available' CHECK (status IN ('available', 'reserved', 'in_use', 'unavailable')),
    protest_id UUID REFERENCES public.peaceful_protests(id),
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create training materials table
CREATE TABLE public.training_materials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('de_escalation', 'legal_rights', 'first_aid', 'organizing', 'communications', 'digital_security', 'direct_action', 'consensus_building', 'other')),
    description TEXT,
    content_type TEXT CHECK (content_type IN ('video', 'document', 'interactive', 'workshop', 'checklist')),
    content_url TEXT,
    duration_minutes INTEGER,
    difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    prerequisites TEXT[],
    learning_objectives TEXT[],
    created_by UUID REFERENCES public.users(id),
    approved_by UUID REFERENCES public.users(id),
    language TEXT DEFAULT 'en',
    tags TEXT[],
    view_count INTEGER DEFAULT 0,
    completion_count INTEGER DEFAULT 0,
    rating NUMERIC(3, 2),
    is_published BOOLEAN DEFAULT false,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create secure communication channels table
CREATE TABLE public.secure_channels (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    channel_name TEXT NOT NULL,
    channel_type TEXT CHECK (channel_type IN ('emergency', 'coordination', 'legal', 'medical', 'general')),
    encryption_type TEXT DEFAULT 'end-to-end',
    protest_id UUID REFERENCES public.peaceful_protests(id),
    created_by UUID REFERENCES public.users(id),
    max_participants INTEGER DEFAULT 100,
    is_active BOOLEAN DEFAULT true,
    join_code TEXT UNIQUE,
    expires_at TIMESTAMPTZ,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create channel participants table
CREATE TABLE public.channel_participants (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    channel_id UUID REFERENCES public.secure_channels(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id),
    role TEXT DEFAULT 'participant' CHECK (role IN ('admin', 'moderator', 'participant')),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    last_seen TIMESTAMPTZ DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    UNIQUE(channel_id, user_id)
);

-- Create alerts table
CREATE TABLE public.protest_alerts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    alert_type TEXT NOT NULL CHECK (alert_type IN ('urgent', 'safety', 'location_change', 'resource_needed', 'legal', 'medical', 'general')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    protest_id UUID REFERENCES public.peaceful_protests(id),
    location TEXT,
    latitude NUMERIC(10, 8),
    longitude NUMERIC(11, 8),
    severity INTEGER CHECK (severity >= 1 AND severity <= 5),
    created_by UUID REFERENCES public.users(id),
    target_audience TEXT[] DEFAULT ARRAY['all'],
    expiration TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true,
    acknowledgments INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create witness reports table
CREATE TABLE public.witness_reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    incident_id UUID REFERENCES public.peaceful_incidents(id),
    witness_id UUID REFERENCES public.users(id),
    testimony TEXT NOT NULL,
    contact_willing BOOLEAN DEFAULT false,
    anonymous BOOLEAN DEFAULT true,
    verification_status TEXT DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'disputed')),
    evidence_links TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_peaceful_protests_date ON public.peaceful_protests(start_date);
CREATE INDEX idx_peaceful_protests_location ON public.peaceful_protests(location);
CREATE INDEX idx_peaceful_protests_status ON public.peaceful_protests(status);
CREATE INDEX idx_peaceful_incidents_protest ON public.peaceful_incidents(protest_id);
CREATE INDEX idx_peaceful_incidents_type ON public.peaceful_incidents(incident_type);
CREATE INDEX idx_peaceful_incidents_time ON public.peaceful_incidents(incident_time);
CREATE INDEX idx_protest_resources_type ON public.protest_resources(resource_type);
CREATE INDEX idx_protest_resources_status ON public.protest_resources(status);
CREATE INDEX idx_training_materials_category ON public.training_materials(category);
CREATE INDEX idx_secure_channels_protest ON public.secure_channels(protest_id);
CREATE INDEX idx_protest_alerts_protest ON public.protest_alerts(protest_id);
CREATE INDEX idx_protest_alerts_type ON public.protest_alerts(alert_type);

-- Enable RLS on all tables
ALTER TABLE public.peaceful_protests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.peaceful_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protest_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.secure_channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channel_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.protest_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.witness_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for peaceful_protests
CREATE POLICY "Anyone can view public protests" ON public.peaceful_protests
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create protests" ON public.peaceful_protests
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Organizers can update their protests" ON public.peaceful_protests
    FOR UPDATE USING (auth.uid() = organizer_id);

-- RLS Policies for peaceful_incidents
CREATE POLICY "Anyone can view incidents" ON public.peaceful_incidents
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can report incidents" ON public.peaceful_incidents
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for protest_resources
CREATE POLICY "Anyone can view available resources" ON public.protest_resources
    FOR SELECT USING (status = 'available' OR auth.uid() = provider_id);

CREATE POLICY "Authenticated users can share resources" ON public.protest_resources
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Providers can update their resources" ON public.protest_resources
    FOR UPDATE USING (auth.uid() = provider_id);

-- RLS Policies for training_materials
CREATE POLICY "Anyone can view published materials" ON public.training_materials
    FOR SELECT USING (is_published = true OR auth.uid() = created_by);

CREATE POLICY "Authenticated users can create materials" ON public.training_materials
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- RLS Policies for secure_channels
CREATE POLICY "Participants can view their channels" ON public.secure_channels
    FOR SELECT USING (
        auth.uid() IN (
            SELECT user_id FROM public.channel_participants WHERE channel_id = id
        )
    );

-- RLS Policies for protest_alerts
CREATE POLICY "Anyone can view active alerts" ON public.protest_alerts
    FOR SELECT USING (is_active = true);

-- Create triggers for updated_at
CREATE TRIGGER update_peaceful_protests_updated_at BEFORE UPDATE ON public.peaceful_protests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_peaceful_incidents_updated_at BEFORE UPDATE ON public.peaceful_incidents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_protest_resources_updated_at BEFORE UPDATE ON public.protest_resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_training_materials_updated_at BEFORE UPDATE ON public.training_materials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_secure_channels_updated_at BEFORE UPDATE ON public.secure_channels
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_protest_alerts_updated_at BEFORE UPDATE ON public.protest_alerts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
