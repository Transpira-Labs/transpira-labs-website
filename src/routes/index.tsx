import { createFileRoute } from "@tanstack/react-router";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type FormEvent,
} from "react";
import { SiteNav, SiteFooter, CAL_URL, BTN_PRIMARY } from "@/components/site-chrome";
import dashboardShot from "@/assets/manifest-dashboard.png";

const DESCRIPTION =
  "Win and manage 10× the loads with the same team. Manifest reads the inbox, reaches carriers where they already are, prices the load, and drafts every reply. A human approves every send.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manifest | Win and manage 10× the loads. Same team." },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Manifest | Win and manage 10× the loads. Same team." },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Walkthrough,
});

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/* Batches setTimeout calls so a section can cancel its whole sequence at once. */
function useTimers() {
  const timers = useRef<number[]>([]);
  const clear = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);
  const after = useCallback((ms: number, fn: () => void) => {
    timers.current.push(window.setTimeout(fn, ms));
  }, []);
  useEffect(() => clear, [clear]);
  return { after, clear };
}

/* Scrolls to the next walkthrough screen below the current viewport. */
function scrollNext() {
  const secs = Array.from(document.querySelectorAll<HTMLElement>("section[data-screen]"));
  const y = window.scrollY + 70;
  const next = secs.find((s) => s.getBoundingClientRect().top + window.scrollY > y + 10);
  const top = next
    ? next.getBoundingClientRect().top + window.scrollY - 60
    : document.documentElement.scrollHeight;
  window.scrollTo({ top, behavior: "smooth" });
}

function PhoneIcon({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7A2 2 0 0 1 22 16.9z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Hero + floating scroll button                                       */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section
      data-screen="hero"
      className="flex min-h-[88svh] flex-col items-center justify-center gap-[clamp(18px,3vw,28px)] px-6 py-[clamp(40px,8vw,80px)] text-center"
    >
      <p className="eyebrow rise m-0" style={{ "--rise-delay": "100ms" } as CSSProperties}>
        For freight brokers
      </p>
      <h1
        className="rise m-0 max-w-[1100px] font-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.98] tracking-[-0.035em] text-balance text-white"
        style={{ "--rise-delay": "300ms" } as CSSProperties}
      >
        Win and manage <span className="text-mint">10×</span> the loads.
        <br />
        Same team.
      </h1>
      <p
        className="rise m-0 max-w-[640px] text-[clamp(1.0625rem,2vw,1.5rem)] text-pretty text-fog"
        style={{ "--rise-delay": "600ms" } as CSSProperties}
      >
        Keep scrolling to see how.
      </p>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Scroll down"
        className="anim-bob mt-[clamp(12px,3vw,24px)] flex size-[clamp(64px,12vw,88px)] cursor-pointer items-center justify-center rounded-full border-2 border-white/25 bg-white/[0.04] text-[clamp(2rem,6vw,2.75rem)] leading-none text-white"
      >
        ↓
      </button>
    </section>
  );
}

