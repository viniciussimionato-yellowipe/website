import type { CSSProperties } from 'react';
import { MAP_ARCS, MAP_H, MAP_HUBS, MAP_W } from './markets-map-data';

/**
 * Mapa vetorial dos três mercados (substitui o PNG de pontos, que pixelizava no zoom).
 * - Os países são desenhados uma vez em <MarketsMapDefs /> (servidor) e reutilizados com <use>,
 *   para o HTML não repetir ~40 KB de caminhos em cada cartão.
 * - Cada cartão pinta o seu país de amarelo através de variáveis CSS que herdam para o <use>.
 * - O zoom é uma transformação CSS no grupo SVG: continua nítido em qualquer escala,
 *   e os traços não engrossam (vector-effect: non-scaling-stroke).
 */
export type MapMarket = keyof typeof MAP_HUBS;

const ISO: Record<MapMarket, string> = { US: 'usa', BR: 'bra', PT: 'prt' };

/** Aproximação final por mercado: Portugal é pequeno no mapa, por isso aproxima mais. */
const ZOOM: Record<MapMarket, number> = { US: 1.8, BR: 1.9, PT: 6.5 };

export function MarketsMap({ market, zoom }: { market: string; zoom: boolean }) {
  if (!(market in MAP_HUBS)) return null;
  const m = market as MapMarket;
  const [hx, hy] = MAP_HUBS[m];
  const s = ZOOM[m];
  // Leva o marcador do país para o centro da área do mapa.
  const tx = MAP_W / 2 - s * hx;
  const ty = MAP_H / 2 - s * hy;

  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className="markets-map"
      style={{ [`--map-${ISO[m]}`]: 'var(--color-yellow)' } as CSSProperties}
    >
      <g
        className={zoom ? 'markets-map-cam is-zoomed' : 'markets-map-cam'}
        style={zoom ? { transform: `translate(${tx}px, ${ty}px) scale(${s})` } : undefined}
      >
        <use href="#yw-markets-land" />
        {MAP_ARCS.map((d) => (
          <path key={d} d={d} className="markets-map-arc" vectorEffect="non-scaling-stroke" />
        ))}
        {(Object.keys(MAP_HUBS) as MapMarket[]).map((k) => {
          const [x, y] = MAP_HUBS[k];
          const on = k === m;
          return (
            <circle
              key={k}
              cx={x}
              cy={y}
              r={(on ? 7 : 3.5) / s}
              className={on ? 'markets-map-pin is-on' : 'markets-map-pin'}
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
        <circle
          cx={hx}
          cy={hy}
          r={14 / s}
          className="markets-map-ring"
          vectorEffect="non-scaling-stroke"
        />
      </g>
    </svg>
  );
}
