import type { ReactNode } from "react";
import { Footer, Nav } from "@/components/manifest/Chrome";

/** Shared shell for the privacy policy and the terms: one column, numbered sections. */
export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mf-root">
      <Nav current="other" />
      <main className="mf-wrap">
        <div className="mf-prose">
          <h1 className="mf-h2">{title}</h1>
          <p>Last updated: {updated}</p>
          {intro}
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function LegalSection({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <section>
      <h2>
        {n}. {title}
      </h2>
      {children}
    </section>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul>{children}</ul>;
}
