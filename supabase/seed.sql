-- Seed file for initial data

-- Create a default admin user (you'll need to create this user through Supabase Auth first)
-- This is just a placeholder - replace with actual user ID after creating through Auth
INSERT INTO public.users (id, email, role, full_name)
VALUES 
    ('00000000-0000-0000-0000-000000000000', 'admin@example.com', 'admin', 'System Administrator')
ON CONFLICT (id) DO NOTHING;

-- Add some sample data for testing (optional)
-- You can uncomment and modify these as needed

-- Sample incident report
-- INSERT INTO public.incident_reports (report_date, agency, location, description, status, priority, reported_by)
-- VALUES 
--     ('2025-01-10', 'Local Police Department', 'Downtown District', 'Surveillance camera installation without proper authorization', 'open', 3, '00000000-0000-0000-0000-000000000000');

-- Sample vendor audit
-- INSERT INTO public.vendor_audits (agency, vendor_name, contract_value, audit_date, audit_findings, risk_level, audited_by)
-- VALUES 
--     ('City Government', 'TechSurveillance Inc', 2500000.00, '2025-01-09', 'Contract includes facial recognition capabilities not disclosed in public documents', 4, '00000000-0000-0000-0000-000000000000');

-- Sample memory archive entry
-- INSERT INTO public.memory_archive (archive_date, location, tactic_class, description, depth_score, archived_by)
-- VALUES 
--     ('2025-01-08', 'City Hall', 'Mass Surveillance', 'Installation of new camera network with AI capabilities', 7, '00000000-0000-0000-0000-000000000000');

-- Sample lie-truth map entry
-- INSERT INTO public.lie_truth_map (claim, claim_source, claim_date, truth_statement, status, confidence_score)
-- VALUES 
--     ('The new cameras are only for traffic monitoring', 'City Press Release', '2025-01-07', 'Cameras have facial recognition and behavior analysis capabilities', 'debunked', 0.95);
