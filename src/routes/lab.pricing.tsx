import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/manifest/Chrome";
import { Pricing } from "@/components/manifest/Pricing";

/*
 * A test page for a new pricing section. Nothing links here and search
 * engines are asked to ignore it. Delete this file once the section is on the
 * homepage or dropped.
 */
export const Route = createFileRoute("/lab/pricing")({
  head: () => ({
    meta: [{ title: "Pricing, prototype" }, { name: "robots", content: "noindex" }],
  }),
  component: Lab,
});

function Lab() {
  return (
    <div className="mf-root">
      <Nav current="home" />
      <main style={{ paddingBottom: 160 }}>
        <section className="mf-wrap" style={{ paddingTop: 96 }}>
          <p className="mf-sub">
            A prototype of the pricing section. The <Link to="/">homepage</Link> is unchanged.
          </p>
        </section>
        <Pricing />
      </main>
    </div>
  );
}
