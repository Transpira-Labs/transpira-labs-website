import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SolidBackground, SiteFooter, BUILD_URL } from "@/components/site-chrome";
import buildCanvas from "@/assets/build-canvas.png";
import buildRunTrain from "@/assets/build-run-train.png";

export const Route = createFileRoute("/case-studies/build")({
  head: () => ({
    meta: [
      { title: "Build: No-code RL Environments | Transpira" },
      { name: "description", content: "Build is Transpira's Scratch-style, block-based builder for reinforcement-learning environments. Snap blocks together, describe each in plain language, check it, and ship a real HUD environment you can run and train on, no code." },
      { property: "og:title", content: "Build: No-code RL Environments | Transpira" },
      { property: "og:description", content: "Snap blocks together, describe each in plain language, and ship a real RL environment on HUD, no code." },
    ],
  }),
  component: BuildCaseStudy,
});

/* Placeholder for a product screenshot. Pass `src` once the real image exists;
   until then it renders the description of what the screenshot should contain. */
function ImageSlot({
  label,
  caption,
  src,
  ratio = "16 / 10",
}: {
  label: string;
  caption: string;
  src?: string;
  ratio?: string;
}) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-2xl border border-border bg-card soft-shadow">
        <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-foreground/12" />
          <span className="size-2.5 rounded-full bg-foreground/12" />
          <span className="size-2.5 rounded-full bg-foreground/12" />
          <span className="ml-3 truncate font-mono text-[0.65rem] text-muted-foreground">build.transpiralabs.com</span>
        </div>
        {src ? (
          <img src={src} alt={caption} className="block w-full" />
        ) : (
          <div
            className="grid place-items-center bg-secondary"
            style={{
              aspectRatio: ratio,
              backgroundImage:
                "linear-gradient(oklch(0.225 0.013 262 / 0.04) 1px, transparent 1px), linear-gradient(90deg, oklch(0.225 0.013 262 / 0.04) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          >
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
          </div>
        )}
      </div>
      <figcaption className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{caption}</figcaption>
    </figure>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-10">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm font-semibold text-accent">{n}</span>
        <h2 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-tight text-foreground">{title}</h2>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 text-[1.05rem] leading-relaxed text-foreground/80 first:mt-0">{children}</p>;
}

const BLOCKS = [
  { name: "Environment", body: "The world the agent works in: the setting, the data it can touch, and the rules of the game." },
  { name: "Tool", body: "A function the agent can call. Give it a goal, its inputs, and what it returns, all in plain language." },
  { name: "Task", body: "A prompt plus a rubric: Good and Bad answers nested in a Scoring block that becomes the reward signal." },
  { name: "Train", body: "How the policy learns. Left on auto, a model picks a fitting RL framework for the environment you built." },
];

function BuildCaseStudy() {
  return (
    <>
      <SolidBackground />
      <main className="relative z-10 text-foreground">
        <SiteNav />

        <article className="mx-auto max-w-[64rem] px-6 pt-28 pb-20 sm:px-8">
          <Link to="/case-studies" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition">
            ← All case studies
          </Link>

          {/* HERO */}
          <header className="mt-8">
            <div className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              <span className="h-px w-[18px] bg-accent" />
              Case study · Product
            </div>
            <h1 className="mt-[18px] font-display text-[clamp(40px,6vw,68px)] font-bold leading-[0.98] tracking-[-0.02em]">
              Build
            </h1>
            <p className="mt-5 text-[20px] leading-[1.5] text-foreground/80">
              Build is a Scratch-style, block-based builder for reinforcement-learning environments. Snap blocks
              together, describe each in plain language, and ship a real environment you can run and train on, no code,
              JSON, or CLI.
            </p>
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/[0.06] px-4 py-2 text-[13px] font-medium text-foreground">
              <svg viewBox="0 0 24 24" className="size-4 text-accent" fill="none" aria-hidden="true">
                <path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 5h2.5a1.5 1.5 0 0 1 0 5H16M8 5H5.5a1.5 1.5 0 0 0 0 5H8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 13.5h4M12 11v3.5m-2.5 5.5h5l-.5-3h-4l-.5 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              1st place: HUD × Y Combinator Frontier/RL RSI Environments Hackathon
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={BUILD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Try Build →
              </a>
              <span className="font-mono text-xs text-foreground/55">build.transpiralabs.com</span>
            </div>
          </header>

          <ImageSlot
            src={buildCanvas}
            label="Canvas overview"
            caption="An environment open on the Build canvas: here, SupChain-Bench. The block tray sits on the left; on the right, an Environment block, a Taskset of Tasks (each with a Question and a Scoring group of Good and Bad answers), and a column of Tool blocks, every one describing its goal, what goes in, and what comes out in plain language."
          />

          {/* WHY BLOCKS */}
          <section className="mt-6">
            <P>
              A good RL environment is hard to write and easy to get subtly wrong. Build turns authoring into something
              you can see and reason about: every part of the environment is a labelled block, and the whole thing reads
              like a description rather than a config file. Under the hood, those blocks compile to real HUD environment
              code, but no one has to touch it.
            </P>
            <P>
              Build took <strong className="text-foreground">first place</strong> at the HUD × Y Combinator Frontier/RL
              RSI Environments Hackathon, where it was built and demoed end to end.
            </P>
          </section>

          {/* THE FOUR BLOCKS */}
          <section className="mt-12">
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">The building blocks</div>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-tight">Four blocks, nested to any depth</h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {BLOCKS.map((b) => (
                <div key={b.name} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-semibold">{b.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* WALKTHROUGH */}
          <section className="mt-16 flex flex-col gap-12">
            <div>
              <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">How it works</div>
              <h2 className="mt-3 font-display text-[clamp(1.85rem,3.4vw,2.75rem)] font-semibold tracking-tight">
                From blank canvas to a trained policy
              </h2>
            </div>

            <Step n="01" title="Start from a template or a blank canvas">
              <P>
                Open Build and either start a new environment or fork one of the ready-made templates: SupChain-Bench,
                Wordle Solver, Math Word Problems, or Support Ticket Triage. Templates are complete, runnable
                environments, so you can see how a finished one is wired before changing anything.
              </P>
            </Step>

            <Step n="02" title="Snap blocks together and describe each in plain language">
              <P>
                Drag blocks out of the tray and snap detail blocks into them. Build enforces what can nest where, so a
                Good answer only ever lands inside a Scoring block and a Tool's inputs land on the Tool. Dragging a block
                out pre-includes the parts it always needs, so a Task arrives with a Question and a Scoring block already
                in place.
              </P>
              <P>
                Everything is described in words, not code: a tool's goal, its inputs and returns, a task's prompt, the
                answers that should score well or poorly. That plain-language description is the entire specification.
              </P>
            </Step>

            <Step n="03" title="Check it">
              <P>
                Before building anything, run <em>Check it</em>. It reads the live environment and returns a friendly
                checklist of what still needs fixing (missing pieces, empty rubrics, tools nothing references), separated
                into errors that block a build and warnings worth a look. Nothing is generated yet; it just tells you
                whether the environment is ready.
              </P>
            </Step>

            <Step n="04" title="Build it: compile and deploy to HUD">
              <P>
                Hit <em>Build it</em> and the blocks compile into a real HUD reinforcement-learning environment (the
                tools, the task prompts, and the rubric-based reward) and deploy. A live modal tracks the compile and
                container build; the occasional generation hiccup is retried automatically rather than handed back to you.
              </P>
            </Step>

            <Step n="05" title="Run a baseline, then train">
              <P>
                With the environment live, run every task on HUD across a spanning set of models (Haiku 4.5, Sonnet 4.6,
                and Opus 4.8), a few attempts each. The results tell you whether the environment is any good:
                <strong className="text-foreground"> solvable</strong> (a strong model can actually do it) and
                <strong className="text-foreground"> discriminating</strong> (it separates weak models from strong ones).
                Once it's both, fork a base model from the same screen and start an RL run against the reward you
                described in blocks, closing the loop from a plain-language idea to a measurably better model.
              </P>
              <ImageSlot
                src={buildRunTrain}
                ratio="740 / 430"
                label="Run and train"
                caption="From one screen: launch a run of every task in the deployed taskset on HUD across Haiku 4.5, Sonnet 4.6, and Opus 4.8, then fork a base model (qwen3-14b) into a trainable one and start an RL run on the tasks you defined. Rollouts and inference both route through HUD."
              />
            </Step>
          </section>

          {/* UNDER THE HOOD */}
          <section className="mt-16 rounded-2xl border border-border bg-card p-8 sm:p-10">
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">Under the hood</div>
            <h2 className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-tight">
              Blocks become a canonical spec, then real code
            </h2>
            <P>
              Every block tree projects into a normalized intermediate representation: the canonical description of the
              environment. That representation is what gets checked, compiled to HUD SDK code, and deployed. Because the
              spec is consistent and human-readable, the same environment is auditable by a person and buildable by a
              machine, with nothing lost in translation.
            </P>
          </section>

          {/* CTA */}
          <section className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-10">
            <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold tracking-tight max-w-[16em]">
              Build an environment without writing code.
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={BUILD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Try Build →
              </a>
              <Link to="/case-studies" className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-secondary">
                All case studies
              </Link>
            </div>
          </section>
        </article>

        <SiteFooter />
      </main>
    </>
  );
}
