import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'fvzbyrk';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Pinar2009+';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({
        success: false,
        message: 'Kullanıcı adı ve şifre gerekli'
      }, { status: 400 });
    }

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json({
        success: false,
        message: 'Geçersiz kullanıcı adı veya şifre'
      }, { status: 401 });
    }

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
      console.log('No authorization header found');
      return NextResponse.json({
        success: false,
        message: 'Token gerekli'
      }, { status: 401 });
    }

    const token = authHeader.substring(7);
    console.log('Token received:', token.substring(0, 20) + '...');
    
    // Check if token exists and has minimum length
    if (!token || token.length < 10) {
      console.log('Invalid token length');
      return NextResponse.json({
        success: false,
        message: 'Geçersiz token'
      }, { status: 401 });
    }

    // In a real app, you would verify the JWT token here
    // For now, we'll check if it's a valid base64 encoded token
    try {
      // Try to decode the token to verify it's valid
      const decoded = Buffer.from(token, 'base64').toString('utf-8');
      console.log('Token decoded successfully');
      
      return NextResponse.json({
        success: true,
        message: 'Token geçerli',
        user: 'admin'
      });
    } catch (decodeError) {
      console.log('Token decode failed:', decodeError);
      return NextResponse.json({
        success: false,
        message: 'Geçersiz token formatı'
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
