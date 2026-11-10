# Informática y servicio técnico: brief de diseño

Plantilla `informatica` creada el 10/11/2026 a partir de `reparacion-moviles` con `php artisan plantillas:nueva` y
rediseñada entera con el tema **Terrazzo** de la skill Hallmark (género modern-minimal). De la base solo queda la
estructura técnica (carga del `site.yaml`, SEO de base, fichas, varias páginas y el formulario de presupuesto).
Este fichero se queda en el repo: es lo que lee quien (persona o agente) rediseñe la plantilla.

## Brief

- **Para quién**: tiendas y servicios técnicos de informática de barrio o de comarca: reparación de ordenadores y
  portátiles, venta y montaje de equipos a medida, mantenimiento para empresas y autónomos (redes, copias, antivirus,
  servidores, correo), recuperación de datos, wifi y cámaras, TPV e impresoras, asistencia remota y a domicilio.
  No es una startup ni una app (`startup-app`) ni solo móviles (`reparacion-moviles`).
- **Qué busca su cliente al entrar**: saber si le arreglan lo suyo, en cuánto tiempo y por cuánto, qué cuesta un
  mantenimiento, y llamar, escribir por WhatsApp o pasar por la tienda.
- **Qué tiene que conseguir la web**: que llame o pida presupuesto. «Llamar» en la portada y la barra fija del móvil,
  «Pedir presupuesto» en la cabecera, junto a la tabla de reparaciones y en el formulario del contacto; cada plan de
  mantenimiento abre WhatsApp con su nombre.
- **Tono**: catálogo técnico de tienda seria y cercana: el nombre de la avería, el plazo y el precio, sin vender
  humo. De tú. Referencia que sí: una hoja de especificaciones o el mostrador ordenado de un taller. Que no: la estética
  «hacker» de neón y negro (eso es `reparacion-moviles`) ni una landing de software.

## Tema Hallmark y cómo se ha traducido

Terrazzo es la voz de una biblioteca de materiales: papel blanco roto, tinta casi negra, Syne ancha en titulares sobre
Onest, JetBrains Mono para códigos y medidas, tarjetas blancas con borde de tinta de 2 px y sombra dura desplazada,
radio 0, fotos cenitales de la superficie en color real y una sola señal óxido. Aquí el «material» es el banco de
trabajo: las fotos son piezas y equipos vistos desde arriba, como muestras, y la tabla de reparaciones es la hoja de
especificaciones de la tienda (la firma de la plantilla).

- **Paleta** (`site.yaml → colores`): `fondo #f4f1ea` (papel), `texto #1a1815` (tinta, también botones y filetes),
  `acento #b3472a` (óxido: plazos, fila al pasar, filtro, foco, subrayado), `primario #2b2825` (banda de tinta de
  empresas y pie). Papel 2 y 3, placa de las tarjetas, apagado, filete y acento suave salen de esos cuatro con
  `color-mix()`; la letra sobre primario y acento y el acento legible sobre papel, con `oklch(from …)` (claro u oscuro
  según el color). Probado con primario azul `#0b4f8a` y acento amarillo `#f2b705`: banda azul con letra blanca, plazos
  en un ocre oscuro legible.
- **Tipografías** (todas OFL-1.1, alojadas en `public/fuentes/`, 66 KB en total): Syne 700 (titulares, nombre, precios
  de los planes, números de los pasos), Onest 400 y 500 (texto, etiquetas, botones), JetBrains Mono 500 (plazos,
  precios y teléfonos). Solo se precarga Syne. Son las tres caras del tema, sin sustituciones.
- **Forma**: radio 0 en todo; tarjetas `.carta` (placa, borde de 2 px, sombra dura de papel 3 que pasa a tinta al pasar
  por las enlazadas); filetes de 2 px de tinta encima de tablas y listas y de 1 px entre filas; botones cuadrados: tinta
  llena y contorno de tinta. Quieto: sin revelados ni animaciones salvo cambios de color de 120 ms.
- **Fotos**: tratamiento `natural con=4` del tema (`filter: contrast(1.04)` por CSS). Siempre dentro de una tarjeta,
  de borde a borde, con su pie debajo; nunca texto encima.
