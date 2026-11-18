import { useState } from "react";
import { BookCall, Bubbles, Closing, Footer, Nav } from "./Chrome";
import { BoardFlow } from "./BoardFlow";
import { HeroThread } from "./HeroThread";
import { LoadStory } from "./LoadStory";

// What the broker gets, in the words the old walkthrough already used.
const BENEFITS: [string, string][] = [
  [
    "A one-person brokerage with big-shop numbers.",
    "Do the work of a 10-person shop and compete with the big guys, without hiring.",
  ],
  [
    "Your people work loads, not admin.",
    "The agent handles the admin. Your team sells and looks after customers.",
  ],
  [
    "Nothing to install. Nothing to switch.",
    "It works inside the inbox, load boards and phone your brokerage already runs on.",
  ],
];

/*
 * TODO(before launch): confirm which integrations exist today, and that a
 * first quote really goes out the same day.
 */
const CONNECTIONS: [string, string][] = [
  ["Gmail and Outlook", "Reads quote requests, sends as you"],
  ["DAT and Truckstop", "Posts loads, collects bids"],
  ["WhatsApp", "Texts drivers and carriers"],
  ["Your TMS", "Keeps loads and invoices in sync"],
  ["Your phone", "Where you approve, by text"],
];

const PRICE_ROWS: [string, string][] = [
  ["Onboarding fee", "$0"],
  ["Implementation fee", "$0"],
  ["Every connector", "Included"],
  ["First quote", "The same day"],
];

const FAQS: [string, string][] = [
  [
    "Does anything go out without me?",
    "No. The agent drafts every email, text and load posting, and waits for your reply before anything reaches a customer or carrier.",
  ],
  [
    "What do I need to install?",
    "Nothing. The agent is a contact in your phone’s messages, and the board opens in any browser.",
  ],
  ["Which email does it work with?", "Gmail and Outlook. Outlook connects in one sign-in."],
  [
    "Who do carriers talk to?",
    "The agent. It posts loads with its own number, so carrier calls and texts go to it, not your phone.",
  ],
  [
    "What does it cost?",
    "$50 per user per month, with every connector included. No onboarding fee and no implementation fee.",
  ],
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="mf-wrap">
      <div className="mf-faq">
        <h2 className="mf-h2">Questions brokers ask</h2>
        {FAQS.map(([q, a], n) => (
          <div key={q} className="mf-faq-item">
            <h3>
              <button
                type="button"
                className="mf-faq-q"
                aria-expanded={open === n}
                aria-controls={`mf-faq-${n}`}
                onClick={() => setOpen(open === n ? -1 : n)}
              >
                <span>{q}</span>
                <span className="mf-faq-sign" aria-hidden="true" />
              </button>
            </h3>
            <div
              id={`mf-faq-${n}`}
              className="mf-faq-panel"
              data-open={open === n}
              aria-hidden={open !== n}
            >
              <p className="mf-faq-a">{a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <div className="mf-root">
      <Nav current="home" />
      <main>
        <section className="mf-wrap mf-hero">
          <div className="mf-hero-in">
            <div className="mf-hero-copy">
              <h1 className="mf-h1">Quote, cover and get paid with a one‑word text.</h1>
              <p className="mf-lede">
                Manifest is a text agent for freight brokers. It reads the request, prices the load
                and drafts the reply. You text back yes.
              </p>
              <BookCall />
            </div>
            <HeroThread />
          </div>
        </section>

        <LoadStory />

        <section className="mf-wrap mf-gap">
          <h2 className="mf-h2">One phone. One agent. Any number of loads.</h2>
          <ul className="mf-cols">
            {BENEFITS.map(([title, body]) => (
              <li key={title}>
                <h3 className="mf-h3">{title}</h3>
                <p className="mf-muted">{body}</p>
              </li>
            ))}
          </ul>
          <div className="mf-after">
            <BookCall />
          </div>
        </section>

        <section className="mf-wrap mf-gap">
          <div className="mf-split mf-split--mid">
            <div>
              <h2 className="mf-h2">Nothing goes out without you.</h2>
              <p className="mf-lede mf-muted">
                The agent drafts every email, text and load posting, then waits for your reply
                before anything reaches a customer or carrier.
              </p>
            </div>
            <div className="mf-still">
              <Bubbles
                msgs={[
                  [
                    false,
                    "Draft for Erin is ready: $2,100, with a question about weight. Send it?",
                  ],
                ]}
              />
              <div className="mf-replies" aria-hidden="true">
                <span className="mf-reply">Yes</span>
                <span className="mf-reply">Change it</span>
                <span className="mf-reply">No</span>
              </div>
              <p className="mf-small mf-muted">Reply yes to send, change it, or say no.</p>
            </div>
          </div>
        </section>

        <section id="how" className="mf-wrap mf-gap">
          <div className="mf-split">
            <div>
              <h2 className="mf-h2">Connect your inbox once.</h2>
              <p className="mf-lede mf-muted">
                Sign in with Gmail or Outlook and add your phone number. The agent links your load
                boards and shows up as a contact in Messages.
              </p>
            </div>
            <ul className="mf-rows">
              {CONNECTIONS.map(([name, what]) => (
                <li key={name}>
                  <strong>{name}</strong>
                  <span>{what}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mf-wrap mf-gap">
          <div className="mf-board-in">
            <div className="mf-board-top">
              <h2 className="mf-h2">The board stays current</h2>
              <p>
                Every load moves from quote to paid on its own, as the texts come in. Open it on any
                computer when you want the detail.
              </p>
            </div>
            <BoardFlow />
          </div>
        </section>

        <section id="pricing" className="mf-wrap mf-gap">
          <div className="mf-split">
            <div>
              <h2 className="mf-h2">$50 per user, per month.</h2>
              <p className="mf-lede mf-muted">That is the whole price list.</p>
              <BookCall />
            </div>
            <ul className="mf-rows mf-rows--even">
              {PRICE_ROWS.map(([k, v]) => (
                <li key={k}>
                  <strong>{k}</strong>
                  <span>{v}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Faq />
      </main>

      <Closing />
      <Footer note="Times and figures are illustrative." />
    </div>
  );
}
