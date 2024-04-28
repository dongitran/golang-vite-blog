import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dotenv from "dotenv";
import { VitePluginRadar } from "vite-plugin-radar";

dotenv.config();
installGlobals();

export default defineConfig({
  plugins: [
    remix(),
    tsconfigPaths(),
    VitePluginRadar({
      /**
       * enable or disable scripts injection in development
       * default: false
       */
      enableDev: true,

      // Google Analytics (multiple tag can be set with an array)
      analytics: [
        {
          id: "G-GPVG26MR6B",
        },
        // You can add as many measurement id as you need
        {
          id: "UA-YYYYY",
        },
      ],
    }),
  ],
});
