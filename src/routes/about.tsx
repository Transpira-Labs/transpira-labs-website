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
          "Transpira Labs builds Manifest, the team of AI agents for freight brokers. Bidding is the wedge; the goal is to be the AI partner for supply chain.",
      },
      { property: "og:title", content: "About | Transpira Labs" },
      {
        property: "og:description",
        content:
          "The company building Manifest, on the way to being the AI partner for supply chain.",
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
    role: "Founder & CEO",
    photo: adiKrish,
    bio: "Before Transpira, Adi studied computer science at Georgia Tech and built product on the Ads Machine Learning team at Meta, generating $5M ARR. His AI research at Georgia Tech earned the President's Undergraduate Research Award, he won the YC Hackathon grand prize, and he turned down offers from Google, Meta, and others to found Transpira Labs.",
  },
  {
    name: "Rishith Auluka",
    role: "Founding Engineer",
    initials: "RA",
    bio: "Previously on Meta's AI agents team and a manufacturing plant consultant. Rishith has been building with Adi since 7th grade.",
  },
  {
    name: "Saketh Koona",
    role: "Supply Chain Intern",
    initials: "SK",
    bio: "Industrial Engineering graduate from Georgia Tech, the #1 program in the country.",
  },
];

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main className="flex-1 rise-fast">
        <section className="flex flex-col items-center gap-8 px-4 py-[clamp(64px,12vw,120px)] sm:px-6">
          <PageIntro eyebrow="About" title="The AI partner for supply chain" />
          <div className="flex max-w-[760px] flex-col gap-5 text-[clamp(1.0625rem,1.8vw,1.25rem)] leading-[1.5] text-fog">
            <p className="m-0">
              Transpira Labs builds Manifest, the team of AI agents for freight brokers. Manifest
              connects to the systems a brokerage already runs, reads the inbox, reaches carriers
              where they already are, prices the load, and drafts every reply. A human approves
              every send.
            </p>
            <p className="m-0">
              Bidding is the wedge, not the destination. Once the agents are inside a brokerage's
              systems, every neighboring workflow is an expansion route, and the long-term goal is
              to be the AI layer supercharging every logistics firm.
            </p>
            <p className="m-0">
              If you run a brokerage, or freight operations of any kind, we'd love to talk.
            </p>
          </div>
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
            <p className="eyebrow-ink m-0">Team</p>
            <h2 className="m-0 font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.05]">
              Who we are
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
                    <div className="text-sm text-ink-muted">{member.role}</div>
                  </div>
                </div>
                <p className="m-0 text-[15px] leading-[1.5] text-ink-muted">{member.bio}</p>
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
