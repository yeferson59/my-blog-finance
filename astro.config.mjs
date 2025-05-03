// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
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
  },
});