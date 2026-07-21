# Brief de Proyecto — Landing Page LEON TV STREAMING

Este documento es el informe de referencia para el desarrollo de la landing page de **LEON TV STREAMING**. Contiene la información del negocio, el branding y los requisitos visuales/funcionales que debe cumplir el proyecto. Este README se entrega junto con la plantilla base de HTML y el prompt inicial ya provisto para adaptarla.

---

## 1. Contexto del Proyecto

- **Tipo de proyecto:** Landing page.
- **Punto de partida:** ya existe una plantilla base de HTML sobre la cual se debe trabajar, junto con un prompt inicial para adaptarla al negocio.
- **Estructura de la página:** la estructura de secciones ya está definida por la plantilla base. No agregar, quitar ni reordenar secciones; el trabajo consiste en adaptar contenido, branding, estilo visual y animaciones sobre esa estructura existente.

---

## 2. Información del Negocio

Datos extraídos del material provisto en la carpeta `imagenes/` (logo y capturas/flyers promocionales del negocio):

- **Nombre:** LEON TV STREAMING
- **Rubro:** Venta y reventa de suscripciones de streaming y paquetes de canales IPTV.
- **Contacto (WhatsApp):** 8119109538 — confirmado como canal principal de contacto. Todos los formularios y CTAs de contacto de la landing deben dirigir a este WhatsApp, ya que es donde el cliente quiere recibir el contacto de los clientes.
- **Redes sociales:** Instagram — [@leontvstreaming](https://www.instagram.com/leontvstreaming?igsh=MXExcjdncHcwbmM4aw==)
- **Catálogo de productos:** [https://leon-tv-streaming.glide.page/dl/375e23](https://leon-tv-streaming.glide.page/dl/375e23) — puede enlazarse como CTA/botón dentro de la sección de contacto ya existente en la plantilla.
- **Dirección:** no especificada en el material provisto.
- **Horarios de atención:** no especificados en el material provisto.

**Servicios / Productos:**

- **Suscripciones de streaming (reventa):** Netflix, HBO Max / Max, Disney+, Prime Video, Paramount+, Apple TV+, ViX / ViX+, Star+, YouTube Premium, Spotify, Crunchyroll, Claro Video, Xbox Game Pass, NBA League Pass, Viki Rakuten, Canva Pro, Gaia, Bixi, ChatGPT Plus.
- **Paquetes de canales IPTV / series y películas de estreno:** LegazyTV, RQTV, LAM-TV, BudTV Ultra, MiTV, SoloTV, Sky Soccer Plus MX, SuperTV, Flix, 1Prime, M327, PopTV.
- **Dispositivos compatibles:** Apple TV, Fire TV Stick, Android, Android TV Box, LG Smart TV, Roku.

**Datos extra relevantes:**

- Todo el deporte de PPV incluido.
- Canales nacionales e internacionales.
- Actualización constante del contenido.
- Contenido para toda la familia.
- Atención rápida y cordial.
- Servicio totalmente garantizado, full calidad.

---

## 3. Branding (a partir del logo)

El logo (`imagenes/logo.png`) muestra una cabeza de león con corona sobre fondo negro, en tono dorado/tan, con el texto "LEON TV" y "STREAMING" en tipografía bold en mayúsculas. A partir de esto se define la siguiente identidad visual:

**Paleta de colores:**

| Uso | Color | HEX |
|---|---|---|
| Fondo principal | Negro profundo | `#0A0A0A` |
| Color de marca / acento primario | Dorado | `#D4AF37` |
| Acento secundario / hover / detalles | Bronce oscuro | `#B8860B` |
| Texto sobre fondo oscuro | Blanco | `#FFFFFF` |
| Superficies secundarias / cards | Gris carbón | `#1A1A1A` |

**Tipografía sugerida:**

- **Títulos / Headings:** una sans-serif bold/geométrica tipo *Montserrat* (peso Black/ExtraBold) o *Poppins*, en línea con el estilo del lettering del logo.
- **Texto de cuerpo:** una sans-serif limpia y legible tipo *Inter* o *Roboto*.

**Identidad visual:** dorado sobre negro como combinación dominante, transmitiendo exclusividad y calidad premium; blanco para contraste y legibilidad; uso moderado del bronce oscuro para detalles, bordes o estados hover.

---

## 4. Estilo Visual Obligatorio

El proyecto debe manejar:

- Estilo **premium, enterprise y corporativo** de marca.
- Nivel **big tech**: elegante y a la vez minimalista.

---

## 5. Efectos y Animaciones Requeridos

Se deben incluir:

- Efectos visuales y animaciones de scroll.
- Pantalla de carga (**preloader**) con spinner + logo del negocio.
- Animaciones en el título del hero: efecto máquina de escribir, cambio de color en las letras u otros efectos tipográficos.

---

## 6. Instrucciones sobre Assets

- El logo (`imagenes/logo.png`) viene **con fondo**: se debe remover el fondo antes de usarlo en la landing.
- Las 3 imágenes restantes de la carpeta (`imagenes/WhatsApp Image...`) son flyers y capturas promocionales del negocio. Se incluyen como **fuente de información** (servicios, plataformas, contacto), no como piezas de diseño final: no deben insertarse tal cual en la landing; el contenido que aportan debe adaptarse al estilo visual premium/minimalista definido en este brief.

---

## 7. Nota para el Desarrollador

El desarrollador puede iterar sobre el proyecto con Claude Code, dándole instrucciones las veces que sea necesario hasta lograr el resultado deseado.

---

## 8. Checklist

- [ ] Adaptar la plantilla base con el prompt inicial provisto, respetando su estructura de secciones.
- [ ] Remover el fondo del logo (`imagenes/logo.png`) antes de usarlo.
- [ ] Aplicar la paleta de colores de marca (negro `#0A0A0A`, dorado `#D4AF37`, bronce `#B8860B`, blanco `#FFFFFF`, gris carbón `#1A1A1A`).
- [ ] Aplicar la tipografía sugerida (headings bold tipo Montserrat/Poppins, cuerpo tipo Inter/Roboto).
- [ ] Incorporar todo el contenido del negocio (servicios, plataformas, dispositivos compatibles, contacto, redes sociales).
- [ ] Enlazar el WhatsApp (8119109538) en todos los formularios/CTAs de contacto de la landing.
- [ ] Enlazar el catálogo de productos ([link](https://leon-tv-streaming.glide.page/dl/375e23)) en la sección de contacto.
- [ ] Confirmar con el cliente los datos faltantes: dirección y horarios de atención.
- [ ] Implementar el preloader con spinner + logo.
- [ ] Implementar animaciones de scroll en la página.
- [ ] Implementar la animación del título del hero (máquina de escribir, cambio de color u otro efecto tipográfico).
- [ ] Verificar que el estilo general se perciba premium, enterprise y minimalista (nivel big tech).
- [ ] Iterar con Claude Code hasta lograr el resultado final deseado.
