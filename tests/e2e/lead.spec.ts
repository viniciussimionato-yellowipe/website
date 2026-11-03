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

test('página de modelo converte na própria página, com a intenção pré-escolhida', async ({
  page,
}) => {
  await page.goto('/pt/outsourcing-de-ti/');
  // O CTA do topo leva ao formulário no fim da mesma página, não a /contacto/.
  await page.locator('a[data-cta-id="modelo-reforce-hero"]').click();
  await expect(page).toHaveURL(/\/pt\/outsourcing-de-ti\/#contacto$/);
  const form = page.locator('#contacto form');
  await expect(form).toBeInViewport();
  await expect(form.getByLabel('Reforçar a equipa', { exact: true })).toBeChecked();

  // O CTA de origem e a página dele vão no pedido (yw_cta_id, yw_cta_page).
  // Por nome acessível: no tom escuro o asterisco visual está no rótulo (aria-hidden).
  await form.getByRole('button', { name: 'Continuar' }).click();
  await form.getByRole('textbox', { name: 'Nome', exact: true }).fill('Teste Automático');
  await form
    .getByRole('textbox', { name: 'Email profissional', exact: true })
    .fill('teste@empresa-exemplo.pt');
  await form.getByRole('textbox', { name: 'Empresa', exact: true }).fill('Empresa Exemplo');
  await form.getByRole('button', { name: 'Continuar' }).click();
  const request = page.waitForRequest((r) => r.url().endsWith('/api/lead/'));
  await form.getByRole('button', { name: 'Enviar pedido' }).click();
  const body = (await request).postDataJSON() as {
    intent: string;
    attribution: { ctaId?: string; ctaPage?: string; conversionPage?: string };
  };
  expect(body.intent).toBe('augment');
  expect(body.attribution.ctaId).toBe('modelo-reforce-hero');
  expect(body.attribution.ctaPage).toBe('/pt/outsourcing-de-ti/');
  expect(body.attribution.conversionPage).toBe('/pt/outsourcing-de-ti/');
  await expect(page.locator('#contacto').getByRole('status')).toContainText('Obrigado');
});

test('páginas de serviço, tecnologia e caso têm o formulário na página', async ({ page }) => {
  for (const path of [
    '/pt/servicos/automacao-de-testes/',
    '/br/tecnologias/react/',
    '/pt/casos/clever-automacao-de-testes/',
  ]) {
    await page.goto(path);
    await expect(page.locator('#contacto form'), path).toHaveCount(1);
  }
});
