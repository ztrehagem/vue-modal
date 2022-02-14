import * as path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve("src"),

  publicDir: path.resolve("public"),

  build: {
    outDir: path.resolve("dist"),
    emptyOutDir: true,

    lib: {
      entry: path.resolve("src/lib/main.ts"),
      formats: ["es", "cjs"],
    },

    rollupOptions: {
      external: ["vue"],
    },
  },

  plugins: [vue()],
});
