import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SolidBackground, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "Case Studies | Transpira" },
      {
        name: "description",
        content:
          "What Transpira builds and measures: RL environments, benchmark audits, and fine-tuning runs, each written up with the methods and the numbers.",
      },
      { property: "og:title", content: "Case Studies | Transpira" },
      {
        property: "og:description",
        content: "RL environments, benchmark audits, and fine-tuning runs, written up with the methods and the numbers.",
      },
    ],
  }),
  component: CaseStudiesIndex,
});

function CaseStudiesIndex() {
  const studies = [
    {
      slug: "benchception",
      eyebrow: "Internal R&D",
      title: "Benchception",
      desc: "Which model builds the better RL environment: Claude Opus 4.8 or GPT-5.5? We gave both the same plain-language spec, had each build an environment and train a student model on it, and let a held-out supply chain benchmark pick the winner.",
      tags: ["Environment Authoring", "Evaluation", "Supply Chain"],
    },
    {
      slug: "sc-bench",
      eyebrow: "Internal R&D",
      title: "SupChain-Bench Verified",
      desc: "326 benchmark items went in, 288 came out. We ran every SupChain-Bench item through its own graders, cut the ones that were wrong or could not be graded fairly, and shipped the survivors as two deployable HUD v6 environments.",
      tags: ["Benchmark Verification", "Evaluation", "HUD v6"],
    },
    {
      slug: "build",
      eyebrow: "Product",
      title: "Build",
      desc: "Snap blocks together and get a working RL environment. Build is our Scratch-style builder for HUD: describe each block in plain language, then check, run, and train. No code, no JSON, no CLI.",
      tags: ["No-code", "Environment Authoring", "HUD"],
    },
    {
      slug: "transpira-set",
      eyebrow: "RL Fine-Tuning",
      title: "Classhopper Set",
      desc: "100 bug-fixing tasks lifted GPT OSS 120B by 13% on best@10. We fine-tuned with GRPO on the Classhopper Set and also measured +8% on pass@1, with the model solving each task in 4 fewer steps.",
      tags: ["Reinforcement Learning", "Code Generation", "HUD Platform"],
    },
  ];

  const cardClass =
    "group rounded-2xl border border-foreground/15 bg-card backdrop-blur-md p-8 shadow-sm hover:bg-background/95 transition";
  const cardInner = (s: (typeof studies)[number]) => (
    <>
      <div className="text-xs uppercase tracking-[0.2em] text-accent mb-4">{s.eyebrow}</div>
      <h2 className="font-display text-3xl text-foreground mb-3 group-hover:underline underline-offset-4 decoration-foreground/30">
        {s.title}
      </h2>
      <p className="text-foreground/80 leading-relaxed mb-6">{s.desc}</p>
      <div className="flex flex-wrap gap-2">
        {s.tags.map((t) => (
          <span
            key={t}
            className="text-xs rounded-full border border-foreground/15 bg-background/70 px-3 py-1 text-foreground/70"
          >
            {t}
          </span>
        ))}
      </div>
    </>
  );
  return (
    <>
      <SolidBackground />
      <main className="relative z-10">
        <SiteNav />
        <section className="px-6 pt-36 pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="eyebrow">Research</div>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-foreground text-balance max-w-4xl">
              Research &amp; case studies
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              What we build and measure: RL environments, benchmark audits, and fine-tuning runs, each written up with
              the methods and the numbers.
            </p>
          </div>
        </section>

        <section className="px-6 pb-32">
          <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-5">
            {studies.map((s) =>
              s.slug === "benchception" ? (
                <Link key={s.slug} to="/case-studies/benchception" className={cardClass}>
                  {cardInner(s)}
                </Link>
              ) : s.slug === "sc-bench" ? (
                <Link key={s.slug} to="/case-studies/sc-bench" className={cardClass}>
                  {cardInner(s)}
                </Link>
              ) : s.slug === "build" ? (
                <Link key={s.slug} to="/case-studies/build" className={cardClass}>
                  {cardInner(s)}
                </Link>
              ) : (
                <Link
                  key={s.slug}
                  to="/case-studies/$slug"
                  params={{ slug: s.slug }}
                  className={cardClass}
                >
                  {cardInner(s)}
                </Link>
              ),
            )}
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
