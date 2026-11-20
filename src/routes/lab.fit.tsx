import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/manifest/Chrome";
import { FitQuestions } from "@/components/manifest/FitQuestions";

/*
 * A test page for the section that would replace four on the homepage.
 * Nothing links here and search engines are asked to ignore it. Delete this
 * file once the section is on the homepage or dropped.
 */
export const Route = createFileRoute("/lab/fit")({
  head: () => ({
    meta: [{ title: "Three questions, prototype" }, { name: "robots", content: "noindex" }],
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
            A prototype of the one section that would replace the four after the phone demo. The{" "}
            <Link to="/">homepage</Link> is unchanged.
          </p>
        </section>
        <FitQuestions />
      </main>
    </div>
  );
}
