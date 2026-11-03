import { defineConfig, devices } from '@playwright/test';

// PLAYWRIGHT_PORT: outra porta quando a 3000 está ocupada pelo `next dev` (o build tem de ter
// NEXT_PUBLIC_SITE_URL com a mesma porta, ou a API de leads recusa a origem).
const PORT = Number(process.env.PLAYWRIGHT_PORT ?? 3000);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: { baseURL, trace: 'on-first-retry' },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: process.env.PLAYWRIGHT_BASE_URL
    ? undefined
    : {
        command: `npm run start -- -p ${PORT}`,
        port: PORT,
        reuseExistingServer: !process.env.CI,
        // Uma corrida envia mais leads do que o limite de produção (5 por IP em 10 min).
        env: { LEAD_RATE_LIMIT: '1000' },
      },
});
