import { useEffect, useRef, useState } from "react";

/*
 * A diagram of how the board fills itself. Three channels sit on one side:
 * the broker's inbox, the broker's texts, and the load boards. The board sits
 * on the other. Each event sends a packet down one wire: amber when something
 * comes in, black when the agent sends something out. One load's card picks up
 * a new status or moves a column as each one lands. It loops while on screen.
 *
 * TODO(before launch): the load, carriers and prices are illustrative, the
 * same ones the rest of the site uses.
 */
type Channel = "email" | "text" | "boards";

// Each event: its channel, whether it comes in or goes out, what the channel
// shows, and the card's column and status once it has happened.
const EVENTS: { via: Channel; out?: boolean; says: string; col: number; status: string }[] = [
  { via: "email", says: "Erin asks for a quote", col: 0, status: "New request" },
  {
    via: "text",
    out: true,
    says: "Agent: $2,100. Send it?",
    col: 0,
    status: "Waiting on your yes",
  },
  { via: "text", says: "You: Yes", col: 0, status: "Approved" },
  { via: "email", out: true, says: "Quote sent to Erin", col: 0, status: "Quote sent · $2,100" },
  { via: "email", says: "Erin says yes", col: 1, status: "Won. Needs a truck" },
  {
    via: "boards",
    out: true,
    says: "Posted on DAT and Truckstop",
    col: 1,
    status: "Posted for carriers",
  },
  { via: "boards", says: "Bluegrass bids $1,750", col: 1, status: "1 bid in" },
  { via: "boards", says: "Delta Haul bids, Friday pickup", col: 1, status: "2 bids in" },
  { via: "text", out: true, says: "Agent: Book Bluegrass?", col: 1, status: "Waiting on your yes" },
  { via: "text", says: "You: Yes", col: 1, status: "Bluegrass booked" },
  { via: "email", out: true, says: "Rate con sent to Bluegrass", col: 1, status: "Rate con sent" },
  { via: "text", says: "Driver: picked up", col: 2, status: "Picked up · on time" },
  { via: "text", says: "Driver: delivered", col: 2, status: "Delivered" },
  { via: "text", says: "You: Yes to the invoice", col: 3, status: "Invoice approved" },
  {
    via: "email",
    out: true,
    says: "Invoice sent to Erin",
    col: 3,
    status: "Invoice sent · $2,100",
  },
];

const CHANNELS: { id: Channel; name: string; idle: string }[] = [
  { id: "email", name: "Your inbox", idle: "Quote requests in, quotes and paperwork out" },
  { id: "text", name: "Your texts", idle: "The agent asks, you answer" },
  { id: "boards", name: "Load boards", idle: "DAT and Truckstop: posts out, bids in" },
];

const COLUMNS = ["Quote", "Covering", "On the road", "Paid"];

// Loads already on the board, so it does not read as empty: [column, load, who].
const OTHERS: [number, string, string][] = [
  [0, "Ford Expedition", "Tyler Brooks"],
  [1, "Bobcat S650", "Delta Haul"],
  [2, "CAT 305", "Valdosta → Mobile"],
];

const STEP_MS = 2000; // one event
const TRAVEL_MS = 850; // the packet's trip down the wire
const LAST = EVENTS.length - 1;

function Icon({ of }: { of: Channel }) {
  const line = { stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const };
  return (
    <svg aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none">
      {of === "email" ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2.5" {...line} />
          <path d="m4 7.5 8 6 8-6" strokeLinejoin="round" {...line} />
        </>
      ) : of === "text" ? (
        <>
          <rect x="6.5" y="2.5" width="11" height="19" rx="2.6" {...line} />
          <path d="M10.5 18.5h3" {...line} />
        </>
      ) : (
        <>
          <path d="M2.5 7h10.5v9.5H2.5z" strokeLinejoin="round" {...line} />
          <path d="M13 10h4l4 3.2v3.3h-8z" strokeLinejoin="round" {...line} />
          <circle cx="7" cy="17.5" r="1.8" {...line} />
          <circle cx="17" cy="17.5" r="1.8" {...line} />
        </>
      )}
    </svg>
  );
}

export function BoardFlow() {
  const root = useRef<HTMLDivElement>(null);
  // `fired` is the event whose packet has left; `landed` is the last one that has arrived.
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

  const now = EVENTS[fired];
  const inFlight = !still && fired !== landed ? now : null;
  // Something the agent sends shows on the card as it leaves; something coming in shows once it lands.
  const cardAt = now.out && landed >= 0 ? fired : landed;
  const card = cardAt >= 0 ? EVENTS[cardAt] : null;
  // A channel shows what last came through it. An outgoing message shows there once it arrives.
  const lastVia = (via: Channel, idle: string) => {
    for (let n = fired; n >= 0; n--) {
      const e = EVENTS[n];
      if (e.via !== via) continue;
      if (e.out && n === fired && fired !== landed) continue;
      return e.says;
    }
    return idle;
  };

  return (
    <div ref={root} className="mf-flow">
      <div className="mf-flow-sources">
        {CHANNELS.map((c) => (
          <div key={c.id} className="mf-flow-src" data-on={!still && now.via === c.id}>
            <span className="mf-flow-icon">
              <Icon of={c.id} />
            </span>
            <span>
              <strong>{c.name}</strong>
              <span>{still ? c.idle : lastVia(c.id, c.idle)}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mf-flow-wires" aria-hidden="true">
        {CHANNELS.map((c) => (
          <span key={c.id} className="mf-flow-wire">
            {inFlight?.via === c.id ? (
              <span key={fired} className="mf-flow-packet" data-out={Boolean(inFlight.out)} />
            ) : null}
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
            data-shown={card !== null}
            style={{ ["--col" as string]: card ? card.col : 0 }}
          >
            <div>
              <strong>Kubota tractor</strong>
              <span key={cardAt} className="mf-flow-status">
                {card ? card.status : ""}
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
          <span className="mf-flow-key" data-out="false" /> Coming in
          <span className="mf-flow-key" data-out="true" /> Sent by the agent
        </p>
      </div>
    </div>
  );
}
