/*
 * GENERATED from Transpira-Labs/manifest-story source/Broker Story Fusion.dc.html
 * by a one-off converter: the template's markup and inline styles, verbatim.
 * Values ({{ holes }} in the source) come from useStoryVals() in story-logic.ts.
 */
import { Fragment, useRef, type CSSProperties } from "react";
import transpiraLogo from "@/assets/transpira-logo.png";
import type { StoryVals } from "./story-logic";
import { FanOut } from "./FanOut";
import { Pains } from "./Pains";
import { Kanban } from "./Kanban";
import { InlineCall } from "./FloatingCall";
import { TeamScene } from "./TeamScene";
import { StoryPhone, type PhoneVals } from "./StoryPhone";
import { Link } from "@tanstack/react-router";
import { DEMO_URL } from "@/components/site-chrome";

/* The "more loads meant more people" columns: loads a week and the team it takes. */
const ROLES = {
  owner: { label: "Owner / sales", color: "#f4f6f5" },
  shipper: { label: "Shipper reps", color: "#7fb09c" },
  carrier: { label: "Carrier reps", color: "#d2ad5e" },
  track: { label: "Track and trace", color: "#8fb3c0" },
  billing: { label: "Billing", color: "#d48a70" },
  ops: { label: "Ops manager", color: "#a78bfa" },
} as const;
type Role = keyof typeof ROLES;

const TEAMS: { loads: string; people: string; who: string; team: Role[] }[] = [
  {
    loads: "10",
    people: "1 person",
    who: "Does everything",
    team: ["owner"],
  },
  {
    loads: "30–40",
    people: "2 people",
    who: "Broker + dispatcher",
    team: ["owner", "track"],
  },
  {
    loads: "~115",
    people: "10 people",
    who: "Reps, tracking, billing, ops",
    team: [
      "owner",
      "shipper",
      "shipper",
      "carrier",
      "carrier",
      "track",
      "track",
      "track",
      "billing",
      "ops",
    ],
  },
];

