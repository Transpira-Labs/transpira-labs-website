import { Link } from "@tanstack/react-router";
import { CAL_URL, CONTACT_EMAIL } from "@/components/site-chrome";
import { Arrow, Footer, Nav } from "./Chrome";

export function ContactPage() {
  return (
    <div className="mf-root">
      <Nav current="other" />
      <main>
        <section className="mf-wrap mf-page-hero">
          <p className="mf-kicker">Contact</p>
          <h1 className="mf-h1">Running a brokerage? Let's talk.</h1>
          <p className="mf-lede">
            Whether you want a walkthrough of the text agent, have a question about our research, or
            just want to compare notes on your operations, we'd love to hear from you.
          </p>
        </section>

        <section className="mf-wrap mf-gap" style={{ paddingBottom: "clamp(80px, 10vw, 136px)" }}>
          <ul className="mf-links">
            <li>
              <a href={CAL_URL} target="_blank" rel="noreferrer">
                <strong className="mf-h3">Book a call</strong>
                <span>
                  A live walkthrough of the agent and a conversation about your operations.
                </span>
                <Arrow />
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`}>
                <strong className="mf-h3">Email us</strong>
                <span>{CONTACT_EMAIL}</span>
                <Arrow />
              </a>
            </li>
            <li>
              <Link to="/case-studies">
                <strong className="mf-h3">Read the research</strong>
                <span>Our work on supply-chain agents</span>
                <Arrow />
              </Link>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}
