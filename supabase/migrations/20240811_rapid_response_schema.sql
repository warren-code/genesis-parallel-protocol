-- Create incidents table
CREATE TABLE IF NOT EXISTS incidents (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type JSONB NOT NULL,
  severity VARCHAR(20) CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status VARCHAR(20) CHECK (status IN ('reported', 'acknowledged', 'responding', 'resolved')),
  location JSONB,
  reported_by UUID REFERENCES auth.users(id),
  reported_at TIMESTAMPTZ DEFAULT NOW(),
  responders_needed INTEGER DEFAULT 1,
  responders_assigned UUID[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create incident_updates table
CREATE TABLE IF NOT EXISTS incident_updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  incident_id UUID REFERENCES incidents(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id),
  message TEXT NOT NULL,
  type VARCHAR(20) CHECK (type IN ('status_change', 'info', 'request', 'resolution')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create responders table
CREATE TABLE IF NOT EXISTS responders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) UNIQUE,
  name VARCHAR(255) NOT NULL,
  skills TEXT[] DEFAULT '{}',
  availability JSONB DEFAULT '{"status": "offline", "maxConcurrentIncidents": 3}',
  current_incidents UUID[] DEFAULT '{}',
  certifications JSONB DEFAULT '[]',
  preferred_radius INTEGER,
  grid_location VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  incident_id UUID REFERENCES incidents(id),
  recipient_id UUID REFERENCES auth.users(id),
  type VARCHAR(20) CHECK (type IN ('new_incident', 'assignment', 'status_update', 'urgent_request', 'resolution', 'system')),
  priority VARCHAR(10) CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  message TEXT NOT NULL,
  action_required TEXT,
  expires_at TIMESTAMPTZ,
  acknowledged_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create secure_messages table
CREATE TABLE IF NOT EXISTS secure_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  incident_id UUID REFERENCES incidents(id),
  sender_id UUID REFERENCES auth.users(id),
  recipient_ids UUID[] NOT NULL,
  content TEXT NOT NULL, -- In production, this should be encrypted
  attachments JSONB DEFAULT '[]',
  read_by JSONB DEFAULT '[]',
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create response_coordinations table
CREATE TABLE IF NOT EXISTS response_coordinations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  incident_id UUID REFERENCES incidents(id) UNIQUE,
  coordinator UUID REFERENCES auth.users(id),
  teams JSONB DEFAULT '[]',
  resources JSONB DEFAULT '[]',
  timeline JSONB DEFAULT '[]',
  status VARCHAR(20) CHECK (status IN ('planning', 'active', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create response_records table
CREATE TABLE IF NOT EXISTS response_records (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  responder_id UUID REFERENCES responders(id),
  incident_id UUID REFERENCES incidents(id),
  responded_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  role VARCHAR(100),
  feedback TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE incident_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE responders ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE secure_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE response_coordinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE response_records ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for incidents
CREATE POLICY "Anyone can view incidents" ON incidents
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create incidents" ON incidents
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Incident creators and assigned responders can update" ON incidents
  FOR UPDATE USING (
    auth.uid() = reported_by OR 
    auth.uid() = ANY(responders_assigned)
  );

-- Create RLS policies for alerts
CREATE POLICY "Users can view their own alerts" ON alerts
  FOR SELECT USING (auth.uid() = recipient_id);

CREATE POLICY "System can create alerts" ON alerts
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can acknowledge their own alerts" ON alerts
  FOR UPDATE USING (auth.uid() = recipient_id);

-- Create RLS policies for secure messages
CREATE POLICY "Users can view messages they sent or received" ON secure_messages
  FOR SELECT USING (
    auth.uid() = sender_id OR 
    auth.uid() = ANY(recipient_ids)
  );

CREATE POLICY "Authenticated users can send messages" ON secure_messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Create indexes for performance
CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_incidents_severity ON incidents(severity);
CREATE INDEX idx_incidents_reported_by ON incidents(reported_by);
CREATE INDEX idx_alerts_recipient_id ON alerts(recipient_id);
CREATE INDEX idx_alerts_created_at ON alerts(created_at);
CREATE INDEX idx_secure_messages_sender_id ON secure_messages(sender_id);
CREATE INDEX idx_secure_messages_recipient_ids ON secure_messages USING GIN(recipient_ids);

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_incidents_updated_at BEFORE UPDATE ON incidents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_responders_updated_at BEFORE UPDATE ON responders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_response_coordinations_updated_at BEFORE UPDATE ON response_coordinations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
