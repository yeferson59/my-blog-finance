// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import vercel from '@astrojs/vercel/serverless';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false,
  }), react(), mdx()],
  security: {
    checkOrigin: true
  },
  output: 'server',
  adapter: vercel()
});