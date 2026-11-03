'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics/events';

/**
 * Regista a visita a um caso: evento `case_view` e contador de sessão usado na
 * pontuação do lead ("viu dois ou mais casos").
 */
export function CaseViewTracker({ caseId, sector }: { caseId: string; sector: string }) {
  useEffect(() => {
    track('case_view', { caso_id: caseId, setor: sector });
    try {
      const key = 'yw_cases_viewed';
      const seen = new Set((sessionStorage.getItem(`${key}_ids`) ?? '').split(',').filter(Boolean));
      seen.add(caseId);
      sessionStorage.setItem(`${key}_ids`, [...seen].join(','));
      sessionStorage.setItem(key, String(seen.size));
    } catch {
      // sessionStorage indisponível (modo privado): a pontuação ignora este sinal.
    }
  }, [caseId, sector]);
  return null;
}
