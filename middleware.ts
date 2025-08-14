// Simplified middleware for Netlify deployment
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Simple pass-through middleware
  return NextResponse.next()
}

// Only match specific paths that need middleware
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/api/protected/:path*'
  ],
}
