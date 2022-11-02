import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";

// for deployments that are deployed to a sub-folder like /dev, specify below or use the `BASE_URL` env var
const DEFAULT_BASE_URL = "/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), tsconfigPaths()],
  base: process.env.BASE_URL ?? DEFAULT_BASE_URL,
  server: {
    proxy: {
      "/transaction": {
        target: process.env.PROXY_URL,
        // Fixes SSL error on some requests
        changeOrigin: true
      }
    }
  }
});
