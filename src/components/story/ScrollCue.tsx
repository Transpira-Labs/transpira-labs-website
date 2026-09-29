import { useEffect, useState } from "react";
import { scrollNext } from "./scroll-next";

/** The floating "scroll ↓" cue: hidden over the hero (it has its own arrow) and at the end. */
export function ScrollCue() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const upd = () => {
      const de = document.documentElement;
      const y = window.scrollY || de.scrollTop;
      const vh = window.innerHeight;
      const h = Math.max(de.scrollHeight, document.body.scrollHeight);
      setOn(y > vh * 0.5 && y + vh < h - 140);
    };
    upd();
    window.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    // Sticky steps change the document height as they render.
    const t = window.setInterval(upd, 600);
    return () => {
      window.removeEventListener("scroll", upd);
      window.removeEventListener("resize", upd);
      window.clearInterval(t);
    };
  }, []);
  return (
    <div className="ms-scroll-cue" data-on={on ? "1" : "0"}>
      <i aria-hidden="true">scroll</i>
      <button
        type="button"
        onClick={scrollNext}
        aria-label="Scroll to the next step"
        tabIndex={on ? 0 : -1}
      >
        ↓
      </button>
    </div>
  );
}
