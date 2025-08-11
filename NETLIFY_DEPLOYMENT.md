# Netlify Deployment Guide for Genesis Parallel Protocol

This guide will help you deploy the Genesis Parallel Protocol to Netlify with Supabase integration.

## Prerequisites

- Netlify CLI installed (`npm install -g netlify-cli`)
- Supabase project created with all tables and RLS policies set up
- Environment variables from your Supabase project

## Deployment Steps

### 1. Link to Netlify

If you haven't already linked this project to Netlify:

```bash
netlify link
```

Select or create a new site when prompted.

### 2. Set Environment Variables

You need to set the following environment variables in Netlify:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key (for server-side operations)
- `NEXT_PUBLIC_SITE_URL` - Your Netlify site URL (e.g., https://your-site.netlify.app)

You can set these using the Netlify CLI:

```bash
netlify env:set NEXT_PUBLIC_SUPABASE_URL "your-supabase-url"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your-anon-key"
netlify env:set SUPABASE_SERVICE_ROLE_KEY "your-service-role-key"
netlify env:set NEXT_PUBLIC_SITE_URL "https://your-site.netlify.app"
```

Or use the helper script:

```bash
node scripts/setup-netlify-env.js
```

### 3. Configure Supabase Authentication

In your Supabase dashboard:

1. Go to Authentication > URL Configuration
2. Add your Netlify URL to:
   - Site URL: `https://your-site.netlify.app`
   - Redirect URLs: `https://your-site.netlify.app/**`

### 4. Deploy to Netlify

Deploy your site:

```bash
netlify deploy --prod
```

Or push to your Git repository if you have continuous deployment set up.

### 5. Test the Deployment

After deployment:

1. Visit your site at the Netlify URL
2. Test the Supabase health check: `https://your-site.netlify.app/.netlify/functions/supabase-health`
3. Verify authentication and database operations work correctly

## Continuous Deployment

For automatic deployments:

1. Connect your GitHub/GitLab/Bitbucket repository to Netlify
2. Netlify will automatically deploy when you push to your main branch

## Troubleshooting

### Build Failures

- Ensure all dependencies are listed in `package.json`
- Check build logs in Netlify dashboard
- Verify Node.js version compatibility

### Supabase Connection Issues

- Double-check environment variables are set correctly
- Ensure Supabase project is not paused
- Verify RLS policies allow necessary operations

### Authentication Problems

- Confirm redirect URLs are configured in Supabase
- Check that `NEXT_PUBLIC_SITE_URL` matches your Netlify URL
- Ensure cookies are enabled for authentication

## Performance Optimization

The deployment is optimized for Netlify with:

- Next.js plugin for optimal builds
- Edge functions support
- Automatic image optimization
- CDN distribution
- Serverless function support

## Security Considerations

- Never commit `.env.local` or any file with secrets
- Use Netlify's environment variables for sensitive data
- Keep `SUPABASE_SERVICE_ROLE_KEY` secure (server-side only)
- Regularly rotate your API keys

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js on Netlify](https://docs.netlify.com/frameworks/next-js/)
