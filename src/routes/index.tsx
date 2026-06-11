import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, ScrollBackground, SiteFooter } from "@/components/site-chrome";
import hudLogo from "@/assets/hudlogo.png";
import undockedLogo from "@/assets/undockedlgoo.avif";

function Partners() {
  return (
    <section id="partners" className="relative py-24 px-6 bg-background border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">Trusted by</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <a
            href="https://hud.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center py-12 min-h-[140px]"
          >
            <img
              src={hudLogo}
              alt="hud"
              className="max-h-14 w-auto object-contain brightness-0 invert opacity-50 group-hover:opacity-100 transition"
            />
          </a>
          <a
            href="https://www.undocked.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center py-12 min-h-[140px]"
          >
            <img
              src={undockedLogo}
              alt="Undocked"
              className="max-h-14 w-auto object-contain brightness-0 invert opacity-50 group-hover:opacity-100 transition"
            />
          </a>
        </div>
      </div>
    </section>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Transpira — An AI Lab Building Real-World RL Environments" },
      { name: "description", content: "Transpira is an AI lab building hyper-realistic reinforcement learning environments. We've delivered high-quality environments to frontier labs training the next generation of agents." },
      { property: "og:title", content: "Transpira — An AI Lab Building Real-World RL Environments" },
      { property: "og:description", content: "An AI lab delivering hyper-realistic RL environments to frontier labs." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});


function Hero() {
  return (
    <section className="relative min-h-screen flex items-center px-6">
      {/* Heavier dark overlay toward bottom so hero bleeds into page */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/40 via-background/70 to-background" />
      <div className="relative mx-auto max-w-7xl text-center w-full">
        <h1 className="font-display text-[clamp(2.75rem,6.5vw,5rem)] leading-[1.02] tracking-tight text-foreground text-balance">
          Train on <span className="text-accent-glacial">real</span> problems
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
          We're an AI Lab building reinforcement learning environments that mirror realistic workflows, using them to train the next generation of agents.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#environments"
            className="rounded-full px-5 py-3 border border-accent/60 text-accent text-sm hover:bg-accent/10 transition"
          >
            View environments
          </a>
        </div>
      </div>
    </section>
  );
}


function Features() {
  const features = [
    { label: "01", title: "Task Simulation", body: "Realistic environments that go beyond toy problems. Real systems, real complexity, real feedback." },
    { label: "02", title: "Configurable Chaos", body: "Inject realistic bugs, edge cases, and failure modes. Control difficulty and complexity at every level." },
    { label: "03", title: "Real Rewards", body: "Dense, meaningful reward signals derived from test results, code quality metrics, and runtime behavior." },
    { label: "04", title: "RL Integration", body: "First-class support for reinforcement learning pipelines. Gymnasium-compatible API with step, reset, and observe." },
  ];
  return (
    <section id="platform" className="relative py-24 px-6 bg-background border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/8 bg-surface p-7 transition hover:border-accent/60"
            >
              <div className="text-xs uppercase tracking-[0.2em] text-accent mb-3">{f.label}</div>
              <h3 className="font-display text-xl mb-3 text-foreground">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
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
  const diffColor = (d: number) =>
    d >= 0.8 ? "text-[color:var(--warning)]" : d >= 0.5 ? "text-foreground" : "text-muted-foreground";
  const diffBar = (d: number) =>
    d >= 0.8 ? "bg-[color:var(--warning)]" : d >= 0.5 ? "bg-foreground/80" : "bg-muted-foreground";

  return (
    <section id="environments" className="relative py-24 px-6 bg-background border-t border-white/5">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-tight tracking-tight text-foreground mb-12 max-w-3xl">
          Software Tasks Environment
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/8 mb-8">
          {stats.map((s) => (
            <div key={s.t} className="relative bg-surface p-6">
              <div className="absolute top-0 left-0 right-0 h-px bg-accent" />
              <div className="font-display text-3xl text-foreground">{s.k}</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground mt-2">{s.t}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/8 bg-surface overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono">
              <thead className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground bg-[oklch(0.10_0.008_240)]">
                <tr>
                  <th className="text-left px-5 py-3 font-medium">ID</th>
                  <th className="text-left px-5 py-3 font-medium">Environment</th>
                  <th className="text-left px-5 py-3 font-medium">Stack</th>
                  <th className="text-right px-5 py-3 font-medium">Difficulty</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr
                    key={r.id}
                    className={`${i % 2 === 0 ? "bg-surface" : "bg-[oklch(0.18_0.011_240)]"} hover:bg-surface-2 transition`}
                  >
                    <td className="px-5 py-3 text-muted-foreground">{r.id}</td>
                    <td className="px-5 py-3 text-foreground">{r.env}</td>
                    <td className="px-5 py-3">
                      <span className="inline-block rounded-md bg-accent/10 text-accent px-2 py-0.5 text-xs">
                        {r.stack}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <div className="h-1.5 w-20 rounded-full bg-white/8 overflow-hidden">
                          <div className={`h-full ${diffBar(r.diff)}`} style={{ width: `${r.diff * 100}%` }} />
                        </div>
                        <span className={`tabular-nums w-8 text-right ${diffColor(r.diff)}`}>{r.diff.toFixed(1)}</span>
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
    <section id="contact" className="relative py-32 px-6 border-t border-white/5">
      <div className="absolute inset-0 bg-[oklch(0.17_0.025_240)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="relative mx-auto max-w-5xl">
        <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1.05] tracking-tight text-foreground text-balance max-w-4xl">
          Stop training on static benchmarks. Start training on the real world.
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="mailto:adikrish6824@gmail.com"
            className="rounded-full px-6 py-3 bg-accent text-accent-foreground text-sm font-semibold hover:bg-accent/90 transition"
          >
            Request Access
          </a>
          <Link
            to="/case-studies/transpira-set"
            className="rounded-full px-6 py-3 border border-white/15 text-foreground/80 text-sm hover:text-foreground hover:border-white/30 transition"
          >
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
        <Partners />
        <CTA />
        <SiteFooter />
      </main>
    </>
  );
}
