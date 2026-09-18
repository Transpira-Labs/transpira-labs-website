# Transpira Labs — website

The public marketing site at [transpiralabs.com](https://transpiralabs.com). Presents Transpira's product **Manifest**, the team of AI agents for freight brokers: a scroll-through walkthrough with an interactive load thread, plus Pricing and a Company hub that links to the about page, the environments page (Platform + Build), and written case studies (SC-bench, Benchception, Build, GPT-OSS-120B fine-tuning). Designed for phones as much as desktops.

## Stack

TypeScript + React 19 · [TanStack Start](https://tanstack.com/start) with file-based TanStack Router · Vite 7 · Tailwind CSS v4 · shadcn/ui. Started from a Lovable template; deploys to **Vercel** via Nitro (`vite.config.ts` pins `nitro: { preset: "vercel" }`).

## Run it

```bash
npm install        # or bun install
npm run dev        # vite dev server
npm run build      # production build
npm run preview
npm run lint
npm run format     # prettier
```

No environment variables are required.

## Working on it

- **Routing**: file-based under `src/routes/` — read [`src/routes/README.md`](src/routes/README.md) for the conventions. `src/routeTree.gen.ts` is generated; never edit it by hand, and don't create `src/pages/` or `app/layout.tsx`.
- `src/components/site-chrome.tsx` holds the nav/footer and the URLs of the deployed sibling apps (demo/platform/build subdomains) — update there when a deployment moves.
- `src/lib/config.server.ts` documents the pattern for server-side env vars if any are ever needed.
- `vite.config.ts` has load-bearing comments about the Lovable wrapper and the Vercel preset — read them before changing plugins.
