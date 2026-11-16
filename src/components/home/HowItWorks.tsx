/* Ported from docs/homepage-handoff/design/homepage.dc.html. Values are the design's own; colours and fonts are the --mf-* tokens in styles.css. */
import { Fragment } from "react";
import type { HomeVals } from "./home-logic";

export function HowItWorks({ v }: { v: HomeVals }) {
  return (
    <section
      id="how"
      style={{
        background: "var(--mf-white)",
        borderTop: "1px solid var(--mf-line)",
        borderBottom: "1px solid var(--mf-line)",
      }}
    >
      <div
        className="mf-pad"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "112px 32px",
          display: "flex",
          flexDirection: "column",
          gap: "56px",
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
          {"How Manifest works"}
        </h2>
        <div
          className="mf-how"
          style={{ display: "flex", gap: "64px", flexWrap: "wrap", alignItems: "flex-start" }}
        >
          <ol
            style={{
              flex: "1 1 440px",
              minWidth: "0",
              margin: "0",
              padding: "0",
              listStyle: "none",
              position: "relative",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "21px",
                top: "24px",
                bottom: "24px",
                borderLeft: "3px dashed var(--mf-road)",
              }}
            ></div>
            {v.steps.map((st, i) => (
              <Fragment key={i}>
                <li style={{ position: "relative", padding: "4px 0 28px" }}>
                  {st.active && (
                    <>
                      <button
                        type="button"
                        onClick={st.pick}
                        aria-current="step"
                        aria-expanded={true}
                        style={{
                          display: "flex",
                          gap: "20px",
                          alignItems: "flex-start",
                          background: "transparent",
                          border: "0",
                          padding: "0",
                          textAlign: "left",
                          cursor: "pointer",
                          fontFamily: "var(--mf-sans)",
                          color: "var(--mf-ink)",
                        }}
                      >
                        <span
                          style={{
                            flexShrink: "0",
                            width: "46px",
                            height: "46px",
                            borderRadius: "12px",
                            background: "var(--mf-amber)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "var(--mf-mono)",
                            fontSize: "15px",
                            fontWeight: "600",
                          }}
                        >
                          {st.num}
                        </span>
                        <span
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "6px",
                            paddingTop: "6px",
                          }}
                        >
                          <span style={{ fontFamily: "var(--mf-display)", fontSize: "26px" }}>
                            {st.title}
                          </span>
                          <span
                            style={{
                              fontSize: "17px",
                              lineHeight: "1.55",
                              color: "var(--mf-ink-soft)",
                            }}
                          >
                            {st.body}
                          </span>
                        </span>
                      </button>
                    </>
                  )}
                  {st.inactive && (
                    <>
                      <button
                        type="button"
                        onClick={st.pick}
                        style={{
                          display: "flex",
                          gap: "20px",
                          alignItems: "center",
                          background: "transparent",
                          border: "0",
                          padding: "0",
                          textAlign: "left",
                          cursor: "pointer",
                          fontFamily: "var(--mf-sans)",
                          color: "var(--mf-steel-light)",
                          minHeight: "46px",
                        }}
                      >
                        <span
                          style={{
                            flexShrink: "0",
                            width: "46px",
                            height: "46px",
                            borderRadius: "12px",
                            background: "#F3EEE1",
                            border: "1px solid var(--mf-road)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "var(--mf-mono)",
                            fontSize: "15px",
                            fontWeight: "600",
                            color: "var(--mf-amber-deep)",
                          }}
                        >
                          {st.num}
                        </span>
                        <span style={{ fontFamily: "var(--mf-display)", fontSize: "24px" }}>
                          {st.title}
                        </span>
                      </button>
                    </>
                  )}
                </li>
              </Fragment>
            ))}
          </ol>
          <div
            className="mf-log"
            aria-live="polite"
            style={{
              flex: "1 1 420px",
              minWidth: "0",
              background: "var(--mf-paper)",
              border: "1px solid var(--mf-line)",
              borderRadius: "20px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              gap: "18px",
            }}
          >
            <p
              style={{
                margin: "0",
                fontFamily: "var(--mf-mono)",
                fontSize: "12px",
                fontWeight: "600",
                color: "var(--mf-steel)",
              }}
            >
              {v.panel.label}
            </p>
            {v.panel.lines.map((ln, i) => (
              <Fragment key={i}>
                <div
                  style={{
                    display: "flex",
                    gap: "16px",
                    alignItems: "baseline",
                    padding: "14px 0",
                    borderBottom: "1px solid var(--mf-line)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mf-mono)",
                      fontSize: "13px",
                      color: "var(--mf-amber-deep)",
                      width: "64px",
                      flexShrink: "0",
                    }}
                  >
                    {ln.t}
                  </span>
                  <span style={{ fontSize: "17px", lineHeight: "1.45" }}>{ln.x}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
