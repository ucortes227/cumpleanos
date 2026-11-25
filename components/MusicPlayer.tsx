"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Music, Pause, Play } from "lucide-react";
import { PLAY_MUSIC_EVENT, siteConfig } from "@/lib/config";

type Status = "idle" | "playing" | "paused" | "blocked" | "unavailable";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRef = useRef<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  /** Sube el volumen poco a poco para una entrada suave */
  const fadeIn = useCallback((audio: HTMLAudioElement) => {
    if (fadeRef.current) window.clearInterval(fadeRef.current);
    audio.volume = 0;
    const target = siteConfig.audioVolume;
    fadeRef.current = window.setInterval(() => {
      const next = Math.min(target, audio.volume + target / 30);
      audio.volume = next;
      if (next >= target && fadeRef.current) {
        window.clearInterval(fadeRef.current);
        fadeRef.current = null;
      }
    }, 80);
  }, []);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || audio.error) return false;
    try {
      await audio.play();
      fadeIn(audio);
      setStatus("playing");
      return true;
    } catch {
      return false;
    }
  }, [fadeIn]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setStatus("paused");
  }, []);

  // Intento de reproducción automática al entrar
  useEffect(() => {
    const timer = window.setTimeout(async () => {
      const ok = await play();
      if (!ok) {
        setStatus((s) => (s === "unavailable" ? s : "blocked"));
      }
    }, 300);
    return () => window.clearTimeout(timer);
  }, [play]);

  // Si el navegador bloqueó el autoplay, la música arranca con el primer
  // toque, clic o tecla en cualquier parte de la página.
  useEffect(() => {
    if (status !== "idle" && status !== "blocked") return;
    const onFirstInteraction = (e: Event) => {
      const target = e.target as HTMLElement | null;
      // Los botones de música gestionan su propio clic
      if (target?.closest("[data-music-control]")) return;
      void play();
    };
    const opts = { capture: true, passive: true } as const;
    window.addEventListener("pointerdown", onFirstInteraction, opts);
    window.addEventListener("keydown", onFirstInteraction, opts);
    return () => {
      window.removeEventListener("pointerdown", onFirstInteraction, opts);
      window.removeEventListener("keydown", onFirstInteraction, opts);
    };
  }, [status, play]);

  // Iniciar la música cuando ella abre la carta (interacción real del usuario)
  useEffect(() => {
    const onRequest = () => {
      const audio = audioRef.current;
      if (audio && audio.paused && status !== "paused") void play();
    };
    window.addEventListener(PLAY_MUSIC_EVENT, onRequest);
    return () => window.removeEventListener(PLAY_MUSIC_EVENT, onRequest);
  }, [play, status]);

  // Limpieza del fundido
  useEffect(
    () => () => {
      if (fadeRef.current) window.clearInterval(fadeRef.current);
    },
    []
  );

  const toggle = () => {
    if (status === "playing") pause();
    else void play();
  };

  const isPlaying = status === "playing";

  return (
    <>
      <audio
        ref={audioRef}
        src={siteConfig.audioSrc}
        preload="auto"
        loop
        playsInline
        onError={() => {
          setStatus("unavailable");
          console.warn(
            `No se encontró la canción en ${siteConfig.audioSrc}. Coloca el archivo en public/audio/.`
          );
        }}
        onPause={() =>
          setStatus((s) => (s === "playing" ? "paused" : s))
        }
      />

      {/* Invitación discreta si el navegador bloqueó la reproducción automática */}
      <AnimatePresence>
        {status === "blocked" && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 1.4 }}
            className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 z-40 -translate-x-1/2"
          >
            <button
              type="button"
              onClick={() => void play()}
              data-cursor="hover"
              data-music-control
              className="pulse-animation flex min-h-[44px] items-center gap-3 whitespace-nowrap rounded-full px-5 uppercase"
              style={{
                background: "rgba(20,17,14,0.55)",
                border: "1px solid rgba(200,184,154,0.35)",
                color: "#c8b89a",
                fontFamily: "var(--font-sans)",
                fontSize: "0.66rem",
                letterSpacing: "0.18em",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              <Music size={13} strokeWidth={1.5} />
              Activar música
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controles: pausar / reanudar */}
      {status !== "unavailable" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="fixed right-4 top-4 z-[60] flex items-center gap-3 sm:right-6 sm:top-6"
        >
          <AnimatePresence>
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.5 }}
                className="hidden flex-col items-end sm:flex"
              >
                <span
                  className="uppercase"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.55rem",
                    letterSpacing: "0.22em",
                    color: "rgba(200,184,154,0.6)",
                  }}
                >
                  Sonando
                </span>
                <span
                  className="italic"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "0.85rem",
                    color: "rgba(230,220,205,0.85)",
                  }}
                >
                  {siteConfig.songTitle} — {siteConfig.songArtist}
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={toggle}
            data-cursor="hover"
              data-music-control
            className="flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-300 hover:scale-105"
            style={{
              background: isPlaying
                ? "rgba(200,184,154,0.16)"
                : "rgba(20,17,14,0.45)",
              border: "1px solid rgba(200,184,154,0.35)",
              color: "#c8b89a",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
          >
            {isPlaying ? (
              <span className="group relative flex h-4 w-4 items-center justify-center">
                <span className="flex items-end gap-[2px] transition-opacity group-hover:opacity-0">
                  <span className="eq-bar" />
                  <span className="eq-bar" />
                  <span className="eq-bar" />
                </span>
                <Pause
                  size={14}
                  strokeWidth={1.5}
                  className="absolute opacity-0 transition-opacity group-hover:opacity-100"
                />
              </span>
            ) : (
              <Play size={14} strokeWidth={1.5} className="ml-0.5" />
            )}
          </button>
        </motion.div>
      )}
    </>
  );
}
