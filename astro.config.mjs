// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import WEBSITE_DATA from "./src/utils/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

export default defineConfig({
  integrations: [react()],

  site: WEBSITE_DATA.siteUrl,

  security: {
    checkOrigin: true,
  },

  output: "server",

  adapter: node({
    mode: "standalone",
  }),

  vite: {
    plugins: [tailwindcss()],
    server: {
      host: true,
      allowedHosts: [
        "my-blog-frontend-dpl-dkr-kdihuc352bx-4b9lgacb1z.155.133.22.54.sslip.io",
      ],
    },
  },
});
