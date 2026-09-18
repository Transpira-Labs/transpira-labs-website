import { createFileRoute } from "@tanstack/react-router";
import {
  SiteNav,
  SiteFooter,
  PageIntro,
  LinkCard,
  BTN_PRIMARY,
  CAL_URL,
  DEMO_URL,
  CONTACT_EMAIL,
} from "@/components/site-chrome";

export const Route = createFileRoute("/company")({
  head: () => ({
    meta: [
      { title: "Company | Transpira Labs" },
      {
        name: "description",
        content:
          "Transpira Labs builds Manifest. Behind the product is a research practice benchmarking and training supply-chain agents, including SupChain-Bench Verified.",
      },
      { property: "og:title", content: "Company | Transpira Labs" },
      {
        property: "og:description",
        content:
          "Built by people who benchmark supply-chain agents for a living. Backed by Fusen World.",
      },
    ],
  }),
  component: CompanyPage,
});

function CompanyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="flex flex-1 flex-col items-center gap-10 px-4 py-[clamp(64px,12vw,120px)] sm:px-6 rise-fast">
        <PageIntro
          eyebrow="Transpira Labs"
          title="Built by people who benchmark supply-chain agents for a living."
          body="Behind the product is a research practice benchmarking and training supply-chain agents, including SupChain-Bench Verified, our audited 288-task evaluation set. Five brokerages are in private beta, quoting real freight today. Backed by Fusen World."
        />
        <div className="grid w-full max-w-[900px] grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-3">
          <LinkCard
            to="/case-studies"
            title="Our research"
            desc="Case studies and SupChain-Bench"
          />
          <LinkCard to="/about" title="About" desc="Who we are and who backs us" />
          <LinkCard
            to="/environments"
            title="Environments"
            desc="Where our agents are trained and tested"
          />
          <LinkCard href={DEMO_URL} title="Live demo" desc="demo.transpiralabs.com" />
          <LinkCard to="/contact" title="Contact" desc={CONTACT_EMAIL} />
        </div>
        <a href={CAL_URL} target="_blank" rel="noreferrer" className={BTN_PRIMARY}>
          Book a 20-minute call
        </a>
      </main>
      <SiteFooter />
    </div>
  );
}
