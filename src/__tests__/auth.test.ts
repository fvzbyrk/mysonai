import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { NextRequest } from 'next/server';
import { POST, GET } from '@/app/api/admin/auth/route';

// Mock environment variables
process.env.ADMIN_USERNAME = 'test-admin';
process.env.ADMIN_PASSWORD = 'test-password';
process.env.JWT_SECRET = 'test-secret-key';

describe('Admin Authentication API', () => {
  beforeEach(() => {
    // Clear any existing mocks
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Clean up after each test
  });

  describe('POST /api/admin/auth', () => {
    it('should return 400 for missing credentials', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'POST',
        body: JSON.stringify({}),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.message).toBe('Kullanıcı adı ve şifre gerekli');
    });

    it('should return 401 for invalid credentials', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'POST',
        body: JSON.stringify({
          username: 'wrong-username',
          password: 'wrong-password',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.message).toBe('Geçersiz kullanıcı adı veya şifre');
    });

    it('should return 200 and token for valid credentials', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'POST',
        body: JSON.stringify({
          username: 'test-admin',
          password: 'test-password',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Giriş başarılı');
      expect(data.token).toBeDefined();
      expect(typeof data.token).toBe('string');
    });

    it('should handle rate limiting', async () => {
      // Make multiple failed attempts
      for (let i = 0; i < 6; i++) {
        const request = new NextRequest('http://localhost:3000/api/admin/auth', {
          method: 'POST',
          body: JSON.stringify({
            username: 'wrong-username',
            password: 'wrong-password',
          }),
          headers: {
            'Content-Type': 'application/json',
            'x-forwarded-for': '192.168.1.1',
          },
        });

        const response = await POST(request);
        
        if (i < 5) {
          expect(response.status).toBe(401);
        } else {
          expect(response.status).toBe(429);
        }
      }
    });
  });

  describe('GET /api/admin/auth', () => {
    it('should return 401 for missing authorization header', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'GET',
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
      expect(data.message).toBe('Token gerekli');
    });

    it('should return 401 for invalid token format', async () => {
      const request = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer invalid-token',
        },
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(401);
      expect(data.success).toBe(false);
    });

    it('should return 200 for valid token', async () => {
      // First, get a valid token
      const loginRequest = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'POST',
        body: JSON.stringify({
          username: 'test-admin',
          password: 'test-password',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const loginResponse = await POST(loginRequest);
      const loginData = await loginResponse.json();
      const token = loginData.token;

      // Then verify the token
      const verifyRequest = new NextRequest('http://localhost:3000/api/admin/auth', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const response = await GET(verifyRequest);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.user).toBe('admin');
      expect(data.role).toBe('admin');
    });
  });
});

