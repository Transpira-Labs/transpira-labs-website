import { Link } from "@tanstack/react-router";
import adiKrish from "@/assets/adi-krish.png";
import fusenWorldLogo from "@/assets/fusen-world.jpeg";
import { Arrow, Closing, Footer, Nav } from "./Chrome";

const TEAM: { name: string; role: string; photo?: string; initials: string; bullets: string[] }[] =
  [
    {
      name: "Adi Krish",
      role: "Founder and CEO",
      photo: adiKrish,
      initials: "AK",
      bullets: [
        "Ex-Meta; built product on the Ads Machine Learning team generating $5M ARR.",
        "YC Hackathon grand prize winner.",
        "CS @ Georgia Tech.",
      ],
    },
    {
      name: "Rishith Auluka",
      role: "Founding Engineer",
      initials: "RA",
      bullets: [
        "Ex-Meta AI agents team.",
        "Manufacturing plant consultant.",
        "Top 300 competitive programmer in the US.",
        "CS @ UGA.",
      ],
    },
    {
      name: "Saketh Koona",
      role: "Supply Chain Intern",
      initials: "SK",
      bullets: [
        "Industrial Engineering graduate, from the #1 program in the country at Georgia Tech.",
        "Head of ML research @ SipLab, Georgia Tech.",
        "YC Hackathon grand prize winner.",
      ],
    },
  ];

export function AboutPage() {
  return (
    <div className="mf-root">
      <Nav current="about" />
      <main>
        <section className="mf-wrap mf-page-hero">
          <p className="mf-kicker">Transpira Labs</p>
          <h1 className="mf-h1">AI that is actually useful for everyone.</h1>
          <p className="mf-lede">
            We're a research lab ensuring that AI is useful for everyone, not just a select few.
            Manifest, our text agent, is where that work meets freight brokers.
          </p>
        </section>

        <section className="mf-wrap mf-gap">
          <h2 className="mf-h2">The team</h2>
          <ul className="mf-cols">
            {TEAM.map((m) => (
              <li key={m.name} className="mf-person">
                {m.photo ? (
                  <img src={m.photo} alt="" width={72} height={72} className="mf-avatar" />
                ) : (
                  <div className="mf-avatar" aria-hidden="true">
                    {m.initials}
                  </div>
                )}
                <h3 className="mf-h3">{m.name}</h3>
                <p className="mf-muted">{m.role}</p>
                <ul>
                  {m.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        <section className="mf-wrap mf-gap">
          <div className="mf-backed">
            <h2 className="mf-h3">Backed by Fusen World</h2>
            <a href="https://fusen.world/" target="_blank" rel="noreferrer">
              <img src={fusenWorldLogo} alt="Fusen World" />
            </a>
          </div>
        </section>

        <section className="mf-wrap mf-gap" style={{ paddingBottom: "clamp(80px, 10vw, 136px)" }}>
          <h2 className="mf-h2 mf-section-title">More from the lab</h2>
          <ul className="mf-links">
            <li>
              <Link to="/case-studies">
                <strong className="mf-h3">Our research</strong>
                <span>Case studies and SupChain-Bench</span>
                <Arrow />
              </Link>
            </li>
            <li>
              <Link to="/environments">
                <strong className="mf-h3">Environments</strong>
                <span>
                  Shipped to frontier AI labs; the same technology powers our newer products
                </span>
                <Arrow />
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <strong className="mf-h3">Contact</strong>
                <span>Email us or book a call</span>
                <Arrow />
              </Link>
            </li>
          </ul>
        </section>
      </main>

      <Closing />
      <Footer />
    </div>
  );
}
