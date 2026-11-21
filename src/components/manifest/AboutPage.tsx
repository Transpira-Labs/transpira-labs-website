import { Link } from "@tanstack/react-router";
import floor from "@/assets/supply-floor.jpg";
import adiKrish from "@/assets/adi-krish.png";
import fusenWorldLogo from "@/assets/fusen-world.jpeg";
import { CAL_URL } from "@/components/site-chrome";
import { Arrow, Footer, Nav, PhotoBand } from "./Chrome";

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
  ];

export function AboutPage() {
  return (
    <div className="mf-root">
      <Nav current="about" />
      <main>
        <PhotoBand src={floor} shade={0.55}>
          <div className="mf-page-hero">
            <p className="mf-kicker">Transpira Labs</p>
            <h1 className="mf-h1">AI that is actually useful for everyone.</h1>
            <p className="mf-lede">
              We're a research lab ensuring that AI is useful for everyone, not just a select few.
              Manifest, our text agent, is where that work meets freight brokers.
            </p>
          </div>
        </PhotoBand>

        <section className="mf-wrap mf-section mf-section--team">
          <h2 className="mf-h2">The team</h2>
          <div className="mf-team">
            {TEAM.map((m) => (
              <div key={m.name} className="mf-person">
                <div className="mf-person-id">
                  {m.photo ? (
                    <img src={m.photo} alt={m.name} width={96} height={96} className="mf-avatar" />
                  ) : (
                    <div className="mf-avatar" aria-hidden="true">
                      {m.initials}
                    </div>
                  )}
                  <div>
                    <h3>{m.name}</h3>
                    <p className="mf-muted">{m.role}</p>
                  </div>
                </div>
                <ul>
                  {m.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mf-wrap">
          <div className="mf-backed">
            <h2 className="mf-h2">Backed by Fusen World</h2>
            <a href="https://fusen.world/" target="_blank" rel="noreferrer">
              <img src={fusenWorldLogo} alt="Fusen World" />
            </a>
          </div>
        </section>
      </main>

      <div className="mf-dark">
        <section className="mf-wrap mf-lab">
          <h2 className="mf-h2">More from the lab</h2>
          <div className="mf-lab-grid">
            <Link to="/case-studies" className="mf-lab-card">
              <span>Case studies and SupChain-Bench</span>
              <span>
                Our research
                <span className="mf-arrow">
                  <Arrow />
                </span>
              </span>
            </Link>
            <Link to="/environments" className="mf-lab-card">
              <span>
                Shipped to frontier AI labs; the same technology powers our newer products
              </span>
              <span>
                Environments
                <span className="mf-arrow">
                  <Arrow />
                </span>
              </span>
            </Link>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noreferrer"
              className="mf-lab-card mf-lab-card--amber"
            >
              <span>20 minutes with Adi</span>
              <span>
                Book a call
                <span className="mf-arrow">
                  <Arrow />
                </span>
              </span>
            </a>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}
