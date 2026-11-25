"use client";

import { motion } from "framer-motion";
import type { Ornamento } from "@/content/carta";

/** Pequeño detalle visual bajo la firma: estrella o corazón de trazo fino */
export default function Ornament({ type }: { type: Ornamento }) {
  const stroke = "rgba(160,130,100,0.6)";

  const path =
    type === "corazon"
      ? // Corazón minimalista de un solo trazo
        "M12 20.5C12 20.5 3 14.8 3 8.6C3 5.5 5.4 3.2 8.2 3.2C9.9 3.2 11.3 4.1 12 5.4C12.7 4.1 14.1 3.2 15.8 3.2C18.6 3.2 21 5.5 21 8.6C21 14.8 12 20.5 12 20.5Z"
      : // Estrella de cuatro puntas, fina y luminosa
        "M12 2.5C12.6 8.2 15.8 11.4 21.5 12C15.8 12.6 12.6 15.8 12 21.5C11.4 15.8 8.2 12.6 2.5 12C8.2 11.4 11.4 8.2 12 2.5Z";

  return (
    <motion.svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      animate={{ opacity: [0.65, 1, 0.65], scale: [1, 1.06, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <motion.path
        d={path}
        stroke={stroke}
        strokeWidth={0.9}
        strokeLinejoin="round"
        fill="rgba(200,184,154,0.12)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.2, ease: "easeInOut", delay: 0.4 }}
      />
    </motion.svg>
  );
}
