import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SiteFooter, PageIntro, BTN_PRIMARY } from "@/components/site-chrome";

export const Route = createFileRoute("/why-now")({
  head: () => ({
    meta: [
      { title: "Why now | Manifest" },
      {
        name: "description",
        content:
          "The first quote back wins the load. Most freight goes to the first bidder to respond, and answering faster used to mean hiring more people.",
      },
      { property: "og:title", content: "Why now | Manifest" },
      {
        property: "og:description",
        content:
          "The first quote back wins the load. Answering faster used to mean hiring more people. Not anymore.",
      },
    ],
  }),
  component: WhyNowPage,
});

const STATS = [
  {
    value: "~67%",
    color: "text-mint",
    label: "of freight deals go to the first bidder to respond",
  },
  {
    value: "90 hrs",
    color: "text-gold",
    label: "average forwarder response time; winning firms respond in under 30 minutes",
  },
  { value: "31%", color: "text-clay", label: "of quote requests receive any response at all" },
];

function WhyNowPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="flex flex-1 flex-col items-center gap-12 px-4 py-[clamp(64px,12vw,120px)] sm:px-6 rise-fast">
        <PageIntro eyebrow="Why speed matters" title="The first quote back wins the load." />
        <div className="grid w-full max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4">
          {STATS.map((s) => (
            <div
              key={s.value}
              className="flex flex-col gap-2.5 rounded-xl border border-white/15 p-7"
            >
              <div className={`font-display text-[clamp(3rem,6vw,5rem)] leading-none ${s.color}`}>
                {s.value}
              </div>
              <div className="text-[17px] leading-[1.45] text-fog-bright">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="m-0 max-w-[760px] text-center text-[clamp(1.0625rem,2vw,1.5rem)] leading-[1.45] text-pretty text-fog">
          Answering faster used to mean hiring more people, but payroll already consumes most of the
          gross margin on a load. The way to win more freight isn't more headcount. It's an agent
          that quotes in minutes.
        </p>
        <p className="m-0 text-center text-xs text-ink-faint">
          Sources: Expedock; Freightos; Rippey AI; FreightWaves unit-economics analysis, Jan 2026;
          TIA
        </p>
        <Link to="/" className={BTN_PRIMARY}>
          See the walkthrough
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}
