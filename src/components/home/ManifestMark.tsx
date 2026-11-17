import logo from "@/assets/transpira-logo.png";

/* The company mark, from the same asset the rest of the site and the favicon use. */
export function ManifestMark({ size, decorative }: { size: number; decorative: boolean }) {
  return (
    <img
      src={logo}
      alt={decorative ? "" : "Manifest logo"}
      width={size}
      height={size}
      style={{ flexShrink: 0, display: "block" }}
    />
  );
}
