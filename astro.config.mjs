// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import netlify from "@astrojs/netlify";
import WEBSITE_DATA from "./src/utils/config";

export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  site: WEBSITE_DATA.siteUrl,
  security: {
    checkOrigin: true,
  },
  output: "server",
  adapter: netlify({
    imageCDN: false,
    cacheOnDemandPages: true,
  }),
});
