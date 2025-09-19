import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  text?: string;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex flex-col items-center space-y-2'>
        <Loader2 className={cn('animate-spin text-purple-500', sizeClasses[size], className)} />
        {text && <p className='text-sm text-gray-400 animate-pulse'>{text}</p>}
      </div>
    </div>
  );
}

export function LoadingDots({ className }: { className?: string }) {
  return (
    <div className={cn('flex space-x-1', className)}>
      <div className='w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.3s]'></div>
      <div className='w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:-0.15s]'></div>
      <div className='w-2 h-2 bg-purple-500 rounded-full animate-bounce'></div>
    </div>
  );
}

export function LoadingPulse({ className }: { className?: string }) {
  return (
    <div className={cn('flex space-x-1', className)}>
      <div className='w-3 h-3 bg-purple-500 rounded-full animate-pulse'></div>
      <div className='w-3 h-3 bg-purple-500 rounded-full animate-pulse [animation-delay:0.2s]'></div>
      <div className='w-3 h-3 bg-purple-500 rounded-full animate-pulse [animation-delay:0.4s]'></div>
    </div>
  );
}
