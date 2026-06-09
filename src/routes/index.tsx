import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, ScrollBackground, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Classhopper — An AI Lab Building Real-World RL Environments" },
      { name: "description", content: "Classhopper is an AI lab building hyper-realistic reinforcement learning environments. We've delivered high-quality environments to frontier labs training the next generation of agents." },
      { property: "og:title", content: "Classhopper — An AI Lab Building Real-World RL Environments" },
      { property: "og:description", content: "An AI lab delivering hyper-realistic RL environments to frontier labs." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});


function Hero() {
  return (
    <section className="relative pt-36 pb-24 px-6">
      <div className="mx-auto max-w-7xl text-center">
        <h1 className="font-display text-[clamp(2.75rem,6.5vw,5rem)] leading-[1.02] tracking-tight text-gradient text-balance">
          Train on real problems
        </h1>
        <p className="mt-8 max-w-xl mx-auto text-lg text-muted-foreground leading-relaxed">
          Hyper-realistic RL environments that simulate real-world scenarios. Train agents on tasks that actually matter.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="#environments" className="rounded-full px-5 py-3 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition">
            View environments
          </a>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    { title: "Task Simulation", body: "Realistic environments that go beyond toy problems. Real systems, real complexity, real feedback." },
    { title: "Configurable Chaos", body: "Inject realistic bugs, edge cases, and failure modes. Control difficulty and complexity at every level." },
    { title: "Real Rewards", body: "Dense, meaningful reward signals derived from test results, code quality metrics, and runtime behavior." },
    { title: "RL Integration", body: "First-class support for reinforcement learning pipelines. Gymnasium-compatible API with step, reset, and observe." },
  ];
  return (
    <section id="platform" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="rounded-2xl border border-foreground/15 bg-card backdrop-blur-md p-7 hover:bg-background/95 transition shadow-sm">
              <div className="size-10 rounded-lg bg-accent/15 border border-accent/25 grid place-items-center mb-6">
                <div className="size-2.5 rounded-sm bg-accent" />
              </div>
              <h3 className="font-display text-xl mb-3 text-foreground">{f.title}</h3>
              <p className="text-sm text-foreground/75 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Environments() {
  const stats = [
    { k: "100", t: "Total Tasks" },
    { k: "44", t: "Backend Bugs" },
    { k: "35", t: "Frontend Bugs" },
    { k: "21", t: "Cross-Stack" },
    { k: "25", t: "Benchmarks" },
  ];
  const rows = [
    { id: "ENV-001", env: "be-bug-001 · distance-calc", stack: "Py", diff: 0.3 },
    { id: "ENV-002", env: "be-bug-005 · crud-operations", stack: "Py", diff: 0.5 },
    { id: "ENV-003", env: "fe-bug-001 · utility-format", stack: "JS", diff: 0.2 },
    { id: "ENV-004", env: "fe-bug-012 · stripe-payment", stack: "JS", diff: 0.7 },
    { id: "ENV-005", env: "xs-bug-001 · field-mismatch", stack: "Py/JS", diff: 0.6 },
    { id: "ENV-006", env: "be-bug-016 · async-patterns", stack: "Py", diff: 0.8 },
    { id: "ENV-007", env: "fe-bug-020 · component-logic", stack: "JS", diff: 0.4 },
    { id: "ENV-008", env: "be-bug-023 · schema-defs", stack: "Py", diff: 0.3 },
    { id: "ENV-009", env: "xs-bug-008 · api-contract", stack: "Py/JS", diff: 0.9 },
    { id: "ENV-010", env: "bench-be-003 · service-layer", stack: "Py", diff: 0.6 },
    { id: "ENV-011", env: "fe-bug-028 · data-display", stack: "JS", diff: 0.4 },
    { id: "ENV-012", env: "be-bug-031 · joins-commits", stack: "Py", diff: 0.7 },
    { id: "ENV-013", env: "xs-bug-015 · http-methods", stack: "Py/JS", diff: 0.8 },
    { id: "ENV-014", env: "bench-fe-007 · validation", stack: "JS", diff: 0.5 },
    { id: "ENV-015", env: "be-bug-042 · route-response", stack: "Py", diff: 0.6 },
    { id: "ENV-016", env: "bench-xs-004 · req-compat", stack: "Py/JS", diff: 1.0 },
  ];
  return (
    <section id="environments" className="relative py-24 px-6">
      <div className="mx-auto max-w-7xl">
        
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight tracking-tight text-gradient mb-12 max-w-3xl">
          Software Tasks Environment
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/15 backdrop-blur-md shadow-sm mb-8">
          {stats.map((s) => (
            <div key={s.t} className="bg-card p-6">
              <div className="font-display text-3xl text-foreground">{s.k}</div>
              <div className="text-xs text-foreground/60 mt-1">{s.t}</div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl border border-foreground/15 bg-card backdrop-blur-md overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono">
              <thead className="text-xs uppercase tracking-wider text-foreground/60 border-b border-foreground/10">
                <tr>
                  <th className="text-left px-5 py-3">ID</th>
                  <th className="text-left px-5 py-3">Environment</th>
                  <th className="text-left px-5 py-3">Stack</th>
                  <th className="text-right px-5 py-3">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-b border-foreground/5 last:border-0 hover:bg-background/60 transition">
                    <td className="px-5 py-3 text-foreground/60">{r.id}</td>
                    <td className="px-5 py-3 text-foreground">{r.env}</td>
                    <td className="px-5 py-3">
                      <span className="inline-block rounded-md border border-foreground/15 bg-background/70 px-2 py-0.5 text-xs">{r.stack}</span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <div className="h-1.5 w-20 rounded-full bg-foreground/10 overflow-hidden">
                          <div className="h-full bg-accent" style={{ width: `${r.diff * 100}%` }} />
                        </div>
                        <span className="text-foreground tabular-nums w-8 text-right">{r.diff.toFixed(1)}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl">
        
        <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-gradient text-balance max-w-4xl">
          Stop training on static benchmarks. Start training on the real world.
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="mailto:hello@classhopper.tech" className="rounded-full px-6 py-3 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition">
            Request Access
          </a>
          <Link to="/case-studies/classhopper-set" className="rounded-full px-6 py-3 border border-foreground/15 bg-background/85 backdrop-blur text-sm text-foreground hover:bg-background/95 transition">
            Read the Paper →
          </Link>
        </div>
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <ScrollBackground />
      <main className="relative z-10">
        <SiteNav />
        <Hero />
        <Features />
        <Environments />
        <CTA />
        <SiteFooter />
      </main>
    </>
  );
}
