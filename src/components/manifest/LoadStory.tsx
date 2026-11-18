import { useEffect, useRef, useState } from "react";
import { Avatar, Bubbles } from "./Chrome";

/*
 * TODO(before launch): the times and figures here are illustrative. Confirm
 * them against the real product.
 *
 * The hero's thread ends with the quote going out. This picks up from there:
 * one entry per stop of the load after Erin says yes, with the texts in the
 * thread ([mine, text]) and what the agent did behind them ([time, what]).
 */
const STOPS: {
  label: string;
  when: string;
  msgs: [boolean, string][];
  lines: [string, string][];
}[] = [
  {
    label: "Cover",
    when: "Mon 9:10",
    msgs: [
      [
        false,
        "Erin said yes. Two carriers bid on it: Bluegrass at $1,750, picking up Thursday, and Delta Haul at $1,600, picking up Friday. Who do you want to book?",
      ],
      [true, "Bluegrass"],
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

const BEFORE: [string, string][] = [["8:07", "Your yes sent the quote to Erin."]];

/*
 * The phone pins while the page scrolls past it. It arrives as a plain amber
 * block with the mark (stage 0), then shows the thread for each stop of the
 * load in turn. The stop names sit to its left and what the agent did sits to
 * its right; on a narrow screen both go, and the phone carries the agent's
 * steps at its foot.
 */
export function LoadStory() {
  const track = useRef<HTMLDivElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  // Starts on the first stop, so the page reads sensibly before any script runs.
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
  const lines = cur ? cur.lines : BEFORE;

  return (
    <section id="agent" className="mf-wrap mf-gap">
      <div className="mf-story-head">
        <h2 className="mf-h2">After your yes, the same thread runs the load</h2>
        <p className="mf-lede mf-muted">
          Erin's tractor, from her yes on Monday to the invoice on Friday. Scroll to follow it.
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
              <Avatar size={36} />
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
            <ul className="mf-phone-foot" aria-hidden="true">
              {lines.map(([t, x]) => (
                <li key={x}>
                  <span>{t}</span>
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <div className="mf-splash" aria-hidden="true" data-on={stage === 0}>
              <Avatar size={108} />
            </div>
          </div>

          <div className="mf-behind" aria-live="polite">
            <h3>{cur ? "Behind this text" : "Monday, 8:07 AM"}</h3>
            <ul>
              {lines.map(([t, x]) => (
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
