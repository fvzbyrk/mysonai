'use client';

import { useEffect } from 'react';
import { EnhancedError } from '@/components/ui/error-handling';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <EnhancedError 
      error={error} 
      reset={reset}
      showDetails={process.env.NODE_ENV === 'development'}
    />
  );
}
