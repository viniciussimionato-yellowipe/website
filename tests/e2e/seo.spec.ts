import { expect, test } from '@playwright/test';

const homes = [
  { path: '/pt/', lang: 'pt-PT' },
  { path: '/br/', lang: 'pt-BR' },
  { path: '/en/', lang: 'en' },
];

for (const { path, lang } of homes) {
  test(`home ${path}: lang, um H1, canónico e hreflang recíproco`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
    await expect(page.locator('h1')).toHaveCount(1);
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(canonical).toMatch(new RegExp(`${path}$`));
    for (const hl of ['pt-PT', 'pt-BR', 'en', 'x-default']) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${hl}"]`)).toHaveCount(1);
    }
    await expect(page.locator('script[type="application/ld+json"]').first()).toBeAttached();
  });
}

test('a raiz redireciona para um idioma', async ({ page }) => {
  const res = await page.goto('/');
  expect(res?.url()).toMatch(/\/(pt|br|en)\/$/);
});

test('páginas de serviço publicadas existem e rascunhos dão 404', async ({ request }) => {
  expect((await request.get('/pt/servicos/automacao-de-testes/')).status()).toBe(200);
  expect((await request.get('/pt/servicos/blockchain/')).status()).toBe(404);
});

test('sitemap, robots e llms.txt', async ({ request }) => {
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('/br/alocacao-de-profissionais-ti/');
  expect(sitemap).toContain('hreflang="pt-PT"');
  expect((await request.get('/robots.txt')).status()).toBe(200);
  const llms = await (await request.get('/llms.txt')).text();
  expect(llms).toContain('# Yellowipe');
});
