'use client';

import { useAnalyticsContext } from './analytics-provider';
import { useState } from 'react';

interface TrackableFormProps {
  formName: string;
  children: React.ReactNode;
  onSubmit?: (e: React.FormEvent) => void;
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

export function TrackableForm({ 
  formName, 
  children, 
  onSubmit,
  onSuccess,
  onError,
  className 
}: TrackableFormProps) {
  const { trackFormSubmission, trackEngagement } = useAnalyticsContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      trackEngagement('form_submit_start', formName);
      await onSubmit?.(e);
      trackFormSubmission(formName, true);
      trackEngagement('form_submit_success', formName);
      onSuccess?.();
    } catch (error) {
      trackFormSubmission(formName, false);
      trackEngagement('form_submit_error', formName);
      onError?.(error instanceof Error ? error.message : 'Form submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={className}
      data-form-name={formName}
    >
      {children}
      {isSubmitting && (
        <div className="text-sm text-gray-400 mt-2">
          Gönderiliyor...
        </div>
      )}
    </form>
  );
}
