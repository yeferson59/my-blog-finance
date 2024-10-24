/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    session: import("lucia").Session | null;
    user: import("lucia").User | null;
  }
}

interface ImportMetaEnv {
  readonly STRAPI_URL: string;
}
