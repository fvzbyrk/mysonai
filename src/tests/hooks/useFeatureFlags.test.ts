import { renderHook } from '@testing-library/react';
import { useFeatureFlags, useFeatureFlag } from '@/hooks/useFeatureFlags';

// Mock the feature flags module
jest.mock('@/lib/feature-flags', () => ({
  getFeatureFlags: jest.fn().mockReturnValue({
    assistants: true,
    demo: true,
    pricing: true,
    blog: true,
    auth: true,
    analytics: true,
    notifications: true,
    privacy: true,
    terms: true,
    cookies: true,
    gdpr: true,
  }),
  isFeatureEnabled: jest.fn().mockImplementation((feature: string) => {
    const flags = {
      assistants: true,
      demo: true,
      pricing: true,
      blog: true,
      auth: true,
      analytics: true,
      notifications: true,
      privacy: true,
      terms: true,
      cookies: true,
      gdpr: true,
    };
    return flags[feature as keyof typeof flags] === true;
  }),
}));

describe('useFeatureFlags Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns all feature flags', () => {
    const { result } = renderHook(() => useFeatureFlags());

    expect(result.current.flags).toEqual({
      assistants: true,
      demo: true,
      pricing: true,
      blog: true,
      auth: true,
      analytics: true,
      notifications: true,
      privacy: true,
      terms: true,
      cookies: true,
      gdpr: true,
    });
    expect(result.current.loading).toBe(false);
    expect(typeof result.current.isEnabled).toBe('function');
  });

  it('returns correct flag values', () => {
    const { result } = renderHook(() => useFeatureFlags());

    expect(result.current.flags?.assistants).toBe(true);
    expect(result.current.flags?.demo).toBe(true);
    expect(result.current.flags?.pricing).toBe(true);
    expect(result.current.flags?.blog).toBe(true);
  });

  it('handles undefined flags gracefully', () => {
    const { result } = renderHook(() => useFeatureFlags());

    expect(result.current.flags?.assistants).toBe(true);
    expect(result.current.flags?.demo).toBe(true);
    expect(result.current.flags?.pricing).toBe(true);
  });
});

describe('useFeatureFlag Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns single feature flag', () => {
    const { result } = renderHook(() => useFeatureFlag('assistants'));

    expect(result.current.enabled).toBe(true);
  });

  it('returns disabled flag', () => {
    const { result } = renderHook(() => useFeatureFlag('assistants'));

    expect(result.current.enabled).toBe(true);
  });

  it('handles non-existent flag', () => {
    const { result } = renderHook(() => useFeatureFlag('nonExistent' as any));

    expect(result.current.enabled).toBe(false);
  });

  it('returns same reference for same flag', () => {
    const { result: result1 } = renderHook(() => useFeatureFlag('assistants'));
    const { result: result2 } = renderHook(() => useFeatureFlag('assistants'));

    expect(result1.current).toEqual(result2.current);
  });
});
