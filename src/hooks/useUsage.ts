'use client';

import { useState, useEffect } from 'react';
import { User, UsageStats, USAGE_LIMITS } from '@/types/auth';

export function useUsage(user: User | null) {
  const [usage, setUsage] = useState<UsageStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setUsage(user.usage);
    } else {
      // Guest user - get from localStorage
      const guestUsage = getGuestUsage();
      setUsage(guestUsage);
    }
    setIsLoading(false);
  }, [user]);

  const getGuestUsage = (): UsageStats => {
    if (typeof window === 'undefined') return createDefaultGuestUsage();

    const stored = localStorage.getItem('mysonai_guest_usage');
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        lastResetDate: new Date(parsed.lastResetDate),
        monthlyLimit: USAGE_LIMITS.guest,
      };
    }

    const defaultUsage = createDefaultGuestUsage();
    localStorage.setItem('mysonai_guest_usage', JSON.stringify(defaultUsage));
    return defaultUsage;
  };

  const createDefaultGuestUsage = (): UsageStats => ({
    totalMessages: 0,
    totalTokens: 0,
    imagesGenerated: 0,
    lastResetDate: new Date(),
    monthlyLimit: USAGE_LIMITS.guest,
  });

  const checkLimit = (type: 'messages' | 'tokens' | 'images'): boolean => {
    if (!usage) return false;

    const limit = usage.monthlyLimit[type];
    const current =
      type === 'messages'
        ? usage.totalMessages
        : type === 'tokens'
          ? usage.totalTokens
          : usage.imagesGenerated;

    return limit === -1 || current < limit;
  };

  const incrementUsage = (type: 'messages' | 'tokens' | 'images', amount: number = 1) => {
    if (!usage) return;

    const newUsage = {
      ...usage,
      totalMessages: type === 'messages' ? usage.totalMessages + amount : usage.totalMessages,
      totalTokens: type === 'tokens' ? usage.totalTokens + amount : usage.totalTokens,
      imagesGenerated: type === 'images' ? usage.imagesGenerated + amount : usage.imagesGenerated,
    };

    setUsage(newUsage);

    if (user) {
      // Update server
      updateServerUsage(newUsage);
    } else {
      // Update localStorage
      localStorage.setItem('mysonai_guest_usage', JSON.stringify(newUsage));
    }
  };

  const updateServerUsage = async (newUsage: UsageStats) => {
    try {
      await fetch('/api/usage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUsage),
      });
    } catch (error) {
      console.error('Failed to update usage:', error);
    }
  };

  const getUsagePercentage = (type: 'messages' | 'tokens' | 'images'): number => {
    if (!usage) return 0;

    const limit = usage.monthlyLimit[type];
    const current =
      type === 'messages'
        ? usage.totalMessages
        : type === 'tokens'
          ? usage.totalTokens
          : usage.imagesGenerated;

    if (limit === -1) return 0; // unlimited
    return Math.min((current / limit) * 100, 100);
  };

  const getRemainingUsage = (type: 'messages' | 'tokens' | 'images'): number => {
    if (!usage) return 0;

    const limit = usage.monthlyLimit[type];
    const current =
      type === 'messages'
        ? usage.totalMessages
        : type === 'tokens'
          ? usage.totalTokens
          : usage.imagesGenerated;

    if (limit === -1) return -1; // unlimited
    return Math.max(limit - current, 0);
  };

  return {
    usage,
    isLoading,
    checkLimit,
    incrementUsage,
    getUsagePercentage,
    getRemainingUsage,
    isGuest: !user,
  };
}
