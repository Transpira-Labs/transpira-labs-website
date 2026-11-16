/* Ported from docs/homepage-handoff/design/homepage.dc.html. Values are the design's own; colours and fonts are the --mf-* tokens in styles.css. */
/*
 * TODO(before launch): the documents below are illustrative. Confirm Delta
 * Haul's Friday pickup, the Bluegrass $1,750 bid, the times and the $350 margin.
 */
import { STOPS, type HomeVals } from "./home-logic";
import { StopTab } from "./StopTab";

export function OneLoad({ v }: { v: HomeVals }) {
  return (
    <section
      className="mf-pad"
      id="jobs"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "112px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "48px",
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
            maxWidth: "680px",
          }}
        >
          {"One load, from first email to final payment"}
        </h2>
        <p
          style={{
            margin: "0",
            fontSize: "18px",
            lineHeight: "1.55",
            color: "var(--mf-steel)",
            maxWidth: "400px",
          }}
        >
          {"Follow Erin's Kubota down the road. Click any stop to see what Manifest sent."}
        </p>
      </div>
      <div className="mf-stops-scroll" style={{ overflowX: "auto" }}>
        <div
          className="mf-stops"
          role="tablist"
          aria-label="Stops on the load"
          style={{ position: "relative", minWidth: "760px", display: "flex", gap: "8px" }}
        >
          <div
            className="mf-stops-line"
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "0",
              right: "0",
              top: "8px",
              borderTop: "3px dashed var(--mf-road)",
            }}
          ></div>
          {STOPS.map((s, n) => (
            <StopTab key={s.id} stop={s} n={n} v={v} />
          ))}
        </div>
      </div>
      <div
        className="mf-stage"
        role="tabpanel"
        id="mf-stop-panel"
        aria-labelledby={`mf-stop-${v.tab}`}
        aria-live="polite"
        style={{ background: "var(--mf-paper-deep)", borderRadius: "28px", padding: "48px 32px" }}
      >
        {v.isQuote && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div style={{ width: "100%", maxWidth: "600px" }}>
                <div
                  style={{
                    background: "var(--mf-white)",
                    border: "1px solid var(--mf-line-strong)",
                    borderRadius: "12px",
                    boxShadow: "0 16px 36px rgba(26,28,30,0.08)",
                    overflow: "hidden",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      padding: "16px 22px",
                      borderBottom: "1px solid var(--mf-rule)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      fontSize: "14px",
                    }}
                  >
                    <p style={{ margin: "0", fontSize: "18px", fontWeight: "600" }}>
                      {"Re: Kubota to Raleigh"}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                        color: "var(--mf-steel)",
                      }}
                    >
                      <span>
                        <span style={{ color: "var(--mf-ink)", fontWeight: "600" }}>
                          {"You, sent by Manifest"}
                        </span>
                        {" to Erin Caldwell"}
                      </span>
                      <span>{"Mon 8:07 AM"}</span>
                    </div>
                  </div>
                  <p
                    style={{
                      margin: "0",
                      padding: "20px 22px 24px",
                      fontSize: "16px",
                      lineHeight: "1.6",
                    }}
                  >
                    {
                      "Hi Erin, it's $2,100 to move the Kubota from Macon to Raleigh, pickup Thursday. What does the unit weigh, so we send the right trailer?"
                    }
                  </p>
                </div>
              </div>
              <p
                style={{
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "15px",
                  color: "var(--mf-ink-soft)",
                }}
              >
                <span
                  style={{
                    background: "var(--mf-imessage-blue)",
                    color: "var(--mf-white)",
                    borderRadius: "14px",
                    padding: "4px 11px",
                    fontFamily: "var(--mf-ios)",
                    fontSize: "14px",
                  }}
                >
                  {"A"}
                </span>
                {"Your part: one reply"}
              </p>
            </div>
          </>
        )}
        {v.isCover && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div style={{ width: "100%", maxWidth: "600px" }}>
                <div
                  style={{
                    background: "var(--mf-white)",
                    border: "1px solid var(--mf-line-strong)",
                    borderRadius: "12px",
                    boxShadow: "0 16px 36px rgba(26,28,30,0.08)",
                    overflow: "hidden",
                    textAlign: "left",
                  }}
                >
                  <div style={{ padding: "22px 24px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        paddingBottom: "12px",
                        borderBottom: "1.5px solid var(--mf-ink)",
                      }}
                    >
                      <span style={{ fontFamily: "var(--mf-display)", fontSize: "19px" }}>
                        {"Load posted"}
                      </span>
                      <span style={{ fontFamily: "var(--mf-mono)", fontSize: "12px" }}>
                        {"L-2041 · DAT · Truckstop"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--mf-rule)",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "var(--mf-steel)" }}>{"Lane"}</span>
                      <span
                        style={{ fontWeight: "600", color: "var(--mf-ink)", textAlign: "right" }}
                      >
                        {"Macon, GA → Raleigh, NC"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--mf-rule)",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "var(--mf-steel)" }}>{"Unit"}</span>
                      <span
                        style={{ fontWeight: "600", color: "var(--mf-ink)", textAlign: "right" }}
                      >
                        {"Kubota tractor · 14,200 lb"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--mf-rule)",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "var(--mf-steel)" }}>{"Pickup"}</span>
                      <span
                        style={{ fontWeight: "600", color: "var(--mf-ink)", textAlign: "right" }}
                      >
                        {"Thursday"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--mf-rule)",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "var(--mf-steel)" }}>{"Bluegrass"}</span>
                      <span
                        style={{ fontWeight: "600", color: "var(--mf-ok)", textAlign: "right" }}
                      >
                        {"Thu 9 AM · $1,750"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--mf-rule)",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "var(--mf-steel)" }}>{"Delta Haul"}</span>
                      <span
                        style={{ fontWeight: "600", color: "var(--mf-ink)", textAlign: "right" }}
                      >
                        {"Friday pickup"}
                      </span>
                    </div>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end", paddingTop: "14px" }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--mf-mono)",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "var(--mf-ok)",
                          border: "1.5px solid var(--mf-ok)",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          transform: "rotate(-4deg)",
                        }}
                      >
                        {"BOOKED 9:10 AM"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p
                style={{
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "15px",
                  color: "var(--mf-ink-soft)",
                }}
              >
                <span
                  style={{
                    background: "var(--mf-imessage-blue)",
                    color: "var(--mf-white)",
                    borderRadius: "14px",
                    padding: "4px 11px",
                    fontFamily: "var(--mf-ios)",
                    fontSize: "14px",
                  }}
                >
                  {"Yes"}
                </span>
                {"Your part: picked the truck"}
              </p>
            </div>
          </>
        )}
        {v.isPaperwork && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div style={{ width: "100%", maxWidth: "600px" }}>
                <div
                  style={{
                    background: "var(--mf-white)",
                    border: "1px solid var(--mf-line-strong)",
                    borderRadius: "12px",
                    boxShadow: "0 16px 36px rgba(26,28,30,0.08)",
                    overflow: "hidden",
                    textAlign: "left",
                  }}
                >
                  <div style={{ padding: "22px 24px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        paddingBottom: "12px",
                        borderBottom: "1.5px solid var(--mf-ink)",
                      }}
                    >
                      <span style={{ fontFamily: "var(--mf-display)", fontSize: "19px" }}>
                        {"Carrier packet"}
                      </span>
                      <span style={{ fontFamily: "var(--mf-mono)", fontSize: "12px" }}>
                        {"L-2041 · Bluegrass"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--mf-rule)",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "var(--mf-steel)" }}>{"W-9"}</span>
                      <span
                        style={{ fontWeight: "600", color: "var(--mf-ok)", textAlign: "right" }}
                      >
                        {"On file"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--mf-rule)",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "var(--mf-steel)" }}>{"Certificate of insurance"}</span>
                      <span
                        style={{ fontWeight: "600", color: "var(--mf-ok)", textAlign: "right" }}
                      >
                        {"Wrong holder, corrected"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--mf-rule)",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "var(--mf-steel)" }}>{"Rate confirmation"}</span>
                      <span
                        style={{ fontWeight: "600", color: "var(--mf-ok)", textAlign: "right" }}
                      >
                        {"Signed"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--mf-rule)",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "var(--mf-steel)" }}>{"Pickup instructions"}</span>
                      <span
                        style={{ fontWeight: "600", color: "var(--mf-ink)", textAlign: "right" }}
                      >
                        {"Sent to driver"}
                      </span>
                    </div>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end", paddingTop: "14px" }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--mf-mono)",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "var(--mf-ok)",
                          border: "1.5px solid var(--mf-ok)",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          transform: "rotate(-4deg)",
                        }}
                      >
                        {"DOCS 4/4"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p
                style={{
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "15px",
                  color: "var(--mf-ink-soft)",
                }}
              >
                <span
                  style={{
                    background: "var(--mf-imessage-blue)",
                    color: "var(--mf-white)",
                    borderRadius: "14px",
                    padding: "4px 11px",
                    fontFamily: "var(--mf-ios)",
                    fontSize: "14px",
                  }}
                >
                  {"Done?"}
                </span>
                {"Your part: asked one question"}
              </p>
            </div>
          </>
        )}
        {v.isTrack && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div style={{ width: "100%", maxWidth: "600px" }}>
                <div
                  style={{
                    background: "var(--mf-white)",
                    border: "1px solid var(--mf-line-strong)",
                    borderRadius: "12px",
                    boxShadow: "0 16px 36px rgba(26,28,30,0.08)",
                    overflow: "hidden",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      padding: "16px 22px",
                      borderBottom: "1px solid var(--mf-rule)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      fontSize: "14px",
                    }}
                  >
                    <p style={{ margin: "0", fontSize: "18px", fontWeight: "600" }}>
                      {"Your Kubota is on the way"}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "12px",
                        color: "var(--mf-steel)",
                      }}
                    >
                      <span>
                        <span style={{ color: "var(--mf-ink)", fontWeight: "600" }}>
                          {"You, sent by Manifest"}
                        </span>
                        {" to Erin Caldwell"}
                      </span>
                      <span>{"Thu 9:20 AM"}</span>
                    </div>
                  </div>
                  <p
                    style={{
                      margin: "0",
                      padding: "20px 22px 24px",
                      fontSize: "16px",
                      lineHeight: "1.6",
                    }}
                  >
                    {
                      "Hi Erin, your Kubota was loaded in Macon at 9:04 this morning. ETA Raleigh around 4 PM today. I'll confirm when it's delivered."
                    }
                  </p>
                </div>
              </div>
              <p
                style={{
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "15px",
                  color: "var(--mf-ink-soft)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mf-mono)",
                    fontSize: "13px",
                    color: "var(--mf-amber-deep)",
                  }}
                >
                  {"—"}
                </span>
                {"Your part: nothing. It just happened."}
              </p>
            </div>
          </>
        )}
        {v.isPaid && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                alignItems: "center",
              }}
            >
              <div style={{ width: "100%", maxWidth: "600px" }}>
                <div
                  style={{
                    background: "var(--mf-white)",
                    border: "1px solid var(--mf-line-strong)",
                    borderRadius: "12px",
                    boxShadow: "0 16px 36px rgba(26,28,30,0.08)",
                    overflow: "hidden",
                    textAlign: "left",
                  }}
                >
                  <div style={{ padding: "22px 24px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        paddingBottom: "12px",
                        borderBottom: "1.5px solid var(--mf-ink)",
                      }}
                    >
                      <span style={{ fontFamily: "var(--mf-display)", fontSize: "19px" }}>
                        {"Invoice"}
                      </span>
                      <span style={{ fontFamily: "var(--mf-mono)", fontSize: "12px" }}>
                        {"L-2041 · Caldwell Equipment"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--mf-rule)",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "var(--mf-steel)" }}>{"Kubota tractor"}</span>
                      <span
                        style={{ fontWeight: "600", color: "var(--mf-ink)", textAlign: "right" }}
                      >
                        {"Macon → Raleigh"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--mf-rule)",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "var(--mf-steel)" }}>{"Billed"}</span>
                      <span
                        style={{ fontWeight: "600", color: "var(--mf-ink)", textAlign: "right" }}
                      >
                        {"$2,100"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--mf-rule)",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "var(--mf-steel)" }}>{"Carrier cost"}</span>
                      <span
                        style={{ fontWeight: "600", color: "var(--mf-ink)", textAlign: "right" }}
                      >
                        {"$1,750"}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "16px",
                        padding: "10px 0",
                        borderBottom: "1px solid var(--mf-rule)",
                        fontSize: "14px",
                      }}
                    >
                      <span style={{ color: "var(--mf-steel)" }}>{"Margin"}</span>
                      <span
                        style={{ fontWeight: "600", color: "var(--mf-ok)", textAlign: "right" }}
                      >
                        {"$350"}
                      </span>
                    </div>
                    <div
                      style={{ display: "flex", justifyContent: "flex-end", paddingTop: "14px" }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--mf-mono)",
                          fontSize: "12px",
                          fontWeight: "600",
                          color: "var(--mf-ok)",
                          border: "1.5px solid var(--mf-ok)",
                          borderRadius: "4px",
                          padding: "4px 8px",
                          transform: "rotate(-4deg)",
                        }}
                      >
                        {"PAID"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p
                style={{
                  margin: "0",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "15px",
                  color: "var(--mf-ink-soft)",
                }}
              >
                <span
                  style={{
                    background: "var(--mf-imessage-blue)",
                    color: "var(--mf-white)",
                    borderRadius: "14px",
                    padding: "4px 11px",
                    fontFamily: "var(--mf-ios)",
                    fontSize: "14px",
                  }}
                >
                  {"A"}
                </span>
                {"Your part: one reply to send it"}
              </p>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
