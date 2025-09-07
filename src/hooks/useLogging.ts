"use client"

import { useState, useCallback } from 'react'
import { useFeatureFlag } from '@/hooks/useFeatureFlags'

interface LogEntry {
  id: string
  level: 'debug' | 'info' | 'warn' | 'error'
  message: string
  timestamp: number
  category: string
  context?: Record<string, any>
  userId?: string
  sessionId: string
  url: string
  userAgent: string
}

interface LogConfig {
  maxEntries: number
  enableConsole: boolean
  enableRemote: boolean
  enableStorage: boolean
  logLevel: LogEntry['level']
}

export function useLogging(config: Partial<LogConfig> = {}) {
  const { enabled: analyticsEnabled } = useFeatureFlag('analytics')
  
  const defaultConfig: LogConfig = {
    maxEntries: 1000,
    enableConsole: true,
    enableRemote: true,
    enableStorage: true,
    logLevel: 'info',
  }

  const finalConfig = { ...defaultConfig, ...config }
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isEnabled, setIsEnabled] = useState(analyticsEnabled)

  // Generate unique session ID
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

  // Check if log level should be processed
  const shouldLog = useCallback((level: LogEntry['level']): boolean => {
    const levels = ['debug', 'info', 'warn', 'error']
    const currentLevelIndex = levels.indexOf(finalConfig.logLevel)
    const messageLevelIndex = levels.indexOf(level)
    return messageLevelIndex >= currentLevelIndex
  }, [finalConfig.logLevel])

  // Add log entry
  const addLog = useCallback((entry: Omit<LogEntry, 'id' | 'timestamp' | 'sessionId' | 'url' | 'userAgent'>) => {
    if (!isEnabled || !shouldLog(entry.level)) return

    const logEntry: LogEntry = {
      ...entry,
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      sessionId,
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : '',
    }

    setLogs(prev => {
      const newLogs = [...prev, logEntry]
      // Keep only the last maxEntries
      return newLogs.slice(-finalConfig.maxEntries)
    })

    // Console logging
    if (finalConfig.enableConsole) {
      const consoleMethod = entry.level === 'debug' ? 'log' : entry.level
      console[consoleMethod](`[${entry.category}] ${entry.message}`, entry.context)
    }

    // Remote logging
    if (finalConfig.enableRemote) {
      sendLogToRemote(logEntry)
    }

    // Local storage logging
    if (finalConfig.enableStorage) {
      saveLogToStorage(logEntry)
    }
  }, [isEnabled, shouldLog, finalConfig, sessionId])

  // Send log to remote service
  const sendLogToRemote = useCallback(async (logEntry: LogEntry) => {
    try {
      await fetch('/api/logging/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logEntry),
      })
    } catch (error) {
      console.error('Failed to send log to remote service:', error)
    }
  }, [])

  // Save log to local storage
  const saveLogToStorage = useCallback((logEntry: LogEntry) => {
    if (typeof window === 'undefined') return

    try {
      const storageKey = 'mysonai_logs'
      const existingLogs = JSON.parse(localStorage.getItem(storageKey) || '[]')
      const updatedLogs = [...existingLogs, logEntry].slice(-finalConfig.maxEntries)
      localStorage.setItem(storageKey, JSON.stringify(updatedLogs))
    } catch (error) {
      console.error('Failed to save log to storage:', error)
    }
  }, [finalConfig.maxEntries])

  // Log methods
  const debug = useCallback((message: string, category: string = 'general', context?: Record<string, any>) => {
    addLog({ level: 'debug', message, category, context })
  }, [addLog])

  const info = useCallback((message: string, category: string = 'general', context?: Record<string, any>) => {
    addLog({ level: 'info', message, category, context })
  }, [addLog])

  const warn = useCallback((message: string, category: string = 'general', context?: Record<string, any>) => {
    addLog({ level: 'warn', message, category, context })
  }, [addLog])

  const error = useCallback((message: string, category: string = 'general', context?: Record<string, any>) => {
    addLog({ level: 'error', message, category, context })
  }, [addLog])

  // Specialized logging methods
  const logUserAction = useCallback((action: string, target?: string, context?: Record<string, any>) => {
    info(`User action: ${action}${target ? ` on ${target}` : ''}`, 'user_action', {
      action,
      target,
      ...context,
    })
  }, [info])

  const logAPICall = useCallback((
    method: string,
    endpoint: string,
    status: number,
    duration?: number,
    context?: Record<string, any>
  ) => {
    const level = status >= 400 ? 'error' : status >= 300 ? 'warn' : 'info'
    const message = `API ${method} ${endpoint} - ${status}${duration ? ` (${duration}ms)` : ''}`
    
    addLog({
      level,
      message,
      category: 'api',
      context: {
        method,
        endpoint,
        status,
        duration,
        ...context,
      }
    })
  }, [addLog])

  const logPerformance = useCallback((
    metric: string,
    value: number,
    unit: string = 'ms',
    context?: Record<string, any>
  ) => {
    info(`Performance: ${metric} = ${value}${unit}`, 'performance', {
      metric,
      value,
      unit,
      ...context,
    })
  }, [info])

  const logSecurity = useCallback((event: string, context?: Record<string, any>) => {
    warn(`Security event: ${event}`, 'security', context)
  }, [warn])

  const logBusiness = useCallback((event: string, value?: number, context?: Record<string, any>) => {
    info(`Business event: ${event}${value ? ` (value: ${value})` : ''}`, 'business', {
      event,
      value,
      ...context,
    })
  }, [info])

  // Log filtering and search
  const getLogsByLevel = useCallback((level: LogEntry['level']) => {
    return logs.filter(log => log.level === level)
  }, [logs])

  const getLogsByCategory = useCallback((category: string) => {
    return logs.filter(log => log.category === category)
  }, [logs])

  const getLogsByTimeRange = useCallback((startTime: number, endTime: number) => {
    return logs.filter(log => log.timestamp >= startTime && log.timestamp <= endTime)
  }, [logs])

  const searchLogs = useCallback((query: string) => {
    const lowercaseQuery = query.toLowerCase()
    return logs.filter(log => 
      log.message.toLowerCase().includes(lowercaseQuery) ||
      log.category.toLowerCase().includes(lowercaseQuery) ||
      (log.context && JSON.stringify(log.context).toLowerCase().includes(lowercaseQuery))
    )
  }, [logs])

  // Log statistics
  const getLogStats = useCallback(() => {
    const total = logs.length
    const byLevel = logs.reduce((acc, log) => {
      acc[log.level] = (acc[log.level] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const byCategory = logs.reduce((acc, log) => {
      acc[log.category] = (acc[log.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const recent = logs.filter(log => 
      Date.now() - log.timestamp < 60 * 60 * 1000 // Last hour
    ).length

    return {
      total,
      recent,
      byLevel,
      byCategory,
      errorCount: byLevel.error || 0,
      warnCount: byLevel.warn || 0,
    }
  }, [logs])

  // Clear logs
  const clearLogs = useCallback(() => {
    setLogs([])
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mysonai_logs')
    }
  }, [])

  // Export logs
  const exportLogs = useCallback((format: 'json' | 'csv' = 'json') => {
    if (format === 'json') {
      return JSON.stringify(logs, null, 2)
    } else {
      const headers = ['timestamp', 'level', 'category', 'message', 'context']
      const csvRows = [headers.join(',')]
      
      logs.forEach(log => {
        const row = [
          new Date(log.timestamp).toISOString(),
          log.level,
          log.category,
          `"${log.message.replace(/"/g, '""')}"`,
          `"${JSON.stringify(log.context || {}).replace(/"/g, '""')}"`
        ]
        csvRows.push(row.join(','))
      })
      
      return csvRows.join('\n')
    }
  }, [logs])

  // Enable/disable logging
  const setLoggingEnabled = useCallback((enabled: boolean) => {
    setIsEnabled(enabled)
  }, [])

  return {
    logs,
    isEnabled,
    debug,
    info,
    warn,
    error,
    logUserAction,
    logAPICall,
    logPerformance,
    logSecurity,
    logBusiness,
    getLogsByLevel,
    getLogsByCategory,
    getLogsByTimeRange,
    searchLogs,
    getLogStats,
    clearLogs,
    exportLogs,
    setLoggingEnabled,
  }
}