export function StoryMarkup({ v }: { v: StoryVals }) {
  const heroThread = useRef<HTMLDivElement>(null);
  const heroPhone: PhoneVals = {
    ...v,
    scPhoneRef: heroThread,
    scPhoneDisp: "block",
    scPhoneS: 1,
    scEmpty: false,
    scTypingOn: false,
    sp1: true,
    spOpts: true,
    sp2: false,
    sp3: false,
    sp4: false,
    sp5: false,
    spDelivered: false,
  };
  return (
    <div
      className="ms-root"
      style={{
        display: "flex",
        flexDirection: "column",
        color: "#fff",
        background: "#1b2420",
      }}
    >
      <section data-screen-label="Hero" className="ms-hero">
        <div className="ms-hero-copy">
          <h1 className="ms-display">
            {"Win and manage "}
            <span style={{ color: "#7fb09c" }}>10×</span>
            {" the loads."}
            <br />
            Same team.
          </h1>
          <p className="ms-hero-sub">
            Manifest reads the email, prices the load, posts it for carriers and only texts you when
            it needs you. You approve with one tap.
          </p>
          <div className="ms-hero-actions">
            <InlineCall where="hero" />
            <a className="ms-textlink" href={DEMO_URL} target="_blank" rel="noreferrer">
              Live demo
            </a>
          </div>
        </div>
        {/* The thread at the moment it asks. Tapping a reply jumps into the story at that point. */}
        <div className="ms-hero-phone">
          <StoryPhone v={heroPhone} />
        </div>
      </section>
      <section data-screen-label="Problem" style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
            padding: "clamp(64px,10vw,120px) 24px clamp(40px,6vw,72px)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              margin: "0",
              fontSize: "clamp(2rem,5vw,4.5rem)",
              fontWeight: "800",
              letterSpacing: "-.03em",
              textWrap: "balance",
            }}
          >
            {"A broker's Monday morning."}
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: v.scCols, position: "relative" }}>
          <div style={{ order: "1", display: "flex", flexDirection: "column" }}>
            <div data-scbeforewrap="1" style={{ display: "flex", flexDirection: "column" }}>
              <div
                data-scbefore="1"
                style={{
                  minHeight: v.scBlockH,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "16px",
                  opacity: v.sb1,
                  transition: "opacity .45s ease",
                  padding: "0 32px 0 clamp(24px,6vw,96px)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: ".8rem",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    color: "#d48a70",
                  }}
                >
                  Before · Monday 8:05 AM
                </div>
                <h3
                  style={{
                    margin: "0",
                    fontSize: "clamp(2rem,3.6vw,3.5rem)",
                    fontWeight: "800",
                    lineHeight: "1.02",
                    letterSpacing: "-.03em",
                    textWrap: "balance",
                  }}
                >
                  A customer emails for a price.
                </h3>
                <div
                  style={{
                    fontSize: "clamp(1.05rem,1.5vw,1.3rem)",
                    lineHeight: "1.45",
                    color: "#b7c4bf",
                    maxWidth: "520px",
                    textWrap: "pretty",
                  }}
                >
                  Erin needs a tractor moved Thursday. Her email lands in an inbox with 1,400
                  others.
                </div>
              </div>
              <div
                data-scbefore="2"
                style={{
                  minHeight: v.scBlockH,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "16px",
                  opacity: v.sb2,
                  transition: "opacity .45s ease",
                  padding: "0 32px 0 clamp(24px,6vw,96px)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: ".8rem",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    color: "#d48a70",
                  }}
                >
                  Before · 8:20 AM
                </div>
                <h3
                  style={{
                    margin: "0",
                    fontSize: "clamp(2rem,3.6vw,3.5rem)",
                    fontWeight: "800",
                    lineHeight: "1.02",
                    letterSpacing: "-.03em",
                    textWrap: "balance",
                  }}
                >
                  Then everything else arrives at once.
                </h3>
                <div
                  style={{
                    fontSize: "clamp(1.05rem,1.5vw,1.3rem)",
                    lineHeight: "1.45",
                    color: "#b7c4bf",
                    maxWidth: "520px",
                    textWrap: "pretty",
                  }}
                >
                  Carriers call about other loads. Drivers text. A customer wants an update. An
                  auction wants payment.
                </div>
              </div>
              <div
                data-scbefore="3"
                style={{
                  minHeight: v.scBlockH,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "16px",
                  opacity: v.sb3,
                  transition: "opacity .45s ease",
                  padding: "0 32px 0 clamp(24px,6vw,96px)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: ".8rem",
                    letterSpacing: ".08em",
                    textTransform: "uppercase",
                    color: "#d48a70",
                  }}
                >
                  Before · 9:14 AM
                </div>
                <h3
                  style={{
                    margin: "0",
                    fontSize: "clamp(2rem,3.6vw,3.5rem)",
                    fontWeight: "800",
                    lineHeight: "1.02",
                    letterSpacing: "-.03em",
                    textWrap: "balance",
                  }}
                >
                  By 9:14, dozens of things are waiting.
                </h3>
                <div
                  style={{
                    fontSize: "clamp(1.05rem,1.5vw,1.3rem)",
                    lineHeight: "1.45",
                    color: "#b7c4bf",
                    maxWidth: "520px",
                    textWrap: "pretty",
                  }}
                >
                  {"Erin's quote still isn't written. By tomorrow she'll book with someone else."}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              order: v.scStageOrder,
              position: "sticky",
              top: v.scStageTop,
              height: v.scStageH,
              zIndex: "2",
              background: "#1b2420",
              padding: "clamp(16px,3vh,32px) clamp(16px,3vw,40px) clamp(16px,3vh,32px) 0",
              boxSizing: "border-box",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "0",
                  zIndex: "4",
                  pointerEvents: "none",
                  background: "#2a2d2b",
                  backgroundImage:
                    "repeating-linear-gradient(-45deg,rgba(255,255,255,.02) 0 14px,transparent 14px 28px)",
                  overflow: "hidden",
                }}
              >
                {v.scChaos.map((c, i) => (
                  <Fragment key={i}>
                    <div
                      style={
                        {
                          position: "absolute",
                          left: c.x,
                          top: c.y,
                          width: c.w,
                          "--rot": c.rot,
                          transform: `rotate(${c.rot})`,
                          background: c.bg,
                          color: "#1c1c1e",
                          borderRadius: c.rad,
                          boxShadow: "0 14px 40px rgba(0,0,0,.55)",
                          overflow: "hidden",
                          fontFamily: "-apple-system,system-ui,sans-serif",
                          animation: "ms-popin .45s cubic-bezier(.2,.9,.3,1.15) both",
                        } as CSSProperties
                      }
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "7px 10px",
                          background: c.bar,
                          color: c.ink,
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        <span
                          style={{
                            flex: "none",
                            width: "18px",
                            height: "18px",
                            borderRadius: "5px",
                            background: c.icon,
                            color: "#fff",
                            display: "grid",
                            placeItems: "center",
                            fontSize: "10px",
                            fontWeight: "700",
                          }}
                        >
                          {c.ini}
                        </span>
                        <span
                          style={{
                            flex: "1",
                            minWidth: "0",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {c.app}
                        </span>
                        {c.hasBadge && (
                          <>
                            <span
                              style={{
                                flex: "none",
                                borderRadius: "10px",
                                background: "#e0202a",
                                color: "#fff",
                                padding: "1px 7px",
                                fontSize: "11px",
                                animation: "ms-pulse 1.4s ease-in-out infinite",
                              }}
                            >
                              {c.badge}
                            </span>
                          </>
                        )}
                      </div>
                      <div
                        style={{
                          padding: "7px 10px 9px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "2px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: "600",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {c.who}
                        </div>
                        <div
                          style={{
                            fontSize: "12.5px",
                            lineHeight: "1.3",
                            color: "#3a3a3c",
                            overflow: "hidden",
                            display: "-webkit-box",
                            WebkitLineClamp: "2",
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {c.text}
                        </div>
                      </div>
                    </div>
                  </Fragment>
                ))}
                <div
                  style={{
                    position: "absolute",
                    left: "20px",
                    top: "20px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "rgba(0,0,0,.7)",
                    borderRadius: "8px",
                    padding: "8px 14px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    letterSpacing: ".06em",
                    color: "#fff",
                    zIndex: "2",
                  }}
                >
                  <span
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#e0202a",
                      animation: "ms-pulse 1s ease-in-out infinite",
                    }}
                  ></span>
                  {v.scChaosN}
                  {" WAITING \u00b7 "}
                  {v.scChaosClock}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Pains />
      <section
        data-screen-label="Until today"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(28px,4vw,48px)",
          padding: "clamp(56px,9vw,110px) clamp(20px,5vw,72px) clamp(72px,12vw,140px)",
          borderTop: "1px solid rgba(255,255,255,.08)",
        }}
      >
        <h2
          data-reveal="5"
          style={{
            margin: "0",
            textAlign: "center",
            fontSize: "clamp(2rem,5vw,4.5rem)",
            lineHeight: "1.05",
            fontWeight: "800",
            letterSpacing: "-.03em",
            textWrap: "balance",
            opacity: v.rvO5,
            transform: `translateY(${v.rvY5})`,
            transition: "opacity .7s 0s ease,transform .8s 0s cubic-bezier(.22,1,.36,1)",
          }}
        >
          {"Processing more loads meant "}
          more people.
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: v.rvCols,
            gap: "clamp(12px,3vw,40px)",
            width: "100%",
            maxWidth: "1000px",
          }}
        >
          {TEAMS.map((t, i) => (
            <div
              key={t.loads}
              data-reveal={String(6 + i)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "14px",
                padding: "24px 12px",
                borderTop: "2px solid rgba(212,138,112,.5)",
                opacity: [v.rvO6, v.rvO7, v.rvO8][i],
                transform: `translateY(${[v.rvY6, v.rvY7, v.rvY8][i]})`,
                transition: `opacity .7s ${i * 0.15}s ease,transform .8s ${i * 0.15}s cubic-bezier(.22,1,.36,1)`,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: ".8rem",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "#d48a70",
                }}
              >
                {t.loads} loads/week
              </div>
              <div
                style={{
                  fontSize: "clamp(2.5rem,5vw,4rem)",
                  fontWeight: "800",
                  letterSpacing: "-.03em",
                  lineHeight: "1",
                }}
              >
                {t.people}
              </div>
              <TeamScene level={i as 0 | 1 | 2} people={t.team.map((r) => ROLES[r].color)} />
              <div
                style={{
                  fontSize: "14px",
                  lineHeight: "1.4",
                  color: "#b7c4bf",
                  textAlign: "center",
                  maxWidth: "260px",
                }}
              >
                {t.who}
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "8px 18px",
            fontSize: "13px",
            color: "#b7c4bf",
            marginTop: "-12px",
          }}
        >
          {Object.values(ROLES).map((r) => (
            <span key={r.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{ width: "10px", height: "10px", borderRadius: "50%", background: r.color }}
              />
              {r.label}
            </span>
          ))}
        </div>
        <p
          style={{
            margin: "0",
            textAlign: "center",
            fontSize: "clamp(1.25rem,2.4vw,1.75rem)",
            fontWeight: "600",
            letterSpacing: "-.02em",
            color: "#fff",
          }}
        >
          40 → 115 loads: 3× the volume, 5× the people.
        </p>
        <p
          style={{
            margin: "-8px 0 0",
            fontSize: "12px",
            color: "#868e8b",
            fontFamily: "var(--font-mono)",
            textAlign: "center",
          }}
        >
          Sources: Freight Broker Boss · Nuvocargo · FreightWaves
        </p>
        <div
          data-reveal="9"
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            gap: "18px",
            marginTop: "clamp(16px,3vw,32px)",
            opacity: v.rvO9,
            transform: `translateY(${v.rvY9})`,
            transition: "opacity .7s 0s ease,transform .8s 0s cubic-bezier(.22,1,.36,1)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "64px",
              height: "116px",
              borderRadius: "16px",
              border: "2.5px solid #7fb09c",
              display: "grid",
              placeItems: "center",
            }}
          >
            <img
              src={transpiraLogo}
              alt="Transpira"
              style={{ width: "40px", height: "40px", display: "block" }}
            />
          </div>
          <h2
            style={{
              margin: "0",
              fontSize: "clamp(2.5rem,7vw,6rem)",
              fontWeight: "800",
              letterSpacing: "-.03em",
              lineHeight: "1",
              color: "#7fb09c",
            }}
          >
            Until today.
          </h2>
          <p style={{ margin: "0", fontSize: "clamp(1rem,1.6vw,1.25rem)", color: "#b7c4bf" }}>
            One phone. One agent. Any number of loads.
          </p>
          <div
            style={{
              marginTop: "clamp(12px,2vw,24px)",
              width: "100%",
              maxWidth: "1100px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(1.6rem,3.2vw,2.5rem)",
                  fontWeight: "600",
                  letterSpacing: "-.03em",
                  lineHeight: "1.1",
                  textWrap: "balance",
                }}
              >
                A one-person brokerage with big-shop numbers.
              </div>
              <div
                style={{
                  fontSize: "clamp(1rem,1.5vw,1.2rem)",
                  lineHeight: "1.45",
                  color: "#d5ddd9",
                  textWrap: "pretty",
                }}
              >
                Do the work of a 10-person shop and compete with the big guys, without hiring.
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(1.6rem,3.2vw,2.5rem)",
                  fontWeight: "600",
                  letterSpacing: "-.03em",
                  lineHeight: "1.1",
                  textWrap: "balance",
                }}
              >
                Your people work loads, not admin.
              </div>
              <div
                style={{
                  fontSize: "clamp(1rem,1.5vw,1.2rem)",
                  lineHeight: "1.45",
                  color: "#d5ddd9",
                  textWrap: "pretty",
                }}
              >
                The agent handles the admin. Your team sells and looks after customers.
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "clamp(24px,4vw,48px)",
              width: "100%",
              maxWidth: "1040px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "clamp(2rem,4.5vw,3.5rem)",
                fontWeight: "800",
                letterSpacing: "-.03em",
                lineHeight: "1",
              }}
            >
              Zero friction.
            </div>
            <div style={{ fontSize: "clamp(1rem,1.5vw,1.2rem)", color: "#d5ddd9" }}>
              Nothing to install. Nothing to switch.
            </div>
            <FanOut />
          </div>
        </div>
      </section>
      <section
        data-screen-label="One load"
        style={{ borderTop: "1px solid rgba(255,255,255,.08)" }}
      >
        <div style={{ display: "grid", gridTemplateColumns: v.scCols, position: "relative" }}>
          <div style={{ order: "1", display: "flex", flexDirection: "column" }}>
            <div
              style={{
                minHeight: "70vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "14px",
                padding: "0 32px 0 clamp(24px,6vw,96px)",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(2.4rem,5vw,4.5rem)",
                  fontWeight: "800",
                  lineHeight: "1",
                  letterSpacing: "-.03em",
                  textWrap: "balance",
                }}
              >
                {"Now the same morning, "}
                with Manifest.
              </div>
            </div>
            <div
              data-scstep="1"
              style={{
                minHeight: v.scBlockH,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "16px",
                opacity: v.so1,
                transition: "opacity .45s ease",
                padding: "0 32px 0 clamp(24px,6vw,96px)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: ".8rem",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "#7fb09c",
                }}
              >
                With Manifest · 8:05 AM
              </div>
              <h3
                style={{
                  margin: "0",
                  fontSize: "clamp(2rem,3.6vw,3.5rem)",
                  fontWeight: "800",
                  lineHeight: "1.02",
                  letterSpacing: "-.03em",
                  textWrap: "balance",
                }}
              >
                A customer emails for a price.
              </h3>
              <div
                style={{
                  fontSize: "clamp(1.05rem,1.5vw,1.3rem)",
                  lineHeight: "1.45",
                  color: "#b7c4bf",
                  maxWidth: "520px",
                  textWrap: "pretty",
                }}
              >
                Erin needs a tractor moved Thursday. Normally this sits in the inbox until you have
                time to work out a number.
              </div>
            </div>
            <div
              data-scstep="2"
              style={{
                minHeight: v.scBlockH,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "16px",
                opacity: v.so2,
                transition: "opacity .45s ease",
                padding: "0 32px 0 clamp(24px,6vw,96px)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: ".8rem",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "#7fb09c",
                }}
              >
                Seconds later
              </div>
              <h3
                style={{
                  margin: "0",
                  fontSize: "clamp(2rem,3.6vw,3.5rem)",
                  fontWeight: "800",
                  lineHeight: "1.02",
                  letterSpacing: "-.03em",
                  textWrap: "balance",
                }}
              >
                The agent works out the price.
              </h3>
              <div
                style={{
                  fontSize: "clamp(1.05rem,1.5vw,1.3rem)",
                  lineHeight: "1.45",
                  color: "#b7c4bf",
                  maxWidth: "520px",
                  textWrap: "pretty",
                }}
              >
                It reads what similar trips cost and suggests $2,100.
              </div>
            </div>
            <div
              data-scstep="3"
              style={{
                minHeight: v.scBlockH,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "16px",
                opacity: v.so3,
                transition: "opacity .45s ease",
                padding: "0 32px 0 clamp(24px,6vw,96px)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: ".8rem",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "#7fb09c",
                }}
              >
                8:06 AM
              </div>
              <h3
                style={{
                  margin: "0",
                  fontSize: "clamp(2rem,3.6vw,3.5rem)",
                  fontWeight: "800",
                  lineHeight: "1.02",
                  letterSpacing: "-.03em",
                  textWrap: "balance",
                }}
              >
                Then it texts you.
              </h3>
              <div
                style={{
                  fontSize: "clamp(1.05rem,1.5vw,1.3rem)",
                  lineHeight: "1.45",
                  color: "#b7c4bf",
                  maxWidth: "520px",
                  textWrap: "pretty",
                }}
              >
                A normal text. You answer with one letter.
              </div>
              {v.scYourTurn && (
                <>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      background: "#7fb09c",
                      color: "#1b2420",
                      borderRadius: "10px",
                      padding: "16px 20px",
                      maxWidth: "480px",
                      animation: "ms-riseIn .4s ease-out",
                    }}
                  >
                    <div
                      style={{ flex: "1", display: "flex", flexDirection: "column", gap: "3px" }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          letterSpacing: ".08em",
                          textTransform: "uppercase",
                          fontWeight: "600",
                        }}
                      >
                        Your turn
                      </div>
                      <div style={{ fontSize: "18px", fontWeight: "600", lineHeight: "1.3" }}>
                        {"You're the broker. Tap a reply on the phone."}
                      </div>
                    </div>
                    <div style={{ fontSize: "28px", fontWeight: "600" }}>{v.scArrow}</div>
                  </div>
                </>
              )}
            </div>
            <div
              data-scstep="4"
              style={{
                minHeight: v.scBlockH,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "16px",
                opacity: v.so4,
                transition: "opacity .45s ease",
                padding: "0 32px 0 clamp(24px,6vw,96px)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: ".8rem",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "#7fb09c",
                }}
              >
                8:07 AM
              </div>
              <h3
                style={{
                  margin: "0",
                  fontSize: "clamp(2rem,3.6vw,3.5rem)",
                  fontWeight: "800",
                  lineHeight: "1.02",
                  letterSpacing: "-.03em",
                  textWrap: "balance",
                }}
              >
                One tap, and the quote goes out.
              </h3>
              <div
                style={{
                  fontSize: "clamp(1.05rem,1.5vw,1.3rem)",
                  lineHeight: "1.45",
                  color: "#b7c4bf",
                  maxWidth: "520px",
                  textWrap: "pretty",
                }}
              >
                The agent emails Erin from your address. To her, it reads like you wrote it.
              </div>
              <div className="ms-assure">
                Nothing reaches a customer or carrier until you approve.
              </div>
            </div>
            <div
              data-scstep="5"
              style={{
                minHeight: v.scBlockH,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "16px",
                opacity: v.so5,
                transition: "opacity .45s ease",
                padding: "0 32px 0 clamp(24px,6vw,96px)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: ".8rem",
                  letterSpacing: ".08em",
                  textTransform: "uppercase",
                  color: "#7fb09c",
                }}
              >
                8:41 AM · Covering
              </div>
              <h3
                style={{
                  margin: "0",
                  fontSize: "clamp(2rem,3.6vw,3.5rem)",
                  fontWeight: "800",
                  lineHeight: "1.02",
                  letterSpacing: "-.03em",
                  textWrap: "balance",
                }}
              >
                Erin says yes. The agent finds a truck.
              </h3>
              <div
                style={{
                  fontSize: "clamp(1.05rem,1.5vw,1.3rem)",
                  lineHeight: "1.45",
                  color: "#b7c4bf",
                  maxWidth: "520px",
                  textWrap: "pretty",
                }}
              >
                It posts the load with its own number, so carriers text the agent and your phone
                stays quiet.
              </div>
            </div>
            <div
              data-scstep="6"
              style={{
                minHeight: v.scBlockH,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "16px",
                opacity: v.so6,
                transition: "opacity .45s ease",
                padding: "0 32px 0 clamp(24px,6vw,96px)",
              }}
            >
              <h3
                style={{
                  margin: "0",
                  fontSize: "clamp(2rem,3.6vw,3.5rem)",
                  fontWeight: "800",
                  lineHeight: "1.02",
                  letterSpacing: "-.03em",
                  textWrap: "balance",
                }}
              >
                Need something? Just text it.
              </h3>
              <div
                style={{
                  fontSize: "clamp(1.05rem,1.5vw,1.3rem)",
                  lineHeight: "1.45",
                  color: "#b7c4bf",
                  maxWidth: "520px",
                  textWrap: "pretty",
                }}
              >
                The agent answers from the board: paperwork, prices, who owes what, where a truck
                is. Before, finding this meant digging through email, spam and a spreadsheet.
              </div>
            </div>
            <div
              data-scstep="7"
              style={{
                minHeight: v.scBlockH,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "16px",
                opacity: v.so7,
                transition: "opacity .45s ease",
                padding: "0 32px 0 clamp(24px,6vw,96px)",
              }}
            >
              <h3
                style={{
                  margin: "0",
                  fontSize: "clamp(2rem,3.6vw,3.5rem)",
                  fontWeight: "800",
                  lineHeight: "1.02",
                  letterSpacing: "-.03em",
                  textWrap: "balance",
                }}
              >
                Your part was one tap.
              </h3>
              <div
                style={{
                  fontSize: "clamp(1.05rem,1.5vw,1.3rem)",
                  lineHeight: "1.45",
                  color: "#b7c4bf",
                  maxWidth: "520px",
                  textWrap: "pretty",
                }}
              >
                The agent did the reading, the pricing, the emailing and the posting. You made the
                decision.
              </div>
            </div>
          </div>
          <div
            style={{
              order: v.scStageOrder,
              position: "sticky",
              top: v.scStageTop,
              height: v.scStageH,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              zIndex: "2",
              background: "#1b2420",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: v.scGap,
                transform: `scale(${v.scScale})`,
                transformOrigin: "center",
                transition: "gap .5s ease",
              }}
            >
              <div
                style={{
                  width: v.scCtxW,
                  height: "560px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  overflow: "hidden",
                  transition: "width .55s cubic-bezier(.22,1,.36,1)",
                }}
              >
                {v.sc1 && (
                  <>
                    <div
                      style={{
                        width: "360px",
                        flex: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        animation: "ms-riseIn .5s cubic-bezier(.22,1,.36,1)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          letterSpacing: ".08em",
                          textTransform: "uppercase",
                          color: "#7fb09c",
                        }}
                      >
                        Email to you
                      </div>
                      <div
                        style={{
                          background: "#fff",
                          color: "#1b2420",
                          borderRadius: "12px",
                          padding: "22px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "50%",
                              background: "#4c7280",
                              color: "#fff",
                              display: "grid",
                              placeItems: "center",
                              fontWeight: "600",
                            }}
                          >
                            E
                          </div>
                          <div>
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>Erin Caldwell</div>
                            <div style={{ fontSize: "12.5px", color: "#565f5c" }}>
                              Caldwell Equipment · 8:05 AM
                            </div>
                          </div>
                        </div>
                        <div style={{ fontSize: "17px", lineHeight: "1.5" }}>
                          Hi, can you move a Kubota tractor from Macon, GA to Raleigh, NC on
                          Thursday? What would it cost?
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {v.sc2 && (
                  <>
                    <div
                      style={{
                        width: "360px",
                        flex: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        animation: "ms-riseIn .5s cubic-bezier(.22,1,.36,1)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          letterSpacing: ".08em",
                          textTransform: "uppercase",
                          color: "#7fb09c",
                        }}
                      >
                        The agent checks past trips
                      </div>
                      <div
                        style={{
                          border: "1px solid rgba(255,255,255,.16)",
                          background: "rgba(255,255,255,.04)",
                          borderRadius: "12px",
                          padding: "22px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "18px",
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: "14px",
                              color: "#d5ddd9",
                            }}
                          >
                            <span>Similar trip, March</span>
                            <span style={{ fontWeight: "600", color: "#fff" }}>$1,950</span>
                          </div>
                          <div
                            style={{
                              height: "10px",
                              borderRadius: "5px",
                              background: "rgba(255,255,255,.08)",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: "78%",
                                background: "#868e8b",
                                animation: "ms-grow 1s .2s cubic-bezier(.22,1,.36,1) both",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              fontSize: "14px",
                              color: "#d5ddd9",
                            }}
                          >
                            <span>Similar trip, June</span>
                            <span style={{ fontWeight: "600", color: "#fff" }}>$2,050</span>
                          </div>
                          <div
                            style={{
                              height: "10px",
                              borderRadius: "5px",
                              background: "rgba(255,255,255,.08)",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              style={{
                                height: "100%",
                                width: "82%",
                                background: "#868e8b",
                                animation: "ms-grow 1s .4s cubic-bezier(.22,1,.36,1) both",
                              }}
                            ></div>
                          </div>
                        </div>
                        <div
                          style={{
                            borderTop: "1px solid rgba(255,255,255,.12)",
                            paddingTop: "16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "4px",
                            animation: "ms-riseIn .5s 1.1s ease-out both",
                          }}
                        >
                          <div style={{ fontSize: "13px", color: "#b7c4bf" }}>
                            Suggested price for Erin
                          </div>
                          <div
                            style={{
                              fontSize: "48px",
                              fontWeight: "800",
                              letterSpacing: "-.03em",
                              color: "#7fb09c",
                              lineHeight: "1",
                            }}
                          >
                            $2,100
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {v.sc4 && (
                  <>
                    <div
                      style={{
                        width: "360px",
                        flex: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        animation: "ms-riseIn .5s cubic-bezier(.22,1,.36,1)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          letterSpacing: ".08em",
                          textTransform: "uppercase",
                          color: "#7fb09c",
                        }}
                      >
                        Sent from your email
                      </div>
                      <div
                        style={{
                          background: "#fff",
                          color: "#1b2420",
                          borderRadius: "12px",
                          padding: "22px",
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "50%",
                              background: "#2f6f5e",
                              color: "#fff",
                              display: "grid",
                              placeItems: "center",
                              fontWeight: "600",
                            }}
                          >
                            S
                          </div>
                          <div>
                            <div style={{ fontWeight: "600", fontSize: "15px" }}>
                              Sam · to Erin Caldwell
                            </div>
                            <div style={{ fontSize: "12.5px", color: "#565f5c" }}>
                              8:07 AM · sent by the agent
                            </div>
                          </div>
                        </div>
                        <div style={{ fontSize: "17px", lineHeight: "1.5" }}>
                          {"Hi Erin, it's "}
                          {v.scPrice}
                          {" to move the Kubota from Macon to Raleigh, pickup Thursday."}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {v.sc5 && (
                  <>
                    <div
                      style={{
                        width: "360px",
                        flex: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        animation: "ms-riseIn .5s cubic-bezier(.22,1,.36,1)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          letterSpacing: ".08em",
                          textTransform: "uppercase",
                          color: "#7fb09c",
                        }}
                      >
                        Posted for carriers
                      </div>
                      <div
                        style={{
                          background: "#fff",
                          color: "#1b2420",
                          borderRadius: "12px",
                          padding: "8px 22px 12px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "12px 0",
                            borderBottom: "1px solid #e3e7e6",
                          }}
                        >
                          <span
                            style={{
                              width: "10px",
                              height: "10px",
                              borderRadius: "50%",
                              background: "#2f6f5e",
                            }}
                          ></span>
                          <span style={{ fontWeight: "600", fontSize: "15px" }}>Erin said yes</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "12px 0 4px",
                            fontSize: "16px",
                          }}
                        >
                          <span style={{ color: "#565f5c" }}>Kubota tractor</span>
                          <span style={{ fontWeight: "600" }}>Macon → Raleigh</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "4px 0",
                            fontSize: "16px",
                          }}
                        >
                          <span style={{ color: "#565f5c" }}>Pickup</span>
                          <span style={{ fontWeight: "600" }}>Thursday</span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "4px 0 10px",
                            fontSize: "16px",
                          }}
                        >
                          <span style={{ color: "#565f5c" }}>Carriers text</span>
                          <span style={{ fontWeight: "600" }}>The agent</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {v.scLedger && (
                  <div className="ms-ledger" style={{ width: v.scCtxW }}>
                    <div className="ms-ledger-col" data-side="before">
                      <div className="ms-ledger-head">Before</div>
                      <div>
                        <div className="ms-ledger-num">38</div>
                        <div className="ms-ledger-what">things waiting by 9:14</div>
                      </div>
                      <div>
                        <div className="ms-ledger-num">1 day</div>
                        <div className="ms-ledger-what">to send one quote</div>
                      </div>
                      <div className="ms-ledger-end">Quote lost.</div>
                    </div>
                    <div className="ms-ledger-col" data-side="after">
                      <div className="ms-ledger-head">With Manifest</div>
                      <div>
                        <div className="ms-ledger-num">1 tap</div>
                        <div className="ms-ledger-what">from you</div>
                      </div>
                      <div>
                        <div className="ms-ledger-num">2 min</div>
                        <div className="ms-ledger-what">from email to quote sent</div>
                      </div>
                      <div className="ms-ledger-end">Load won and posted.</div>
                    </div>
                  </div>
                )}
                {v.scBoardSide && (
                  <>
                    <div
                      style={{
                        width: "470px",
                        flex: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        animation: "ms-riseIn .5s cubic-bezier(.22,1,.36,1)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            letterSpacing: ".08em",
                            textTransform: "uppercase",
                            color: "#7fb09c",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <img
                            src={transpiraLogo}
                            alt=""
                            style={{ width: "14px", height: "14px", display: "block" }}
                          />
                          Manifest board · source of truth
                        </div>
                        <span style={{ fontSize: "12px", color: "#7fb09c" }}>
                          ⇄ synced with your texts
                        </span>
                      </div>
                      <div
                        style={{
                          background: "#f4f6f5",
                          borderRadius: "12px",
                          overflow: "hidden",
                          display: "grid",
                          gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                          minHeight: "400px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            padding: "10px 8px",
                            minWidth: "0",
                            borderRight: "1px solid #e3e7e6",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "10px",
                              letterSpacing: ".06em",
                              textTransform: "uppercase",
                              color: "#868e8b",
                            }}
                          >
                            Finding a truck
                          </div>
                          <div
                            style={{
                              background: "#fff",
                              border: "1px solid #e3e7e6",
                              borderRadius: "8px",
                              padding: "9px 10px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "3px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#1b2420",
                                lineHeight: "1.2",
                              }}
                            >
                              Kubota tractor
                            </div>
                            <div style={{ fontSize: "11.5px", color: "#565f5c" }}>
                              Erin Caldwell
                            </div>
                            <div
                              style={{ fontSize: "11.5px", color: "#2f6f5e", fontWeight: "600" }}
                            >
                              {v.scPrice}
                              {" \u00b7 2 bids"}
                            </div>
                          </div>
                          <div
                            style={{
                              background: "#fff",
                              border: "1px solid #e3e7e6",
                              borderRadius: "8px",
                              padding: "9px 10px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "3px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#1b2420",
                                lineHeight: "1.2",
                              }}
                            >
                              Ford Expedition
                            </div>
                            <div style={{ fontSize: "11.5px", color: "#565f5c" }}>Tyler Brooks</div>
                            <div
                              style={{ fontSize: "11.5px", color: "#2f6f5e", fontWeight: "600" }}
                            >
                              Held for release
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            padding: "10px 8px",
                            minWidth: "0",
                            borderRight: "1px solid #e3e7e6",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "10px",
                              letterSpacing: ".06em",
                              textTransform: "uppercase",
                              color: "#868e8b",
                            }}
                          >
                            Booked
                          </div>
                          <div
                            style={{
                              background: "#fff",
                              border: `2px solid ${v.scBobBd}`,
                              boxShadow: `0 0 0 ${v.scBobRing} rgba(0,122,255,.18)`,
                              borderRadius: "8px",
                              padding: "8px 9px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "3px",
                              transition: "all .4s ease",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#1b2420",
                                lineHeight: "1.2",
                              }}
                            >
                              Bobcat S650
                            </div>
                            <div style={{ fontSize: "11.5px", color: "#565f5c" }}>
                              Delta Haul · Tampa → Savannah
                            </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                                fontSize: "11px",
                                color: "#1b2420",
                                borderTop: "1px solid #eef1f0",
                                paddingTop: "5px",
                                marginTop: "2px",
                              }}
                            >
                              <span>✓ Rate con signed</span>
                              <span>✓ W-9 · ✓ License · ✓ Dispatcher</span>
                              <span style={{ color: "#b04a2d" }}>✕ COI · wrong holder</span>
                            </div>
                            {v.scBobRead && (
                              <>
                                <div
                                  style={{
                                    fontSize: "10.5px",
                                    fontWeight: "600",
                                    color: "#007aff",
                                    animation: "ms-dcin .3s .4s both",
                                  }}
                                >
                                  ↖ The agent read this card
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                            padding: "10px 8px",
                            minWidth: "0",
                            borderRight: "1px solid #e3e7e6",
                          }}
                        >
                          <div
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "10px",
                              letterSpacing: ".06em",
                              textTransform: "uppercase",
                              color: "#868e8b",
                            }}
                          >
                            On the road
                          </div>
                          <div
                            style={{
                              background: "#fff",
                              border: "2px solid #e3e7e6",
                              borderRadius: "8px",
                              padding: "8px 9px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "3px",
                              transition: "all .4s ease",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#1b2420",
                                lineHeight: "1.2",
                              }}
                            >
                              CAT 305 excavator
                            </div>
                            <div style={{ fontSize: "11.5px", color: "#565f5c" }}>
                              Valdosta → Mobile
                            </div>
                            <div
                              style={{ fontSize: "11.5px", fontWeight: "600", color: "#b04a2d" }}
                            >
                              Driver waiting 2 h
                            </div>
                          </div>
                          <div
                            style={{
                              background: "#fff",
                              border: "1px solid #e3e7e6",
                              borderRadius: "8px",
                              padding: "9px 10px",
                              display: "flex",
                              flexDirection: "column",
                              gap: "3px",
                            }}
                          >
                            <div
                              style={{
                                fontSize: "13px",
                                fontWeight: "600",
                                color: "#1b2420",
                                lineHeight: "1.2",
                              }}
                            >
                              Kubota M7-172
                            </div>
                            <div style={{ fontSize: "11.5px", color: "#565f5c" }}>Ridgeline</div>
                            <div
                              style={{ fontSize: "11.5px", color: "#2f6f5e", fontWeight: "600" }}
                            >
                              On time · 4 PM
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <StoryPhone v={v} />
            </div>
          </div>
        </div>
      </section>
      <section
        data-screen-label="The board"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          padding: "clamp(48px,8vw,80px) 16px clamp(64px,10vw,120px)",
        }}
      >
        <h2
          style={{
            margin: "0",
            textAlign: "center",
            fontSize: "clamp(2rem,5vw,4.5rem)",
            fontWeight: "800",
            letterSpacing: "-.03em",
            textWrap: "balance",
          }}
        >
          The board.
        </h2>
        <p
          style={{
            margin: "0",
            maxWidth: "640px",
            textAlign: "center",
            fontSize: "clamp(1rem,1.8vw,1.375rem)",
            color: "#b7c4bf",
            textWrap: "pretty",
          }}
        >
          Open it on any computer for the detailed work. Every load on one board, from first quote
          to paid, and the agent moves each card as the texts come in.
        </p>
        <div
          style={{
            width: "100%",
            maxWidth: "1400px",
            borderRadius: "14px",
            border: "1px solid #3a4540",
            background: "#0f1513",
            boxShadow: "0 40px 120px rgba(0,0,0,.6)",
            overflow: "hidden",
            fontFamily:
              "ui-sans-serif,system-ui,-apple-system,'Segoe UI',Helvetica,Arial,sans-serif",
            color: "#1b2420",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              background: "#222c28",
              borderBottom: "1px solid #3a4540",
            }}
          >
            <span
              style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f57" }}
            ></span>
            <span
              style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#febc2e" }}
            ></span>
            <span
              style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#28c840" }}
            ></span>
            <span
              style={{
                marginLeft: "12px",
                flex: "1",
                minWidth: "0",
                borderRadius: "6px",
                background: "#1b2420",
                color: "#b7c4bf",
                fontSize: "12px",
                padding: "5px 10px",
                fontFamily: "var(--font-mono)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <img
                src={transpiraLogo}
                alt=""
                style={{ width: "14px", height: "14px", display: "block" }}
              />
              app.manifest.link/ops
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                color: "#d5ddd9",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "#7fb09c",
                  animation: "ms-pulse 1.4s ease-in-out infinite",
                }}
              ></span>
              Live
            </span>
          </div>
          <div style={{ background: "#f4f6f5", display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,minmax(0,1fr))",
                borderBottom: "1px solid #e3e7e6",
              }}
            >
              {v.dashStats.map((s, i) => (
                <Fragment key={i}>
                  <div style={{ padding: "16px 20px", borderRight: "1px solid #e3e7e6" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
                        letterSpacing: ".06em",
                        textTransform: "uppercase",
                        color: "#868e8b",
                      }}
                    >
                      {s.k}
                    </div>
                    <div
                      style={{
                        fontSize: "26px",
                        fontWeight: "600",
                        letterSpacing: "-.02em",
                        marginTop: "4px",
                        color: s.color,
                      }}
                    >
                      {s.v}
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
            <div
              className="ms-dash-grid"
              style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 280px" }}
            >
              <Kanban />
              <div style={{ borderLeft: "1px solid #e3e7e6", background: "#fff", minWidth: "0" }}>
                <div
                  style={{
                    padding: "14px 20px 10px",
                    fontFamily: "var(--font-mono)",
                    fontSize: "10px",
                    letterSpacing: ".06em",
                    textTransform: "uppercase",
                    color: "#868e8b",
                    borderBottom: "1px solid #e3e7e6",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: "#7fb09c",
                      animation: "ms-pulse 1.4s ease-in-out infinite",
                    }}
                  ></span>
                  Agent activity
                </div>
                {v.dashFeed.map((e, i) => (
                  <Fragment key={i}>
                    <div
                      style={{
                        padding: "10px 20px",
                        borderBottom: "1px solid #e3e7e6",
                        fontSize: "13px",
                        lineHeight: "1.4",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "8px",
                          fontSize: "11px",
                          color: "#868e8b",
                        }}
                      >
                        <span style={{ fontWeight: "600", color: e.srcColor }}>{e.src}</span>
                        <span style={{ fontFamily: "var(--font-mono)" }}>{e.when}</span>
                      </div>
                      <div style={{ marginTop: "2px", textWrap: "pretty" }}>{e.text}</div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        data-screen-label="Close"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "18px",
          padding: "clamp(64px,12vw,120px) 24px",
          textAlign: "center",
        }}
      >
        <img
          src={transpiraLogo}
          alt="Transpira"
          style={{ width: "64px", height: "64px", display: "block", marginBottom: "12px" }}
        />
        <h2
          style={{
            margin: "0",
            fontSize: "clamp(2.5rem,6.4vw,6rem)",
            lineHeight: "1",
            letterSpacing: "-.03em",
            fontWeight: "800",
            color: "#868e8b",
          }}
        >
          Same phone.
        </h2>
        <h2
          style={{
            margin: "0",
            fontSize: "clamp(2.5rem,6.4vw,6rem)",
            lineHeight: "1",
            letterSpacing: "-.03em",
            fontWeight: "800",
          }}
        >
          One tap
          {" to say yes."}
        </h2>
        <p
          style={{
            margin: "24px 0 0",
            maxWidth: "640px",
            fontSize: "clamp(1rem,1.8vw,1.375rem)",
            color: "#b7c4bf",
            textWrap: "pretty",
          }}
        >
          It only texts you when it needs you.
        </p>
        <div style={{ marginTop: "24px" }}>
          <InlineCall where="close" />
        </div>
        <div className="ms-close-links">
          <Link className="ms-textlink" to="/pricing">
            Starts at $500 a month.
          </Link>
          <a className="ms-textlink" href={DEMO_URL} target="_blank" rel="noreferrer">
            Live demo
          </a>
        </div>
      </section>
    </div>
  );
}
