"""Gera src/components/home/markets-map-data.ts a partir de Natural Earth 1:50m (domínio público).
Uso: descarregar ne_50m_admin_0_countries.geojson (github.com/nvkelso/natural-earth-vector)
e correr: python3 scripts/build-markets-map.py <caminho do geojson>
Os pontos dos mercados (hubs) são o centro aproximado de cada país, não moradas."""
import sys
import json, math
src=json.load(open(sys.argv[1]))
LON0,LON1,LAT0,LAT1=-128,16,-57,60
S=4.0  # units per degree
def miller(lat): 
    p=math.radians(lat); return 1.25*math.log(math.tan(math.pi/4+0.4*p))
YT=miller(LAT1)
def proj(lon,lat): return ((lon-LON0)*S, (YT-miller(lat))*S*180/math.pi)
W,_=proj(LON1,0); _,H=proj(0,LAT0)
def dp(pts,eps):
    if len(pts)<3: return pts
    (x1,y1),(x2,y2)=pts[0],pts[-1]; dx,dy=x2-x1,y2-y1; L=math.hypot(dx,dy) or 1e-9
    i,dm=0,0
    for k in range(1,len(pts)-1):
        x,y=pts[k]; d=abs(dy*x-dx*y+x2*y1-y2*x1)/L
        if d>dm: i,dm=k,d
    if dm>eps: return dp(pts[:i+1],eps)[:-1]+dp(pts[i:],eps)
    return [pts[0],pts[-1]]
def ring_path(ring,eps):
    pts=[proj(lo,la) for lo,la in ring]
    m=len(pts)//2
    pts=dp(pts[:m+1],eps)[:-1]+dp(pts[m:],eps)
    if len(pts)<4: return ''
    return 'M'+'L'.join((f'{x:.1f}'.rstrip('0').rstrip('.')+' '+f'{y:.1f}'.rstrip('0').rstrip('.')) for x,y in pts)+'Z'
out={}
for f in src['features']:
    p=f['properties']; iso=p.get('ADM0_A3') or p.get('ISO_A3')
    g=f['geometry']; polys=g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
    d=''
    for poly in polys:
        ring=poly[0]
        lons=[c[0] for c in ring]; lats=[c[1] for c in ring]
        if max(lons)<LON0-5 or min(lons)>LON1+5 or max(lats)<LAT0-5 or min(lats)>LAT1+8: continue
        # skip tiny islands
        if (max(lons)-min(lons))*(max(lats)-min(lats))<0.15 and iso not in ('PRT',): continue
        eps=0.35 if iso in ('PRT','ESP') else 0.9 if iso in ('USA','BRA','CAN','MEX') else 1.8
        d+=ring_path(ring,eps)
    if d: out[iso]=d
print('countries',len(out),'W',round(W),'H',round(H),'bytes',sum(len(v) for v in out.values()))
hubs={'US':(-98.5,39.5),'BR':(-50.5,-12.5),'PT':(-8.2,39.6)}
pts={k:proj(*v) for k,v in hubs.items()}
def arc(a,b):
    (x1,y1),(x2,y2)=pts[a],pts[b]; mx,my=(x1+x2)/2,(y1+y2)/2-abs(x2-x1)*0.18
    return f'M{x1:.1f} {y1:.1f}Q{mx:.1f} {my:.1f} {x2:.1f} {y2:.1f}'
L=["/**\n * Mapa vetorial dos três mercados (Natural Earth 1:50m, domínio público).\n * Projeção de Miller, longitude −128° a 16°, latitude −57° a 60°; 4 unidades por grau.\n * Gerado por scripts/build-markets-map.py — não editar à mão.\n */",
   f"export const MAP_W = {W:.1f};", f"export const MAP_H = {H:.1f};", "",
   "/** Centro de cada mercado (marcador), em unidades do mapa. */",
   "export const MAP_HUBS = {"]+[f"  {k}: [{x:.1f}, {y:.1f}]," for k,(x,y) in pts.items()]+["} as const;","",
   "/** Ligações entre os três mercados. */","export const MAP_ARCS = ["]+[f"  '{arc(a,b)}'," for a,b in (('US','PT'),('BR','PT'),('US','BR'))]+["] as const;","",
   ""]
open('src/components/home/markets-map-data.ts','w').write("\n".join(L))
C=["/**\n * Caminhos dos países (Natural Earth 1:50m, domínio público), separados de\n * markets-map-data.ts para não entrarem no JavaScript do browser.\n * Gerado por scripts/build-markets-map.py — não editar à mão.\n */",
   "/** País → caminho SVG. USA, BRA e PRT são os mercados. */","export const MAP_COUNTRIES: [iso: string, d: string][] = ["]+[f"  ['{iso}', '{d}']," for iso,d in sorted(out.items())]+["];",""]
open('src/components/home/markets-map-countries.ts','w').write("\n".join(C))
print('Gerado. Correr npx prettier --write src/components/home/markets-map-*.ts')
