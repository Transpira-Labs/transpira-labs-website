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
      slug: "transpira-set",
      eyebrow: "RL Fine-Tuning",
      title: "Classhopper Set",
      desc: "Fine-tuning GPT OSS 120B on 100 real-world bug-fixing tasks using GRPO, yielding +13% improvement on best@10 and fewer steps per task.",
      tags: ["Reinforcement Learning", "Code Generation", "HUD Platform"],
    },
  ];
  return (
    <>
      <SolidBackground />
      <main className="relative z-10">
        <SiteNav />
        <section className="px-6 pt-36 pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="text-xs font-mono tracking-[0.2em] text-foreground/50 mb-8">01</div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-gradient text-balance max-w-4xl">
              Case Studies
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
              Real-world projects demonstrating how we approach hard engineering problems.
            </p>
          </div>
        </section>

        <section className="px-6 pb-32">
          <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-5">
            {studies.map((s) => (
              <Link
                key={s.slug}
                to="/case-studies/$slug"
                params={{ slug: s.slug }}
                className="group rounded-2xl border border-foreground/15 bg-card backdrop-blur-md p-8 shadow-sm hover:bg-background/95 transition"
              >
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
              </Link>
            ))}
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
