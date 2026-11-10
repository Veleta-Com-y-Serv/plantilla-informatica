# Plantilla «Informática y servicio técnico» (NoExpertise)

Web estática Astro 5 + Tailwind 4, derivada de AstroWind (MIT, ver `LICENSE-ASTROWIND.md`). Diseñada con el tema
**Terrazzo** de Hallmark (`estilo: terrazzo`): papel blanco roto, tinta casi negra, titulares en Syne, texto en Onest,
plazos y precios en JetBrains Mono, tarjetas blancas con borde de tinta de 2 px y sombra dura, radio 0 en todo y una
sola señal color óxido. Para tiendas y servicios técnicos de informática de barrio o de comarca. Todo en castellano de
España, frases cortas, sin jerga, de tú. El brief de diseño completo está en `DISEÑO.md`.

## Dónde está cada cosa
- **Textos, contacto, menú, SEO y secciones**: `site.yaml` (raíz). Es la única fuente de contenido. `src/data/site.ts` lo carga y lo tipa; no pongas textos fijos en los componentes.
- **Colores**: `site.yaml → colores` (primario, acento, fondo, texto). `src/layouts/Base.astro` los convierte en variables CSS (`--c-primario`…); `src/styles/global.css` deriva de ellos todos los demás tonos con `color-mix()` / `oklch(from …)`.
  - `fondo` = el papel. `texto` = la tinta: la letra, los filetes de 2 px, los bordes de las tarjetas **y los botones** (el tema no pinta botones de color).
  - `acento` = la señal (óxido): plazos de la tabla de reparaciones, fila al pasar, casilla del filtro, foco y subrayado al pasar. Se oscurece solo si hace falta para leerse.
  - `primario` = la banda de tinta (empresas y planes) y el pie. La letra encima se calcula sola (clara u oscura).
- **Tipografías**: alojadas en `public/fuentes/` (Syne 700, Onest 400 y 500, JetBrains Mono 500; licencias en `public/fuentes/LICENCIAS.md`). Sin servicios externos. Los titulares se ajustan a su columna con unidades de contenedor (`cqi`) para que una palabra de 20 letras quepa entera: no quites `container-type` de `.titular`, `.cabeza-titulo`, `.portada-titular`, `.plan`, `.equipo-cuerpo` ni `.formulario-carta`.
- **Aspecto general**: `src/styles/global.css` (bandas `.banda--papel`, `.banda--clara`, `.banda--tinta`; tarjetas `.carta` y `.muestra` con su pie `.muestra-pie`; `.btn` tinta llena y `.btn-sec` contorno; `.codigo` monoespaciada; tabla `.spec`; cabecera `.cabecera--muestrario`; pie `.pie--muestrario`; barra de móvil).
- **Imágenes**: en `public/fotos/` (lista y prompts en `fotos.json`). Respaldo si falta una foto: `public/placeholders/foto.svg`; personas: `/placeholders/persona.svg`. Las fotos van siempre dentro de una tarjeta y nunca llevan texto encima.
- **Logo**: `site.yaml → logo` (ruta en `public/`); vacío = el nombre en Syne.
- **Pie «Web creada con NoExpertise»**: `site.yaml → marca_pie` (true en plan gratis).

## Secciones
Cada sección es un componente que solo se pinta si `site.yaml → secciones.<id>.activa` es `true`, en el orden de `site.yaml`.
- `hero` → `hero.astro`: `antetitulo`, `titulo` (8 columnas), `texto`, `cta` (llamar) y `cta_secundario` (presupuesto) al lado; debajo, `imagen` en una tarjeta a todo el contenedor con `pie_foto` y los `items` (solo `titulo`: datos cortos, el editor los llama «Cifras»).
- `reparaciones` → `reparaciones.astro`: `reparaciones: [{nombre, texto, equipo, plazo, precio, detalle?, imagen?}]` como hoja de especificaciones con filtro por `equipo`; `nota` y `cta` debajo. Los `equipo` y los nombres son las opciones del formulario de presupuesto. **No inventes precios ni plazos.**
- `taller` → `taller.astro`: `imagen` + `pie_foto` en tarjeta y, al lado, `texto` e `items: [{titulo, texto}]` (garantías) en filas con filetes.
- `empresas` → `empresas.astro`: banda de tinta; `planes: [{nombre, precio, periodo, texto, incluye, destacado}]` en tarjetas (`incluye` separado por «;»; `destacado` lleva «Recomendado»), `items: [{titulo, texto, icono}]` (servicios), `nota` y `cta`.
- `equipos` → `equipos.astro`: `equipos: [{nombre, texto, categoria, precio, imagen, caracteristicas}]` en vitrina (el primero grande; `caracteristicas` separado por «;»); `cta`.
- `proceso` → `proceso.astro` (Cómo trabajamos): `items: [{titulo, texto}]` como lista ordenada con números grandes.
- `zonas` → `zonas.astro` (Dónde vamos): `items: [{titulo, texto?, imagen?}]` como índice de pueblos, `imagen` en tarjeta, `titulo_pagina` y `texto_pagina` (con `{zona}`).
- `opiniones` → `opiniones.astro`: `testimonios: [{texto, autor, nota}]`. Sin testimonios no se pinta. **No inventes opiniones.**
- `preguntas` → `preguntas.astro`: `preguntas: [{pregunta, respuesta}]` plegables. Sin preguntas no se pinta.
- `contacto` → `contacto.astro`: datos de `contacto` en filas (teléfono grande), `imagen` en tarjeta y el formulario de presupuesto (`titulo_formulario`, `boton_formulario`).
- `texto` → `texto.astro`: apartado genérico (párrafos, `imagen`, `items`, `cta`). Para apartados nuevos: `tipo: texto`.

