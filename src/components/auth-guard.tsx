"use client"

import { ReactNode } from 'react'
import { useRequireAuth, useRequireGuest } from '@/hooks/useAuth'
import { useFeatureFlag } from '@/hooks/useFeatureFlags'

interface AuthGuardProps {
  children: ReactNode
  requireAuth?: boolean
  requireGuest?: boolean
  requirePlan?: 'free' | 'pro' | 'enterprise'
  fallback?: ReactNode
}

export function AuthGuard({ 
  children, 
  requireAuth = false, 
  requireGuest = false,
  requirePlan,
  fallback = null 
}: AuthGuardProps) {
  const { enabled: authEnabled } = useFeatureFlag('auth')
  
  if (!authEnabled) {
    return <>{fallback}</>
  }

  if (requireAuth) {
    const { user, loading } = useRequireAuth()
    
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      )
    }
    
    if (!user) {
      return <>{fallback}</>
    }
  }

  if (requireGuest) {
    const { user, loading } = useRequireGuest()
    
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
      )
    }
    
    if (user) {
      return <>{fallback}</>
    }
  }

  return <>{children}</>
}

// Higher-order component for protected routes
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>,
  options: Omit<AuthGuardProps, 'children'> = {}
) {
  return function AuthGuardedComponent(props: P) {
    return (
      <AuthGuard {...options}>
        <Component {...props} />
      </AuthGuard>
    )
  }
}
