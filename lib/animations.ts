import type { Variants } from "framer-motion";

/** Curva de animación suave y elegante usada en toda la página */
export const EASE_SOFT = [0.22, 1, 0.36, 1] as const;

/** Contenedor que revela sus hijos uno tras otro */
export const staggerContainer = (stagger = 0.2, delay = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
});

/** Aparición gradual con un leve desplazamiento hacia arriba */
export const fadeUp = (distance = 24, duration = 1.1): Variants => ({
  hidden: { opacity: 0, y: distance, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration, ease: EASE_SOFT },
  },
});

/** Fondo oscuro detrás de la carta */
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.5, ease: "easeIn", delay: 0.1 } },
};

/** Apertura de la carta: se despliega como una hoja que se levanta */
export const letterVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.94, rotateX: 14 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: { duration: 1, ease: EASE_SOFT, delay: 0.15 },
  },
  exit: {
    opacity: 0,
    y: 24,
    scale: 0.96,
    transition: { duration: 0.45, ease: "easeIn" },
  },
};
