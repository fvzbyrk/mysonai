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
    // Skip auth check for login page
    if (pathname === '/tr/admin/login') {
      setIsCheckingAuth(false);
      return;
    }

    // Check authentication for all other admin pages
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token');

      if (!token) {
        console.log('No admin token found, redirecting to login');
        router.push('/tr/admin/login');
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
          console.log('Authentication successful');
          setIsAuthenticated(true);
        } else {
          console.log('Authentication failed, redirecting to login');
          localStorage.removeItem('admin_token');
          router.push('/tr/admin/login');
        }
      } catch (error) {
        console.error('Authentication error:', error);
        localStorage.removeItem('admin_token');
        router.push('/tr/admin/login');
      } finally {
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
  if (!isAuthenticated && pathname !== '/tr/admin/login') {
    return null; // Will redirect to login
  }

  return (
    <AdminErrorBoundary>
      {children}
    </AdminErrorBoundary>
  );
}
