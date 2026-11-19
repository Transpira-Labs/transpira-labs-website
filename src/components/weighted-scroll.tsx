import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

/*
 * Gives wheel and trackpad scrolling some weight: the page eases toward where
 * you scrolled to and settles, instead of moving the instant the wheel does.
 * Lower `lerp` is heavier; 0.1 is the library's default.
 *
 * Touch scrolling is left alone, since a phone already has its own momentum,
 * and so is everything for people who ask for less motion.
 */
const WEIGHT = 0.07;

export function WeightedScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: WEIGHT, wheelMultiplier: 0.9, anchors: true });
    let frame = requestAnimationFrame(function tick(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
  return null;
}
