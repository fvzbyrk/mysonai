import { NextRequest, NextResponse } from 'next/server';
import { SecurityUtils } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { input, type } = body;

    if (!input || !type) {
      return NextResponse.json({ error: 'Input ve type parametreleri gerekli' }, { status: 400 });
    }

    const clientIP = SecurityUtils.getClientIP(request);

    // Rate limiting
    if (SecurityUtils.isRateLimited(clientIP, 50, 60000)) {
      return NextResponse.json(
        { error: 'Çok fazla istek gönderildi. Lütfen daha sonra tekrar deneyin.' },
        { status: 429 }
      );
    }

    let result: any = {};

    switch (type) {
      case 'email':
        result = {
          isValid: SecurityUtils.isValidEmail(input),
          sanitized: SecurityUtils.sanitizeInput(input),
        };
        break;

      case 'password':
        result = SecurityUtils.validatePassword(input);
        break;

      case 'sql-injection':
        result = {
          containsSQLInjection: SecurityUtils.containsSQLInjection(input),
          sanitized: SecurityUtils.sanitizeInput(input),
        };
        break;

      case 'xss':
        result = {
          containsXSS: SecurityUtils.containsXSS(input),
          sanitized: SecurityUtils.sanitizeHTML(input),
        };
        break;

      case 'suspicious':
        result = {
          containsSuspiciousPatterns: SecurityUtils.containsSuspiciousPatterns(input),
          sanitized: SecurityUtils.sanitizeInput(input),
        };
        break;

      default:
        return NextResponse.json({ error: 'Geçersiz validation türü' }, { status: 400 });
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error('Security validation error:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}
