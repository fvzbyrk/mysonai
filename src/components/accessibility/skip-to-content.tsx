'use client';

import { useAccessibilityContext } from './accessibility-provider';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function SkipToContent() {
  const { skipToContent } = useAccessibilityContext();

  return (
    <Button
      onClick={skipToContent}
      className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-200'
      aria-label='Ana içeriğe atla'
    >
      <ArrowRight className='w-4 h-4 mr-2' />
      Ana İçeriğe Atla
    </Button>
  );
}