function ScrollFab() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const atEnd = y + window.innerHeight >= document.documentElement.scrollHeight - 80;
      setShow(y > window.innerHeight * 0.6 && !atEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      onClick={scrollNext}
      aria-label="Scroll down"
      className="anim-bob fixed right-[clamp(14px,3vw,24px)] bottom-[clamp(14px,3vw,24px)] z-30 flex size-[52px] cursor-pointer items-center justify-center rounded-full border border-white/20 bg-[rgba(27,36,32,0.9)] text-[26px] leading-none text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)] backdrop-blur-[8px]"
    >
      ↓
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Chaos: a broker's desktop, window by window                         */
/* ------------------------------------------------------------------ */

type Win = { title: string; bar: string; ink: string; badge: string; lines: string[] };

const WINDOWS: Win[] = [
  {
    title: "Outlook — Inbox",
    bar: "#0f6cbd",
    ink: "#fff",
    badge: "1,284",
    lines: [
      "RE: RE: RE: FW: quote?? Tacoma-Boise",
      "Rate needed ASAP Q-00008 — Corey",
      "URGENT reefer Salinas → Phoenix Fri",
      "FW: FW: invoice #4471 dispute",
      "Are you still able to cover Toledo?",
      "(no subject) — Harbor Foods",
    ],
  },
  {
    title: "TMS Pro v6.2 — Load Board (LEGACY)",
    bar: "#3a4763",
    ink: "#fff",
    badge: "",
    lines: [
      "L-88213 SUMMITBEV TACOMA→BOISE R PEND ???",
      "L-88212 BRICKTON BHM→BNA V OPEN 2400",
      "L-88204 SHIPPERCO BNA→GSP V NORATE",
      "⚠ Record locked by COREY since 08:02",
    ],
  },
  {
    title: "DAT ONE — Search Trucks",
    bar: "#ffcc00",
    ink: "#111",
    badge: "",
    lines: [
      "Tacoma, WA → Boise, ID · Reefer · 09/14",
      "12m  NW Cold Chain LLC  (253) 555-0142",
      "44m  Cascade Reefer Inc  (509) 555-0199",
      "1h   Puget Xpress  (206) 555-0177",
      "⟳ 38 results · call each to confirm",
    ],
  },
  {
    title: "TRUCKSTOP — Load Board",
    bar: "#c8102e",
    ink: "#fff",
    badge: "",
    lines: [
      "Posted: Tacoma → Boise · Reefer · 42,000 lb",
      "3 views · 0 calls · repost to bump",
      "Rate check $2,150–$2,700 (low confidence)",
      "Your subscription renews in 3 days",
    ],
  },
  {
    title: "WhatsApp — Carriers",
    bar: "#075e54",
    ink: "#fff",
    badge: "27",
    lines: [
      "boss u still need reefer tacoma?",
      "driver can do thurs not fri",
      "which load is this for??",
      "the one from last week",
      "rate??",
      "📎 BOL_scan_final_v2.jpg",
    ],
  },
  {
    title: "Messages — Corey (Pricing)",
    bar: "#e9e9eb",
    ink: "#111",
    badge: "4",
    lines: [
      "hey any rate on nashville greenville",
      "Q-00008",
      "customer asking again",
      "which one",
      "i emailed you the sheet tuesday",
      "cant find it resend?",
    ],
  },
  {
    title: "quotes_tracker_FINAL_v7 (2).xlsx",
    bar: "#217346",
    ink: "#fff",
    badge: "",
    lines: [
      "Quote  Cust      Lane     Rate   Sent?",
      "16     Summit    TAC-BOI  5500   ??",
      "8      Shipperco BNA-GSP  #REF!  ask corey",
      "9      Harbor    FAT-DEN  1250   y?",
      "⚠ File open by Adi. Changes may be lost.",
    ],
  },
  {
    title: "Outlook — RE: RE: quote?? Tacoma-Boise",
    bar: "#0f6cbd",
    ink: "#fff",
    badge: "",
    lines: [
      "Dana Reyes · Summit Beverage · 8:41 AM",
      "Hi — still waiting on this one, any number?",
      "Sent from my iPhone",
    ],
  },
  {
    title: "Google — reefer rate tacoma to boise",
    bar: "#fff",
    ink: "#111",
    badge: "",
    lines: [
      "About 2,340,000 results",
      "DAT RateView — Tacoma to Boise reefer",
      "Reddit: r/FreightBrokers — what would you charge",
      "Truckstop Rate Insights",
    ],
  },
  {
    title: "Outlook — Drafts (41)",
    bar: "#0f6cbd",
    ink: "#fff",
    badge: "41",
    lines: [
      "Re: Toledo → KC — unfinished",
      "Follow up Green Valley — unfinished",
      "Carrier packet request — unfinished",
      "(no subject)",
    ],
  },
  {
    title: "TMS Pro — Customer Lookup",
    bar: "#3a4763",
    ink: "#fff",
    badge: "",
    lines: [
      "Search: SUMMIT",
      "SUMMIT BEV",
      "SUMMIT BEVERAGE",
      "SUMMIT BEVERAGE CO (DUPLICATE?)",
      "SUMMITBEV LLC",
    ],
  },
  {
    title: "rate_con_L88199.pdf — Preview",
    bar: "#555",
    ink: "#fff",
    badge: "",
    lines: [
      "RATE CONFIRMATION",
      "Carrier: ____________",
      "Rate: $______  Pickup: 9/13",
      "Page 1 of 3",
    ],
  },
  {
    title: "Teams — Dispatch",
    bar: "#4b53bc",
    ink: "#fff",
    badge: "12",
    lines: [
      "Adi: who has the salinas load",
      "Adi: @Demo??",
      "Corey: on lunch back at 1",
      "You: can someone call harbor",
    ],
  },
  {
    title: "Calendar — Tuesday",
    bar: "#fff",
    ink: "#111",
    badge: "",
    lines: [
      "9:00  Call NW Cold Chain (again)",
      "9:30  Follow up Dana",
      "10:00 Pricing sync — Corey",
      "11:00 FIND TRUCK TOLEDO",
    ],
  },
  {
    title: "Messages — Driver Mike",
    bar: "#e9e9eb",
    ink: "#111",
    badge: "2",
    lines: ["at the dock nobody here", "gate code?", "hello?"],
  },
  {
    title: "Truckstop — Carrier Search",
    bar: "#c8102e",
    ink: "#fff",
    badge: "",
    lines: [
      "Reefer · within 100 mi of Tacoma",
      "NW Cold Chain LLC · MC 884120 · ✓ Auth",
      "Cascade Reefer Inc · MC 771093 · ⚠ Insurance",
      "Big Sky Trans · MC 910442",
    ],
  },
  {
    title: "carriers_master_list_OLD.xlsx",
    bar: "#217346",
    ink: "#fff",
    badge: "",
    lines: [
      "Carrier         Phone          Lanes",
      "NW Cold Chain   253-555-0142   PNW",
      "Puget Xpress    206-555-0177   WA/OR/ID",
      "Idaho Hauling   ???            ID",
    ],
  },
  {
    title: "Outlook — Junk (302)",
    bar: "#0f6cbd",
    ink: "#fff",
    badge: "302",
    lines: [
      "Rate needed — Q-00003 (Harbor Foods)",
      "Load tender — Alton Industrial",
      "You won't believe these fuel prices",
    ],
  },
  {
    title: "DAT — Rate View",
    bar: "#ffcc00",
    ink: "#111",
    badge: "",
    lines: [
      "Tacoma → Boise · Reefer",
      "Spot avg $2.61/mi · 7-day",
      "Low $2.12 · High $3.04",
      "Contract $2.48/mi",
    ],
  },
  {
    title: "WhatsApp — Dana (Summit)",
    bar: "#075e54",
    ink: "#fff",
    badge: "3",
    lines: ["hey any update?", "my boss is asking", "??"],
  },
  {
    title: "Zoom — Weekly Ops (recording)",
    bar: "#2d8cff",
    ink: "#fff",
    badge: "",
    lines: ["Adi · Corey · Demo · +2", "You are muted", "Corey: can everyone see my screen"],
  },
  {
    title: "TMS Pro — Error",
    bar: "#3a4763",
    ink: "#fff",
    badge: "",
    lines: ["Session expired.", "Unsaved changes will be lost.", "[ OK ]"],
  },
  {
    title: "Notes — TODO!!!",
    bar: "#f5d76e",
    ink: "#111",
    badge: "",
    lines: [
      "call cascade back",
      "toledo truck???",
      "ask corey Q-00008 AGAIN",
      "dana number today",
      "invoice 4471",
    ],
  },
  {
    title: "Messages — Corey",
    bar: "#e9e9eb",
    ink: "#111",
    badge: "1",
    lines: ["ok sending now", "actually which lane was it"],
  },
  {
    title: "Outlook — Sent",
    bar: "#0f6cbd",
    ink: "#fff",
    badge: "",
    lines: [
      "Re: quote?? Tacoma-Boise — 8:55 AM",
      "Re: quote?? Tacoma-Boise — 9:02 AM",
      "Sheet Q-00008 — to Corey (3rd time)",
    ],
  },
];

/* Deterministic pseudo-random placement so the pile looks the same every visit. */
function windowLayout(i: number) {
  const s = Math.sin(i * 12.9898) * 43758.5453;
  const r = s - Math.floor(s);
  const s2 = Math.sin(i * 78.233) * 43758.5453;
  const r2 = s2 - Math.floor(s2);
  return {
    x: Math.round(-4 + r * 80),
    y: Math.round(-6 + r2 * 82),
    w: Math.round(22 + r * 18),
    rot: Math.round((r2 - 0.5) * 10),
    delay: (i * 0.16).toFixed(2),
  };
}

function IncomingCall() {
  return (
    <div
      className="popin absolute right-[2.5%] bottom-[4%] z-[5] flex h-[48%] aspect-[9/19.5] flex-col items-center overflow-hidden rounded-[clamp(16px,4cqw,34px)] border-[clamp(3px,0.7cqw,6px)] border-black bg-[#1c1c1e] text-center text-white shadow-[0_20px_60px_rgba(0,0,0,0.7)]"
      style={{
        padding: "clamp(8px,2cqw,16px) clamp(6px,1.6cqw,12px)",
        transform: "rotate(2deg)",
        fontFamily: "-apple-system, ui-sans-serif, system-ui, sans-serif",
      }}
    >
      <span className="h-[clamp(5px,1.2cqw,9px)] w-[30%] shrink-0 rounded-full bg-black" />
      <div className="mt-[clamp(10px,2.6cqw,20px)] flex flex-col items-center gap-[clamp(2px,0.5cqw,4px)]">
        <span className="max-w-full truncate text-[clamp(8px,1.4cqw,13px)] leading-[1.1] font-medium tracking-[-0.01em]">
          Mike Halvorsen
        </span>
        <span className="whitespace-nowrap text-[clamp(6px,1.1cqw,10px)] text-[#aeaeb2]">
          NW Cold Chain
        </span>
      </div>
      <div className="mt-auto flex w-full shrink-0 flex-col gap-[clamp(4px,1cqw,8px)]">
        <div className="flex w-full justify-between px-[clamp(2px,0.6cqw,6px)]">
          <div className="flex flex-col items-center gap-[clamp(2px,0.5cqw,4px)]">
            <span className="flex size-[clamp(22px,5cqw,42px)] items-center justify-center rounded-full bg-[#ff3b30]">
              <PhoneIcon
                className="block h-[55%] w-[55%]"
                style={{ transform: "rotate(135deg)" }}
              />
            </span>
            <span className="text-[clamp(6px,1.1cqw,9px)] text-[#d1d1d6]">Decline</span>
          </div>
          <div className="flex flex-col items-center gap-[clamp(2px,0.5cqw,4px)]">
            <span className="flex size-[clamp(22px,5cqw,42px)] items-center justify-center rounded-full bg-[#34c759] [animation:pulse_1s_ease-in-out_infinite]">
              <PhoneIcon className="block h-[55%] w-[55%]" />
            </span>
            <span className="text-[clamp(6px,1.1cqw,9px)] text-[#d1d1d6]">Accept</span>
          </div>
        </div>
        <span className="mx-auto h-[clamp(2px,0.5cqw,4px)] w-[28%] rounded-full bg-white opacity-90" />
      </div>
    </div>
  );
}

function Chaos() {
  const { after, clear } = useTimers();
  const [on, setOn] = useState(false);
  const [count, setCount] = useState(0);
  const [showCall, setShowCall] = useState(false);
  const [showText, setShowText] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  const start = useCallback(() => {
    clear();
    setOn(true);
    setCount(0);
    setShowCall(false);
    setShowText(false);
    const n = WINDOWS.length;
    for (let i = 1; i <= n; i++) after(i * 160, () => setCount(i));
    after(n * 160 + 500, () => setShowCall(true));
    after(n * 160 + 2600, () => setShowText(true));
  }, [after, clear]);

  useEffect(() => {
    const el = boardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            start();
          }
        });
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [start]);

  const replay = () => {
    clear();
    setOn(false);
    setCount(0);
    setShowCall(false);
    setShowText(false);
    after(50, start);
  };

  return (
    <section
      data-screen="chaos"
      className="flex flex-col items-center gap-8 px-4 pt-10 pb-20 sm:px-6"
    >
      <h2 className="m-0 text-center font-display text-[clamp(1.75rem,4vw,3.25rem)] tracking-[-0.025em] text-balance text-fog">
        A broker's screen, 9:14 on a Tuesday.
      </h2>
      <div
        ref={boardRef}
        className="deep-shadow relative w-full max-w-[1400px] overflow-hidden rounded-xl bg-[#2a2d2b]"
        style={{ aspectRatio: "var(--chaos-ar, 16 / 9)", containerType: "inline-size" }}
      >
        {on &&
          WINDOWS.map((w, i) => {
            const l = windowLayout(i);
            return (
              <div
                key={i}
                className="popin absolute overflow-hidden rounded-[3px] border border-[#6b6b6b] bg-white text-[#222]"
                style={
                  {
                    left: `${l.x}%`,
                    top: `${l.y}%`,
                    width: `max(${l.w}%, var(--win-min, 0%))`,
                    "--rot": `${l.rot}deg`,
                    transform: `rotate(${l.rot}deg)`,
                    animationDelay: `${l.delay}s`,
                    boxShadow: "0 14px 40px rgba(0,0,0,0.55)",
                    fontFamily: "Arial, Helvetica, sans-serif",
                    fontSize: "clamp(8px, 1.6cqw, 12px)",
                  } as CSSProperties
                }
              >
                <div
                  className="flex items-center justify-between gap-[0.6em] px-[0.8em] py-[0.5em] font-bold"
                  style={{ background: w.bar, color: w.ink }}
                >
                  <span className="truncate">{w.title}</span>
                  {w.badge ? (
                    <span className="anim-pulse shrink-0 rounded-[1em] bg-[#e0202a] px-[0.6em] text-[0.9em] text-white">
                      {w.badge}
                    </span>
                  ) : null}
                </div>
                <div
                  className="flex flex-col gap-[0.35em] px-[0.8em] py-[0.6em] leading-[1.3]"
                  style={{ background: w.bar === "#fff" ? "#fff" : "#fdfdfd" }}
                >
                  {w.lines.map((ln, j) => (
                    <div key={j} className="truncate">
                      {ln}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        <div className="absolute top-4 left-4 z-[5] rounded-md bg-black/60 px-3 py-1.5 font-mono text-[clamp(11px,1.2vw,15px)] tracking-[0.06em] text-white">
          {count} WINDOWS OPEN
        </div>
        {showCall ? <IncomingCall /> : null}
        {showText ? (
          <div className="absolute inset-0 z-[6] flex flex-col items-center justify-center gap-3 bg-[rgba(15,21,19,0.78)] px-4 text-center [animation:riseIn_0.7s_both]">
            <p className="m-0 font-display text-[clamp(1.125rem,2.6vw,2.5rem)] tracking-[-0.02em] text-ink-faint">
              Dozens of windows. A phone that won't stop.
            </p>
            <p className="m-0 font-display text-[clamp(3rem,9vw,8.75rem)] leading-none tracking-[-0.04em] text-white">
              One load.
            </p>
          </div>
        ) : null}
      </div>
      <button
        type="button"
        onClick={replay}
        className="cursor-pointer rounded-md border border-white/20 bg-transparent px-4 py-2 text-sm text-fog transition-colors hover:text-white"
      >
        Replay
      </button>
    </section>
  );
}

function Hiring() {
  return (
    <section
      data-screen="hiring"
      className="flex flex-col items-center justify-center gap-12 px-6 py-[clamp(64px,12vw,120px)] text-center"
    >
      <h2 className="m-0 max-w-[1100px] font-display text-[clamp(2.25rem,6vw,6rem)] leading-[1.05] text-balance text-white">
        More loads meant <span className="text-gold">hiring more people.</span>
      </h2>
      <p className="m-0 font-display text-[clamp(1.75rem,4.5vw,4rem)] text-mint">Until today.</p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* One window: the interactive load                                    */
/* ------------------------------------------------------------------ */

type Check = { text: string; call?: boolean; warn?: boolean };

const CHECKS: Check[] = [
  { text: "DAT: 38 reefers within 100 mi of Tacoma for 9/14. Shortlisted 6." },
  { text: "Truckstop: rate check $2,150–$2,700. Reposted your load." },
  {
    text: "You usually message Mike at NW Cold Chain on WhatsApp, so I reached him there. He replied: truck available, $2,400.",
  },
  {
    text: "Emailed the other 3 carriers you've used on this lane; texted Cascade Reefer since that's how they answer.",
  },
  {
    text: "You usually call Ray at Puget Xpress. Calling from here logs it to the load and I'll take notes while you talk.",
    call: true,
  },
  {
    text: "Sent the $2,875 all-in to Sam, the owner, for approval. It won't go to Dana until Sam signs off.",
  },
  { text: "Dana's reply is drafted below. One thing needs you: press Send.", warn: true },
];

const CHIPS = [
  "Find me a truck and get Dana a number today",
  "Send this to the pricing desk",
  "Find carriers for this lane",
];

const monoLabel = "block font-mono text-[10px] uppercase tracking-[0.06em] text-ink-faint";

function OneWindow() {
  const { after, clear } = useTimers();
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [typed, setTyped] = useState("");
  const [userText, setUserText] = useState("");

  const busy = step > 0 && step < 20;
  const done = step >= 20;

  const run = (text: string) => {
    if (busy) return;
    clear();
    setStep(1);
    setSent(false);
    setUserText(text);
    setTyped("");
    after(900, () => setStep(2));
    after(2200, () => setStep(3));
    CHECKS.forEach((_, i) => after(3300 + i * 1000, () => setStep(4 + i)));
    after(3300 + CHECKS.length * 1000 + 400, () => setStep(20));
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const t = typed.trim();
    if (t) run(t);
  };

  const replay = () => {
    clear();
    setStep(0);
    setSent(false);
    setTyped("");
    setUserText("");
  };

  const checksShown = done ? CHECKS.length : Math.max(0, Math.min(CHECKS.length, step - 3));
  const stage = sent
    ? { n: 4, label: "Step 4 of 5 · with customer", bg: "#f0f5f6", bar: "#4c7280", ink: "#3d5e6a" }
    : done
      ? {
          n: 2,
          label: "Step 2 of 5 · ready to send",
          bg: "#eef5f1",
          bar: "#2f6f5e",
          ink: "#265b4d",
        }
      : {
          n: 2,
          label: "Step 2 of 5 · quote drafted",
          bg: "#faf5e8",
          bar: "#b8862a",
          ink: "#7f5710",
        };
  const tag = sent
    ? { text: "Sent", ink: "#265b4d", bg: "#eef5f1", border: "#c3d9cc" }
    : { text: "Waiting on you", ink: "#7f5710", bg: "#faf5e8", border: "#e6d6ae" };

  return (
    <section
      data-screen="one-window"
      className="flex flex-col items-center gap-7 bg-paper px-4 pt-10 pb-20 text-ink sm:px-6"
    >
      <span className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-ink px-[18px] py-2 font-mono text-[13px] uppercase tracking-[0.08em] text-white">
        <span className="anim-pulse size-2 rounded-full bg-mint" />
        Interactive · this one works
      </span>
      <h2 className="m-0 text-center font-display text-[clamp(2rem,5vw,4.5rem)] text-balance">
        One window. <span className="text-forest">Try it.</span>
      </h2>
      <p className="m-0 max-w-[620px] text-center text-[clamp(1rem,1.6vw,1.25rem)] text-pretty text-ink-muted">
        This is a real load in Manifest, running below. Tap the highlighted suggestion or type
        anything into the box, then watch the thread.
      </p>

      <div className="flex w-full max-w-[1200px] overflow-hidden rounded-xl border border-line bg-white text-[15px] leading-[1.45] shadow-[0_30px_90px_rgba(27,36,32,0.18)]">
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Load header */}
          <div
            className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-line border-l-[5px] px-3 py-3.5 transition-colors duration-500 sm:px-5"
            style={{ background: stage.bg, borderLeftColor: stage.bar }}
          >
            <div className="flex min-w-0 flex-col gap-[3px]">
              <div
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.06em]"
                style={{ color: stage.ink }}
              >
                <span
                  className="flex size-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{ background: stage.bar }}
                >
                  {stage.n}
                </span>
                {stage.label}
              </div>
              <div className="truncate text-lg font-semibold">
                <span className="mr-2.5 font-mono text-[13px] font-normal text-ink-faint">
                  Q-00016
                </span>
                Tacoma, WA → Boise, ID
              </div>
              <div className="text-[13px] text-ink-muted">
                Summit Beverage · Reefer · 42,000 lb · pickup Sep 14
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-[13px] text-ink-muted">
              <span>
                <span className={monoLabel}>Rate</span>
                <b className="font-semibold text-ink">{done ? "$2,875" : "—"}</b>
              </span>
              <span>
                <span className={monoLabel}>Carrier</span>
                <b className="font-semibold text-ink">{step >= 6 ? "NW Cold Chain" : "—"}</b>
              </span>
              <span>
                <span className={monoLabel}>Miles</span>
                <b className="font-semibold text-ink">508</b>
              </span>
            </div>
          </div>

          {/* Thread */}
          <div className="flex min-h-[clamp(260px,50vw,380px)] flex-col gap-4 bg-paper p-3 sm:p-5">
            <div className="max-w-[720px] rounded-[10px] border border-line bg-white px-4 py-3.5">
              <div className="flex justify-between gap-3 text-xs text-ink-faint">
                <span>
                  <b className="font-semibold text-ink">Dana Reyes</b> · Summit Beverage
                </span>
                <span className="font-mono">Tue 8:41 AM</span>
              </div>
              <div className="mt-1 font-semibold">RE: quote?? Tacoma-Boise</div>
              <div className="mt-1 text-ink-muted">
                Hi — need a reefer Tacoma to Boise picking up the 14th, 42k lbs of canned goods,
                keep at 38°F. Can you get me a number today?
              </div>
            </div>

            {step >= 1 ? (
              <div className="max-w-[560px] self-end rounded-[14px_14px_4px_14px] bg-ink px-4 py-2.5 text-white [animation:riseIn_0.35s_both]">
                {userText}
              </div>
            ) : null}

            {step === 2 ? (
              <div className="flex gap-1.5 px-1 py-2">
                <span className="anim-blink size-[7px] rounded-full bg-ink-faint" />
                <span className="anim-blink size-[7px] rounded-full bg-ink-faint [animation-delay:0.2s]" />
                <span className="anim-blink size-[7px] rounded-full bg-ink-faint [animation-delay:0.4s]" />
              </div>
            ) : null}

            {step >= 3 ? (
              <div className="flex max-w-[820px] gap-3 [animation:riseIn_0.35s_both]">
                <span className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-forest text-[13px] font-bold text-white">
                  M
                </span>
                <div className="flex min-w-0 flex-col gap-3">
                  <p className="m-0 text-[17px]">
                    Bet. I'm going into DAT and Truckstop now, then I'll reach the carriers myself,
                    wherever they already are.
                  </p>
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {CHECKS.slice(0, checksShown).map((c) => {
                      const color = c.warn ? "#565f5c" : "#1b2420";
                      const dot = c.warn || c.call ? "transparent" : "#2f6f5e";
                      const ring = c.warn ? "#b8862a" : "#2f6f5e";
                      const mark = c.warn ? "!" : c.call ? "✆" : "✓";
                      const markInk = c.call ? "#2f6f5e" : "#fff";
                      return (
                        <li
                          key={c.text}
                          className="anim-tick flex flex-wrap items-start gap-2.5"
                          style={{ color }}
                        >
                          <span
                            className="mt-0.5 flex size-[18px] shrink-0 items-center justify-center rounded-full border-2 text-[10px] font-bold"
                            style={{ background: dot, borderColor: ring, color: markInk }}
                          >
                            {mark}
                          </span>
                          <span className="min-w-[200px] flex-1">{c.text}</span>
                          {c.call ? (
                            <a
                              href="tel:+12065550177"
                              className="ml-7 inline-flex w-max max-w-full basis-full items-center gap-2.5 whitespace-nowrap rounded-lg bg-forest py-2.5 pr-4 pl-3 text-sm font-semibold text-white no-underline"
                            >
                              <span className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-white/[0.18]">
                                <PhoneIcon className="size-3.5" />
                              </span>
                              Call Ray
                              <span className="font-normal opacity-80 tabular-nums">
                                (206) 555-0177
                              </span>
                            </a>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ) : null}

            {done ? (
              <div className="max-w-[820px] overflow-hidden rounded-[10px] border border-line bg-white shadow-[0_8px_30px_rgba(27,36,32,0.08)] [animation:riseIn_0.4s_both] sm:ml-[42px]">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
                  <span className="font-semibold">Draft · reply to Summit Beverage</span>
                  <span
                    className="rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em]"
                    style={{ color: tag.ink, background: tag.bg, borderColor: tag.border }}
                  >
                    {tag.text}
                  </span>
                </div>
                <div className="flex flex-col gap-1 border-b border-line px-4 py-3 text-[13px] text-ink-muted">
                  <div>
                    <span className="inline-block w-[72px] font-mono text-[10px] uppercase tracking-[0.06em] text-ink-faint">
                      To
                    </span>
                    dana.reyes@summitbev.com
                  </div>
                  <div>
                    <span className="inline-block w-[72px] font-mono text-[10px] uppercase tracking-[0.06em] text-ink-faint">
                      Attached
                    </span>
                    Q-00016 request sheet.pdf
                  </div>
                </div>
                <div className="flex flex-col gap-2 px-4 py-3.5 text-ink">
                  <p className="m-0">Hi Dana,</p>
                  <p className="m-0">
                    Tacoma, WA to Boise, ID, reefer at 38°F, 42,000 lb, picking up Sep 14:{" "}
                    <b>$2,875 all-in</b>. Truck confirmed with a carrier we've used on this lane
                    before.
                  </p>
                  <p className="m-0">Say the word and we'll lock it in.</p>
                </div>
                {sent ? (
                  <div className="flex items-center gap-2.5 border-t border-line bg-[#eef5f1] px-4 py-3 text-forest-deep [animation:riseIn_0.3s_both]">
                    <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-forest text-[10px] font-bold text-white">
                      ✓
                    </span>
                    Sent 9:17 AM from your Outlook. Q-00016 moved to With customer. I'll follow up
                    if Dana goes quiet for a day.
                  </div>
                ) : (
                  <div className="flex flex-wrap items-center justify-end gap-2 border-t border-line bg-paper px-4 py-3">
                    <span className="px-3 py-2 text-[13px] text-ink-muted">Discard</span>
                    <span className="rounded-md border border-line bg-white px-3 py-2 text-[13px]">
                      Edit
                    </span>
                    <button
                      type="button"
                      onClick={() => setSent(true)}
                      className="anim-glow cursor-pointer rounded-md bg-forest px-[22px] py-[9px] text-[15px] font-semibold text-white"
                    >
                      Send
                    </button>
                  </div>
                )}
              </div>
            ) : null}
          </div>

          {/* Composer */}
          <div className="relative flex flex-col gap-2.5 border-t border-line bg-white px-3 py-3.5 sm:px-5">
            {step === 0 ? (
              <div className="anim-bob flex items-center gap-2 text-[13px] font-semibold text-forest">
                <span className="text-lg leading-none">↓</span>Tap this to start
              </div>
            ) : null}
            <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 text-[13px] text-ink-muted">
              {CHIPS.map((chip, i) => (
                <button
                  key={chip}
                  type="button"
                  disabled={busy}
                  onClick={() => run(chip)}
                  className={`shrink-0 cursor-pointer whitespace-nowrap rounded-[20px] border px-3.5 py-1.5 text-[13px] disabled:cursor-default ${
                    i === 0
                      ? "anim-glow-gold border-gold-deep bg-[#faf5e8] font-semibold text-[#553a0b]"
                      : "border-line bg-white text-ink-muted"
                  }`}
                >
                  {chip}
                </button>
              ))}
            </div>
            <form
              onSubmit={submit}
              className="flex items-center gap-2 rounded-[10px] border border-line bg-white py-1.5 pr-1.5 pl-3.5"
            >
              <input
                value={typed}
                onChange={(e) => setTyped(e.target.value)}
                placeholder={
                  busy
                    ? "Working… you can leave and come back."
                    : "Ask about this load, or tell it what to do next"
                }
                disabled={busy}
                aria-label="Message Manifest"
                className="min-w-0 flex-1 border-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-faint"
              />
              <button
                type="submit"
                disabled={busy}
                className="cursor-pointer rounded-md bg-forest px-4 py-2 text-sm font-medium text-white disabled:cursor-default disabled:opacity-70"
              >
                Send
              </button>
            </form>
            <div className="flex flex-wrap justify-between gap-3 text-xs text-ink-faint">
              <span>
                Nothing here sends mail on its own. Drafts wait in the thread for you to send.
              </span>
              <button
                type="button"
                onClick={replay}
                className="cursor-pointer border-0 bg-transparent p-0 text-xs text-forest underline"
              >
                Replay
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Agents, connections, human in the loop, close                       */
/* ------------------------------------------------------------------ */

const AGENTS = [
  {
    kicker: "Intake",
    dot: "#2f6f5e",
    title: "Inbox and phone",
    body: "3 new requests since 8am, read and queued. Mike's accident call answered in Manifest, matched to Q-00016, transcribed, Dana's heads-up drafted. Sam's call to coordinate the re-cover logged to the same load.",
  },
  {
    kicker: "Your team",
    dot: "#4c7280",
    title: "Approvals routed",
    body: "2 quotes with the owner for sign-off before pricing goes to the shipper. Q-00008 has waited a day; the nudge is drafted.",
  },
  {
    kicker: "Carriers",
    dot: "#b8862a",
    title: "Carriers, where they live",
    body: "DAT and Truckstop checked. 9 carriers reached on WhatsApp, Telegram, text and email, each the way they already talk to you. The two you always call are queued with a Call button. 3 replied.",
  },
  {
    kicker: "Follow-ups",
    dot: "#b04a2d",
    title: "Nobody forgotten",
    body: "2 customers unanswered for a day. Follow-ups written, waiting in their threads.",
  },
  {
    kicker: "Paperwork",
    dot: "#5f8592",
    title: "Rate cons, BOLs, PODs",
    body: "Rate confirmation drafted the moment a carrier is booked. Driver's BOL and POD photos filed to the load, not your phone.",
  },
  {
    kicker: "Invoicing",
    dot: "#3f8672",
    title: "Billed on delivery",
    body: "POD in, invoice drafted with the rate you quoted and the accessorials that actually happened. Chases the ones past due.",
  },
];

function Team() {
  return (
    <section
      data-screen="team"
      className="flex flex-col items-center gap-10 px-4 py-[clamp(64px,12vw,120px)] sm:px-6"
    >
      <h2 className="m-0 text-center font-display text-[clamp(2rem,5vw,4.5rem)] text-balance text-white">
        A team of agents ready to work for you.
      </h2>
      <p className="-mt-4 m-0 max-w-[760px] text-center text-[clamp(1rem,1.8vw,1.375rem)] text-pretty text-fog">
        From reading the request, to reaching carriers, to pricing, to the customer reply, to the
        rate con, the BOL, the POD and the invoice: every step of the load, handled, and handed to
        you to approve.
      </p>
      <div className="grid w-full max-w-[1200px] grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-4">
        {AGENTS.map((a, i) => (
          <div key={a.kicker} className="flex flex-col gap-3 rounded-xl bg-white p-6 text-ink">
            <div className="flex items-center gap-2.5">
              <span
                className="anim-pulse-slow block size-2.5 rounded-full"
                style={{ background: a.dot, animationDelay: `${i * 0.4}s` }}
              />
              <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-ink-faint">
                {a.kicker}
              </span>
            </div>
            <div className="text-[22px] leading-[1.15] font-semibold">{a.title}</div>
            <div className="text-[15px] leading-[1.45] text-ink-muted">{a.body}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const CONNECTIONS = [
  "Outlook",
  "Your TMS",
  "DAT",
  "Truckstop",
  "WhatsApp",
  "Telegram",
  "Texts",
  "Your phone",
];

function Connected() {
  return (
    <section
      data-screen="connected"
      className="flex flex-col items-center gap-7 px-4 pt-[clamp(48px,8vw,80px)] pb-[clamp(64px,12vw,120px)] text-center sm:px-6"
    >
      <div className="flex max-w-[900px] flex-wrap justify-center gap-2.5">
        {CONNECTIONS.map((c) => (
          <span
            key={c}
            className="rounded-lg border border-white/[0.18] px-[18px] py-2.5 text-[clamp(0.875rem,1.5vw,1.125rem)] font-medium text-fog-bright"
          >
            {c}
          </span>
        ))}
        <span className="rounded-lg border border-dashed border-white/30 px-[18px] py-2.5 text-[clamp(0.875rem,1.5vw,1.125rem)] text-ink-faint">
          Anything else you use
        </span>
      </div>
      <h2 className="m-0 font-display text-[clamp(2.5rem,7vw,6.875rem)] leading-none tracking-[-0.035em] text-white">
        Connected. <span className="text-mint">Free.</span>
      </h2>
      <p className="m-0 max-w-[640px] text-[clamp(1rem,1.8vw,1.375rem)] text-pretty text-fog">
        If it exists and you have access to it, we connect it for you. No integration or
        implementation fee, for anything.
      </p>
      <div className="flex max-w-[720px] flex-col gap-2 rounded-xl border border-mint/35 bg-forest/[0.12] px-6 py-5 text-left">
        <span className="font-mono text-xs uppercase tracking-[0.08em] text-mint">
          How is that free?
        </span>
        <p className="m-0 text-[clamp(0.9375rem,1.6vw,1.1875rem)] leading-[1.5] text-pretty text-fog-bright">
          We figured out how to do all these integrations in an afternoon, one time, and it always
          just works, rather than sending an engineer onsite.
        </p>
      </div>
      <p className="m-0 max-w-[640px] text-[clamp(1rem,1.8vw,1.375rem)] text-pretty text-fog">
        Contact your carriers where they already live: WhatsApp, Telegram, text, email or a call,
        all from the load.
      </p>
      <p className="m-0 max-w-[640px] text-[clamp(1rem,1.8vw,1.375rem)] text-pretty text-fog">
        Calls ring in Manifest too. A carrier with a breakdown, a shipper with a new load, a
        colleague sorting out a pickup: whoever's calling, it lands on the right load, and the next
        step is drafted before you hang up.
      </p>
    </section>
  );
}

function Human() {
  return (
    <section
      data-screen="human"
      className="flex flex-col items-center gap-6 bg-paper px-6 py-[clamp(48px,8vw,80px)] text-center text-ink"
    >
      <p className="eyebrow-ink m-0">Human in the loop</p>
      <h2 className="m-0 max-w-[960px] font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] text-balance">
        The agents do the legwork.
        <br />
        You keep the relationships.
      </h2>
      <p className="m-0 max-w-[720px] text-[clamp(1rem,1.8vw,1.375rem)] text-pretty text-ink-muted">
        Nothing goes to a shipper or a carrier without a person pressing Send. The calls that need a
        human voice stay yours. Manifest clears the typing, the chasing, the paperwork and the
        tab-switching so you have time to make them.
      </p>
    </section>
  );
}

function SameTeam() {
  return (
    <section
      data-screen="same-team"
      className="flex flex-col items-center gap-2 px-6 py-[clamp(48px,8vw,80px)] text-center"
    >
      <h2 className="m-0 font-display text-[clamp(2.5rem,7vw,7.5rem)] leading-none tracking-[-0.04em] text-ink-faint">
        Same team.
      </h2>
      <h2 className="m-0 font-display text-[clamp(3rem,9vw,10rem)] leading-none tracking-[-0.04em] text-white">
        <span className="text-mint">10×</span> the loads.
      </h2>
    </section>
  );
}

function Dashboard() {
  return (
    <section
      id="open"
      data-screen="dashboard"
      className="flex flex-col items-center gap-8 px-4 pt-[clamp(48px,8vw,80px)] pb-[clamp(64px,12vw,120px)] sm:px-6"
    >
      <div
        className="deep-shadow w-full max-w-[1400px] overflow-hidden rounded-[14px] border border-[#3a4540] bg-[#0f1513]"
        style={{ aspectRatio: "var(--dash-ar, 1.86)" }}
      >
        <img
          src={dashboardShot}
          alt="The Manifest dashboard: sixteen active quotes, each with its stage and the next step waiting on you."
          className="block h-full w-full object-cover object-left-top"
          loading="lazy"
        />
      </div>
      <h2 className="m-0 max-w-[960px] text-center font-display text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] text-balance text-white">
        Make more money with less annoying work.
      </h2>
      <p className="-mt-2 m-0 max-w-[720px] text-center text-[clamp(1.0625rem,2vw,1.5rem)] text-pretty text-fog">
        You became a broker to connect people and make money, not to drown in paperwork.
      </p>
      <p className="eyebrow m-0">Private beta</p>
      <p className="m-0 max-w-[720px] text-center text-[clamp(1.125rem,2.2vw,1.75rem)] leading-[1.3] text-balance text-white">
        We're working with <b className="text-mint">five brokerages</b> right now. The product is
        ready; before we bring more people on, we sit with each one to make sure it fits their exact
        workflow. That's why there's no sign-up button here, just a call.
      </p>
      <a
        href={CAL_URL}
        target="_blank"
        rel="noreferrer"
        className={`${BTN_PRIMARY} anim-glow px-8 py-4 text-lg`}
      >
        Book a 20-minute call
      </a>
      <p className="m-0 text-center text-sm text-ink-faint">
        Your Outlook, connected in one sign-in. Nothing sends without you.
      </p>
    </section>
  );
}

function Walkthrough() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <ScrollFab />
        <Chaos />
        <Hiring />
        <OneWindow />
        <Team />
        <Connected />
        <Human />
        <SameTeam />
        <Dashboard />
      </main>
      <SiteFooter />
    </div>
  );
}
