import { expect, test } from '@playwright/test';

test.use({ reducedMotion: 'reduce' });

test('com movimento reduzido, a faixa de stack não anima', async ({ page }) => {
  await page.goto('/pt/');
  const track = page.locator('.marquee-track').first();
  await expect(track).toHaveCSS('animation-name', 'none');
});

test('link "saltar para o conteúdo" é o primeiro foco', async ({ page }) => {
  await page.goto('/pt/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Saltar para o conteúdo' })).toBeFocused();
});
