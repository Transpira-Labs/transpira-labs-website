import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import {
  SiteNav,
  SolidBackground,
  SiteFooter,
  Reveal,
  PLATFORM_URL,
  BUILD_URL,
  CONTACT_EMAIL,
} from "@/components/site-chrome";
import supplyFloor from "@/assets/supply-floor.jpg";
import buildCanvas from "@/assets/build-canvas.png";
import buildRunTrain from "@/assets/build-run-train.png";
import buildDashboard from "@/assets/build-dashboard.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Transpira — Reinforcement Learning for the Supply Chain" },
      { name: "description", content: "Transpira is an AI research lab building hyper-realistic reinforcement-learning environments and benchmarks that train and evaluate agents on real operational work, with a focus on the supply chain." },
      { property: "og:title", content: "Transpira — Reinforcement Learning for the Supply Chain" },
      { property: "og:description", content: "An AI research lab building reinforcement-learning environments for supply-chain and operations agents." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

/* The signature: a three-tier supply network (Trade → Fulfillment → Warehouse),
   with orders flowing along the routes — the world our environments simulate. */
function SupplyNetwork() {
  const L = [
    { x: 64, y: 72 },
    { x: 64, y: 190 },
    { x: 64, y: 308 },
  ];
  const M = [
    { x: 230, y: 131 },
    { x: 230, y: 249 },
  ];
  const R = [
    { x: 396, y: 72 },
    { x: 396, y: 190 },
    { x: 396, y: 308 },
  ];
  const edges: [{ x: number; y: number }, { x: number; y: number }][] = [
    [L[0], M[0]], [L[1], M[0]], [L[1], M[1]], [L[2], M[1]],
    [M[0], R[0]], [M[0], R[1]], [M[1], R[1]], [M[1], R[2]],
  ];
  const d = (a: { x: number; y: number }, b: { x: number; y: number }) => `M${a.x} ${a.y} L${b.x} ${b.y}`;

  return (
    <svg viewBox="0 0 460 380" className="w-full h-auto" role="img" aria-label="A three-tier supply-chain network: trade, fulfillment, and warehouse nodes connected by order flows.">
      {edges.map((e, i) => (
        <path key={`b${i}`} className="net-edge" d={d(e[0], e[1])} />
      ))}
      {edges.map((e, i) => (
        <path key={`f${i}`} className="net-flow" d={d(e[0], e[1])} style={{ animationDelay: `${-i * 0.19}s` }} />
      ))}

      {M.map((n, i) => (
        <g key={`m${i}`}>
          <circle className="net-halo" cx={n.x} cy={n.y} r="9" style={{ animationDelay: `${i * 0.9}s` }} />
          <circle className="net-node-live" cx={n.x} cy={n.y} r="5" />
        </g>
      ))}
      {[...L, ...R].map((n, i) => (
        <circle key={`o${i}`} className="net-node" cx={n.x} cy={n.y} r="5" />
      ))}

      <text className="net-label" x="64" y="352" textAnchor="middle">TRADE</text>
      <text className="net-label" x="230" y="352" textAnchor="middle">FULFILLMENT</text>
      <text className="net-label" x="396" y="352" textAnchor="middle">WAREHOUSE</text>
    </svg>
  );
}

/* The dark hero fills the screen; the light page below flips in beneath it. */
function HeroScreen() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[var(--hero)]">
      {/* Cinematic supply-floor backdrop. */}
      <div className="absolute inset-0 z-0">
        <img src={supplyFloor} alt="" className="w-full h-full object-cover object-center" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--hero) 0%, color-mix(in oklch, var(--hero) 80%, transparent) 46%, color-mix(in oklch, var(--hero) 22%, transparent) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklch, var(--hero) 55%, transparent) 0%, transparent 28%, transparent 64%, color-mix(in oklch, var(--hero) 70%, transparent) 100%)",
          }}
        />
      </div>

      {/* Headline block, vertically centered in the remaining space. */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto max-w-6xl px-6 w-full pt-16">
          <div className="max-w-2xl">
            <h1
              className="rise font-display text-[clamp(2.4rem,5.6vw,4.5rem)] leading-[1.03] tracking-tight text-white text-balance"
              style={{ "--rise-delay": "80ms" } as CSSProperties}
            >
              Reinforcement learning for the supply chain.
            </h1>
            <p
              className="rise mt-6 max-w-xl text-lg text-white/70 leading-relaxed"
              style={{ "--rise-delay": "200ms" } as CSSProperties}
            >
              Transpira builds hyper-realistic environments and benchmarks that train and evaluate AI agents on real
              operational work — from three-tier logistics networks to production systems. Already delivered to frontier
              labs.
            </p>
            <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ "--rise-delay": "300ms" } as CSSProperties}>
              <Link
                to="/case-studies"
                className="rounded-full px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Read the research
              </Link>
              <a
                href={PLATFORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-5 py-2.5 border border-white/25 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Explore the platform →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Screenshot placeholder with browser chrome. Drop a real screenshot in by
   replacing the inner placeholder <div> with an <img>:
     import platformLibrary from "@/assets/platform-library.png";
     <ImageFrame url="platform.transpiralabs.com" label="Benchmark library">
       <img src={platformLibrary} alt="Benchmark library" className="block w-full" />
     </ImageFrame>
   When children are present, the placeholder is hidden automatically. */
function ImageFrame({
  url,
  label,
  children,
}: {
  url: string;
  label: string;
  children?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card soft-shadow">
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-foreground/12" />
        <span className="size-2.5 rounded-full bg-foreground/12" />
        <span className="size-2.5 rounded-full bg-foreground/12" />
        <span className="ml-3 truncate font-mono text-[0.65rem] text-muted-foreground">{url}</span>
      </div>
      {children ?? (
        <div
          className="relative grid aspect-[16/10] place-items-center bg-secondary"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.225 0.013 262 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(0.225 0.013 262 / 0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        >
          <div className="text-center">
            <div className="mx-auto mb-3 grid size-11 place-items-center rounded-xl border border-dashed border-input text-muted-foreground">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
                <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
                <path d="M4 17l5-5 4 4 3-3 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
            <div className="mt-1 text-[0.7rem] text-muted-foreground/70">Screenshot coming soon</div>
          </div>
        </div>
      )}
    </div>
  );
}

function FeatureRow({
  flip,
  kicker,
  title,
  body,
  imgUrl,
  imgLabel,
  img,
}: {
  flip?: boolean;
  kicker: string;
  title: string;
  body: string;
  imgUrl: string;
  imgLabel: string;
  img?: string;
}) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-14">
      <Reveal className={flip ? "md:order-2" : undefined}>
        <ImageFrame url={imgUrl} label={imgLabel}>
          {img ? <img src={img} alt={imgLabel} className="block w-full" /> : undefined}
        </ImageFrame>
      </Reveal>
      <Reveal delay={100} className={flip ? "md:order-1" : undefined}>
        <div className="eyebrow">{kicker}</div>
        <h4 className="mt-3 font-display text-[clamp(1.3rem,2.2vw,1.65rem)] tracking-tight text-foreground">{title}</h4>
        <p className="mt-3 text-muted-foreground leading-relaxed">{body}</p>
      </Reveal>
    </div>
  );
}

