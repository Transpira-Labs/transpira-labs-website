import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import logo from "@/assets/transpira-logo.png";
import { CAL_URL } from "@/components/site-chrome";

type Page = "home" | "walkthrough" | "about";

/* The real mark, sized by its box. Decorative wherever the name sits beside it. */
export function Mark({ size, alt = "" }: { size: number; alt?: string }) {
  return <img src={logo} alt={alt} width={size} height={size} style={{ display: "block" }} />;
}

export function Arrow({ stroke = "#ffffff" }: { stroke?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

function NavLinks({ current, onPick }: { current: Page; onPick?: () => void }) {
  return (
    <>
      <Link to="/" hash="agent" className="mf-nav-link" onClick={onPick}>
        Text agent
      </Link>
      <Link to="/" hash="how" className="mf-nav-link" onClick={onPick}>
        How it works
      </Link>
      <Link to="/" hash="pricing" className="mf-nav-link" onClick={onPick}>
        Pricing
      </Link>
      <Link
        to="/walkthrough"
        className="mf-nav-link"
        data-here={current === "walkthrough"}
        onClick={onPick}
      >
        Walkthrough
      </Link>
      <Link to="/about" className="mf-nav-link" data-here={current === "about"} onClick={onPick}>
        About
      </Link>
    </>
  );
}

export function Nav({ current }: { current: Page }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="mf-nav">
      <div className="mf-wrap">
        <div className="mf-nav-in">
          <Link to="/" className="mf-brand">
            <Mark size={30} />
            MANIFEST
          </Link>
          <nav aria-label="Main" className="mf-nav-links">
            <NavLinks current={current} />
          </nav>
          <div className="mf-nav-end">
            <a href={CAL_URL} target="_blank" rel="noreferrer" className="mf-btn">
              Book a call
            </a>
            <button
              type="button"
              className="mf-menu-btn"
              aria-expanded={open}
              aria-controls="mf-menu"
              onClick={() => setOpen(!open)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        <nav id="mf-menu" aria-label="Menu" className="mf-menu" data-open={open}>
          <NavLinks current={current} onPick={() => setOpen(false)} />
        </nav>
      </div>
    </header>
  );
}

export function Footer({ note }: { note?: string }) {
  return (
    <footer className="mf-wrap">
      <div className="mf-foot">
        <span className="mf-mark-disc">
          <Mark size={32} alt="Manifest" />
        </span>
        <nav aria-label="Footer">
          <Link to="/walkthrough">Walkthrough</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
        </nav>
        <p>© 2026 Transpira Labs.{note ? ` ${note}` : ""}</p>
      </div>
    </footer>
  );
}

/* A full-width photo with a dark shade over it and content on top. */
export function PhotoBand({
  src,
  shade,
  position,
  children,
}: {
  src: string;
  shade: number;
  position?: string;
  children: ReactNode;
}) {
  return (
    <section className="mf-band mf-dark">
      <img src={src} alt="" className="mf-band-img" style={{ objectPosition: position }} />
      <div
        aria-hidden="true"
        className="mf-band-shade"
        style={{ ["--mf-shade" as string]: shade }}
      />
      <div className="mf-band-in mf-wrap">{children}</div>
    </section>
  );
}

/* The closing email field. It opens the booking page with the address filled in. */
export function BookForm() {
  const [email, setEmail] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const v = email.trim();
    window.open(
      v ? `${CAL_URL}?email=${encodeURIComponent(v)}` : CAL_URL,
      "_blank",
      "noopener,noreferrer",
    );
  };
  return (
    <form className="mf-form" onSubmit={submit}>
      <label htmlFor="mf-email">Book a 20-minute call</label>
      <div className="mf-field">
        <input
          id="mf-email"
          type="email"
          autoComplete="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="mf-btn mf-btn--amber">
          Book a call
        </button>
      </div>
      <p>Opens our booking page with your email filled in.</p>
    </form>
  );
}
