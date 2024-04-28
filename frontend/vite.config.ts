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
          /**
           * Measurement id
           */
          id: "G-GPVG26MR6B",

          /**
           * disable tracking for this measurement
           *   window['ga-disable-MEASUREMENT_ID'] = true
           * @see https://developers.google.com/analytics/devguides/collection/ga4/disable-analytics
           */
          disable: true,

          /**
           * You can configure all settings provided by analytics here
           * @see https://developers.google.com/analytics/devguides/collection/ga4/cookies-user-id
           * @see https://developers.google.com/analytics/devguides/collection/ga4/disable-page-view
           * @see https://developers.google.com/analytics/devguides/collection/ga4/display-features
           */
          config: {
            cookie_domain: "auto",
            cookie_expires: 63072000,
            cookie_prefix: "none",
            cookie_update: true,
            cookie_flags: "",
            send_page_view: true,
            allow_google_signals: true,
            allow_ad_personalization_signals: true,
          },

          /**
           * Set default values for "consent mode"
           * @see https://developers.google.com/tag-platform/devguides/consent
           * @see https://support.google.com/analytics/answer/9976101
           */
          consentDefaults: {
            analytics_storage: "granted",
            ad_storage: "denied",
            wait_for_update: 500,
          },

          /**
           * You set persitent values
           * @see https://developers.google.com/analytics/devguides/collection/ga4/persistent-values
           */
          persistentValues: {
            currency: "USD",
          },
        },
        // You can add as many measurement id as you need
        {
          id: "UA-YYYYY",
        },
      ],
    }),
  ],
});
