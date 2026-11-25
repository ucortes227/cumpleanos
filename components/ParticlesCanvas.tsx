"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  fade: number;
}

/** Partículas luminosas muy discretas que flotan lentamente */
export default function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    const particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const create = (anywhere = true): Particle => ({
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : height + 8,
      size: Math.random() * 1.4 + 0.3,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: -(Math.random() * 0.22 + 0.04),
      opacity: Math.random() * 0.45 + 0.08,
      fade: Math.random() > 0.5 ? 1 : -1,
    });

    resize();
    // Menos partículas en pantallas pequeñas
    const count = reduceMotion ? 0 : width < 640 ? 24 : 42;
    for (let i = 0; i < count; i++) particles.push(create());

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.fade * 0.0025;
        if (p.opacity > 0.6 || p.opacity < 0.05) p.fade *= -1;

        if (p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles[i] = create(false);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(222, 205, 175, ${p.opacity})`;
        ctx.shadowColor = "rgba(222, 205, 175, 0.6)";
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    if (count > 0) raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} id="particles-canvas" aria-hidden="true" />;
}
