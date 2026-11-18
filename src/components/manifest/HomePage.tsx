import { useState } from "react";
import heroPhoto from "@/assets/mountains-2000.jpg";
import warehouse from "@/assets/warehouse-aisle.jpg";
import board from "@/assets/manifest-dashboard.png";
import { CAL_URL } from "@/components/site-chrome";
import { BookForm, Footer, Nav, PhotoBand } from "./Chrome";
import { HeroThread } from "./HeroThread";
import { LoadStory } from "./LoadStory";

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
                <span className="mf-faq-sign" aria-hidden="true">
                  {open === n ? "−" : "+"}
                </span>
              </button>
            </h3>
            <p id={`mf-faq-${n}`} className="mf-faq-a" hidden={open !== n}>
              {a}
            </p>
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
        <PhotoBand src={heroPhoto} shade={0.38} position="50% 30%">
          <div className="mf-hero-in">
            <div className="mf-hero-copy">
              <h1 className="mf-h1">Quote, cover and get paid with a one-word text.</h1>
              <p className="mf-lede">
                Manifest is a text agent for freight brokers. It reads the request, prices the load
                and drafts the reply. You text back yes.
              </p>
              <a href={CAL_URL} target="_blank" rel="noreferrer" className="mf-btn mf-btn--lg">
                Book a 20-minute call
              </a>
            </div>
            <HeroThread />
          </div>
        </PhotoBand>

        <LoadStory />

        <div style={{ marginTop: "clamp(72px, 9vw, 120px)" }}>
          <PhotoBand src={warehouse} shade={0.66}>
            <div className="mf-approve">
              <div className="mf-approve-copy">
                <h2 className="mf-h2 mf-h2--xl">Nothing goes out without you.</h2>
                <p className="mf-lede">
                  The agent drafts every email, text and load posting, then waits for your reply
                  before anything reaches a customer or carrier.
                </p>
              </div>
              <div className="mf-approve-thread">
                <p className="mf-b mf-b--white" style={{ maxWidth: "90%", padding: "13px 16px" }}>
                  Draft for Erin is ready: $2,100, with a question about weight. Send it?
                </p>
                <div className="mf-answers" aria-hidden="true">
                  <span>Yes</span>
                  <span>Change it</span>
                  <span>No</span>
                </div>
                <p className="mf-small" style={{ alignSelf: "flex-end", color: "#e6e6e6" }}>
                  Reply yes to send, change it, or say no.
                </p>
              </div>
            </div>
          </PhotoBand>
        </div>

        <section id="how" className="mf-wrap">
          <div className="mf-split">
            <div>
              <h2 className="mf-h2">Connect your inbox once. Nothing to install.</h2>
              <p className="mf-lede mf-muted">
                Sign in with Gmail or Outlook and add your phone number. The agent links your load
                boards and shows up as a contact in Messages.
              </p>
              <a href={CAL_URL} target="_blank" rel="noreferrer" className="mf-btn">
                Book a call
              </a>
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

        <section className="mf-wrap mf-board">
          <div className="mf-board-in">
            <div className="mf-board-top">
              <h2 className="mf-h2">The board stays current</h2>
              <p>
                Every load moves from quote to paid on its own, as the texts come in. Open it on any
                computer when you want the detail.
              </p>
            </div>
            <img
              src={board}
              alt="The Manifest board, with loads in columns from quote to paid"
              className="mf-board-img"
              loading="lazy"
            />
          </div>
        </section>

        <section id="pricing" className="mf-wrap">
          <div className="mf-split mf-split--end">
            <div>
              <h2 className="mf-price-label">Pricing</h2>
              <p className="mf-price">$50</p>
              <p className="mf-sub" style={{ marginTop: 14 }}>
                per user, per month
              </p>
            </div>
            <div>
              <ul className="mf-rows mf-rows--price">
                {PRICE_ROWS.map(([k, v]) => (
                  <li key={k}>
                    <strong>{k}</strong>
                    <span>{v}</span>
                  </li>
                ))}
              </ul>
              <a href={CAL_URL} target="_blank" rel="noreferrer" className="mf-btn">
                Book a call
              </a>
            </div>
          </div>
        </section>

        <Faq />
      </main>

      <div className="mf-dark">
        <section className="mf-wrap">
          <div className="mf-close">
            <h2 className="mf-h2 mf-h2--xl">See it run on your own loads.</h2>
            <BookForm />
          </div>
        </section>
        <Footer note="Times and figures are illustrative." />
      </div>
    </div>
  );
}
