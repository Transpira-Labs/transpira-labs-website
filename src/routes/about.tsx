import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, ScrollBackground, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Classhopper" },
      { name: "description", content: "Classhopper builds hyper-realistic reinforcement learning environments for training capable AI agents on real-world software tasks." },
      { property: "og:title", content: "About Us — Classhopper" },
      { property: "og:description", content: "We build the environments that teach agents to solve real engineering problems." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <ScrollBackground />
      <main className="relative z-10">
        <SiteNav />
        <section className="px-6 pt-36 pb-24">
          <div className="mx-auto max-w-3xl">
            <div className="text-xs font-mono tracking-[0.2em] text-foreground/50 mb-8">01</div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-gradient text-balance">
              About Classhopper
            </h1>
            <p className="mt-8 text-lg text-foreground/85 leading-relaxed">
              We build hyper-realistic reinforcement learning environments grounded in production codebases. Static benchmarks plateau quickly — the frontier of agent capability now depends on the quality of the worlds we train them in.
            </p>
            <p className="mt-6 text-lg text-foreground/85 leading-relaxed">
              Our environments derive dense reward signals from tests, runtime behavior, and code quality. They support frontend, backend, and cross-stack tasks across a range of difficulties, and integrate cleanly with modern RL pipelines.
            </p>
            <p className="mt-6 text-lg text-foreground/85 leading-relaxed">
              We partner with research teams pushing agents toward real-world competence. If that sounds like you, we'd love to talk.
            </p>
            <a href="mailto:hello@classhopper.tech" className="mt-10 inline-block rounded-full px-6 py-3 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition">
              hello@classhopper.tech
            </a>
          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  );
}
