import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import dusk from "@/assets/hero-dusk.jpg";
import hills from "@/assets/hero-hills.jpg";
import mesa from "@/assets/hero-mesa.jpg";
import peak from "@/assets/hero-peak.jpg";
import range from "@/assets/hero-range.jpg";
import volcano from "@/assets/hero-volcano.jpg";
import { HomePage } from "@/components/manifest/HomePage";

/* Test page: the homepage with a switch for trying hero photos. Not linked from anywhere. */
const PHOTOS = [
  { name: "1 · Range", src: range, position: "50% 75%" },
  { name: "2 · Peak", src: peak, position: "50% 60%" },
  { name: "3 · Hills", src: hills, position: "50% 60%" },
  { name: "4 · Mesa", src: mesa, position: "50% 70%" },
  { name: "5 · Volcano", src: volcano, position: "50% 80%" },
  { name: "Current", src: dusk, position: "50% 70%" },
];

function HeroLab() {
  const [n, setN] = useState(0);
  return (
    <>
      <HomePage photo={PHOTOS[n]} />
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
          maxWidth: "calc(100vw - 16px)",
          overflowX: "auto",
        }}
      >
        {PHOTOS.map((p, i) => (
          <button
            key={p.name}
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
            {p.name}
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
