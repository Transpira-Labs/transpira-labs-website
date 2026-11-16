/* Ported from docs/homepage-handoff/design/homepage.dc.html: the "works with" carousel. */

type Kind = "mail" | "board" | "chat" | "phone";

/*
 * TODO(before launch): these are generic icons. Swap in the official logos from
 * each company's brand kit (Gmail, Outlook, DAT, Truckstop, WhatsApp, Telegram,
 * Apple Messages).
 */
const TOOLS: [name: string, kind: Kind, stroke: string][] = [
  ["Gmail", "mail", "#D64226"],
  ["Outlook", "mail", "#1F6FB2"],
  ["DAT", "board", "#1A1C1E"],
  ["Truckstop", "board", "#2E7D4F"],
  ["WhatsApp", "chat", "#2E9E5B"],
  ["Telegram", "chat", "#1F6FB2"],
  ["SMS", "chat", "#1A1C1E"],
  ["iMessage", "chat", "#2E9E5B"],
  ["Phone calls", "phone", "#1A1C1E"],
  ["Voicemail", "phone", "#5F666C"],
  ["Your TMS", "board", "#B86E00"],
];

function Icon({ kind, stroke }: { kind: Kind; stroke: string }) {
  return (
    <svg
      aria-hidden="true"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {kind === "mail" && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </>
      )}
      {kind === "board" && (
        <>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 10h18M9 10v10" />
        </>
      )}
      {kind === "chat" && <path d="M4 20l1.5-4A8 8 0 1 1 8 18.5z" />}
      {kind === "phone" && (
        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
      )}
    </svg>
  );
}

export function WorksWith() {
  return (
    <section aria-label="Works with" className="mf-works">
      <p>Works inside the tools your brokerage already runs on</p>
      <div className="mf-marquee">
        {/* The list runs twice so the loop has no seam; the second copy is hidden from assistive tech. */}
        <ul className="mf-track">
          {[false, true].map((copy) =>
            TOOLS.map(([name, kind, stroke]) => (
              <li key={`${copy}-${name}`} aria-hidden={copy || undefined}>
                <Icon kind={kind} stroke={stroke} />
                {name}
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
