import { useState, type ReactNode } from "react";
import warehouse from "@/assets/warehouse-aisle.jpg";
import { CAL_URL } from "@/components/site-chrome";
import { BoardFlow } from "./BoardFlow";
import { Footer, Nav, PhotoBand } from "./Chrome";

/*
 * TODO(before launch): the times and figures on this page are illustrative,
 * carried over from the scroll story it replaces. Confirm them against the
 * real product.
 */
const BEFORE: [string, string, string][] = [
  [
    "Monday 8:05 AM",
    "A customer emails for a price.",
    "Erin needs a tractor moved Thursday. Her email lands in an inbox with 1,400 others.",
  ],
  [
    "8:20 AM",
    "Then everything else arrives at once.",
    "Carriers call about other loads. Drivers text. A customer wants an update. An auction wants payment.",
  ],
  [
    "9:14 AM",
    "By 9:14, dozens of things are waiting.",
    "Erin's quote still isn't written. By tomorrow she'll book with someone else.",
  ],
];

function Step({
  when,
  title,
  body,
  note,
  tone,
  children,
}: {
  when: string;
  title: string;
  body: string;
  note?: string;
  tone?: "amber" | "night";
  children: ReactNode;
}) {
  return (
    <div className="mf-step">
      <div className="mf-step-copy">
        <span className="mf-pill">{when}</span>
        <h3 className="mf-h3">{title}</h3>
        <p className="mf-muted">{body}</p>
        {note ? <p>{note}</p> : null}
      </div>
      <div className={tone ? `mf-panel mf-panel--${tone}` : "mf-panel"}>{children}</div>
    </div>
  );
}

/* The one step the visitor answers: the agent's text, and a yes or a no back. */
function YourTurn() {
  const [answer, setAnswer] = useState<"yes" | "no" | null>(null);
  return (
    <div className="mf-panel-thread" aria-live="polite" style={{ minHeight: 250 }}>
      <p className="mf-b mf-b--white">
        Erin Caldwell wants a Kubota tractor moved Macon to Raleigh on Thursday. I suggest $2,100.
        Send it?
      </p>
      {answer === null ? (
        <div className="mf-turn">
          <button type="button" className="mf-btn mf-btn--ink-line" onClick={() => setAnswer("no")}>
            No
          </button>
          <button type="button" className="mf-btn" onClick={() => setAnswer("yes")}>
            Yes
          </button>
        </div>
      ) : (
        <>
          <p className="mf-b mf-b--me">{answer === "yes" ? "Yes" : "No"}</p>
          <p className="mf-b mf-b--white">
            {answer === "yes"
              ? "Sent to Erin from your address."
              : "Okay. Nothing was sent. Tell me what to change."}
          </p>
          <button type="button" className="mf-link-btn" onClick={() => setAnswer(null)}>
            Try the other reply
          </button>
        </>
      )}
    </div>
  );
}

