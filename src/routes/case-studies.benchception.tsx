import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteNav, SolidBackground, SiteFooter } from "@/components/site-chrome";

export const Route = createFileRoute("/case-studies/benchception")({
  head: () => ({
    meta: [
      { title: "Benchception — Transpira" },
      { name: "description", content: "Benchception makes environment-authoring the thing under test: frontier models compete not by answering, but by teaching. A held-out Supply Chain Bench decides who built the better RL environment." },
      { property: "og:title", content: "Benchception — Transpira" },
      { property: "og:description", content: "Which frontier model is best at building RL environments? Benchception makes authoring the thing under test." },
    ],
  }),
  component: BenchceptionPage,
});

// Cool, neutral diagram palette pulled toward the ecosystem's cobalt accent.
const ACCENT = "var(--accent)";
const NEUTRAL = "#C3C8D0";
const ACTIVE_SHADOW = "0 8px 22px -12px rgba(20, 24, 32, 0.35)";

// Which diagram nodes light up at each pipeline step (0 = show everything).
const STAGES: Record<number, string[]> = {
  1: ["build", "spec"],
  2: ["spec", "opus", "gpt", "envO", "envG"],
  3: ["envO", "envG", "qO", "qBase", "qG"],
  4: ["qO", "qBase", "qG", "arena", "result"],
};

const STEPS = [
  {
    n: "01",
    title: "Capture the spec",
    body:
      "In Build, we drag & drop blocks to write a plain-language description meant to help a model rebuild Supply Chain Bench. Each model sees only this description, never the env.",
  },
  {
    n: "02",
    title: "Two authors build environments",
    body: "Claude Opus 4.8 and GPT-5.5 each turn the spec into a full RL environment on HUD.",
  },
  {
    n: "03",
    title: "Train the students",
    body:
      "Each author trains a Qwen-8B on the environment it generated. A third Qwen-8B stays untrained as a baseline.",
  },
  {
    n: "04",
    title: "Three-way contest on Golden Bench",
    body:
      "All three Qwens face the held-out Supply Chain Bench. The strongest student would reveal who authored the better environment.",
  },
];

