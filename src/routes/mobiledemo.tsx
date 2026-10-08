import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

/**
 * /mobiledemo - the front door to the text line.
 *
 * One screen: a phone in the middle of a landscape, and a conversation that
 * starts by itself. Nothing on this page is scripted here. It is a window
 * onto the same engine that answers the phone line (longleaf-text-demo,
 * src/web.ts): the page opens a session, sends what the visitor types or
 * taps, and draws what comes back - typing, bubbles, the cards as pictures,
 * the link. The words live in that repo's script.json and only there.
 *
 * It asks one thing first, what to call the visitor, and "Continue in
 * Messages" hands them to their own phone with a first text carrying that
 * name; the line picks up from exactly where the page was. On a laptop a QR
 * code opens Messages on the phone the same way.
 *
 * No site chrome on purpose. The page is the phone, and the phone is the
 * pitch. The original lives in longleaf-text-demo/site/index.html; this is
 * that page as a route, so it ships with the site. Keep the two in step.
 */

/** Where the engine is. `?engine=` on the URL points at another worker. */
const DEFAULT_ENGINE = "https://longleaf-text-demo-dtvxnvxsjq-ue.a.run.app";
const FALLBACK_NUMBER = "+14152024448";

const DESCRIPTION =
  "Manifest is a freight broker's agent that lives in your texts. Quotes, coverage, paperwork, prospecting. Text it and it texts back.";

