import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";

/**
 * /mobiledemo - the front door to the text line.
 *
 * One screen: a phone in the middle of a landscape, and a conversation that
 * starts by itself. Manifest texts first, the visitor picks one of the five
 * workflows, sees the kind of card the line sends, and is handed to their own
 * Messages app with the first text already written. Nothing here is
 * generated and nothing is sent from the page; the line treats whatever
 * arrives first as "hi" and runs its own script from there.
 *
 * No site chrome on purpose. The page is the phone, and the phone is the
 * pitch. The original lives in longleaf-text-demo/site/index.html; this is
 * that page as a route, so it ships with the site.
 */

const NUMBER = "+14152024448";
const NUMBER_DISPLAY = "(415) 202-4448";

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

type Pick = { key: string; label: string; first: string };
type Card = { kicker: string; title: string; rows: [string, string, ("ok" | "warn")?][] };
type Preview = { say: string[]; card: Card; after: string };

const MENU: Pick[] = [
  { key: "A", label: "Get more loads", first: "Where should I be looking for more loads?" },
  { key: "B", label: "Respond to quotes faster", first: "Help me answer quote requests faster." },
  { key: "C", label: "Help me cover a load", first: "I've got a load that needs a truck." },
  { key: "D", label: "Finalise paperwork", first: "Check the paperwork on a delivered load." },
  { key: "E", label: "The whole thing", first: "Show me the whole process, end to end." },
];

/* One short answer per choice: what the line would say, and a card of the
   kind it sends. The wording tracks the line's script.json; keep it that way. */
const PREVIEW: Record<string, Preview> = {
  A: {
    say: [
      "On it. Shippers within 40 miles of your dock who move freight on lanes you already run.",
    ],
    card: {
      kicker: "Prospects · 40 mi of Macon GA",
      title: "4 worth calling",
      rows: [
        ["Kessler Produce", "Dry van · 12 loads/wk"],
        ["Ridgeview Mills", "Van + flatbed · 8/wk"],
        ["Tatum Paper Co", "Dry van · 5/wk"],
        ["Southpoint Foods", "Reefer · 6/wk", "warn"],
      ],
    },
    after: "Numbers, who answers, and when. Saved to your contacts with the notes attached.",
  },
  B: {
    say: ["A quote request just landed in your email, from Harbor Foods. Here's what's in it."],
    card: {
      kicker: "Parsed · L-2041",
      title: "Harbor Foods → Raleigh NC",
      rows: [
        ["Pickup", "Macon GA · Thu 9 AM"],
        ["Equipment", "Dry van 53', floor loaded"],
        ["Freight", "22 pallets"],
        ["Distance", "430 mi"],
        ["Weight", "not stated", "warn"],
      ],
    },
    after: "Low, mid or high, or text me any number. I'll send it in her thread.",
  },
  C: {
    say: [
      "L-2041 needs a truck. Posted it to DAT, Truckstop, three WhatsApp carrier groups, and texted your own 38 carriers. One message from me, four places.",
    ],
    card: {
      kicker: "Posted · L-2041",
      title: "4 places, 1 message",
      rows: [
        ["DAT", "live", "ok"],
        ["Truckstop", "live", "ok"],
        ["WhatsApp groups", "3 groups · 412 carriers", "ok"],
        ["Your own carriers", "38 texted", "ok"],
      ],
    },
    after: "Six bids inside twenty minutes, and none of them called you.",
  },
  D: {
    say: ["L-2041 delivered Friday, 2:40 PM. The packet's in."],
    card: {
      kicker: "Packet · L-2041",
      title: "6 of 6 checked",
      rows: [
        ["Rate confirmation", "signed", "ok"],
        ["Bill of lading", "43,880 lb", "ok"],
        ["Proof of delivery", "signed, legible", "ok"],
        ["Carrier invoice", "matches bid", "ok"],
        ["Insurance", "valid to 03/27", "ok"],
      ],
    },
    after:
      "BOL weight matches the rate con and the carrier invoiced what they bid. Want me to invoice Harbor Foods?",
  },
  E: {
    say: ["All four, back to back: find the freight, quote it, cover it, close the paperwork."],
    card: {
      kicker: "This morning",
      title: "Your board",
      rows: [
        ["Prospecting", "4 shippers found", "ok"],
        ["L-2041", "quoted $2,100", "ok"],
        ["L-2041", "booked $1,750", "ok"],
        ["L-2041", "invoiced", "ok"],
      ],
    },
    after: "That one takes a few minutes. Worth it on a real morning.",
  },
};

/*
 * The conversation is built imperatively into one container the component
 * hands over and never touches again. It is a scripted sequence of appends
 * with pauses between them, which reads far more plainly as a script than as
 * state, and React has nothing to reconcile inside it.
 */
