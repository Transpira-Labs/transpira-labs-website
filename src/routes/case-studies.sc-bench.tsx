import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteNav, SolidBackground, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/case-studies/sc-bench")({
  head: () => ({
    meta: [
      { title: "SupChain-Bench Verified | Transpira" },
      {
        name: "description",
        content:
          "A held-out benchmark is only as trustworthy as its ground truth. We audited all 326 items of SupChain-Bench through the real graders, kept only the survivors, and packaged them as two deployable HUD v6 environments.",
      },
      { property: "og:title", content: "SupChain-Bench Verified | Transpira" },
      {
        property: "og:description",
        content:
          "Before SupChain-Bench could be the golden environment in Benchception, it had to be gold-correct, ungameable, and gradable with no human in the loop. Here is how we verified it.",
      },
    ],
  }),
  component: SupChainBenchPage,
});

const PAPER_URL = "https://arxiv.org/pdf/2602.07342";
const CODE_URL = "https://github.com/Damon-GSY/SC-bench";

// Item-level audit (sums cleanly to the 326-item corpus).
const QA_VERIFIED = 217;
const QA_EXCLUDED = 9;
const TOOL_VERIFIED = 33;
const TOOL_EXCLUDED = 67;

const STATS = [
  { label: "Corpus", value: "326", unit: "items" },
  { label: "Verified", value: "288", accent: true },
  { label: "Excluded", value: "76" },
  { label: "Judge panel", value: "6", unit: "vendors" },
  { label: "Environments", value: "2" },
];

const EXCLUDED_BUCKETS = [
  {
    label: "False premise",
    count: 36,
    why: "Asserts what the data denies (“why does this trade order have no fulfillments?” when it has five).",
  },
  {
    label: "Unusable",
    count: 21,
    why: "No resolvable order, or a named entity absent from the data.",
  },
  {
    label: "Above warehouse layer",
    count: 10,
    why: "Answerable at the buyer or fulfillment level, yet the whole-order grader still counts every warehouse field.",
  },
];

const TRACKS = [
  {
    track: "QA: single / multiple / true-false",
    strategy: "No tools; reasoning only",
    verified: 217,
  },
  { track: "Tool · No-SOP", strategy: "Minimal instruction", verified: 19 },
  { track: "Tool · SOP", strategy: "Deterministic step-by-step workflow", verified: 33 },
  { track: "Tool · ReAct", strategy: "SOP-free THINK / ACT / OBSERVE", verified: 19 },
];

const PACKAGING = [
  {
    name: "Live tools",
    body: "The 8 tools run as an in-process MCP capability; the grader reconstructs the trajectory to compute IRA. No offline predictions, no manual scoring.",
  },
  {
    name: "Deterministic grading",
    body: "Reward is IRA (tool) or exact answer-set match (QA), with no LLM on the critical path. An optional LLM-judge is off by default and never touches reward.",
  },
];

const JUDGMENT_CALLS = [
  {
    title: "Track fairness",
    body: "Named questions run on all three tracks; whole-order questions run on SOP only, since anywhere else they would be unfair.",
  },
  {
    title: "A redundant track, removed",
    body: "The paper's ReAct-vote was byte-for-byte identical to ReAct on the platform, so we dropped it rather than inflate the count.",
  },
];

const ROADMAP = [
  {
    n: "01",
    title: "Broaden the verified set",
    body: "More orders, failure modes, and question shapes, since variety is the defense against gaming.",
  },
  {
    n: "02",
    title: "Automated re-verification",
    body: "Re-run the full audit on every data or grader change, so the set cannot silently drift.",
  },
  {
    n: "03",
    title: "Reward-hack harnesses",
    body: "Surface degenerate paths that score without doing the work, before any training run depends on them.",
  },
  {
    n: "04",
    title: "Human-in-the-loop review",
    body: "A human verdict on the hardest exclusion calls as the set grows.",
  },
];

