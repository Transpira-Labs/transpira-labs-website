import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SolidBackground, SiteFooter, DEMO_URL, CAL_URL } from "@/components/site-chrome";
import adiKrish from "@/assets/adi-krish.png";
import fusenWorldLogo from "@/assets/fusen-world.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Transpira" },
      {
        name: "description",
        content:
          "Transpira Labs builds the AI bidding agent for 3PL brokers: it reads the inbox, prices spot quotes and RFP bid sheets, and drafts the replies. A human approves every send.",
      },
      { property: "og:title", content: "About | Transpira" },
      {
        property: "og:description",
        content:
          "The company building the AI bidding agent for 3PL brokers, on the way to being the AI partner for supply chain.",
      },
    ],
  }),
  component: AboutPage,
});

/* Stylized initials avatar for teammates without a headshot yet. */
function InitialsAvatar({ initials }: { initials: string }) {
  return (
    <div className="grid size-14 shrink-0 place-items-center rounded-full bg-accent/15 border border-accent/30">
      <span className="font-display text-lg font-semibold tracking-tight text-accent">
        {initials}
      </span>
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
    <>
      <SolidBackground />
      <main className="relative z-10">
        <SiteNav />
        <section className="px-6 pt-36 pb-24">
          <div className="mx-auto max-w-3xl">
            <div className="eyebrow">About</div>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-foreground text-balance">
              The AI partner for supply chain
            </h1>
            <p className="mt-8 text-lg text-foreground/85 leading-relaxed">
              Transpira Labs builds the AI bidding agent for 3PL brokers. The agent connects to the
              systems a brokerage already runs, reads the inbox, prices spot quotes and RFP bid
              spreadsheets from the rate data the broker already pays for, and drafts the replies. A
              human approves every send. See it in action at the{" "}
              <a
                href={DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline underline-offset-4"
              >
                demo
              </a>
              .
            </p>
            <p className="mt-6 text-lg text-foreground/85 leading-relaxed">
              Bidding is the wedge, not the destination. Once the agent is inside a brokerage&apos;s
              systems, every neighboring workflow is an expansion route, and the long-term goal is
              to be the AI layer supercharging every logistics firm.
            </p>
            <p className="mt-6 text-lg text-foreground/85 leading-relaxed">
              If you run a brokerage, or freight operations of any kind, we&apos;d love to talk.
            </p>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block rounded-full px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Book a meeting
            </a>
          </div>
        </section>

        <section className="px-6 py-24 border-t border-border">
          <div className="mx-auto max-w-3xl">
            <div className="eyebrow">Team</div>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground">
              Who we are
            </h2>
            <div className="mt-8 space-y-6">
              {TEAM.map((member) => (
                <div
                  key={member.name}
                  className="rounded-2xl border border-border bg-card p-6 soft-shadow"
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
                      <div className="text-lg font-medium text-foreground">{member.name}</div>
                      <div className="text-sm text-muted-foreground">{member.role}</div>
                    </div>
                  </div>
                  <p className="mt-4 text-foreground/85 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-6 py-24 border-t border-border">
          <div className="mx-auto max-w-3xl">
            <div className="eyebrow">Investors</div>
            <h2 className="mt-4 font-display text-3xl tracking-tight text-foreground">Backed by</h2>
            <div className="mt-8 flex justify-center">
              <a
                href="https://fusen.world/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-48 w-full items-center justify-center rounded-2xl border border-border bg-[#f6f8f5] p-8 soft-shadow transition-colors hover:border-accent/50 sm:w-[28rem]"
              >
                <img
                  src={fusenWorldLogo}
                  alt="Fusen World logo"
                  className="max-h-32 w-auto max-w-full object-contain"
                />
              </a>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </>
  );
}
