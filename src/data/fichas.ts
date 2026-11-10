// Páginas propias de esta plantilla (NoExpertise): espejo de `fichas:` y `zonas:` de template.yaml.
// Cada reparación con `detalle` tiene su página en /reparaciones/<slug>/ (src/pages/[coleccion]/[slug].astro) y cada
// zona con `texto`, en /zonas/<slug>/ (src/pages/zonas/[slug].astro).
import type { DefFicha, DefZonas } from '../lib/paginas';

export const FICHAS: DefFicha[] = [
  { lista: 'reparaciones', campo: 'reparaciones', ruta: 'reparaciones', nombre: 'Reparación', tipo: 'Service' },
];

export const ZONAS: DefZonas | null = { ruta: 'zonas' };
