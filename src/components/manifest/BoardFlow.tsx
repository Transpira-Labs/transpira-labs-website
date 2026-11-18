import { useEffect, useRef, useState } from "react";

/*
 * A diagram of how the board fills itself: an email source and a text source
 * on one side, the board on the other. Each event lights its source, sends a
 * packet down the wire, and lands on the board, where one load's card picks
 * up a new status or moves a column. It loops while it is on screen.
 *
 * TODO(before launch): the load, carrier and prices are illustrative, the same
 * ones the rest of the site uses.
 */
type Source = "email" | "text";

// Each event: where it comes from, what it says, and the card's column and status once it lands.
const EVENTS: { from: Source; says: string; col: number; status: string }[] = [
  { from: "email", says: "Erin Caldwell asks for a quote", col: 0, status: "New request" },
  { from: "text", says: "You reply yes to $2,100", col: 0, status: "Quote sent · $2,100" },
  { from: "email", says: "Erin says yes", col: 1, status: "Posted to DAT and Truckstop" },
  { from: "text", says: "You pick Bluegrass", col: 1, status: "Bluegrass booked" },
  { from: "text", says: "Driver: picked up", col: 2, status: "Picked up · on time" },
  { from: "text", says: "You reply yes to the invoice", col: 3, status: "Invoice sent" },
];

const COLUMNS = ["Quote", "Covering", "On the road", "Paid"];

// Loads already on the board, so it does not read as empty: [column, load, who].
const OTHERS: [number, string, string][] = [
  [0, "Ford Expedition", "Tyler Brooks"],
  [1, "Bobcat S650", "Delta Haul"],
  [2, "CAT 305", "Valdosta → Mobile"],
];

const STEP_MS = 2400; // one event
const TRAVEL_MS = 900; // the packet's trip down the wire
const LAST = EVENTS.length - 1;

function EmailIcon() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="m4 7.5 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
      <rect
        x="6.5"
        y="2.5"
        width="11"
        height="19"
        rx="2.6"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M10.5 18.5h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

export function BoardFlow() {
  const root = useRef<HTMLDivElement>(null);
  // `fired` is the event whose packet has left; `landed` is the last one to reach the board.
  const [fired, setFired] = useState(LAST);
  const [landed, setLanded] = useState(LAST);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(true);

  // Plays only while the diagram is on screen, and not at all for people who ask for less motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setStill(false);
    const el = root.current;
    if (!el) return;
    const seen = new IntersectionObserver(([entry]) => setRunning(entry.isIntersecting), {
      threshold: 0.35,
    });
    seen.observe(el);
    return () => seen.disconnect();
  }, []);

  useEffect(() => {
    if (!running || paused) return;
    let land = 0;
    const fire = () => {
      setFired((n) => {
        const next = n >= LAST ? 0 : n + 1;
        if (next === 0) setLanded(-1);
        window.clearTimeout(land);
        land = window.setTimeout(() => setLanded(next), TRAVEL_MS);
        return next;
      });
    };
    const first = window.setTimeout(fire, 500);
    const tick = window.setInterval(fire, STEP_MS);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(land);
      window.clearInterval(tick);
    };
  }, [running, paused]);

  const inFlight = !still && fired !== landed ? EVENTS[fired] : null;
  const at = landed >= 0 ? EVENTS[landed] : null;
  // Each source shows the last thing it sent.
  const lastFrom = (from: Source) => {
    for (let n = Math.max(fired, 0); n >= 0; n--)
      if (EVENTS[n].from === from) return EVENTS[n].says;
    return from === "email" ? "Watching your inbox" : "Watching your texts";
  };

  return (
    <div ref={root} className="mf-flow">
      <div className="mf-flow-sources">
        {(["email", "text"] as const).map((from) => (
          <div key={from} className="mf-flow-src" data-on={EVENTS[fired]?.from === from && !still}>
            <span className="mf-flow-icon">{from === "email" ? <EmailIcon /> : <PhoneIcon />}</span>
            <span>
              <strong>{from === "email" ? "Your inbox" : "Your texts"}</strong>
              <span>
                {still
                  ? from === "email"
                    ? "Quote requests and replies"
                    : "Your yes, and drivers' updates"
                  : lastFrom(from)}
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="mf-flow-wires" aria-hidden="true">
        {(["email", "text"] as const).map((from) => (
          <span key={from} className="mf-flow-wire">
            {inFlight?.from === from ? <span key={fired} className="mf-flow-packet" /> : null}
          </span>
        ))}
      </div>

      <div className="mf-flow-board">
        <div className="mf-flow-bar">
          <strong>Manifest board</strong>
          {still ? null : (
            <button type="button" className="mf-flow-pause" onClick={() => setPaused(!paused)}>
              {paused ? "Play" : "Pause"}
            </button>
          )}
        </div>
        <div className="mf-flow-cols">
          {COLUMNS.map((c) => (
            <span key={c} className="mf-flow-col-name">
              {c}
            </span>
          ))}
        </div>
        <div className="mf-flow-lane">
          <div
            className="mf-flow-card mf-flow-card--live"
            data-shown={at !== null}
            style={{ ["--col" as string]: at ? at.col : 0 }}
          >
            <div>
              <strong>Kubota tractor</strong>
              <span key={landed} className="mf-flow-status">
                {at ? at.status : ""}
              </span>
            </div>
          </div>
        </div>
        <div className="mf-flow-cols">
          {COLUMNS.map((c, n) => (
            <div key={c} className="mf-flow-col">
              {OTHERS.filter(([col]) => col === n).map(([, load, who]) => (
                <div key={load} className="mf-flow-card">
                  <div>
                    <strong>{load}</strong>
                    <span>{who}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
        <p className="mf-flow-caption">
          One load, moved across the board by two emails and four texts.
        </p>
      </div>
    </div>
  );
}
