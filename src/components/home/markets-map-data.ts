/**
 * Mapa vetorial dos três mercados (gerado de Natural Earth 1:50m, domínio público).
 * Projeção de Miller, longitude −128° a 16°, latitude −57° a 60°; 4 unidades por grau.
 * Gerado por scripts/build-markets-map.py — não editar à mão.
 */
export const MAP_W = 576.0;
export const MAP_H = 531.1;

/** Centro de cada mercado (marcador), em unidades do mapa. */
export const MAP_HUBS = {
  US: [118.0, 107.6],
  BR: [310.0, 324.5],
  PT: [479.2, 107.1],
} as const;

/** Ligações entre os três mercados. */
export const MAP_ARCS = [
  'M118.0 107.6Q298.6 42.4 479.2 107.1',
  'M310.0 324.5Q394.6 185.4 479.2 107.1',
  'M118.0 107.6Q214.0 181.5 310.0 324.5',
] as const;
