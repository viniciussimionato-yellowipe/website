import { expect, test } from '@playwright/test';

test('API de leads recusa pedidos de outra origem', async ({ request }) => {
  const res = await request.post('/api/lead/', {
    data: {},
    headers: { origin: 'https://evil.example' },
  });
  expect(res.status()).toBe(403);
});

test('API de leads valida campos', async ({ request, baseURL }) => {
  const res = await request.post('/api/lead/', {
    data: { intent: 'hire', name: 'A', email: 'x', country: 'PT', locale: 'pt' },
    headers: { origin: baseURL! },
  });
  expect(res.status()).toBe(400);
  const body = await res.json();
  expect(body.fields).toEqual(expect.arrayContaining(['email', 'name']));
});

test('formulário avança pelos passos e envia', async ({ page }) => {
  await page.goto('/pt/contacto/');
  const form = page.locator('form').filter({ hasText: 'O que procura?' });
  await form.getByLabel('Reforçar a equipa', { exact: true }).check();
  await form.getByRole('button', { name: 'Continuar' }).click();
  await form.getByLabel('Nome', { exact: true }).fill('Teste Automático');
  await form.getByLabel('Email profissional', { exact: true }).fill('teste@empresa-exemplo.pt');
  await form.getByLabel('Empresa', { exact: true }).fill('Empresa Exemplo');
  await form.getByRole('button', { name: 'Continuar' }).click();
  if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    // Espera o token do Turnstile (as chaves de teste passam sempre).
    await expect(form.locator('input[name="cf-turnstile-response"]')).not.toHaveValue('', {
      timeout: 15_000,
    });
  }
  await form.getByRole('button', { name: 'Enviar pedido' }).click();
  await expect(page.getByRole('status')).toContainText('Obrigado');
});
