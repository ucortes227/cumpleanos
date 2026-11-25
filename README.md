# 26 de noviembre · Feliz cumpleaños

Una felicitación web íntima y cinematográfica: fotografía en blanco y negro,
música de fondo y una carta que se abre con calma.

Hecha con **Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide React**.

---

## 1. Coloca tu foto y tu canción

| Archivo | Dónde va | Notas |
|---|---|---|
| Foto principal | `public/images/hero.jpg` | Reemplaza la imagen provisional. Se mostrará en blanco y negro automáticamente. Ideal: JPG de 2000–2500 px de ancho, con el rostro o el motivo cerca del centro (en el celular se recorta en vertical). |
| Canción | `public/audio/no-hay-nadie-mas.mp3` | Usa tu propio archivo, obtenido de forma legítima. |

¿Quieres otro nombre de archivo? Cámbialo en `lib/config.ts`.

## 2. Personaliza la carta

Todo el texto está en **`content/carta.ts`**:

- `saludo` – primera línea, en cursiva
- `parrafos` – cada elemento es un párrafo
- `cierre` – la línea final
- `firma` – puedes usar `\n` para partirla en varias líneas
- `ornamento` – `"estrella"` o `"corazon"`

Fechas, título de la canción y volumen están en **`lib/config.ts`**.

## 3. Instalar y ejecutar (Windows, macOS o Linux)

Requisitos: [Node.js](https://nodejs.org) 20.9 o superior.

```bash
cd cumpleanos
npm install        # instala dependencias (solo la primera vez)
npm run dev        # abre http://localhost:3000
```

Para comprobar que todo compila como en producción:

```bash
npm run build
npm run start      # sirve la versión optimizada en http://localhost:3000
```

> Para verlo en tu celular mientras desarrollas: con el teléfono en la misma red Wi-Fi,
> abre `http://IP-DE-TU-PC:3000` (la IP aparece en la terminal al ejecutar `npm run dev`).

## 4. Publicarlo gratis en Vercel

**Opción A — con GitHub (recomendada)**

1. Crea un repositorio en GitHub (puede ser **privado**) y sube el proyecto:
   ```bash
   git add .
   git commit -m "Felicitación de cumpleaños"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/cumpleanos.git
   git push -u origin main
   ```
2. Entra a [vercel.com](https://vercel.com) e inicia sesión con GitHub (plan Hobby, gratuito).
3. **Add New → Project**, elige el repositorio y pulsa **Deploy**. Vercel detecta Next.js solo; no hay que configurar nada.
4. En un minuto tendrás un enlace como `https://cumpleanos-xxxx.vercel.app`.
   En **Settings → Domains** puedes cambiarlo por uno más bonito, por ejemplo `para-ti-26nov.vercel.app`.

**Opción B — desde la terminal, sin GitHub**

```bash
npm i -g vercel
vercel          # primera vez: inicia sesión y acepta los valores por defecto
vercel --prod   # publica la versión definitiva
```

Cada vez que cambies algo, vuelve a hacer `git push` (opción A) o `vercel --prod` (opción B).

> Ten en cuenta que la canción quedará accesible para quien tenga el enlace.
> Compártelo solo con ella.

## 5. Sobre la música

Los navegadores (sobre todo en iPhone y Android) suelen bloquear la reproducción
automática con sonido. Por eso:

- La página intenta reproducirla al entrar.
- Si el navegador la bloquea, aparece un botón discreto **“Activar música”**.
- Al pulsar **“Hay algo para ti”** la música empieza sola, con un fundido suave.
- Arriba a la derecha hay un botón para pausar y reanudar.

## Estructura

```
app/            layout, página y estilos globales
components/     HeroSection, LetterModal, MusicPlayer, Ornament,
                ParticlesCanvas, CustomCursor, FooterSection
content/        carta.ts – texto editable de la carta
lib/            config.ts (rutas, fechas), animations.ts (animaciones compartidas)
public/images/  hero.jpg
public/audio/   ojos-marrones.mp3
```
