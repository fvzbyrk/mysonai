import { adminApi } from '@/lib/services/admin-api';
import { createMockPage, createMockApiResponse, mockFetch } from '../utils/test-utils';

describe('AdminApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPages', () => {
    it('should fetch pages successfully', async () => {
      const mockPages = [createMockPage()];
      const mockResponse = createMockApiResponse({
        pages: mockPages,
        stats: {
          total: 1,
          published: 1,
          draft: 0,
          archived: 0,
          totalViews: 100,
        },
        total: 1,
      });

      mockFetch(mockResponse);

      const result = await adminApi.getPages();

      expect(result.success).toBe(true);
      expect(result.data?.pages).toEqual(mockPages);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/admin/pages'),
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('should handle API errors', async () => {
      const mockResponse = createMockApiResponse(null, false);
      mockFetch(mockResponse, false);

      const result = await adminApi.getPages();

      expect(result.success).toBe(false);
      expect(result.error).toBe('Test error');
    });

    it('should include filters in query params', async () => {
      const mockResponse = createMockApiResponse({ pages: [], stats: {}, total: 0 });
      mockFetch(mockResponse);

      await adminApi.getPages({
        search: 'test',
        status: 'published',
        category: 'blog',
        page: 1,
        limit: 10,
      });

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('search=test'),
        expect.any(Object)
      );
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('status=published'),
        expect.any(Object)
      );
    });
  });

  describe('createPage', () => {
    it('should create page successfully', async () => {
      const mockPage = createMockPage();
      const mockResponse = createMockApiResponse(mockPage);
      mockFetch(mockResponse);

      const pageData = {
        title: 'Test Page',
        slug: 'test-page',
        content: 'Test content',
        category: 'Test Category',
        tags: ['test'],
      };

      const result = await adminApi.createPage(pageData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockPage);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/admin/pages',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify(pageData),
        })
      );
    });

    it('should handle creation errors', async () => {
      const mockResponse = createMockApiResponse(null, false);
      mockFetch(mockResponse, false);

      const result = await adminApi.createPage({
        title: 'Test Page',
        slug: 'test-page',
        content: 'Test content',
        category: 'Test Category',
        tags: ['test'],
      });

      expect(result.success).toBe(false);
    });
  });

  describe('updatePage', () => {
    it('should update page successfully', async () => {
      const mockPage = createMockPage();
      const mockResponse = createMockApiResponse(mockPage);
      mockFetch(mockResponse);

      const updateData = {
        id: '1',
        title: 'Updated Page',
        content: 'Updated content',
      };

      const result = await adminApi.updatePage(updateData);

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockPage);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/admin/pages',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify(updateData),
        })
      );
    });
  });

  describe('deletePage', () => {
    it('should delete page successfully', async () => {
      const mockPage = createMockPage();
      const mockResponse = createMockApiResponse(mockPage);
      mockFetch(mockResponse);

      const result = await adminApi.deletePage('1');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockPage);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/admin/pages?id=1',
        expect.objectContaining({
          method: 'DELETE',
        })
      );
    });
  });

  describe('changePageStatus', () => {
    it('should change page status successfully', async () => {
      const mockPage = createMockPage({ status: 'published' });
      const mockResponse = createMockApiResponse(mockPage);
      mockFetch(mockResponse);

      const result = await adminApi.changePageStatus('1', 'published');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockPage);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/admin/pages/1/status',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({ status: 'published' }),
        })
      );
    });
  });

  describe('duplicatePage', () => {
    it('should duplicate page successfully', async () => {
      const mockPage = createMockPage();
      const mockResponse = createMockApiResponse(mockPage);
      mockFetch(mockResponse);

      const result = await adminApi.duplicatePage('1');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockPage);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/admin/pages/1/duplicate',
        expect.objectContaining({
          method: 'POST',
        })
      );
    });
  });

  describe('bulkUpdatePages', () => {
    it('should bulk update pages successfully', async () => {
      const mockResponse = createMockApiResponse({ updated: 2 });
      mockFetch(mockResponse);

      const result = await adminApi.bulkUpdatePages(['1', '2'], { status: 'published' });

      expect(result.success).toBe(true);
      expect(result.data?.updated).toBe(2);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/admin/pages/bulk',
        expect.objectContaining({
          method: 'PATCH',
          body: JSON.stringify({
            pageIds: ['1', '2'],
            updates: { status: 'published' },
          }),
        })
      );
    });
  });

  describe('getAnalytics', () => {
    it('should fetch analytics successfully', async () => {
      const mockAnalytics = {
        totalPages: 10,
        publishedPages: 8,
        draftPages: 2,
        archivedPages: 0,
        totalViews: 1000,
        totalUsers: 50,
        activeUsers: 25,
        todayViews: 100,
        aiGenerations: 5,
      };
      const mockResponse = createMockApiResponse(mockAnalytics);
      mockFetch(mockResponse);

      const result = await adminApi.getAnalytics('month');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockAnalytics);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/admin/analytics?period=month',
        expect.objectContaining({
          method: 'GET',
        })
      );
    });
  });

  describe('uploadImage', () => {
    it('should upload image successfully', async () => {
      const mockFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
      const mockResponse = createMockApiResponse({ url: 'https://example.com/image.jpg', filename: 'test.jpg' });
      
      // Mock XMLHttpRequest for file upload
      const mockXHR = {
        open: jest.fn(),
        send: jest.fn(),
        setRequestHeader: jest.fn(),
        upload: {
          addEventListener: jest.fn(),
        },
        addEventListener: jest.fn((event, callback) => {
          if (event === 'load') {
            setTimeout(() => callback({ target: { responseText: JSON.stringify(mockResponse) } }), 0);
          }
        }),
      };
      
      global.XMLHttpRequest = jest.fn(() => mockXHR) as any;

      const result = await adminApi.uploadImage(mockFile);

      expect(result.success).toBe(true);
      expect(result.data?.url).toBe('https://example.com/image.jpg');
    });
  });
});
