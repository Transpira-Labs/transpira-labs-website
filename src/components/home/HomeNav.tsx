/* Ported from docs/homepage-handoff/design/homepage.dc.html. Values are the design's own; colours and fonts are the --mf-* tokens in styles.css. */
import { ManifestMark } from "./ManifestMark";
import { CAL_URL } from "@/components/site-chrome";

export function HomeNav() {
  return (
    <header
      className="mf-header"
      style={{
        position: "sticky",
        top: "0",
        background: "rgba(247,245,239,0.94)",
        borderBottom: "1px solid var(--mf-line)",
        zIndex: "2",
      }}
    >
      <nav
        className="mf-pad"
        aria-label="Main"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        <a
          href="#top"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "var(--mf-ink)",
            textDecoration: "none",
          }}
        >
          <ManifestMark size={34} decorative={false} />
          <span style={{ fontFamily: "var(--mf-display)", fontSize: "22px" }}>{"Manifest"}</span>
        </a>
        <div
          className="mf-nav-links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "28px",
            flexWrap: "wrap",
            fontSize: "15px",
          }}
        >
          <a
            className="mf-nav-link"
            href="#jobs"
            style={{ color: "var(--mf-ink)", textDecoration: "none" }}
          >
            {"One load"}
          </a>
          <a
            className="mf-nav-link"
            href="#how"
            style={{ color: "var(--mf-ink)", textDecoration: "none" }}
          >
            {"How it works"}
          </a>
          <a
            className="mf-nav-link"
            href="#board"
            style={{ color: "var(--mf-ink)", textDecoration: "none" }}
          >
            {"The board"}
          </a>
          <a
            className="mf-nav-link"
            href="#pricing"
            style={{ color: "var(--mf-ink)", textDecoration: "none" }}
          >
            {"Pricing"}
          </a>
          <a
            className="mf-nav-link"
            href="#faq"
            style={{ color: "var(--mf-ink)", textDecoration: "none" }}
          >
            {"FAQ"}
          </a>
          <a
            className="mf-btn"
            data-ph-capture-attribute-cta="nav"
            href={CAL_URL}
            target="_blank"
            rel="noreferrer"
            style={{
              background: "var(--mf-ink)",
              color: "var(--mf-paper)",
              textDecoration: "none",
              fontWeight: "600",
              padding: "11px 18px",
              borderRadius: "8px",
            }}
          >
            {"Book a call"}
          </a>
        </div>
      </nav>
    </header>
  );
}
