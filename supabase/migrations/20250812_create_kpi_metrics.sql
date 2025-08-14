-- Create KPI metrics table
CREATE TABLE IF NOT EXISTS public.kpi_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    active_dao_members INTEGER NOT NULL DEFAULT 0,
    infrastructure_loops INTEGER NOT NULL DEFAULT 0,
    resource_efficiency DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    community_resilience DECIMAL(5,2) NOT NULL DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.kpi_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to KPI metrics" ON public.kpi_metrics
    FOR SELECT
    USING (true);

-- Create policy for authenticated users to insert/update metrics
CREATE POLICY "Allow authenticated users to manage KPI metrics" ON public.kpi_metrics
    FOR ALL
    USING (auth.role() = 'authenticated');

-- Create indexes for performance
CREATE INDEX idx_kpi_metrics_created_at ON public.kpi_metrics (created_at DESC);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update the updated_at column
CREATE TRIGGER update_kpi_metrics_updated_at BEFORE UPDATE ON public.kpi_metrics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO public.kpi_metrics (
    active_dao_members,
    infrastructure_loops,
    resource_efficiency,
    community_resilience
) VALUES 
    (475, 28, 82.50, 87.25),
    (480, 29, 83.75, 88.00),
    (485, 30, 85.00, 88.50);

-- Create a view for the latest metrics
CREATE OR REPLACE VIEW public.latest_kpi_metrics AS
SELECT *
FROM public.kpi_metrics
ORDER BY created_at DESC
LIMIT 1;

-- Grant access to the view
GRANT SELECT ON public.latest_kpi_metrics TO anon, authenticated;
