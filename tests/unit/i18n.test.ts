import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { auditTranslations } from '@/lib/i18n/audit';

describe('traduções (src/i18n)', () => {
  it('sem erros: chaves em falta ou órfãs, marcadores, termos de outro idioma', () => {
    const { errors } = auditTranslations();
    assert.deepEqual(
      errors.map((e) => `[${e.locale}] ${e.where}: ${e.message}`),
      [],
    );
  });
});
