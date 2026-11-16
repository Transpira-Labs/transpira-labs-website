/* Ported from docs/homepage-handoff/design/homepage.dc.html. Values are the design's own; colours and fonts are the --mf-* tokens in styles.css. */
/*
 * TODO(before launch): illustrative details to confirm against the real product:
 *   - "Inbox · 1,400 unread" in the email window
 *   - the thread and rate-confirmation times (7:00, 8:06, 8:44, SENT 9:12 AM)
 *   - Bluegrass at $1,750 for Thursday 9 AM
 * TODO(before launch): "Try it on an email" pointed at #try in the design, which
 * has no section. It opens the live demo for now; confirm the destination.
 */
import { ManifestMark } from "./ManifestMark";
import { DEMO_URL } from "@/components/site-chrome";

export function Hero() {
  return (
    <section
      id="top"
      className="mf-pad"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "88px 32px 0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "26px",
      }}
    >
      <h1
        className="mf-h1"
        style={{
          margin: "0",
          fontFamily: "var(--mf-display)",
          fontSize: "68px",
          lineHeight: "1.1",
          fontWeight: "400",
          letterSpacing: "-1px",
          maxWidth: "980px",
        }}
      >
        {"Quote, cover and get paid with a one-letter "}
        <span
          className="mf-a"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            verticalAlign: "middle",
            width: "72px",
            height: "64px",
            margin: "0 4px",
            borderRadius: "22px 22px 6px 22px",
            background: "var(--mf-ink)",
            color: "var(--mf-amber)",
            fontFamily: "var(--mf-sans)",
            fontSize: "36px",
            fontWeight: "700",
          }}
        >
          {"A"}
        </span>
        {" text."}
      </h1>
      <p
        className="mf-lede"
        style={{
          margin: "0",
          fontSize: "20px",
          lineHeight: "1.55",
          color: "var(--mf-steel)",
          maxWidth: "640px",
        }}
      >
        {
          "Manifest is an agent for equipment brokers. It reads your email, prices loads, books trucks and chases paperwork, then texts you before anything goes out."
        }
      </p>
      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          justifyContent: "center",
          fontSize: "14px",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid var(--mf-line-strong)",
            borderRadius: "999px",
            padding: "6px 14px",
            background: "var(--mf-white)",
          }}
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#2E7D4F"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12l5 5 9-10"></path>
          </svg>
          {"A person approves every send"}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid var(--mf-line-strong)",
            borderRadius: "999px",
            padding: "6px 14px",
            background: "var(--mf-white)",
          }}
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1A1C1E"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <rect x="7" y="2" width="10" height="20" rx="2"></rect>
            <path d="M11 18h2"></path>
          </svg>
          {"Nothing to install"}
        </span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            border: "1px solid var(--mf-line-strong)",
            borderRadius: "999px",
            padding: "6px 14px",
            background: "var(--mf-white)",
          }}
        >
          {"Backed by Fusen World"}
        </span>
      </div>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
        <a
          className="mf-btn"
          href={DEMO_URL}
          target="_blank"
          rel="noreferrer"
          data-ph-capture-attribute-cta="hero-try"
          style={{
            color: "var(--mf-ink)",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "600",
            padding: "14px 22px",
            borderRadius: "8px",
            background: "var(--mf-paper-deep)",
          }}
        >
          {"Try it on an email"}
        </a>
        <a
          className="mf-btn"
          data-ph-capture-attribute-cta="hero"
          href="#call"
          style={{
            background: "var(--mf-amber)",
            color: "var(--mf-ink)",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "600",
            padding: "14px 22px",
            borderRadius: "8px",
          }}
        >
          {"Book a 20-minute call"}
        </a>
      </div>
      <div
        className="mf-scene"
        style={{
          position: "relative",
          zIndex: "1",
          width: "100%",
          maxWidth: "1080px",
          height: "760px",
          marginTop: "64px",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <div
          className="mf-scene-email"
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: "1",
            left: "0",
            top: "70px",
            width: "440px",
            transform: "rotate(-2.5deg)",
            background: "var(--mf-white)",
            border: "1px solid var(--mf-line-strong)",
            borderRadius: "12px",
            boxShadow: "0 16px 40px rgba(26,28,30,0.10)",
            overflow: "hidden",
            textAlign: "left",
            fontFamily: "var(--mf-ios)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "10px 14px",
              background: "#F2F1EC",
              borderBottom: "1px solid var(--mf-line)",
            }}
          >
            <span
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "999px",
                background: "#D9D6CE",
              }}
            ></span>
            <span
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "999px",
                background: "#D9D6CE",
              }}
            ></span>
            <span
              style={{
                width: "11px",
                height: "11px",
                borderRadius: "999px",
                background: "#D9D6CE",
              }}
            ></span>
            <span
              style={{
                flex: "1",
                textAlign: "center",
                fontSize: "12px",
                color: "var(--mf-steel-light)",
              }}
            >
              {"Inbox · 1,400 unread"}
            </span>
          </div>
          <div
            style={{
              padding: "18px 22px 24px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <p style={{ margin: "0", fontSize: "18px", fontWeight: "600", color: "var(--mf-ink)" }}>
              {"Kubota to Raleigh"}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "13px",
                color: "var(--mf-steel)",
              }}
            >
              <span>
                <span style={{ color: "var(--mf-ink)", fontWeight: "600" }}>{"Erin Caldwell"}</span>
                {" · Caldwell Equipment"}
              </span>
              <span>{"Mon 8:05 AM"}</span>
            </div>
            <p
              style={{
                margin: "6px 0 0",
                fontSize: "15px",
                lineHeight: "1.55",
                color: "var(--mf-ink)",
              }}
            >
              {
                "Hi, can you move a Kubota tractor from Macon, GA to Raleigh, NC on Thursday? What would it cost?"
              }
            </p>
            <p style={{ margin: "0", fontSize: "15px", color: "var(--mf-ink)" }}>{"Erin"}</p>
          </div>
        </div>
        <div
          className="mf-scene-phone"
          style={{
            position: "relative",
            zIndex: "2",
            flex: "0 0 auto",
            width: "332px",
            height: "718px",
            boxSizing: "border-box",
            background: "var(--mf-white)",
            borderRadius: "56px",
            border: "11px solid #101012",
            boxShadow: "0 0 0 1px #3A3A3C, 0 40px 80px rgba(26,28,30,0.28)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            fontFamily: "var(--mf-ios)",
            textAlign: "left",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 26px 0",
              fontSize: "15px",
              fontWeight: "600",
              color: "#000000",
            }}
          >
            <span>{"9:41"}</span>
            <span aria-hidden="true" style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <svg width="17" height="11" viewBox="0 0 17 11">
                <rect x="0" y="7" width="3" height="4" rx="1" fill="#000"></rect>
                <rect x="4.5" y="5" width="3" height="6" rx="1" fill="#000"></rect>
                <rect x="9" y="2.5" width="3" height="8.5" rx="1" fill="#000"></rect>
                <rect x="13.5" y="0" width="3" height="11" rx="1" fill="#000"></rect>
              </svg>
              <svg width="15" height="11" viewBox="0 0 15 11">
                <path
                  d="M7.5 10.5l2.2-2.4a3.2 3.2 0 0 0-4.4 0zM3.8 6.6a5.4 5.4 0 0 1 7.4 0l1.4-1.5a7.5 7.5 0 0 0-10.2 0zM1 3.6a9.6 9.6 0 0 1 13 0l1-1.1a11 11 0 0 0-15 0z"
                  fill="#000"
                ></path>
              </svg>
              <svg width="25" height="12" viewBox="0 0 25 12">
                <rect
                  x="0.5"
                  y="0.5"
                  width="21"
                  height="11"
                  rx="3"
                  fill="none"
                  stroke="#000"
                  opacity="0.4"
                ></rect>
                <rect x="2" y="2" width="16" height="8" rx="1.8" fill="#000"></rect>
                <rect
                  x="22.5"
                  y="4"
                  width="1.6"
                  height="4"
                  rx="0.8"
                  fill="#000"
                  opacity="0.4"
                ></rect>
              </svg>
            </span>
          </div>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "10px",
              left: "50%",
              marginLeft: "-54px",
              width: "108px",
              height: "30px",
              borderRadius: "999px",
              background: "#000000",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px 12px 8px",
              borderBottom: "0.5px solid #D1D1D6",
              background: "#F7F7F7",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                color: "var(--mf-imessage-blue)",
                fontSize: "30px",
                lineHeight: "1",
                width: "40px",
                fontWeight: "300",
              }}
            >
              {"‹"}
            </span>
            <span
              style={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "999px",
                  background: "var(--mf-ink)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <ManifestMark size={30} decorative={true} />
              </span>
              <span style={{ fontSize: "11px", color: "#000000" }}>{"Manifest ›"}</span>
            </span>
            <span style={{ width: "40px" }}></span>
          </div>
          <div
            className="mf-thread"
            style={{
              flex: "1",
              padding: "6px 12px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
              overflow: "hidden",
            }}
          >
            <p
              style={{
                margin: "6px 0 2px",
                textAlign: "center",
                fontSize: "11px",
                color: "#8E8E93",
              }}
            >
              <span style={{ fontWeight: "600" }}>{"Today"}</span>
              {" 7:00 AM"}
            </p>
            <div
              style={{
                alignSelf: "flex-start",
                maxWidth: "78%",
                background: "var(--mf-imessage-grey)",
                color: "#000000",
                borderRadius: "18px",
                padding: "7px 12px",
                fontSize: "15px",
                lineHeight: "1.3",
              }}
            >
              {
                "Good morning. 7 active loads. 1 needs you, and $750 is still owed on the Honda Odyssey."
              }
            </div>
            <p
              style={{
                margin: "6px 0 2px",
                textAlign: "center",
                fontSize: "11px",
                color: "#8E8E93",
              }}
            >
              <span style={{ fontWeight: "600" }}>{"Today"}</span>
              {" 8:06 AM"}
            </p>
            <div
              style={{
                alignSelf: "flex-start",
                maxWidth: "78%",
                background: "var(--mf-imessage-grey)",
                color: "#000000",
                borderRadius: "18px",
                padding: "7px 12px",
                fontSize: "15px",
                lineHeight: "1.3",
              }}
            >
              {
                "Erin wants the Kubota moved Macon → Raleigh on Thursday. Similar trips went for $1,950–2,050."
              }
            </div>
            <div
              style={{
                alignSelf: "flex-start",
                maxWidth: "78%",
                background: "var(--mf-imessage-grey)",
                color: "#000000",
                borderRadius: "18px",
                padding: "7px 12px",
                fontSize: "15px",
                lineHeight: "1.3",
              }}
            >
              {"I suggest $2,100. Reply A to send."}
            </div>
            <div
              style={{
                alignSelf: "flex-end",
                maxWidth: "78%",
                background: "var(--mf-imessage-blue)",
                color: "var(--mf-white)",
                borderRadius: "18px",
                padding: "7px 12px",
                fontSize: "15px",
                lineHeight: "1.3",
              }}
            >
              {"A"}
            </div>
            <div
              style={{
                alignSelf: "flex-start",
                maxWidth: "78%",
                background: "var(--mf-imessage-grey)",
                color: "#000000",
                borderRadius: "18px",
                padding: "7px 12px",
                fontSize: "15px",
                lineHeight: "1.3",
              }}
            >
              {"Sent from your email."}
            </div>
            <p
              style={{
                margin: "6px 0 2px",
                textAlign: "center",
                fontSize: "11px",
                color: "#8E8E93",
              }}
            >
              <span style={{ fontWeight: "600" }}>{"Today"}</span>
              {" 8:44 AM"}
            </p>
            <div
              style={{
                alignSelf: "flex-start",
                maxWidth: "78%",
                background: "var(--mf-imessage-grey)",
                color: "#000000",
                borderRadius: "18px",
                padding: "7px 12px",
                fontSize: "15px",
                lineHeight: "1.3",
              }}
            >
              {"Erin said yes. Bluegrass can pick up Thursday 9 AM for $1,750. Book them?"}
            </div>
            <div
              style={{
                alignSelf: "flex-end",
                maxWidth: "78%",
                background: "var(--mf-imessage-blue)",
                color: "var(--mf-white)",
                borderRadius: "18px",
                padding: "7px 12px",
                fontSize: "15px",
                lineHeight: "1.3",
              }}
            >
              {"Yes, book them"}
            </div>
            <div
              style={{
                alignSelf: "flex-start",
                maxWidth: "78%",
                background: "var(--mf-imessage-grey)",
                color: "#000000",
                borderRadius: "18px",
                padding: "7px 12px",
                fontSize: "15px",
                lineHeight: "1.3",
              }}
            >
              {"Booked Bluegrass for Thursday 9 AM. Rate con sent."}
            </div>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px 26px" }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "999px",
                background: "var(--mf-imessage-grey)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#8E8E93",
                fontSize: "22px",
                lineHeight: "1",
              }}
            >
              {"+"}
            </span>
            <span
              style={{
                flex: "1",
                border: "1px solid #D1D1D6",
                borderRadius: "999px",
                padding: "7px 14px",
                fontSize: "15px",
                color: "#C7C7CC",
              }}
            >
              {"iMessage"}
            </span>
          </div>
        </div>
        <div
          className="mf-scene-ratecon"
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: "1",
            right: "0",
            top: "150px",
            width: "380px",
            transform: "rotate(3deg)",
            background: "var(--mf-white)",
            border: "1px solid var(--mf-line-strong)",
            boxShadow: "0 16px 40px rgba(26,28,30,0.10)",
            padding: "24px 26px 20px",
            fontSize: "13px",
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              paddingBottom: "12px",
              borderBottom: "1.5px solid var(--mf-ink)",
            }}
          >
            <span style={{ fontFamily: "var(--mf-display)", fontSize: "18px" }}>
              {"Rate confirmation"}
            </span>
            <span style={{ fontFamily: "var(--mf-mono)", fontSize: "12px" }}>{"L-2041"}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              padding: "8px 0",
              borderBottom: "1px solid var(--mf-rule)",
            }}
          >
            <span style={{ color: "var(--mf-steel)" }}>{"Shipper"}</span>
            <span style={{ fontWeight: "600", textAlign: "right" }}>
              {"Caldwell Equipment, Macon GA"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              padding: "8px 0",
              borderBottom: "1px solid var(--mf-rule)",
            }}
          >
            <span style={{ color: "var(--mf-steel)" }}>{"Deliver to"}</span>
            <span style={{ fontWeight: "600", textAlign: "right" }}>{"Raleigh, NC"}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              padding: "8px 0",
              borderBottom: "1px solid var(--mf-rule)",
            }}
          >
            <span style={{ color: "var(--mf-steel)" }}>{"Unit"}</span>
            <span style={{ fontWeight: "600", textAlign: "right" }}>
              {"Kubota tractor · 14,200 lb"}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              padding: "8px 0",
              borderBottom: "1px solid var(--mf-rule)",
            }}
          >
            <span style={{ color: "var(--mf-steel)" }}>{"Pickup"}</span>
            <span style={{ fontWeight: "600", textAlign: "right" }}>{"Thu 9:00 AM"}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              padding: "8px 0",
              borderBottom: "1px solid var(--mf-rule)",
            }}
          >
            <span style={{ color: "var(--mf-steel)" }}>{"Carrier"}</span>
            <span style={{ fontWeight: "600", textAlign: "right" }}>{"Bluegrass"}</span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              padding: "8px 0",
              borderBottom: "1px solid var(--mf-rule)",
            }}
          >
            <span style={{ color: "var(--mf-steel)" }}>{"Rate"}</span>
            <span style={{ fontWeight: "600", textAlign: "right" }}>{"$1,750"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "14px" }}>
            <span
              style={{
                fontFamily: "var(--mf-mono)",
                fontSize: "12px",
                fontWeight: "600",
                color: "var(--mf-amber-ink)",
                border: "1.5px solid var(--mf-amber-ink)",
                borderRadius: "4px",
                padding: "4px 8px",
                transform: "rotate(-4deg)",
              }}
            >
              {"SENT 9:12 AM"}
            </span>
          </div>
        </div>
      </div>
      <div
        className="mf-road"
        aria-label="On the road"
        style={{
          position: "relative",
          zIndex: "0",
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          height: "200px",
          marginTop: "-190px",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "0",
            right: "0",
            bottom: "34px",
            borderTop: "3px dashed var(--mf-road)",
          }}
        ></div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "0",
            right: "0",
            bottom: "0",
            height: "34px",
            background: "var(--mf-paper-deep)",
          }}
        ></div>
        <div className="mf-drive" style={{ position: "absolute", bottom: "22px", width: "520px" }}>
          <svg
            role="img"
            aria-label="Line drawing of a flatbed truck hauling an amber compact tractor"
            width="520"
            height="140"
            viewBox="0 0 520 140"
          >
            <g
              fill="#F7F5EF"
              stroke="#1A1C1E"
              strokeWidth="2.2"
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path d="M18 92 L300 92 L318 78 L372 78 L372 100 L18 100 Z"></path>
              <rect x="330" y="86" width="176" height="12" rx="2"></rect>
              <rect x="384" y="10" width="7" height="76" rx="2"></rect>
              <path d="M394 86 L394 34 Q394 28 400 28 L446 28 Q450 28 452 32 L462 54 L496 60 Q506 62 506 72 L506 98 L394 98 Z"></path>
              <path d="M402 38 L442 38 L452 56 L402 56 Z" fill="#DCE9EC"></path>
              <line x1="446" y1="62" x2="446" y2="94"></line>
              <circle cx="50" cy="112" r="14"></circle>
              <circle cx="50" cy="112" r="5" fill="#1A1C1E"></circle>
              <circle cx="84" cy="112" r="14"></circle>
              <circle cx="84" cy="112" r="5" fill="#1A1C1E"></circle>
              <circle cx="352" cy="112" r="14"></circle>
              <circle cx="352" cy="112" r="5" fill="#1A1C1E"></circle>
              <circle cx="386" cy="112" r="14"></circle>
              <circle cx="386" cy="112" r="5" fill="#1A1C1E"></circle>
              <circle cx="480" cy="112" r="14"></circle>
              <circle cx="480" cy="112" r="5" fill="#1A1C1E"></circle>
            </g>
            <g stroke="#1A1C1E" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round">
              <circle cx="232" cy="66" r="25" fill="#2A2D31"></circle>
              <circle cx="232" cy="66" r="10" fill="#F5A300"></circle>
              <circle cx="142" cy="77" r="14" fill="#2A2D31"></circle>
              <circle cx="142" cy="77" r="5" fill="#F5A300"></circle>
              <rect x="120" y="46" width="94" height="22" rx="4" fill="#F5A300"></rect>
              <path d="M212 66 L212 22 L258 22 L264 52" fill="none"></path>
              <rect x="206" y="15" width="64" height="7" rx="2" fill="#F5A300"></rect>
              <path d="M214 40 L252 40" fill="none"></path>
              <line x1="162" y1="46" x2="162" y2="28"></line>
            </g>
            <g stroke="#B86E00" strokeWidth="1.8" strokeDasharray="3 3" fill="none">
              <path d="M104 92 L132 74"></path>
              <path d="M276 92 L250 76"></path>
            </g>
            <rect x="500" y="66" width="6" height="6" rx="1" fill="#F5A300"></rect>
          </svg>
        </div>
      </div>
    </section>
  );
}
