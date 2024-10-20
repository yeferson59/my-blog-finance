// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel/serverless";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    mdx(),
  ],
  security: {
    checkOrigin: true,
  },
  output: "server",
  adapter: vercel({
    webAnalytics: { enabled: true },
    maxDuration: 8,
    edgeMiddleware: true,
    isr: {
      // almacena todas las páginas en la primera solicitud y las guarda por 1 día
      expiration: 60 * 60 * 24,
    },
  }),
  vite: {
    build: {
      rollupOptions: {
        external: ["tslib"],
      },
    },
  },
});