function Efforts() {
  const efforts = [
    {
      name: "Platform",
      href: PLATFORM_URL,
      tag: "platform.transpiralabs.com",
      intro:
        "Where we author, evaluate, and quality-check every benchmark task — running them against frontier models and reviewing every trace by hand before it ships.",
      features: [
        {
          kicker: "Pipeline & analytics",
          title: "Track every task from draft to done.",
          body: "Watch work move through the pipeline — created, evaluated against Sonnet and Opus, reviewed, completed — with per-model scores, run status, and spend in one view.",
          imgLabel: "Pipeline analytics",
          img: buildDashboard,
        },
      ],
    },
    {
      name: "Build",
      href: BUILD_URL,
      tag: "build.transpiralabs.com",
      intro:
        "An experiment in composing reinforcement-learning environments from blocks. Describe each step in plain language, then build, run, and test it — no code.",
      features: [
        {
          kicker: "Block canvas",
          title: "Compose an environment from blocks.",
          body: "Lay out an environment as a chain of blocks — a tool, a check, a branch — each described in plain language and wired to the next. No engineering required.",
          imgLabel: "Block canvas",
          img: buildCanvas,
        },
        {
          kicker: "Live run",
          title: "Run, test, and tune in place.",
          body: "Send an agent through the environment you composed and watch it resolve, retry, and recover in real time — then adjust the reward signal and run it again.",
          imgLabel: "Live run",
          img: buildRunTrain,
        },
      ],
    },
  ];

  return (
    <section className="relative px-6 py-24 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="eyebrow">Research Efforts</div>
          <h2 className="mt-4 font-display text-[clamp(1.85rem,3.4vw,2.75rem)] tracking-tight text-foreground max-w-2xl">
            How we build and study these environments.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20">
          {efforts.map((p) => (
            <div key={p.name}>
              <Reveal>
                <div className="flex flex-col gap-5 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
                  <div className="max-w-2xl">
                    <h3 className="font-display text-[clamp(1.55rem,2.8vw,2.1rem)] tracking-tight text-foreground">{p.name}</h3>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{p.intro}</p>
                  </div>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-secondary md:self-auto"
                  >
                    <span className="font-mono text-xs text-foreground/70 group-hover:text-foreground">{p.tag}</span>
                    <svg viewBox="0 0 16 16" className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" fill="none" aria-hidden="true">
                      <path d="M5 11 L11 5 M6 5 H11 V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
              </Reveal>

              <div className="mt-12 space-y-14">
                {p.features.map((f, i) => (
                  <FeatureRow
                    key={f.kicker}
                    flip={i % 2 === 1}
                    kicker={f.kicker}
                    title={f.title}
                    body={f.body}
                    imgUrl={p.tag}
                    imgLabel={f.imgLabel}
                    img={f.img}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Focus() {
  return (
    <section className="relative px-6 py-24 border-t border-border">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal>
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-9 soft-shadow">
            <div className="flex items-center justify-between mb-5">
              <span className="eyebrow">Order flow · live</span>
              <span className="font-mono text-[0.7rem] text-muted-foreground">3-tier</span>
            </div>
            <SupplyNetwork />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="eyebrow">Focus — Supply Chain</div>
          <h2 className="mt-4 font-display text-[clamp(1.85rem,3.4vw,2.75rem)] tracking-tight text-foreground leading-[1.1]">
            The supply chain is where reasoning gets real.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Real operations run on multi-tier networks — trade, fulfillment, warehouse — where one decision depends on
            the state of dozens of others. To act, an agent has to call the right tools, chain them under conditional
            logic, and recover from cancellations and errors.
          </p>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg text-foreground">SupChain-Bench Verified</h3>
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-accent">Research Effort</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Building on the SupChain-Bench supply-chain benchmark, we hand-verified a set of 44 tasks confirmed to be
              reasonably solvable by an agent — a cleaner signal for training and evaluation.
            </p>
            <div className="mt-5 flex items-center gap-6">
              {[
                { v: "44", l: "Tasks" },
                { v: "By hand", l: "Verified" },
                { v: "3-tier", l: "Network" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-lg text-foreground">{s.v}</div>
                  <div className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-accent" />
              Case study coming soon
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative px-6 py-28 border-t border-border">
      <Reveal>
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <h2 className="font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] tracking-tight text-foreground text-balance max-w-2xl">
            Training agents for real-world operations?
          </h2>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="rounded-full px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get in touch
            </a>
            <Link
              to="/case-studies"
              className="rounded-full px-6 py-3 border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              See our work
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Index() {
  return (
    <>
      <SolidBackground />
      <SiteNav />
      <main className="relative z-10">
        <HeroScreen />
        <Efforts />
        <Focus />
        <CTA />
        <SiteFooter />
      </main>
    </>
  );
}
