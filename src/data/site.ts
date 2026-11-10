// Carga ../../site.yaml en el build y lo expone tipado.
// Es la única fuente de contenido: textos, colores, contacto, menú y secciones.
import datos from '../../site.yaml';
import { conPaginas } from '../lib/multipagina';

export interface Enlace { texto: string; url: string }
export interface Item { titulo: string; texto?: string; icono?: string; imagen?: string; url?: string }
export interface Persona { nombre: string; cargo?: string; foto?: string; texto?: string }
/** Opinión. `nota` es opcional (qué se reparó y dónde: «Cambio de disco, Alcañiz»). */
export interface Testimonio { texto: string; autor: string; nota?: string }
export interface Horario { dia: string; horas: string }
export interface Pregunta { pregunta: string; respuesta: string }
/** Reparación (reparaciones.reparaciones): `precio` siempre como texto («desde 59 €»); `equipo` agrupa y filtra
 *  («Ordenador», «Portátil», «Impresora»…); `plazo` libre («24 horas»). Con `detalle`, página propia en /reparaciones/<slug>/. */
export interface Reparacion { nombre: string; texto: string; equipo: string; plazo: string; precio: string; imagen?: string; [campo: string]: unknown }
/** Plan de mantenimiento (empresas.planes). `incluye`: «Hasta 2 equipos; Antivirus; …» (separado por «;»). */
export interface Plan { nombre: string; precio: string; periodo: string; texto: string; incluye: string; destacado: boolean }
/** Equipo a la venta o montado a medida (equipos.equipos). `caracteristicas`: «16 GB; SSD de 1 TB; …». */
export interface Equipo { nombre: string; texto: string; categoria: string; precio: string; imagen: string; caracteristicas: string }

export interface Seccion {
  activa: boolean;
  titulo?: string;
  antetitulo?: string;
  texto?: string;
  imagen?: string;
  cta?: Enlace | null;
  cta_secundario?: Enlace | null;
  nota?: string;
  pie_foto?: string;
  items: Item[];
  personas: Persona[];
  testimonios: Testimonio[];
  galeria: string[];
  horario: Horario[];
  preguntas: Pregunta[];
  reparaciones: Reparacion[];
  planes: Plan[];
  equipos: Equipo[];
  [campo: string]: unknown;
}

export interface Site {
  nombre: string;
  eslogan: string;
  sector: string;
  logo: string;
  colores: { primario: string; acento: string; fondo: string; texto: string };
  contacto: { telefono: string; email: string; direccion: string; horario: string; whatsapp: string };
  redes: { instagram: string; facebook: string; linkedin: string };
  menu: Enlace[];
  /** `url` e `indexable` los escribe la plataforma (opcionales: las webs antiguas no los traen). */
  seo: { titulo: string; descripcion: string; tipo: string; url?: string; indexable?: boolean };
  boton_cabecera: Enlace | null;
  marca_pie: boolean;
  secciones: Record<string, Seccion>;
}

type Crudo = Record<string, any>;
const d = conPaginas((datos ?? {}) as Crudo);
export function lista<T>(v: unknown): T[] {
  return Array.isArray(v) ? (v.filter(Boolean) as T[]) : [];
}
export const texto = (v: unknown) => (v == null ? '' : String(v).trim());
const enlaceDe = (v: unknown): Enlace | null => {
  const e = (v ?? {}) as Crudo;
  return texto(e.url) ? { texto: texto(e.texto) || texto(e.url), url: texto(e.url) } : null;
};

function normalizar(s: Crudo = {}): Seccion {
  return {
    ...s,
    activa: s.activa === true,
    titulo: texto(s.titulo),
    antetitulo: texto(s.antetitulo),
    texto: texto(s.texto),
    imagen: texto(s.imagen),
    nota: texto(s.nota),
    pie_foto: texto(s.pie_foto),
    cta: enlaceDe(s.cta),
    cta_secundario: enlaceDe(s.cta_secundario),
    items: lista<Crudo>(s.items).filter((i) => texto(i.titulo) || texto(i.texto)).map((i) => ({ ...i, titulo: texto(i.titulo), texto: texto(i.texto), icono: texto(i.icono), imagen: texto(i.imagen) })),
    personas: lista<Persona>(s.personas),
    testimonios: lista<Crudo>(s.testimonios).filter((t) => texto(t.texto)).map((t) => ({ texto: texto(t.texto), autor: texto(t.autor), nota: texto(t.nota) })),
    galeria: lista<unknown>(s.galeria).map(texto).filter(Boolean),
    horario: lista<Crudo>(s.horario).filter((h) => texto(h.dia) || texto(h.horas)).map((h) => ({ dia: texto(h.dia), horas: texto(h.horas) })),
    preguntas: lista<Crudo>(s.preguntas).filter((p) => texto(p.pregunta)).map((p) => ({ pregunta: texto(p.pregunta), respuesta: texto(p.respuesta) })),
    // Las reparaciones conservan el objeto original: src/lib/paginas.ts las reconoce por identidad (enlaceDe).
    reparaciones: lista<Crudo>(s.reparaciones).filter((r) => texto(r.nombre)) as Reparacion[],
    planes: lista<Crudo>(s.planes)
      .filter((p) => texto(p.nombre))
      .map((p) => ({ nombre: texto(p.nombre), precio: texto(p.precio), periodo: texto(p.periodo), texto: texto(p.texto), incluye: texto(p.incluye), destacado: p.destacado === true })),
    equipos: lista<Crudo>(s.equipos)
      .filter((e) => texto(e.nombre))
      .map((e) => ({ nombre: texto(e.nombre), texto: texto(e.texto), categoria: texto(e.categoria), precio: texto(e.precio), imagen: texto(e.imagen), caracteristicas: texto(e.caracteristicas) })),
  } as Seccion;
}

