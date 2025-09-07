import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/dashboard';

  if (code) {
    // Basit redirect - Supabase client-side'da session'ı handle edecek
    const redirectUrl = `${origin}${next}`;
    return NextResponse.redirect(redirectUrl);
  }

  // Error durumunda ana sayfaya yönlendir
  return NextResponse.redirect(`${origin}/`);
}
