import { ReactNode } from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'

export default function MemoryLayerLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black">
        {children}
      </div>
    </ProtectedRoute>
  )
}
