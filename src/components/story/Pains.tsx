import type { CSSProperties, ReactNode } from "react";
import { ChannelLogo } from "./ChannelLogo";
import { InlineCall } from "./FloatingCall";

/*
 * The five ways a load goes wrong without help, each shown as the thing the
 * broker actually sees on their screen, with a few words underneath.
 */

const mono: CSSProperties = {
  fontFamily: "ui-monospace,Menlo,monospace",
  fontSize: "10.5px",
  letterSpacing: ".08em",
  textTransform: "uppercase",
};
const ios = "-apple-system,BlinkMacSystemFont,'Helvetica Neue',system-ui,sans-serif";
const RED = "#ff3b30";

function Screen({ bg = "#fff", children }: { bg?: string; children: ReactNode }) {
  return (
    <div
      style={{
        height: "150px",
        borderRadius: "12px",
        background: bg,
        color: "#1c1c1e",
        overflow: "hidden",
        fontFamily: ios,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </div>
  );
}

/* 01 · The quote: the reply that came too late. */
function Quote() {
  return (
    <Screen>
      <div
        style={{ padding: "12px", display: "flex", flexDirection: "column", gap: "6px", flex: "1" }}
      >
        <div style={{ alignSelf: "center", fontSize: "10.5px", color: "#8e8e93" }}>Mon 8:05 AM</div>
        <div style={bubble("#e9e9eb", "#000", "flex-start")}>What would it cost?</div>
        <div style={{ alignSelf: "center", fontSize: "10.5px", color: RED, fontWeight: "600" }}>
          31 hours later
        </div>
        <div style={bubble("#e9e9eb", "#000", "flex-start")}>Never mind, we found a truck.</div>
      </div>
    </Screen>
  );
}

/* 02 · The phone: one posting, forty missed calls. */
function Phone() {
  const rows = ["Unknown · Georgia", "(912) 555-0114", "(478) 555-0182"];
  return (
    <Screen>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 12px 6px",
        }}
      >
        <span style={{ fontSize: "15px", fontWeight: "700" }}>Recents</span>
        <span
          style={{
            background: RED,
            color: "#fff",
            borderRadius: "10px",
            padding: "1px 8px",
            fontSize: "12px",
            fontWeight: "700",
            animation: "ms-pulse 1.4s ease-in-out infinite",
          }}
        >
          40
        </span>
      </div>
      {rows.map((r) => (
        <div
          key={r}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "6px 12px",
            borderTop: ".5px solid #e5e5ea",
            fontSize: "12.5px",
          }}
        >
          <span style={{ color: RED, fontWeight: "600" }}>{r}</span>
          <span style={{ color: "#8e8e93" }}>Missed</span>
        </div>
      ))}
    </Screen>
  );
}

/* 03 · The COI: the rate con, sitting in spam. */
function Spam() {
  return (
    <Screen>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "10px 12px",
          borderBottom: "1px solid #eee",
        }}
      >
        <ChannelLogo channel="Gmail" size={18} />
        <span style={{ fontSize: "13px", fontWeight: "700", fontFamily: "Arial,sans-serif" }}>
          Spam
        </span>
        <span style={{ marginLeft: "auto", fontSize: "12px", color: "#5f6368" }}>302</span>
      </div>
      {[
        ["Rate con L-2044", true],
        ["Certificate of insurance", true],
        ["You won a free cruise!!", false],
      ].map(([t, hot]) => (
        <div
          key={t as string}
          style={{
            padding: "7px 12px",
            fontSize: "12.5px",
            fontFamily: "Arial,sans-serif",
            fontWeight: hot ? "700" : "400",
            color: hot ? "#202124" : "#9aa0a6",
            background: hot ? "#fce8e6" : "transparent",
            borderBottom: "1px solid #f1f3f4",
          }}
        >
          {t}
        </div>
      ))}
    </Screen>
  );
}

