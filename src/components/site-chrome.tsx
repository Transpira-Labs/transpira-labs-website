import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import mountainsBg from "@/assets/mountains.jpg";
import cavesBg from "@/assets/caves.jpg";
import classhopperLogo from "@/assets/classhopper.jpeg";

export function SiteNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-background/84 backdrop-blur-sm border-b border-foreground/10">
      <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
        <Link
          to="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-2 text-foreground"
        >
          <img src={classhopperLogo} alt="Classhopper logo" className="size-7 rounded-md object-cover shadow-sm" />

          <span className="font-display text-xl">Classhopper</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }}>
            Home
          </Link>
          <Link to="/case-studies" className="hover:text-foreground transition" activeProps={{ className: "text-foreground" }}>
            Case Studies
          </Link>
          <Link to="/about" className="hover:text-foreground transition" activeProps={{ className: "text-foreground" }}>
            About Us
          </Link>
        </nav>
        <a href={isHome ? "#contact" : "/#contact"} className="text-sm rounded-full px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition">
          Request Access
        </a>
      </div>
    </header>
  );
}

export function SolidBackground() {
  return <div className="fixed inset-0 z-0 bg-background" />;
}

export function ScrollBackground() {
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
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/65 to-background/85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,transparent_0%,oklch(0.96_0.018_82_/_0.40)_50%,oklch(0.96_0.018_82_/_0.70)_100%)]" />
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer id="company" className="border-t border-foreground/15 px-6 py-10 bg-background/84">
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground items-center">
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <div className="size-5 rounded-md bg-foreground/5 border border-foreground/15 grid place-items-center overflow-hidden">
            <img src={classhopperLogo} alt="" className="size-4 rounded-sm object-cover" />
          </div>
          <span className="font-display text-foreground">Classhopper</span>
          <span className="ml-3">© {new Date().getFullYear()}</span>
        </div>
        <div className="text-center text-foreground/70">Backed by <a href="https://fusen.world/" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition">Christopher Klaus</a></div>
        <div className="flex gap-6 justify-center md:justify-end">
          <Link to="/case-studies" className="hover:text-foreground transition">Case Studies</Link>
          <Link to="/about" className="hover:text-foreground transition">About</Link>
          <Link to="/privacy" className="hover:text-foreground transition">Privacy</Link>
          <a href="mailto:adikrish6824@gmail.com" className="hover:text-foreground transition">Contact</a>
        </div>
      </div>
    </footer>
  );
}
