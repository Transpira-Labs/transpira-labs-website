import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteNav, SolidBackground, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/case-studies/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: params?.slug === "classhopper-set" ? "Classhopper Set — Fine-Tuning GPT OSS 120B" : "Case Study — Classhopper" },
      { name: "description", content: "Fine-tuning GPT OSS 120B for coding tasks using the HUD reinforcement learning platform — +13% Best@10 improvement on real-world bugs." },
      { property: "og:title", content: "Classhopper Set — Fine-Tuning GPT OSS 120B" },
      { property: "og:description", content: "GRPO training on 100 real-world bug-fixing tasks: +13% Best@10, +8% Pass@1, 4 fewer steps per task." },
    ],
  }),
  loader: ({ params }) => {
    if (params.slug !== "classhopper-set") throw notFound();
    return { slug: params.slug };
  },
  component: CaseStudyPage,
  notFoundComponent: () => (
    <>
      <SolidBackground />
      <main className="relative z-10">
        <SiteNav />
        <section className="px-6 pt-44 pb-32 text-center">
          <h1 className="font-display text-4xl text-foreground">Case study not found</h1>
          <Link to="/case-studies" className="mt-6 inline-block text-accent hover:underline">← All Case Studies</Link>
        </section>
        <SiteFooter />
      </main>
    </>
  ),
  errorComponent: ({ error, reset }) => (
    <>
      <SiteNav />
      <section className="px-6 pt-44 pb-32 text-center">
        <h1 className="font-display text-4xl text-foreground">Something went wrong</h1>
        <p className="mt-4 text-muted-foreground">{error.message}</p>
        <button onClick={() => reset()} className="mt-6 rounded-full px-5 py-2 bg-primary text-primary-foreground text-sm">Try again</button>
      </section>
    </>
  ),
});

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-3xl md:text-4xl text-foreground mt-16 mb-6 tracking-tight">{children}</h2>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-xl md:text-2xl text-foreground mt-10 mb-4">{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-foreground/85 leading-relaxed mb-5">{children}</p>;
}

