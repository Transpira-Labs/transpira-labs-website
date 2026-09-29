import type { CSSProperties, ReactNode } from "react";

/*
 * The people and gear a brokerage piles up as it grows, drawn as minimal
 * outlines. One broker's desk is tidy; by ten people it is a heap of phones,
 * laptops, a TMS and spreadsheets, all with something unread.
 */

type Kind = "person" | "phone" | "laptop" | "tms" | "sheet";
type Thing = { kind: Kind; color?: string; badge?: string };

const CLAY = "#d48a70";

/* Per level: the gear on top of the people passed in. */
const GEAR: Thing[][] = [
  [
    { kind: "phone", badge: "12" },
    { kind: "laptop", badge: "" },
  ],
  [
    { kind: "phone", badge: "31" },
    { kind: "phone", badge: "9" },
    { kind: "sheet" },
    { kind: "laptop", badge: "1,284" },
  ],
  [
    { kind: "tms", badge: "!" },
    { kind: "laptop", badge: "302" },
    { kind: "phone", badge: "48" },
    { kind: "sheet" },
    { kind: "phone", badge: "23" },
    { kind: "laptop", badge: "61" },
    { kind: "phone", badge: "17" },
    { kind: "sheet" },
    { kind: "phone", badge: "9" },
    { kind: "laptop", badge: "1,439" },
    { kind: "phone", badge: "6" },
  ],
];

/* Deterministic noise, so the mess is the same mess on every visit. */
const rand = (i: number, salt: number) => {
  const s = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return s - Math.floor(s);
};

function Glyph({ t }: { t: Thing }) {
  const badge = t.badge ? (
    <span
      style={{
        position: "absolute",
        top: "-8px",
        right: "-9px",
        minWidth: "16px",
        height: "16px",
        borderRadius: "8px",
        background: "#e0202a",
        color: "#fff",
        fontSize: "9.5px",
        fontWeight: "700",
        display: "grid",
        placeItems: "center",
        padding: "0 4px",
        boxSizing: "border-box",
        animation: "ms-pulse 1.4s ease-in-out infinite",
      }}
    >
      {t.badge}
    </span>
  ) : null;
  const box = (style: CSSProperties, children?: ReactNode) => (
    <div style={{ position: "relative", ...style }}>
      {children}
      {badge}
    </div>
  );
  switch (t.kind) {
    case "person":
      return (
        <svg
          width="20"
          height="25"
          viewBox="0 0 24 30"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <circle cx="12" cy="7" r="6" fill={t.color} />
          <path d="M1 30v-5c0-6 5-10 11-10s11 4 11 10v5z" fill={t.color} />
        </svg>
      );
    case "phone":
      return box({
        width: "20px",
        height: "36px",
        borderRadius: "6px",
        border: `2px solid ${CLAY}`,
        background: "#1b2420",
      });
    case "laptop":
      return box(
        { display: "flex", flexDirection: "column", alignItems: "center" },
        <>
          <div
            style={{
              width: "44px",
              height: "28px",
              borderRadius: "3px",
              border: `2px solid ${CLAY}`,
              background: "#1b2420",
            }}
          />
          <div
            style={{
              width: "54px",
              height: "4px",
              borderRadius: "0 0 3px 3px",
              background: "rgba(255,255,255,.35)",
            }}
          />
        </>,
      );
    case "tms":
      return box(
        {
          width: "50px",
          height: "34px",
          borderRadius: "3px",
          border: `2px solid ${CLAY}`,
          background: "#1b2420",
          overflow: "visible",
        },
        <>
          <div style={{ height: "6px", background: CLAY }} />
          <div
            style={{
              fontFamily: "ui-monospace,Menlo,monospace",
              fontSize: "9px",
              fontWeight: "700",
              color: CLAY,
              textAlign: "center",
              marginTop: "5px",
            }}
          >
            TMS
          </div>
        </>,
      );
    case "sheet":
      return box({
        width: "30px",
        height: "38px",
        borderRadius: "2px",
        border: `2px solid ${CLAY}`,
        background: "#1b2420",
        backgroundImage: `repeating-linear-gradient(0deg, transparent 0 7px, rgba(212,138,112,.5) 7px 8px), linear-gradient(90deg, transparent 0 13px, rgba(212,138,112,.5) 13px 14px, transparent 14px)`,
      });
  }
}

export function TeamScene({ level, people }: { level: 0 | 1 | 2; people: string[] }) {
  const things: Thing[] = [
    ...GEAR[level],
    ...people.map((color) => ({ kind: "person" as const, color })),
  ];
  const n = things.length;
  return (
    <div
      aria-hidden="true"
      style={{ position: "relative", width: "100%", maxWidth: "260px", height: "140px" }}
    >
      {things.map((t, i) => {
        let left: number;
        let top: number;
        let rot = 0;
        if (level === 0) {
          // A tidy desk: one row, level, evenly spaced.
          left = 30 + i * 20;
          top = 55;
        } else if (level === 1) {
          // Starting to slide: a loose row, a little tilted and overlapping.
          left = 12 + (i / (n - 1)) * 70 + (rand(i, 1) - 0.5) * 10;
          top = 45 + (rand(i, 2) - 0.5) * 30;
          rot = (rand(i, 3) - 0.5) * 16;
        } else {
          // A heap: anywhere, any angle, on top of each other.
          left = 4 + rand(i, 4) * 78;
          top = 16 + rand(i, 5) * 64;
          rot = (rand(i, 6) - 0.5) * 50;
        }
        return (
          <div
            key={i}
            className={level === 2 ? "ms-jiggle" : undefined}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: `${top}%`,
              transform: `translate(-50%,-50%) rotate(${rot}deg)`,
              zIndex: t.kind === "person" ? 2 : 1,
              animationDelay: `${rand(i, 7) * 1.5}s`,
            }}
          >
            <Glyph t={t} />
          </div>
        );
      })}
    </div>
  );
}
