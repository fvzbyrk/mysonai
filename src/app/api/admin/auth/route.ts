import { NextRequest, NextResponse } from 'next/server';
import { SignJWT, jwtVerify } from 'jose';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'fvzbyrk';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Pinar2009+';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

// Rate limiting for failed attempts
const failedAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();
    const clientIP = request.ip || request.headers.get('x-forwarded-for') || 'unknown';

    // Check rate limiting
    const now = Date.now();
    const attempts = failedAttempts.get(clientIP);
    
    if (attempts && attempts.count >= MAX_ATTEMPTS) {
      if (now - attempts.lastAttempt < LOCKOUT_TIME) {
        return NextResponse.json({
          success: false,
          message: 'Çok fazla başarısız giriş denemesi. 15 dakika sonra tekrar deneyin.'
        }, { status: 429 });
      } else {
        // Reset attempts after lockout period
        failedAttempts.delete(clientIP);
      }
    }

    if (!username || !password) {
      return NextResponse.json({
        success: false,
        message: 'Kullanıcı adı ve şifre gerekli'
      }, { status: 400 });
    }

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      // Increment failed attempts
      const currentAttempts = failedAttempts.get(clientIP) || { count: 0, lastAttempt: 0 };
      failedAttempts.set(clientIP, {
        count: currentAttempts.count + 1,
        lastAttempt: now
      });

      return NextResponse.json({
        success: false,
        message: 'Geçersiz kullanıcı adı veya şifre'
      }, { status: 401 });
    }

    // Clear failed attempts on successful login
    failedAttempts.delete(clientIP);

    // Create JWT token
    const token = await new SignJWT({ 
      role: 'admin',
      timestamp: Date.now()
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(JWT_SECRET);

    return NextResponse.json({
      success: true,
      message: 'Giriş başarılı',
      token
    });
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json({
      success: false,
      message: 'Giriş hatası'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({
        success: false,
        message: 'Token gerekli'
      }, { status: 401 });
    }

    const token = authHeader.substring(7);
    
    if (!token || token.length < 10) {
      return NextResponse.json({
        success: false,
        message: 'Geçersiz token'
      }, { status: 401 });
    }

    try {
      // Properly verify JWT token
      const { payload } = await jwtVerify(token, JWT_SECRET);
      
      // Check if token is expired
      if (payload.exp && payload.exp < Date.now() / 1000) {
        return NextResponse.json({
          success: false,
          message: 'Token süresi dolmuş'
        }, { status: 401 });
      }

      // Check if user has admin role
      if (payload.role !== 'admin') {
        return NextResponse.json({
          success: false,
          message: 'Yetkisiz erişim'
        }, { status: 403 });
      }
      
      return NextResponse.json({
        success: true,
        message: 'Token geçerli',
        user: 'admin',
        role: payload.role
      });
    } catch (jwtError) {
      return NextResponse.json({
        success: false,
        message: 'Geçersiz token'
      }, { status: 401 });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({
      success: false,
      message: 'Token doğrulama hatası'
    }, { status: 500 });
  }
}
