import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,
  },
  resolve: {
    alias: {
      "@bootstrap": "bootstrap/dist/css",
      "@fontawesome": "@fortawesome/fontawesome-free/css",
      "@slick": "slick-carousel/slick",
      "@animate": "animate",
    },
  },
});