function SupChainBenchPage() {
  return (
    <>
      <SolidBackground />
      <main className="relative z-10 text-foreground">
        <SiteNav />

        <article className="mx-auto max-w-[64rem] px-6 pt-28 pb-20 sm:px-8">
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition"
          >
            ← All case studies
          </Link>

          {/* HERO */}
          <header className="mt-8">
            <div className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
              <span className="h-px w-[18px] bg-accent" />
              Case study · Internal R&amp;D
            </div>
            <h1 className="mt-[18px] font-display text-[clamp(40px,6vw,68px)] font-bold leading-[0.98] tracking-[-0.02em]">
              SupChain-Bench Verified
            </h1>
            <p className="mt-5 text-[20px] leading-[1.5] text-foreground/80">
              A held-out benchmark is only as trustworthy as its ground truth. Before SupChain-Bench
              could be the golden environment in{" "}
              <Link
                to="/case-studies/benchception"
                className="text-accent underline underline-offset-2"
              >
                Benchception
              </Link>
              , it had to be gold-correct, ungameable, and gradable with no human in the loop. We
              audited all 326 items through the real graders and kept only the ones that survive.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {STATS.map((s) => (
                <Stat key={s.label} {...s} />
              ))}
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={PAPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-border px-5 py-2.5 text-sm font-medium transition hover:bg-secondary"
              >
                Read the original paper →
              </a>
              <a
                href={CODE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-accent underline underline-offset-2 transition hover:brightness-110"
              >
                SC-Bench code on GitHub
              </a>
            </div>
          </header>

          {/* AUDIT FUNNEL FIGURE */}
          <figure className="mt-12">
            <div className="rounded-2xl border border-border bg-card p-6 soft-shadow sm:p-8">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-[15px] font-semibold">326 items audited</span>
                <div className="flex gap-3.5 text-[10px] uppercase tracking-[0.04em] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span
                      className="size-[9px] rounded-sm"
                      style={{ background: "var(--accent)" }}
                    />
                    verified
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-[9px] rounded-sm" style={{ background: "#C3C8D0" }} />
                    excluded
                  </span>
                </div>
              </div>

              <FunnelTrack
                name="QA track"
                note="answered from reasoning alone"
                verified={QA_VERIFIED}
                excluded={QA_EXCLUDED}
              />
              <FunnelTrack
                name="Tool track"
                note="scored on Information Retrieval Accuracy"
                verified={TOOL_VERIFIED}
                excluded={TOOL_EXCLUDED}
              />

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-accent/40 bg-accent/10 px-4 py-3.5">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
                    Gold-correct
                  </div>
                  <div className="mt-0.5 text-[22px] font-bold tabular-nums">
                    {QA_VERIFIED + TOOL_VERIFIED}{" "}
                    <span className="text-[12px] font-medium text-muted-foreground">items</span>
                  </div>
                </div>
                <div className="rounded-lg border border-border bg-secondary/60 px-4 py-3.5">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Excluded
                  </div>
                  <div className="mt-0.5 text-[22px] font-bold tabular-nums">
                    {QA_EXCLUDED + TOOL_EXCLUDED}{" "}
                    <span className="text-[12px] font-medium text-muted-foreground">items</span>
                  </div>
                </div>
              </div>
            </div>
            <figcaption className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              The survivors deploy as 288 task instances across two HUD v6 environments, since fair
              questions run on more than one track.
            </figcaption>
          </figure>

          {/* WHY VERIFY */}
          <section className="mt-14">
            <P>
              SupChain-Bench (Guan, Liu &amp; Cao, ACL 2026 Findings) models a three-tier supply
              chain with two tracks: QA answered from reasoning alone, and tool orchestration scored
              by Information Retrieval Accuracy (IRA) against a deterministic oracle. It is a strong
              benchmark, but it shipped as research code with no guarantee that every item was
              gold-correct or fairly gradable. For a held-out judge, that gap is disqualifying: any
              item where the gold is wrong, the question contradicts the data, or an efficient agent
              is penalized for unrequested work adds noise that looks exactly like model
              performance.
            </P>
            <Callout symbol="!">
              <strong className="text-foreground">The exclusions are the product.</strong> Every
              excluded item is a landmine we took off the board.
            </Callout>
          </section>

          {/* WALKTHROUGH */}
          <section className="mt-16 flex flex-col gap-12">
            <div>
              <h2 className="font-display text-[clamp(1.85rem,3.4vw,2.75rem)] font-semibold tracking-tight">
                How we verified
              </h2>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-muted-foreground">
                Two graders, nothing given the benefit of the doubt.
              </p>
            </div>

            <Step n="01" title="Put every QA gold to a blind panel">
              <P>
                We kept a QA question only if its gold scored 1.0 through the real grader and
                survived a blind panel that never saw it: a Sonnet 3-vote pass plus six vendors
                answering cold (opus-4-8, sonnet-4-6, haiku-4-5, qwen3-max, deepseek-v3.1-terminus,
                gpt-5.1). Where 0 of 6 landed on the gold, we dropped it; where only some disagreed,
                we reviewed it manually.
              </P>
              <Callout symbol="✓">
                <strong className="text-foreground">9 excluded, 217 verified.</strong> Seven
                near-certain gold errors plus two that live agent runs scored 0.
              </Callout>
            </Step>

            <Step n="02" title="Check every tool question for fairness">
              <P>
                How the grader scopes ground truth decides fairness. Named-entity questions scope
                IRA to one entity, so they are fair on every track; whole-order questions are graded
                on the entire order and only the SOP prompt tells the agent to enumerate warehouses,
                so they are fair on the SOP track alone. We kept a question only if the oracle
                resolves the order, every named entity exists, there is a non-null field to grade,
                and the premise matches the data.
              </P>

              <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-5 py-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  <span>Excluded bucket</span>
                  <span>Count</span>
                </div>
                {EXCLUDED_BUCKETS.map((b) => (
                  <div
                    key={b.label}
                    className="border-b border-border/60 px-5 py-3.5 last:border-b-0"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[13.5px] font-semibold">{b.label}</span>
                      <span className="text-sm font-bold tabular-nums text-muted-foreground">
                        {b.count}
                      </span>
                    </div>
                    <p className="mt-1 text-[12.5px] leading-[1.5] text-muted-foreground">
                      {b.why}
                    </p>
                  </div>
                ))}
              </div>

              <Callout symbol="✓">
                <strong className="text-foreground">67 of 100 excluded, 33 verified.</strong> 19
                named-entity questions (all tracks) plus 14 whole-order questions (SOP only).
              </Callout>
            </Step>

            <Step n="03" title="Package the survivors on HUD v6">
              <P>
                We rebuilt the survivors as two deployable environments, with 288 task instances
                routed automatically.
              </P>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {PACKAGING.map((p) => (
                  <div key={p.name} className="rounded-xl border border-border bg-card p-6">
                    <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 overflow-x-auto">
                <div className="min-w-[560px] overflow-hidden rounded-xl border border-border bg-card">
                  <div className="grid grid-cols-[1.4fr_1.6fr_auto] gap-4 border-b border-border px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <span>Track</span>
                    <span>Prompt strategy</span>
                    <span className="text-right">Verified</span>
                  </div>
                  {TRACKS.map((t) => (
                    <div
                      key={t.track}
                      className="grid grid-cols-[1.4fr_1.6fr_auto] gap-4 border-b border-border/60 px-5 py-3.5 last:border-b-0"
                    >
                      <span className="text-[13.5px] font-semibold">{t.track}</span>
                      <span className="text-[13px] text-muted-foreground">{t.strategy}</span>
                      <span className="text-right text-sm font-bold tabular-nums">
                        {t.verified}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <Callout symbol="✓">
                <strong className="text-foreground">SOP adherence is not graded.</strong> Reward
                depends only on the fields retrieved. Following the SOP is simply how you cover
                them, which is coverage, not obedience.
              </Callout>
            </Step>
          </section>

          {/* JUDGMENT CALLS */}
          <section className="mt-16">
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
              Judgment calls
            </div>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-tight">
              The decisions behind the number
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {JUDGMENT_CALLS.map((c) => (
                <div key={c.title} className="rounded-xl border border-border bg-card p-6">
                  <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* RESULTS */}
          <section className="mt-16 rounded-2xl border border-border bg-card p-8 sm:p-10">
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
              Results
            </div>
            <h2 className="mt-3 font-display text-[clamp(1.5rem,2.6vw,2rem)] font-semibold tracking-tight">
              Every item gold-correct, fairly gradable, reproducible
            </h2>
            <P>
              288 verified instances from a 326-item corpus, every one gold-correct and fairly
              gradable, with a per-item exclusion reason recorded. The taskset and inventory
              regenerate byte-for-byte and exclusion decisions live in code, so the set is fully
              reproducible.
            </P>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <ResultTile
                n="288"
                unit="verified instances"
                note="from a 326-item corpus, each with a recorded reason"
              />
              <ResultTile
                n="100%"
                unit="reproducible"
                note="taskset and inventory regenerate byte-for-byte"
              />
            </div>
          </section>

          {/* ROADMAP */}
          <section className="mt-16">
            <div className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
              Roadmap
            </div>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-tight">
              Where it goes next
            </h2>
            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {ROADMAP.map((r) => (
                <div key={r.n} className="rounded-xl border border-border bg-card p-6">
                  <div className="font-mono text-sm font-semibold text-accent">{r.n}</div>
                  <h3 className="mt-2 font-display text-lg font-semibold">{r.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ATTRIBUTION + CTA */}
          <section className="mt-14 border-t border-border pt-10">
            <p className="max-w-[52em] text-sm leading-relaxed text-muted-foreground">
              Built on the original SupChain-Bench (Shengyue Guan, Yihao Liu, Lang Cao), Apache-2.0.
              Our contribution is the verification layer and the HUD v6 packaging.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={PAPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
              >
                Read the original paper →
              </a>
              <Link
                to="/case-studies/benchception"
                className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-secondary"
              >
                See Benchception
              </Link>
              <Link
                to="/case-studies"
                className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-secondary"
              >
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

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------

function Stat({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: string;
  unit?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-4 soft-shadow">
      <div className="flex items-baseline gap-1.5">
        <span
          className={`font-display text-[28px] font-bold leading-none tabular-nums ${accent ? "text-accent" : "text-foreground"}`}
        >
          {value}
        </span>
        {unit ? (
          <span className="text-[12px] font-medium text-muted-foreground">{unit}</span>
        ) : null}
      </div>
      <div className="mt-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-[1.05rem] leading-relaxed text-foreground/80 first:mt-0">{children}</p>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-10">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm font-semibold text-accent">{n}</span>
        <h2 className="font-display text-[clamp(1.6rem,3vw,2.25rem)] font-semibold tracking-tight text-foreground">
          {title}
        </h2>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function Callout({ symbol, children }: { symbol: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 flex gap-3 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3.5">
      <span className="mt-px flex size-[18px] flex-none items-center justify-center rounded-full border-[1.5px] border-accent text-[11px] font-bold text-accent">
        {symbol}
      </span>
      <p className="m-0 text-[13px] leading-[1.5] text-muted-foreground">{children}</p>
    </div>
  );
}

function FunnelTrack({
  name,
  note,
  verified,
  excluded,
}: {
  name: string;
  note: string;
  verified: number;
  excluded: number;
}) {
  const total = verified + excluded;
  const pct = (verified / total) * 100;
  return (
    <div className="mt-5">
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-[13px] font-semibold">
          {name} <span className="font-normal text-muted-foreground">· {total}</span>
        </span>
        <span className="text-[11.5px] text-muted-foreground">{note}</span>
      </div>
      <div className="flex h-7 overflow-hidden rounded-md border border-border">
        <div
          className="flex items-center justify-end pr-2 text-[11px] font-bold tabular-nums text-white"
          style={{ width: `${pct}%`, background: "var(--accent)" }}
        >
          {verified}
        </div>
        <div
          className="flex items-center justify-start pl-2 text-[11px] font-bold tabular-nums text-foreground/70"
          style={{ width: `${100 - pct}%`, background: "#C3C8D0" }}
        >
          {excluded}
        </div>
      </div>
    </div>
  );
}

function ResultTile({ n, unit, note }: { n: string; unit: string; note: string }) {
  return (
    <div className="rounded-xl border border-border bg-secondary/50 p-5">
      <div className="font-display text-[28px] font-bold leading-none tabular-nums text-accent">
        {n}
      </div>
      <div className="mt-2 text-[13.5px] font-semibold">{unit}</div>
      <div className="mt-1 text-[12.5px] leading-[1.5] text-muted-foreground">{note}</div>
    </div>
  );
}
