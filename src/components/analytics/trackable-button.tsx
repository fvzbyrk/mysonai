'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { useAnalyticsContext } from './analytics-provider';

interface TrackableButtonProps extends ButtonProps {
  trackingName: string;
  trackingLocation?: string;
  children: React.ReactNode;
}

export function TrackableButton({
  trackingName,
  trackingLocation,
  onClick,
  children,
  ...props
}: TrackableButtonProps) {
  const { trackButtonClick } = useAnalyticsContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackButtonClick(trackingName, trackingLocation);
    onClick?.(e);
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
}
