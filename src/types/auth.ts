export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  plan: 'free' | 'pro' | 'enterprise'
  createdAt: Date
  lastLoginAt: Date
  usage: UsageStats
}

export interface UsageStats {
  totalMessages: number
  totalTokens: number
  imagesGenerated: number
  lastResetDate: Date
  monthlyLimit: MonthlyLimit
}

export interface MonthlyLimit {
  messages: number
  tokens: number
  images: number
}

export const USAGE_LIMITS = {
  guest: {
    messages: 5,
    tokens: 1000,
    images: 2
  },
  free: {
    messages: 50,
    tokens: 10000,
    images: 10
  },
  pro: {
    messages: 500,
    tokens: 100000,
    images: 100
  },
  enterprise: {
    messages: -1, // unlimited
    tokens: -1, // unlimited
    images: -1 // unlimited
  }
} as const

export interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'ai'
  agent?: string
  timestamp: Date
  tokens?: number
  userId?: string
}

export interface ChatSession {
  id: string
  userId?: string
  messages: ChatMessage[]
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}
