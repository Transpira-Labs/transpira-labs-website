import { useId } from "react";

/*
 * The Manifest mark as drawn in the homepage design.
 * TODO(before launch): replace with the real mark exported as an SVG. This is
 * the designer's redrawn approximation.
 */
export function ManifestMark({ size, decorative }: { size: number; decorative: boolean }) {
  const id = useId();
  return (
    <svg
      role={decorative ? undefined : "img"}
      aria-label={decorative ? undefined : "Manifest logo"}
      aria-hidden={decorative ? true : undefined}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5FC3D0" />
          <stop offset="1" stopColor="#1F7385" />
        </linearGradient>
      </defs>
      <polygon
        points="50,9 85.5,29.5 85.5,70.5 50,91 14.5,70.5 14.5,29.5"
        fill="none"
        stroke="#2A8FA0"
        strokeWidth="5.5"
        strokeLinejoin="round"
      />
      <path
        d="M50 20 Q53.5 40 79 35 Q57 50 50 82 Q43 50 21 35 Q46.5 40 50 20 Z"
        fill={`url(#${id})`}
      />
      <path d="M50 20 Q53.5 40 79 35 Q57 50 50 82 Z" fill="#1F7385" opacity="0.35" />
    </svg>
  );
}
