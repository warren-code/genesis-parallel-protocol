-- Create FOIA request status enum
CREATE TYPE foia_status AS ENUM ('draft', 'submitted', 'acknowledged', 'processing', 'partially_fulfilled', 'fulfilled', 'denied', 'appealed', 'withdrawn');

-- Create FOIA request templates table
CREATE TABLE public.foia_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    template_content TEXT NOT NULL,
    placeholders JSONB DEFAULT '[]',
    tags TEXT[],
    created_by UUID REFERENCES public.users(id),
    is_public BOOLEAN DEFAULT true,
    usage_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create FOIA requests table
CREATE TABLE public.foia_requests (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    request_number TEXT UNIQUE,
    template_id UUID REFERENCES public.foia_templates(id),
    agency_name TEXT NOT NULL,
    agency_contact TEXT,
    subject TEXT NOT NULL,
    request_content TEXT NOT NULL,
    status foia_status DEFAULT 'draft',
    submitted_date DATE,
    due_date DATE,
    response_date DATE,
    requester_id UUID REFERENCES public.users(id),
    assigned_to UUID REFERENCES public.users(id),
    priority INTEGER CHECK (priority >= 1 AND priority <= 5),
    estimated_cost NUMERIC(10, 2),
    actual_cost NUMERIC(10, 2),
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create FOIA responses table
CREATE TABLE public.foia_responses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    request_id UUID REFERENCES public.foia_requests(id) ON DELETE CASCADE,
    response_type TEXT NOT NULL, -- 'acknowledgment', 'partial', 'final', 'denial', 'appeal_response'
    response_date DATE NOT NULL,
    response_content TEXT,
    documents TEXT[],
    exemptions_cited TEXT[],
    appeal_deadline DATE,
    notes TEXT,
    processed_by UUID REFERENCES public.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create FOIA documents table for collaborative editing
CREATE TABLE public.foia_documents (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    request_id UUID REFERENCES public.foia_requests(id) ON DELETE CASCADE,
    document_name TEXT NOT NULL,
    document_type TEXT NOT NULL, -- 'request', 'response', 'supporting', 'analysis'
    content TEXT,
    file_path TEXT,
    file_size INTEGER,
    mime_type TEXT,
    version INTEGER DEFAULT 1,
    is_redacted BOOLEAN DEFAULT false,
    redaction_notes TEXT,
    uploaded_by UUID REFERENCES public.users(id),
    last_edited_by UUID REFERENCES public.users(id),
    locked_by UUID REFERENCES public.users(id),
    locked_at TIMESTAMPTZ,
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create document versions table for tracking changes
CREATE TABLE public.foia_document_versions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    document_id UUID REFERENCES public.foia_documents(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    content TEXT,
    changes JSONB,
    edited_by UUID REFERENCES public.users(id),
    edit_summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create policy analysis table
CREATE TABLE public.policy_analyses (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    analysis_type TEXT NOT NULL, -- 'pattern', 'compliance', 'impact', 'trend'
    related_requests UUID[],
    data_sources JSONB DEFAULT '[]',
    findings TEXT,
    recommendations TEXT,
    visualizations JSONB DEFAULT '[]',
    analyst_id UUID REFERENCES public.users(id),
    reviewers UUID[],
    status TEXT DEFAULT 'draft', -- 'draft', 'in_review', 'published'
    published_date DATE,
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create FOIA request comments table for collaboration
CREATE TABLE public.foia_comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    request_id UUID REFERENCES public.foia_requests(id) ON DELETE CASCADE,
    document_id UUID REFERENCES public.foia_documents(id) ON DELETE CASCADE,
    parent_comment_id UUID REFERENCES public.foia_comments(id) ON DELETE CASCADE,
    comment_text TEXT NOT NULL,
    author_id UUID REFERENCES public.users(id),
    is_resolved BOOLEAN DEFAULT false,
    resolved_by UUID REFERENCES public.users(id),
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_foia_templates_category ON public.foia_templates(category);
CREATE INDEX idx_foia_templates_tags ON public.foia_templates USING GIN(tags);
CREATE INDEX idx_foia_requests_status ON public.foia_requests(status);
CREATE INDEX idx_foia_requests_agency ON public.foia_requests(agency_name);
CREATE INDEX idx_foia_requests_submitted_date ON public.foia_requests(submitted_date);
CREATE INDEX idx_foia_responses_request_id ON public.foia_responses(request_id);
CREATE INDEX idx_foia_documents_request_id ON public.foia_documents(request_id);
CREATE INDEX idx_foia_documents_type ON public.foia_documents(document_type);
CREATE INDEX idx_foia_document_versions_document_id ON public.foia_document_versions(document_id);
CREATE INDEX idx_policy_analyses_status ON public.policy_analyses(status);
CREATE INDEX idx_foia_comments_request_id ON public.foia_comments(request_id);
CREATE INDEX idx_foia_comments_document_id ON public.foia_comments(document_id);

-- Enable RLS on all FOIA tables
ALTER TABLE public.foia_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.foia_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.foia_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.foia_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.foia_document_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.policy_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.foia_comments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for FOIA templates
CREATE POLICY "All authenticated users can view public templates" ON public.foia_templates
    FOR SELECT USING (is_public = true OR created_by = auth.uid());

CREATE POLICY "Users can create templates" ON public.foia_templates
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own templates" ON public.foia_templates
    FOR UPDATE USING (created_by = auth.uid() OR auth.uid() IN (
        SELECT id FROM public.users WHERE role = 'admin'
    ));

-- RLS Policies for FOIA requests
CREATE POLICY "Users can view their own requests or if assigned" ON public.foia_requests
    FOR SELECT USING (
        requester_id = auth.uid() 
        OR assigned_to = auth.uid()
        OR auth.uid() IN (
            SELECT id FROM public.users WHERE role IN ('legal_lead', 'admin')
        )
    );

CREATE POLICY "Authenticated users can create requests" ON public.foia_requests
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own requests or if assigned" ON public.foia_requests
    FOR UPDATE USING (
        requester_id = auth.uid() 
        OR assigned_to = auth.uid()
        OR auth.uid() IN (
            SELECT id FROM public.users WHERE role IN ('legal_lead', 'admin')
        )
    );

-- RLS Policies for FOIA responses
CREATE POLICY "Users can view responses for accessible requests" ON public.foia_responses
    FOR SELECT USING (
        request_id IN (
            SELECT id FROM public.foia_requests 
            WHERE requester_id = auth.uid() 
            OR assigned_to = auth.uid()
            OR auth.uid() IN (
                SELECT id FROM public.users WHERE role IN ('legal_lead', 'admin')
            )
        )
    );

CREATE POLICY "Legal leads can manage responses" ON public.foia_responses
    FOR ALL USING (
        auth.uid() IN (
            SELECT id FROM public.users WHERE role IN ('legal_lead', 'admin')
        )
    );

-- RLS Policies for FOIA documents
CREATE POLICY "Users can view documents for accessible requests" ON public.foia_documents
    FOR SELECT USING (
        request_id IN (
            SELECT id FROM public.foia_requests 
            WHERE requester_id = auth.uid() 
            OR assigned_to = auth.uid()
            OR auth.uid() IN (
                SELECT id FROM public.users WHERE role IN ('legal_lead', 'admin')
            )
        )
    );

CREATE POLICY "Users can upload documents to their requests" ON public.foia_documents
    FOR INSERT WITH CHECK (
        request_id IN (
            SELECT id FROM public.foia_requests 
            WHERE requester_id = auth.uid() 
            OR assigned_to = auth.uid()
            OR auth.uid() IN (
                SELECT id FROM public.users WHERE role IN ('legal_lead', 'admin')
            )
        )
    );

CREATE POLICY "Users can update documents they can access" ON public.foia_documents
    FOR UPDATE USING (
        request_id IN (
            SELECT id FROM public.foia_requests 
            WHERE requester_id = auth.uid() 
            OR assigned_to = auth.uid()
            OR auth.uid() IN (
                SELECT id FROM public.users WHERE role IN ('legal_lead', 'admin')
            )
        )
    );

-- RLS Policies for document versions
CREATE POLICY "Users can view versions of accessible documents" ON public.foia_document_versions
    FOR SELECT USING (
        document_id IN (
            SELECT id FROM public.foia_documents 
            WHERE request_id IN (
                SELECT id FROM public.foia_requests 
                WHERE requester_id = auth.uid() 
                OR assigned_to = auth.uid()
                OR auth.uid() IN (
                    SELECT id FROM public.users WHERE role IN ('legal_lead', 'admin')
                )
            )
        )
    );

-- RLS Policies for policy analyses
CREATE POLICY "All authenticated users can view published analyses" ON public.policy_analyses
    FOR SELECT USING (status = 'published' OR analyst_id = auth.uid() OR auth.uid() = ANY(reviewers));

CREATE POLICY "Legal leads can create analyses" ON public.policy_analyses
    FOR INSERT WITH CHECK (
        auth.uid() IN (
            SELECT id FROM public.users WHERE role IN ('legal_lead', 'admin')
        )
    );

CREATE POLICY "Analysts can update their own analyses" ON public.policy_analyses
    FOR UPDATE USING (analyst_id = auth.uid() OR auth.uid() = ANY(reviewers));

-- RLS Policies for comments
CREATE POLICY "Users can view comments on accessible requests" ON public.foia_comments
    FOR SELECT USING (
        request_id IN (
            SELECT id FROM public.foia_requests 
            WHERE requester_id = auth.uid() 
            OR assigned_to = auth.uid()
            OR auth.uid() IN (
                SELECT id FROM public.users WHERE role IN ('legal_lead', 'admin')
            )
        )
    );

CREATE POLICY "Users can comment on accessible requests" ON public.foia_comments
    FOR INSERT WITH CHECK (
        request_id IN (
            SELECT id FROM public.foia_requests 
            WHERE requester_id = auth.uid() 
            OR assigned_to = auth.uid()
            OR auth.uid() IN (
                SELECT id FROM public.users WHERE role IN ('legal_lead', 'admin')
            )
        )
    );

-- Create triggers for updated_at columns
CREATE TRIGGER update_foia_templates_updated_at BEFORE UPDATE ON public.foia_templates
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_foia_requests_updated_at BEFORE UPDATE ON public.foia_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_foia_responses_updated_at BEFORE UPDATE ON public.foia_responses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_foia_documents_updated_at BEFORE UPDATE ON public.foia_documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_policy_analyses_updated_at BEFORE UPDATE ON public.policy_analyses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_foia_comments_updated_at BEFORE UPDATE ON public.foia_comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to generate FOIA request numbers
CREATE OR REPLACE FUNCTION generate_foia_request_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.request_number IS NULL THEN
        NEW.request_number := 'FOIA-' || TO_CHAR(NOW(), 'YYYY-MM-') || LPAD(NEXTVAL('foia_request_seq')::TEXT, 4, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create sequence for FOIA request numbers
CREATE SEQUENCE foia_request_seq START 1;

-- Create trigger for FOIA request number generation
CREATE TRIGGER generate_foia_request_number_trigger
    BEFORE INSERT ON public.foia_requests
    FOR EACH ROW
    EXECUTE FUNCTION generate_foia_request_number();
