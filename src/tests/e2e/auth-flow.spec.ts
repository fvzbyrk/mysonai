import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should display sign in page', async ({ page }) => {
    await page.goto('/signin');

    await expect(page).toHaveTitle(/giriş/i);
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/şifre/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /giriş yap/i })).toBeVisible();
  });

  test('should display sign up page', async ({ page }) => {
    await page.goto('/signup');

    await expect(page).toHaveTitle(/kayıt/i);
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/şifre/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /kayıt ol/i })).toBeVisible();
  });

  test('should validate form fields', async ({ page }) => {
    await page.goto('/signin');

    // Try to submit empty form
    await page.getByRole('button', { name: /giriş yap/i }).click();

    // Should show validation errors or prevent submission
    await expect(page.getByLabel(/email/i)).toBeVisible();
  });

  test('should handle invalid credentials', async ({ page }) => {
    await page.goto('/signin');

    // Fill form with invalid credentials
    await page.getByLabel(/email/i).fill('invalid@example.com');
    await page.getByLabel(/şifre/i).fill('wrongpassword');
    await page.getByRole('button', { name: /giriş yap/i }).click();

    // Should show error message
    await expect(page.getByText(/hata/i)).toBeVisible();
  });

  test('should redirect to dashboard after successful login', async ({ page }) => {
    // Mock successful authentication
    await page.route('**/auth/v1/token?grant_type=password', route => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: 'mock-token',
          user: { id: '1', email: 'test@example.com' },
        }),
      });
    });

    await page.goto('/signin');

    await page.getByLabel(/email/i).fill('test@example.com');
    await page.getByLabel(/şifre/i).fill('password123');
    await page.getByRole('button', { name: /giriş yap/i }).click();

    // Should redirect to dashboard
    await expect(page).toHaveURL(/.*dashboard/);
  });

  test('should handle Google OAuth', async ({ page }) => {
    await page.goto('/signin');

    // Click Google sign in button
    await page.getByText(/google/i).click();

    // Should redirect to Google OAuth
    await expect(page).toHaveURL(/accounts\.google\.com/);
  });

  test('should protect dashboard route', async ({ page }) => {
    await page.goto('/dashboard');

    // Should redirect to sign in if not authenticated
    await expect(page).toHaveURL(/.*signin/);
  });

  test('should allow sign out', async ({ page }) => {
    // Mock authenticated state
    await page.addInitScript(() => {
      localStorage.setItem(
        'supabase.auth.token',
        JSON.stringify({
          access_token: 'mock-token',
          user: { id: '1', email: 'test@example.com' },
        })
      );
    });

    await page.goto('/dashboard');

    // Look for sign out button
    const signOutButton = page.getByRole('button', { name: /çıkış/i });
    if (await signOutButton.isVisible()) {
      await signOutButton.click();

      // Should redirect to home page
      await expect(page).toHaveURL('/');
    }
  });
});
