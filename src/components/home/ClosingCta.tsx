/* Ported from docs/homepage-handoff/design/homepage.dc.html. Values are the design's own; colours and fonts are the --mf-* tokens in styles.css. */
import type { FormEvent } from "react";
import { CAL_URL } from "@/components/site-chrome";

/* The site's booking flow is the Cal.com page, so the form opens it with the email filled in. */
function onSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const email = new FormData(e.currentTarget).get("email");
  const url = new URL(CAL_URL);
  if (typeof email === "string" && email) url.searchParams.set("email", email);
  window.open(url.toString(), "_blank", "noopener");
}

export function ClosingCta() {
  return (
    <section
      className="mf-pad"
      id="call"
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "24px 32px 120px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: "24px",
      }}
    >
      <h2
        className="mf-h2"
        style={{
          margin: "0",
          fontFamily: "var(--mf-display)",
          fontSize: "60px",
          lineHeight: "1.08",
          fontWeight: "400",
          letterSpacing: "-1px",
          maxWidth: "820px",
        }}
      >
        {"Turn quote requests into booked loads"}
      </h2>
      <p style={{ margin: "0", fontSize: "19px", color: "var(--mf-steel)" }}>
        {"See it on your own loads in 20 minutes."}
      </p>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "center",
          width: "100%",
          maxWidth: "520px",
        }}
      >
        <label
          htmlFor="cta-em"
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
          }}
        >
          {"Your work email"}
        </label>
        <input
          id="cta-em"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mf-input"
          placeholder="you@brokerage.com"
          style={{
            flex: "1 1 240px",
            fontFamily: "var(--mf-sans)",
            fontSize: "17px",
            padding: "14px 16px",
            borderRadius: "8px",
            border: "1.5px solid #C4C6C0",
            background: "var(--mf-white)",
            color: "var(--mf-ink)",
          }}
        />
        <button
          type="submit"
          className="mf-btn"
          data-ph-capture-attribute-cta="close"
          style={{
            background: "var(--mf-amber)",
            color: "var(--mf-ink)",
            border: "0",
            fontFamily: "var(--mf-sans)",
            fontSize: "16px",
            fontWeight: "700",
            padding: "14px 22px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          {"Book a call"}
        </button>
      </form>
    </section>
  );
}
