# Supabase Backend Setup

This directory contains the Supabase configuration and database schema for the surveillance accountability platform.

## Database Schema

The database includes the following tables:

1. **users** - User authentication and role management
   - Roles: `admin`, `ops_lead`, `legal_lead`, `viewer`

2. **incident_reports** - Track surveillance incidents
   - Fields: date, agency, location, evidence, status, priority
   - Includes geolocation support

3. **vendor_audits** - Audit surveillance vendors and contracts
   - Fields: agency, vendor, contract value, data types, findings
   - Risk assessment scoring

4. **memory_archive** - Historical tactical surveillance archive
   - Fields: date, location, tactic class, evidence links, depth score
   - Verification tracking

5. **lie_truth_map** - Track and debunk false claims
   - Fields: claims, counter-evidence, status, confidence score
   - Impact assessment

## Storage Buckets

Three storage buckets are configured:

1. **evidence** - For incident evidence (images, videos, documents)
2. **documents** - For general documents and reports
3. **vendor-audits** - For vendor audit documentation

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Save your project URL and API keys

### 2. Configure Environment Variables

Copy the `.env.local` file and update with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
DATABASE_URL=your-database-url
```

### 3. Run Database Migrations

Using the Supabase CLI:

```bash
npx supabase db push
```

Or manually in Supabase Dashboard:
1. Go to SQL Editor in your Supabase project
2. Run the migrations in order:
   - `20250111000000_initial_schema.sql`
   - `20250111000001_storage_buckets.sql`

### 4. (Optional) Seed Initial Data

Run the `seed.sql` file to add initial test data.

### 5. Enable Authentication

In Supabase Dashboard:
1. Go to Authentication > Providers
2. Enable Email authentication
3. Configure email templates as needed

### 6. Create Initial Admin User

1. Sign up a user through your app or Supabase Dashboard
2. Update the user's role in the database:

```sql
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'your-admin-email@example.com';
```

## Security Features

- Row Level Security (RLS) is enabled on all tables
- Role-based access control:
  - **Admins**: Full access to all data
  - **Ops Leads**: Manage incidents and memory archive
  - **Legal Leads**: Manage vendor audits and legal documentation
  - **Viewers**: Read-only access to all data

## Development Tips

1. Use `npx supabase status` to check your local setup
2. Use `npx supabase db diff` to generate migrations
3. Test RLS policies using different user roles
4. Monitor real-time subscriptions in the Supabase Dashboard

## API Usage

The `lib/supabase.js` file provides helper functions for all database operations:

```javascript
import { 
  signIn, 
  createIncidentReport, 
  getVendorAudits,
  uploadEvidence 
} from '@/lib/supabase'

// Example usage
const { data, error } = await createIncidentReport({
  report_date: '2025-01-11',
  agency: 'Local PD',
  location: 'Downtown',
  description: 'Unauthorized surveillance',
  status: 'open'
})
```
