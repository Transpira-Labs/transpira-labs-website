import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import mountainsBg from "@/assets/mountains.jpg";
import cavesBg from "@/assets/caves.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Holtzman — Hyper-realistic RL Environments" },
      { name: "description", content: "Holtzman builds hyper-realistic reinforcement learning environments that simulate real-world software tasks. Train agents on problems that actually matter." },
      { property: "og:title", content: "Holtzman — Train on Real Problems" },
      { property: "og:description", content: "Hyper-realistic RL environments simulating real-world scenarios for training capable agents." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 text-foreground"
        >
          <div className="size-7 rounded-md bg-background/80 backdrop-blur border border-foreground/15 grid place-items-center shadow-sm">
            <div className="size-2 rounded-sm bg-accent" />
          </div>
          <span className="font-display text-xl">Holtzman</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#platform" className="hover:text-foreground transition">Platform</a>
          <a href="#environments" className="hover:text-foreground transition">Environments</a>
          <a href="#research" className="hover:text-foreground transition">Research</a>
          <a href="#company" className="hover:text-foreground transition">Company</a>
        </nav>
        <a href="#contact" className="text-sm rounded-full px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition">
          Request access
        </a>
      </div>
    </header>
  );
}

function ScrollBackground() {
  const caveRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    let raf = 0;
    let currentOpacity = 0;
    let targetOpacity = 0;

    const getScrollProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const update = () => {
      const delta = targetOpacity - currentOpacity;
      if (Math.abs(delta) < 0.001) {
        currentOpacity = targetOpacity;
        raf = 0;
      } else {
        currentOpacity += delta * 0.18;
        raf = requestAnimationFrame(update);
      }
      if (caveRef.current) caveRef.current.style.opacity = String(currentOpacity);
    };

    const onScroll = () => {
      targetOpacity = getScrollProgress();
      if (!raf) raf = requestAnimationFrame(update);
    };

    currentOpacity = getScrollProgress();
    targetOpacity = currentOpacity;
    if (caveRef.current) caveRef.current.style.opacity = String(currentOpacity);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <img src={mountainsBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <img ref={caveRef} src={cavesBg} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0, willChange: "opacity" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/55 to-background/75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,transparent_0%,oklch(0.96_0.018_82_/_0.25)_50%,oklch(0.96_0.018_82_/_0.55)_100%)]" />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-6 pt-44 pb-32">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/85 backdrop-blur px-3 py-1 text-xs text-muted-foreground shadow-sm">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            01 — v2.4.0 stable
          </div>
          <h1 className="mt-8 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-tight text-gradient text-balance">
            Train on real problems.
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Hyper-realistic RL environments that simulate real-world scenarios. Train agents on tasks that actually matter.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#environments" className="rounded-full px-5 py-3 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition">
              View environments
            </a>
            <a href="#research" className="rounded-full px-5 py-3 border border-foreground/15 bg-background/85 backdrop-blur text-sm text-foreground hover:bg-background/95 transition">
              Read the paper →
            </a>
          </div>

          <div className="mt-14 max-w-2xl rounded-2xl border border-foreground/15 bg-background/90 backdrop-blur-md shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-foreground/10 text-xs font-mono text-foreground/60">
              <span>agent_session.py</span>
              <div className="flex gap-1.5">
                <span className="size-2 rounded-full bg-foreground/20" />
                <span className="size-2 rounded-full bg-foreground/20" />
                <span className="size-2 rounded-full bg-accent" />
              </div>
            </div>
            <pre className="px-5 py-4 text-xs md:text-sm font-mono text-foreground leading-relaxed overflow-x-auto">
{`> agent.observe()
  heap: 142MB | gc_cycles: 3
  test_status: FAILING (2/47)

> agent.act("fix_haversine")
  reward: +0.84   step: 127/1280

> env.evaluate()
  tests_passing: 47/47 ✓`}
            </pre>
            <div className="grid grid-cols-3 gap-px bg-foreground/10 border-t border-foreground/10 text-xs font-mono">
              <div className="bg-background/80 px-4 py-3"><span className="text-foreground/60">reward</span> <span className="text-foreground">+0.84</span></div>
              <div className="bg-background/80 px-4 py-3"><span className="text-foreground/60">step</span> <span className="text-foreground">127</span></div>
              <div className="bg-background/80 px-4 py-3"><span className="text-foreground/60">heap</span> <span className="text-foreground">142MB</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Section({ id, eyebrow, title, children }: { id?: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl mb-16">
          <div className="text-xs uppercase tracking-[0.2em] text-accent mb-4">{eyebrow}</div>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1.1] tracking-tight text-gradient text-balance">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function Platform() {
  const features = [
    { title: "Task simulation", body: "Realistic environments that go beyond toy problems. Real systems, real complexity, real feedback." },
    { title: "Configurable chaos", body: "Inject realistic bugs, edge cases, and failure modes. Control difficulty and complexity at every level." },
    { title: "Real rewards", body: "Dense, meaningful reward signals derived from test results, code quality metrics, and runtime behavior." },
    { title: "RL integration", body: "First-class support for reinforcement learning pipelines. Gymnasium-compatible API with step, reset, and observe." },
  ];
  return (
    <Section id="platform" eyebrow="02 — Platform" title="An RL foundation built for real software.">
      <div className="grid md:grid-cols-2 gap-5">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-foreground/15 bg-card backdrop-blur-md p-7 hover:bg-background/95 transition shadow-sm">
            <div className="size-9 rounded-lg bg-accent/15 border border-accent/25 grid place-items-center mb-6">
              <div className="size-2 rounded-sm bg-accent" />
            </div>
            <h3 className="font-display text-2xl mb-3 text-foreground">{f.title}</h3>
            <p className="text-sm text-foreground/80 leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Environments() {
  const stats = [
    { k: "44", t: "Backend bugs" },
    { k: "35", t: "Frontend bugs" },
    { k: "21", t: "Cross-stack" },
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
    <Section id="environments" eyebrow="03 — Environments" title="Software tasks environment.">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/15 backdrop-blur-md shadow-sm mb-8">
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
    </Section>
  );
}

function Research() {
  return (
    <Section id="research" eyebrow="Research" title="Pushing the frontier of agent training.">
      <div className="grid md:grid-cols-3 gap-8 text-sm">
        {[
          { t: "Realistic bug injection", d: "Synthesized faults grounded in real production failure modes, not synthetic puzzles." },
          { t: "Dense reward design", d: "Reward signals from tests, runtime behavior, and code quality — not just final answers." },
          { t: "Cross-stack reasoning", d: "Environments that span backend, frontend, and API contracts to test full-system competence." },
        ].map((r) => (
          <div key={r.t} className="rounded-2xl border border-foreground/15 bg-card backdrop-blur-md p-6 shadow-sm">
            <h3 className="font-display text-xl mb-2 text-foreground">{r.t}</h3>
            <p className="text-foreground/80 leading-relaxed">{r.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function CTA() {
  return (
    <section id="contact" className="relative py-40 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <div className="text-xs uppercase tracking-[0.2em] text-accent mb-6">04</div>
        <h2 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-gradient text-balance">
          Stop training on static benchmarks. Start training on the real world.
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a href="mailto:hello@holtzman.xyz" className="rounded-full px-6 py-3 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition">
            Request access
          </a>
          <a href="#research" className="rounded-full px-6 py-3 border border-foreground/15 bg-background/85 backdrop-blur text-sm text-foreground hover:bg-background/95 transition">
            Read the paper →
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="company" className="border-t border-foreground/15 px-6 py-10">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground items-center">
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <div className="size-5 rounded-md bg-foreground/5 border border-foreground/15 grid place-items-center">
            <div className="size-1.5 rounded-sm bg-accent" />
          </div>
          <span className="font-display text-foreground">Holtzman</span>
          <span className="ml-3">© {new Date().getFullYear()}</span>
        </div>
        <div className="text-center text-foreground/70">Backed by Christopher Klaus</div>
        <div className="flex gap-6 justify-center md:justify-end">
          <a href="#" className="hover:text-foreground transition">Careers</a>
          <a href="#" className="hover:text-foreground transition">Privacy</a>
          <a href="#" className="hover:text-foreground transition">Terms</a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <>
      <ScrollBackground />
      <main className="relative z-10">
        <Nav />
        <Hero />
        <Platform />
        <Environments />
        <Research />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
