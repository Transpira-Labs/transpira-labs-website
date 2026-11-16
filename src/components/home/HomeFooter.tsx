/* Ported from docs/homepage-handoff/design/homepage.dc.html. Values are the design's own; colours and fonts are the --mf-* tokens in styles.css. */
import { Link } from "@tanstack/react-router";
import { ManifestMark } from "./ManifestMark";

export function HomeFooter() {
  return (
    <footer style={{ background: "var(--mf-ink)", color: "#9AA0A4", overflow: "hidden" }}>
      <div
        className="mf-pad"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "72px 32px 0",
          display: "flex",
          flexDirection: "column",
          gap: "48px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "48px",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "260px" }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontFamily: "var(--mf-display)",
                fontSize: "24px",
                color: "var(--mf-paper)",
              }}
            >
              <ManifestMark size={34} decorative={false} />
              {"Manifest"}
            </span>
            <span style={{ fontSize: "15px", lineHeight: "1.5" }}>
              {"The back office for equipment brokers, by text. By Transpira Labs."}
            </span>
          </div>
          <div style={{ display: "flex", gap: "64px", flexWrap: "wrap", fontSize: "15px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ color: "var(--mf-paper)", fontWeight: "600" }}>{"Product"}</span>
              <a
                className="mf-footlink"
                href="#jobs"
                style={{ color: "#9AA0A4", textDecoration: "none" }}
              >
                {"What it does"}
              </a>
              <a
                className="mf-footlink"
                href="#how"
                style={{ color: "#9AA0A4", textDecoration: "none" }}
              >
                {"How it works"}
              </a>
              <Link
                className="mf-footlink"
                to="/pricing"
                style={{ color: "#9AA0A4", textDecoration: "none" }}
              >
                {"Pricing"}
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ color: "var(--mf-paper)", fontWeight: "600" }}>{"Company"}</span>
              <Link
                className="mf-footlink"
                to="/about"
                style={{ color: "#9AA0A4", textDecoration: "none" }}
              >
                {"About"}
              </Link>
              <Link
                className="mf-footlink"
                to="/contact"
                style={{ color: "#9AA0A4", textDecoration: "none" }}
              >
                {"Contact"}
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <span style={{ color: "var(--mf-paper)", fontWeight: "600" }}>{"Legal"}</span>
              <Link
                className="mf-footlink"
                to="/privacy"
                style={{ color: "#9AA0A4", textDecoration: "none" }}
              >
                {"Privacy"}
              </Link>
              <Link
                className="mf-footlink"
                to="/terms"
                style={{ color: "#9AA0A4", textDecoration: "none" }}
              >
                {"Terms"}
              </Link>
            </div>
          </div>
        </div>
        <p style={{ margin: "0", fontSize: "13px" }}>
          {"© 2026 Classhopper Technologies Inc. · Backed by Fusen World"}
        </p>
      </div>
      <div
        className="mf-wordmark"
        aria-hidden="true"
        style={{ position: "relative", marginTop: "32px", height: "230px" }}
      >
        <div
          style={{
            position: "absolute",
            left: "0",
            right: "0",
            top: "112px",
            borderTop: "4px dashed var(--mf-amber)",
            opacity: "0.55",
          }}
        ></div>
        <p
          style={{
            position: "absolute",
            left: "0",
            right: "0",
            bottom: "-64px",
            margin: "0",
            textAlign: "center",
            fontFamily: "var(--mf-display)",
            fontSize: "280px",
            lineHeight: "1",
            color: "#2A2D31",
            letterSpacing: "-6px",
            whiteSpace: "nowrap",
          }}
        >
          {"Manifest"}
        </p>
      </div>
    </footer>
  );
}
