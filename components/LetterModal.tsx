"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cartaContent } from "@/content/carta";
import { siteConfig } from "@/lib/config";
import {
  backdropVariants,
  fadeUp,
  letterVariants,
  staggerContainer,
} from "@/lib/animations";
import Ornament from "@/components/Ornament";

interface LetterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LetterModal({ isOpen, onClose }: LetterModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Bloquea el scroll de la página y enfoca el botón de cerrar
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      scrollRef.current?.scrollTo({ top: 0 });
      closeRef.current?.focus({ preventScroll: true });
    }, 120);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Cerrar con la tecla Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const line = fadeUp(14, 1);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="letter-root"
          className="fixed inset-0 z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          aria-label="Carta de cumpleaños"
        >
          {/* Fondo oscurecido (clic para cerrar) */}
          <motion.div
            variants={backdropVariants}
            onClick={onClose}
            className="absolute inset-0"
            style={{
              background: "rgba(6, 5, 4, 0.82)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
            }}
          />

          {/* Contenedor centrado */}
          <div
            className="pointer-events-none relative flex h-full w-full items-center justify-center p-3 sm:p-8"
            style={{ perspective: 1400 }}
          >
            <motion.article
              variants={letterVariants}
              className="letter-paper pointer-events-auto relative flex max-h-[min(88svh,860px)] w-full max-w-xl flex-col"
              style={{
                border: "1px solid rgba(200,184,154,0.35)",
                borderRadius: 2,
                boxShadow:
                  "0 30px 80px rgba(0,0,0,0.55), 0 2px 10px rgba(0,0,0,0.25)",
                transformOrigin: "50% 100%",
              }}
            >
              {/* Filete interior delicado */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-[7px]"
                style={{ border: "1px solid rgba(200,184,154,0.22)" }}
              />

              {/* Encabezado */}
              <header
                className="relative flex shrink-0 items-center justify-between px-6 pb-3 pt-5 sm:px-10 sm:pt-7"
                style={{ borderBottom: "1px solid rgba(200,184,154,0.2)" }}
              >
                <span
                  className="uppercase"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.28em",
                    color: "rgba(100,86,70,0.6)",
                  }}
                >
                  {siteConfig.dateShort}
                </span>

                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  data-cursor="hover"
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 hover:bg-[rgba(200,184,154,0.15)]"
                  style={{ color: "rgba(100,86,70,0.7)" }}
                  aria-label="Cerrar carta"
                >
                  <X size={17} strokeWidth={1.4} />
                </button>
              </header>

              {/* Contenido con scroll propio */}
              <div
                ref={scrollRef}
                className="letter-scroll relative min-h-0 flex-1 overflow-y-auto px-7 py-8 sm:px-12 sm:py-10"
              >
                <motion.div variants={staggerContainer(0.22, 0.9)}>
                  {cartaContent.titulo && (
                    <motion.h2
                      variants={line}
                      className="mb-8 text-center text-balance"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "clamp(1.8rem, 6vw, 2.4rem)",
                        fontWeight: 400,
                        color: "#2e251d",
                        lineHeight: 1.2,
                        letterSpacing: "-0.005em",
                      }}
                    >
                      {cartaContent.titulo}
                    </motion.h2>
                  )}

                  <motion.p
                    variants={line}
                    className="mb-6 italic"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.1rem, 2.6vw, 1.25rem)",
                      fontWeight: 500,
                      color: "#3a2f26",
                      lineHeight: 1.8,
                    }}
                  >
                    {cartaContent.saludo}
                  </motion.p>

                  {cartaContent.parrafos.map((parrafo, i) =>
                    cartaContent.destacado.includes(i) ? (
                      <motion.p
                        key={i}
                        variants={line}
                        className="my-8 text-center italic text-balance"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "clamp(1.25rem, 3vw, 1.4rem)",
                          fontWeight: 500,
                          color: "#3a2f26",
                          lineHeight: 1.6,
                        }}
                      >
                        {parrafo}
                      </motion.p>
                    ) : (
                      <motion.p
                        key={i}
                        variants={line}
                        className="mb-5 text-pretty"
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "clamp(1.05rem, 2.4vw, 1.15rem)",
                          fontWeight: 400,
                          color: "#4a3e34",
                          lineHeight: 1.85,
                        }}
                      >
                        {parrafo}
                      </motion.p>
                    )
                  )}

                  <motion.p
                    variants={line}
                    className="mb-10 mt-8 whitespace-pre-line italic"
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "clamp(1.1rem, 2.5vw, 1.22rem)",
                      fontWeight: 500,
                      color: "#3a2f26",
                      lineHeight: 1.7,
                    }}
                  >
                    {cartaContent.cierre}
                  </motion.p>

                  {/* Firma y detalle */}
                  <motion.div
                    variants={line}
                    className="flex flex-col items-center gap-4 pb-2 pt-7 text-center"
                    style={{ borderTop: "1px solid rgba(200,184,154,0.32)" }}
                  >
                    <p
                      className="whitespace-pre-line italic"
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.12rem",
                        fontWeight: 400,
                        color: "rgba(90,74,60,0.85)",
                        letterSpacing: "0.02em",
                        lineHeight: 1.6,
                      }}
                    >
                      {cartaContent.firma}
                    </p>
                    <Ornament type={cartaContent.ornamento} />
                  </motion.div>
                </motion.div>
              </div>
            </motion.article>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
