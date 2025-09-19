'use client';

import { AccessibilityProvider } from './accessibility-provider';
import { SkipToContent } from './skip-to-content';
import { AccessibilityToolbar } from './accessibility-toolbar';

interface AccessibilityWrapperProps {
  children: React.ReactNode;
  enableSkipToContent?: boolean;
  enableToolbar?: boolean;
}

export function AccessibilityWrapper({
  children,
  enableSkipToContent = true,
  enableToolbar = true,
}: AccessibilityWrapperProps) {
  return (
    <AccessibilityProvider>
      {enableSkipToContent && <SkipToContent />}
      {children}
      {enableToolbar && <AccessibilityToolbar />}
    </AccessibilityProvider>
  );
}
