import { test, expect } from '@playwright/test';

test.describe('Admin Panel E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to admin login page
    await page.goto('/tr/admin/login');
  });

  test('should display login page correctly', async ({ page }) => {
    await expect(page).toHaveTitle(/Admin Giriş/);
    await expect(page.locator('h1')).toContainText('Admin Paneli');
    await expect(page.locator('input[type="text"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.fill('input[type="text"]', 'wrong-username');
    await page.fill('input[type="password"]', 'wrong-password');
    await page.click('button[type="submit"]');

    await expect(page.locator('.text-red-400')).toBeVisible();
    await expect(page.locator('.text-red-400')).toContainText('Geçersiz kullanıcı adı veya şifre');
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    // Mock successful login
    await page.route('**/api/admin/auth', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Giriş başarılı',
          token: 'mock-jwt-token'
        })
      });
    });

    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'password');
    await page.click('button[type="submit"]');

    // Should redirect to admin dashboard
    await expect(page).toHaveURL('/tr/admin');
  });

  test('should redirect to login when accessing protected routes without auth', async ({ page }) => {
    await page.goto('/tr/admin');
    await expect(page).toHaveURL('/tr/admin/login');
  });

  test('should display admin dashboard after login', async ({ page }) => {
    // Mock authentication
    await page.addInitScript(() => {
      localStorage.setItem('admin_token', 'mock-jwt-token');
    });

    await page.goto('/tr/admin');
    await expect(page.locator('h1')).toContainText('Admin Paneli');
    await expect(page.locator('text=Genel Bakış')).toBeVisible();
  });

  test('should navigate to different admin sections', async ({ page }) => {
    // Mock authentication
    await page.addInitScript(() => {
      localStorage.setItem('admin_token', 'mock-jwt-token');
    });

    await page.goto('/tr/admin');

    // Test navigation to blog management
    await page.click('text=Blog Yönetimi');
    await expect(page).toHaveURL('/tr/admin/blog');
    await expect(page.locator('h1')).toContainText('Blog Yönetimi');

    // Test navigation to user management
    await page.click('text=Kullanıcı Yönetimi');
    await expect(page).toHaveURL('/tr/admin/users');
    await expect(page.locator('h1')).toContainText('Kullanıcı Yönetimi');

    // Test navigation to analytics
    await page.click('text=Analitik');
    await expect(page).toHaveURL('/tr/admin/analytics');
    await expect(page.locator('h1')).toContainText('Analitik');
  });

  test('should handle logout correctly', async ({ page }) => {
    // Mock authentication
    await page.addInitScript(() => {
      localStorage.setItem('admin_token', 'mock-jwt-token');
    });

    await page.goto('/tr/admin');
    
    // Click logout button
    await page.click('text=Çıkış Yap');
    
    // Should redirect to login page
    await expect(page).toHaveURL('/tr/admin/login');
    
    // Token should be removed
    const token = await page.evaluate(() => localStorage.getItem('admin_token'));
    expect(token).toBeNull();
  });
});

test.describe('Blog Management E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication
    await page.addInitScript(() => {
      localStorage.setItem('admin_token', 'mock-jwt-token');
    });
  });

  test('should display blog posts list', async ({ page }) => {
    await page.goto('/tr/admin/blog');
    await expect(page.locator('h1')).toContainText('Blog Yönetimi');
    await expect(page.locator('text=Makaleler')).toBeVisible();
  });

  test('should allow creating new blog post', async ({ page }) => {
    await page.goto('/tr/admin/blog');
    
    // Mock API response
    await page.route('**/api/blog', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: 'Post created successfully',
          data: {
            id: '1',
            title: 'Test Post',
            content: 'Test content',
            status: 'published'
          }
        })
      });
    });

    await page.click('text=Yeni Makale Ekle');
    // Add form filling and submission logic here
  });
});

test.describe('Public Blog E2E Tests', () => {
  test('should display blog page correctly', async ({ page }) => {
    await page.goto('/tr/blog');
    await expect(page.locator('h1')).toContainText('Blog');
  });

  test('should show latest posts', async ({ page }) => {
    await page.goto('/tr/blog');
    await expect(page.locator('text=Son 3 Post')).toBeVisible();
  });

  test('should allow searching posts', async ({ page }) => {
    await page.goto('/tr/blog');
    
    const searchInput = page.locator('input[placeholder*="Makale ara"]');
    await searchInput.fill('AI');
    await searchInput.press('Enter');
    
    // Should show search results
    await expect(page.locator('text=AI')).toBeVisible();
  });

  test('should filter posts by category', async ({ page }) => {
    await page.goto('/tr/blog');
    
    await page.click('text=AI Teknolojisi');
    // Should show filtered results
  });
});