function BenchceptionPage() {
  const [active, setActive] = useState(0);
  const toggle = (s: number) => setActive((cur) => (cur === s ? 0 : s));

  const nodeOn = (id: string) => active === 0 || STAGES[active]?.includes(id);
  const nodeStyle = (id: string): React.CSSProperties => {
    const on = nodeOn(id);
    return {
      opacity: on ? 1 : 0.28,
      borderColor: active !== 0 && on ? ACCENT : undefined,
      boxShadow: active !== 0 && on ? ACTIVE_SHADOW : "none",
      transition: "0.3s",
    };
  };
  const conn = (stage: number): React.CSSProperties => ({
    fill: "none",
    stroke: active === stage ? ACCENT : NEUTRAL,
    strokeOpacity: active === 0 || active === stage ? 1 : 0.18,
    strokeWidth: 2,
    transition: "0.3s",
  });

  return (
    <>
      <SolidBackground />
      <main className="relative z-10 text-foreground">
        <SiteNav />

        {/* HERO / SPLIT ----------------------------------------------------- */}
        <section className="mx-auto max-w-[1280px] px-6 pb-2 pt-28 sm:px-8">
          <Link to="/case-studies" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition">
            ← All case studies
          </Link>
          <div className="mt-8 flex flex-wrap items-start gap-x-14 gap-y-12">
            {/* NARRATIVE */}
            <div className="min-w-[340px] flex-[1_1_380px] pt-1.5">
              <div className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                <span className="h-px w-[18px] bg-accent" />
                Case study · Internal R&amp;D
              </div>
              <h1 className="mt-[18px] font-display text-[clamp(36px,4.4vw,58px)] font-bold leading-[0.98] tracking-[-0.02em]">
                Benchception
              </h1>
              <p className="mt-5 max-w-[30em] text-[20px] leading-[1.5] text-foreground/80">
                Every RL environment is itself a task, so which frontier model is best at <em>building</em> them?
                Benchception makes environment-authoring the thing under test: models compete not by answering, but by
                teaching.
              </p>
              <p className="mt-3.5 max-w-[32em] text-sm leading-[1.55] text-muted-foreground">
                For this demo, our golden environment is{" "}
                <a
                  href="https://arxiv.org/pdf/2602.07342"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-2"
                >
                  Supply Chain Bench
                </a>{" "}
                (
                <a
                  href="https://github.com/Damon-GSY/SC-bench"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-2"
                >
                  code
                </a>
                ), a HUD benchmark we hold out from every model.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3">
                <Stat label="Golden env" value="Supply Chain Bench" />
                <Stat label="Authors" value="Opus 4.8 · GPT-5.5" />
                <Stat label="Student" value="Qwen-8B" />
              </div>

              {/* STEPPER */}
              <div className="mb-3.5 mt-8 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Walk the pipeline
                </span>
                <button
                  onClick={() => setActive(0)}
                  className="text-[11px] font-medium uppercase tracking-[0.08em] text-accent transition hover:brightness-110"
                >
                  Show all
                </button>
              </div>

              <div className="flex flex-col gap-2.5">
                {STEPS.map((step, i) => {
                  const s = i + 1;
                  const on = active === s;
                  return (
                    <button
                      key={step.n}
                      onClick={() => toggle(s)}
                      className={`flex gap-3.5 rounded-lg border p-4 text-left transition ${
                        on ? "border-accent bg-accent/10" : "border-border bg-card hover:border-accent/40"
                      }`}
                    >
                      <span
                        className={`flex size-[30px] flex-none items-center justify-center rounded-md border text-[13px] font-bold ${
                          on ? "border-accent text-accent" : "border-border text-muted-foreground"
                        }`}
                      >
                        {step.n}
                      </span>
                      <span>
                        <span className="mb-1 block text-sm font-semibold">{step.title}</span>
                        <span className="block text-[13px] leading-[1.45] text-muted-foreground">{step.body}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <Callout symbol="!">
                <strong className="text-foreground">No contamination.</strong> The golden environment is never shown to
                either author or student during authoring or training; it is revealed only at evaluation. Models can&apos;t
                memorize the test, only learn to teach.
              </Callout>
            </div>

            {/* DIAGRAM */}
            <div className="min-w-[440px] flex-[0_1_600px] self-stretch">
              <div className="mb-2.5 flex items-baseline justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Architecture
                </span>
                <div className="flex gap-3.5 text-[10px] uppercase tracking-[0.04em] text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-[9px] rounded-sm border border-border bg-card" />
                    pipeline
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-[9px] rounded-sm border" style={{ background: "#E6ECFF", borderColor: ACCENT }} />
                    golden bench
                  </span>
                </div>
              </div>

              <div
                className="relative w-full rounded-xl border border-border"
                style={{ aspectRatio: "600 / 880", background: "#F6F7F9" }}
              >
                <svg viewBox="0 0 600 880" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full">
                  <defs>
                    <marker id="bcArw" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
                      <path d="M0,0 L6,3 L0,6 Z" fill="context-stroke" />
                    </marker>
                  </defs>
                  <path d="M300,100 L300,150" style={conn(1)} markerEnd="url(#bcArw)" />
                  <path d="M300,228 C300,242 150,234 150,248" style={conn(2)} markerEnd="url(#bcArw)" />
                  <path d="M300,228 C300,242 450,234 450,248" style={conn(2)} markerEnd="url(#bcArw)" />
                  <path d="M150,334 L150,378" style={conn(2)} markerEnd="url(#bcArw)" />
                  <path d="M450,334 L450,378" style={conn(2)} markerEnd="url(#bcArw)" />
                  <path d="M150,456 C150,480 108,482 108,502" style={conn(3)} markerEnd="url(#bcArw)" />
                  <path d="M450,456 C450,480 492,482 492,502" style={conn(3)} markerEnd="url(#bcArw)" />
                  <path d="M108,590 C108,624 220,636 248,650" style={conn(4)} markerEnd="url(#bcArw)" />
                  <path d="M300,590 L300,650" style={conn(4)} markerEnd="url(#bcArw)" />
                  <path d="M492,590 C492,624 380,636 352,650" style={conn(4)} markerEnd="url(#bcArw)" />
                  <path d="M300,744 L300,788" style={conn(4)} markerEnd="url(#bcArw)" />
                </svg>

                <DiagNode pos={{ left: "31.667%", top: "2.273%", width: "36.667%", height: "9.091%" }} style={nodeStyle("build")}>
                  <NodeKicker>In-house · Build</NodeKicker>
                  <NodeTitle>Drag &amp; drop blocks</NodeTitle>
                  <NodeSub>describe the task to rebuild the env</NodeSub>
                </DiagNode>

                <DiagNode pos={{ left: "30.833%", top: "17.045%", width: "38.333%", height: "8.864%" }} style={nodeStyle("spec")}>
                  <NodeKicker>Extracted</NodeKicker>
                  <NodeTitle>Environment spec</NodeTitle>
                  <NodeSub>plain-language description (IR)</NodeSub>
                </DiagNode>

                <DiagNode pos={{ left: "7.333%", top: "28.182%", width: "35.333%", height: "9.773%" }} style={nodeStyle("opus")}>
                  <NodeKicker>Author A</NodeKicker>
                  <NodeTitle>Claude Opus 4.8</NodeTitle>
                  <NodeSub>generates an environment</NodeSub>
                </DiagNode>
                <DiagNode pos={{ left: "57.333%", top: "28.182%", width: "35.333%", height: "9.773%" }} style={nodeStyle("gpt")}>
                  <NodeKicker>Author B</NodeKicker>
                  <NodeTitle>GPT-5.5</NodeTitle>
                  <NodeSub>generates an environment</NodeSub>
                </DiagNode>

                <DiagNode pos={{ left: "7.333%", top: "42.955%", width: "35.333%", height: "8.864%" }} style={nodeStyle("envO")}>
                  <NodeKicker>Generated</NodeKicker>
                  <NodeTitle>Env by Opus</NodeTitle>
                </DiagNode>
                <DiagNode pos={{ left: "57.333%", top: "42.955%", width: "35.333%", height: "8.864%" }} style={nodeStyle("envG")}>
                  <NodeKicker>Generated</NodeKicker>
                  <NodeTitle>Env by GPT</NodeTitle>
                </DiagNode>

                <DiagNode pos={{ left: "3%", top: "57.045%", width: "30%", height: "10%" }} style={nodeStyle("qO")}>
                  <NodeKicker>Student</NodeKicker>
                  <NodeTitle className="text-[14px] font-bold">Qwen-8B</NodeTitle>
                  <NodeSub>trained · Opus env</NodeSub>
                </DiagNode>
                <DiagNode pos={{ left: "35%", top: "57.045%", width: "30%", height: "10%" }} style={nodeStyle("qBase")} dashed bg="#F1F3F7">
                  <NodeKicker>Baseline</NodeKicker>
                  <NodeTitle className="text-[14px] font-bold">Qwen-8B</NodeTitle>
                  <NodeSub>untrained</NodeSub>
                </DiagNode>
                <DiagNode pos={{ left: "67%", top: "57.045%", width: "30%", height: "10%" }} style={nodeStyle("qG")}>
                  <NodeKicker>Student</NodeKicker>
                  <NodeTitle className="text-[14px] font-bold">Qwen-8B</NodeTitle>
                  <NodeSub>trained · GPT env</NodeSub>
                </DiagNode>

                <div
                  className="absolute flex flex-col justify-center rounded-md border px-4"
                  style={{
                    left: "25%",
                    top: "73.864%",
                    width: "50%",
                    height: "10.682%",
                    background: "#E6ECFF",
                    borderWidth: 1.5,
                    borderColor: ACCENT,
                    opacity: nodeOn("arena") ? 1 : 0.28,
                    boxShadow: active !== 0 && nodeOn("arena") ? ACTIVE_SHADOW : "none",
                    transition: "0.3s",
                  }}
                >
                  <div className="text-[9.5px] font-bold uppercase tracking-[0.13em] text-accent">Held-out evaluation</div>
                  <div className="text-[15px] font-bold">Three-Way Contest on Golden Bench</div>
                  <div className="text-[11.5px] text-muted-foreground">all three play the held-out Supply Chain Bench</div>
                </div>

                <div
                  className="absolute flex items-center justify-center px-3.5 text-center"
                  style={{
                    left: "20%",
                    top: "89.545%",
                    width: "60%",
                    height: "7.955%",
                    opacity: nodeOn("result") ? 1 : 0.28,
                    transition: "0.3s",
                  }}
                >
                  <div className="text-[13px] font-semibold text-foreground">
                    Winning student ⇒ the model that authored the better environment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RESULTS / LEADERBOARD ------------------------------------------- */}
        <section className="mt-16 border-y border-border bg-muted">
          <div className="mx-auto max-w-[1280px] px-6 py-16 sm:px-8">
            <div className="flex flex-wrap items-start gap-x-14 gap-y-10">
              <div className="min-w-[320px] flex-[1_1_360px]">
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">Results</div>
                <h2 className="font-display text-[36px] font-bold leading-[1.05] tracking-[-0.015em]">All three students tied</h2>
                <p className="mt-[18px] max-w-[32em] text-[18px] leading-[1.55] text-foreground/80">
                  We ran the full pipeline end to end: both authors generated environments, both trained a Qwen-8B, and
                  all three students played the held-out Supply Chain Bench. They finished in a dead heat.
                </p>
                <p className="mt-4 max-w-[32em] text-[14.5px] leading-[1.6] text-muted-foreground">
                  When we looked closer, the environments the models authored were low-quality and, honestly, a little
                  sloppy, so neither trained student learned much the untrained baseline didn&apos;t already know.
                </p>
                <Callout symbol="✓">
                  <strong className="text-foreground">The tie is the signal.</strong> A flat leaderboard isn&apos;t a
                  broken experiment; it is evidence that authoring a good RL environment is genuinely hard. The models
                  fail for a valid reason, which is exactly what a strong benchmark should expose.
                </Callout>
              </div>

              <div className="min-w-[360px] flex-[1_1_440px] rounded-xl border border-border bg-card px-7 py-6">
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Leaderboard</span>
                  <span className="text-[11px] text-muted-foreground">Supply Chain Bench · success rate</span>
                </div>
                <LeaderRow rank="T-1" label="Qwen-8B · untrained baseline" pct={45} tone="neutral" first />
                <LeaderRow rank="T-1" label="Qwen-8B · trained on Opus env" pct={45} tone="accent" />
                <LeaderRow rank="T-1" label="Qwen-8B · trained on GPT env" pct={44} tone="accent" last />
                <div className="mt-4 text-[11.5px] leading-[1.5] text-muted-foreground">
                  Tied within noise (±2% across seeds). Neither trained student shows a reliable lift over the untrained
                  baseline.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOCKS → SPEC --------------------------------------------------- */}
        <section className="mx-auto max-w-[1280px] px-6 py-16 sm:px-8">
          <div className="flex flex-wrap items-start gap-x-14 gap-y-10">
            <div className="min-w-[340px] flex-[1_1_420px]">
              <div className="mb-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                How we built the environments in-house
              </div>
              <h2 className="font-display text-[36px] font-bold leading-[1.05] tracking-[-0.015em]">From blocks to a spec</h2>
              <p className="mt-[18px] max-w-[34em] text-[18px] leading-[1.55] text-foreground/80">
                Build is a Scratch-style canvas. We drag four kinds of blocks out of the tray (
                <strong>Environment, Tool, Task, Train</strong>), snap detail blocks into them, and describe each in plain
                language. The blocks form a recursive tree that the builder projects into a plain-language description,
                written to help a model rebuild Supply Chain Bench. That description, not code or JSON, is the only thing
                each model receives.
              </p>
              <div className="mt-6 flex flex-wrap gap-6">
                <MiniNote label="Why blocks">
                  No-code authoring keeps the spec consistent and human-auditable across every environment we test.
                </MiniNote>
                <MiniNote label="What ships">
                  A clean description object: the same input given to Opus 4.8 and GPT-5.5, identically.
                </MiniNote>
              </div>
            </div>

            {/* block mock */}
            <div className="min-w-[360px] flex-[0_1_460px] rounded-xl border border-border bg-card p-6">
              <div className="mb-3.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Build · canvas</div>
              <div className="flex flex-col gap-2.5">
                <MockBlock kind="Environment" color="#3F4654">
                  a supply-chain operator working a live order queue…
                </MockBlock>
                <MockBlock kind="Tool" color="#3C6E7A" indent>
                  check_inventory(sku) → units on hand
                </MockBlock>
                <MockBlock kind="Task" color="var(--accent)">
                  fulfil the backlog without stocking out…
                </MockBlock>
                <MockBlock kind="Train" color="#4F7A4A">
                  algorithm: auto · reward from rubric
                </MockBlock>
              </div>
              <div className="my-4 flex items-center gap-2.5 px-0.5 text-muted-foreground">
                <span className="h-px flex-1 bg-border" />
                <span className="text-[10px] uppercase tracking-[0.14em]">extract description</span>
                <span className="text-sm">↓</span>
              </div>
              <div className="rounded-md p-4 text-[13.5px] leading-[1.55]" style={{ background: "#171A21", color: "#D7DCE3" }}>
                <span className="mb-[7px] block font-display text-[9px] uppercase tracking-[0.16em]" style={{ color: "#9DB0FF" }}>
                  spec handed to the models
                </span>
                &quot;Build an RL environment where an agent operates a supply chain: it queries inventory and supplier
                tools to clear an order backlog, scored by fill-rate without stock-outs. Train a policy to maximize the
                rubric reward.&quot;
              </div>
            </div>
          </div>
        </section>

        {/* ROADMAP --------------------------------------------------------- */}
        <section className="border-y border-border bg-muted">
          <div className="mx-auto max-w-[1280px] px-6 py-16 sm:px-8">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-7">
              <div>
                <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">Roadmap</div>
                <h2 className="font-display text-[36px] font-bold leading-[1.05] tracking-[-0.015em]">How we&apos;d improve it</h2>
              </div>
              <p className="m-0 max-w-[30em] text-[17px] leading-[1.5] text-foreground/80">
                Because every environment is a task in itself, the breadth and integrity of the golden set is the whole
                experiment. We&apos;re really measuring how well models build HUD tasks.
              </p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-[18px]">
              <RoadmapCard n="01" title="Harden the golden set">
                Broaden and diversify the golden environments so no single benchmark can be gamed. Variety is the defense
                against contamination and overfitting.
              </RoadmapCard>
              <RoadmapCard n="02" title="Harnesses & visibility">
                Add inspection harnesses into the environments models generate, surfacing reward hacks and degenerate
                setups before any training run begins.
              </RoadmapCard>
              <RoadmapCard n="03" title="Paper → environment">
                An automated pipeline that turns any research paper into a golden environment on HUD, scaling the golden
                set far beyond what we can hand-author.
              </RoadmapCard>
              <RoadmapCard n="04" title="Human verification">
                Human-in-the-loop review on every generated golden environment, guaranteeing the dataset stays correct,
                fair, and trustworthy.
              </RoadmapCard>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[1280px] px-6 py-10 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-[11.5px] uppercase tracking-[0.06em] text-muted-foreground">
            <Link to="/case-studies" className="transition hover:text-foreground">← All case studies</Link>
            <span className="flex gap-[18px]">
              <a href="https://arxiv.org/pdf/2602.07342" target="_blank" rel="noopener noreferrer" className="transition hover:text-accent">Paper</a>
              <a href="https://github.com/Damon-GSY/SC-bench" target="_blank" rel="noopener noreferrer" className="transition hover:text-accent">SC-Bench code</a>
            </span>
          </div>
        </div>

        <SiteFooter />
      </main>
    </>
  );
}

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}

function Callout({ symbol, children }: { symbol: string; children: React.ReactNode }) {
  return (
    <div className="mt-[18px] flex gap-3 rounded-lg border border-accent/30 bg-accent/10 px-4 py-3.5">
      <span className="mt-px flex size-[18px] flex-none items-center justify-center rounded-full border-[1.5px] border-accent text-[11px] font-bold text-accent">
        {symbol}
      </span>
      <p className="m-0 text-[13px] leading-[1.5] text-muted-foreground">{children}</p>
    </div>
  );
}

function DiagNode({
  pos,
  style,
  children,
  dashed,
  bg = "#FFFFFF",
}: {
  pos: React.CSSProperties;
  style: React.CSSProperties;
  children: React.ReactNode;
  dashed?: boolean;
  bg?: string;
}) {
  return (
    <div
      className="absolute flex flex-col justify-center rounded-md px-3.5"
      style={{
        ...pos,
        background: bg,
        borderWidth: 1,
        borderStyle: dashed ? "dashed" : "solid",
        borderColor: "#D7DAE1",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function NodeKicker({ children }: { children: React.ReactNode }) {
  return <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{children}</div>;
}
function NodeTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`text-[15px] font-semibold ${className}`}>{children}</div>;
}
function NodeSub({ children }: { children: React.ReactNode }) {
  return <div className="text-[11.5px] text-muted-foreground">{children}</div>;
}

function LeaderRow({
  rank,
  label,
  pct,
  tone,
  last,
}: {
  rank: string;
  label: string;
  pct: number;
  tone: "neutral" | "accent";
  first?: boolean;
  last?: boolean;
}) {
  return (
    <div className={`flex items-center gap-4 border-t border-border/60 py-4 ${last ? "border-b" : ""}`}>
      <span className="w-[34px] flex-none text-[12px] font-bold tracking-[0.04em] text-muted-foreground">{rank}</span>
      <div className="min-w-0 flex-1">
        <div className="mb-[7px] flex items-baseline justify-between">
          <span className="text-[13.5px] font-semibold">{label}</span>
          <span className="text-sm font-bold tabular-nums">{pct}%</span>
        </div>
        <div className="h-2 rounded-sm border border-border bg-muted">
          <div className="h-full" style={{ width: `${pct}%`, background: tone === "accent" ? "var(--accent)" : NEUTRAL }} />
        </div>
      </div>
    </div>
  );
}

function MiniNote({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="max-w-[15em]">
      <div className="mb-1.5 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</div>
      <div className="text-[13.5px] leading-[1.5] text-muted-foreground">{children}</div>
    </div>
  );
}

function MockBlock({
  kind,
  color,
  indent,
  children,
}: {
  kind: string;
  color: string;
  indent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-md border border-border bg-card px-3 py-2.5 ${indent ? "ml-4" : ""}`}
      style={{ borderLeft: `5px solid ${color}` }}
    >
      <span
        className="w-[88px] flex-none whitespace-nowrap text-[9.5px] font-bold uppercase leading-[1.5] tracking-[0.08em]"
        style={{ color }}
      >
        {kind}
      </span>
      <span className="text-[12.5px] leading-[1.5] text-muted-foreground">{children}</span>
    </div>
  );
}

function RoadmapCard({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-3 text-[13px] font-bold text-accent">{n}</div>
      <h3 className="mb-2 text-[17px] font-semibold">{title}</h3>
      <p className="m-0 text-[13.5px] leading-[1.55] text-muted-foreground">{children}</p>
    </div>
  );
}
