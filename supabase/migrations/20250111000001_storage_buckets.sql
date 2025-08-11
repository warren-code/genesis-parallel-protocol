-- Create storage buckets for document uploads and evidence

-- Enable storage extension if not already enabled
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('evidence', 'evidence', false, 52428800, ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'video/mp4', 'video/mpeg', 'audio/mpeg', 'audio/mp3']),
    ('documents', 'documents', false, 52428800, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/plain', 'text/csv']),
    ('vendor-audits', 'vendor-audits', false, 52428800, ARRAY['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'])
ON CONFLICT (id) DO NOTHING;

-- Storage policies for evidence bucket
CREATE POLICY "Authenticated users can view evidence" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'evidence' AND 
        auth.uid() IS NOT NULL
    );

CREATE POLICY "Ops and Legal leads can upload evidence" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'evidence' AND
        auth.uid() IN (
            SELECT id FROM public.users WHERE role IN ('ops_lead', 'legal_lead', 'admin')
        )
    );

CREATE POLICY "Ops and Legal leads can update evidence" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'evidence' AND
        auth.uid() IN (
            SELECT id FROM public.users WHERE role IN ('ops_lead', 'legal_lead', 'admin')
        )
    );

CREATE POLICY "Only admins can delete evidence" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'evidence' AND
        auth.uid() IN (
            SELECT id FROM public.users WHERE role = 'admin'
        )
    );

-- Storage policies for documents bucket
CREATE POLICY "Authenticated users can view documents" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'documents' AND 
        auth.uid() IS NOT NULL
    );

CREATE POLICY "All leads can upload documents" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'documents' AND
        auth.uid() IN (
            SELECT id FROM public.users WHERE role IN ('ops_lead', 'legal_lead', 'admin')
        )
    );

CREATE POLICY "All leads can update documents" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'documents' AND
        auth.uid() IN (
            SELECT id FROM public.users WHERE role IN ('ops_lead', 'legal_lead', 'admin')
        )
    );

CREATE POLICY "Only admins can delete documents" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'documents' AND
        auth.uid() IN (
            SELECT id FROM public.users WHERE role = 'admin'
        )
    );

-- Storage policies for vendor-audits bucket
CREATE POLICY "Authenticated users can view vendor audit docs" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'vendor-audits' AND 
        auth.uid() IS NOT NULL
    );

CREATE POLICY "Legal leads can manage vendor audit docs" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'vendor-audits' AND
        auth.uid() IN (
            SELECT id FROM public.users WHERE role IN ('legal_lead', 'admin')
        )
    );

CREATE POLICY "Legal leads can update vendor audit docs" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'vendor-audits' AND
        auth.uid() IN (
            SELECT id FROM public.users WHERE role IN ('legal_lead', 'admin')
        )
    );

CREATE POLICY "Only admins can delete vendor audit docs" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'vendor-audits' AND
        auth.uid() IN (
            SELECT id FROM public.users WHERE role = 'admin'
        )
    );
