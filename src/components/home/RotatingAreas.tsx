'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { Sparkle } from '@/components/ui/icons';

/**
 * Área que muda a cada 2,8 s (hero v7, inspirado na BairesDev).
 * - Todas as áreas estão no HTML (o Google lê-as); só a atual é visível.
 * - Pausa com o rato por cima; parada com "reduzir movimento".
 * - Só a primeira (IA) leva a faísca.
 */
const INTERVAL_MS = 2800;
const QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener('change', onChange);
  return () => mq.removeEventListener('change', onChange);
}
const getReduced = () => window.matchMedia(QUERY).matches;
const getReducedServer = () => true;

export function RotatingAreas({ items }: { items: string[] }) {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const reduced = useSyncExternalStore(subscribe, getReduced, getReducedServer);

  useEffect(() => {
    if (reduced || hover || items.length < 2) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % items.length), INTERVAL_MS);
    return () => window.clearInterval(t);
  }, [reduced, hover, items.length]);

  const prev = (index + items.length - 1) % items.length;

  return (
    <p
      className="relative m-0 inline-flex items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="inline-grid align-top">
        {items.map((text, i) => {
          const current = i === index;
          const y = current ? '0' : i === prev ? '-70%' : '70%';
          return (
            <strong
              key={text}
              aria-hidden={!current}
              className="col-start-1 row-start-1 inline-flex items-center justify-center font-semibold whitespace-nowrap text-white transition-[opacity,transform] duration-500 ease-[cubic-bezier(.2,.8,.2,1)]"
              style={{ opacity: current ? 1 : 0, transform: `translateY(${y})` }}
            >
              {text}
              {i === 0 && <Sparkle className="ml-[0.15em] size-[0.62em] self-start" />}.
            </strong>
          );
        })}
      </span>
    </p>
  );
}
