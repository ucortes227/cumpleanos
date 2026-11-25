import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tailwind CSS v4 se procesa con el loader oficial para Turbopack
  // (el paquete @tailwindcss/turbopack ya está en devDependencies).
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Calidades permitidas para <Image quality={...} />
    qualities: [75, 90],
  },
};

export default nextConfig;
