import { useEffect, useRef, useState, type CSSProperties } from "react";

/*
 * The board in "The board." section, draggable. Mouse users can grab a card
 * anywhere; on touch screens the grip (⋮⋮) is the handle, so swiping the rest
 * of the board still scrolls the page and the board as normal.
 */

type Card = {
  id: string;
  badge: string;
  badgeBg: string;
  badgeFg: string;
  title: string;
  lane: string;
  meta: string;
  focus?: boolean;
};

const AMBER = ["#fbf1dd", "#8a6414"] as const;
const GREEN = ["#eef5f1", "#2f6f5e"] as const;
const CLAY = ["#f8e6df", "#b04a2d"] as const;

const c = (
  id: string,
  [badgeBg, badgeFg]: readonly [string, string],
  badge: string,
  title: string,
  lane: string,
  meta: string,
  focus?: boolean,
): Card => ({ id, badge, badgeBg, badgeFg, title, lane, meta, focus });

const CARDS: Record<string, Card> = Object.fromEntries(
  [
    c(
      "L-2047",
      AMBER,
      "Needs you",
      "John Deere 5075E",
      "Athens → Charlotte",
      "Draft $1,900 · waiting on your tap",
    ),
    c("L-2041", GREEN, "New", "Kubota tractor", "Macon → Raleigh", "Sell $2,100 · 2 bids", true),
    c(
      "L-2038",
      AMBER,
      "Waiting",
      "Ford Expedition",
      "Houston → Little Rock",
      "Sell $1,150 · held for release",
    ),
    c(
      "L-2044",
      AMBER,
      "Paperwork 4/5",
      "Bobcat S650",
      "Tampa → Savannah",
      "Delta Haul · COI fixed",
    ),
    c("L-2049", GREEN, "Tracking", "Kubota M7-172", "Macon → Charlotte", "On time · ETA 4 PM"),
    c("L-2045", CLAY, "Detention", "CAT 305 excavator", "Valdosta → Mobile", "Driver waiting 2 h"),
    c("L-2036", AMBER, "Unpaid", "Honda Odyssey", "Providence → Newark", "Invoice sent · $750"),
    c("L-2031", GREEN, "Paid", "Bobcat T770", "Augusta → Columbia", "Margin $320"),
    c("L-2029", GREEN, "Paid", "Toyota Tacoma", "Atlanta → Nashville", "Margin $180"),
  ].map((x) => [x.id, x]),
);

const STAGES = ["Quoting", "Finding a truck", "Booked", "On the road", "Delivered", "Paid"];

const START: string[][] = [
  ["L-2047"],
  ["L-2041", "L-2038"],
  ["L-2044"],
  ["L-2049", "L-2045"],
  ["L-2036"],
  ["L-2031", "L-2029"],
];

type Drag = { id: string; from: number; dx: number; dy: number; x: number; y: number; w: number };

