# website — transpiralabs.com

Public marketing site for Transpira Labs. Positions the product as **Manifest**, the team of AI agents for freight brokers ("Win and manage 10× the loads. Same team." A human approves every send). The nav has three tabs from the Claude Design mock: **Walkthrough** (`/`, a scroll story with the animated "chaos" desktop and an interactive load thread), **Pricing** (`/pricing`), and **Company** (`/company`, a hub that links to research, about, environments, the demo, and contact). Under Company: about, environments, case studies (index + SC-bench, benchception, Build, and a GPT-OSS-120B fine-tuning study), contact, privacy.

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
- `src/components/site-chrome.tsx` — nav (sticky, with a hamburger sheet under `md`), footer, page primitives (`PageIntro`, `LinkCard`, `BTN_PRIMARY`/`BTN_GHOST`), and the deployment map for sibling apps: `DEMO_URL` (demo.transpiralabs.com), `PLATFORM_URL` (platform.transpiralabs.com), `BUILD_URL` (build.transpiralabs.com), `CONTACT_EMAIL`, `CAL_URL`.
- `src/styles.css` — the Manifest palette as Tailwind theme colors (`forest`, `mint`, `gold`, `clay`, `paper`, `ink`, `fog`…), the walkthrough keyframes, and the phone breakpoints for the chaos board (`--chaos-ar`, `--win-min`, `--dash-ar`). The page is dark; `bg-paper text-ink` sections flip to light. System fonts only (no webfont request).
- Mobile matters: every page is laid out for a 390px viewport (phone menu, horizontally scrolling suggestion chips, taller chaos board). Check both widths when touching layout.
- `src/assets/` — logos and product screenshots lifted from the `build` and `demo` repos. `manifest-dashboard.png` is the dashboard shot on the walkthrough; `transpira-logo.png` (the teal hexagon-star mark) is still the favicon.
- `src/lib/` — error capture/reporting (Lovable), `config.server.ts` (server env pattern with Cloudflare gotcha notes).

## Sibling repos

- Links out to `../demo`, `../platform`, `../build` deployments; screenshots come from those apps' UIs.
- Case studies cover `../SC-bench`, `../benchception`, and `../build`.
- The Transpira design tokens here are the reference for the design system shared with `../platform`, `../build`, `../manifest`, `../warehouse`.
- `../dashboard` lists this site and every other deployed subdomain.
