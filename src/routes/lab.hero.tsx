import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/manifest/HomePage";

/* Test page: the homepage with a switch between two tints of the hero photo. Not linked from anywhere. */
const OPTIONS = ["A · Darker tint", "B · Lighter tint"];

function HeroLab() {
  const [n, setN] = useState(1);
  return (
    <>
      <HomePage light={n === 1} />
      <div
        style={{
          position: "fixed",
          zIndex: 100,
          left: "50%",
          bottom: 16,
          transform: "translateX(-50%)",
          display: "flex",
          gap: 4,
          padding: 4,
          borderRadius: 999,
          background: "#ffffff",
          boxShadow: "0 2px 12px rgba(0,0,0,.3)",
          font: "600 13px/1 system-ui, sans-serif",
        }}
      >
        {OPTIONS.map((name, i) => (
          <button
            key={name}
            type="button"
            onClick={() => setN(i)}
            style={{
              padding: "10px 14px",
              border: 0,
              borderRadius: 999,
              whiteSpace: "nowrap",
              cursor: "pointer",
              background: i === n ? "#010304" : "transparent",
              color: i === n ? "#ffffff" : "#010304",
            }}
          >
            {name}
          </button>
        ))}
      </div>
    </>
  );
}

export const Route = createFileRoute("/lab/hero")({
  head: () => ({ meta: [{ title: "Hero photos" }, { name: "robots", content: "noindex" }] }),
  component: HeroLab,
});
