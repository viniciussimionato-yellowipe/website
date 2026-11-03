# Imagens do design (manifesto)

O mockup `docs/design/home-v7.dc.html` refere as imagens como `/_blob/<id>`: são ficheiros guardados na ferramenta de design, que não vêm com o HTML. Esta tabela diz onde está cada uma no projeto. Todas já foram exportadas com a resolução original e fundo transparente quando o original o tem.

**Regra:** ao implementar qualquer parte do mockup, procurar o `/_blob/<id>` nesta tabela e usar o caminho indicado. Se aparecer um id que não está aqui, pedir a exportação e acrescentar a linha nesta tabela no mesmo pull request.

| Blob no mockup                     | Ficheiro no projeto                                                                                    | Uso                                                                                                                                                                            | Tamanho original (px) |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `4eb33a48f536b4dfdc9e177d601a483d` | `public/images/logo-white.png`                                                                         | Logótipo no header e no rodapé (fundo navy)                                                                                                                                    | 600 × 166             |
| `21655178e4134d3bb6731bd7ef03f7af` | `public/images/logo-dark.png`                                                                          | Logótipo sobre fundo claro; JSON-LD                                                                                                                                            | 464 × 128             |
| `7e4be3fbb3e0b5b33e759f2197426985` | `public/images/hero-tree.png`                                                                          | Árvore de fundo do hero (opacidade 0,26)                                                                                                                                       | 1324 × 1500           |
| `78cf5334479ba250a65b29bf1ea8007e` | ~~`public/images/markets-map.png`~~ substituído por SVG vetorial: `src/components/home/MarketsMap.tsx` | Mapa de "Três mercados". O PNG de pontos pixelizava no zoom; o mapa passou a vetorial (Natural Earth 1:50m), gerado por `scripts/build-markets-map.py`. O PNG pode ser apagado | —                     |
| `5db57e2c1915e3e1945e5f449a4ebf4a` | `public/images/flags/pt.png`                                                                           | Bandeira Portugal                                                                                                                                                              | 128 × 128             |
| `19e089b1762c603f845dba7a6551b0cc` | `public/images/flags/br.png`                                                                           | Bandeira Brasil                                                                                                                                                                | 128 × 128             |
| `8b7d9680a79c8f1601f4b205b7f27ade` | `public/images/flags/us.png`                                                                           | Bandeira EUA                                                                                                                                                                   | 128 × 128             |
| `cdfad7e62e9abc275a70795b87329aea` | `public/images/clients/mc-sonae.png`                                                                   | Logo cliente                                                                                                                                                                   | 460 × 160             |
| `3c62f06aaf3e0fad8393aeb3f72ab9de` | `public/images/clients/sky.png`                                                                        | Logo cliente                                                                                                                                                                   | 240 × 146             |
| `174ef5d2685e1a15b83f2f8ad76c0fba` | `public/images/clients/efacec.png`                                                                     | Logo cliente                                                                                                                                                                   | 500 × 160             |
| `ffc0dd81a6b8984be6fb0670b7131373` | `public/images/clients/xing.png`                                                                       | Logo cliente                                                                                                                                                                   | 420 × 122             |
| `56442b654147f1f8811ff37c7af10305` | `public/images/clients/medicare.png`                                                                   | Logo cliente                                                                                                                                                                   | 560 × 130             |
| `610ea5da7b04e8c9619acbc6537fca50` | `public/images/clients/zuhlke.png`                                                                     | Logo cliente                                                                                                                                                                   | 420 × 160             |
| `08182d6fc8db37821ad7ec127d6fd4cf` | `public/images/clients/clever-advertising.png`                                                         | Logo cliente                                                                                                                                                                   | 500 × 160             |
| `f93fad7239beb5bba2dd025aacc0833e` | `public/images/cases/clever.png`                                                                       | Imagem do caso Clever                                                                                                                                                          | 1024 × 476            |
| `4f4b5f5de27f5c30a9120a6c7b55f189` | `public/images/cases/clever-logo.png`                                                                  | Logo do caso Clever                                                                                                                                                            | 348 × 120             |
| `f2410cc99434d6fc69e007ab4dc50423` | `public/images/cases/linde.png`                                                                        | Imagem do caso Linde                                                                                                                                                           | 1024 × 480            |
| `d1e4d36b7a28cf780538f093143b1ff3` | `public/images/cases/linde-logo.png`                                                                   | Logo do caso Linde                                                                                                                                                             | 390 × 120             |
| `121dfb89983b97b41515560fe4cb7545` | `public/images/cases/hapvida.png`                                                                      | Imagem do caso Hapvida                                                                                                                                                         | 800 × 480             |
| `ee90fef6f268df2b953b5cf0da785130` | `public/images/cases/hapvida-logo.png`                                                                 | Logo do caso Hapvida                                                                                                                                                           | 350 × 100             |

Não há versões SVG destes ficheiros na ferramenta de design: os originais são PNG. O `next/image` gera AVIF e WebP no build, por isso não é preciso converter.


## Fonte oficial dos logótipos

Os logótipos e o ícone da Yellowipe vêm **sempre** da pasta de assets da marca no Google Drive:
https://drive.google.com/drive/folders/1vfM1qSeNsg63IS7HSBLfrQONhgid12cX (subpastas ICON, LOGOTIPO HORIZONTAL, LOGOTIPO VERTICAL e o "Kit de Marca 2026").

Regras:
- Usar os ficheiros tal como estão (SVG de preferência). Não redesenhar, não deformar, não mudar proporções.
- Só se pode mudar a escala de forma uniforme. Para fundo escuro usar a versão do ficheiro "positivo"; o tronco castanho #795942 é o da versão "negativo".
- `public/images/brand/icon-positivo.svg` é a cópia exata de `ICON/ICON POSITIVO.svg` (6461 bytes).

## Carreiras v3 (`docs/design/carreiras-v3.dc.html`)

O mapa e os avatares não são `/_blob/`: estão desenhados em SVG dentro do mockup e foram extraídos tal como estão.

| No mockup                               | Ficheiro no projeto                            | Uso                                                              |
| --------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------- |
| `.cmap-svg` (grelha de pontos 576 × 531) | `public/images/careers/map.svg`                | Mapa de Portugal, Brasil e EUA no topo de Carreiras (vetorial)   |
| `.cpin-av` (3 ilustrações 64 × 64)      | `public/images/careers/avatar-{1,2,3}.svg`     | Consultores ilustrativos nos pinos do mapa (não são pessoas reais) |
