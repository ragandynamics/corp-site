import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://ragandynamics.com",

  output: "server", // Allows server execution for API routes + static prerendering

  integrations: [sitemap()],

  adapter: cloudflare({
    imageService: "compile",
    sessionKVBindingName: undefined,
  }),

  vite: {
    plugins: [
      tailwindcss()
    ]
  }
});