export function WalkthroughPage() {
  return (
    <div className="mf-root">
      <Nav current="walkthrough" />
      <main>
        <PhotoBand src={warehouse} shade={0.6}>
          <div className="mf-page-hero">
            <p className="mf-kicker">The text agent, one load at a time</p>
            <h1 className="mf-h1">A broker's Monday morning.</h1>
            <p className="mf-lede">
              Manifest reads the email, prices the load, posts it for carriers and only texts you
              when it needs you. You approve with one text.
            </p>
            <div className="mf-actions">
              <a
                href={CAL_URL}
                target="_blank"
                rel="noreferrer"
                className="mf-btn mf-btn--lg mf-btn--light"
              >
                Book a 20-minute call
              </a>
            </div>
          </div>
        </PhotoBand>

        <section className="mf-wrap mf-section">
          <h2 className="mf-h2">Before: one quote takes a day</h2>
          <div className="mf-cards">
            {BEFORE.map(([when, title, body]) => (
              <div key={when} className="mf-soft">
                <span className="mf-pill">{when}</span>
                <h3 className="mf-h3">{title}</h3>
                <p className="mf-muted">{body}</p>
              </div>
            ))}
          </div>
          <div className="mf-compare">
            <div>
              <h3>Before</h3>
              <div className="mf-fig">
                <strong>1 day</strong>
                <span>to send one quote</span>
              </div>
              <p>Quote lost.</p>
            </div>
            <div>
              <h3>With Manifest</h3>
              <div className="mf-figs">
                <div className="mf-fig">
                  <strong>1 text</strong>
                  <span>from you</span>
                </div>
                <div className="mf-fig">
                  <strong>2 min</strong>
                  <span>from email to quote sent</span>
                </div>
              </div>
              <p>Load won and posted.</p>
            </div>
          </div>
        </section>

        <section className="mf-wrap mf-steps">
          <h2 className="mf-h2" style={{ maxWidth: 620 }}>
            The same morning, with the text agent
          </h2>

          <Step
            when="8:05 AM"
            title="A customer emails for a price."
            body="Erin needs a tractor moved Thursday. Normally this sits in the inbox until you have time to work out a number."
          >
            <div className="mf-sheet">
              <p className="mf-small mf-muted">Email to you</p>
              <h4 style={{ marginTop: 10 }}>Erin Caldwell</h4>
              <p className="mf-small mf-muted">Caldwell Equipment · 8:05 AM</p>
              <p className="mf-sheet-body">
                Hi, can you move a Kubota tractor from Macon, GA to Raleigh, NC on Thursday? What
                would it cost?
              </p>
            </div>
          </Step>

          <Step
            when="Seconds later"
            title="The agent works out the price."
            body="It reads what similar trips cost and suggests $2,100."
          >
            <div className="mf-sheet">
              <h4 style={{ marginBottom: 6 }}>The agent checks past trips</h4>
              <ul className="mf-sheet-rows">
                <li>
                  <span>Similar trips</span>
                  <span>$1,950 to $2,050</span>
                </li>
              </ul>
              <div className="mf-total">
                <span>Suggested price for Erin</span>
                <strong style={{ color: "var(--mf-ok)" }}>$2,100</strong>
              </div>
            </div>
          </Step>

          <Step
            when="8:06 AM"
            title="Then it texts you."
            body="A normal text. You answer with one word."
            note="Your turn. You're the broker: pick a reply."
            tone="amber"
          >
            <YourTurn />
          </Step>

          <Step
            when="8:07 AM"
            title="One text, and the quote goes out."
            body="The agent emails Erin from your address. To her, it reads like you wrote it."
            note="Nothing reaches a customer or carrier until you approve."
          >
            <div className="mf-sheet">
              <p className="mf-small mf-muted">Sent from your email</p>
              <h4 style={{ marginTop: 10 }}>Sam · to Erin Caldwell</h4>
              <p className="mf-small mf-muted">8:07 AM · sent by the agent</p>
              <div className="mf-total">
                <span>Kubota tractor, Macon to Raleigh, Thursday</span>
                <strong style={{ fontSize: 26 }}>$2,100</strong>
              </div>
            </div>
          </Step>

          <Step
            when="8:41 AM · Covering"
            title="Erin says yes. The agent finds a truck."
            body="It posts the load with its own number, so carriers text the agent and your phone stays quiet."
          >
            <div className="mf-sheet">
              <h4>Posted for carriers</h4>
              <p className="mf-small" style={{ margin: "4px 0 6px", color: "var(--mf-ok)" }}>
                Erin said yes
              </p>
              <ul className="mf-sheet-rows">
                <li>
                  <span>Load</span>
                  <span>Kubota tractor</span>
                </li>
                <li>
                  <span>Lane</span>
                  <span>Macon → Raleigh</span>
                </li>
                <li>
                  <span>Pickup</span>
                  <span>Thursday</span>
                </li>
                <li>
                  <span>Carriers text</span>
                  <span>The agent</span>
                </li>
              </ul>
            </div>
          </Step>

          <Step
            when="Any time"
            title="Need something? Just text it."
            body="The agent answers from the board: paperwork, prices, who owes what, where a truck is. Before, finding this meant digging through email, spam and a spreadsheet."
            tone="night"
          >
            <div className="mf-panel-thread">
              <p className="mf-b mf-b--amber">Where's the Kubota?</p>
              <p className="mf-b mf-b--night">On the road with Ridgeline. On time for 4 PM.</p>
              <p className="mf-b mf-b--amber">Who owes me?</p>
              <p className="mf-b mf-b--night">$750 is owed on L-2036.</p>
            </div>
          </Step>
        </section>
      </main>

      <div className="mf-dark" style={{ marginTop: "clamp(80px, 9vw, 110px)" }}>
        <section className="mf-wrap mf-board-dark">
          <div className="mf-board-top">
            <h2 className="mf-h2">The board.</h2>
            <p>
              Open it on any computer for the detailed work. Every load on one board, from first
              quote to paid, and the agent moves each card as the texts come in.
            </p>
          </div>
          <div className="mf-flow-panel">
            <BoardFlow />
          </div>
        </section>

        <section className="mf-wrap">
          <div className="mf-close mf-close--center">
            <h2 className="mf-h2 mf-h2--xl">Your part was one text.</h2>
            <p className="mf-lede">
              The agent did the reading, the pricing, the emailing and the posting. You made the
              decision.
            </p>
            <p className="mf-sub">
              $50 per user per month. No onboarding fee. No implementation fee.
            </p>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="mf-btn mf-btn--lg mf-btn--light"
            >
              Book a 20-minute call
            </a>
          </div>
        </section>
        <Footer note="Times and figures are illustrative." />
      </div>
    </div>
  );
}
