/* Ported from docs/homepage-handoff/design/homepage.dc.html. Values are the design's own; colours and fonts are the --mf-* tokens in styles.css. */

export function PricingBand() {
  return (
    <section id="pricing" style={{ background: "var(--mf-paper-deep)" }}>
      <div
        className="mf-pad"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "96px 32px",
          display: "flex",
          gap: "56px",
          flexWrap: "wrap",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: "1 1 520px", display: "flex", flexDirection: "column", gap: "14px" }}>
          <h2
            className="mf-h2"
            style={{
              margin: "0",
              fontFamily: "var(--mf-display)",
              fontSize: "54px",
              lineHeight: "1.1",
              fontWeight: "400",
              letterSpacing: "-0.8px",
            }}
          >
            {"$50 per user per month"}
          </h2>
          <p
            style={{
              margin: "0",
              fontSize: "18px",
              lineHeight: "1.55",
              color: "var(--mf-steel)",
              maxWidth: "560px",
            }}
          >
            {
              "No onboarding fee. No implementation fee. Every connector included, quoting the same day."
            }
          </p>
        </div>
        <a
          className="mf-btn"
          href="#call"
          data-ph-capture-attribute-cta="pricing"
          style={{
            color: "var(--mf-ink)",
            textDecoration: "none",
            fontSize: "16px",
            fontWeight: "600",
            padding: "14px 22px",
            borderRadius: "8px",
            border: "1.5px solid var(--mf-ink)",
          }}
        >
          {"Book a call"}
        </a>
      </div>
    </section>
  );
}
