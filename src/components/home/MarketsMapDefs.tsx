import { MAP_COUNTRIES } from './markets-map-countries';

/**
 * Caminhos dos países, uma única vez por página, para os cartões de MarketsMap
 * reutilizarem com <use href="#yw-markets-land">. Componente de servidor: os ~40 KB
 * de caminhos vão só no HTML, não no JavaScript do browser.
 * Os mercados (USA, BRA, PRT) leem a cor de variáveis CSS que cada cartão define.
 */
const MARKET_ISO = new Set(['USA', 'BRA', 'PRT']);

export function MarketsMapDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
      <defs>
        <g
          id="yw-markets-land"
          style={{ fill: 'var(--map-land)', stroke: '#fff', strokeWidth: 0.8 }}
        >
          {MAP_COUNTRIES.map(([iso, d]) => (
            <path
              key={iso}
              d={d}
              vectorEffect="non-scaling-stroke"
              style={MARKET_ISO.has(iso) ? { fill: `var(--map-${iso.toLowerCase()})` } : undefined}
            />
          ))}
        </g>
      </defs>
    </svg>
  );
}