## Reglas para órdenes
1. **Activar o quitar una sección**: `activa: true|false` en `site.yaml`. No borres componentes.
2. **Reordenar**: mueve el bloque dentro de `secciones:`. Procura no juntar dos apartados con foto grande (`taller`, `equipos`, `zonas`) ni dos bandas oscuras.
3. **Cambiar textos, teléfonos, horarios, fotos**: solo en `site.yaml`. Si un texto contiene comas o dos puntos dentro de `{ … }`, ponlo entre comillas.
4. **Listas planas**: nunca una lista dentro de un elemento de lista. Precios siempre como texto entre comillas (`"desde 59 €"`, `"Consultar"`). Para varios valores en un campo, «;» (`incluye`, `caracteristicas`). Máximo 24 elementos por lista.
5. **Página nueva**: `src/pages/<slug>.astro` con `import Base from '../layouts/Base.astro'`; enlázala en `site.yaml → menu`. Ejemplo: `src/pages/aviso-legal.astro`.
6. **Sección nueva**: mejor un apartado con `tipo:` (`tipo: texto`, `tipo: reparaciones`, `tipo: equipos`…) y su propio id. `src/pages/index.astro` lo recoge solo: no lo toques.
7. **No tocar** `src/layouts/Base.astro`, `src/pages/index.astro`, `src/pages/[...pagina].astro`, `tailwind.config.mjs`, `src/styles/comun.css`, `src/lib/*.ts` ni `src/pages/robots.txt.ts`, `sitemap.xml.ts` y `llms.txt.ts` (SEO de base: canónica, og:image, `noindex` si `seo.indexable: false`, JSON-LD del negocio —tipo `ComputerStore`— y de las preguntas). `seo.url` y `seo.indexable` los pone la plataforma.
8. Mantén: `lang="es-ES"`, imágenes con `Imagen.astro`, sin JavaScript nuevo salvo necesidad real (solo hay el del menú móvil y el filtro de reparaciones, en línea), radio 0, sin texto sobre las fotos, sin scroll horizontal a 375 px, botones de 48 px, barra fija de móvil («Llamar» / «WhatsApp»). `alt` de las fotos sacado del contenido (`altHero`, `altSeccion`, `altGaleria` de `src/lib/seo.ts`); las decorativas, `alt=""`.
9. Los formularios no tienen servidor: abren el correo (`mailto`) con el email de `site.yaml`. No cambies el marcado de `src/components/ui/FormularioContacto.astro` (la plataforma lo conecta al publicar).
10. Iconos (`src/components/ui/Icono.astro`): `red, wifi, nube, escudo, servidor, tpv, remoto, ordenador, portatil, impresora, disco, camara, herramienta, lupa, euro, candado, reloj, telefono, whatsapp, correo, mapa, check`.

## Construir
```
npm ci && npm run build      # resultado en dist/
npx astro preview            # ver dist/ en http://localhost:4321
```
Antes de dar una orden por buena: `npm run build` sin errores.

## Páginas propias (fichas y zonas)
- `secciones.reparaciones.reparaciones` → `/reparaciones/<slug>/` (reparación; espejo en `src/data/fichas.ts`). **Solo los elementos con `detalle`** (párrafos separados por una línea en blanco, ≤ 3000 caracteres, sin HTML) tienen página. Opcionales: `slug` e `imagenes` («/fotos/a.jpg; /fotos/b.jpg»); la foto principal es `imagen`.
- `secciones.zonas.items` → `/zonas/<slug>/`: **solo las zonas con `texto`** (60-150 palabras) tienen página, con el título `titulo_pagina` y la entrada `texto_pagina` de la sección (`{zona}` se cambia por el nombre).
- Una orden «añade una página para X» = escribir su `detalle` (o el `texto` de la zona) en site.yaml. Nunca crees a mano páginas en `src/pages/reparaciones/` ni en `src/pages/zonas/`.

## Varias páginas
- `paginas:` (raíz de site.yaml, opcional): `[{ ruta, titulo, secciones: "reparaciones; proceso" }]`, como mucho 6, cada sección en una sola página y nunca `hero`. Reparto recomendado en `template.yaml → paginas` (Reparaciones, Empresas, Equipos, Contacto). Sin la clave, una sola página larga. Una orden «haz la web de varias páginas» = escribir `paginas`.
- En un componente, un enlace fijo a una sección va con `enlace('/#contacto')` (de `src/lib/multipagina.ts`).
