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

  // https://vitejs.dev/config/
  return defineConfig({
    define: {
      __APP_BUILD_DATE_TIME__: JSON.stringify(new Date().toISOString()),
      __APP_BUILD_DATE__: JSON.stringify( (new Date().toISOString()).substring(0,10)),
      __APP_BUILD_TIME__: JSON.stringify(new Date().toISOString().substring(10)),
      __APP_VERSION__: JSON.stringify('v1.0.13'),
      __APP_APPLICATION_NAME__: JSON.stringify('BloSS🌻M'), //Bl⛓SS🌻M Bl🔗SS🌻M
    },
    plugins: [react(), eslint(), tsconfigPaths()],
    base: process.env.BASE_URL ?? "/",
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
