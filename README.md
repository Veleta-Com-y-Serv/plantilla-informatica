# Plantilla NoExpertise · Informática y servicio técnico

Web de ficha técnica para tiendas de informática: reparaciones con plazo y precio, mantenimiento y equipos.

- Sectores: informática, servicio técnico, tienda de informática, mantenimiento informático. Estilo: terrazzo (tema de Hallmark). Plan mínimo: gratis.
- Secciones: hero, reparaciones, taller, empresas (mantenimiento y planes), equipos, proceso (cómo trabajamos), zonas (dónde vamos), opiniones, preguntas, contacto (+ `texto` para apartados nuevos).
- Campos propios: `hero.pie_foto`, `reparaciones.reparaciones[]` (`nombre, texto, equipo, plazo, precio, detalle, imagen`; filtro por equipo), `reparaciones.nota`, `taller.pie_foto`, `taller.items`, `empresas.planes[]` (`nombre, precio, periodo, texto, incluye, destacado`), `empresas.items` (servicios con icono), `empresas.nota`, `equipos.equipos[]` (`nombre, texto, categoria, precio, imagen, caracteristicas`), `zonas.titulo_pagina`, `zonas.texto_pagina`, `contacto.titulo_formulario`, `contacto.boton_formulario`.
- Formulario de presupuesto con aparato (opciones: los `equipo` de las reparaciones), marca y modelo y avería (opciones: los nombres de las reparaciones); sin servidor (`mailto`).
- Barra inferior fija en móvil con «Llamar» y «WhatsApp».
- Páginas propias: cada reparación con `detalle` en `/reparaciones/<slug>/` y cada zona con `texto` en `/zonas/<slug>/`.
- SEO de base incluido (`src/lib/seo.ts`): canónica, og:image, JSON-LD del negocio (`ComputerStore`) y de las preguntas frecuentes, `robots.txt`, `sitemap.xml` y `llms.txt`; `noindex` si `seo.indexable: false`.
- Varias páginas (opcional, `paginas:` en la raíz de `site.yaml`): Inicio + una página por entrada (`{ ruta, titulo, secciones: "a; b" }`, hasta 6) con el menú hecho solo; reparto recomendado en `template.yaml → paginas`. Sin la clave, una sola página larga.
- Contenido editable en `site.yaml`; metadatos y guion del asistente en `template.yaml`; reglas para el agente en `CLAUDE.md`; brief de diseño en `DISEÑO.md`; fotos a generar en `fotos.json`.

```
npm ci
npm run dev      # desarrollo
npm run build    # web estática en dist/
```

Basada en [AstroWind](https://github.com/onwidget/astrowind) © onWidget, licencia MIT (`LICENSE-ASTROWIND.md`). Tipografías Syne, Onest y JetBrains Mono con licencia SIL Open Font License 1.1 (`public/fuentes/LICENCIAS.md`). Fotos de ejemplo generadas con IA para esta plantilla, sin licencias de terceros.
