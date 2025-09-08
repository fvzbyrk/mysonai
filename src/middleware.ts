import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hostname = request.headers.get('host') || '';

  // Skip middleware for API routes, static files, and internal Next.js paths
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Handle www redirect (www.mysonai.com -> mysonai.com)
  if (hostname.startsWith('www.')) {
    const newHostname = hostname.replace('www.', '');
    return NextResponse.redirect(new URL(`https://${newHostname}${pathname}`, request.url), {
      status: 301,
    });
  }

  // All other requests pass through - Next.js routing will handle locale redirects
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only match root path and www redirects
    '/',
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap|.*\\.).*)',
  ],
};
