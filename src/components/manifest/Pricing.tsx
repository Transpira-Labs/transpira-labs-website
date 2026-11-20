import { CAL_URL, CONTACT_EMAIL } from "@/components/site-chrome";

/*
 * Pricing as one plan, since there is only one: a statement on the left, a
 * single card on the right with the price, the button and what is included.
 * Under the statement, a second way in for people who would rather write
 * than book a call.
 *
 * TODO(before launch): confirm that a first quote really goes out the same
 * day, and the list of connectors.
 */
const INCLUDED = [
  "Every connector: Gmail, Outlook, DAT, Truckstop, WhatsApp and your TMS",
  "No onboarding fee",
  "No implementation fee",
  "Your first quote the same day",
];

export function Pricing() {
  return (
    <section id="pricing" className="mf-wrap mf-pricing">
      <div className="mf-pricing-in">
        <div className="mf-pricing-copy">
          <h2 className="mf-h2">
            One price, <span>nothing on top</span>
          </h2>
          <div>
            <p>
              Not into calls?
              <br />
              Email us and we'll take it from there.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mf-pricing-chip">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2.5"
                  stroke="currentColor"
                  strokeWidth="1.9"
                />
                <path
                  d="m4 7.5 8 6 8-6"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>

        <div className="mf-plan">
          <span className="mf-plan-tab">$0 to set up</span>
          <div className="mf-plan-price">
            <p>
              <strong>$50</strong> per user, per month
            </p>
            <span>USD</span>
          </div>
          <p className="mf-plan-what">
            The whole text agent, for each person on your team who uses it.
          </p>
          <a href={CAL_URL} target="_blank" rel="noreferrer" className="mf-btn mf-plan-btn">
            Book a call
          </a>
          <h3>What's included?</h3>
          <ul>
            {INCLUDED.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
