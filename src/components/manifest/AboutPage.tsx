import { Link } from "@tanstack/react-router";
import adiKrish from "@/assets/adi-krish.png";
import fusenWorldLogo from "@/assets/fusen-world.jpeg";
import { CAL_URL } from "@/components/site-chrome";
import { Arrow, Footer, Nav } from "./Chrome";

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

/*
 * The page is set like a manifest sheet: one statement at the top, then ruled
 * rows with the row's name in a narrow left column and its contents on the
 * right. No photo band and no cards; the rules and the type do the work.
 */
const MORE: { title: string; note: string; to?: "/case-studies" | "/environments" }[] = [
  { title: "Our research", note: "Case studies and SupChain-Bench", to: "/case-studies" },
  {
    title: "Environments",
    note: "Shipped to frontier AI labs; the same technology powers our newer products",
    to: "/environments",
  },
  { title: "Book a call", note: "20 minutes with Adi" },
];

export function AboutPage() {
  return (
    <div className="mf-root">
      <Nav current="about" />
      <main className="mf-wrap mf-ab">
        <header className="mf-ab-top">
          <p className="mf-kicker">Transpira Labs</p>
          <h1>AI that is actually useful for everyone.</h1>
          <p className="mf-ab-lede">
            We're a research lab ensuring that AI is useful for everyone, not just a select few.
            Manifest, our text agent, is where that work meets freight brokers.
          </p>
        </header>

        <section className="mf-ab-row">
          <h2>The team</h2>
          <div className="mf-ab-people">
            {TEAM.map((m) => (
              <div key={m.name} className="mf-ab-person">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} width={200} height={200} />
                ) : (
                  <div className="mf-ab-initials" aria-hidden="true">
                    {m.initials}
                  </div>
                )}
                <div>
                  <h3>{m.name}</h3>
                  <p className="mf-muted">{m.role}</p>
                  <ul>
                    {m.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mf-ab-row">
          <h2>Backed by Fusen World</h2>
          <a href="https://fusen.world/" target="_blank" rel="noreferrer" className="mf-ab-backer">
            <img src={fusenWorldLogo} alt="Fusen World" />
          </a>
        </section>

        <section className="mf-ab-row">
          <h2>More from the lab</h2>
          <ul className="mf-ab-more">
            {MORE.map((m) => {
              const inner = (
                <>
                  <span>{m.title}</span>
                  <span>{m.note}</span>
                  <span className="mf-ab-go">
                    <Arrow stroke="currentColor" />
                  </span>
                </>
              );
              return (
                <li key={m.title}>
                  {m.to ? (
                    <Link to={m.to}>{inner}</Link>
                  ) : (
                    <a href={CAL_URL} target="_blank" rel="noreferrer">
                      {inner}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </main>

      <div className="mf-dark">
        <Footer />
      </div>
    </div>
  );
}
