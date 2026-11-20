import { useEffect, useRef, useState } from "react";
import { PAINS } from "@/components/story/Pains";

/*
 * The problem, told as a road. A load passes five stops between a quote
 * request and getting paid, and each is a place it goes wrong. The section
 * pins to the window and scrolling down carries you sideways along the road,
 * past each stop in turn, with a truck keeping pace on the line underneath.
 *
 * The stops and their pictures are the ones written for the first walkthrough
 * (story/Pains). For people who ask for less motion nothing pins or slides:
 * the stops are simply listed down the page.
 */

// The road rests for a moment at each end before it starts and after it finishes moving.
const REST = 0.07;

export function ProblemRoad() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const strip = useRef<HTMLDivElement>(null);
  const [at, setAt] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const measure = () => {
      frame = 0;
      const t = track.current;
      const s = stage.current;
      const row = strip.current;
      if (!t || !s || !row) return;
      const range = Math.max(1, t.offsetHeight - s.offsetHeight);
      const raw = -t.getBoundingClientRect().top / range;
      const p = Math.min(1, Math.max(0, (raw - REST) / (1 - 2 * REST)));
      const travel = Math.max(0, row.scrollWidth - row.clientWidth);
      row.style.transform = `translate3d(${-p * travel}px, 0, 0)`;
      s.style.setProperty("--p", String(p));
      setAt(Math.round(p * (PAINS.length - 1)));
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={track} className="mf-road-track mf-dark" aria-labelledby="mf-road-title">
      <div ref={stage} className="mf-road">
        <div className="mf-wrap mf-road-head">
          <h2 id="mf-road-title" className="mf-h2 mf-h2--xl">
            Sound familiar?
          </h2>
          <p className="mf-lede">
            Five places a load goes wrong between the quote request and getting paid.
          </p>
        </div>

        <div ref={strip} className="mf-road-strip">
          {PAINS.map((p) => (
            <article key={p.stage} className="mf-pain">
              <p className="mf-pain-stage">{p.stage}</p>
              <h3 className="mf-pain-title">{p.title}</h3>
              <div className="mf-pain-art" aria-hidden="true">
                {p.art}
              </div>
              <p className="mf-pain-cost">{p.cost}</p>
            </article>
          ))}
        </div>

        <div className="mf-wrap mf-road-foot" aria-hidden="true">
          <ol className="mf-road-line">
            {PAINS.map((p, n) => (
              <li key={p.stage} data-on={n === at} data-past={n < at}>
                <span>{p.stage}</span>
              </li>
            ))}
            <li className="mf-road-truck">
              <svg width="34" height="22" viewBox="0 0 34 22" fill="none">
                <path d="M1 3h19v13H1z" fill="currentColor" />
                <path d="M20 7h7l6 5v4H20z" fill="currentColor" />
                <circle
                  cx="8"
                  cy="18"
                  r="3.2"
                  fill="#010304"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="26"
                  cy="18"
                  r="3.2"
                  fill="#010304"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
