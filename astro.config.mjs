// astro.config.mjs
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import WEBSITE_DATA from "./src/utils/config";
import tailwindcss from "@tailwindcss/vite";
import node from "@astrojs/node";

export default defineConfig({
  integrations: [react()],

  site: WEBSITE_DATA.siteUrl,

  output: "server",

  adapter: node({
    mode: "standalone",
  }),

  vite: {
    plugins: [tailwindcss()],
    server: {
      allowedHosts: ["my-blog-frontend-sunt1c6ktw.155.133.22.54.sslip.io"],
    },
  },
});
