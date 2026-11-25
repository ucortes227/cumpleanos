// Configuración general de la experiencia.
// Cambia aquí las rutas de la foto y la canción sin tocar los componentes.

export const siteConfig = {
  /** Foto principal (colócala en public/images/) */
  heroImage: "/images/hero.jpg",
  heroImageAlt: "Fotografía en blanco y negro",

  /** Canción de fondo (colócala en public/audio/) */
  audioSrc: "/audio/no-hay-nadie-mas.mp3",
  songTitle: "No hay nadie más",
  songArtist: "Sebastián Yatra",
  /** Volumen final de la música (0 a 1) */
  audioVolume: 0.45,

  /** Fechas mostradas en la página */
  dateLong: "26 de noviembre",
  dateShort: "26 · 11 · 2026",
} as const;

/** Evento global para iniciar la música desde cualquier interacción */
export const PLAY_MUSIC_EVENT = "birthday:play-music";
