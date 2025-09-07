"use client"

import { useAuth as useAuthContext } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function useAuth() {
  const auth = useAuthContext()
  const router = useRouter()

  // Redirect to signin if not authenticated
  const requireAuth = () => {
    if (!auth.loading && !auth.user) {
      router.push('/signin')
      return false
    }
    return true
  }

  // Redirect to dashboard if already authenticated
  const redirectIfAuthenticated = () => {
    if (!auth.loading && auth.user) {
      router.push('/dashboard')
      return true
    }
    return false
  }

  return {
    ...auth,
    requireAuth,
    redirectIfAuthenticated,
  }
}

// Hook for protected routes
export function useRequireAuth() {
  const { user, loading, requireAuth } = useAuth()
  
  useEffect(() => {
    if (!loading && !user) {
      requireAuth()
    }
  }, [user, loading, requireAuth])

  return { user, loading }
}

// Hook for public routes (redirect if authenticated)
export function useRequireGuest() {
  const { user, loading, redirectIfAuthenticated } = useAuth()
  
  useEffect(() => {
    if (!loading && user) {
      redirectIfAuthenticated()
    }
  }, [user, loading, redirectIfAuthenticated])

  return { user, loading }
}