const secciones: Record<string, Seccion> = {};
for (const [id, s] of Object.entries((d.secciones ?? {}) as Crudo)) secciones[id] = normalizar((s ?? {}) as Crudo);

export const site: Site = {
  nombre: texto(d.nombre) || 'Mi tienda de informática',
  eslogan: texto(d.eslogan),
  sector: texto(d.sector),
  logo: texto(d.logo),
  colores: { primario: '#2b2825', acento: '#b3472a', fondo: '#f4f1ea', texto: '#1a1815', ...(d.colores ?? {}) },
  contacto: { telefono: '', email: '', direccion: '', horario: '', whatsapp: '', ...(d.contacto ?? {}) },
  redes: { instagram: '', facebook: '', linkedin: '', ...(d.redes ?? {}) },
  menu: lista<Enlace>(d.menu).filter((e) => texto(e?.url)),
  seo: {
    titulo: texto(d.seo?.titulo) || texto(d.nombre),
    descripcion: texto(d.seo?.descripcion) || texto(d.eslogan),
    tipo: texto(d.seo?.tipo) || 'ComputerStore',
    ...(texto(d.seo?.url) && { url: texto(d.seo?.url).replace(/\/+$/, '') }),
    ...(typeof d.seo?.indexable === 'boolean' && { indexable: d.seo.indexable as boolean }),
  },
  boton_cabecera: d.boton_cabecera?.url ? { texto: texto(d.boton_cabecera.texto) || texto(d.boton_cabecera.url), url: texto(d.boton_cabecera.url) } : null,
  marca_pie: d.marca_pie !== false,
  secciones,
};

/** Devuelve la sección si existe y tiene `activa: true`; si no, null. */
export function seccion(id: string): Seccion | null {
  const s = site.secciones[id];
  return s && s.activa ? s : null;
}

/** Ids de las secciones activas, en el orden en que aparecen en site.yaml. */
export function seccionesActivas(): string[] {
  return Object.keys(site.secciones).filter((id) => site.secciones[id].activa);
}

/** Reparaciones de todas las secciones activas con lista `reparaciones` (también los apartados `tipo: reparaciones`). */
function reparacionesActivas(): Reparacion[] {
  return seccionesActivas().flatMap((id) => site.secciones[id].reparaciones ?? []);
}
/** Opciones «Aparato» del formulario de presupuesto: los `equipo` distintos de las reparaciones. */
export function dispositivos(): string[] {
  return [...new Set(reparacionesActivas().map((r) => texto(r.equipo)).filter(Boolean))];
}
/** Opciones «¿Qué le pasa?» del formulario de presupuesto: los nombres de las reparaciones. */
export function averias(): string[] {
  return [...new Set(reparacionesActivas().map((r) => texto(r.nombre)).filter(Boolean))];
}

/** Separa «a; b; c» (o una línea por elemento) en una lista. */
export const partes = (t?: string) => (t ? t.split(/\s*[;\n]\s*/).map((x) => x.trim()).filter(Boolean) : []);
export const tel = (n?: string) => (n ? 'tel:' + n.replace(/[^\d+]/g, '') : '');
export const whatsapp = (n?: string, mensaje = '') =>
  n ? `https://wa.me/${n.replace(/\D/g, '')}${mensaje ? '?text=' + encodeURIComponent(mensaje) : ''}` : '';
export const mapa = (direccion?: string) =>
  direccion ? 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(direccion) : '';
/** ¿El enlace sale de la web? (abre en otra pestaña). */
export const externo = (u?: string) => !!u && /^https?:/.test(u);
/** Párrafos a partir de un texto con líneas en blanco entre párrafos. */
export const parrafos = (t?: string) => (t ? t.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean) : []);
