import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import {
  SiteNav,
  SolidBackground,
  SiteFooter,
  Reveal,
  FeatureRow,
  DEMO_URL,
  CONTACT_EMAIL,
  CAL_URL,
} from "@/components/site-chrome";
import warehouseAisle from "@/assets/warehouse-aisle.jpg";
import demoAsk from "@/assets/demo-ask.png";
import demoSearch from "@/assets/demo-search.png";
import demoFeed from "@/assets/demo-feed.png";
import demoAgents from "@/assets/demo-agents.png";
import demoConnectors from "@/assets/demo-connectors.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Transpira | Every System. One Answer." },
      { name: "description", content: "The intelligence layer for your supply chain: indexing data, monitoring operations, and fixing problems automatically." },
      { property: "og:title", content: "Transpira | Every System. One Answer." },
      { property: "og:description", content: "The intelligence layer for your supply chain: indexing data, monitoring operations, and fixing problems automatically." },
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
    <section className="relative min-h-[82svh] flex flex-col overflow-hidden bg-[var(--hero)]">
      {/* Cinematic warehouse backdrop: tall stocked racks under a dark
          ceiling. The ceiling (upper left) is already near-black, so the top
          veil is light; the loaded racks on the right carry the brightness. */}
      <div className="absolute inset-0 z-0">
        <img src={warehouseAisle} alt="" className="w-full h-full object-cover object-center" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, var(--hero) 0%, color-mix(in oklch, var(--hero) 86%, transparent) 48%, color-mix(in oklch, var(--hero) 32%, transparent) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in oklch, var(--hero) 58%, transparent) 0%, color-mix(in oklch, var(--hero) 22%, transparent) 32%, transparent 62%, color-mix(in oklch, var(--hero) 62%, transparent) 100%)",
          }}
        />
      </div>

      {/* Headline block, vertically centered in the remaining space. */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto max-w-6xl px-6 w-full pt-16">
          <div>
            <h1
              className="rise font-display text-[clamp(2.4rem,5.6vw,4.5rem)] leading-[1.03] tracking-tight text-white text-balance"
              style={{ "--rise-delay": "80ms" } as CSSProperties}
            >
              Find the root cause before the costs accumulate.
            </h1>
            <p
              className="rise mt-6 text-lg text-white/70 leading-relaxed"
              style={{ "--rise-delay": "200ms" } as CSSProperties}
            >
              The intelligence layer for your supply chain: indexing data, monitoring operations, and fixing problems automatically.
            </p>
            <div className="rise mt-8 flex flex-wrap items-center gap-3" style={{ "--rise-delay": "300ms" } as CSSProperties}>
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Try the Demo
              </a>
              <Link
                to="/contact"
                className="rounded-full px-5 py-2.5 border border-white/25 text-sm font-medium text-white hover:bg-white/10 transition-colors"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* The product: Manifest, our permissions-aware index across the supply-chain
   stack. */
function Product() {
  const features = [
    {
      kicker: "Agents",
      path: "/agents",
      title: "Standing watchers that read the logs so nobody has to.",
      body: "Manifest deploys agents that can monitor your systems around the clock, completing custom workflows designed to save you time.",
      imgLabel: "Agent run log",
      img: demoAgents,
    },
    {
      kicker: "Connectors",
      path: "/connectors",
      title: "All of your systems, one index.",
      body: "Connectors across your systems feed into one entity graph with updates landing in minutes. Details sync through each source on every run.",
      imgLabel: "Connector grid",
      img: demoConnectors,
    },
    {
      kicker: "Feed",
      path: "/feed",
      title: "The quantified problems come to you.",
      body: "Every time a problem arises, Manifest automatically locates the error, diagnoses the issue, and proposes solutions, letting your team focus on fixing problems instead of finding them.",
      imgLabel: "Problem feed",
      img: demoFeed,
    },
    {
      kicker: "Ask",
      path: "/ask",
      title: "One question replaces the multi-system hunt.",
      body: "Manifest indexes data across all of your systems for quick retrieval. It understands the context of your operations and efficiently answers questions, grounding answers with citations linked back to the source.",
      imgLabel: "Ask with citations",
      img: demoAsk,
    },
    {
      kicker: "Search",
      path: "/search",
      title: "Find containers through their lifecycle.",
      body: "Our indexing monitors containers from order to fulfillment, providing you the relevant details scoped to your role.",
      imgLabel: "Unified search",
      img: demoSearch,
    },
  ];

  return (
    <section className="relative px-6 py-24 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div>
            <div className="eyebrow">Product</div>
            <h2 className="mt-4 font-display text-[clamp(1.85rem,3.4vw,2.75rem)] tracking-tight text-foreground">
              Every system. One answer.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              When an issue arises within operations, the reject code sits in one system, the root cause
              in another, and the costs accumulate before anyone connects the dots. Manifest lives on top of these systems, 
              diagnosing errors and coordinating recovery, resolving issues as they come up instead of waiting for manual intervention.
            </p>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 flex items-center justify-center gap-2 rounded-2xl border border-accent/30 bg-accent/[0.07] px-6 py-4 text-sm font-medium text-foreground transition hover:border-accent/50 hover:bg-accent/[0.11]"
            >
              <span>See Manifest in action and try the demo today</span>
              <span className="text-accent transition-transform group-hover:translate-x-0.5">→</span>
            </a>
          </div>
        </Reveal>

        <div className="mt-8 space-y-14">
          {features.map((f, i) => (
            <FeatureRow
              key={f.title}
              flip={i % 2 === 1}
              kicker={f.kicker}
              title={f.title}
              body={f.body}
              imgUrl={`demo.transpiralabs.com${f.path}`}
              imgHref={`${DEMO_URL}${f.path}`}
              imgLabel={f.imgLabel}
              img={f.img}
            />
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
            Read our research on Supply Chain agent benchmarking.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            In this simulation, operations run on multi-tier networks where one decision depends on
            the state of dozens of others. To act, an agent has to call the right tools, chain them under conditional
            logic, and recover from cancellations and errors.
          </p>

          <Link
            to="/case-studies/sc-bench"
            className="group mt-8 block rounded-2xl border border-accent/30 bg-accent/[0.07] p-6 transition hover:border-accent/50 hover:bg-accent/[0.11]"
          >
            <h3 className="font-display text-lg text-foreground group-hover:underline underline-offset-4 decoration-foreground/30">
              SupChain-Bench Verified
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Building on SupChain-Bench, we audited all 326 items through its graders and
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
          <div>
            <h2 className="font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] tracking-tight text-foreground text-balance">
              Running supply chain operations?
            </h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Try out Manifest,{" "}
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-2 hover:opacity-80"
              >
                book a meeting
              </a>
              , or email us at{" "}
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
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Try our Demo
            </a>
            <Link
              to="/contact"
              className="rounded-full px-6 py-3 border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Get in touch
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
        <Product />
        <Focus />
        <CTA />
        <SiteFooter />
      </main>
    </>
  );
}
