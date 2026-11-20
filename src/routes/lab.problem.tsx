import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/manifest/Chrome";
import { ProblemJourney } from "@/components/manifest/ProblemJourney";

/*
 * A test page for the problem section while its design is being decided.
 * Nothing links here and search engines are asked to ignore it. Delete this
 * file once the section is on the homepage or dropped.
 */
export const Route = createFileRoute("/lab/problem")({
  head: () => ({
    meta: [{ title: "Problem section, prototype" }, { name: "robots", content: "noindex" }],
  }),
  component: Lab,
});

function Lab() {
  return (
    <div className="mf-root">
      <Nav current="home" />
      <main>
        <section className="mf-wrap mf-lab-note">
          <h1 className="mf-h2">Problem section, prototype</h1>
          <p className="mf-sub">
            Scroll down. This page is only for trying the section; the <Link to="/">homepage</Link>{" "}
            is unchanged.
          </p>
        </section>
        <ProblemJourney />
        <section className="mf-wrap mf-lab-note">
          <p className="mf-sub">The solution section would follow here.</p>
        </section>
      </main>
    </div>
  );
}
