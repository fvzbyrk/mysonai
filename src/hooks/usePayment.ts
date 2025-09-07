"use client"

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { getStripe } from '@/lib/stripe'
import { PLANS, PlanType } from '@/lib/stripe'

interface Subscription {
  id: string
  status: string
  current_period_end: number
  cancel_at_period_end: boolean
  plan: PlanType
}

interface PaymentState {
  loading: boolean
  error: string | null
  subscription: Subscription | null
}

export function usePayment() {
  const { user } = useAuth()
  const [state, setState] = useState<PaymentState>({
    loading: false,
    error: null,
    subscription: null
  })

  // Fetch subscription data
  const fetchSubscription = async () => {
    if (!user) return

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch(`/api/subscription?userId=${user.id}`)
      const data = await response.json()

      if (response.ok) {
        setState(prev => ({ 
          ...prev, 
          subscription: data.subscription,
          loading: false 
        }))
      } else {
        setState(prev => ({ 
          ...prev, 
          error: data.error || 'Failed to fetch subscription',
          loading: false 
        }))
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Network error',
        loading: false 
      }))
    }
  }

  // Create checkout session
  const createCheckout = async (plan: PlanType) => {
    if (!user || plan === 'free') {
      setState(prev => ({ ...prev, error: 'Invalid plan or user' }))
      return null
    }

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          userId: user.id
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setState(prev => ({ ...prev, loading: false }))
        return data.sessionId
      } else {
        setState(prev => ({ 
          ...prev, 
          error: data.error || 'Failed to create checkout',
          loading: false 
        }))
        return null
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Network error',
        loading: false 
      }))
      return null
    }
  }

  // Redirect to Stripe checkout
  const redirectToCheckout = async (plan: PlanType) => {
    const sessionId = await createCheckout(plan)
    
    if (sessionId) {
      const stripe = await getStripe()
      await stripe?.redirectToCheckout({ sessionId })
    }
  }

  // Cancel subscription
  const cancelSubscription = async () => {
    if (!user) return

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'cancel',
          userId: user.id
        }),
      })

      if (response.ok) {
        await fetchSubscription() // Refresh subscription data
      } else {
        const data = await response.json()
        setState(prev => ({ 
          ...prev, 
          error: data.error || 'Failed to cancel subscription',
          loading: false 
        }))
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Network error',
        loading: false 
      }))
    }
  }

  // Resume subscription
  const resumeSubscription = async () => {
    if (!user) return

    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'resume',
          userId: user.id
        }),
      })

      if (response.ok) {
        await fetchSubscription() // Refresh subscription data
      } else {
        const data = await response.json()
        setState(prev => ({ 
          ...prev, 
          error: data.error || 'Failed to resume subscription',
          loading: false 
        }))
      }
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Network error',
        loading: false 
      }))
    }
  }

  // Get billing portal URL
  const getBillingPortal = async () => {
    if (!user) return null

    try {
      const response = await fetch('/api/billing/portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id
        }),
      })

      const data = await response.json()
      return data.url
    } catch (error) {
      setState(prev => ({ ...prev, error: 'Failed to get billing portal' }))
      return null
    }
  }

  // Redirect to billing portal
  const redirectToBillingPortal = async () => {
    const url = await getBillingPortal()
    if (url) {
      window.location.href = url
    }
  }

  // Get plan info
  const getPlanInfo = (plan: PlanType) => {
    return PLANS[plan]
  }

  // Check if user can upgrade
  const canUpgrade = (targetPlan: PlanType) => {
    if (!user) return false
    
    const currentPlan = user.plan as PlanType
    const planHierarchy = { free: 0, pro: 1, enterprise: 2 }
    
    return planHierarchy[targetPlan] > planHierarchy[currentPlan]
  }

  // Check if user can downgrade
  const canDowngrade = (targetPlan: PlanType) => {
    if (!user) return false
    
    const currentPlan = user.plan as PlanType
    const planHierarchy = { free: 0, pro: 1, enterprise: 2 }
    
    return planHierarchy[targetPlan] < planHierarchy[currentPlan]
  }

  // Fetch subscription on mount
  useEffect(() => {
    if (user) {
      fetchSubscription()
    }
  }, [user])

  return {
    ...state,
    fetchSubscription,
    redirectToCheckout,
    cancelSubscription,
    resumeSubscription,
    redirectToBillingPortal,
    getPlanInfo,
    canUpgrade,
    canDowngrade,
  }
}
