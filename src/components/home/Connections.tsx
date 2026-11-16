/* Ported from docs/homepage-handoff/design/homepage.dc.html. Values are the design's own; colours and fonts are the --mf-* tokens in styles.css. */
import { Fragment } from "react";
import type { HomeVals } from "./home-logic";

export function Connections({ v }: { v: HomeVals }) {
  return (
    <section
      className="mf-pad mf-conn"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "112px 32px",
        display: "flex",
        gap: "72px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <div
        style={{
          flex: "1 1 400px",
          minWidth: "0",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <h2
          className="mf-h2"
          style={{
            margin: "0",
            fontFamily: "var(--mf-display)",
            fontSize: "54px",
            lineHeight: "1.1",
            fontWeight: "400",
            letterSpacing: "-0.8px",
          }}
        >
          {"Connect what you already use. Switch nothing."}
        </h2>
        <p style={{ margin: "0", fontSize: "18px", lineHeight: "1.55", color: "var(--mf-steel)" }}>
          {
            "Every connector is included. Outlook connects with one sign-in, and the agent works from the inbox, load boards and phone you already have."
          }
        </p>
      </div>
      <div
        role="group"
        aria-label="Connections"
        style={{
          flex: "1 1 420px",
          minWidth: "0",
          background: "var(--mf-white)",
          border: "1px solid var(--mf-line)",
          borderRadius: "20px",
          padding: "10px 22px",
          boxShadow: "0 20px 40px rgba(26,28,30,0.06)",
        }}
      >
        {v.conns.map((c, i) => (
          <Fragment key={i}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                padding: "12px 0",
                borderBottom: "1px solid #F0EDE5",
              }}
            >
              <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                <span style={{ fontSize: "17px", fontWeight: "600" }}>{c.name}</span>
                <span style={{ fontSize: "14px", color: "var(--mf-steel)" }}>{c.what}</span>
              </span>
              <button
                type="button"
                role="switch"
                className="mf-switch"
                aria-checked={c.on}
                aria-label={c.name}
                onClick={c.toggle}
              >
                <span />
              </button>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
