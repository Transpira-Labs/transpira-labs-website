import { createFileRoute } from "@tanstack/react-router";
import {
  SiteNav,
  SiteFooter,
  PageIntro,
  BTN_PRIMARY,
  BTN_GHOST,
  DEMO_URL,
  CAL_URL,
} from "@/components/site-chrome";
import adiKrish from "@/assets/adi-krish.png";
import fusenWorldLogo from "@/assets/fusen-world.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Transpira Labs" },
      {
        name: "description",
        content:
          "The team behind Manifest by Transpira: researchers and engineers making AI actually useful for everyone, not just a select few.",
      },
      { property: "og:title", content: "About | Transpira Labs" },
      {
        property: "og:description",
        content: "The team behind Manifest by Transpira. Backed by Fusen World.",
      },
    ],
  }),
  component: AboutPage,
});

/* Stylized initials avatar for teammates without a headshot yet. */
function InitialsAvatar({ initials }: { initials: string }) {
  return (
    <div className="grid size-14 shrink-0 place-items-center rounded-full border border-forest/40 bg-forest/15">
      <span className="text-lg font-semibold tracking-tight text-forest">{initials}</span>
    </div>
  );
}

const TEAM = [
  {
    name: "Adi Krish",
    role: "Founder and CEO",
    photo: adiKrish,
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

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="flex-1 rise-fast">
        <section className="flex flex-col items-center gap-8 px-4 py-[clamp(64px,12vw,120px)] sm:px-6">
          <PageIntro eyebrow="About" title="The AI partner for supply chain" />
          <div className="flex flex-wrap justify-center gap-3">
            <a href={CAL_URL} target="_blank" rel="noreferrer" className={BTN_PRIMARY}>
              Book a meeting
            </a>
            <a href={DEMO_URL} target="_blank" rel="noreferrer" className={BTN_GHOST}>
              See the demo
            </a>
          </div>
        </section>

        <section className="flex flex-col items-center gap-8 bg-paper px-4 py-[clamp(56px,10vw,96px)] text-ink sm:px-6">
          <div className="flex flex-col gap-3 text-center">
            <p className="eyebrow-ink m-0">Transpira Labs</p>
            <h2 className="m-0 font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.05]">
              The team
            </h2>
          </div>
          <div className="grid w-full max-w-[1100px] grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-4">
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="flex flex-col gap-4 rounded-xl border border-line bg-white p-6 shadow-[0_8px_30px_rgba(27,36,32,0.06)]"
              >
                <div className="flex items-center gap-4">
                  {member.photo ? (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="size-14 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <InitialsAvatar initials={member.initials!} />
                  )}
                  <div>
                    <div className="text-lg font-semibold leading-tight">{member.name}</div>
                    <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
                      {member.role}
                    </div>
                  </div>
                </div>
                <ul className="m-0 flex list-disc flex-col gap-1.5 pl-5 text-[15px] leading-[1.5] text-ink-muted marker:text-forest">
                  {member.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col items-center gap-8 px-4 py-[clamp(56px,10vw,96px)] sm:px-6">
          <div className="flex flex-col gap-3 text-center">
            <p className="eyebrow m-0">Investors</p>
            <h2 className="m-0 font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.05] text-white">
              Backed by
            </h2>
          </div>
          <a
            href="https://fusen.world/"
            target="_blank"
            rel="noreferrer"
            className="flex h-44 w-full max-w-[28rem] items-center justify-center rounded-xl border border-white/15 bg-white p-8 transition-colors hover:border-mint/60"
          >
            <img
              src={fusenWorldLogo}
              alt="Fusen World logo"
              className="max-h-28 w-auto max-w-full object-contain"
            />
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
