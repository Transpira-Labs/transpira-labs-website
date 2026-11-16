/* Ported from docs/homepage-handoff/design/homepage.dc.html. Values are the design's own; colours and fonts are the --mf-* tokens in styles.css. */
import { Fragment } from "react";
import type { HomeVals } from "./home-logic";

export function Faq({ v }: { v: HomeVals }) {
  return (
    <section
      className="mf-pad"
      id="faq"
      style={{
        maxWidth: "820px",
        margin: "0 auto",
        padding: "112px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <h2
        className="mf-h2"
        style={{
          margin: "0",
          textAlign: "center",
          fontFamily: "var(--mf-display)",
          fontSize: "54px",
          lineHeight: "1.1",
          fontWeight: "400",
          letterSpacing: "-0.8px",
        }}
      >
        {"Questions brokers ask"}
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          borderTop: "1px solid var(--mf-line-strong)",
        }}
      >
        {v.faqs.map((f, i) => (
          <Fragment key={i}>
            <div style={{ borderBottom: "1px solid var(--mf-line-strong)" }}>
              <button
                type="button"
                onClick={f.toggle}
                aria-expanded={f.open}
                aria-controls={`mf-faq-${i}`}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "16px",
                  background: "transparent",
                  border: "0",
                  padding: "22px 0",
                  textAlign: "left",
                  cursor: "pointer",
                  fontFamily: "var(--mf-sans)",
                  fontSize: "19px",
                  fontWeight: "600",
                  color: "var(--mf-ink)",
                  minHeight: "44px",
                }}
              >
                {f.q}
                <span
                  aria-hidden="true"
                  style={{ fontSize: "24px", fontWeight: "400", color: "var(--mf-steel)" }}
                >
                  {f.sign}
                </span>
              </button>
              {f.open && (
                <>
                  <p
                    id={`mf-faq-${i}`}
                    style={{
                      margin: "0",
                      padding: "0 0 24px",
                      fontSize: "17px",
                      lineHeight: "1.6",
                      color: "var(--mf-ink-soft)",
                      maxWidth: "680px",
                    }}
                  >
                    {f.a}
                  </p>
                </>
              )}
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}
