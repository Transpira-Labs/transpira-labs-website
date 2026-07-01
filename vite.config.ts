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
  nitro: { preset: "vercel" },
});
