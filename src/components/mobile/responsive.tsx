'use client';

import { useMobileContext } from './mobile-provider';
import { cn } from '@/lib/utils';

interface ResponsiveProps {
  children: React.ReactNode;
  mobile?: React.ReactNode;
  tablet?: React.ReactNode;
  desktop?: React.ReactNode;
  className?: string;
  mobileClassName?: string;
  tabletClassName?: string;
  desktopClassName?: string;
  hideOnMobile?: boolean;
  hideOnTablet?: boolean;
  hideOnDesktop?: boolean;
  showOnMobile?: boolean;
  showOnTablet?: boolean;
  showOnDesktop?: boolean;
}

export function Responsive({
  children,
  mobile,
  tablet,
  desktop,
  className,
  mobileClassName,
  tabletClassName,
  desktopClassName,
  hideOnMobile = false,
  hideOnTablet = false,
  hideOnDesktop = false,
  showOnMobile = false,
  showOnTablet = false,
  showOnDesktop = false,
}: ResponsiveProps) {
  const { isMobile, isTablet, isDesktop } = useMobileContext();

  // Determine what to render
  const getContent = () => {
    if (isMobile && mobile !== undefined) {
      return mobile;
    }
    if (isTablet && tablet !== undefined) {
      return tablet;
    }
    if (isDesktop && desktop !== undefined) {
      return desktop;
    }
    return children;
  };

  // Determine visibility
  const shouldShow = () => {
    if (hideOnMobile && isMobile) {
      return false;
    }
    if (hideOnTablet && isTablet) {
      return false;
    }
    if (hideOnDesktop && isDesktop) {
      return false;
    }
    if (showOnMobile && !isMobile) {
      return false;
    }
    if (showOnTablet && !isTablet) {
      return false;
    }
    if (showOnDesktop && !isDesktop) {
      return false;
    }
    return true;
  };

  if (!shouldShow()) {
    return null;
  }

  const content = getContent();
  const responsiveClassName = cn(
    className,
    isMobile && mobileClassName,
    isTablet && tabletClassName,
    isDesktop && desktopClassName
  );

  return <div className={responsiveClassName}>{content}</div>;
}

// Mobile-only component
export function MobileOnly({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Responsive className={className} showOnMobile>
      {children}
    </Responsive>
  );
}

// Tablet-only component
export function TabletOnly({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Responsive className={className} showOnTablet>
      {children}
    </Responsive>
  );
}

// Desktop-only component
export function DesktopOnly({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Responsive className={className} showOnDesktop>
      {children}
    </Responsive>
  );
}

// Hide on mobile component
export function HideOnMobile({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Responsive className={className} hideOnMobile>
      {children}
    </Responsive>
  );
}

// Hide on tablet component
export function HideOnTablet({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Responsive className={className} hideOnTablet>
      {children}
    </Responsive>
  );
}

// Hide on desktop component
export function HideOnDesktop({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Responsive className={className} hideOnDesktop>
      {children}
    </Responsive>
  );
}