function CaseStudyPage() {
  return (
    <>
      <SolidBackground />
      <main className="relative z-10">
        <SiteNav />

        <article className="px-6 pt-36 pb-24">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.05] tracking-tight text-gradient text-balance text-center">
              Classhopper Set
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Fine-Tuning GPT OSS 120B for Coding Tasks Using the{" "}
              <a href="https://www.hud.ai/" target="_blank" rel="noreferrer" className="text-accent hover:underline">HUD</a>{" "}
              Reinforcement Learning Platform
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Reinforcement Learning", "Code Generation", "HUD Platform", "GRPO"].map((t) => (
                <span key={t} className="text-xs rounded-full border border-foreground/15 bg-background/70 px-3 py-1 text-foreground/70">{t}</span>
              ))}
            </div>

            <div className="mt-12 rounded-2xl border border-accent/30 bg-accent/5 backdrop-blur-md p-6">
              <P>
                We used <a href="https://www.hud.ai/" target="_blank" rel="noreferrer" className="text-accent hover:underline">HUD</a>'s RL platform to fine-tune GPT OSS 120B on 100 real-world bug-fixing tasks built from a production codebase. Training with GRPO yielded a <strong className="text-foreground">+13% improvement</strong> (Best@10 runs), and fewer steps per task.
              </P>
            </div>

            <H2>1. Environment Creation</H2>
            <P>
              We started with Classhopper, one of our older production apps. It's an Airbnb-style service for discovering and booking classes near you. The codebase was pre-AI era: functional, deployed, but messy. Perfect for realistic coding challenges.
            </P>
            <P>
              We merged frontend and backend into a single monorepo, verified builds and tests passed, and confirmed it was stable enough for automated evaluation.
            </P>
            <P>
              We then connected it using HUD's coding environment template. The template handles the heavy lifting of environment creation — it ships with a Dockerfile, a grading harness, and a task runner, so you don't need to build any of that infrastructure yourself. Out of the box, it gives the agent two built-in tools: a bash tool for running shell commands, and an editor tool for viewing, creating, and editing files. These are the only tools the agent gets: no web access, no special APIs, just a terminal and a file editor — the same primitives a human developer would use.
            </P>
            <P>
              To connect our codebase, we forked the template and set the <code className="font-mono text-sm bg-background/80 px-1.5 py-0.5 rounded">REPO_URL</code> build argument in the Dockerfile to point at our Classhopper monorepo. The template clones this repo into the container at build time and wires it into the task runner automatically.
            </P>

            <H2>2. Task Creation</H2>
            <H3>Branch Structure</H3>
            <P>HUD uses a three-branch structure per task ("scenario"), based on their coding template:</P>
            <ul className="list-disc pl-6 mb-5 space-y-2 text-foreground/85">
              <li><strong className="text-foreground">Baseline:</strong> The buggy code the agent starts with.</li>
              <li><strong className="text-foreground">Test:</strong> Tests that check the fix and catch regressions.</li>
              <li><strong className="text-foreground">Golden:</strong> The correct working code. We mostly kept the original source, cleaning it up where needed.</li>
            </ul>

            <H3>Bug Design</H3>
            <P>
              We built 25 initial bugs across frontend-only, backend-only, and cross-stack categories at easy, medium, and hard difficulties. We then injected these bugs into the code base.
            </P>
            <div className="rounded-2xl border border-foreground/15 bg-card backdrop-blur-md p-6 mb-6 font-mono text-sm text-foreground/85 leading-relaxed">
              <div className="text-xs uppercase tracking-wider text-foreground/50 mb-3">Example bug prompt</div>
              <p className="mb-3">"You will be working on a task for project. The repository has already been cloned in <span className="text-accent">/home/ubuntu/project</span>."</p>
              <p className="mb-3">Use the tools provided to complete the following task:</p>
              <p className="mb-3">Fix the course visibility toggle bug in the ClassHopper backend.</p>
              <p className="mb-3">The "make all courses visible" endpoint for instructors does the opposite of what it should. After calling <span className="text-accent">PUT /instructors/&#123;id&#125;/courses/visible</span>, all courses become hidden instead of visible.</p>
              <p>You MUST edit the relevant file(s) to fix the bug. Do not just describe the fix."</p>
            </div>

            <H3>Test Design & Reward Signal</H3>
            <P>
              Each bug got tests for the fix itself plus adjacent areas to catch regressions. Reward is binary: pass all tests or fail the task. No partial credit. Binary rewards give the strongest training signal since the model can't get away with partial fixes.
            </P>

            <H2>3. Task Validation</H2>
            <P>
              Early mistake: we jumped straight to running agents without verifying the HUD build config was correct. Tasks that look fine locally can silently break when config doesn't apply tests properly.
            </P>
            <P>
              The <code className="font-mono text-sm bg-background/80 px-1.5 py-0.5 rounded">uv run imagectl4.py &lt;img-name&gt; -v --ids &lt;task-1&gt; &lt;task-2&gt;</code> command fixed this. It checks that everything builds, tests apply to the right branches, baseline tests fail (bug exists), and golden tests pass (fix works). After running validation across all tasks, we could trust that any agent failure was a real performance issue, not a config bug.
            </P>

            <H2>4. Model Training</H2>
            <H3>Initial Evaluation</H3>
            <P>
              With 25 validated tasks, we created a taskset on HUD and batch ran it against the base GPT OSS 120B. After fixing a few config issues, we got a solid distribution of success rates: some tasks the model solved easily, some it struggled with, some it couldn't crack.
            </P>

            <H3>Scaling to 100 Tasks</H3>
            <P>
              We talked to the HUD team about what makes a good training set. Based on their guidance, we built 75 more tasks, keeping diversity across stack types and difficulties while targeting a similar success distribution.
            </P>
            <P><strong className="text-foreground">Final dataset: 100 validated tasks.</strong></P>

            <div className="rounded-2xl border border-foreground/15 bg-card backdrop-blur-md overflow-hidden shadow-sm my-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs uppercase tracking-wider text-foreground/60 border-b border-foreground/10">
                    <tr>
                      <th className="text-left px-5 py-3">Difficulty</th>
                      <th className="text-right px-5 py-3">Frontend Only</th>
                      <th className="text-right px-5 py-3">Backend Only</th>
                      <th className="text-right px-5 py-3">Cross-Stack</th>
                      <th className="text-right px-5 py-3">Total</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    {[
                      ["Easy", 13, 14, 6, 33],
                      ["Medium", 12, 16, 8, 36],
                      ["Hard", 10, 14, 7, 31],
                    ].map((r) => (
                      <tr key={r[0] as string} className="border-b border-foreground/5 last:border-0">
                        <td className="px-5 py-3 text-foreground">{r[0]}</td>
                        <td className="px-5 py-3 text-right text-foreground/80">{r[1]}</td>
                        <td className="px-5 py-3 text-right text-foreground/80">{r[2]}</td>
                        <td className="px-5 py-3 text-right text-foreground/80">{r[3]}</td>
                        <td className="px-5 py-3 text-right text-foreground">{r[4]}</td>
                      </tr>
                    ))}
                    <tr className="bg-background/40 font-semibold">
                      <td className="px-5 py-3 text-foreground">Total</td>
                      <td className="px-5 py-3 text-right text-foreground">35</td>
                      <td className="px-5 py-3 text-right text-foreground">44</td>
                      <td className="px-5 py-3 text-right text-foreground">21</td>
                      <td className="px-5 py-3 text-right text-foreground">100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 text-xs text-foreground/60 border-t border-foreground/10">Table 1: Task distribution by stack type and difficulty</div>
            </div>

            <H3>Training Run</H3>
            <P>
              We ran GRPO training on a HUD fork of GPT OSS 120B, investing ~10 hours and 600 credits over 20 training steps. The model's policy showed a clear shift, with pass rates climbing steadily throughout the run. While you might notice performance dips at checkpoints #5 and #11, these weren't regressions — they were simply the result of a more difficult distribution of tasks in those specific evaluations. Overall, the trajectory remained strong.
            </P>

            <H2>5. Results</H2>
            <H3>Evaluation Setup</H3>
            <P>
              We benchmarked this newly trained model on 50 unseen tasks: 25 new Classhopper tasks and 25 from ScheduleHero, a completely separate app. The out-of-domain eval on ScheduleHero was key to confirming the model gained real coding skill, not just Classhopper memorization.
            </P>

            <H3>Performance</H3>
            <P>Consistent improvement across every metric:</P>

            <div className="rounded-2xl border border-foreground/15 bg-card backdrop-blur-md overflow-hidden shadow-sm my-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-xs uppercase tracking-wider text-foreground/60 border-b border-foreground/10">
                    <tr>
                      <th className="text-left px-5 py-3">Metric</th>
                      <th className="text-right px-5 py-3">Base GPT OSS 120B</th>
                      <th className="text-right px-5 py-3">Trained Model</th>
                      <th className="text-right px-5 py-3">Improvement</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono">
                    {[
                      ["Average Pass Rate", "53.9%", "60.7%", "+6.8%"],
                      ["Best@3", "68.2%", "77.9%", "+9.7%"],
                      ["Best@5", "70.8%", "82.9%", "+12.1%"],
                      ["Best@10", "73.9%", "86.9%", "+13.0%"],
                      ["Pass@1", "80.0%", "88.0%", "+8.0%"],
                      ["ScheduleHero (out-of-domain)", "14%", "22%", "+8.0%"],
                      ["Avg Steps", "26.2", "22.2", "-4.0 steps"],
                    ].map((r) => (
                      <tr key={r[0]} className="border-b border-foreground/5 last:border-0">
                        <td className="px-5 py-3 text-foreground">{r[0]}</td>
                        <td className="px-5 py-3 text-right text-foreground/80">{r[1]}</td>
                        <td className="px-5 py-3 text-right text-foreground">{r[2]}</td>
                        <td className="px-5 py-3 text-right text-accent">{r[3]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 text-xs text-foreground/60 border-t border-foreground/10">Table 2: Benchmark results on classhopper-benchv1 (25 held-out tasks)</div>
            </div>

            <H3>Key Takeaways</H3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-foreground/10 rounded-2xl overflow-hidden border border-foreground/15 mb-6">
              {[
                { v: "+6.8%", l: "Avg Pass Rate" },
                { v: "+12.1%", l: "Best@5" },
                { v: "+8.0%", l: "Pass@1" },
                { v: "-4", l: "Avg Steps" },
              ].map((s) => (
                <div key={s.l} className="bg-card p-6">
                  <div className="font-display text-3xl text-foreground">{s.v}</div>
                  <div className="text-xs text-foreground/60 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
            <ul className="list-disc pl-6 space-y-2 text-foreground/85">
              <li><strong className="text-foreground">+6.8% average pass rate</strong> (53.9% → 60.7%). More tasks solved per run.</li>
              <li><strong className="text-foreground">+12.1% Best@5</strong> (70.8% → 82.9%). Way more tasks solvable given multiple attempts.</li>
              <li><strong className="text-foreground">+8.0% Pass@1</strong> (80.0% → 88.0%). Better first-attempt reliability.</li>
              <li><strong className="text-foreground">4 fewer steps on average</strong> (26.2 → 22.2). Not just more accurate, but more efficient.</li>
              <li><strong className="text-foreground">+8.0% improvement on an unseen code base</strong> and significantly harder tasks.</li>
            </ul>

            <div className="mt-16 pt-8 border-t border-foreground/10 flex flex-wrap items-center justify-between gap-4">
              <Link to="/case-studies" className="text-sm text-muted-foreground hover:text-foreground transition">← All Case Studies</Link>
              <a href="mailto:adikrish6824@gmail.com" className="rounded-full px-5 py-2.5 bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition">
                Request Access
              </a>
            </div>
          </div>
        </article>

        <SiteFooter />
      </main>
    </>
  );
}
