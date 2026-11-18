import { useState } from "react";
import { CAL_URL } from "@/components/site-chrome";
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
const BID = "Erin said yes. Bluegrass bid $1,750. Book them?";

// Each step lists the replies on offer: what the agent says back and the step that follows.
const FLOW: Reply[][] = [
  [
    { label: "Yes", say: ["Sent to Erin at $2,100, from your address.", BID], next: 1 },
    {
      label: "Make it $2,200",
      say: ["Sent to Erin at $2,200, from your address.", BID],
      next: 1,
    },
  ],
  [
    { label: "Yes", say: ["Booked. Rate con sent. The load is on your board."], next: 2 },
    { label: "Who else bid?", say: ["Delta Haul, with a Friday pickup."], next: 1 },
  ],
  [
    {
      label: "Where is the truck?",
      say: ["Picked up Thursday 9:04. Tracking on time."],
      next: 2,
    },
    { label: "Who owes me?", say: ["$750 is owed on L-2036."], next: 2 },
    { label: "Start over", say: null, next: 0 },
  ],
];

const START: Msg[] = [{ me: false, text: OPENING }];

/* The hero's card: a short thread with the agent that the visitor can answer. */
export function HeroThread() {
  const [step, setStep] = useState(0);
  const [log, setLog] = useState<Msg[]>(START);

  const pick = (r: Reply) => {
    if (!r.say) {
      setStep(0);
      setLog(START);
      return;
    }
    setLog([...log, { me: true, text: r.label }, ...r.say.map((text) => ({ me: false, text }))]);
    setStep(r.next);
  };

  // Only the newest few messages show, the way a phone pins a thread to its latest.
  const shown = log.slice(-4);
  const first = log.length - shown.length;

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
        {shown.map((m, n) => (
          <p key={first + n} className={m.me ? "mf-b mf-b--me" : "mf-b"}>
            {m.text}
          </p>
        ))}
      </div>
      <p className="mf-tc-label mf-small mf-muted">Your reply:</p>
      <div className="mf-tc-replies">
        {FLOW[step].map((r) => (
          <button key={r.label} type="button" className="mf-chip" onClick={() => pick(r)}>
            {r.label}
          </button>
        ))}
      </div>
      <a href={CAL_URL} target="_blank" rel="noreferrer" className="mf-btn mf-btn--block">
        Book a call to try it
      </a>
    </div>
  );
}
