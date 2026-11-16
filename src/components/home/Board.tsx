/* Ported from docs/homepage-handoff/design/homepage.dc.html. Values are the design's own; colours and fonts are the --mf-* tokens in styles.css. */
/* TODO(before launch): the loads and activity times on this board are illustrative. */

export function Board() {
  return (
    <section
      className="mf-pad"
      id="board"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "112px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "48px",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
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
            maxWidth: "640px",
          }}
        >
          {"Behind the texts, one board"}
        </h2>
        <p
          style={{
            margin: "0",
            fontSize: "18px",
            lineHeight: "1.55",
            color: "var(--mf-steel)",
            maxWidth: "440px",
          }}
        >
          {
            "You run the day from your phone. When you want the detail, every load is on one board, kept current by the agent."
          }
        </p>
      </div>
      <div
        style={{
          background: "var(--mf-white)",
          border: "1px solid var(--mf-line-strong)",
          borderRadius: "14px",
          boxShadow: "0 30px 60px rgba(26,28,30,0.12)",
          overflow: "hidden",
          textAlign: "left",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            padding: "12px 16px",
            background: "var(--mf-ink)",
            color: "#C9CBD6",
            fontFamily: "var(--mf-mono)",
            fontSize: "12px",
          }}
        >
          <span aria-hidden="true" style={{ display: "flex", gap: "6px" }}>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "999px",
                background: "#4A4F55",
              }}
            ></span>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "999px",
                background: "#4A4F55",
              }}
            ></span>
            <span
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "999px",
                background: "#4A4F55",
              }}
            ></span>
          </span>
          <span style={{ flex: "1", textAlign: "center" }}>{"app.manifest.link/ops"}</span>
          <span style={{ color: "var(--mf-amber)" }}>{"● Live"}</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <div className="mf-board" style={{ minWidth: "900px", display: "flex" }}>
            <div
              style={{
                flex: "1",
                padding: "18px",
                display: "grid",
                gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
                gap: "10px",
                background: "var(--mf-paper)",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p
                  style={{
                    margin: "0",
                    fontFamily: "var(--mf-mono)",
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "var(--mf-steel)",
                  }}
                >
                  {"QUOTING"}
                </p>
                <div
                  style={{
                    background: "var(--mf-white)",
                    border: "1px solid var(--mf-line)",
                    borderRadius: "8px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                    boxShadow: "inset 0 3px 0 var(--mf-amber)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mf-mono)",
                      fontSize: "11px",
                      color: "var(--mf-amber-deep)",
                    }}
                  >
                    {"L-2047 · NEEDS YOU"}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>{"John Deere 5075E"}</span>
                  <span style={{ fontSize: "13px", color: "var(--mf-steel)" }}>
                    {"Athens → Charlotte"}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p
                  style={{
                    margin: "0",
                    fontFamily: "var(--mf-mono)",
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "var(--mf-steel)",
                  }}
                >
                  {"FINDING A TRUCK"}
                </p>
                <div
                  style={{
                    background: "var(--mf-white)",
                    border: "1px solid var(--mf-line)",
                    borderRadius: "8px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mf-mono)",
                      fontSize: "11px",
                      color: "var(--mf-steel)",
                    }}
                  >
                    {"L-2041 · 2 BIDS"}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>{"Kubota tractor"}</span>
                  <span style={{ fontSize: "13px", color: "var(--mf-steel)" }}>
                    {"Macon → Raleigh"}
                  </span>
                </div>
                <div
                  style={{
                    background: "var(--mf-white)",
                    border: "1px solid var(--mf-line)",
                    borderRadius: "8px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mf-mono)",
                      fontSize: "11px",
                      color: "var(--mf-steel)",
                    }}
                  >
                    {"L-2038"}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>{"Ford Expedition"}</span>
                  <span style={{ fontSize: "13px", color: "var(--mf-steel)" }}>
                    {"Houston → Little Rock"}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p
                  style={{
                    margin: "0",
                    fontFamily: "var(--mf-mono)",
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "var(--mf-steel)",
                  }}
                >
                  {"BOOKED"}
                </p>
                <div
                  style={{
                    background: "var(--mf-white)",
                    border: "1px solid var(--mf-line)",
                    borderRadius: "8px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mf-mono)",
                      fontSize: "11px",
                      color: "var(--mf-steel)",
                    }}
                  >
                    {"L-2044 · DOCS 4/5"}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>{"Bobcat S650"}</span>
                  <span style={{ fontSize: "13px", color: "var(--mf-steel)" }}>
                    {"Tampa → Savannah"}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p
                  style={{
                    margin: "0",
                    fontFamily: "var(--mf-mono)",
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "var(--mf-steel)",
                  }}
                >
                  {"ON THE ROAD"}
                </p>
                <div
                  style={{
                    background: "var(--mf-white)",
                    border: "1px solid var(--mf-line)",
                    borderRadius: "8px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mf-mono)",
                      fontSize: "11px",
                      color: "var(--mf-steel)",
                    }}
                  >
                    {"L-2049 · ETA 4 PM"}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>{"Kubota M7-172"}</span>
                  <span style={{ fontSize: "13px", color: "var(--mf-steel)" }}>
                    {"Macon → Charlotte"}
                  </span>
                </div>
                <div
                  style={{
                    background: "var(--mf-white)",
                    border: "1px solid var(--mf-line)",
                    borderRadius: "8px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mf-mono)",
                      fontSize: "11px",
                      color: "var(--mf-alert)",
                    }}
                  >
                    {"L-2045 · DETENTION"}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>{"CAT 305 excavator"}</span>
                  <span style={{ fontSize: "13px", color: "var(--mf-steel)" }}>
                    {"Valdosta → Mobile"}
                  </span>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <p
                  style={{
                    margin: "0",
                    fontFamily: "var(--mf-mono)",
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "var(--mf-steel)",
                  }}
                >
                  {"PAID"}
                </p>
                <div
                  style={{
                    background: "var(--mf-white)",
                    border: "1px solid var(--mf-line)",
                    borderRadius: "8px",
                    padding: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "3px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mf-mono)",
                      fontSize: "11px",
                      color: "var(--mf-ok)",
                    }}
                  >
                    {"L-2031 · PAID"}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: "600" }}>{"Bobcat T770"}</span>
                  <span style={{ fontSize: "13px", color: "var(--mf-steel)" }}>
                    {"Margin $320"}
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "280px",
                borderLeft: "1px solid var(--mf-line)",
                padding: "18px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontFamily: "var(--mf-mono)",
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "var(--mf-steel)",
                }}
              >
                {"AGENT ACTIVITY"}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                  fontSize: "13px",
                  lineHeight: "1.4",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mf-mono)",
                    fontSize: "11px",
                    color: "var(--mf-steel)",
                  }}
                >
                  {"8:41 AM"}
                </span>
                {"Moved L-2041 to Finding a truck. Erin accepted $2,100."}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                  fontSize: "13px",
                  lineHeight: "1.4",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mf-mono)",
                    fontSize: "11px",
                    color: "var(--mf-steel)",
                  }}
                >
                  {"8:07 AM"}
                </span>
                {"You replied A. Quote sent to Erin."}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                  fontSize: "13px",
                  lineHeight: "1.4",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mf-mono)",
                    fontSize: "11px",
                    color: "var(--mf-steel)",
                  }}
                >
                  {"7:52 AM"}
                </span>
                {"Asked Delta Haul for a corrected COI on L-2044."}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "3px",
                  fontSize: "13px",
                  lineHeight: "1.4",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mf-mono)",
                    fontSize: "11px",
                    color: "var(--mf-steel)",
                  }}
                >
                  {"7:30 AM"}
                </span>
                {"Flagged L-2045: driver waiting 2 h. Detention drafted."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
