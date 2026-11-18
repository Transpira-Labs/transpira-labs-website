import { useEffect, useRef, useState } from "react";
import { Mark } from "./Chrome";

type Msg = { me: boolean; text: string };
type Reply = { label: string; say: string[] | null; next: number };

/*
 * TODO(before launch): the load, prices and times in this thread are
 * illustrative, the same ones the walkthrough uses. Confirm them against the
 * real product.
 */
const OPENING =
  "Erin wants a Kubota tractor moved Macon to Raleigh on Thursday. Similar trips ran $1,950 to $2,050. I suggest $2,100. Send it?";
const BIDS =
  "Erin said yes. Two carriers bid on it: Bluegrass at $1,750, picking up Thursday, and Delta Haul at $1,600, picking up Friday. Who do you want to book?";
const OWED: Reply = { label: "Who owes me?", say: ["$750 is owed on L-2036."], next: 2 };
const RESTART: Reply = { label: "Start over", say: null, next: 0 };

// Each step lists the replies on offer: what the agent says back and the step that follows.
const FLOW: Reply[][] = [
  [
    { label: "Yes", say: ["Sent to Erin at $2,100, from your address.", BIDS], next: 1 },
    {
      label: "Make it $2,200",
      say: ["Sent to Erin at $2,200, from your address.", BIDS],
      next: 1,
    },
  ],
  [
    {
      label: "Bluegrass",
      say: ["Bluegrass is booked. Rate con sent. The load is on your board."],
      next: 2,
    },
    {
      label: "Delta Haul",
      say: ["Delta Haul is booked for Friday. Rate con sent. The load is on your board."],
      next: 3,
    },
  ],
  // After booking Bluegrass.
  [
    {
      label: "Where is the truck?",
      say: ["Picked up Thursday 9:04. Tracking on time."],
      next: 2,
    },
    OWED,
    RESTART,
  ],
  // After booking Delta Haul.
  [
    {
      label: "Where is the truck?",
      say: ["Pickup is set for Friday. I will text you when it is loaded."],
      next: 3,
    },
    { ...OWED, next: 3 },
    RESTART,
  ],
];

const START: Msg[] = [{ me: false, text: OPENING }];

const READ_MS = 550; // a beat before the agent starts typing
const TYPE_MS = 1050; // how long the three dots show before each reply

/*
 * The hero's card: a short thread with the agent that the visitor can answer.
 * It is drawn like a Messages thread, with the visitor's bubbles in black.
 * A reply pops in as it is sent, then the agent shows it is typing before each
 * answer arrives.
 */
export function HeroThread() {
  const [step, setStep] = useState(0);
  const [log, setLog] = useState<Msg[]>(START);
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  // Replies already sent, as "step:label", so a question cannot be asked twice.
  const [used, setUsed] = useState<string[]>([]);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const pick = (r: Reply) => {
    if (busy) return;
    if (!r.say) {
      setStep(0);
      setLog(START);
      setUsed([]);
      return;
    }
    const replies = r.say;
    setUsed((u) => [...u, `${step}:${r.label}`]);
    setLog((l) => [...l, { me: true, text: r.label }]);

    // People who ask for less motion get the answers at once, with no typing dots.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLog((l) => [...l, ...replies.map((text) => ({ me: false, text }))]);
      setStep(r.next);
      return;
    }

    setBusy(true);
    let at = READ_MS;
    const later = (fn: () => void) => timers.current.push(window.setTimeout(fn, at));
    replies.forEach((text, n) => {
      later(() => setTyping(true));
      at += TYPE_MS;
      later(() => {
        setTyping(false);
        setLog((l) => [...l, { me: false, text }]);
        if (n === replies.length - 1) {
          setStep(r.next);
          setBusy(false);
        }
      });
      at += 400;
    });
  };

  // Only the newest messages show, the way a phone keeps a thread pinned to its latest.
  const shown = log.slice(-6);
  const first = log.length - shown.length;
  const sentLast = log[log.length - 1].me;

  return (
    <div className="mf-tc">
      <div className="mf-tc-head">
        <Mark size={36} />
        <div>
          <h2>Manifest</h2>
          <p className="mf-small mf-muted">Text agent · try the thread</p>
        </div>
      </div>
      <div className="mf-tc-thread" aria-live="polite">
        <span className="mf-tc-time">Today 8:06 AM</span>
        {shown.map((m, n) => {
          const next = shown[n + 1];
          const prev = shown[n - 1];
          return (
            <p
              key={first + n}
              className={m.me ? "mf-im mf-im--in mf-im--me" : "mf-im mf-im--in"}
              data-tail={(next ? next.me !== m.me : !(typing && !m.me)) || undefined}
              data-gap={(prev && prev.me !== m.me) || undefined}
            >
              {m.text}
            </p>
          );
        })}
        {sentLast ? <span className="mf-im-status">Delivered</span> : null}
        {typing ? (
          <p
            className="mf-im mf-im--in mf-im--typing"
            data-tail
            data-gap={sentLast || undefined}
            role="status"
            aria-label="Manifest is typing"
          >
            <i />
            <i />
            <i />
          </p>
        ) : null}
      </div>
      <div className="mf-replies" role="group" aria-label="Your reply">
        {FLOW[step]
          .filter((r) => !used.includes(`${step}:${r.label}`))
          .map((r) => (
            <button
              key={r.label}
              type="button"
              className="mf-reply"
              disabled={busy}
              onClick={() => pick(r)}
            >
              {r.label}
            </button>
          ))}
      </div>
    </div>
  );
}
