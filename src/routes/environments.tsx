import { createFileRoute } from "@tanstack/react-router";
import {
  SiteNav,
  SolidBackground,
  SiteFooter,
  Reveal,
  FeatureRow,
  PLATFORM_URL,
  BUILD_URL,
} from "@/components/site-chrome";
import buildCanvas from "@/assets/build-canvas.png";
import buildRunTrain from "@/assets/build-run-train.png";
import buildDashboard from "@/assets/build-dashboard.png";

export const Route = createFileRoute("/environments")({
  head: () => ({
    meta: [
      { title: "Environments | Transpira" },
      { name: "description", content: "How Transpira creates reinforcement-learning environments: tasks authored and verified on the Platform, environments composed and run on Build." },
      { property: "og:title", content: "Environments | Transpira" },
      { property: "og:description", content: "How Transpira creates reinforcement-learning environments: tasks authored and verified on the Platform, environments composed and run on Build." },
    ],
  }),
  component: EnvironmentsPage,
});

const EFFORTS = [
  {
    name: "Platform",
    href: PLATFORM_URL,
    tag: "platform.transpiralabs.com",
    intro:
      "The evaluation pipeline behind Manifest's agents: where we author benchmark tasks, run them against frontier models, and validate every trace before a capability is trusted with real operational work.",
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
      "Where Manifest's agents train: composing reinforcement-learning environments from blocks described in plain language, then building, running, and testing them against operational scenarios.",
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
        body: "Send an agent through the environment you composed and watch it resolve, retry, and recover live. Then adjust the reward and run it again.",
        imgLabel: "Live run",
        img: buildRunTrain,
      },
    ],
  },
];

function EnvironmentsPage() {
  return (
    <>
      <SolidBackground />
      <main className="relative z-10">
        <SiteNav />
        <section className="px-6 pt-36 pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="eyebrow">Environments</div>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-foreground">
              The training ground behind Manifest
            </h1>
            <p className="mt-8 text-lg text-foreground/85 leading-relaxed">
              An agent is only as good as the environments it trains in. We design reinforcement-learning
              environments with dense reward signals grounded in real business logic, and we&apos;ve delivered
              them to frontier labs. That work ships through two surfaces: the Platform, where tasks are
              authored, evaluated, and quality-checked, and Build, a no-code way to compose environments
              from blocks.
            </p>
          </div>
        </section>

        <section className="px-6 py-24 border-t border-border">
          <div className="mx-auto max-w-6xl divide-y divide-border">
            {EFFORTS.map((p) => (
              <div key={p.name} className="py-16 first:pt-0 last:pb-0">
                <Reveal>
                  <div>
                    <h2 className="font-display text-[clamp(1.55rem,2.8vw,2.1rem)] tracking-tight text-foreground">{p.name}</h2>
                    <p className="mt-3 text-muted-foreground leading-relaxed">{p.intro}</p>
                    <div className="mt-6 flex justify-end">
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:bg-secondary"
                      >
                        <span className="font-mono text-xs text-foreground/70 group-hover:text-foreground">{p.tag}</span>
                        <svg viewBox="0 0 16 16" className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" fill="none" aria-hidden="true">
                          <path d="M5 11 L11 5 M6 5 H11 V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </Reveal>

                <div className="mt-8 space-y-14">
                  {p.features.map((f, i) => (
                    <FeatureRow
                      key={f.title}
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
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
