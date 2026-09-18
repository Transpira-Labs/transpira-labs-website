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
          "Transpira Labs is a research lab ensuring that AI is actually useful for everyone, not just a select few. Manifest is where that work meets freight brokers.",
      },
      { property: "og:title", content: "Company | Transpira Labs" },
      {
        property: "og:description",
        content:
          "Built by researchers and engineers. Backed by Fusen World.",
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
          title="Built by researchers and engineers."
          body="We're a research lab ensuring that AI is actually useful for everyone, not just a select few. Manifest is where that work meets freight brokers. Backed by Fusen World."
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
            desc="Shipped to frontier AI labs; the same technology powers our newer products"
          />
          <LinkCard href={DEMO_URL} title="Live demo" desc="quoting.transpiralabs.com" />
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
