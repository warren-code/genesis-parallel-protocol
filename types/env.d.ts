/// <reference types="node" />

declare namespace NodeJS {
  interface ProcessEnv {
    // Supabase Configuration
    NEXT_PUBLIC_SUPABASE_URL: string
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string
    SUPABASE_SERVICE_ROLE_KEY: string
    DATABASE_URL: string
    SUPABASE_JWT_SECRET: string
    
    // Application Configuration
    NEXT_PUBLIC_APP_URL: string
    
    // Node Environment
    NODE_ENV: 'development' | 'production' | 'test'
  }
}

// Ensure this file is treated as a module
export {}
