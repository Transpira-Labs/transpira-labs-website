import type { CSSProperties, ReactNode } from "react";
import transpiraLogo from "@/assets/transpira-logo.png";
import { ChannelLogo, type Channel } from "./ChannelLogo";

/*
 * "Zero friction", shown rather than told: one agent in the middle, and each
 * message leaving on the channel that person already uses, drawn the way it
 * looks in that app.
 */

type Out = {
  /** Omitted for load boards, which get the truck tile instead of a brand logo. */
  channel?: Channel;
  label: string;
  to: string;
  role: string;
  body: ReactNode;
};

const OUT: Out[] = [
  {
    label: "DAT · Truckstop",
    to: "all carriers",
    role: "posting",
    body: (
      <div
        style={{
          flex: "1",
          background: "#fff",
          color: "#1b2420",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial,Helvetica,sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "7px 12px",
            background: "#eef4fb",
            fontSize: "10.5px",
            fontWeight: "700",
            letterSpacing: ".04em",
            color: "#0f6cbd",
          }}
        >
          <span>LOAD POSTED</span>
          <span style={{ fontWeight: "400", color: "#5f6368" }}>8:41 AM</span>
        </div>
        <div style={{ padding: "10px 12px", display: "flex", flexDirection: "column", gap: "5px" }}>
          <div style={{ fontSize: "14px", fontWeight: "700" }}>Macon, GA → Raleigh, NC</div>
          <div style={{ fontSize: "12px", color: "#5f6368" }}>Thu · Flatbed · 8,640 lb</div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <span style={{ fontSize: "18px", fontWeight: "700", color: "#2f6f5e" }}>$1,750</span>
            <span style={{ fontSize: "11.5px", color: "#5f6368" }}>Carriers text the agent</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    channel: "Telegram",
    label: "Telegram",
    to: "Bluegrass",
    role: "carrier",
    body: (
      <Chat bg="linear-gradient(160deg,#d6e6c4,#b8d4ae)">
        <Bubble bg="#effdde" meta="8:42" ticks="✓✓" tickColor="#4fae4e">
          L-2038 Suburban is released. Still good for $900? Pickup Thu, yard closes 3 PM.
        </Bubble>
      </Chat>
    ),
  },
  {
    channel: "WhatsApp",
    label: "WhatsApp",
    to: "Marcus",
    role: "driver",
    body: (
      <Chat bg="#efeae2">
        <Bubble bg="#d9fdd3" meta="8:44" ticks="✓✓" tickColor="#53bdeb">
          Pickup Thu 9 AM at Caldwell Equipment, Macon. Lot opens at 7. Send a BOL photo when loaded
          👍
        </Bubble>
      </Chat>
    ),
  },
  {
    channel: "Gmail",
    label: "Gmail",
    to: "Erin",
    role: "customer",
    body: (
      <div
        style={{
          flex: "1",
          background: "#fff",
          color: "#202124",
          padding: "12px 14px",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          fontFamily: "Arial,Helvetica,sans-serif",
        }}
      >
        <div style={{ fontSize: "14px", fontWeight: "700" }}>Re: Kubota to Raleigh</div>
        <div style={{ fontSize: "11.5px", color: "#5f6368" }}>
          <b style={{ color: "#202124" }}>Sam</b> to Erin · 8:07 AM
        </div>
        <div style={{ fontSize: "13px", lineHeight: "1.45" }}>
          Hi Erin, it's $2,100 to move the Kubota from Macon to Raleigh, pickup Thursday.
        </div>
      </div>
    ),
  },
  {
    channel: "Messages",
    label: "SMS",
    to: "Tyler",
    role: "customer",
    body: (
      <div
        style={{
          flex: "1",
          background: "#fff",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          gap: "3px",
          fontFamily: "-apple-system,BlinkMacSystemFont,'Helvetica Neue',system-ui,sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "88%",
            background: "#34c759",
            color: "#fff",
            borderRadius: "17px",
            padding: "8px 12px",
            fontSize: "13.5px",
            lineHeight: "1.32",
          }}
        >
          Your Ford Expedition is loaded. ETA Little Rock Friday around 2 PM.
        </div>
        <div style={{ fontSize: "10.5px", color: "#8e8e93" }}>Delivered</div>
      </div>
    ),
  },
];

function Chat({ bg, children }: { bg: string; children: ReactNode }) {
  return (
    <div
      style={{
        flex: "1",
        background: bg,
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        fontFamily: "-apple-system,BlinkMacSystemFont,'Helvetica Neue',system-ui,sans-serif",
      }}
    >
      {children}
    </div>
  );
}

function Bubble({
  bg,
  meta,
  ticks,
  tickColor,
  children,
}: {
  bg: string;
  meta: string;
  ticks: string;
  tickColor: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        maxWidth: "92%",
        background: bg,
        color: "#111",
        borderRadius: "12px 12px 3px 12px",
        padding: "7px 10px 5px",
        fontSize: "13.5px",
        lineHeight: "1.35",
        boxShadow: "0 1px 1px rgba(0,0,0,.12)",
      }}
    >
      {children}
      <div
        style={{
          marginTop: "2px",
          textAlign: "right",
          fontSize: "10.5px",
          color: "#667781",
          letterSpacing: "-.02em",
        }}
      >
        {meta} <span style={{ color: tickColor }}>{ticks}</span>
      </div>
    </div>
  );
}

