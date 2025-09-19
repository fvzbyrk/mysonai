'use client';

import { MobileProvider } from './mobile-provider';
import { Responsive } from './responsive';

interface MobileWrapperProps {
  children: React.ReactNode;
  enableResponsive?: boolean;
  enableMobileOptimizations?: boolean;
}

export function MobileWrapper({
  children,
  enableResponsive = true,
  enableMobileOptimizations = true,
}: MobileWrapperProps) {
  return (
    <MobileProvider>
      {enableResponsive && <Responsive>{children}</Responsive>}
      {!enableResponsive && children}
    </MobileProvider>
  );
}

// Export all mobile components
export {
  Responsive,
  MobileOnly,
  TabletOnly,
  DesktopOnly,
  HideOnMobile,
  HideOnTablet,
  HideOnDesktop,
} from './responsive';

export { MobileNavigation } from './mobile-navigation';
