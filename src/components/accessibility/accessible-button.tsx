'use client';

import { forwardRef, useRef, useEffect } from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { useAccessibilityContext } from './accessibility-provider';
import { cn } from '@/lib/utils';

interface AccessibleButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
  success?: boolean;
  successText?: string;
  error?: boolean;
  errorText?: string;
  description?: string;
  ariaDescribedBy?: string;
}

export const AccessibleButton = forwardRef<HTMLButtonElement, AccessibleButtonProps>(
  (
    {
      children,
      loading = false,
      loadingText = 'Yükleniyor...',
      success = false,
      successText = 'Başarılı',
      error = false,
      errorText = 'Hata oluştu',
      description,
      ariaDescribedBy,
      className,
      disabled,
      onClick,
      ...props
    },
    ref
  ) => {
    const { announce, focusVisible } = useAccessibilityContext();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const combinedRef = ref || buttonRef;

    // Announce state changes
    useEffect(() => {
      if (loading) {
        announce(loadingText);
      } else if (success) {
        announce(successText);
      } else if (error) {
        announce(errorText);
      }
    }, [loading, success, error, loadingText, successText, errorText, announce]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (loading || disabled) {
        return;
      }

      // Announce action
      if (typeof children === 'string') {
        announce(`${children} butonuna tıklandı`);
      }

      onClick?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick(e as any);
      }
    };

    return (
      <Button
        ref={combinedRef}
        className={cn(
          'transition-all duration-200',
          focusVisible && 'ring-2 ring-purple-500 ring-offset-2',
          loading && 'opacity-75 cursor-not-allowed',
          success && 'bg-green-600 hover:bg-green-700',
          error && 'bg-red-600 hover:bg-red-700',
          className
        )}
        disabled={disabled || loading}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-describedby={ariaDescribedBy}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <div className='flex items-center'>
            <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2' />
            {loadingText}
          </div>
        ) : success ? (
          <div className='flex items-center'>
            <span className='mr-2'>✓</span>
            {successText}
          </div>
        ) : error ? (
          <div className='flex items-center'>
            <span className='mr-2'>✗</span>
            {errorText}
          </div>
        ) : (
          children
        )}

        {description && <span className='sr-only'>{description}</span>}
      </Button>
    );
  }
);

AccessibleButton.displayName = 'AccessibleButton';
