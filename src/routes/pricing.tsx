import { createFileRoute } from "@tanstack/react-router";
import {
  SiteNav,
  SiteFooter,
  PageIntro,
  BTN_PRIMARY,
  BTN_GHOST,
  CAL_URL,
  DEMO_URL,
} from "@/components/site-chrome";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing | Manifest" },
      {
        name: "description",
        content:
          "Manifest starts at $500 a month, self-serve. Every connector included, no implementation fee, and a human approves every send.",
      },
      { property: "og:title", content: "Pricing | Manifest" },
      {
        property: "og:description",
        content:
          "Starts at $500 a month. Self-serve. Every connector included, no implementation fee.",
      },
    ],
  }),
  component: PricingPage,
});

const INCLUDED = [
  "Every connector included, free. We found a way to build integrations in hours instead of months, and we pass that on.",
  "No implementation or integration fee. Outlook connects in one sign-in.",
  "A human approves every send. Nothing leaves the building without your click.",
];

function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="flex flex-1 flex-col items-center gap-10 px-4 py-[clamp(64px,12vw,120px)] sm:px-6 rise-fast">
        <PageIntro
          eyebrow="Pricing"
          title={
            <>
              Starts at $500 a month.
              <br />
              Self-serve.
            </>
          }
          body="A tiered subscription that grows as the agent takes on more of the workflow, at a price a three-person shop can buy. No sales cycle, no paid implementation: connect your systems and start quoting the same day."
        />
        <ul className="m-0 grid w-full max-w-[1000px] list-none grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-4 p-0">
          {INCLUDED.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3.5 rounded-xl border border-white/15 p-6 text-base leading-[1.45] text-fog-bright"
            >
              <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-forest text-[11px] font-bold text-white">
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={CAL_URL} target="_blank" rel="noreferrer" className={BTN_PRIMARY}>
            Book a call
          </a>
          <a href={DEMO_URL} target="_blank" rel="noreferrer" className={BTN_GHOST}>
            Try the demo
          </a>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
