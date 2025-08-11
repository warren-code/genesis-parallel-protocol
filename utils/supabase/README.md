# Supabase Setup Guide

## Overview

This directory contains all the Supabase integration files for the Genesis Parallel Protocol application, including:
- Database client configurations
- Authentication helpers
- Database operation helpers
- Storage helpers
- TypeScript type definitions

## Initial Setup

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key

### 2. Update Environment Variables

Update the `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres
```

### 3. Run Database Migrations

1. Install Supabase CLI: `npm install -g supabase`
2. Link your project: `supabase link --project-ref YOUR_PROJECT_ID`
3. Run migrations: `supabase db push`

Or manually run the SQL in `/supabase/migrations/20240108_initial_schema.sql` in the Supabase SQL editor.

### 4. Initialize Storage Buckets

Run this once in your application to create storage buckets:

```typescript
import { initializeStorageBuckets } from '@/utils/supabase'

// Call this once when setting up the app
await initializeStorageBuckets()
```

## Database Schema

The database includes the following tables:

### Users & Roles
- **users**: Stores user profiles with roles (organizer, city_staff, advocate, admin)

### Core Features
- **rights_information**: Know Your Rights content
- **sops_documentation**: Standard Operating Procedures
- **rapid_response_incidents**: Incident reporting and tracking
- **foia_requests**: FOIA request management
- **evidence_vault**: Evidence storage with integrity verification
- **network_connections**: User networking system

### Supporting Tables
- **activity_logs**: Audit trail
- **comments**: Comments on incidents and FOIA requests
- **tags**: Categorization system

## Usage Examples

### Authentication

```typescript
import { signIn, signUp, getCurrentUser } from '@/utils/supabase'

// Sign up
const { user, error } = await signUp(
  'user@example.com',
  'password123',
  'John Doe',
  'advocate',
  'ACLU'
)

// Sign in
const { user, session, error } = await signIn('user@example.com', 'password123')

// Get current user
const { user, profile, error } = await getCurrentUser()
```

### Database Operations

```typescript
import { createIncident, getIncidents, updateIncidentStatus } from '@/utils/supabase'

// Create incident
const { data, error } = await createIncident({
  incident_type: 'police_interaction',
  location: '123 Main St',
  description: 'Description of incident',
  priority: 3
})

// Get incidents
const { data: incidents, error } = await getIncidents({ status: 'reported' })

// Update incident status
const { data, error } = await updateIncidentStatus(
  incidentId,
  'resolved',
  'Issue was resolved peacefully'
)
```

### File Storage

```typescript
import { uploadEvidenceFile, uploadAvatarImage } from '@/utils/supabase'

// Upload evidence
const { url, error } = await uploadEvidenceFile(
  file,
  incidentId,
  userId
)

// Upload avatar
const { url, error } = await uploadAvatarImage(file, userId)
```

## Security

### Row Level Security (RLS)

All tables have RLS enabled with basic policies. You should customize these based on your specific requirements:

1. Users can only update their own profiles
2. Published rights information is publicly readable
3. Evidence and documents require authentication

### Best Practices

1. Never expose service role keys in client code
2. Always use RLS policies for data access control
3. Validate all user inputs before database operations
4. Use prepared statements (Supabase handles this automatically)
5. Store sensitive files in private buckets with signed URLs

## Troubleshooting

### Common Issues

1. **Authentication errors**: Check that email confirmations are disabled for development
2. **RLS errors**: Ensure users are authenticated and have proper permissions
3. **Storage errors**: Verify bucket names and file size limits
4. **Type errors**: Run `supabase gen types typescript` to update types

### Debugging

Enable debug mode in development:

```typescript
const supabase = createClient()
supabase.auth.debug = true
```

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)
