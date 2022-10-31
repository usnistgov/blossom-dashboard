import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";

// for deployments that are deployed to a sub-folder like /dev, specify below or use the `BASE_URL` env var
const DEFAULT_BASE_URL = "/";
// to proxy transaction api requests on a different domain, specify below or use the `PROXY_URL` env var
const DEFAULT_PROXY_URL = "https://719hgl5ejk.execute-api.us-east-1.amazonaws.com/dev";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), tsconfigPaths()],
  base: process.env.BASE_URL ?? DEFAULT_BASE_URL,
  server: {
    proxy: {
      "/transaction": {
        target: process.env.PROXY_URL ?? DEFAULT_PROXY_URL,
        // Fixes SSL error on some requests
        changeOrigin: true
      }
    }
  }
});
