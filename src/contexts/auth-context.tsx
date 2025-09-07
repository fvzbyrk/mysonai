"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase-client'
import { User as AppUser } from '@/types/auth'

interface AuthContextType {
  user: AppUser | null
  session: Session | null
  loading: boolean
  signUp: (_email: string, _password: string, _name?: string) => Promise<{ error: any }>
  signIn: (_email: string, _password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
  resetPassword: (_email: string) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [supabase, setSupabase] = useState<any>(null)

  useEffect(() => {
    try {
      const client = createClient()
      setSupabase(client)
    } catch (error) {
      console.log('Supabase not configured yet:', error)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!supabase) return

    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      if (session?.user) {
        await fetchUserProfile(session.user)
      }
      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        if (session?.user) {
          await fetchUserProfile(session.user)
        } else {
          setUser(null)
        }
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  const fetchUserProfile = async (supabaseUser: User) => {
    try {
      // Fetch user profile from our users table
      const { data: profile, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', supabaseUser.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching user profile:', error)
        // If table doesn't exist yet, create a basic user object
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email!,
          name: supabaseUser.user_metadata?.name,
          avatar: supabaseUser.user_metadata?.avatar_url,
          plan: 'free',
          createdAt: new Date(supabaseUser.created_at),
          lastLoginAt: new Date(),
          usage: {
            totalMessages: 0,
            totalTokens: 0,
            imagesGenerated: 0,
            lastResetDate: new Date(),
            monthlyLimit: { messages: 50, tokens: 10000, images: 10 }
          }
        })
        return
      }

      if (profile) {
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email!,
          name: profile.name || supabaseUser.user_metadata?.name,
          avatar: profile.avatar || supabaseUser.user_metadata?.avatar_url,
          plan: profile.plan || 'free',
          createdAt: new Date(supabaseUser.created_at),
          lastLoginAt: new Date(),
          usage: profile.usage || {
            totalMessages: 0,
            totalTokens: 0,
            imagesGenerated: 0,
            lastResetDate: new Date(),
            monthlyLimit: { messages: 50, tokens: 10000, images: 10 }
          }
        })
      } else {
        // Create new user profile
        const newUser: AppUser = {
          id: supabaseUser.id,
          email: supabaseUser.email!,
          name: supabaseUser.user_metadata?.name,
          avatar: supabaseUser.user_metadata?.avatar_url,
          plan: 'free',
          createdAt: new Date(supabaseUser.created_at),
          lastLoginAt: new Date(),
          usage: {
            totalMessages: 0,
            totalTokens: 0,
            imagesGenerated: 0,
            lastResetDate: new Date(),
            monthlyLimit: { messages: 50, tokens: 10000, images: 10 }
          }
        }

        const { error: insertError } = await supabase
          .from('users')
          .insert([{
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            avatar: newUser.avatar,
            plan: newUser.plan,
            usage: newUser.usage
          }])

        if (insertError) {
          console.error('Error creating user profile:', insertError)
          // If insert fails, still set the user with basic info
          setUser(newUser)
        } else {
          setUser(newUser)
        }
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error)
      // Fallback: create basic user object
      setUser({
        id: supabaseUser.id,
        email: supabaseUser.email!,
        name: supabaseUser.user_metadata?.name,
        avatar: supabaseUser.user_metadata?.avatar_url,
        plan: 'free',
        createdAt: new Date(supabaseUser.created_at),
        lastLoginAt: new Date(),
        usage: {
          totalMessages: 0,
          totalTokens: 0,
          imagesGenerated: 0,
          lastResetDate: new Date(),
          monthlyLimit: { messages: 50, tokens: 10000, images: 10 }
        }
      })
    }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    if (!supabase) {
      return { error: { message: 'Supabase not configured yet' } }
    }
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        }
      }
    })
    return { error }
  }

  const signIn = async (email: string, password: string) => {
    if (!supabase) {
      return { error: { message: 'Supabase not configured yet' } }
    }
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { error }
  }

  const signOut = async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }

  const resetPassword = async (email: string) => {
    if (!supabase) {
      return { error: { message: 'Supabase not configured yet' } }
    }
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    return { error }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
