import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // TEMPORARILY DISABLED - Just pass through all requests
  return NextResponse.next();
}

export const config = {
  matcher: [],
};
