import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import mark from "@/assets/manifest-mark.png";
import { CAL_URL } from "@/components/site-chrome";

type Page = "home" | "walkthrough" | "about" | "other";

/* The real mark, sized by its box. Decorative wherever the name sits beside it. */
export function Mark({ size, alt = "" }: { size: number; alt?: string }) {
  return <img src={mark} alt={alt} width={size} height={size} style={{ display: "block" }} />;
}

/* The mark on a white disc, for a contact's picture in a thread. */
export function Avatar({ size }: { size: number }) {
  return (
    <span className="mf-disc" style={{ width: size, height: size }}>
      <Mark size={Math.round(size * 0.72)} />
    </span>
  );
}

export function Arrow() {
  return (
    <span className="mf-arrow" aria-hidden="true">
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 5l7 7-7 7" />
      </svg>
    </span>
  );
}

/* The one call to action on the site. It has one name everywhere. */
export function BookCall({ light = false }: { light?: boolean }) {
  return (
    <a
      href={CAL_URL}
      target="_blank"
      rel="noreferrer"
      className={light ? "mf-btn mf-btn--light" : "mf-btn"}
    >
      Book a call
    </a>
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
            Manifest
          </Link>
          <nav aria-label="Main" className="mf-nav-links">
            <NavLinks current={current} />
          </nav>
          <div className="mf-nav-end">
            <BookCall />
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
    <footer className="mf-dark">
      <div className="mf-wrap">
        <div className="mf-foot">
          <Avatar size={44} />
          <nav aria-label="Footer">
            <Link to="/">Home</Link>
            <Link to="/walkthrough">Walkthrough</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/terms">Terms</Link>
          </nav>
          <p>© 2026 Transpira Labs.{note ? ` ${note}` : ""}</p>
        </div>
      </div>
    </footer>
  );
}

/* The closing email field. It opens the booking page with the address filled in. */
function BookForm() {
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
      <label htmlFor="mf-email">Your email</label>
      <div className="mf-field">
        <input
          id="mf-email"
          type="email"
          autoComplete="email"
          placeholder="you@yourbrokerage.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="mf-btn mf-btn--amber">
          Book a call
        </button>
      </div>
      <p>
        Your email is only passed to our booking page. <Link to="/privacy">Privacy policy</Link>
      </p>
    </form>
  );
}

/* The last thing on a page before the footer: the promise once more, and the form. */
export function Closing({ children }: { children?: ReactNode }) {
  return (
    <section className="mf-dark">
      <div className="mf-wrap">
        <div className="mf-close">
          <h2 className="mf-h2">{children ?? "Your next quote could be a one‑word text."}</h2>
          <BookForm />
        </div>
      </div>
    </section>
  );
}

/* A still picture of a thread: [mine, text] pairs drawn as bubbles, with tails on the last of each run. */
export function Bubbles({ msgs }: { msgs: [boolean, string][] }) {
  return (
    <>
      {msgs.map(([me, text], n) => {
        const next = msgs[n + 1];
        const prev = msgs[n - 1];
        return (
          <p
            key={text}
            className={me ? "mf-im mf-im--me" : "mf-im"}
            data-tail={!next || next[0] !== me || undefined}
            data-gap={(prev && prev[0] !== me) || undefined}
          >
            {text}
          </p>
        );
      })}
    </>
  );
}
