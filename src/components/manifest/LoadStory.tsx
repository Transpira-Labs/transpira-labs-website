import { useEffect, useRef, useState } from "react";
import { Bubbles, Mark } from "./Chrome";

/*
 * TODO(before launch): the times and figures here are illustrative. Confirm
 * them against the real product.
 *
 * One entry per stop of the load: the texts in the thread ([mine, text]) and
 * what the agent did behind them ([time, what]).
 */
const STOPS: {
  label: string;
  when: string;
  msgs: [boolean, string][];
  lines: [string, string][];
}[] = [
  {
    label: "Quote",
    when: "Mon 8:07",
    msgs: [
      [
        false,
        "Erin wants a Kubota tractor moved Macon to Raleigh on Thursday. Similar trips ran $1,950 to $2,050. I suggest $2,100. Send it?",
      ],
      [true, "Yes"],
      [false, "Sent to Erin from your address."],
    ],
    lines: [
      ["8:05", "Quote request from Erin read"],
      ["8:06", "Similar trips checked: $1,950 to $2,050"],
      ["8:07", "Sent to Erin from your own address"],
    ],
  },
  {
    label: "Cover",
    when: "Mon 9:10",
    msgs: [
      [
        false,
        "Erin said yes. I posted the load to DAT and Truckstop. Bluegrass bid $1,750. Book them?",
      ],
      [true, "Yes"],
      [false, "Booked."],
    ],
    lines: [
      ["8:41", "Posted to DAT and Truckstop"],
      ["", "Carriers text the agent on its own number, not your phone"],
      ["9:10", "You picked Bluegrass. Booked."],
    ],
  },
  {
    label: "Paperwork",
    when: "Mon 9:20",
    msgs: [
      [false, "Rate con sent to Bluegrass."],
      [false, "L-2041 is in Booked on your board."],
    ],
    lines: [
      ["9:12", "Rate con sent"],
      ["9:12", "Moved to Booked on the board"],
    ],
  },
  {
    label: "On the road",
    when: "Thu 9:04",
    msgs: [[false, "Picked up at 9:04. Tracking on time."]],
    lines: [["Thu", "Picked up, tracking on time"]],
  },
  {
    label: "Get paid",
    when: "Fri",
    msgs: [
      [false, "Delivered. The invoice for Erin is drafted at $2,100. Send it?"],
      [true, "Yes"],
      [false, "Sent."],
    ],
    lines: [
      ["Fri", "Delivered"],
      ["Fri", "Invoice drafted for your OK"],
    ],
  },
];

const BEFORE: [string, string][] = [["8:05", "Erin emails for a price on moving a tractor."]];

/*
 * The phone pins while the page scrolls past it. It arrives as a plain amber
 * block with the mark (stage 0), then shows the thread for each stop of the
 * load in turn (stages 1 to 5). The stop names sit to its left and what the
 * agent did sits to its right; both drop away on narrow screens, where the
 * phone's own header names the stop.
 */
export function LoadStory() {
  const track = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  // Starts on the quote, so the page reads sensibly before any script runs.
  const [stage, setStage] = useState(1);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const t = track.current;
      const p = pin.current;
      if (!t || !p) return;
      const top = parseFloat(getComputedStyle(p).top) || 0;
      const range = Math.max(1, t.offsetHeight - p.offsetHeight);
      const done = (top - t.getBoundingClientRect().top) / range;
      setStage(Math.floor(Math.min(0.999, Math.max(0, done)) * (STOPS.length + 1)));
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const cur = stage > 0 ? STOPS[stage - 1] : null;

  return (
    <section id="agent" className="mf-wrap">
      <div className="mf-story-head">
        <h2 className="mf-h2">One load, start to finish, in one thread</h2>
        <p className="mf-sub">
          Erin's tractor, from her email on Monday to the invoice on Friday. Scroll to follow it.
        </p>
      </div>

      <div ref={track} className="mf-track">
        <div ref={pin} className="mf-story">
          <ol className="mf-stops" aria-label="Stops of the load">
            {STOPS.map((s, n) => (
              <li key={s.label} data-on={stage === n + 1}>
                <span>{s.label}</span>
                <span>{stage === n + 1 ? s.when : ""}</span>
              </li>
            ))}
          </ol>

          <div className="mf-phone">
            <div className="mf-phone-head">
              <span className="mf-mark-disc">
                <Mark size={26} />
              </span>
              <span>
                <strong>Manifest</strong>
                <span>{cur ? `${cur.label} · ${cur.when}` : "Text message"}</span>
              </span>
            </div>
            {STOPS.map((s, n) => (
              <div key={s.label} className="mf-layer" data-on={stage === n + 1}>
                <Bubbles msgs={s.msgs} />
              </div>
            ))}
            <div className="mf-splash" aria-hidden="true" data-on={stage === 0}>
              <span className="mf-mark-disc">
                <Mark size={78} />
              </span>
            </div>
          </div>

          <div className="mf-behind" aria-live="polite">
            <h3>{cur ? "Behind this text" : "Monday, 8:05 AM"}</h3>
            <ul>
              {(cur ? cur.lines : BEFORE).map(([t, x]) => (
                <li key={x}>
                  <span>{t}</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
