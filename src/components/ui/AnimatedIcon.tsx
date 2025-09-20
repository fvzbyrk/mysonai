'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedIconProps {
  children: ReactNode;
  className?: string;
  animationType?: 'float' | 'pulse' | 'rotate' | 'scale';
  delay?: number;
}

export function AnimatedIcon({
  children,
  className,
  animationType = 'float',
  delay = 0,
}: AnimatedIconProps) {
  const animationClasses = {
    float: 'animate-float',
    pulse: 'animate-pulse',
    rotate: 'animate-spin',
    scale: 'animate-scale-in',
  };

  return (
    <div
      className={cn('inline-block', animationClasses[animationType], className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

// Pre-built animated icons for common use cases
export function AIIcon({ className }: { className?: string }) {
  return (
    <AnimatedIcon animationType='float' className={className}>
      <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center'>
        <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
        </svg>
      </div>
    </AnimatedIcon>
  );
}

export function VideoIcon({ className }: { className?: string }) {
  return (
    <AnimatedIcon animationType='pulse' delay={0.2} className={className}>
      <div className='w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center'>
        <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M8 5v14l11-7z' />
        </svg>
      </div>
    </AnimatedIcon>
  );
}

export function MusicIcon({ className }: { className?: string }) {
  return (
    <AnimatedIcon animationType='rotate' delay={0.4} className={className}>
      <div className='w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center'>
        <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z' />
        </svg>
      </div>
    </AnimatedIcon>
  );
}

export function EducationIcon({ className }: { className?: string }) {
  return (
    <AnimatedIcon animationType='scale' delay={0.6} className={className}>
      <div className='w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center'>
        <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z' />
        </svg>
      </div>
    </AnimatedIcon>
  );
}

export function LegalIcon({ className }: { className?: string }) {
  return (
    <AnimatedIcon animationType='float' delay={0.8} className={className}>
      <div className='w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center'>
        <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z' />
        </svg>
      </div>
    </AnimatedIcon>
  );
}

export function KidsIcon({ className }: { className?: string }) {
  return (
    <AnimatedIcon animationType='pulse' delay={1.0} className={className}>
      <div className='w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center'>
        <svg className='w-6 h-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
          <path d='M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z' />
        </svg>
      </div>
    </AnimatedIcon>
  );
}