export const Route = createFileRoute("/mobiledemo")({
  head: () => ({
    meta: [
      { title: "Text Manifest" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Text Manifest" },
      { property: "og:description", content: DESCRIPTION },
      { name: "theme-color", content: "#1c1c1e" },
    ],
  }),
  component: MobileDemoPage,
});

/*
 * The conversation is built imperatively into one container the component
 * hands over and never touches again: events arrive from the engine and are
 * appended, which reads far more plainly as a script than as state, and
 * React has nothing to reconcile inside it.
 */
type Choice = { say: string; label: string };
type Ev =
  | { t: "typing"; on: boolean }
  | { t: "text"; text: string; id: number }
  | { t: "image"; src: string; name: string; id: number }
  | { t: "link"; href: string; id: number }
  | { t: "poll"; q: string; opts: string[]; id: number }
  | { t: "offer"; choices: Choice[]; id: number }
  | { t: "you"; text: string; id: number };

type Parts = {
  thread: HTMLDivElement;
  input: HTMLInputElement;
  go: HTMLButtonElement;
  composer: HTMLFormElement;
  toPhone: HTMLButtonElement;
  cta: HTMLAnchorElement;
};

function play({ thread, input, go, composer, toPhone, cta }: Parts, signal: AbortSignal) {
  const ENGINE =
    new URLSearchParams(location.search).get("engine") ||
    (location.hostname === "localhost" || location.hostname === "127.0.0.1"
      ? "http://localhost:8787"
      : DEFAULT_ENGINE);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const ua = navigator.userAgent;
  const isApple = /iPhone|iPad|iPod/i.test(ua);
  const isPhone = isApple || /Android/i.test(ua);
  let NUMBER = FALLBACK_NUMBER;
  const display = (n: string) => n.replace(/^\+1(\d{3})(\d{3})(\d{4})$/, "($1) $2-$3");

  const el = (html: string) => {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild as HTMLElement;
  };
  const esc = (s: string) =>
    s.replace(
      /[&<>"]/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c,
    );
  const scrollDown = () => {
    thread.scrollTop = thread.scrollHeight;
  };
  const bubble = (text: string) =>
    el(`<div class="row them tail"><div class="bubble">${esc(text)}</div></div>`);

  // --- drawing -------------------------------------------------------------

  let typingEl: HTMLElement | null = null;
  let pendingOffers: Choice[] | null = null;
  let pendingLink: HTMLElement | null = null;
  let lastOffer: Choice[] | null = null;
  let offerTimer: ReturnType<typeof setTimeout> | undefined;

  function flushOffers() {
    if (!pendingOffers && !pendingLink) return;
    chips(pendingOffers ?? [], pendingLink);
    pendingOffers = null;
    pendingLink = null;
  }
  function typing(on: boolean) {
    if (on && !typingEl && !reduced) {
      typingEl = el(
        `<div class="row them tail"><div class="bubble typing" aria-hidden="true"><i></i><i></i><i></i></div></div>`,
      );
      thread.appendChild(typingEl);
      scrollDown();
    }
    if (!on && typingEl) {
      typingEl.remove();
      typingEl = null;
    }
    // Chips wait until the run of messages they belong to has finished, so
    // they come after the link rather than between the bubble and it.
    clearTimeout(offerTimer);
    if (!on && (pendingOffers || pendingLink)) offerTimer = setTimeout(flushOffers, 600);
  }
  // Only the last bubble in a run from Manifest gets a tail, as Messages does it.
  let lastThem: HTMLElement | null = null;
  function them(node: HTMLElement) {
    typing(false);
    if (lastThem) lastThem.classList.remove("tail");
    thread.appendChild(node);
    lastThem = node.classList.contains("row") ? node : null;
    scrollDown();
  }
  function me(text: string) {
    pendingOffers = null;
    pendingLink = null;
    typing(false);
    lastThem = null;
    thread.querySelectorAll(".chips:not(.done)").forEach((c) => c.classList.add("done"));
    thread.appendChild(el(`<div class="row me tail"><div class="bubble">${esc(text)}</div></div>`));
    thread.appendChild(el(`<div class="delivered">Delivered</div>`));
    scrollDown();
  }
  /**
   * Nothing has to be typed. Every question the engine asks comes with the
   * answers it will take (an `offer` event), and a bubble that names a word
   * to reply with - SHOW ME MORE, SEND, RESTART - gets that word as a chip.
   */
  const OFFERS: [RegExp, string][] = [
    [/\bSHOW ME MORE\b/, "Show me more"],
    [/\bSEND\b/, "Send"],
    [/\bRESTART\b/, "Restart"],
  ];
  function text(t: string) {
    them(bubble(t));
    if (/^Not sure I caught that|^Sorry, I didn't catch that/.test(t) && lastOffer)
      pendingOffers = lastOffer;
    else {
      const found = OFFERS.filter(([re]) => re.test(t)).map(([, label]) => ({ say: label, label }));
      if (found.length) pendingOffers = found;
    }
  }
  function offer(choices: Choice[]) {
    typing(false);
    lastOffer = choices;
    pendingOffers = choices;
  }
  function chips(items: Choice[], extra: HTMLElement | null = null) {
    const wrap = el(`<div class="chips" role="group" aria-label="Pick one"></div>`);
    if (extra) wrap.appendChild(extra);
    for (const it of items) {
      const badge = /^[A-Z0-9]$/i.test(it.say) ? it.say : "";
      const b = el(
        `<button class="chip ${badge ? "" : "plain"}" type="button"><span class="k">${esc(badge)}</span>${esc(it.label)}</button>`,
      );
      b.addEventListener("click", () => {
        if (wrap.classList.contains("done")) return;
        wrap.classList.add("done");
        b.classList.add("picked");
        void say(it.say);
      });
      wrap.appendChild(b);
    }
    thread.appendChild(wrap);
    scrollDown();
  }
  function image(src: string, name: string) {
    them(el(`<div class="pic"><img src="${src}" alt="${esc(name)}"></div>`));
  }
  // The link goes in with the chips, on the visitor's side.
  function link(href: string) {
    typing(false);
    pendingLink = el(
      `<a class="preview" href="${esc(href)}" target="_blank" rel="noopener"><span class="s" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 24 24"><path d="M4 4h16v16H4z" fill="#fff"/></svg></span>Get started</a>`,
    );
    if (!pendingOffers) {
      clearTimeout(offerTimer);
      offerTimer = setTimeout(flushOffers, 600);
    }
  }

  // --- the engine ----------------------------------------------------------

  let session: string | null = null;
  let es: EventSource | null = null;

  async function post<T = unknown>(path: string, body?: unknown): Promise<T> {
    const r = await fetch(`${ENGINE}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      signal,
    });
    if (!r.ok) throw new Error(`${path}: ${r.status}`);
    return r.json() as Promise<T>;
  }
  function listen() {
    es = new EventSource(`${ENGINE}/web/session/${encodeURIComponent(session!)}/events`);
    const seen = new Set<number>();
    es.onmessage = (ev) => {
      const e = JSON.parse(ev.data) as Ev;
      if (e.t === "typing") return typing(e.on);
      if (seen.has(e.id)) return; // a reconnect replays the thread
      seen.add(e.id);
      if (e.t === "you") return me(e.text);
      if (e.t === "text") return text(e.text);
      if (e.t === "image") return image(e.src, e.name);
      if (e.t === "link") return link(e.href);
      if (e.t === "offer") return offer(e.choices);
      if (e.t === "poll") text([e.q, ...e.opts.map((o, i) => `${i + 1}. ${o}`)].join("\n"));
    };
  }
  async function say(t: string) {
    const said = t.trim();
    if (!said || !session) return;
    input.value = "";
    go.disabled = true;
    try {
      await post(`/web/session/${encodeURIComponent(session)}/say`, { text: said });
    } catch {
      them(bubble("Couldn't reach the line just now. Try again in a moment."));
    }
  }
  composer.addEventListener(
    "submit",
    (ev) => {
      ev.preventDefault();
      void say(input.value);
    },
    { signal },
  );
  input.addEventListener(
    "input",
    () => {
      go.disabled = !input.value.trim();
    },
    { signal },
  );

  // --- carrying on in Messages -------------------------------------------

  type Handoff = { text: string; number: string; sms: string; qr: string };
  toPhone.addEventListener(
    "click",
    async () => {
      if (!session) return;
      let h: Handoff;
      try {
        h = await post<Handoff>(`/web/session/${encodeURIComponent(session)}/handoff`);
      } catch {
        return;
      }
      if (isPhone) {
        location.href = h.sms;
        return;
      }
      thread.querySelector(".handoff")?.remove();
      const d = el(`
      <div class="handoff">
        <div class="box qr">
          <div class="lbl">Carry on in Messages</div>
          <img src="${ENGINE}${h.qr}" alt="QR code that opens Messages with your first text written" width="150" height="150">
          <p>Point your phone's camera at this. Messages opens with your first text written; just send it.</p>
        </div>
        <div class="alt"><span>or text</span><b class="q">${esc(h.text)}</b><span>to</span><button type="button" class="num" data-copy><b>${esc(display(h.number))}</b><span class="c">copy</span></button></div>
        <div class="fine">it picks up right here · nothing starts over</div>
      </div>`);
      d.querySelector("[data-copy]")!.addEventListener("click", async (e) => {
        const c = (e.currentTarget as HTMLElement).querySelector(".c")!;
        try {
          await navigator.clipboard.writeText(h.number);
          c.textContent = "copied";
        } catch {
          c.textContent = "select";
        }
      });
      d.querySelector("img")!.addEventListener("load", scrollDown);
      thread.appendChild(d);
      scrollDown();
    },
    { signal },
  );

  // --- go ---------------------------------------------------------------------

  /** The one thing asked before the demo: what to call them. It is how the
   *  line knows this visitor again when they carry on by text. Remembered on
   *  this browser so a second visit skips it. */
  function askName(): Promise<string> {
    return new Promise((resolve) => {
      let had = "";
      try {
        had = localStorage.getItem("manifest.name") || "";
      } catch {
        /* private mode */
      }
      them(bubble("Hi, I'm Manifest. What should I call you?"));
      const box = el(
        `<div class="ask"><form autocomplete="off"><input type="text" name="given-name" autocomplete="given-name" placeholder="Your name" aria-label="Your name" maxlength="40" required><button type="submit">→</button></form></div>`,
      );
      const field = box.querySelector("input")!;
      field.value = had;
      box.querySelector("form")!.addEventListener("submit", (ev) => {
        ev.preventDefault();
        const name = field.value.trim().replace(/\s+/g, " ");
        if (!name) {
          field.focus();
          return;
        }
        try {
          localStorage.setItem("manifest.name", name);
        } catch {
          /* private mode */
        }
        box.remove();
        me(name);
        resolve(name);
      });
      thread.appendChild(box);
      scrollDown();
      field.focus({ preventScroll: true });
    });
  }

  async function run() {
    const down = () =>
      them(bubble(`The line is not answering right now. Text ${display(NUMBER)} instead.`));
    try {
      const cfg = (await (await fetch(`${ENGINE}/web/config`, { signal })).json()) as {
        stripe?: string;
        number?: string;
      };
      if (cfg.stripe) cta.href = cfg.stripe;
      if (cfg.number) NUMBER = cfg.number;
    } catch {
      if (!signal.aborted) down();
      return;
    }
    input.disabled = true;
    const name = await askName();
    input.disabled = false;
    try {
      ({ id: session } = await post<{ id: string }>("/web/session", { name }));
    } catch {
      if (!signal.aborted) down();
      return;
    }
    listen();
    // Manifest texts first, as on the phone where anything starts it.
    await post(`/web/session/${encodeURIComponent(session!)}/say`, { text: "hi", silent: true });
    input.focus({ preventScroll: true });
  }
  run().catch(() => {
    /* aborted on unmount */
  });
  signal.addEventListener("abort", () => {
    es?.close();
    clearTimeout(offerTimer);
  });
}

function MobileDemoPage() {
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const goRef = useRef<HTMLButtonElement>(null);
  const composerRef = useRef<HTMLFormElement>(null);
  const toPhoneRef = useRef<HTMLButtonElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const thread = threadRef.current;
    const input = inputRef.current;
    const go = goRef.current;
    const composer = composerRef.current;
    const toPhone = toPhoneRef.current;
    const cta = ctaRef.current;
    if (!thread || !input || !go || !composer || !toPhone || !cta) return;
    const ctl = new AbortController();
    play({ thread, input, go, composer, toPhone, cta }, ctl.signal);
    return () => {
      ctl.abort();
      // Strict mode runs effects twice in dev; a second run must not stack
      // two conversations. The stamp is the only thing React rendered.
      for (const n of Array.from(thread.children)) if (!n.classList.contains("stamp")) n.remove();
    };
  }, []);
  return (
    <div className="mobiledemo">
      <style>{CSS}</style>
      <a
        className="cta"
        ref={ctaRef}
        href="https://buy.stripe.com/eVqeVcdJi4vWfkI8EK3Nm02"
        target="_blank"
        rel="noopener"
      >
        <span className="s" aria-hidden="true">
          <svg width="11" height="11" viewBox="0 0 24 24">
            <path d="M4 4h16v16H4z" fill="#fff" />
          </svg>
        </span>
        Get started <small>· run it on your own loads</small>
      </a>

      <div className="scene" aria-hidden="true">
        <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="md-sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#2a2f4a" />
              <stop offset=".35" stopColor="#6b5a86" />
              <stop offset=".62" stopColor="#d98a6a" />
              <stop offset=".78" stopColor="#f2c08a" />
              <stop offset="1" stopColor="#f7d9a8" />
            </linearGradient>
            <linearGradient id="md-ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4a3b3a" />
              <stop offset="1" stopColor="#1a1518" />
            </linearGradient>
            <linearGradient id="md-road" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3a3336" />
              <stop offset="1" stopColor="#17141a" />
            </linearGradient>
            <radialGradient id="md-sun" cx=".5" cy=".5" r=".5">
              <stop offset="0" stopColor="#fff2cc" stopOpacity=".95" />
              <stop offset=".4" stopColor="#ffcf8a" stopOpacity=".55" />
              <stop offset="1" stopColor="#ffcf8a" stopOpacity="0" />
            </radialGradient>
            <filter id="md-soft">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>
          <rect width="1600" height="900" fill="url(#md-sky)" />
          <ellipse cx="800" cy="650" rx="520" ry="230" fill="url(#md-sun)" />
          <g fill="#f3a988" opacity=".5" filter="url(#md-soft)">
            <ellipse cx="260" cy="330" rx="300" ry="16" />
            <ellipse cx="1180" cy="290" rx="380" ry="18" />
            <ellipse cx="760" cy="420" rx="220" ry="10" />
            <ellipse cx="1380" cy="440" rx="260" ry="12" />
          </g>
          <g fill="#4e3f6b" opacity=".5" filter="url(#md-soft)">
            <ellipse cx="520" cy="190" rx="420" ry="26" />
            <ellipse cx="1240" cy="120" rx="340" ry="20" />
            <ellipse cx="900" cy="260" rx="200" ry="12" />
          </g>
          <path
            d="M0 640 L120 612 L240 626 L380 596 L520 618 L660 598 L800 612 L940 590 L1080 606 L1220 586 L1360 604 L1500 592 L1600 606 L1600 900 L0 900Z"
            fill="#5a4553"
            opacity=".85"
          />
          <path d="M0 660 L1600 652 L1600 900 L0 900Z" fill="url(#md-ground)" />
          <g fill="#120f13">
            <path d="M40 662 l10-26 l10 26z M70 664 l8-20 l8 20z M1480 656 l9-24 l9 24z M1520 658 l8-18 l8 18z M1555 657 l10-28 l10 28z M1300 657 l7-16 l7 16z" />
          </g>
          <path d="M800 658 L1600 900 L0 900Z" fill="url(#md-road)" />
          <path d="M800 658 L1120 900 L480 900Z" fill="#221d22" />
          <g stroke="#e9c77a" strokeLinecap="round" opacity=".9">
            <line x1="800" y1="664" x2="800" y2="672" strokeWidth="1" />
            <line x1="800" y1="686" x2="800" y2="702" strokeWidth="2" />
            <line x1="800" y1="722" x2="800" y2="752" strokeWidth="3" />
            <line x1="800" y1="782" x2="800" y2="830" strokeWidth="4" />
            <line x1="800" y1="866" x2="800" y2="900" strokeWidth="5" />
          </g>
          <g stroke="#f4e6c8" opacity=".55">
            <line x1="800" y1="658" x2="1120" y2="900" strokeWidth="3" />
            <line x1="800" y1="658" x2="480" y2="900" strokeWidth="3" />
          </g>
        </svg>
      </div>

      <main className="phone" aria-label="Manifest, in Messages">
        <div className="island" />
        <div className="screen">
          <div className="status">
            <span>9:41</span>
            <span className="right" aria-hidden="true">
              <svg width="18" height="12" viewBox="0 0 18 12">
                <rect x="0" y="8" width="3" height="4" rx="1" fill="#000" />
                <rect x="5" y="6" width="3" height="6" rx="1" fill="#000" />
                <rect x="10" y="3" width="3" height="9" rx="1" fill="#000" />
                <rect x="15" y="0" width="3" height="12" rx="1" fill="#000" />
              </svg>
              <svg width="16" height="12" viewBox="0 0 16 12">
                <path
                  d="M8 11.2a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6ZM4.9 7.6a4.4 4.4 0 0 1 6.2 0l-1 1a3 3 0 0 0-4.2 0l-1-1ZM2.3 5a8 8 0 0 1 11.4 0l-1 1a6.6 6.6 0 0 0-9.4 0l-1-1ZM0 2.6a11.3 11.3 0 0 1 16 0l-1 1a9.9 9.9 0 0 0-14 0l-1-1Z"
                  fill="#000"
                />
              </svg>
              <svg width="26" height="12" viewBox="0 0 26 12">
                <rect
                  x=".5"
                  y=".5"
                  width="22"
                  height="11"
                  rx="3"
                  fill="none"
                  stroke="#000"
                  strokeOpacity=".4"
                />
                <rect x="2" y="2" width="19" height="8" rx="1.5" fill="#000" />
                <rect x="23.5" y="4" width="1.8" height="4" rx="1" fill="#000" fillOpacity=".4" />
              </svg>
            </span>
          </div>
          <div className="header">
            <div className="ico" aria-hidden="true">
              <svg width="12" height="20" viewBox="0 0 12 20">
                <path
                  d="M10 2 2 10l8 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="contact">
              <div className="avatar" aria-hidden="true">
                <span>M</span>
              </div>
              <div className="name">
                Manifest <i>›</i>
              </div>
            </div>
            <div className="ico" aria-hidden="true">
              <svg width="22" height="16" viewBox="0 0 22 16">
                <rect
                  x="1"
                  y="2"
                  width="13"
                  height="12"
                  rx="3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M14 6.5 20 3.5v9l-6-3z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="thread" ref={threadRef} aria-live="polite">
            <div className="stamp">
              <b>Today</b> 7:12 AM
            </div>
          </div>

          <div className="carry">
            <span>Rather do this by text?</span>
            <button type="button" ref={toPhoneRef}>
              Continue in Messages →
            </button>
          </div>
          <form className="composer" ref={composerRef} autoComplete="off">
            <div className="plus" aria-hidden="true">
              +
            </div>
            <label className="field">
              <input
                ref={inputRef}
                type="text"
                placeholder="iMessage"
                aria-label="Message"
                enterKeyHint="send"
              />
              <button className="go" ref={goRef} type="submit" aria-label="Send" disabled>
                <svg width="12" height="14" viewBox="0 0 12 14">
                  <path
                    d="M6 13V1M1 6l5-5 5 5"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </label>
          </form>
          <div className="homebar" />
        </div>
      </main>
    </div>
  );
}

/*
 * Scoped under .mobiledemo so the site's own base styles neither leak in nor
 * out. The wrapper is fixed and full-bleed: the page never scrolls, the phone
 * does. On a phone the frame goes away and the chat is the whole screen.
 */
const CSS = `
.mobiledemo {
  --font-sf: ui-rounded, "SF Pro Rounded", "SF Pro Text", "SF Pro Display", -apple-system, BlinkMacSystemFont, system-ui, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --bubble-gray: #e9e9eb;
  --bubble-blue: #0a84ff;
  --bubble-blue-2: #0b7cf5;
  --meta: #8a8a8e;
  --frame: #1c1c1e;
  --frame-rim: #3a3a3c;
  --chip-bg: rgba(255,255,255,.94);
  --chip-shadow: 0 0 0 .5px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06), 0 4px 10px rgba(0,0,0,.05);
  --send-bg: linear-gradient(180deg,#3a3a3c,#1c1c1e);
  --send-shadow: 0 1px 1.5px rgba(0,0,0,.3), 0 8px 18px rgba(0,0,0,.22);
  position: fixed; inset: 0; z-index: 50;
  font-family: var(--font-sf); color: #1f2a2f; background: #1b1d26;
  -webkit-font-smoothing: antialiased; overflow: hidden;
  display: grid; place-items: center;
}
.mobiledemo *, .mobiledemo *::before, .mobiledemo *::after { box-sizing: border-box; }
.mobiledemo .scene { position: absolute; inset: 0; z-index: 0; overflow: hidden; }
.mobiledemo .scene svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.mobiledemo .scene::after { content: ""; position: absolute; inset: 0; background: radial-gradient(60% 60% at 50% 55%, rgba(0,0,0,.18), rgba(0,0,0,0) 70%); pointer-events: none; }

.mobiledemo .phone {
  position: relative; z-index: 1; width: 352px; height: 740px; max-height: calc(100vh - 36px);
  background: var(--frame); border-radius: 56px; padding: 12px;
  box-shadow: 0 0 0 2px var(--frame-rim), 0 40px 80px rgba(0,0,0,.35), 0 20px 40px rgba(0,0,0,.25), 0 2px 4px rgba(0,0,0,.2);
}
.mobiledemo .phone::before { content: ""; position: absolute; left: -5px; top: 150px; width: 3px; height: 96px; background: var(--frame-rim); border-radius: 2px; box-shadow: 0 120px 0 0 var(--frame-rim), 0 -56px 0 0 var(--frame-rim); }
.mobiledemo .phone::after { content: ""; position: absolute; right: -5px; top: 190px; width: 3px; height: 70px; background: var(--frame-rim); border-radius: 2px; }
.mobiledemo .screen { position: relative; height: 100%; background: #fff; border-radius: 44px; overflow: hidden; display: flex; flex-direction: column; }
.mobiledemo .island { position: absolute; top: 12px; left: 50%; transform: translateX(-50%); width: 108px; height: 32px; background: #000; border-radius: 20px; z-index: 5; }
.mobiledemo .status { display: flex; justify-content: space-between; align-items: center; padding: 18px 28px 0; font-size: 15px; font-weight: 600; height: 54px; color: #000; }
.mobiledemo .status .right { display: flex; gap: 6px; align-items: center; }
.mobiledemo .status svg { display: block; }

.mobiledemo .header { display: flex; align-items: center; justify-content: space-between; padding: 6px 14px 10px; background: rgba(249,249,249,.92); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: .5px solid rgba(0,0,0,.12); position: relative; z-index: 4; }
.mobiledemo .header .ico { width: 36px; height: 36px; border-radius: 50%; background: rgba(0,0,0,.05); display: grid; place-items: center; color: #0a84ff; }
.mobiledemo .contact { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.mobiledemo .avatar { width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(160deg,#2b2f36,#0f1115); color: #f4efe6; font-weight: 700; font-size: 22px; letter-spacing: -.5px; display: grid; place-items: center; box-shadow: inset 0 1px 0 rgba(255,255,255,.12), 0 1px 2px rgba(0,0,0,.2); }
.mobiledemo .avatar span { transform: translateY(1px); }
.mobiledemo .contact .name { font-size: 12px; font-weight: 600; padding: 3px 9px; border-radius: 999px; background: rgba(0,0,0,.05); color: #000; display: inline-flex; gap: 2px; align-items: center; }
.mobiledemo .contact .name i { font-style: normal; color: #b0b0b4; font-size: 11px; }

.mobiledemo .thread { flex: 1; min-height: 0; overflow-y: auto; overscroll-behavior: contain; touch-action: pan-y; padding: 14px 12px 12px; scroll-behavior: smooth; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
.mobiledemo .thread::-webkit-scrollbar { display: none; }
.mobiledemo .stamp { text-align: center; font-size: 11px; color: var(--meta); margin: 2px 0 10px; }
.mobiledemo .stamp b { font-weight: 600; }

.mobiledemo .row { display: flex; margin: 2px 0; }
.mobiledemo .row.them { justify-content: flex-start; }
.mobiledemo .row.me { justify-content: flex-end; }
.mobiledemo .bubble { max-width: 78%; padding: 10px 13px; border-radius: 20px; font-size: 16px; line-height: 1.26; position: relative; animation: md-pop .28s cubic-bezier(.2,.9,.3,1.2) both; white-space: pre-line; }
.mobiledemo .them .bubble { background: var(--bubble-gray); color: #000; }
.mobiledemo .me .bubble { background: linear-gradient(180deg,var(--bubble-blue),var(--bubble-blue-2)); color: #fff; }
.mobiledemo .row.tail.them .bubble::after { content: ""; position: absolute; left: -5px; bottom: 0; width: 14px; height: 14px; background: var(--bubble-gray); -webkit-mask: radial-gradient(14px 14px at 14px 0, transparent 13px, #000 14px); mask: radial-gradient(14px 14px at 14px 0, transparent 13px, #000 14px); }
.mobiledemo .row.tail.me .bubble::after { content: ""; position: absolute; right: -5px; bottom: 0; width: 14px; height: 14px; background: var(--bubble-blue-2); -webkit-mask: radial-gradient(14px 14px at 0 0, transparent 13px, #000 14px); mask: radial-gradient(14px 14px at 0 0, transparent 13px, #000 14px); }
.mobiledemo .delivered { font-size: 11px; color: var(--meta); text-align: right; margin: 3px 6px 6px; font-weight: 500; }

.mobiledemo .typing { display: inline-flex; gap: 4px; align-items: center; padding: 14px 14px; }
.mobiledemo .typing i { width: 8px; height: 8px; border-radius: 50%; background: #9a9a9e; animation: md-blink 1.2s infinite ease-in-out; }
.mobiledemo .typing i:nth-child(2) { animation-delay: .15s; }
.mobiledemo .typing i:nth-child(3) { animation-delay: .3s; }
@keyframes md-blink { 0%,80%,100% { opacity: .35; transform: translateY(0); } 40% { opacity: 1; transform: translateY(-2px); } }
@keyframes md-pop { from { opacity: 0; transform: translateY(8px) scale(.96); } to { opacity: 1; transform: none; } }
@keyframes md-rise { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }

.mobiledemo .chips { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; margin: 10px 0 6px; animation: md-rise .35s ease both; }
.mobiledemo .chip { font: inherit; font-size: 13.5px; font-weight: 600; color: #111; background: var(--chip-bg); border: 0; border-radius: 999px; padding: 8px 13px; box-shadow: var(--chip-shadow); cursor: pointer; display: inline-flex; gap: 6px; align-items: center; transition: transform .12s ease, background .12s ease, color .12s ease; }
.mobiledemo .chip:hover { transform: translateY(-1px); }
.mobiledemo .chip:active { transform: scale(.97); }
.mobiledemo .chip .k { font-size: 11px; font-weight: 700; color: #7a7a7e; background: rgba(0,0,0,.06); border-radius: 6px; padding: 2px 5px; }
.mobiledemo .chips.done .chip { opacity: .45; pointer-events: none; }
.mobiledemo .chips.done .chip.picked { opacity: 1; background: var(--bubble-blue); color: #fff; }
.mobiledemo .chips.done .chip.picked .k { color: rgba(255,255,255,.85); background: rgba(255,255,255,.2); }

.mobiledemo .card { margin: 6px 0 4px; max-width: 84%; border-radius: 16px; overflow: hidden; background: #fff; box-shadow: 0 0 0 .5px rgba(0,0,0,.1), 0 6px 16px rgba(0,0,0,.08); animation: md-pop .3s ease both; font-size: 13px; color: #000; }
.mobiledemo .card .kicker { font-size: 10.5px; letter-spacing: .06em; text-transform: uppercase; color: var(--meta); padding: 10px 13px 0; font-weight: 600; }
.mobiledemo .card .title { font-size: 15px; font-weight: 700; padding: 2px 13px 8px; }
.mobiledemo .card .r { display: flex; justify-content: space-between; gap: 10px; padding: 7px 13px; border-top: .5px solid rgba(0,0,0,.08); }
.mobiledemo .card .r span:last-child { color: #3c3c43; text-align: right; }
.mobiledemo .card .r.ok span:last-child { color: #1f8a3b; font-weight: 600; }
.mobiledemo .card .r.warn span:last-child { color: #b8600e; font-weight: 600; }

.mobiledemo .draft { margin: 8px 0 0; animation: md-rise .4s ease both; }
.mobiledemo .draft .box { border: 1.5px dashed rgba(0,0,0,.14); border-radius: 18px; padding: 10px 10px 12px; }
.mobiledemo .draft .lbl { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: var(--meta); font-weight: 700; margin: 0 4px 8px; }
.mobiledemo .draft .row.me .bubble { max-width: 100%; }
.mobiledemo .send { margin: 10px 0 0; display: flex; justify-content: flex-end; }
.mobiledemo .send a { display: inline-flex; align-items: center; gap: 8px; font: inherit; font-size: 16px; font-weight: 600; color: #fff; text-decoration: none; padding: 14px 22px; border-radius: 22px; background: var(--send-bg); box-shadow: var(--send-shadow); transition: transform .12s ease; }
.mobiledemo .send a:hover { transform: translateY(-1px); }
.mobiledemo .send a:active { transform: scale(.98); }
.mobiledemo .send a .im { width: 18px; height: 18px; border-radius: 5px; background: linear-gradient(180deg,#5af574,#19c33a); display: grid; place-items: center; }
.mobiledemo .alt { display: flex; justify-content: flex-end; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 11.5px; color: var(--meta); margin: 12px 2px 0; }
.mobiledemo .alt .num { font: inherit; display: inline-flex; align-items: center; gap: 8px; color: #111; background: var(--chip-bg); border: 0; border-radius: 12px; padding: 7px 10px; box-shadow: var(--chip-shadow); cursor: pointer; }
.mobiledemo .alt .num b { font-size: 15px; font-weight: 700; letter-spacing: .02em; font-variant-numeric: tabular-nums; }
.mobiledemo .alt .num .c { font-size: 10.5px; font-weight: 600; color: #7a7a7e; background: rgba(0,0,0,.06); border-radius: 6px; padding: 2px 6px; }
.mobiledemo .fine { text-align: right; font-size: 11px; color: var(--meta); margin: 8px 2px 0; }

.mobiledemo .composer { display: flex; align-items: center; gap: 10px; padding: 8px 12px 14px; background: rgba(249,249,249,.95); border-top: .5px solid rgba(0,0,0,.08); }
.mobiledemo .composer .plus { width: 32px; height: 32px; border-radius: 50%; background: rgba(0,0,0,.06); display: grid; place-items: center; font-size: 22px; color: #4a4a4e; line-height: 1; }
.mobiledemo .composer .field { flex: 1; height: 34px; border-radius: 17px; border: .5px solid rgba(0,0,0,.18); display: flex; align-items: center; justify-content: space-between; padding: 0 10px 0 12px; color: #a0a0a4; font-size: 15px; background: #fff; }
.mobiledemo .homebar { position: absolute; bottom: 7px; left: 50%; transform: translateX(-50%); width: 120px; height: 5px; border-radius: 3px; background: #000; z-index: 6; }

.mobiledemo .chip.plain .k { display: none; }
.mobiledemo .chips.done .preview { opacity: 1; }
.mobiledemo .pic { margin: 6px 0 4px; max-width: 84%; border-radius: 16px; overflow: hidden; box-shadow: 0 0 0 .5px rgba(0,0,0,.1), 0 6px 16px rgba(0,0,0,.08); animation: md-pop .3s ease both; background: #fff; }
.mobiledemo .pic img { display: block; width: 100%; height: auto; }
.mobiledemo .preview { display: inline-flex; align-items: center; gap: 7px; padding: 8px 13px 8px 9px; border-radius: 999px; background: linear-gradient(135deg,#635bff,#7a6cff); color: #fff; text-decoration: none; font-size: 13.5px; font-weight: 600; box-shadow: 0 1px 2px rgba(0,0,0,.15), 0 4px 10px rgba(99,91,255,.25); transition: transform .12s ease; }
.mobiledemo .preview:hover { transform: translateY(-1px); }
.mobiledemo .preview .s { width: 18px; height: 18px; border-radius: 5px; background: rgba(255,255,255,.22); display: grid; place-items: center; flex: none; }
.mobiledemo .composer .field { cursor: text; }
.mobiledemo .composer input { flex: 1; border: 0; outline: 0; background: transparent; font: inherit; font-size: 15px; color: #000; min-width: 0; }
.mobiledemo .composer input::placeholder { color: #a0a0a4; }
.mobiledemo .composer .go { width: 26px; height: 26px; border-radius: 50%; border: 0; background: var(--bubble-blue); color: #fff; display: grid; place-items: center; cursor: pointer; flex: none; padding: 0; }
.mobiledemo .composer .go:disabled { background: #c7c7cc; cursor: default; }
.mobiledemo .carry { display: flex; justify-content: center; align-items: center; gap: 10px; padding: 6px 12px 4px; background: rgba(249,249,249,.95); font-size: 12px; color: var(--meta); }
.mobiledemo .carry button { font: inherit; font-size: 12.5px; font-weight: 600; color: #0a84ff; background: none; border: 0; padding: 4px 2px; cursor: pointer; }
.mobiledemo .handoff { margin: 8px 0 0; animation: md-rise .4s ease both; }
.mobiledemo .handoff .box { border: 1.5px dashed rgba(0,0,0,.14); border-radius: 18px; padding: 10px 10px 12px; }
.mobiledemo .handoff .lbl { font-size: 10px; letter-spacing: .08em; text-transform: uppercase; color: var(--meta); font-weight: 700; margin: 0 4px 8px; }
.mobiledemo .handoff .qr { text-align: center; }
.mobiledemo .handoff .qr img { display: block; margin: 2px auto 8px; border-radius: 10px; background: #fff; }
.mobiledemo .handoff .qr p { margin: 0 6px; font-size: 13px; line-height: 1.3; color: #3c3c43; }
.mobiledemo .handoff .alt .q { font-size: 11.5px; color: #111; }
.mobiledemo .ask { margin: 10px 0 6px; animation: md-rise .35s ease both; }
.mobiledemo .ask form { display: flex; gap: 8px; justify-content: flex-end; }
.mobiledemo .ask input { width: 56%; font: inherit; font-size: 16px; padding: 9px 13px; border-radius: 18px; border: .5px solid rgba(0,0,0,.18); outline: 0; background: #fff; color: #000; }
.mobiledemo .ask input:focus { border-color: var(--bubble-blue); box-shadow: 0 0 0 3px rgba(10,132,255,.15); }
.mobiledemo .ask button { font: inherit; font-size: 14px; font-weight: 600; color: #fff; background: var(--bubble-blue); border: 0; border-radius: 18px; padding: 0 14px; cursor: pointer; }
.mobiledemo .cta { position: fixed; top: 18px; right: 18px; z-index: 3; display: inline-flex; align-items: center; gap: 8px; font: inherit; font-size: 15px; font-weight: 600; color: #fff; text-decoration: none; padding: 12px 18px; border-radius: 22px; background: var(--send-bg); box-shadow: var(--send-shadow); transition: transform .12s ease; }
.mobiledemo .cta:hover { transform: translateY(-1px); }
.mobiledemo .cta .s { width: 18px; height: 18px; border-radius: 5px; background: #635bff; display: grid; place-items: center; }
.mobiledemo .cta small { font-weight: 500; opacity: .75; font-size: 12px; }
@media (max-width: 480px), (max-height: 720px) {
  .mobiledemo .cta { top: auto; bottom: max(14px, env(safe-area-inset-bottom)); right: 12px; left: auto; padding: 10px 14px; font-size: 14px; }
  .mobiledemo .cta small { display: none; }
}
@media (max-width: 480px), (max-height: 720px) {
  .mobiledemo { display: block; }
  .mobiledemo .scene { display: none; }
  /* Pinned to the viewport, not sized by it: a percentage height inside the
     grid never resolved, so the frame grew to fit the whole conversation and
     the thread had nothing to scroll. */
  .mobiledemo .phone { position: absolute; inset: 0; width: auto; height: auto; max-height: none; border-radius: 0; padding: 0; box-shadow: none; background: #fff; }
  .mobiledemo .phone::before, .mobiledemo .phone::after, .mobiledemo .island, .mobiledemo .homebar { display: none; }
  .mobiledemo .screen { border-radius: 0; }
  .mobiledemo .status { padding-top: max(10px, env(safe-area-inset-top)); height: auto; padding-bottom: 4px; }
  .mobiledemo .composer { padding-bottom: max(14px, env(safe-area-inset-bottom)); }
}
@media (prefers-reduced-motion: reduce) {
  .mobiledemo .bubble, .mobiledemo .chips, .mobiledemo .card, .mobiledemo .draft { animation: none; }
  .mobiledemo .thread { scroll-behavior: auto; }
}
`;
