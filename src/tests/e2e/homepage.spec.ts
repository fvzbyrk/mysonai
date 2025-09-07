import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Check if page loads without errors
    await expect(page).toHaveTitle(/MySonAI/);

    // Check for main elements
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByText('MySonAI')).toBeVisible();
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');

    // Check hero section elements
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText(/yapay zeka/i)).toBeVisible();
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');

    // Test navigation links
    await page.getByRole('link', { name: /asistanlar/i }).click();
    await expect(page).toHaveURL(/.*assistants/);

    await page.goBack();
    await page.getByRole('link', { name: /demo/i }).click();
    await expect(page).toHaveURL(/.*demo/);
  });

  test('should display footer with legal links', async ({ page }) => {
    await page.goto('/');

    // Scroll to footer
    await page.getByRole('contentinfo').scrollIntoViewIfNeeded();

    // Check footer elements
    await expect(page.getByText(/gizlilik/i)).toBeVisible();
    await expect(page.getByText(/kullanım koşulları/i)).toBeVisible();
    await expect(page.getByText(/çerezler/i)).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check mobile navigation
    await expect(page.getByRole('button', { name: /menu/i })).toBeVisible();

    // Check if content is readable on mobile
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  test('should load Turkish content by default', async ({ page }) => {
    await page.goto('/');

    // Check for Turkish content
    await expect(page.getByText(/geleceği keşfedin/i)).toBeVisible();
    await expect(page.getByText(/ana sayfa/i)).toBeVisible();
  });

  test('should handle language switching', async ({ page }) => {
    await page.goto('/');

    // Look for language switcher (if exists)
    const languageSwitcher = page.getByRole('button', { name: /language/i });
    if (await languageSwitcher.isVisible()) {
      await languageSwitcher.click();
      await page.getByText('English').click();

      // Check for English content
      await expect(page.getByText(/discover the future/i)).toBeVisible();
    }
  });
});
