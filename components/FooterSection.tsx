"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/config";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function FooterSection() {
  return (
    <motion.footer
      variants={staggerContainer(0.3)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="relative z-10 flex flex-col items-center justify-center px-6 pb-24 pt-20 text-center sm:pb-32 sm:pt-28"
    >
      {/* Línea ornamental */}
      <motion.div
        variants={fadeUp(0, 1.4)}
        aria-hidden="true"
        className="mb-14"
        style={{
          width: 1,
          height: 64,
          background:
            "linear-gradient(to bottom, transparent, rgba(200,184,154,0.5), transparent)",
        }}
      />

      <motion.p
        variants={fadeUp(20, 1.3)}
        className="mx-auto mb-12 max-w-[34rem] text-balance italic"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.25rem, 3.4vw, 1.75rem)",
          fontWeight: 300,
          color: "rgba(245,240,235,0.78)",
          lineHeight: 1.65,
        }}
      >
        Que este nuevo año de vida te regale todo aquello que tu corazón merece.
      </motion.p>

      <motion.p
        variants={fadeUp(12, 1)}
        className="uppercase"
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.7rem",
          letterSpacing: "0.34em",
          color: "rgba(200,184,154,0.6)",
        }}
      >
        {siteConfig.dateShort}
      </motion.p>

      <motion.div
        variants={fadeUp(0, 1)}
        aria-hidden="true"
        className="mt-16"
        style={{
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "rgba(200,184,154,0.4)",
        }}
      />
    </motion.footer>
  );
}