function play(thread: HTMLDivElement, signal: AbortSignal) {
  const sleep = (ms: number) =>
    new Promise<void>((resolve, reject) => {
      const t = setTimeout(resolve, ms);
      signal.addEventListener("abort", () => {
        clearTimeout(t);
        reject(new DOMException("aborted", "AbortError"));
      });
    });
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
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
  // Follow new messages only while the reader is already near the bottom.
  // Measured before the append, so a tall card does not count as the reader
  // having scrolled away; somebody who went up to reread is left there.
  const add = (node: HTMLElement) => {
    const gap = thread.scrollHeight - thread.clientHeight - thread.scrollTop;
    thread.appendChild(node);
    if (gap < 400) thread.scrollTop = thread.scrollHeight;
  };

  async function showTyping(ms: number) {
    if (reduced) return;
    const t = el(
      `<div class="row them tail"><div class="bubble typing" aria-hidden="true"><i></i><i></i><i></i></div></div>`,
    );
    add(t);
    try {
      await sleep(ms);
    } finally {
      t.remove();
    }
  }

  // A run of bubbles from Manifest; only the last gets a tail, as Messages does it.
  async function them(lines: string[], { first = 900, per = 120 } = {}) {
    for (let i = 0; i < lines.length; i += 1) {
      const text = lines[i];
      await showTyping(i === 0 ? first : Math.min(2200, 500 + text.length * 14));
      const last = i === lines.length - 1;
      add(
        el(
          `<div class="row them ${last ? "tail" : ""}"><div class="bubble">${esc(text)}</div></div>`,
        ),
      );
      if (!last) await sleep(per);
    }
  }

  function me(text: string) {
    add(el(`<div class="row me tail"><div class="bubble">${esc(text)}</div></div>`));
    add(el(`<div class="delivered">Delivered</div>`));
  }

  function card(c: Card) {
    const rows = c.rows
      .map(
        ([k, v, s]) =>
          `<div class="r ${s ?? ""}"><span>${esc(k)}</span><span>${esc(v)}</span></div>`,
      )
      .join("");
    add(
      el(
        `<div class="card"><div class="kicker">${esc(c.kicker)}</div><div class="title">${esc(c.title)}</div>${rows}</div>`,
      ),
    );
  }

  function chips(items: Pick[], onPick: (p: Pick) => void) {
    const wrap = el(`<div class="chips" role="group" aria-label="Pick one"></div>`);
    for (const it of items) {
      const b = el(
        `<button class="chip" type="button"><span class="k">${it.key}</span>${esc(it.label)}</button>`,
      );
      b.addEventListener("click", () => {
        if (wrap.classList.contains("done")) return;
        wrap.classList.add("done");
        b.classList.add("picked");
        onPick(it);
      });
      wrap.appendChild(b);
    }
    add(wrap);
  }

  const ua = navigator.userAgent;
  const isPhone = /iPhone|iPad|iPod|Android/i.test(ua);
  const isApple = /iPhone|iPad|iPod/i.test(ua);

  function draft(pick: Pick) {
    const body = `Hi Manifest. ${pick.first}`;
    // iOS wants "&body=", everything else "?body=". Apple's own docs.
    const href = `sms:${NUMBER}${isPhone && isApple ? "&" : "?"}body=${encodeURIComponent(body)}`;
    const d = el(`
      <div class="draft">
        <div class="box">
          <div class="lbl">Your first text · written for you</div>
          <div class="row me tail"><div class="bubble">${esc(body)}</div></div>
        </div>
        <div class="send"><a href="${href}"><span class="im" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 24 24"><path d="M12 3C6.5 3 2 6.6 2 11c0 2.5 1.5 4.7 3.8 6.2-.2 1.2-.8 2.5-1.6 3.4 1.9-.2 3.6-1 4.9-2 .9.2 1.9.4 2.9.4 5.5 0 10-3.6 10-8S17.5 3 12 3Z" fill="#fff"/></svg></span>Open Messages →</a></div>
        <div class="alt"><span>${isPhone ? "or text anything to" : "or, from your phone, text anything to"}</span><button type="button" class="num" data-copy><b>${esc(NUMBER_DISPLAY)}</b><span class="c">copy</span></button></div>
        <div class="fine">no app · nothing to install · it texts back in seconds</div>
      </div>`);
    d.querySelector("[data-copy]")!.addEventListener("click", async (e) => {
      const c = (e.currentTarget as HTMLElement).querySelector(".c")!;
      try {
        await navigator.clipboard.writeText(NUMBER);
        c.textContent = "copied";
      } catch {
        c.textContent = "select";
      }
    });
    add(d);
  }

  async function run() {
    await sleep(500);
    await them(
      [
        "Hi, I'm Manifest.",
        "I'm a freight agent that lives in your texts. No app, no login. You text me like you'd text dispatch.",
        "I find loads, answer quote requests, cover trucks and close out paperwork. What's eating your morning?",
      ],
      { first: 1100 },
    );
    await sleep(300);
    chips(MENU, async (pick) => {
      await sleep(250);
      me(pick.label);
      const p = PREVIEW[pick.key];
      await them(p.say, { first: 1000 });
      await sleep(250);
      card(p.card);
      await them([p.after], { first: 900 });
      await sleep(350);
      await them(
        [
          "That's the shape of it. The rest happens on your phone.",
          "I wrote your first text. Just hit send.",
        ],
        { first: 800 },
      );
      await sleep(200);
      draft(pick);
    });
  }

  run().catch((err) => {
    if (!(err instanceof DOMException && err.name === "AbortError")) throw err;
  });
}

function MobileDemoPage() {
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const thread = threadRef.current;
    if (!thread) return;
    const ctl = new AbortController();
    play(thread, ctl.signal);
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

          <div className="composer" aria-hidden="true">
            <div className="plus">+</div>
            <div className="field">
              <span>iMessage</span>
              <svg width="12" height="16" viewBox="0 0 12 16">
                <rect x="3.5" y="0" width="5" height="9" rx="2.5" fill="#a0a0a4" />
                <path
                  d="M1 7a5 5 0 0 0 10 0M6 12v3.5M3.5 15.5h5"
                  fill="none"
                  stroke="#a0a0a4"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
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
