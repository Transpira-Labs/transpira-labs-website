import { useEffect, useRef } from "react";

/*
 * The solution, set against the five problems before it: one column per
 * problem, each with a small isometric drawing. On a wide screen the section
 * pins and the columns rise into place one after another as you scroll, each
 * tied to the scroll so it moves exactly as far as you do. On a narrow screen
 * nothing pins and each column rises once as it comes into view.
 *
 * TODO(before launch): the five sentences are new wording, built from what the
 * rest of the site says the agent does. Confirm them.
 */

type Box = [x: number, y: number, z: number, w: number, d: number, h: number, accent?: boolean];

const ITEMS: { title: string; body: string; boxes: Box[] }[] = [
  {
    title: "Quotes in minutes",
    body: "It reads the request, checks what similar trips cost and drafts the price. You text back yes.",
    boxes: [
      [0, 0, 0, 4.2, 3, 0.4],
      [0, 0, 0.75, 4.2, 3, 0.4],
      [0, 0, 1.5, 4.2, 3, 0.4, true],
    ],
  },
  {
    title: "Carriers call it, not you",
    body: "It posts the load under its own number and collects the bids. You pick the truck.",
    boxes: [
      [0, 0.9, 0, 2.6, 0.6, 4.4],
      [3.5, 0, 0, 1.1, 1.1, 1.1],
      [3.5, 2, 0, 1.1, 1.1, 1.1, true],
    ],
  },
  {
    title: "Paperwork it reads",
    body: "It sends the rate con and checks the W-9, license and insurance certificate before the truck rolls.",
    boxes: [
      [0, 0, 0, 0.45, 3, 3.3],
      [1.2, 0, 0, 0.45, 3, 4],
      [2.4, 0, 0, 0.45, 3, 3.3, true],
    ],
  },
  {
    title: "The questions get asked",
    body: "It asks the customer for the weight before the quote goes out, so the right truck shows up.",
    boxes: [
      [0, 0, 0, 4.4, 4.4, 0.5],
      [1.1, 1.1, 0.5, 2.2, 2.2, 2.3, true],
    ],
  },
  {
    title: "Invoices it follows up",
    body: "It drafts the invoice on delivery and tells you each morning who still owes what.",
    boxes: [
      [0, 0.4, 0, 2.2, 2.2, 0.5],
      [0, 0.4, 0.8, 2.2, 2.2, 0.5],
      [0, 0.4, 1.6, 2.2, 2.2, 0.5, true],
      [3.1, 0, 0, 0.4, 3, 3.6],
    ],
  },
];

/* A drawing made of boxes seen from above and to one side: white tops, black left faces. */
function Iso({ boxes }: { boxes: Box[] }) {
  const U = 13;
  const pt = (x: number, y: number, z: number): [number, number] => [
    (x - y) * 0.866 * U,
    ((x + y) * 0.5 - z) * U,
  ];
  const faces: { d: string; fill: string }[] = [];
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const [x, y, z, w, d, h, accent] of boxes) {
    const quad = (pts: [number, number][], fill: string) => {
      for (const [px, py] of pts) {
        minX = Math.min(minX, px);
        maxX = Math.max(maxX, px);
        minY = Math.min(minY, py);
        maxY = Math.max(maxY, py);
      }
      faces.push({
        d: `M${pts.map((p) => p.map((n) => n.toFixed(1)).join(" ")).join("L")}Z`,
        fill,
      });
    };
    quad(
      [pt(x, y + d, z + h), pt(x + w, y + d, z + h), pt(x + w, y + d, z), pt(x, y + d, z)],
      "var(--mf-ink)",
    );
    quad(
      [pt(x + w, y, z + h), pt(x + w, y + d, z + h), pt(x + w, y + d, z), pt(x + w, y, z)],
      "#ffffff",
    );
    quad(
      [pt(x, y, z + h), pt(x + w, y, z + h), pt(x + w, y + d, z + h), pt(x, y + d, z + h)],
      accent ? "var(--mf-amber)" : "#ffffff",
    );
  }
  const pad = 2;
  return (
    <svg
      aria-hidden="true"
      className="mf-sol-icon"
      viewBox={`${minX - pad} ${minY - pad} ${maxX - minX + pad * 2} ${maxY - minY + pad * 2}`}
      height={maxY - minY + pad * 2}
    >
      {faces.map((f, n) => (
        <path
          key={n}
          d={f.d}
          fill={f.fill}
          stroke="var(--mf-ink)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function SolutionColumns() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = track.current;
    const s = stage.current;
    if (!t || !s) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cols = [...s.querySelectorAll<HTMLElement>(".mf-sol-col > div")];
    const wide = window.matchMedia("(min-width: 1000px)");
    t.dataset.live = "true";

    // Narrow screens: each column rises once, when it comes into view.
    const seen = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).style.setProperty("--in", "1");
          seen.unobserve(e.target);
        }
      },
      { threshold: 0.25 },
    );

    let frame = 0;
    const measure = () => {
      frame = 0;
      if (!wide.matches) return;
      const range = Math.max(1, t.offsetHeight - s.offsetHeight);
      // Starts a little before the section pins, so the first column is arriving as the heading settles.
      const p = (-t.getBoundingClientRect().top + window.innerHeight * 0.35) / range;
      cols.forEach((c, n) => {
        // Each column takes a fifth of the scroll to arrive, and the next starts as it finishes.
        const q = Math.min(1, Math.max(0, p * (cols.length + 0.6) - n));
        c.style.setProperty("--in", ease(q).toFixed(3));
      });
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const mode = () => {
      cols.forEach((c) => {
        c.style.removeProperty("--in");
        if (wide.matches) seen.unobserve(c);
        else seen.observe(c);
      });
      queue();
    };
    mode();
    wide.addEventListener("change", mode);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      seen.disconnect();
      wide.removeEventListener("change", mode);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={track} className="mf-sol-track" aria-labelledby="mf-sol-title">
      <div ref={stage} className="mf-sol">
        <div className="mf-wrap">
          <h2 id="mf-sol-title" className="mf-h2 mf-h2--xl">
            One agent handles all five. You text back yes.
          </h2>
          <ul className="mf-sol-grid">
            {ITEMS.map((item) => (
              <li key={item.title} className="mf-sol-col">
                <div>
                  <span className="mf-sol-art">
                    <Iso boxes={item.boxes} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
