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
  CAL_URL,
} from "@/components/site-chrome";
import supplyFloor from "@/assets/supply-floor.jpg";
import buildCanvas from "@/assets/build-canvas.png";
import buildRunTrain from "@/assets/build-run-train.png";
import buildDashboard from "@/assets/build-dashboard.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Transpira: Reinforcement Learning for the Supply Chain" },
      { name: "description", content: "Transpira is an AI research lab building hyper-realistic reinforcement-learning environments and benchmarks that train and evaluate agents on real operational work, with a focus on the supply chain." },
      { property: "og:title", content: "Transpira: Reinforcement Learning for the Supply Chain" },
      { property: "og:description", content: "An AI research lab building reinforcement-learning environments for supply-chain and operations agents." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

/* Verified task counts per track in SupChain-Bench Verified (288 instances total). */
const TRACKS = [
  { label: "QA · reasoning", sub: "single / multiple / true-false", desc: "Answered from reasoning alone, no tools.", value: 217 },
  { label: "Tool · SOP", sub: "deterministic step-by-step", desc: "Tool use under a fixed workflow prompt.", value: 33 },
  { label: "Tool · No-SOP", sub: "minimal instruction", desc: "Tool use with no workflow given.", value: 19 },
  { label: "Tool · ReAct", sub: "think / act / observe", desc: "Tool use with reason-and-act prompting.", value: 19 },
];

/* A horizontal bar chart of verified tasks by track. One measure across tracks,
   so a single accent hue carries magnitude; the labels carry identity. */
function TrackChart() {
  const max = Math.max(...TRACKS.map((t) => t.value));
  return (
    <div className="flex flex-1 flex-col">
      {TRACKS.map((t) => (
        <div
          key={t.label}
          title={`${t.label}: ${t.value} verified`}
          className="flex flex-1 flex-col justify-center gap-2 border-t border-border/60 first:border-t-0"
        >
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[0.9rem] font-medium text-foreground">{t.label}</span>
            <span className="font-mono text-sm font-semibold tabular-nums text-foreground">{t.value}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-accent" style={{ width: `${(t.value / max) * 100}%` }} />
          </div>
          <div className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground/70">{t.sub}</div>
          <p className="text-[0.8rem] leading-snug text-muted-foreground">{t.desc}</p>
        </div>
      ))}
    </div>
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
              operational work, from three-tier logistics networks to production systems.
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
  title,
  body,
  imgUrl,
  imgLabel,
  img,
}: {
  flip?: boolean;
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
        <h4 className="font-display text-[clamp(1.3rem,2.2vw,1.65rem)] tracking-tight text-foreground">{title}</h4>
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
        "Where we author, evaluate, and quality-check every benchmark task, running each against frontier models and validating every trace before it ships.",
      features: [
        {
          kicker: "Pipeline & analytics",
          title: "Track every task from draft to done.",
          body: "Watch work move through the pipeline with per-model scores, run status, and spend in one view.",
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
        "An experiment in composing reinforcement-learning environments from blocks. Describe each step in plain language, then build, run, and test.",
      features: [
        {
          kicker: "Block canvas",
          title: "Compose an environment from blocks.",
          body: "Lay out an environment as a chain of blocks described in plain language and wired to the next. No code required.",
          imgLabel: "Block canvas",
          img: buildCanvas,
        },
        {
          kicker: "Live run",
          title: "Run, test, and tune in place.",
          body: "Send an agent through the environment you composed and watch it resolve, retry, and recover in real time. Then adjust the reward and run it again.",
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

        <div className="mt-16 divide-y divide-border">
          {efforts.map((p) => (
            <div key={p.name} className="py-16 first:pt-0 last:pb-0">
              <Reveal>
                <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
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
                    key={f.title}
                    flip={i % 2 === 1}
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
      <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch">
        <Reveal className="h-full">
          <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-9 soft-shadow">
            <div className="flex items-center justify-between border-b border-border pb-5">
              <span className="eyebrow">Verified by track</span>
              <span className="font-mono text-[0.7rem] text-muted-foreground">288 total</span>
            </div>
            <TrackChart />
            <div className="flex items-center justify-between border-t border-border pt-5 font-mono text-[0.62rem] uppercase tracking-wider text-muted-foreground">
              <span>217 QA</span>
              <span>71 tool</span>
              <span>2 environments</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="eyebrow">Focus: Supply Chain</div>
          <h2 className="mt-4 font-display text-[clamp(1.85rem,3.4vw,2.75rem)] tracking-tight text-foreground leading-[1.1]">
            The supply chain is where reasoning gets real.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Real operations run on multi-tier networks (trade, fulfillment, warehouse) where one decision depends on
            the state of dozens of others. To act, an agent has to call the right tools, chain them under conditional
            logic, and recover from cancellations and errors.
          </p>

          <Link
            to="/case-studies/sc-bench"
            className="group mt-8 block rounded-2xl border border-accent/30 bg-accent/[0.07] p-6 transition hover:border-accent/50 hover:bg-accent/[0.11]"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg text-foreground group-hover:underline underline-offset-4 decoration-foreground/30">
                SupChain-Bench Verified
              </h3>
              <span className="font-mono text-[0.65rem] uppercase tracking-wider text-accent">Research Effort</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Building on the SupChain-Bench supply-chain benchmark, we audited all 326 items through the real graders and
              kept the 288 that are gold-correct and fairly gradable, giving a clean, held-out signal for training and evaluation.
            </p>
            <div className="mt-5 flex items-center gap-6">
              {[
                { v: "288", l: "Verified" },
                { v: "326", l: "Audited" },
                { v: "76", l: "Excluded" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-lg text-foreground">{s.v}</div>
                  <div className="font-mono text-[0.6rem] uppercase tracking-wider text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
            <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              Read the case study
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </div>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="relative px-6 py-28 border-t border-border">
      <Reveal>
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] tracking-tight text-foreground text-balance">
              Training agents for real-world operations?
            </h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Book a 30-minute demo to see the platform in action, or email us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-accent underline underline-offset-2 hover:opacity-80"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden="true">
                <rect x="3" y="4.5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
                <path d="M3 9h18M8 2.5v4M16 2.5v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Book a meeting
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