const mono: CSSProperties = {
  fontFamily: "ui-monospace,Menlo,monospace",
  fontSize: "10.5px",
  letterSpacing: ".08em",
  textTransform: "uppercase",
};

/* ---- Coming in: calls the agent picks up for you ---- */

/* ---- Comes in: every place work arrives ---- */

const GLYPH = {
  call: "M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.25 1.01l-2.2 2.2z",
  voicemail:
    "M18.5 6C15.46 6 13 8.46 13 11.5c0 1.33.47 2.55 1.26 3.5H9.74c.79-.95 1.26-2.17 1.26-3.5C11 8.46 8.54 6 5.5 6S0 8.46 0 11.5 2.46 17 5.5 17h13c3.04 0 5.5-2.46 5.5-5.5S21.54 6 18.5 6zm-13 9C3.57 15 2 13.43 2 11.5S3.57 8 5.5 8 9 9.57 9 11.5 7.43 15 5.5 15zm13 0c-1.93 0-3.5-1.57-3.5-3.5S16.57 8 18.5 8 22 9.57 22 11.5 20.43 15 18.5 15z",
  truck:
    "M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9 1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z",
  table:
    "M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z",
};

/** An app-icon tile: a white glyph on a coloured rounded square. */
function Tile({ d, bg, size = 32 }: { d: string; bg: string; size?: number }) {
  return (
    <span
      style={{
        width: size,
        height: size,
        flex: "none",
        borderRadius: size * 0.24,
        background: bg,
        display: "grid",
        placeItems: "center",
      }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.6} height={size * 0.6} aria-hidden="true">
        <path d={d} fill="#fff" />
      </svg>
    </span>
  );
}

const GREEN = "linear-gradient(180deg,#5ef27a,#28c840)";

const SOURCES: { icon: ReactNode; name: string; what: string }[] = [
  { icon: <ChannelLogo channel="Gmail" size={32} />, name: "Gmail", what: "Quote request" },
  { icon: <Tile d={GLYPH.call} bg={GREEN} />, name: "Call", what: "Carrier calling" },
  { icon: <Tile d={GLYPH.voicemail} bg={GREEN} />, name: "Voicemail", what: "Transcribed" },
  { icon: <Tile d={GLYPH.truck} bg="#0f6cbd" />, name: "Load board", what: "New bid $1,750" },
  { icon: <Tile d={GLYPH.table} bg="#46617a" />, name: "TMS", what: "Load created" },
  { icon: <ChannelLogo channel="WhatsApp" size={32} />, name: "WhatsApp", what: "BOL photo" },
];

/* ---- What the agent builds from it: your load board ---- */

const BOARD: { stage: string; cards: [string, string][] }[] = [
  {
    stage: "Quoting",
    cards: [
      ["Kubota tractor", "$2,100 quoted"],
      ["John Deere", "Draft ready"],
    ],
  },
  { stage: "Covering", cards: [["Suburban", "2 bids in"]] },
  { stage: "On the road", cards: [["CAT 305", "ETA 4 PM"]] },
  { stage: "Paid", cards: [["Bobcat S650", "$320 margin"]] },
];