- **Titulares sin palabras partidas**: `overflow-wrap: normal`, `hyphens: manual` y tamaño limitado por la anchura de
  su columna (`min(…, 8.3cqi)` con `container-type: inline-size`): Syne es ancha («Impermeabilizaciones» ocupa 11,75 em),
  así que una palabra de 20 letras cabe entera en el `h1` y los `h2` a 375 px y en escritorio. Por eso el `h1` de la
  portada se queda en unos 70 px a 1440 en vez de 84: la cara ancha baja un escalón, como pide el propio tema.

## Ritmo de bandas y apartados

1. `hero` Portada «Showcase»: titular en 8 columnas, frase y dos botones al lado; debajo, la foto del banco a todo el
   contenedor (21:9) en una tarjeta con el pie (`pie_foto` y los `items` como datos cortos).
2. `reparaciones` Hoja de especificaciones a todo el ancho: filtro por equipo (casillas cuadradas unidas), nombre y
   texto, equipo, plazo (mono óxido) y precio (mono). Cada reparación con `detalle` tiene ficha propia.
3. `taller` Partida 7/5: foto en tarjeta y garantías en filas con filetes.
4. `empresas` Banda de tinta: planes en tarjetas blancas (precio grande en Syne) y servicios con icono en tres columnas.
5. `equipos` Vitrina: una tarjeta grande y tres apaisadas.
6. `proceso` Banda de papel 2 con filetes: cuatro pasos colgados de un filete de 2 px con su número en Syne.
7. `zonas` Partida 5/7: índice de pueblos en Syne (los que tienen página, con flecha) y la foto en tarjeta.
8. `opiniones` Columnas con filete; la primera más ancha (no se inventan: desmarcada al crear la web).
9. `preguntas` Titular fijo a la izquierda y filas plegables.
10. `contacto` Vías en filas (teléfono grande en Syne), foto de la tienda y el formulario de presupuesto en tarjeta.

Pie: mástil en la banda de tinta (nombre gigante en Syne) y cuatro columnas. Móvil: barra fija «Llamar» / «WhatsApp».
Fotos y bandas alternan: ningún par de apartados seguidos lleva foto grande.

Varias páginas (`template.yaml → paginas`): Reparaciones (reparaciones, proceso), Empresas, Equipos y Contacto (zonas,
preguntas, contacto); Inicio se queda con la portada, el taller y las opiniones.

## Fotos (`fotos.json`, 11)

Banco de trabajo cenital con un portátil abierto (portada), manos con guantes poniendo una memoria (taller), pantalla
de portátil desmontada, discos duros (uno abierto), interior de un sobremesa con pasta térmica (fichas de
reparación), torre negra, portátil cerrado, TPV en un mostrador, impresora multifunción (equipos), punto de acceso wifi
en el techo de una casa de pueblo (zonas) y mostrador de la tienda (contacto). Generadas con IA a 1024 px y recortadas;
la portada va a 1536 px (16:9), recortada a 21:9 por CSS en escritorio.

## Lo que no se ha podido o se ha decidido distinto del tema

- **Fotos grandes**: Terrazzo guarda las fotos en tarjetas de muestrario; se respeta (ninguna lleva texto encima), pero
  las tarjetas van grandes, hasta todo el contenedor, porque el dueño quiere webs a todo el ancho con fotos grandes.
- **`antetitulo`**: Hallmark prohíbe los antetítulos; es contrato de NoExpertise y se pinta como letra menuda de Onest
  en caja normal, sin versalitas ni interletrado.
- **sloplint** (`dist/index.html --genre modern-minimal`): quedan FAIL 20 (Tailwind antepone su cabecera al sello del
  CSS en línea; el sello es la primera línea de `global.css`), FAIL 48 (literales de `comun.css`, común a todas las
  plantillas, y el `style` de `<html>` con los cuatro colores, contrato) y FAIL 67 (`.pie-titulo` de `comun.css`; aquí
  se anula con `text-transform: none` y sin interletrado). WARN 58 (palabras de la página): el contenido es del cliente
  y el ejemplo enseña todos los apartados. WARN F4 (dos botones llenos en la portada) es un falso positivo: el segundo
  es de contorno (`box-shadow` interior).
- **Opiniones** del ejemplo: lista de muestra; la plataforma la deja desmarcada al crear una web.
- La demo pública de la plataforma va en Alcañiz (la ciudad del ejemplo) para que enseñe las páginas por zona.
