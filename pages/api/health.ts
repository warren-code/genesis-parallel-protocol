import type { NextApiRequest, NextApiResponse } from 'next'
import { withCors, allowMethods } from '@/lib/api/cors'

type Data = {
  status: string
  timestamp: string
  environment: string
  supabase: {
    url: string
    connected: boolean
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // This is a health check endpoint that can be used to verify
  // that the API is running and Supabase is configured
  
  const response: Data = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    supabase: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'not configured',
      connected: !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    }
  }
  
  res.status(200).json(response)
}

// Export the handler wrapped with CORS and method validation
export default withCors(
  allowMethods(['GET'], handler)
)
