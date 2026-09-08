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
import demoCapabilities from "@/assets/demo-capabilities.png";
import demoInbox from "@/assets/demo-inbox.png";
import demoPrice from "@/assets/demo-price.png";
import demoDraft from "@/assets/demo-draft.png";
import demoApprove from "@/assets/demo-approve.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Transpira | Win the load with the first quote back" },
      {
        name: "description",
        content:
          "The AI bidding agent for 3PL brokers: it reads the inbox, prices spot quotes and RFP bid sheets, and drafts the replies. A human approves every send.",
      },
      { property: "og:title", content: "Transpira | Win the load with the first quote back" },
      {
        property: "og:description",
        content:
          "The AI bidding agent for 3PL brokers: it reads the inbox, prices spot quotes and RFP bid sheets, and drafts the replies. A human approves every send.",
      },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

/* Why speed matters: the numbers behind the wedge. */
const SPEED_STATS = [
  { value: "~67%", label: "of freight deals go to the first bidder to respond" },
  {
    value: "90 hrs",
    label: "average forwarder response time; winning firms respond in under 30 minutes",
  },
  { value: "31%", label: "of quote requests receive any response at all" },
];

function StatBand() {
  return (
    <section className="relative px-6 py-24 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="eyebrow">Why speed matters</div>
          <h2 className="mt-4 font-display text-[clamp(1.85rem,3.4vw,2.75rem)] tracking-tight text-foreground">
            The first quote back wins the load.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {SPEED_STATS.map((s, i) => (
            <Reveal key={s.value} delay={i * 100}>
              <div className="rounded-2xl border border-border bg-card p-6 soft-shadow h-full">
                <div className="font-display text-[clamp(2.2rem,4vw,3rem)] tracking-tight text-accent">
                  {s.value}
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <p className="mt-8 text-muted-foreground leading-relaxed max-w-3xl">
            Answering faster used to mean hiring more people, but payroll already consumes most of
            the gross margin on a load. The way to win more freight isn&apos;t more headcount.
            It&apos;s an agent that quotes in minutes.
          </p>
          <p className="mt-4 font-mono text-[0.62rem] uppercase tracking-wider text-muted-foreground/70">
            Sources: Expedock; Freightos; Rippey AI; FreightWaves unit-economics analysis, Jan 2026;
            TIA
          </p>
        </Reveal>
      </div>
    </section>
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
              Win the load with the first quote back.
            </h1>
            <p
              className="rise mt-6 text-lg text-white/70 leading-relaxed max-w-2xl"
              style={{ "--rise-delay": "200ms" } as CSSProperties}
            >
              The AI bidding agent for 3PL brokers. It reads your inbox, prices spot quotes and RFP
              bid sheets from the rate data you already pay for, and drafts the replies. A human
              approves every send.
            </p>
            <div
              className="rise mt-8 flex flex-wrap items-center gap-3"
              style={{ "--rise-delay": "300ms" } as CSSProperties}
            >
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

/* The product: the bidding pipeline, from inbox to approved send. */
function Product() {
  const features = [
    {
      kicker: "Connect",
      path: "/connectors",
      title: "Plugs into the systems you already run.",
      body: "Transpira connects to your inbox, SMS, and carrier registries in minutes. Every connector declares exactly what it can do, so the agent can never take an action you haven't scoped: no rip-and-replace, no implementation project.",
      imgLabel: "Capability manifest",
      img: demoCapabilities,
    },
    {
      kicker: "Inbox",
      path: "/inbox",
      title: "Every quote request gets read the moment it lands.",
      body: "The agent watches the inbox around the clock, picks out spot-quote requests and RFP bid spreadsheets, and pulls the lane, equipment, and dates into structured fields. Anything ambiguous is flagged for you, not guessed.",
      imgLabel: "Parsed quote request",
      img: demoInbox,
    },
    {
      kicker: "Price",
      path: "/command",
      title: "Spot quotes and bid sheets priced from your own rate data.",
      body: "The agent prices each lane from your own quote history and market benchmarks: what you've won, what you've lost, and where the spot band sits today. Evidence your team never had time to assemble, in seconds.",
      imgLabel: "Lane pricing evidence",
      img: demoPrice,
    },
    {
      kicker: "Draft",
      path: "/command",
      title: "The reply is written before you open the thread.",
      body: "Every priced quote comes back as a ready-to-send reply on the original thread, with the numbers laid out the way the shipper asked for them. The reply stays a draft: nothing sends without your approval.",
      imgLabel: "Drafted reply",
      img: demoDraft,
    },
    {
      kicker: "Approve",
      path: "/command",
      title: "A human approves every send.",
      body: "Nothing leaves the building without your sign-off. You see the full plan before anything happens, click approve, and the quote goes out while your competitors are still opening the email.",
      imgLabel: "Approve and run",
      img: demoApprove,
    },
  ];

  return (
    <section className="relative px-6 py-24 border-t border-border">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div>
            <div className="eyebrow">Product</div>
            <h2 className="mt-4 font-display text-[clamp(1.85rem,3.4vw,2.75rem)] tracking-tight text-foreground">
              From inbox to approved quote in minutes.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Winnable freight is lost two ways: spot quotes answered too slowly, and RFP bid
              spreadsheets that can&apos;t be priced fast enough. Transpira&apos;s agent handles
              both, reading requests, pricing them, and drafting the replies, so your team spends
              its time approving quotes instead of assembling them.
            </p>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 flex items-center justify-center gap-2 rounded-2xl border border-accent/30 bg-accent/[0.07] px-6 py-4 text-sm font-medium text-foreground transition hover:border-accent/50 hover:bg-accent/[0.11]"
            >
              <span>See the agent in action and try the demo today</span>
              <span className="text-accent transition-transform group-hover:translate-x-0.5">
                →
              </span>
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

/* Pricing and traction: self-serve at a price a three-person shop can buy. */
function Pricing() {
  return (
    <section className="relative px-6 py-24 border-t border-border">
      <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal>
          <div className="eyebrow">Pricing</div>
          <h2 className="mt-4 font-display text-[clamp(1.85rem,3.4vw,2.75rem)] tracking-tight text-foreground leading-[1.1]">
            Starts at $500 a month. Self-serve.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            A tiered subscription that grows as the agent takes on more of the workflow, at a price
            a three-person shop can buy. No sales cycle, no paid implementation: connect your
            systems and start quoting the same day.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Try the Demo
            </a>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-5 py-2.5 border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Book a call
            </a>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="rounded-2xl border border-accent/30 bg-accent/[0.07] p-8 soft-shadow">
            <div className="eyebrow">Traction</div>
            <div className="mt-4 font-display text-[clamp(2.2rem,4vw,3rem)] tracking-tight text-foreground">
              5 customers
            </div>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              in private beta, quoting real freight today. Want in? Email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-accent underline underline-offset-2 hover:opacity-80"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              for early access.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* Research footnote: the benchmarking work stays reachable without carrying
   the homepage narrative. */
function ResearchNote() {
  return (
    <section className="relative px-6 py-16 border-t border-border">
      <Reveal>
        <div className="mx-auto max-w-6xl">
          <Link
            to="/case-studies"
            className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-6 soft-shadow transition hover:border-accent/50 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="eyebrow">Research</div>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                Behind the product is a research practice benchmarking and training supply-chain
                agents, including SupChain-Bench Verified, our audited 288-task evaluation set.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent">
              Read the case studies
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </span>
          </Link>
        </div>
      </Reveal>
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
              Running a brokerage?
            </h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              Try the demo,{" "}
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
        <StatBand />
        <Product />
        <Pricing />
        <ResearchNote />
        <CTA />
        <SiteFooter />
      </main>
    </>
  );
}
