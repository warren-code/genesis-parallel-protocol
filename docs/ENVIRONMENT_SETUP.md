# Environment Configuration Setup

This document explains the environment configuration for the Genesis Parallel Protocol application.

## Environment Files

### `.env.local` (Local Development)
Used for local development. This file should never be committed to version control.

```bash
# Copy from .env.example
cp .env.example .env.local
```

Then update with your actual Supabase credentials:
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (server-side only)
- `DATABASE_URL`: Direct database connection string
- `SUPABASE_JWT_SECRET`: JWT secret from Supabase settings

### `.env.production` (Production)
Used for production builds. In Netlify, these values are set through the Netlify dashboard.

## Netlify Environment Variables

Set these in your Netlify dashboard under Site Settings > Environment Variables:

1. **Public Variables** (accessible in browser):
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `NEXT_PUBLIC_APP_URL`

2. **Secret Variables** (server-side only):
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `DATABASE_URL`
   - `SUPABASE_JWT_SECRET`

## Security Headers

The application implements comprehensive security headers through two layers:

### 1. Next.js Configuration (`next.config.js`)
- Content Security Policy (CSP)
- CORS headers for API routes
- Security headers (HSTS, X-Frame-Options, etc.)

### 2. Netlify Configuration (`netlify.toml`)
- Additional security headers
- Build optimization settings
- Environment-specific configurations

## CORS Configuration

### For API Routes
Use the provided CORS utilities in your API routes:

```typescript
import { withCors, allowMethods } from '@/lib/api/cors'

export default withCors(
  allowMethods(['GET', 'POST'], handler)
)
```

### Allowed Origins
By default, CORS is configured to allow:
- Local development (`http://localhost:3000`)
- Your production domain (set via `NEXT_PUBLIC_APP_URL`)
- Supabase domains for real-time connections

## Content Security Policy (CSP)

The CSP is configured to:
- Allow Supabase connections and scripts
- Prevent XSS attacks
- Allow necessary resources for Next.js
- Block mixed content
- Upgrade insecure requests

## TypeScript Support

Environment variables are typed in `types/env.d.ts`. This provides:
- IntelliSense support
- Type safety
- Compile-time checking

## Testing Configuration

Test your configuration:

1. **Local Development**:
   ```bash
   npm run dev
   # Visit http://localhost:3000/api/health
   ```

2. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

3. **Security Headers**:
   Use browser developer tools to inspect response headers.

## Troubleshooting

### Environment Variables Not Loading
- Ensure `.env.local` exists and is properly formatted
- Restart the development server after changes
- Check for typos in variable names

### CORS Issues
- Verify `NEXT_PUBLIC_APP_URL` is set correctly
- Check browser console for specific CORS errors
- Ensure API routes use the CORS middleware

### Supabase Connection Issues
- Verify all Supabase credentials are correct
- Check the `/api/health` endpoint
- Ensure your Supabase project is active

## Best Practices

1. **Never commit secrets** to version control
2. **Use different keys** for development and production
3. **Rotate keys regularly** for security
4. **Monitor security headers** using tools like securityheaders.com
5. **Test CORS configuration** with different origins
6. **Keep dependencies updated** for security patches
