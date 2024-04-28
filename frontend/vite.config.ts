import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";
import { VitePluginRadar } from "vite-plugin-radar";
import ReactGA from "react-ga";
ReactGA.initialize("G-GPVG26MR6B");

dotenv.config();
installGlobals();

export default defineConfig({
  plugins: [remix(), tsconfigPaths()],
});
