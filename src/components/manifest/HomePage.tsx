import { useState } from "react";
import heroPhoto from "@/assets/mountains-2000.jpg";
import { CAL_URL } from "@/components/site-chrome";
import { BookForm, Footer, Nav, PhotoBand } from "./Chrome";
import { FitQuestions } from "./FitQuestions";
import { HeroThread } from "./HeroThread";
import { LoadStory } from "./LoadStory";
import { ProblemJourney } from "./ProblemJourney";
import { SolutionColumns } from "./SolutionColumns";

/*
 * TODO(before launch): "in minutes, not a day" in the hero rests on the
 * walkthrough's illustrative two-minute figure. Confirm it.
 */
// TODO(before launch): confirm that a first quote really goes out the same day.
const PRICE_ROWS: [string, string][] = [
  ["Onboarding fee", "$0"],
  ["Implementation fee", "$0"],
  ["Every connector", "Included"],
  ["First quote", "The same day"],
];

const FAQS: [string, string][] = [
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
      <Nav current="home" overPhoto />
      <main>
        <PhotoBand src={heroPhoto} shade={0.38} position="50% 30%" className="mf-hero">
          <div className="mf-hero-in">
            <div className="mf-hero-copy">
              <h1 className="mf-h1">Quote, cover and get paid with a one-word text.</h1>
              <p className="mf-lede">
                Manifest is a text agent for freight brokers. It answers quote requests in minutes,
                not a day, and nothing goes out until you text back yes.
              </p>
              <a href={CAL_URL} target="_blank" rel="noreferrer" className="mf-btn mf-btn--lg">
                Book a call
              </a>
            </div>
            <HeroThread />
          </div>
        </PhotoBand>

        <ProblemJourney />

        <SolutionColumns />

        <LoadStory />

        <FitQuestions />

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
            <h2 className="mf-h2 mf-h2--xl">Your next quote could be a one‑word text.</h2>
            <BookForm />
          </div>
        </section>
        <Footer note="Times and figures are illustrative." />
      </div>
    </div>
  );
}
