import type { KeyboardEvent } from "react";
import { STOPS, type HomeVals, type Stop } from "./home-logic";

/* One stop on the "one load" road. The five together are a tab list. */
export function StopTab({ stop, n, v }: { stop: Stop; n: number; v: HomeVals }) {
  const active = v.tab === n;
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const to =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (n + 1) % STOPS.length
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (n + STOPS.length - 1) % STOPS.length
          : -1;
    if (to < 0) return;
    e.preventDefault();
    v.pickStop(to);
    document.getElementById(`mf-stop-${to}`)?.focus();
  };
  return (
    <button
      type="button"
      role="tab"
      id={`mf-stop-${n}`}
      className="mf-stop"
      aria-selected={active}
      aria-controls="mf-stop-panel"
      tabIndex={active ? 0 : -1}
      onClick={() => v.pickStop(n)}
      onKeyDown={onKeyDown}
    >
      <span aria-hidden="true" className="mf-stop-mark" />
      <span className="mf-stop-when">{stop.when}</span>
      <span className="mf-stop-label">{stop.label}</span>
    </button>
  );
}
