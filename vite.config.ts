import * as path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const lib = command == "build" && mode == "lib";

  return {
    root: path.resolve("src"),

    publicDir: path.resolve("public"),

    build: {
      outDir: path.resolve(lib ? "dist" : "site"),
      emptyOutDir: true,

      lib: lib
        ? {
            entry: path.resolve("src/lib/main.ts"),
            formats: ["es", "cjs"],
          }
        : false,

      rollupOptions: {
        external: lib ? ["vue"] : [],
      },
    },

    plugins: [vue()],
  };
});
