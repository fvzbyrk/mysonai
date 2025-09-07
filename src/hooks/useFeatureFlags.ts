'use client';

import { useState, useEffect } from 'react';
import { FeatureFlags, getFeatureFlags, isFeatureEnabled } from '@/lib/feature-flags';

export function useFeatureFlags() {
  const [flags, setFlags] = useState<FeatureFlags | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In client-side, we can get flags immediately
    const featureFlags = getFeatureFlags();
    setFlags(featureFlags);
    setLoading(false);
  }, []);

  return {
    flags,
    loading,
    isEnabled: (feature: keyof FeatureFlags) => (flags ? isFeatureEnabled(feature) : false),
  };
}

// Individual feature hooks for better performance
export function useFeatureFlag(feature: keyof FeatureFlags) {
  const { isEnabled, loading } = useFeatureFlags();

  return {
    enabled: isEnabled(feature),
    loading,
  };
}

// Hook for checking multiple features
export function useMultipleFeatureFlags(features: (keyof FeatureFlags)[]) {
  const { flags, loading } = useFeatureFlags();

  const enabledFeatures = features.filter(feature => (flags ? isFeatureEnabled(feature) : false));

  const disabledFeatures = features.filter(feature => (flags ? !isFeatureEnabled(feature) : true));

  return {
    enabledFeatures,
    disabledFeatures,
    allEnabled: enabledFeatures.length === features.length,
    anyEnabled: enabledFeatures.length > 0,
    loading,
  };
}