function LoadBoard() {
  let n = 0;
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "680px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ ...mono, color: "#7fb09c" }}>Builds your load board</span>
        <span
          style={{ ...mono, display: "flex", alignItems: "center", gap: "6px", color: "#7fb09c" }}
        >
          <span
            className="ms-ping"
            style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#34c759" }}
          />
          Live
        </span>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,minmax(0,1fr))",
          background: "#f4f6f5",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,.45)",
        }}
      >
        {BOARD.map((col, i) => (
          <div
            key={col.stage}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "6px",
              padding: "8px 6px 10px",
              minWidth: "0",
              borderRight: i < BOARD.length - 1 ? "1px solid #e3e7e6" : "none",
            }}
          >
            <span
              style={{
                ...mono,
                fontSize: "9.5px",
                color: "#868e8b",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {col.stage}
            </span>
            {col.cards.map(([title, meta]) => (
              <div
                key={title}
                style={{
                  background: "#fff",
                  border: "1px solid #e3e7e6",
                  borderRadius: "7px",
                  padding: "6px 7px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1px",
                  animation: `ms-popin .5s ${0.2 + n++ * 0.25}s cubic-bezier(.2,.9,.3,1.15) both`,
                }}
              >
                <span
                  style={{
                    fontSize: "11.5px",
                    fontWeight: "600",
                    color: "#1b2420",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {title}
                </span>
                <span style={{ fontSize: "10.5px", color: "#2f6f5e", fontWeight: "600" }}>
                  {meta}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Wires({ xs, into }: { xs: number[]; into?: boolean }) {
  return (
    <svg
      className="ms-fan-wires"
      viewBox="0 0 1000 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ width: "100%", height: "64px", display: "block" }}
    >
      {xs.map((x) => (
        <path
          key={x}
          d={into ? `M${x} 0 C ${x} 55, 500 45, 500 100` : `M500 0 C 500 55, ${x} 45, ${x} 100`}
          fill="none"
          stroke="#7fb09c"
          strokeOpacity=".7"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          vectorEffect="non-scaling-stroke"
          className="ms-flow"
        />
      ))}
    </svg>
  );
}

function Rail({ always }: { always?: boolean }) {
  return (
    <svg
      className={always ? undefined : "ms-fan-rail"}
      viewBox="0 0 2 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      style={{ width: "2px", height: "36px" }}
    >
      <path
        d="M1 0 V100"
        stroke="#7fb09c"
        strokeOpacity=".7"
        strokeWidth="1.5"
        strokeDasharray="5 7"
        vectorEffect="non-scaling-stroke"
        className="ms-flow"
      />
    </svg>
  );
}

function RowLabel({ children }: { children: ReactNode }) {
  return <div style={{ ...mono, color: "#868e8b", margin: "0 0 12px" }}>{children}</div>;
}

export function FanOut() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "18px",
        textAlign: "left",
      }}
    >
      <RowLabel>Comes in from anywhere</RowLabel>
      <div className="ms-src-grid" style={{ width: "100%" }}>
        {SOURCES.map((x, i) => (
          <div
            key={x.name}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
              padding: "14px 8px 12px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,.14)",
              background: "#232b28",
              textAlign: "center",
            }}
          >
            <span style={{ position: "relative" }}>
              {x.icon}
              <span
                className="ms-ping"
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-6px",
                  width: "12px",
                  height: "12px",
                  borderRadius: "50%",
                  background: "#e0202a",
                  border: "2px solid #232b28",
                  animationDelay: `${i * 0.35}s`,
                }}
              />
            </span>
            <span style={{ fontSize: "13px", fontWeight: "600", color: "#fff" }}>{x.name}</span>
            <span style={{ fontSize: "12px", color: "#b7c4bf", lineHeight: "1.25" }}>{x.what}</span>
          </div>
        ))}
      </div>
      <Wires xs={[83, 250, 417, 583, 750, 917]} into />
      <Rail />

      {/* the agent */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderRadius: "999px",
          border: "1px solid rgba(127,176,156,.55)",
          background: "rgba(47,111,94,.22)",
          boxShadow: "0 0 50px rgba(127,176,156,.25)",
          padding: "8px 18px 8px 8px",
        }}
      >
        <img
          src={transpiraLogo}
          alt="Transpira"
          style={{ width: "36px", height: "36px", display: "block" }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          <span style={{ fontSize: "15px", fontWeight: "600", color: "#fff" }}>Manifest agent</span>
          <span style={{ ...mono, color: "#7fb09c" }}>Answers and sends as you</span>
        </div>
      </div>

      <Rail always />
      <LoadBoard />
      <Wires xs={[100, 300, 500, 700, 900]} />
      <Rail />
      <RowLabel>Goes out where they already are</RowLabel>

      {/* where each message lands: a row on desktop, a swipeable strip on phones */}
      <div className="ms-fan-grid" style={{ width: "100%" }}>
        {OUT.map((o) => (
          <div
            key={o.label}
            className="ms-fan-card"
            style={{
              display: "flex",
              flexDirection: "column",
              borderRadius: "14px",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,.14)",
              background: "#232b28",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderBottom: "1px solid rgba(255,255,255,.1)",
              }}
            >
              {o.channel ? (
                <ChannelLogo channel={o.channel} size={24} />
              ) : (
                <Tile d={GLYPH.truck} bg="#0f6cbd" size={24} />
              )}
              <div style={{ display: "flex", flexDirection: "column", minWidth: "0" }}>
                <span style={{ fontSize: "14px", fontWeight: "600", color: "#fff" }}>
                  {o.label}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#b7c4bf",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  to {o.to} · {o.role}
                </span>
              </div>
            </div>
            {o.body}
          </div>
        ))}
      </div>
    </div>
  );
}
