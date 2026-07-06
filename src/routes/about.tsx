import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SolidBackground, SiteFooter, PLATFORM_URL, BUILD_URL, CAL_URL } from "@/components/site-chrome";
import undockedLogo from "@/assets/undocked-logo.png";
import hudLogo from "@/assets/hudlogo.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Transpira AI Lab" },
      { name: "description", content: "Transpira is an AI lab building hyper-realistic reinforcement-learning environments and delivering them to frontier labs." },
      { property: "og:title", content: "About | Transpira AI Lab" },
      { property: "og:description", content: "An AI lab building the environments that teach agents to solve real engineering problems, already in use at frontier labs." },
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
              An AI research lab for real-world agents
            </h1>
            <p className="mt-8 text-lg text-foreground/85 leading-relaxed">
              Transpira builds hyper-realistic reinforcement-learning environments and benchmarks that train and evaluate AI agents on real operational work. Static benchmarks plateau quickly. The frontier of agent capability now depends on the quality of the worlds we train them in.
            </p>
            <p className="mt-6 text-lg text-foreground/85 leading-relaxed">
              Our focus is the supply chain: multi-tier networks where one decision depends on the state of dozens of others, and where progress demands real tool-use and multi-step reasoning. We design environments with dense reward signals grounded in real business logic, and we've delivered high-quality environments to frontier labs.
            </p>
            <p className="mt-6 text-lg text-foreground/85 leading-relaxed">
              Our work ships through two surfaces: the{" "}
              <a href={PLATFORM_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-4">Platform</a>, where tasks are authored, evaluated, and quality-checked, and{" "}
              <a href={BUILD_URL} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline underline-offset-4">Build</a>, a no-code way to compose environments from blocks.
            </p>
            <p className="mt-6 text-lg text-foreground/85 leading-relaxed">
              We partner with research teams pushing agents toward real-world competence. If that sounds like you, we'd love to talk.
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
            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-border bg-card p-6 soft-shadow">
              <div className="grid size-14 shrink-0 place-items-center rounded-full bg-secondary font-display text-lg font-semibold text-foreground">
                AK
              </div>
              <div>
                <div className="text-lg font-medium text-foreground">Adi Krish</div>
                <div className="text-sm text-muted-foreground">Founder</div>
              </div>
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

        <SiteFooter />
      </main>
    </>
  );
}
