"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { siteConfig } from "@/lib/config";
import { EASE_SOFT, fadeUp, staggerContainer } from "@/lib/animations";

interface HeroSectionProps {
  onOpenLetter: () => void;
}

export default function HeroSection({ onOpenLetter }: HeroSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const [imageFailed, setImageFailed] = useState(false);

  // Profundidad al hacer scroll (parallax)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Profundidad al mover el ratón (solo escritorio)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const imageX = useSpring(pointerX, { stiffness: 40, damping: 20 });
  const imageShiftY = useSpring(pointerY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      pointerX.set(x * -18);
      pointerY.set(y * -12);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointerX, pointerY]);

  const item = fadeUp(28);

  return (
    <section
      ref={ref}
      className="relative flex h-svh min-h-[560px] w-full items-center justify-center overflow-hidden"
    >
      {/* Fotografía de fondo con profundidad */}
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <motion.div
          className="absolute -inset-[4%]"
          style={{ x: imageX, y: imageShiftY }}
          initial={{ scale: 1.14, opacity: 0 }}
          animate={{ scale: 1.04, opacity: 1 }}
          transition={{ duration: 3.2, ease: EASE_SOFT }}
        >
          {imageFailed ? (
            <div className="hero-fallback absolute inset-0" />
          ) : (
            <Image
              src={siteConfig.heroImage}
              alt={siteConfig.heroImageAlt}
              fill
              priority
              quality={90}
              sizes="100vw"
              className="hero-image-bw object-cover object-center"
              onError={() => setImageFailed(true)}
            />
          )}
        </motion.div>
        {/* Velo oscuro para que el texto destaque */}
        <div className="hero-overlay absolute inset-0" />
      </motion.div>

      {/* Texto central */}
      <motion.div
        className="relative z-10 mx-auto w-full max-w-2xl px-6 text-center"
        style={{ y: textY, opacity: textOpacity }}
        variants={staggerContainer(0.25, 0.6)}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={item}
          className="mb-5 uppercase"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.72rem",
            letterSpacing: "0.32em",
            color: "rgba(200,184,154,0.85)",
          }}
        >
          {siteConfig.dateLong}
        </motion.p>

        <motion.p
          variants={item}
          className="mb-4 italic"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.05rem, 2.6vw, 1.35rem)",
            fontWeight: 300,
            color: "rgba(245,240,235,0.72)",
            letterSpacing: "0.04em",
          }}
        >
          Hoy es un día especial...
        </motion.p>

        <motion.h1
          variants={item}
          className="mb-7"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(3rem, 11vw, 6.75rem)",
            fontWeight: 300,
            color: "#f5f0eb",
            lineHeight: 1.02,
            letterSpacing: "-0.015em",
          }}
        >
          Feliz cumpleaños.
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mb-11 max-w-[30rem] italic"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.02rem, 2.2vw, 1.2rem)",
            fontWeight: 300,
            color: "rgba(245,240,235,0.66)",
            lineHeight: 1.75,
          }}
        >
          Hay personas que, aunque el tiempo pase, siempre tendrán un lugar
          especial en nuestra historia.
        </motion.p>

        <motion.div variants={item}>
          <button
            type="button"
            onClick={onOpenLetter}
            data-cursor="hover"
            className="group relative inline-flex min-h-[52px] items-center justify-center overflow-hidden px-10 uppercase transition-[transform,box-shadow] duration-500 hover:scale-[1.03] hover:shadow-[0_10px_40px_rgba(200,184,154,0.25)] active:scale-[0.98]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.24em",
              color: "#14110e",
              background: "#c8b89a",
            }}
          >
            <span className="relative z-10">Hay algo para ti</span>
            {/* Brillo sutil al pasar el cursor */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -left-full w-full transition-transform duration-1000 ease-out group-hover:translate-x-[200%]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
              }}
            />
          </button>
        </motion.div>
      </motion.div>

      {/* Indicador de desplazamiento */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4, duration: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
          style={{
            width: 1,
            height: 40,
            background:
              "linear-gradient(to bottom, rgba(200,184,154,0.6), transparent)",
          }}
        />
      </motion.div>
    </section>
  );
}
