import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import transpiraLogo from "@/assets/classhopper.jpeg";

export const PLATFORM_URL = "https://platform.transpiralabs.com";
export const BUILD_URL = "https://build.transpiralabs.com";
export const CONTACT_EMAIL = "adi@transpiralabs.com";

function ExternalArrow() {
  return (
    <svg viewBox="0 0 12 12" className="size-3 opacity-50" fill="none" aria-hidden="true">
      <path d="M3.5 8.5 L8.5 3.5 M4.5 3.5 H8.5 V7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Fades + lifts children into view on scroll — hud-style reveal. */
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""} ${className}`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const [y, setY] = useState(0);
  const [vh, setVh] = useState(0);
  useEffect(() => {
    const update = () => {
      setY(window.scrollY);
      setVh(window.innerHeight);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  const heroPassed = vh > 0 && y > vh - 110;
  // On the homepage the nav sits at the top of the dark hero and scrolls away
  // with the page (absolute), then drops back in (fixed, solid) on the light body.
  const fixedMode = !isHome || heroPassed;
  const overHero = isHome && !heroPassed;
  const brand = overHero ? "text-white" : "text-foreground";
  const link = overHero ? "text-white/75 hover:text-white" : "text-muted-foreground hover:text-foreground";
  return (
    <header
      className={`${fixedMode ? "fixed animate-nav-in" : "absolute"} top-0 inset-x-0 z-50 ${
        overHero ? "bg-transparent border-b border-transparent" : "bg-background/80 backdrop-blur-md border-b border-border"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className={`flex items-center gap-2.5 transition-colors ${brand}`}
        >
          <img src={transpiraLogo} alt="Transpira logo" className="size-7 rounded-md object-cover" />
          <span className="font-display text-lg font-semibold tracking-tight">Transpira</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          <Link to="/case-studies" className={`transition-colors ${link}`}>
            Research
          </Link>
          <Link to="/about" className={`transition-colors ${link}`}>
            About
          </Link>
          <a href={PLATFORM_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 transition-colors ${link}`}>
            Platform <ExternalArrow />
          </a>
          <a href={BUILD_URL} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 transition-colors ${link}`}>
            Build <ExternalArrow />
          </a>
        </nav>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="text-sm font-medium rounded-full px-4 py-1.5 bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Get in touch
        </a>
      </div>
    </header>
  );
}

/* Light backdrop: cool paper with a faint blueprint grid. */
export function SolidBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-background pointer-events-none">
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.225 0.013 262 / 0.03) 1px, transparent 1px), linear-gradient(90deg, oklch(0.225 0.013 262 / 0.03) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "radial-gradient(ellipse 90% 55% at 50% 0%, #000 35%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 55% at 50% 0%, #000 35%, transparent 78%)",
        }}
      />
    </div>
  );
}

// Backwards-compatible alias — the homepage manages its own hero backdrop.
export const ScrollBackground = SolidBackground;

export function SiteFooter() {
  return (
    <footer id="company" className="relative border-t border-border px-6 py-14 bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div>
            <div className="flex items-center gap-2.5 text-foreground">
              <img src={transpiraLogo} alt="Transpira logo" className="size-6 rounded-md object-cover" />
              <span className="font-display font-semibold">Transpira Labs</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Reinforcement-learning environments for supply-chain and operations agents.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-2.5 text-sm">
            <a href={PLATFORM_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Platform</a>
            <Link to="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors">Research</Link>
            <a href={BUILD_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Build</a>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
          <span className="font-mono">© {new Date().getFullYear()} Transpira Labs</span>
          <span>
            Backed by{" "}
            <a href="https://fusen.world/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground underline underline-offset-2 transition-colors">
              Fusen World
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
