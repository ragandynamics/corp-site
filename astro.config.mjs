import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  output: "static", // Prerenders HTML pages by default

  adapter: cloudflare({
    imageService: "compile",
  }),

  vite: {
    plugins: [
      tailwindcss()
    ]
  }
});