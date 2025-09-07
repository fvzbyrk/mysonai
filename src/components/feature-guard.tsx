"use client"

import { ReactNode } from 'react'
import { useFeatureFlag } from '@/hooks/useFeatureFlags'
import { FeatureFlags } from '@/lib/feature-flags'

interface FeatureGuardProps {
  feature: keyof FeatureFlags
  children: ReactNode
  fallback?: ReactNode
  requireAll?: boolean
  features?: (keyof FeatureFlags)[]
}

export function FeatureGuard({ 
  feature, 
  children, 
  fallback = null,
  requireAll = false,
  features 
}: FeatureGuardProps) {
  const { enabled, loading } = useFeatureFlag(feature)
  
  if (loading) {
    return <div className="animate-pulse bg-gray-200 rounded h-4 w-full" />
  }
  
  if (!enabled) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}

// Multiple features guard
interface MultipleFeatureGuardProps {
  features: (keyof FeatureFlags)[]
  children: ReactNode
  fallback?: ReactNode
  requireAll?: boolean
}

export function MultipleFeatureGuard({ 
  features, 
  children, 
  fallback = null,
  requireAll = false 
}: MultipleFeatureGuardProps) {
  const { enabledFeatures, disabledFeatures, allEnabled, anyEnabled, loading } = useMultipleFeatureFlags(features)
  
  if (loading) {
    return <div className="animate-pulse bg-gray-200 rounded h-4 w-full" />
  }
  
  const shouldShow = requireAll ? allEnabled : anyEnabled
  
  if (!shouldShow) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}

// Conditional rendering based on features
interface ConditionalFeatureProps {
  condition: (flags: FeatureFlags) => boolean
  children: ReactNode
  fallback?: ReactNode
}

export function ConditionalFeature({ condition, children, fallback = null }: ConditionalFeatureProps) {
  const { flags, loading } = useFeatureFlags()
  
  if (loading) {
    return <div className="animate-pulse bg-gray-200 rounded h-4 w-full" />
  }
  
  if (!flags || !condition(flags)) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}
