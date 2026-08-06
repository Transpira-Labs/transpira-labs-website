# website — transpiralabs.com

Public marketing site for Transpira Labs. Positions the product as **Manifest** ("one permissions-aware index across all of your supply-chain systems; plain-language questions, answers cited to the source record"). Pages: home, about, environments, case studies (index + SC-bench, benchception, Build, and a GPT-OSS-120B fine-tuning study), contact, privacy.

## Commands

```bash
npm run dev        # vite dev (bun also works — bun.lock present)
npm run build      # vite build (build:dev for development mode)
npm run preview
npm run lint && npm run format
```

No test script, no env vars (`src/lib/config.server.ts` is a documented placeholder). Deploys to Vercel via Nitro — `vite.config.ts` forces `nitro: { preset: "vercel" }` (the Lovable sandbox overrides back to Cloudflare; read that file's comments before touching plugins).

## Architecture

- **TanStack Start / TanStack Router** (file-based routing) + React 19 + Vite 7 + Tailwind v4 + shadcn/ui, built from a **Lovable** template. **Read `src/routes/README.md` before adding pages** — route-file conventions, and never edit `src/routeTree.gen.ts` (generated) or create `src/pages/`.
- `src/components/site-chrome.tsx` — nav/footer and the deployment map for sibling apps: `DEMO_URL` (demo.transpiralabs.com), `PLATFORM_URL` (platform.transpiralabs.com), `BUILD_URL` (build.transpiralabs.com), `CONTACT_EMAIL`.
- `src/assets/` — logos and product screenshots lifted from the `build` and `demo` repos. Note the site logo asset is still `classhopper.jpeg` (the pre-rename org name).
- `src/lib/` — error capture/reporting (Lovable), `config.server.ts` (server env pattern with Cloudflare gotcha notes).

## Sibling repos

- Links out to `../demo`, `../platform`, `../build` deployments; screenshots come from those apps' UIs.
- Case studies cover `../SC-bench`, `../benchception`, and `../build`.
- The Transpira design tokens here are the reference for the design system shared with `../platform`, `../build`, `../manifest`, `../warehouse`.
- `../dashboard` lists this site and every other deployed subdomain.
