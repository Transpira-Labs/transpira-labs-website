import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SolidBackground, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/case-studies/")({
  head: () => ({
    meta: [
      { title: "Case Studies — Transpira" },
      { name: "description", content: "Real-world projects demonstrating how Transpira approaches hard reinforcement learning and code-generation problems." },
      { property: "og:title", content: "Case Studies — Transpira" },
      { property: "og:description", content: "Real-world projects demonstrating how we approach hard engineering problems." },
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
      desc: "Which frontier model is best at building RL environments? We make environment-authoring the thing under test — models compete by teaching, judged on a held-out Supply Chain Bench.",
      tags: ["Environment Authoring", "Evaluation", "Supply Chain"],
    },
    {
      slug: "build",
      eyebrow: "Product",
      title: "Build",
      desc: "A Scratch-style, block-based builder for RL environments. Snap blocks together, describe each in plain language, then check, build, run, and train — no code, JSON, or CLI.",
      tags: ["No-code", "Environment Authoring", "HUD"],
    },
    {
      slug: "transpira-set",
      eyebrow: "RL Fine-Tuning",
      title: "Classhopper Set",
      desc: "Fine-tuning GPT OSS 120B on 100 real-world bug-fixing tasks using GRPO, yielding +13% improvement on best@10 and fewer steps per task.",
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
          <span key={t} className="text-xs rounded-full border border-foreground/15 bg-background/70 px-3 py-1 text-foreground/70">{t}</span>
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
              Real-world projects demonstrating how we approach hard engineering problems.
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
              ) : s.slug === "build" ? (
                <Link key={s.slug} to="/case-studies/build" className={cardClass}>
                  {cardInner(s)}
                </Link>
              ) : (
                <Link key={s.slug} to="/case-studies/$slug" params={{ slug: s.slug }} className={cardClass}>
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
