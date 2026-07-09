import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import transpiraLogo from "@/assets/classhopper.jpeg";

export const DEMO_URL = "https://demo.transpiralabs.com";
export const PLATFORM_URL = "https://platform.transpiralabs.com";
export const BUILD_URL = "https://build.transpiralabs.com";
export const CONTACT_EMAIL = "team@transpiralabs.com";
export const CAL_URL = "https://cal.com/adi-krish";

function ExternalArrow() {
  return (
    <svg viewBox="0 0 12 12" className="size-3 opacity-50" fill="none" aria-hidden="true">
      <path d="M3.5 8.5 L8.5 3.5 M4.5 3.5 H8.5 V7.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Fades + lifts children into view on scroll (hud-style reveal). */
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
    // Anything already in the viewport on first paint reveals immediately;
    // the scroll-triggered threshold below would otherwise leave partially
    // visible content hidden until the user scrolls.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
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

/* Screenshot frame with browser chrome. Renders a "Screenshot coming soon"
   placeholder until an <img> child is passed. */
export function ImageFrame({
  url,
  href,
  label,
  children,
}: {
  url: string;
  href?: string;
  label: string;
  children?: ReactNode;
}) {
  const frame = (
    <>
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-4 py-2.5 transition-colors group-hover:bg-accent/15">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-mono text-[0.65rem] text-muted-foreground transition-colors group-hover:text-accent">{url}</span>
      </div>
      {children ?? (
        <div
          className="relative grid aspect-[16/10] place-items-center bg-secondary"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.225 0.013 262 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(0.225 0.013 262 / 0.04) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        >
          <div className="text-center">
            <div className="mx-auto mb-3 grid size-11 place-items-center rounded-xl border border-dashed border-input text-muted-foreground">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
                <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
                <path d="M4 17l5-5 4 4 3-3 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
            <div className="mt-1 text-[0.7rem] text-muted-foreground/70">Screenshot coming soon</div>
          </div>
        </div>
      )}
    </>
  );
  const frameClass = "overflow-hidden rounded-2xl border border-border bg-card soft-shadow";
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`group block ${frameClass} transition-colors hover:border-accent/50`}
      >
        {frame}
      </a>
    );
  }
  return <div className={frameClass}>{frame}</div>;
}

export function FeatureRow({
  flip,
  kicker,
  title,
  body,
  imgUrl,
  imgHref,
  imgLabel,
  img,
}: {
  flip?: boolean;
  kicker?: string;
  title: string;
  body: string;
  imgUrl: string;
  imgHref?: string;
  imgLabel: string;
  img?: string;
}) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-14">
      <Reveal className={flip ? "md:order-2" : undefined}>
        <ImageFrame url={imgUrl} href={imgHref} label={imgLabel}>
          {img ? <img src={img} alt={imgLabel} className="block w-full" /> : undefined}
        </ImageFrame>
      </Reveal>
      <Reveal delay={100} className={flip ? "md:order-1" : undefined}>
        {kicker ? (
          <div className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-accent">{kicker}</div>
        ) : null}
        <h4 className="font-display text-[clamp(1.3rem,2.2vw,1.65rem)] tracking-tight text-foreground">{title}</h4>
        <p className="mt-3 text-muted-foreground leading-relaxed">{body}</p>
      </Reveal>
    </div>
  );
}

/* The inner bar, shared by the transparent hero nav and the solid sticky nav. */
function NavBar({ isHome, overHero }: { isHome: boolean; overHero: boolean }) {
  const brand = overHero ? "text-white" : "text-foreground";
  const link = overHero ? "text-white/75 hover:text-white" : "text-muted-foreground hover:text-foreground";
  return (
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
        <Link to="/contact" className={`transition-colors ${link}`}>
          Contact
        </Link>
      </nav>

      <a
        href={DEMO_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium rounded-full px-4 py-1.5 bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
      >
        Try our Demo <ExternalArrow />
      </a>
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
  // The homepage hero is 82svh tall; swap the sticky nav in as it scrolls past.
  const heroPassed = vh > 0 && y > vh * 0.82 - 110;
  // On the homepage the nav sits at the top of the dark hero and scrolls away
  // with the page (absolute), then the solid sticky nav slides in on the light body.
  // The sticky nav is always mounted so it can transition *out* smoothly when
  // scrolling back up, rather than snapping away.
  const showSticky = !isHome || heroPassed;
  return (
    <>
      {isHome && (
        <header className="absolute top-0 inset-x-0 z-50 bg-transparent">
          <NavBar isHome overHero />
        </header>
      )}
      <header
        className={`fixed top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300 ease-out will-change-transform ${
          showSticky ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        aria-hidden={showSticky ? undefined : true}
      >
        <NavBar isHome={isHome} overHero={false} />
      </header>
    </>
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

// Backwards-compatible alias; the homepage manages its own hero backdrop.
export const ScrollBackground = SolidBackground;

export function SiteFooter() {
  return (
    <footer id="company" className="relative border-t border-border px-6 py-10 bg-background">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
          <div>
            <div className="flex items-center gap-2.5 text-foreground">
              <img src={transpiraLogo} alt="Transpira logo" className="size-6 rounded-md object-cover" />
              <span className="font-display font-semibold">Transpira Labs</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground max-w-xs leading-relaxed">
              Every system. One answer. Root cause in minutes, on your own network.
            </p>
            <div className="mt-6 flex flex-col gap-1 text-xs text-muted-foreground">
              <span className="font-mono">© {new Date().getFullYear()} Transpira Labs</span>
              <span>
                Backed by{" "}
                <a href="https://fusen.world/" target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground underline underline-offset-2 transition-colors">
                  Fusen World
                </a>
              </span>
            </div>
          </div>

          <div className="flex gap-12 text-sm sm:gap-20">
            <div>
              <div className="font-display text-[0.78rem] font-bold uppercase tracking-[0.15em] text-foreground">Explore</div>
              <div className="mt-3 grid grid-cols-2 gap-x-10 gap-y-2">
                <a href={DEMO_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Demo</a>
                <a href={PLATFORM_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Platform</a>
                <a href={BUILD_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Build</a>
                <Link to="/case-studies" className="text-muted-foreground hover:text-foreground transition-colors">Research</Link>
                <Link to="/environments" className="text-muted-foreground hover:text-foreground transition-colors">Environments</Link>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
              </div>
            </div>
            <div>
              <div className="font-display text-[0.78rem] font-bold uppercase tracking-[0.15em] text-foreground">Contact</div>
              <div className="mt-3 flex flex-col gap-2">
                <a href={CAL_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Book a call</a>
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted-foreground hover:text-foreground transition-colors">{CONTACT_EMAIL}</a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
