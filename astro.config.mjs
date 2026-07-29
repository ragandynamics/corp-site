import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "server", // Allows server execution for API routes + static prerendering

  adapter: cloudflare({
    imageService: "compile",
  }),

  vite: {
    plugins: [
      tailwindcss()
    ]
  }
});