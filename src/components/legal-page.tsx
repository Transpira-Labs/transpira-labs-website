import type { ReactNode } from "react";
import { SiteNav, SiteFooter } from "@/components/site-chrome";

/** Shared shell for the privacy policy and the terms: one column, numbered sections. */
export function LegalPage({ title, updated, intro, children }: { title: string; updated: string; intro: ReactNode; children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main className="pt-28 pb-24 px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-4xl tracking-tight mb-4 text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground mb-10">Last updated: {updated}</p>
          <div className="space-y-8 text-foreground/80 leading-relaxed">
            <div className="space-y-3">{intro}</div>
            {children}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function LegalSection({ n, title, children }: { n: number; title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="font-display text-xl text-foreground">
        {n}. {title}
      </h2>
      {children}
    </section>
  );
}

export function LegalList({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-5 space-y-2">{children}</ul>;
}
