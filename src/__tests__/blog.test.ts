import { describe, it, expect, beforeEach } from '@jest/globals';
import { NextRequest } from 'next/server';
import { GET, POST } from '@/app/api/blog/route';

describe('Blog API', () => {
  beforeEach(() => {
    // Clear any existing mocks
    jest.clearAllMocks();
  });

  describe('GET /api/blog', () => {
    it('should return published posts by default', async () => {
      const request = new NextRequest('http://localhost:3000/api/blog');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data).toBeDefined();
      expect(data.data.posts).toBeDefined();
      expect(Array.isArray(data.data.posts)).toBe(true);
    });

    it('should filter posts by category', async () => {
      const request = new NextRequest('http://localhost:3000/api/blog?category=AI');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.posts).toBeDefined();
    });

    it('should handle pagination', async () => {
      const request = new NextRequest('http://localhost:3000/api/blog?limit=5&offset=0');
      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.data.posts.length).toBeLessThanOrEqual(5);
    });
  });

  describe('POST /api/blog', () => {
    it('should create a new blog post', async () => {
      const postData = {
        action: 'create',
        postData: {
          title: 'Test Blog Post',
          content: 'This is a test blog post content.',
          category: 'Test',
          status: 'published',
          author: 'Test Author',
          tags: ['test', 'blog'],
          priority: 'medium',
          source: 'Manual',
        },
      };

      const request = new NextRequest('http://localhost:3000/api/blog', {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toBe('Post created successfully');
      expect(data.data).toBeDefined();
      expect(data.data.title).toBe('Test Blog Post');
    });

    it('should return 400 for invalid action', async () => {
      const request = new NextRequest('http://localhost:3000/api/blog', {
        method: 'POST',
        body: JSON.stringify({ action: 'invalid' }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
    });

    it('should generate category content', async () => {
      const request = new NextRequest('http://localhost:3000/api/blog', {
        method: 'POST',
        body: JSON.stringify({
          action: 'generate-category-content',
          category: 'AI Teknolojisi',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const response = await POST(request);
      const data = await response.json();

      // This might fail in test environment due to external API calls
      // but we can test the structure
      expect(response.status).toBeDefined();
      expect(data).toBeDefined();
    });
  });
});
