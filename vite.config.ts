import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import tsconfigPaths from "vite-tsconfig-paths";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ mode }) => {
  // load env vars defined in `.env.development`
  // (vite does this by default after this is called, but we need PROXY_URL)
  // see https://stackoverflow.com/a/66389044
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };

  // for deployments that are deployed to a sub-folder like /dev, specify below or use the `BASE_URL` env var
  const DEFAULT_BASE_URL = "/";

  // https://vitejs.dev/config/
  return defineConfig({
    plugins: [react(), eslint(), tsconfigPaths()],
    base: process.env.BASE_URL ?? DEFAULT_BASE_URL,
    server: {
      proxy: {
        "/transaction": {
          target: process.env.PROXY_URL,
          // Fixes SSL error on some requests
          changeOrigin: true,
        },
      },
    },
  });
};
