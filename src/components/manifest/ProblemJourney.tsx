import { useEffect, useRef, useState } from "react";

/*
 * The problem section, as a journey. The window pins, and scrolling moves a
 * camera along one road, past the five places a load goes wrong, turning
 * around each as it goes. The five are listed at the lower left; the one the
 * camera is at opens up, and a line beside it fills as you scroll through it.
 *
 * The 3D library is fetched only when the section is close, so it adds nothing
 * to the first load. Where there is no WebGL, or the visitor asks for less
 * motion, nothing pins: the five are simply listed, all open.
 *
 * TODO(before launch): the sentences under each title are drawn from the
 * pictures in the first walkthrough (the 31 hours, the 40 calls, the $150 dry
 * run, invoice 1042). They are illustrative. Confirm them.
 */
const PAINS: { title: string; body: string; cost: string }[] = [
  {
    title: "The quote.",
    body: "The request sits in the inbox for 31 hours. The answer, when it comes: never mind, we found a truck.",
    cost: "Too slow. Load lost.",
  },
  {
    title: "The phone.",
    body: "One load goes up on the boards and the phone does not stop. Most of the calls are missed.",
    cost: "40 calls, one posting.",
  },
  {
    title: "The COI.",
    body: "The rate con and the certificate of insurance arrive, and go to spam with the cruise offers.",
    cost: "In spam. Truck gone.",
  },
  {
    title: "The weight.",
    body: "The posting never said what it weighed. The truck shows up, can't take it, and bills a $150 dry run.",
    cost: "Nobody asked.",
  },
  {
    title: "The payment.",
    body: "The load delivered. The invoice went out, its date passed, and nobody followed up.",
    cost: "Never chased.",
  },
];

// The scene rests for a moment at each end before the camera sets off and after it arrives.
const REST = 0.05;

export function ProblemJourney() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [at, setAt] = useState(0);
  // "flat" is the version with no pin and no 3D. It is what the server sends and what stays if 3D can't run.
  const [flat, setFlat] = useState(true);

  useEffect(() => {
    const t = track.current;
    const s = stage.current;
    const c = canvas.current;
    if (!t || !s || !c) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;

    let scene: import("./problem-scene").ProblemScene | null = null;
    let gone = false;
    let frame = 0;

    const measure = () => {
      frame = 0;
      const range = Math.max(1, t.offsetHeight - s.offsetHeight);
      const raw = -t.getBoundingClientRect().top / range;
      const p = Math.min(1, Math.max(0, (raw - REST) / (1 - 2 * REST)));
      const steps = p * (PAINS.length - 1);
      const index = Math.min(PAINS.length - 1, Math.round(steps));
      setAt(index);
      // How far through the current one, for the line beside it: half a step either side of each stop.
      s.style.setProperty("--fill", String(Math.min(1, Math.max(0, steps - index + 0.5))));
      scene?.setProgress(p);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    const onResize = () => {
      scene?.resize();
      queue();
    };

    setFlat(false);
    // Fetch the 3D only once the section is within a couple of screens.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        import("./problem-scene")
          .then((m) => {
            if (gone) return;
            scene = m.createProblemScene(c);
            s.dataset.ready = "true";
            measure();
          })
          .catch(() => setFlat(true));
      },
      { rootMargin: "200% 0px" },
    );
    near.observe(t);

    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", onResize);
    queue();
    return () => {
      gone = true;
      near.disconnect();
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", onResize);
      if (frame) cancelAnimationFrame(frame);
      scene?.dispose();
    };
  }, []);

  return (
    <section
      ref={track}
      className="mf-journey-track"
      data-flat={flat}
      aria-labelledby="mf-journey-title"
    >
      <div ref={stage} className="mf-journey">
        <canvas ref={canvas} className="mf-journey-canvas" aria-hidden="true" />
        <div className="mf-wrap mf-journey-in">
          <h2 id="mf-journey-title" className="mf-h2 mf-h2--xl">
            Sound familiar?
          </h2>
          <ol className="mf-journey-list">
            {PAINS.map((p, n) => (
              <li key={p.title} data-on={flat || n === at}>
                <span className="mf-journey-n">{String(n + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{p.title}</h3>
                  <div className="mf-journey-more">
                    <div>
                      <p>{p.body}</p>
                      <p className="mf-journey-cost">{p.cost}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