export function Kanban() {
  const [cols, setCols] = useState(START);
  const [drag, setDrag] = useState<Drag | null>(null);
  const [over, setOver] = useState<{ col: number; index: number } | null>(null);
  const [moved, setMoved] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const pending = useRef<{
    id: string;
    from: number;
    x: number;
    y: number;
    el: HTMLElement;
  } | null>(null);
  const dragRef = useRef<Drag | null>(null);
  dragRef.current = drag;

  /* Where would the card land if dropped at (x, y)? */
  const target = (x: number, y: number) => {
    const el = document.elementFromPoint(x, y)?.closest<HTMLElement>("[data-col]");
    if (!el) return null;
    const col = Number(el.dataset.col);
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]")).filter(
      (n) => n.dataset.card !== dragRef.current?.id,
    );
    let index = cards.length;
    for (let i = 0; i < cards.length; i++) {
      const r = cards[i].getBoundingClientRect();
      if (y < r.top + r.height / 2) {
        index = i;
        break;
      }
    }
    return { col, index };
  };

  // Scroll the board sideways while a card is held near its edge.
  useEffect(() => {
    if (!drag) return;
    let raf = 0;
    const tick = () => {
      const d = dragRef.current;
      const sc = scroller.current;
      if (d && sc) {
        const r = sc.getBoundingClientRect();
        const edge = Math.min(60, r.width * 0.15);
        if (d.x < r.left + edge) sc.scrollLeft -= 10;
        else if (d.x > r.right - edge) sc.scrollLeft += 10;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [drag]);

  const onDown = (e: React.PointerEvent<HTMLElement>, id: string, from: number) => {
    const handle = (e.target as HTMLElement).closest("[data-grip]");
    if (e.pointerType !== "mouse" && !handle) return;
    if (e.button !== 0) return;
    const el = e.currentTarget;
    el.setPointerCapture(e.pointerId);
    pending.current = { id, from, x: e.clientX, y: e.clientY, el };
    // Touch drags start right away from the grip; mice wait for a small move
    // so a plain click doesn't pick the card up.
    if (handle && e.pointerType !== "mouse") start(e.clientX, e.clientY);
  };

  const start = (x: number, y: number) => {
    const p = pending.current;
    if (!p) return;
    const r = p.el.getBoundingClientRect();
    setDrag({ id: p.id, from: p.from, dx: p.x - r.left, dy: p.y - r.top, x, y, w: r.width });
    setMoved(null);
  };

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const p = pending.current;
    if (!p) return;
    if (!dragRef.current) {
      if (Math.hypot(e.clientX - p.x, e.clientY - p.y) > 5) start(e.clientX, e.clientY);
      return;
    }
    setDrag({ ...dragRef.current, x: e.clientX, y: e.clientY });
    setOver(target(e.clientX, e.clientY));
  };

  const onUp = (e: React.PointerEvent<HTMLElement>) => {
    const d = dragRef.current;
    pending.current = null;
    if (d) {
      const t = target(e.clientX, e.clientY);
      if (t) {
        setCols((prev) => {
          const next = prev.map((col) => col.filter((id) => id !== d.id));
          next[t.col].splice(t.index, 0, d.id);
          return next;
        });
        if (t.col !== d.from) setMoved(`${d.id} moved to ${STAGES[t.col]}`);
      }
    }
    setDrag(null);
    setOver(null);
  };

  const mono: CSSProperties = {
    fontFamily: "ui-monospace,Menlo,monospace",
    fontSize: "10.5px",
    letterSpacing: ".06em",
    textTransform: "uppercase",
  };

  const cardBody = (card: Card, grip: boolean) => (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {grip && (
            <span
              data-grip
              aria-hidden="true"
              style={{
                touchAction: "none",
                cursor: "grab",
                color: "#b3bab7",
                fontSize: "14px",
                lineHeight: "1",
                letterSpacing: "-3px",
                padding: "10px 8px 10px 4px",
                margin: "-10px 0 -10px -4px",
              }}
            >
              ⋮⋮
            </span>
          )}
          <span
            style={{
              fontFamily: "ui-monospace,Menlo,monospace",
              fontSize: "11px",
              color: "#868e8b",
              whiteSpace: "nowrap",
            }}
          >
            {card.id}
          </span>
        </span>
        <span
          style={{
            fontSize: "10.5px",
            fontWeight: "600",
            borderRadius: "99px",
            padding: "2px 8px",
            background: card.badgeBg,
            color: card.badgeFg,
            whiteSpace: "nowrap",
          }}
        >
          {card.badge}
        </span>
      </div>
      <div style={{ fontSize: "14.5px", fontWeight: "600", lineHeight: "1.2" }}>{card.title}</div>
      <div style={{ fontSize: "12.5px", color: "#565f5c" }}>{card.lane}</div>
      <div
        style={{
          fontSize: "12.5px",
          color: "#1b2420",
          borderTop: "1px solid #eef1f0",
          paddingTop: "6px",
          marginTop: "2px",
        }}
      >
        {card.meta}
      </div>
    </>
  );

  const cardStyle = (card: Card): CSSProperties => ({
    background: "#fff",
    border: card.focus ? "1px solid #2f6f5e" : "1px solid #e3e7e6",
    boxShadow: card.focus ? "0 0 0 3px rgba(47,111,94,.15)" : "none",
    borderRadius: "10px",
    padding: "12px",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    userSelect: "none",
    WebkitUserSelect: "none",
  });

  return (
    <div style={{ position: "relative", minWidth: "0" }}>
      <div
        aria-live="polite"
        style={{
          ...mono,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "8px 14px",
          borderBottom: "1px solid #e3e7e6",
          background: moved ? "#e4f0ea" : "#f4f6f5",
          color: "#2f6f5e",
          transition: "background .3s",
        }}
      >
        <span style={{ fontSize: "13px" }}>{moved ? "✓" : "✋"}</span>
        {moved ?? "Try it: drag a card to another stage"}
      </div>
      <div ref={scroller} style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6,minmax(170px,1fr))",
            minWidth: "1020px",
            minHeight: "460px",
          }}
        >
          {cols.map((ids, ci) => {
            const hot = over?.col === ci;
            return (
              <div
                key={STAGES[ci]}
                data-col={ci}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  minWidth: "0",
                  padding: "14px 12px",
                  borderRight: ci < STAGES.length - 1 ? "1px solid #e3e7e6" : "none",
                  background: hot ? "#e4f0ea" : ci === 1 ? "#eef5f1" : "transparent",
                  transition: "background .15s",
                }}
              >
                <div
                  style={{
                    ...mono,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    color: ci === 1 || hot ? "#2f6f5e" : "#868e8b",
                  }}
                >
                  <span>{STAGES[ci]}</span>
                  <span>{ids.length}</span>
                </div>
                {ids.map((id, i) => {
                  const card = CARDS[id];
                  const lifted = drag?.id === id;
                  return (
                    <div key={id} style={{ display: "contents" }}>
                      {hot && over?.index === i && drag && (
                        <div
                          style={{ height: "4px", borderRadius: "2px", background: "#2f6f5e" }}
                        />
                      )}
                      <div
                        data-card={id}
                        onPointerDown={(e) => onDown(e, id, ci)}
                        onPointerMove={onMove}
                        onPointerUp={onUp}
                        onPointerCancel={onUp}
                        style={{
                          ...cardStyle(card),
                          cursor: "grab",
                          opacity: lifted ? 0.35 : 1,
                        }}
                      >
                        {cardBody(card, true)}
                      </div>
                    </div>
                  );
                })}
                {hot && drag && over?.index === ids.filter((x) => x !== drag.id).length && (
                  <div style={{ height: "4px", borderRadius: "2px", background: "#2f6f5e" }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* the card under the pointer while dragging */}
      {drag && (
        <div
          style={{
            ...cardStyle(CARDS[drag.id]),
            position: "fixed",
            left: drag.x - drag.dx,
            top: drag.y - drag.dy,
            width: drag.w,
            boxSizing: "border-box",
            zIndex: 9600,
            pointerEvents: "none",
            transform: "rotate(-2deg) scale(1.03)",
            boxShadow: "0 18px 40px rgba(0,0,0,.35)",
            color: "#1b2420",
          }}
        >
          {cardBody(CARDS[drag.id], true)}
        </div>
      )}
    </div>
  );
}
