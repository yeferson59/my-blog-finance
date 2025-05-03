// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import WEBSITE_DATA from "./src/utils/config";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";

export default defineConfig({
  integrations: [react()],
  site: WEBSITE_DATA.siteUrl,
  output: "server",
  adapter: netlify({
    imageCDN: false,
    cacheOnDemandPages: true,
  }),
  vite: {
    plugins: [tailwindcss()],
  },
});