/* 04 · The weight: posted one number, the plate said another. */
function Weight() {
  const row = (k: string, v: string, bad?: boolean) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "7px 0",
        borderBottom: ".5px solid #e5e5ea",
        fontSize: "13px",
      }}
    >
      <span style={{ color: "#6c6c70" }}>{k}</span>
      <span style={{ fontWeight: "700", color: bad ? RED : "#1c1c1e" }}>{v}</span>
    </div>
  );
  return (
    <Screen>
      <div style={{ padding: "8px 12px", display: "flex", flexDirection: "column" }}>
        {row("Posted", "11,000 lb")}
        {row("Data plate", "14,200 lb", true)}
        <div
          style={{
            marginTop: "10px",
            alignSelf: "center",
            border: `2px solid ${RED}`,
            color: RED,
            borderRadius: "6px",
            padding: "4px 10px",
            fontSize: "13px",
            fontWeight: "800",
            transform: "rotate(-4deg)",
          }}
        >
          DRY RUN FEE $150
        </div>
      </div>
    </Screen>
  );
}

/* 05 · The payment: an invoice that never got chased. */
function Invoice() {
  return (
    <Screen>
      <div
        style={{
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          position: "relative",
          flex: "1",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "12px",
            color: "#6c6c70",
          }}
        >
          <span>Invoice 1042</span>
          <span>Due Oct 12</span>
        </div>
        <div style={{ fontSize: "24px", fontWeight: "700", letterSpacing: "-.02em" }}>$1,850</div>
        <div style={{ height: "6px", borderRadius: "3px", background: "#eef1f0" }} />
        <div style={{ height: "6px", width: "70%", borderRadius: "3px", background: "#eef1f0" }} />
        <div
          style={{
            position: "absolute",
            right: "10px",
            bottom: "14px",
            border: `2px solid ${RED}`,
            color: RED,
            borderRadius: "6px",
            padding: "3px 8px",
            fontSize: "12px",
            fontWeight: "800",
            transform: "rotate(-8deg)",
          }}
        >
          OVERDUE
        </div>
      </div>
    </Screen>
  );
}

function bubble(bg: string, fg: string, side: "flex-start" | "flex-end"): CSSProperties {
  return {
    alignSelf: side,
    maxWidth: "85%",
    background: bg,
    color: fg,
    borderRadius: "16px",
    padding: "6px 11px",
    fontSize: "13px",
    lineHeight: "1.3",
  };
}

const PAINS: { n: string; stage: string; title: string; art: ReactNode; cost: string }[] = [
  { n: "01", stage: "Quoting", title: "The quote.", art: <Quote />, cost: "Too slow. Load lost." },
  {
    n: "02",
    stage: "Covering",
    title: "The phone.",
    art: <Phone />,
    cost: "40 calls, one posting.",
  },
  { n: "03", stage: "Paperwork", title: "The COI.", art: <Spam />, cost: "In spam. Truck gone." },
  { n: "04", stage: "Pickup", title: "The weight.", art: <Weight />, cost: "Nobody asked." },
  {
    n: "05",
    stage: "Getting paid",
    title: "The payment.",
    art: <Invoice />,
    cost: "Never chased.",
  },
];

export function Pains() {
  return (
    <section
      data-screen-label="Pains"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "clamp(20px,3vw,32px)",
        padding: "clamp(56px,8vw,96px) clamp(16px,4vw,48px)",
        borderTop: "1px solid rgba(255,255,255,.08)",
      }}
    >
      <h2
        style={{
          margin: "0",
          textAlign: "center",
          fontSize: "clamp(2rem,5vw,4rem)",
          fontWeight: "600",
          letterSpacing: "-.03em",
          lineHeight: "1.05",
        }}
      >
        Sound <span style={{ color: "#d2ad5e" }}>familiar?</span>
      </h2>
      <div className="ms-pain-grid" style={{ width: "100%", maxWidth: "1240px" }}>
        {PAINS.map((p) => (
          <div
            key={p.n}
            className="ms-pain-card"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,.12)",
              background: "rgba(255,255,255,.03)",
              padding: "16px",
            }}
          >
            <div style={{ ...mono, color: "#d48a70" }}>
              {p.n} · {p.stage}
            </div>
            <div style={{ fontSize: "22px", fontWeight: "600", letterSpacing: "-.02em" }}>
              {p.title}
            </div>
            {p.art}
            <div style={{ fontSize: "15px", fontWeight: "600", color: "#d2ad5e" }}>{p.cost}</div>
          </div>
        ))}
      </div>
      <InlineCall where="pains" />
    </section>
  );
}
