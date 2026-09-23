// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Force-enable the Nitro deploy plugin outside the Lovable sandbox (e.g. on
  // Vercel's build machines) and target Vercel's Build Output API. Without an
  // explicit `nitro` option the wrapper skips Nitro entirely off-platform, which
  // would produce no deployable server output. Inside the Lovable sandbox the
  // wrapper still overrides this back to the Cloudflare preset.
  // Cloud Run needs a self-contained Node server (.output/server/index.mjs);
  // Vercel needs its Build Output API layout. The container build sets
  // DOCKER_BUILD, so both targets keep working from one config and Vercel
  // stays available as the rollback.
  nitro: {
    preset: process.env.DOCKER_BUILD ? "node-server" : "vercel",
    // PostHog goes through this origin rather than straight to posthog.com,
    // which keeps ad blockers from dropping it - the same trick the quoting
    // app plays with a Next rewrite, under the same path, so the two sites
    // are debugged the same way. The path is deliberately not called
    // anything like /analytics.
    //
    // Assets and ingest are different hosts and the specific rule has to come
    // first; a single /sap/** rule would send the recorder script to the
    // ingest host, which does not serve it.
    //
    // Build-time only. Under `vite dev` these rules do not exist, which is
    // one of the reasons the client skips localhost entirely.
    routeRules: {
      "/sap/static/**": { proxy: "https://us-assets.i.posthog.com/static/**" },
      "/sap/array/**": { proxy: "https://us-assets.i.posthog.com/array/**" },
      "/sap/**": { proxy: "https://us.i.posthog.com/**" },
    },
  },
});
