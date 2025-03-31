import { test, expect } from '@playwright/test';

test('should open the story viewer when a thumbnail is clicked', async ({ page }) => {

  await page.goto('/');
  await page.waitForLoadState('domcontentloaded');

  // Find story thumbnails
  const thumbnails = page.locator('[data-testid="thumbnail"]');
  const total = await thumbnails.count();
  console.log(`✅ Found ${total} thumbnails`);

  // loading
  expect(total).toBeGreaterThan(0);
  await expect(thumbnails.first()).toBeVisible();

  // Click
  await thumbnails.first().click();

  const viewerImage = page.locator('img').nth(1);
  await expect(viewerImage).toBeVisible();
});
