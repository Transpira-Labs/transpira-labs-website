import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import mountainsBg from "@/assets/mountains.jpg";
import cavesBg from "@/assets/caves.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Classhopper Tech — Reinforcement Learning for Supply Chains" },
      { name: "description", content: "Classhopper Tech builds reinforcement learning systems that turn complex supply chains into autonomous, self-optimizing networks." },
      { property: "og:title", content: "Classhopper Tech — RL for Supply Chains" },
      { property: "og:description", content: "Reinforcement learning systems that turn complex supply chains into autonomous, self-optimizing networks." },
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
          <span className="font-display text-xl">Classhopper</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#platform" className="hover:text-foreground transition">Platform</a>
          <a href="#applications" className="hover:text-foreground transition">Applications</a>
          <a href="#research" className="hover:text-foreground transition">Research</a>
          <a href="#company" className="hover:text-foreground transition">Company</a>
        </nav>
        <a href="#contact" className="text-sm rounded-full px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition">
          Get in touch
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
            Reinforcement learning for the physical economy
          </div>
          <h1 className="mt-8 font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.05] tracking-tight text-gradient text-balance">
            Teaching machines to run the world's supply chains.
          </h1>

          <p className="mt-8 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Classhopper Tech trains autonomous decision systems that learn to plan, route, and optimize global logistics — turning brittle pipelines into adaptive, self-improving networks.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#platform" className="rounded-full px-5 py-3 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition">
              Explore the platform
            </a>
            <a href="#research" className="rounded-full px-5 py-3 border border-foreground/15 bg-background/85 backdrop-blur text-sm text-foreground hover:bg-background/95 transition">
              Read our research →
            </a>
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
    { title: "Simulated environments", body: "High-fidelity digital twins of warehouses, fleets, and trade lanes where agents learn from billions of synthetic interactions." },
    { title: "Self-improving policies", body: "RL agents that continuously refine routing, inventory, and scheduling decisions against live operational data." },
    { title: "Safe deployment", body: "Constraint-aware training and human-in-the-loop guardrails ensure agents respect SLAs, cost ceilings, and physical limits." },
  ];
  return (
    <Section id="platform" eyebrow="Platform" title="An RL foundation built for operations.">
      <div className="grid md:grid-cols-3 gap-5">
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

function Applications() {
  const apps = [
    { k: "01", t: "Network optimization", d: "Multi-echelon inventory and lane planning across global networks." },
    { k: "02", t: "Dynamic routing", d: "Real-time dispatch and re-routing under disruption and demand shocks." },
    { k: "03", t: "Procurement agents", d: "Autonomous sourcing strategies that adapt to price, lead time, and risk." },
    { k: "04", t: "Warehouse orchestration", d: "Coordinated task allocation across humans, robots, and equipment." },
  ];
  return (
    <Section id="applications" eyebrow="Applications" title="Built for the messy reality of supply chains.">
      <div className="grid md:grid-cols-2 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/15 backdrop-blur-md shadow-sm">
        {apps.map((a) => (
          <div key={a.k} className="bg-card p-10 hover:bg-background transition">
            <div className="text-xs text-foreground/60 font-mono mb-4">{a.k}</div>
            <h3 className="font-display text-3xl mb-3 text-foreground">{a.t}</h3>
            <p className="text-foreground/80 leading-relaxed">{a.d}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Research() {
  return (
    <Section id="research" eyebrow="Research" title="Pushing the frontier of decision intelligence.">
      <div className="grid md:grid-cols-3 gap-8 text-sm">
        {[
          { t: "Offline-to-online RL", d: "Bridging historical operational data with live policy improvement." },
          { t: "Hierarchical agents", d: "Composing strategic, tactical, and execution-level controllers." },
          { t: "World models for logistics", d: "Learning predictive simulators of demand, capacity, and disruption." },
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
        <h2 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-gradient text-balance">
          Let's build the autonomous supply chain.
        </h2>
        <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
          We partner with operators, manufacturers, and logistics leaders ready to deploy learning systems at scale.
        </p>
        <a href="mailto:hello@classhopper.tech" className="inline-block mt-10 rounded-full px-6 py-3 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition">
          hello@classhopper.tech
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="company" className="border-t border-foreground/15 px-6 py-10">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="size-5 rounded-md bg-foreground/5 border border-foreground/15 grid place-items-center">
            <div className="size-1.5 rounded-sm bg-accent" />
          </div>
          <span className="font-display text-foreground">Classhopper Tech</span>
          <span className="ml-3">© {new Date().getFullYear()}</span>
        </div>
        <div className="flex gap-6">
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
        <Applications />
        <Research />
        <CTA />
        <Footer />
      </main>
    </>
  );
}
