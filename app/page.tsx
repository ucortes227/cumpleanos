"use client";

import { useCallback, useState } from "react";
import HeroSection from "@/components/HeroSection";
import LetterModal from "@/components/LetterModal";
import MusicPlayer from "@/components/MusicPlayer";
import CustomCursor from "@/components/CustomCursor";
import ParticlesCanvas from "@/components/ParticlesCanvas";
import FooterSection from "@/components/FooterSection";
import { PLAY_MUSIC_EVENT } from "@/lib/config";

export default function Home() {
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const openLetter = useCallback(() => {
    // El clic es una interacción real: aprovechamos para iniciar la música
    // si el navegador había bloqueado la reproducción automática.
    window.dispatchEvent(new Event(PLAY_MUSIC_EVENT));
    setIsLetterOpen(true);
  }, []);

  const closeLetter = useCallback(() => setIsLetterOpen(false), []);

  return (
    <main className="relative min-h-svh overflow-x-hidden bg-[#0a0a0a]">
      {/* Grano cinematográfico */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Partículas luminosas */}
      <ParticlesCanvas />

      {/* Cursor elegante (solo escritorio) */}
      <CustomCursor />

      {/* Música de fondo */}
      <MusicPlayer />

      {/* Pantalla de bienvenida */}
      <HeroSection onOpenLetter={openLetter} />

      {/* Sección final */}
      <FooterSection />

      {/* Carta interactiva */}
      <LetterModal isOpen={isLetterOpen} onClose={closeLetter} />
    </main>
  );
}
