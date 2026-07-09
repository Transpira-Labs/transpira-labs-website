import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SolidBackground, SiteFooter, DEMO_URL, PLATFORM_URL, BUILD_URL, CAL_URL } from "@/components/site-chrome";
import undockedLogo from "@/assets/undocked-logo.png";
import hudLogo from "@/assets/hudlogo.png";
import adiKrish from "@/assets/adi-krish.png";
import fusenWorldLogo from "@/assets/fusen-world.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Transpira" },
      { name: "description", content: "Transpira is building Manifest, the intelligence layer for the supply chain: indexing data, monitoring operations, and fixing problems automatically." },
      { property: "og:title", content: "About | Transpira" },
      { property: "og:description", content: "The company building Manifest: every system, one answer, with a research lab training the agents behind it." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <SolidBackground />
      <main className="relative z-10">
        <SiteNav />
        <section className="px-6 pt-36 pb-24">
          <div className="mx-auto max-w-3xl">
            <div className="eyebrow">About</div>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-foreground text-balance">
              Building the intelligence layer for the supply chain
            </h1>
            <p className="mt-8 text-lg text-foreground/85 leading-relaxed">
              Transpira is building Manifest: one index across all your supply-chain systems that monitors operations and fixes problems automatically. Any PO, container, or reject code traces to its root cause in minutes, with every answer cited to the source record. See it in action at the{" "}
              <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-4">demo</a>.
            </p>
            <p className="mt-6 text-lg text-foreground/85 leading-relaxed">
            Additionally, we design reinforcement-learning environments and deliver them to frontier labs. That work ships through the{" "}
            <a href={PLATFORM_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-4">Platform</a> and{" "}
              <a href={BUILD_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-4">Build</a>, and it's the training ground behind Manifest's agents.
            </p>
            <p className="mt-6 text-lg text-foreground/85 leading-relaxed">
              If you run supply-chain operations, or you're pushing agents toward real-world competence, we'd love to talk.
            </p>
            <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="mt-10 inline-block rounded-full px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              Book a meeting
            </a>
          </div>
        </section>

        <section className="px-6 py-24 border-t border-border">
          <div className="mx-auto max-w-3xl">
            <div className="eyebrow">Team</div>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground">Who we are</h2>
            <div className="mt-8 rounded-2xl border border-border bg-card p-6 soft-shadow">
              <div className="flex items-center gap-4">
                <img src={adiKrish} alt="Adi Krish" className="size-14 shrink-0 rounded-full object-cover" />
                <div>
                  <div className="text-lg font-medium text-foreground">Adi Krish</div>
                  <div className="text-sm text-muted-foreground">Founder & CEO</div>
                </div>
              </div>
              <p className="mt-4 text-foreground/85 leading-relaxed">
                Before Transpira, Adi studied computer science at Georgia Tech and worked on the Ads
                Machine Learning team at Meta. His AI research at Georgia Tech earned the
                President&apos;s Undergraduate Research Award, and he turned down offers from
                Google, Meta, and others to found Transpira Labs.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 border-t border-border">
          <div className="mx-auto max-w-3xl">
            <div className="eyebrow">Partners</div>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground">Who we work with</h2>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                href="https://www.undocked.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-32 items-center justify-center rounded-2xl border border-border bg-card p-8 soft-shadow transition-colors hover:border-accent/50"
              >
                <img src={undockedLogo} alt="Undocked logo" className="max-h-12 w-auto max-w-full object-contain" />
              </a>
              <a
                href="https://www.hud.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-32 items-center justify-center rounded-2xl border border-border bg-card p-8 soft-shadow transition-colors hover:border-accent/50"
              >
                <img src={hudLogo} alt="HUD logo" className="max-h-12 w-auto max-w-full object-contain" />
              </a>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 border-t border-border">
          <div className="mx-auto max-w-3xl">
            <div className="eyebrow">Investors</div>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground">Backed by</h2>
            <div className="mt-8 flex justify-center">
              <a
                href="https://fusen.world/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-48 w-full items-center justify-center rounded-2xl border border-border bg-[#f6f8f5] p-8 soft-shadow transition-colors hover:border-accent/50 sm:w-[28rem]"
              >
                <img src={fusenWorldLogo} alt="Fusen World logo" className="max-h-32 w-auto max-w-full object-contain" />
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
