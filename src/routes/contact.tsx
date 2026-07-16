import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  SiteNav,
  SiteFooter,
  SolidBackground,
  Reveal,
  CONTACT_EMAIL,
  CAL_URL,
  DEMO_URL,
} from "@/components/site-chrome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Transpira" },
      { name: "description", content: "Get in touch with Transpira Labs: email us or book a meeting." },
      { property: "og:title", content: "Contact | Transpira" },
      { property: "og:description", content: "Get in touch with Transpira Labs: email us or book a meeting." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen">
      <SolidBackground />
      <SiteNav />
      <main className="relative z-10 pt-28 pb-24 px-6">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="eyebrow">Contact</div>
            <h1 className="mt-4 font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] tracking-tight text-foreground">
              Running supply chain operations?
              <br />
              Let's talk.
            </h1>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Whether you want a walkthrough of Manifest, have a question about our research, or
              just want to compare notes on your operations, we'd love to hear from you.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <Reveal>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-9 soft-shadow transition hover:border-accent/50 hover:bg-secondary/40"
              >
                <div className="grid size-11 place-items-center rounded-xl border border-border text-accent">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
                    <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h2 className="mt-5 font-display text-xl tracking-tight text-foreground">Email us</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                  Feel free to reach out with product questions, partnerships, research, or any other questions. We'd love to talk about anything supply-chain.
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  <span className="font-mono">{CONTACT_EMAIL}</span>
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </a>
            </Reveal>

            <Reveal delay={120}>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 sm:p-9 soft-shadow transition hover:border-accent/50 hover:bg-secondary/40"
              >
                <div className="grid size-11 place-items-center rounded-xl border border-border text-accent">
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
                    <rect x="3" y="4.5" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M3 9h18M8 2.5v4M16 2.5v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </div>
                <h2 className="mt-5 font-display text-xl tracking-tight text-foreground">Book a meeting</h2>
                <p className="mt-2 flex-1 text-sm text-muted-foreground leading-relaxed">
                  Grab time directly on our calendar for a live walkthrough of Manifest and a
                  conversation about your operations.
                </p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                  Pick a time
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </div>
              </a>
            </Reveal>
          </div>

          <Reveal delay={80}>
            <div className="mt-20 flex flex-col gap-6 rounded-2xl border border-accent/30 bg-accent/[0.07] p-6 sm:p-9 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="font-display text-xl tracking-tight text-foreground">Prefer to explore on your own first?</h2>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground leading-relaxed">
                  Try the demo of Manifest, or read our research on
                  supply-chain agents.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full px-5 py-2.5 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
                >
                  Try our Demo
                </a>
                <Link
                  to="/case-studies"
                  className="rounded-full px-5 py-2.5 border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
                >
                  Read the research
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
