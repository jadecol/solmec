# SOLMEC S.A.S. · Sitio de portafolio

Página de presentación de SOLMEC S.A.S. (soluciones mecatrónicas): ingeniería mecatrónica, automatización y energía para petróleo y gas y la industria. Proyecto Vite sin frameworks (HTML, CSS y JavaScript). El contenido sale del *Portafolio de servicios y suministros* de SOLMEC.

## Uso

```bash
npm install
npm run dev       # servidor local con recarga
npm run build     # genera dist/ listo para subir a cualquier hosting
npm run preview   # sirve dist/ para revisarlo
```

`dist/` usa rutas relativas y lleva las fuentes incluidas, así que funciona en cualquier dominio o subcarpeta, y también sin acceso a Google Fonts (útil en redes corporativas).

## Dónde se edita cada cosa

| Qué | Dónde |
| --- | --- |
| Textos, sectores, servicios, casos, HSEQ, software, método y contacto | `src/config.js` |
| Fotos | `public/media/` (se referencian como `'media/archivo.jpg'` en `src/config.js`) |
| Logo e icono | `public/favicon.png` (emblema), `public/media/logo-solmec.png` (logo completo) |
| Colores y tipografía | variables al inicio de `src/styles.css` |
| Estructura de la página | `index.html` |
| Gemelo digital interactivo del héroe | `src/twin.js` (escenas `OIL` y `ELEC`, simulación y controles HMI) |
| Carrusel de capacidades | `capacidades.items` en `src/config.js` |
| Proyectos y casos de éxito | `casos.items` en `src/config.js` |
| Normatividad y HSEQ | `hseq` en `src/config.js` |
| Videos de obras | `obras.items` en `src/config.js` + archivos MP4 en `public/media/` |
| Marcas | `marcas.grupos` en `src/config.js` |
| Configurador de cotización (RFQ) | `contacto.rfq` en `src/config.js` |

- Los servicios se organizan en tres grupos (`servicios.grupos`), como en el portafolio en PDF. La numeración 01–20 se calcula sola, e incluye fichas desplegables con alcance técnico (`specs`) y entregables (`entregables`).
- El menú "Servicios" se genera desde los grupos más la sección de software.
- Los gemelos digitales se presentan como **demostrador interactivo en desarrollo**: permiten simular golpes de flujo, ajustar el setpoint de nivel o forzar una falla de red eléctrica con transferencia automática ATS.
- Los datos de contacto con `href` son enlaces (correo y llamada), todos se pueden copiar y la sección incluye un configurador B2B de Solicitud Técnica (RFQ).

## Fotos y videos que fallan

Ningún contenedor muestra nunca una imagen rota. Mientras carga hay un fondo sobrio; si una foto o un video no carga (archivo borrado, mal escrito o red lenta), aparece un respaldo en azul petróleo con el emblema de SOLMEC y la descripción de la foto. Si el emblema del encabezado falla, queda solo el nombre.

## Videos de obras

1. Comprime cada video (vertical, como los de TikTok) y crea su miniatura. Con [ffmpeg](https://ffmpeg.org) en PowerShell:

   ```powershell
   ffmpeg -i original.mp4 -vf "scale=720:-2" -c:v libx264 -crf 26 -preset veryfast -c:a aac -b:a 96k -movflags +faststart public\media\obra-1.mp4
   ffmpeg -ss 2 -i public\media\obra-1.mp4 -frames:v 1 -q:v 3 public\media\obra-1.jpg
   ```

   Usen el archivo original, no la descarga de TikTok con marca de agua. Lo ideal es que duren entre 30 y 60 segundos y pesen menos de 8 MB.
2. En `src/config.js`, en `obras.items`, escriban `src: 'media/obra-1.mp4'`, `poster: 'media/obra-1.jpg'`, y el título y el lugar reales. `tiktok` es opcional: si el video falla, la tarjeta abre ese enlace.
3. Con `npm run dev` se ven los espacios vacíos; en el sitio publicado los videos sin archivo se ocultan, y si no hay ninguno se ocultan la sección y su enlace del menú.

## Antes de publicar y Despliegue (GitHub + Cloudflare Pages + Namecheap)

### 1. Subir el código a GitHub (`https://github.com/jadecol/solmec.git`)

Puedes ejecutar directamente el script automatizado en PowerShell desde la carpeta del proyecto:

```powershell
.\subir-github.ps1
```

O ejecutar los comandos paso a paso en la terminal:

```powershell
git init
git branch -M main
git remote add origin https://github.com/jadecol/solmec.git
git add .
git commit -m "feat: portafolio corporativo SOLMEC S.A.S. (Desarrollado por ECOZAN)"
git push -u origin main
```

### 2. Publicar en Cloudflare Pages

1. Entra a tu cuenta de **Cloudflare** → **Compute (Workers & Pages)** → **Create** → pestaña **Pages** → **Connect to Git**.
2. Selecciona tu cuenta de GitHub y el repositorio **`jadecol/solmec`**.
3. En **Build settings**, configura:
   - **Production branch:** `main`
   - **Framework preset:** `Vite` (o `None`)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Haz clic en **Save and Deploy**. En menos de 1 minuto tendrás la URL `*.pages.dev` activa y cada `git push` actualizará el sitio automáticamente.

### 3. Conectar el dominio de Namecheap con Cloudflare

1. **Agregar el dominio a Cloudflare:**
   - En el panel principal de Cloudflare, haz clic en **Add a domain** (o **Onboard a domain**), escribe tu dominio comprado en Namecheap y elige el plan **Free**.
   - Cloudflare te asignará **2 Nameservers** (por ejemplo, `xxx.ns.cloudflare.com` y `yyy.ns.cloudflare.com`).
2. **Cambiar Nameservers en Namecheap:**
   - Entra a **Namecheap** → **Domain List** → haz clic en **Manage** junto a tu dominio.
   - En la sección **Nameservers**, cambia de *Namecheap BasicDNS* a **Custom DNS**.
   - Pega los 2 Nameservers de Cloudflare y haz clic en el ícono verde de guardar (✓).
3. **Vincular el dominio personalizado al proyecto de Cloudflare Pages:**
   - En Cloudflare → **Workers & Pages** → entra a tu proyecto **`solmec`** → pestaña **Custom domains** → **Set up a custom domain**.
   - Escribe tu dominio principal (ej. `solmec.com` o `solmecsas.com`) y luego repite para `www`. Cloudflare creará los registros DNS `CNAME` y el certificado SSL/HTTPS automáticamente.
4. **Opcional (`og:image`):**
   - Cuando el dominio esté activo, puedes actualizar `og:image` en `index.html` con la URL completa (`https://tudominio.com/media/genset.jpg`) para previsualización en WhatsApp/LinkedIn.

## Vista previa en un solo archivo

`npm run artifact` genera `preview/artifact.html`, la misma página en un único archivo y sin Vite. Las fotos no van incluidas en ese archivo; es solo para revisar textos y diseño.
