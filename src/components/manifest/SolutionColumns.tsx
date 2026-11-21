import { useEffect, useRef, type ReactNode } from "react";

/*
 * The solution, set against the five problems before it: one column per
 * problem, each with a small pictogram of the thing it is about. On a wide screen the section
 * pins and the columns rise into place one after another as you scroll, each
 * tied to the scroll so it moves exactly as far as you do. On a narrow screen
 * nothing pins and each column rises once as it comes into view.
 *
 * TODO(before launch): the five sentences are new wording, built from what the
 * rest of the site says the agent does. Confirm them.
 */

/*
 * One pictogram per column, drawn to one recipe: a 2.5px ink outline, white
 * or amber fills, and a solid ink copy of the main shape set down and to the
 * right, so each reads as a thick object rather than a line drawing.
 */
const INK = "var(--mf-ink)";
const AMBER = "var(--mf-amber)";

/* A shape and its solid shadow. */
function Solid({ d, fill = "#ffffff" }: { d: string; fill?: string }) {
  return (
    <>
      <path d={d} fill={INK} transform="translate(5 5)" />
      <path d={d} fill={fill} />
    </>
  );
}

const PHONE =
  "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z";

const ITEMS: { title: string; body: string; art: ReactNode }[] = [
  {
    title: "Quotes in minutes",
    body: "It reads the request, checks what similar trips cost and drafts the price. You text back yes.",
    // A price tag.
    art: (
      <>
        <Solid d="M8 40 36 10h26v26L34 66Z" fill={AMBER} />
        <circle cx="51" cy="21" r="4" fill="#ffffff" />
        <text x="34" y="48" fontSize="24" textAnchor="middle" fill={INK}>
          $
        </text>
      </>
    ),
  },
  {
    title: "Carriers call it, not you",
    body: "It posts the load under its own number and collects the bids. You pick the truck.",
    // A ringing phone.
    art: (
      <g transform="translate(4 6) scale(2.6)" strokeWidth={2.5 / 2.6}>
        <Solid d={PHONE} fill={AMBER} />
        <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94" fill="none" />
      </g>
    ),
  },
  {
    title: "Paperwork it reads",
    body: "It sends the rate con and checks the W-9, license and insurance certificate before the truck rolls.",
    // A document, checked.
    art: (
      <>
        <Solid d="M12 6h28l14 14v46H12Z" />
        <path d="M40 6v14h14M21 30h22M21 39h22M21 48h10" fill="none" />
        <circle cx="50" cy="54" r="13" fill={AMBER} />
        <path d="m44 54 4.5 4.5L57 50" fill="none" />
      </>
    ),
  },
  {
    title: "The questions get asked",
    body: "It asks the customer for the weight before the quote goes out, so the right truck shows up.",
    // A message with a question in it.
    art: (
      <>
        <Solid
          d="M8 16a8 8 0 0 1 8-8h40a8 8 0 0 1 8 8v26a8 8 0 0 1-8 8H32L18 64V50h-2a8 8 0 0 1-8-8Z"
          fill={AMBER}
        />
        <text x="36" y="39" fontSize="28" textAnchor="middle" fill={INK}>
          ?
        </text>
      </>
    ),
  },
  {
    title: "Invoices it follows up",
    body: "It drafts the invoice on delivery and tells you each morning who still owes what.",
    // An invoice with a clock on it.
    art: (
      <>
        <Solid d="M10 6h40v60l-5-4-5 4-5-4-5 4-5-4-5 4-5-4-5 4Z" />
        <text x="30" y="30" fontSize="20" textAnchor="middle" fill={INK}>
          $
        </text>
        <path d="M19 40h22M19 49h12" fill="none" />
        <circle cx="52" cy="50" r="14" fill={AMBER} />
        <path d="M52 42v8l6 4" fill="none" />
      </>
    ),
  },
];

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className="mf-sol-icon"
      viewBox="0 0 76 76"
      stroke={INK}
      strokeWidth="2.5"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      {children}
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
                    <Icon>{item.art}</Icon>
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
