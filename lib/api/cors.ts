import { NextApiRequest, NextApiResponse } from 'next'

type CorsOptions = {
  origin?: string | string[] | boolean
  credentials?: boolean
  methods?: string[]
  headers?: string[]
  maxAge?: number
}

const defaultOptions: CorsOptions = {
  origin: process.env.NEXT_PUBLIC_APP_URL || '*',
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  headers: [
    'X-CSRF-Token',
    'X-Requested-With',
    'Accept',
    'Accept-Version',
    'Content-Length',
    'Content-MD5',
    'Content-Type',
    'Date',
    'X-Api-Version',
    'Authorization',
  ],
  maxAge: 86400, // 24 hours
}

export function initCors(options: CorsOptions = {}) {
  const corsOptions = { ...defaultOptions, ...options }

  return (req: NextApiRequest, res: NextApiResponse) => {
    const origin = req.headers.origin

    // Handle origin
    if (corsOptions.origin === true) {
      res.setHeader('Access-Control-Allow-Origin', origin || '*')
    } else if (typeof corsOptions.origin === 'string') {
      res.setHeader('Access-Control-Allow-Origin', corsOptions.origin)
    } else if (Array.isArray(corsOptions.origin)) {
      if (origin && corsOptions.origin.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin)
      }
    }

    // Handle credentials
    if (corsOptions.credentials) {
      res.setHeader('Access-Control-Allow-Credentials', 'true')
    }

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.setHeader('Access-Control-Allow-Methods', corsOptions.methods!.join(','))
      res.setHeader('Access-Control-Allow-Headers', corsOptions.headers!.join(','))
      res.setHeader('Access-Control-Max-Age', String(corsOptions.maxAge))
      res.status(200).end()
      return true
    }

    return false
  }
}

// Higher-order function to wrap API routes with CORS
export function withCors(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void,
  options?: CorsOptions
) {
  const cors = initCors(options)

  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Handle CORS
    const isPreflightHandled = cors(req, res)
    if (isPreflightHandled) return

    // Call the actual handler
    return handler(req, res)
  }
}

// Middleware for allowed methods
export function allowMethods(
  methods: string[],
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (!methods.includes(req.method || '')) {
      res.setHeader('Allow', methods.join(', '))
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
    }
    return handler(req, res)
  }
}
