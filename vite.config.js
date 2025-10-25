import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "./",
  build: {
    outDir: "dist",
    sourcemap: false,
  },

  plugins: [vue()],
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
