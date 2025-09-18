import { NextRequest } from 'next/server';

// Security utilities
export class SecurityUtils {
  // Sanitize user input
  static sanitizeInput(input: string): string {
    return input
      .replace(/[<>]/g, '') // Remove HTML tags
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/on\w+=/gi, '') // Remove event handlers
      .trim();
  }

  // Validate email format
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password strength
  static validatePassword(password: string): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push('Şifre en az 8 karakter olmalıdır');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Şifre en az bir büyük harf içermelidir');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Şifre en az bir küçük harf içermelidir');
    }
    
    if (!/\d/.test(password)) {
      errors.push('Şifre en az bir rakam içermelidir');
    }
    
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Şifre en az bir özel karakter içermelidir');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Generate secure random string
  static generateSecureToken(length: number = 32): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const crypto = require('crypto');
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(crypto.randomInt(0, chars.length));
    }
    
    return result;
  }

  // Hash password (for demonstration - use proper hashing in production)
  static async hashPassword(password: string): Promise<string> {
    const crypto = require('crypto');
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  // Verify password
  static async verifyPassword(password: string, hash: string): Promise<boolean> {
    const hashedPassword = await this.hashPassword(password);
    return hashedPassword === hash;
  }

  // Check for SQL injection patterns
  static containsSQLInjection(input: string): boolean {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/i,
      /(\b(OR|AND)\s+\d+\s*=\s*\d+)/i,
      /(\b(OR|AND)\s+['"]\s*=\s*['"])/i,
      /(\bUNION\s+SELECT\b)/i,
      /(\bDROP\s+TABLE\b)/i,
      /(\bINSERT\s+INTO\b)/i,
      /(\bDELETE\s+FROM\b)/i,
      /(\bUPDATE\s+SET\b)/i,
    ];
    
    return sqlPatterns.some(pattern => pattern.test(input));
  }

  // Check for XSS patterns
  static containsXSS(input: string): boolean {
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /<iframe[^>]*>.*?<\/iframe>/gi,
      /<object[^>]*>.*?<\/object>/gi,
      /<embed[^>]*>.*?<\/embed>/gi,
      /<link[^>]*>.*?<\/link>/gi,
      /<meta[^>]*>.*?<\/meta>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<img[^>]*onerror/gi,
      /<svg[^>]*onload/gi,
    ];
    
    return xssPatterns.some(pattern => pattern.test(input));
  }

  // Rate limiting
  static rateLimitMap = new Map<string, { count: number; resetTime: number }>();

  static isRateLimited(ip: string, limit: number = 100, windowMs: number = 60000): boolean {
    const now = Date.now();
    const key = ip;
    const record = this.rateLimitMap.get(key);

    if (!record || now > record.resetTime) {
      this.rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
      return false;
    }

    if (record.count >= limit) {
      return true;
    }

    record.count++;
    return false;
  }

  // Get client IP
  static getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    const remoteAddr = request.headers.get('x-remote-addr');
    
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    
    if (realIP) {
      return realIP;
    }
    
    if (remoteAddr) {
      return remoteAddr;
    }
    
    return 'unknown';
  }

  // Validate CSRF token
  static validateCSRFToken(token: string, sessionToken: string): boolean {
    return token === sessionToken;
  }

  // Generate CSRF token
  static generateCSRFToken(): string {
    return this.generateSecureToken(32);
  }

  // Check if request is from allowed origin
  static isAllowedOrigin(origin: string, allowedOrigins: string[]): boolean {
    return allowedOrigins.includes(origin);
  }

  // Validate file upload
  static validateFileUpload(file: File, allowedTypes: string[], maxSize: number): {
    isValid: boolean;
    error?: string;
  } {
    if (file.size > maxSize) {
      return {
        isValid: false,
        error: `Dosya boyutu ${maxSize} byte'dan büyük olamaz`
      };
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        isValid: false,
        error: `Dosya türü desteklenmiyor. İzin verilen türler: ${allowedTypes.join(', ')}`
      };
    }

    return { isValid: true };
  }

  // Sanitize HTML content
  static sanitizeHTML(html: string): string {
    // Basic HTML sanitization - in production, use a proper library like DOMPurify
    return html
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .replace(/<object[^>]*>.*?<\/object>/gi, '')
      .replace(/<embed[^>]*>.*?<\/embed>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }

  // Check for suspicious patterns
  static containsSuspiciousPatterns(input: string): boolean {
    const suspiciousPatterns = [
      /eval\s*\(/gi,
      /Function\s*\(/gi,
      /setTimeout\s*\(/gi,
      /setInterval\s*\(/gi,
      /document\.cookie/gi,
      /document\.location/gi,
      /window\.location/gi,
      /localStorage/gi,
      /sessionStorage/gi,
    ];
    
    return suspiciousPatterns.some(pattern => pattern.test(input));
  }

  // Generate secure session ID
  static generateSessionID(): string {
    return this.generateSecureToken(64);
  }

  // Validate session ID format
  static isValidSessionID(sessionID: string): boolean {
    return /^[A-Za-z0-9]{64}$/.test(sessionID);
  }
}
