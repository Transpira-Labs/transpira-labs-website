import { CAL_URL } from "@/components/site-chrome";

/**
 * "Book a call", on screen for the whole page: a pinned button at the
 * bottom-right on desktop and a full-width bar on phones. A booked call is the
 * conversion, so it is never more than one tap away.
 *
 * `data-ph-capture-attribute-cta` tags PostHog's autocaptured click with where
 * the button sits, so bookings can be split by placement.
 */
export function FloatingCall() {
  return (
    <div className="ms-cta-dock">
      <a
        href={CAL_URL}
        target="_blank"
        rel="noreferrer"
        data-ph-capture-attribute-cta="floating"
        className="ms-cta ms-cta-live"
      >
        <CalendarIcon />
        <span className="ms-cta-text">
          <b>Book a 20-minute call</b>
          <small>See it working on your loads</small>
        </span>
        <span aria-hidden="true" className="ms-cta-arrow">
          →
        </span>
      </a>
    </div>
  );
}

/** The same call to action, inline, for the end of a section. */
export function InlineCall({ where }: { where: string }) {
  return (
    <a
      href={CAL_URL}
      target="_blank"
      rel="noreferrer"
      data-ph-capture-attribute-cta={where}
      className="ms-cta ms-cta-inline ms-cta-live"
    >
      <CalendarIcon />
      <span className="ms-cta-text">
        <b>Book a 20-minute call</b>
        <small>See it working on your loads</small>
      </span>
      <span aria-hidden="true" className="ms-cta-arrow">
        →
      </span>
    </a>
  );
}

function CalendarIcon() {
  return (
    <svg
      className="ms-cta-cal"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ flex: "none" }}
    >
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M8 2.5v4M16 2.5v4M3 9.5h18" />
      <path d="M8.5 14.5l2.2 2.2 4.8-4.8" />
    </svg>
  );
}
