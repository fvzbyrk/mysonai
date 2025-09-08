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

  // Only handle www redirect for now - disable locale redirects temporarily
  if (hostname.startsWith('www.')) {
    const newHostname = hostname.replace('www.', '');
    return NextResponse.redirect(new URL(`https://${newHostname}${pathname}`, request.url), {
      status: 301,
    });
  }

  // For now, just pass through all requests to prevent redirect loops
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only match root and www redirects for now
    '/',
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap|.*\\.).*)',
  ],
};
