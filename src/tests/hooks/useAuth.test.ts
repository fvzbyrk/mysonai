import { renderHook, act } from '@testing-library/react'
import { useAuth, useRequireAuth, useRequireGuest } from '@/hooks/useAuth'

// Mock the auth context
const mockAuthContext = {
  user: null,
  loading: false,
  signIn: jest.fn(),
  signUp: jest.fn(),
  signOut: jest.fn(),
  updateProfile: jest.fn(),
  fetchUserProfile: jest.fn(),
}

jest.mock('@/contexts/auth-context', () => ({
  useAuth: () => mockAuthContext,
}))

// Mock Next.js router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('useAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockAuthContext.user = null
    mockAuthContext.loading = false
  })

  it('returns auth context values', () => {
    const { result } = renderHook(() => useAuth())
    
    expect(result.current.user).toBeNull()
    expect(result.current.loading).toBe(false)
    expect(typeof result.current.signIn).toBe('function')
    expect(typeof result.current.signOut).toBe('function')
  })

  it('handles authenticated user', () => {
    const mockUser = { id: '1', email: 'test@example.com' }
    mockAuthContext.user = mockUser

    const { result } = renderHook(() => useAuth())
    
    expect(result.current.user).toEqual(mockUser)
  })

  it('handles loading state', () => {
    mockAuthContext.loading = true

    const { result } = renderHook(() => useAuth())
    
    expect(result.current.loading).toBe(true)
  })
})

describe('useRequireAuth Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockAuthContext.user = null
    mockAuthContext.loading = false
  })

  it('redirects when user is not authenticated', () => {
    mockAuthContext.user = null

    renderHook(() => useRequireAuth())
    
    expect(mockPush).toHaveBeenCalledWith('/signin')
  })

  it('does not redirect when user is authenticated', () => {
    const mockUser = { id: '1', email: 'test@example.com' }
    mockAuthContext.user = mockUser

    renderHook(() => useRequireAuth())
    
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('does not redirect when loading', () => {
    mockAuthContext.loading = true
    mockAuthContext.user = null

    renderHook(() => useRequireAuth())
    
    expect(mockPush).not.toHaveBeenCalled()
  })
})

describe('useRequireGuest Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockAuthContext.user = null
    mockAuthContext.loading = false
  })

  it('redirects when user is authenticated', () => {
    const mockUser = { id: '1', email: 'test@example.com' }
    mockAuthContext.user = mockUser

    renderHook(() => useRequireGuest())
    
    expect(mockPush).toHaveBeenCalledWith('/dashboard')
  })

  it('does not redirect when user is not authenticated', () => {
    mockAuthContext.user = null

    renderHook(() => useRequireGuest())
    
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('does not redirect when loading', () => {
    mockAuthContext.loading = true
    mockAuthContext.user = null

    renderHook(() => useRequireGuest())
    
    expect(mockPush).not.toHaveBeenCalled()
  })
})
