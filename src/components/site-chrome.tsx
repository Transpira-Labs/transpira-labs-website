import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import transpiraLogo from "@/assets/transpira-logo.png";

export const DEMO_URL = "https://quoting.transpiralabs.com";
export const PLATFORM_URL = "https://platform.transpiralabs.com";
export const BUILD_URL = "https://build.transpiralabs.com";
export const CONTACT_EMAIL = "adi@transpiralabs.com";
export const CAL_URL = "https://cal.com/adi-krish";

/* Button recipes shared across pages. */
export const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-forest px-7 py-3.5 text-base font-semibold text-white no-underline transition-colors hover:bg-[#3a806d]";
export const BTN_GHOST =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-7 py-3.5 text-base font-medium text-white no-underline transition-colors hover:bg-white/5";

/* The four top-level tabs from the design. */
const TABS = [
  { to: "/", label: "Walkthrough" },
  { to: "/pricing", label: "Pricing" },
  { to: "/company", label: "Company" },
] as const;

/* Pages that live under the Company tab, so the tab stays lit while you read them. */
const COMPANY_PATHS = [
  "/company",
  "/about",
  "/case-studies",
  "/contact",
  "/environments",
  "/privacy",
];

function ExternalArrow() {
  return (
    <svg viewBox="0 0 12 12" className="size-3 opacity-60" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5 L8.5 3.5 M4.5 3.5 H8.5 V7.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Fades + lifts children into view on scroll. */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
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
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
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
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-4 py-2.5 transition-colors group-hover:bg-forest/20">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate font-mono text-[0.65rem] text-muted-foreground transition-colors group-hover:text-mint">
          {url}
        </span>
      </div>
      {children ?? (
        <div
          className="relative grid aspect-[16/10] place-items-center bg-secondary"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        >
          <div className="text-center">
            <div className="mx-auto mb-3 grid size-11 place-items-center rounded-xl border border-dashed border-input text-muted-foreground">
              <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="16"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <circle cx="8.5" cy="9.5" r="1.5" fill="currentColor" />
                <path
                  d="M4 17l5-5 4 4 3-3 4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">
              {label}
            </div>
            <div className="mt-1 text-[0.7rem] text-muted-foreground/70">
              Screenshot coming soon
            </div>
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
        className={`group block ${frameClass} transition-colors hover:border-mint/50`}
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
        {kicker ? <div className="eyebrow mb-3">{kicker}</div> : null}
        <h4 className="font-display text-[clamp(1.3rem,2.2vw,1.65rem)] text-foreground">{title}</h4>
        <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
      </Reveal>
    </div>
  );
}

/* Centered page opener used by the tab pages and the Company sub-pages. */
export function PageIntro({
  eyebrow,
  title,
  body,
  light,
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  body?: ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex max-w-[900px] flex-col gap-4 text-center ${className}`}>
      <p className={light ? "eyebrow-ink m-0" : "eyebrow m-0"}>{eyebrow}</p>
      <h1
        className={`m-0 font-display text-[clamp(2.25rem,6vw,5.5rem)] leading-[1.02] text-balance ${
          light ? "text-ink" : "text-white"
        }`}
      >
        {title}
      </h1>
      {body ? (
        <p
          className={`m-0 text-[clamp(1.0625rem,2vw,1.375rem)] leading-[1.45] text-pretty ${
            light ? "text-ink-muted" : "text-fog"
          }`}
        >
          {body}
        </p>
      ) : null}
    </div>
  );
}

/* Bordered tile with a title and a one-line description; links internally or out. */
export function LinkCard({
  to,
  href,
  title,
  desc,
}: {
  to?: string;
  href?: string;
  title: string;
  desc: string;
}) {
  const cls =
    "flex flex-col gap-1.5 rounded-xl border border-white/15 p-5 text-white no-underline transition-colors hover:border-mint/60 hover:bg-white/[0.03] sm:p-6";
  const inner = (
    <>
      <span className="flex items-center gap-2 text-lg font-semibold">
        {title}
        {href ? <ExternalArrow /> : null}
      </span>
      <span className="text-sm text-fog">{desc}</span>
    </>
  );
  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noreferrer"
        className={cls}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link to={to ?? "/"} className={cls}>
      {inner}
    </Link>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex shrink-0 items-center gap-2.5 text-white no-underline">
      <img src={transpiraLogo} alt="Transpira logo" className="size-7 rounded-md object-cover" />
      <span className="flex items-baseline gap-1.5">
        <span className="text-base font-semibold tracking-[-0.01em]">Manifest</span>
        <span className="hidden text-xs text-fog sm:inline">by Transpira</span>
      </span>
    </Link>
  );
}

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  // Close the phone menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the phone menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const isActive = (to: string) =>
    to === "/company"
      ? COMPANY_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"))
      : pathname === to;

  const tabClass = (active: boolean) =>
    `whitespace-nowrap rounded-md px-3 py-[7px] text-sm font-medium no-underline transition-colors ${
      active ? "bg-white/12 text-white" : "text-fog hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[rgba(27,36,32,0.85)] backdrop-blur-[10px]">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-4 px-4 sm:px-6">
        <Brand />

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex"
          aria-label="Primary"
        >
          {TABS.map((t) => (
            <Link key={t.to} to={t.to} className={tabClass(isActive(t.to))}>
              {t.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            className="whitespace-nowrap rounded-md bg-forest px-3.5 py-2 text-sm font-medium text-white no-underline transition-colors hover:bg-[#3a806d]"
          >
            Book a call
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-md text-white transition-colors hover:bg-white/8 md:hidden"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Phone menu: full-width sheet under the bar. */}
      <div
        id="mobile-nav"
        className={`md:hidden ${open ? "block" : "hidden"} border-t border-white/8 bg-[#1b2420]`}
      >
        <nav
          className="mx-auto flex max-w-[1400px] flex-col px-4 py-3 sm:px-6"
          aria-label="Primary (mobile)"
        >
          {TABS.map((t) => (
            <Link
              key={t.to}
              to={t.to}
              className={`rounded-md px-3 py-3 text-base font-medium no-underline ${
                isActive(t.to) ? "bg-white/12 text-white" : "text-fog"
              }`}
            >
              {t.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-white/8 pt-2">
            <div className="px-3 pb-1 pt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
              Company
            </div>
            <Link
              to="/case-studies"
              className="block rounded-md px-3 py-2.5 text-[15px] text-fog no-underline"
            >
              Our research
            </Link>
            <Link
              to="/about"
              className="block rounded-md px-3 py-2.5 text-[15px] text-fog no-underline"
            >
              About
            </Link>
            <Link
              to="/environments"
              className="block rounded-md px-3 py-2.5 text-[15px] text-fog no-underline"
            >
              Environments
            </Link>
            <Link
              to="/contact"
              className="block rounded-md px-3 py-2.5 text-[15px] text-fog no-underline"
            >
              Contact
            </Link>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-md px-3 py-2.5 text-[15px] text-fog no-underline"
            >
              Live demo <ExternalArrow />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* Kept for pages that mount it; the dark page background is now the body itself. */
export function SolidBackground() {
  return <div className="pointer-events-none fixed inset-0 z-0 bg-background" aria-hidden="true" />;
}

// Backwards-compatible alias.
export const ScrollBackground = SolidBackground;

export function SiteFooter() {
  const linkCls = "text-mint no-underline transition-colors hover:text-white";
  return (
    <footer className="border-t border-white/8 px-4 py-7 text-[13px] text-ink-faint sm:px-6">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <span className="flex items-center gap-2.5">
          <img src={transpiraLogo} alt="Transpira logo" className="size-5 rounded object-cover" />
          <span>
            Manifest by Transpira Labs · © {new Date().getFullYear()} · Backed by{" "}
            <a href="https://fusen.world/" target="_blank" rel="noreferrer" className={linkCls}>
              Fusen World
            </a>
          </span>
        </span>
        <span className="flex flex-wrap gap-x-[18px] gap-y-2">
          <Link to="/case-studies" className={linkCls}>
            Research
          </Link>
          <Link to="/about" className={linkCls}>
            About
          </Link>
          <Link to="/environments" className={linkCls}>
            Environments
          </Link>
          <Link to="/contact" className={linkCls}>
            Contact
          </Link>
          <Link to="/privacy" className={linkCls}>
            Privacy
          </Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className={linkCls}>
            {CONTACT_EMAIL}
          </a>
        </span>
      </div>
    </footer>
  );
}
