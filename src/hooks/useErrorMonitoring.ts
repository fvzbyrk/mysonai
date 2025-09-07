"use client"

import { useState, useEffect, useCallback } from 'react'
import { useFeatureFlag } from '@/hooks/useFeatureFlags'
import { useAnalytics } from './useAnalytics'

interface ErrorInfo {
  message: string
  stack?: string
  componentStack?: string
  errorBoundary?: string
  timestamp: number
  userAgent: string
  url: string
  userId?: string
  sessionId: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  category: 'javascript' | 'react' | 'network' | 'api' | 'validation' | 'unknown'
  context?: Record<string, any>
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

export function useErrorMonitoring() {
  const { enabled: analyticsEnabled } = useFeatureFlag('analytics')
  const { trackError } = useAnalytics()
  const [errors, setErrors] = useState<ErrorInfo[]>([])
  const [isMonitoring, setIsMonitoring] = useState(false)

  // Generate unique session ID
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Initialize error monitoring
  const initializeErrorMonitoring = useCallback(() => {
    if (!analyticsEnabled || typeof window === 'undefined') return

    // Global error handler
    const handleGlobalError = (event: ErrorEvent) => {
      const errorInfo: ErrorInfo = {
        message: event.message,
        stack: event.error?.stack,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        sessionId,
        severity: 'medium',
        category: 'javascript',
        context: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        }
      }

      addError(errorInfo)
    }

    // Unhandled promise rejection handler
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorInfo: ErrorInfo = {
        message: event.reason?.message || 'Unhandled Promise Rejection',
        stack: event.reason?.stack,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        sessionId,
        severity: 'high',
        category: 'javascript',
        context: {
          reason: event.reason,
          type: 'unhandled_promise_rejection',
        }
      }

      addError(errorInfo)
    }

    // Network error handler
    const handleNetworkError = (event: Event) => {
      const target = event.target as any
      if (target && (target.tagName === 'IMG' || target.tagName === 'SCRIPT' || target.tagName === 'LINK')) {
        const errorInfo: ErrorInfo = {
          message: `Failed to load ${target.tagName.toLowerCase()}: ${target.src || target.href}`,
          timestamp: Date.now(),
          userAgent: navigator.userAgent,
          url: window.location.href,
          sessionId,
          severity: 'low',
          category: 'network',
          context: {
            element: target.tagName,
            src: target.src || target.href,
            type: 'resource_load_error',
          }
        }

        addError(errorInfo)
      }
    }

    // Add event listeners
    window.addEventListener('error', handleGlobalError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)
    window.addEventListener('error', handleNetworkError, true)

    setIsMonitoring(true)

    return () => {
      window.removeEventListener('error', handleGlobalError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
      window.removeEventListener('error', handleNetworkError, true)
      setIsMonitoring(false)
    }
  }, [analyticsEnabled, sessionId])

  // Add error to collection
  const addError = useCallback((errorInfo: ErrorInfo) => {
    setErrors(prev => [...prev, errorInfo])
    
    // Send to analytics
    trackError(
      errorInfo.category,
      errorInfo.message,
      errorInfo.severity,
      errorInfo.stack
    )

    // Send to error monitoring service
    sendErrorToService(errorInfo)
  }, [trackError])

  // Send error to monitoring service
  const sendErrorToService = useCallback(async (errorInfo: ErrorInfo) => {
    try {
      await fetch('/api/monitoring/error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorInfo),
      })
    } catch (error) {
      console.error('Failed to send error to monitoring service:', error)
    }
  }, [])

  // Log custom error
  const logError = useCallback((
    message: string,
    category: ErrorInfo['category'] = 'unknown',
    severity: ErrorInfo['severity'] = 'medium',
    context?: Record<string, any>
  ) => {
    const errorInfo: ErrorInfo = {
      message,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      sessionId,
      severity,
      category,
      context,
    }

    addError(errorInfo)
  }, [addError])

  // Log API error
  const logAPIError = useCallback((
    endpoint: string,
    method: string,
    status: number,
    message: string,
    response?: any
  ) => {
    const errorInfo: ErrorInfo = {
      message: `API Error: ${method} ${endpoint} - ${status} ${message}`,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      sessionId,
      severity: status >= 500 ? 'high' : 'medium',
      category: 'api',
      context: {
        endpoint,
        method,
        status,
        response,
      }
    }

    addError(errorInfo)
  }, [addError])

  // Log React error boundary error
  const logReactError = useCallback((
    error: Error,
    errorInfo: React.ErrorInfo,
    componentStack?: string
  ) => {
    const errorData: ErrorInfo = {
      message: error.message,
      stack: error.stack,
      componentStack: componentStack || errorInfo.componentStack,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      sessionId,
      severity: 'high',
      category: 'react',
      context: {
        errorBoundary: 'react_error_boundary',
        componentStack: errorInfo.componentStack,
      }
    }

    addError(errorData)
  }, [addError])

  // Log validation error
  const logValidationError = useCallback((
    field: string,
    value: any,
    rule: string,
    message: string
  ) => {
    const errorInfo: ErrorInfo = {
      message: `Validation Error: ${field} - ${message}`,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      sessionId,
      severity: 'low',
      category: 'validation',
      context: {
        field,
        value,
        rule,
        validation_message: message,
      }
    }

    addError(errorInfo)
  }, [addError])

  // Get error statistics
  const getErrorStats = useCallback(() => {
    const total = errors.length
    const byCategory = errors.reduce((acc, error) => {
      acc[error.category] = (acc[error.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const bySeverity = errors.reduce((acc, error) => {
      acc[error.severity] = (acc[error.severity] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const recent = errors.filter(error => 
      Date.now() - error.timestamp < 24 * 60 * 60 * 1000 // Last 24 hours
    ).length

    return {
      total,
      recent,
      byCategory,
      bySeverity,
      criticalCount: bySeverity.critical || 0,
      highCount: bySeverity.high || 0,
    }
  }, [errors])

  // Clear errors
  const clearErrors = useCallback(() => {
    setErrors([])
  }, [])

  // Initialize monitoring
  useEffect(() => {
    if (analyticsEnabled) {
      const cleanup = initializeErrorMonitoring()
      return cleanup
    }
  }, [analyticsEnabled, initializeErrorMonitoring])

  return {
    errors,
    isMonitoring,
    logError,
    logAPIError,
    logReactError,
    logValidationError,
    getErrorStats,
    clearErrors,
  }
}

// Error Boundary Hook for React Components
export function useErrorBoundary() {
  const { logReactError } = useErrorMonitoring()
  const [errorBoundaryState, setErrorBoundaryState] = useState<ErrorBoundaryState>({
    hasError: false,
    error: null,
    errorInfo: null,
  })

  const resetErrorBoundary = useCallback(() => {
    setErrorBoundaryState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }, [])

  const captureError = useCallback((error: Error, errorInfo: React.ErrorInfo) => {
    setErrorBoundaryState({
      hasError: true,
      error,
      errorInfo,
    })

    logReactError(error, errorInfo)
  }, [logReactError])

  return {
    ...errorBoundaryState,
    resetErrorBoundary,
    captureError,
  }
}
