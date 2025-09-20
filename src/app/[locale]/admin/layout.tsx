'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminErrorBoundary } from '@/components/admin-error-boundary';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    console.log('Admin layout useEffect triggered, pathname:', pathname);

    // Skip auth check for login page (both TR and EN)
    if (pathname === '/tr/admin/login' || pathname === '/en/admin/login') {
      console.log('Login page detected, skipping auth check');
      setIsCheckingAuth(false);
      return;
    }

    // Check authentication for all other admin pages
    const checkAuth = async () => {
      console.log('Starting auth check...');

      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        console.log('Server-side rendering, skipping auth check');
        setIsCheckingAuth(false);
        return;
      }

      const token = localStorage.getItem('admin_token');
      console.log('Token found:', !!token);

      if (!token) {
        console.log('No admin token found, redirecting to login');
        // Determine correct login path based on current locale
        const loginPath = pathname.startsWith('/en') ? '/en/admin/login' : '/tr/admin/login';
        console.log('Redirecting to:', loginPath);
        router.push(loginPath);
        return;
      }

      try {
        console.log('Validating admin token...');
        const response = await fetch('/api/admin/auth', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        console.log('Auth result:', result);

        if (result.success) {
          console.log('Authentication successful, setting authenticated to true');
          setIsAuthenticated(true);
        } else {
          console.log('Authentication failed, redirecting to login');
          localStorage.removeItem('admin_token');
          // Determine correct login path based on current locale
          const loginPath = pathname.startsWith('/en') ? '/en/admin/login' : '/tr/admin/login';
          router.push(loginPath);
        }
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('admin_token');
        // Determine correct login path based on current locale
        const loginPath = pathname.startsWith('/en') ? '/en/admin/login' : '/tr/admin/login';
        router.push(loginPath);
      } finally {
        console.log('Auth check completed, setting isCheckingAuth to false');
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router, pathname]);

  // Show loading while checking auth
  if (isCheckingAuth) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4'></div>
          <p className='text-white'>Kimlik doğrulanıyor...</p>
        </div>
      </div>
    );
  }

  // Show login redirect if not authenticated (except for login page)
  if (!isAuthenticated && pathname !== '/tr/admin/login' && pathname !== '/en/admin/login') {
    return null; // Will redirect to login
  }

  return <AdminErrorBoundary>{children}</AdminErrorBoundary>;
}
