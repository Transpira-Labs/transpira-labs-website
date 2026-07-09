import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import transpiraLogo from "@/assets/classhopper.jpeg";
import { SiteNav, SolidBackground, SiteFooter, CONTACT_EMAIL } from "@/components/site-chrome";

function NotFoundComponent() {
  return (
    <>
      <SolidBackground />
      <main className="relative z-10 flex min-h-screen flex-col">
        <SiteNav />
        <section className="flex flex-1 items-center px-6 pt-36 pb-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="eyebrow">404</div>
            <h1 className="mt-5 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight text-foreground text-balance">
              This page doesn't exist
            </h1>
            <p className="mt-8 text-lg text-foreground/85 leading-relaxed">
              The page you're looking for may have been moved, renamed, or never
              existed. Let's get you back on track.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/"
                className="rounded-full px-6 py-3 bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Go home
              </Link>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="rounded-full px-6 py-3 border border-border bg-card text-sm font-medium text-foreground hover:border-accent/50 transition-colors"
              >
                Contact us
              </a>
            </div>
          </div>
        </section>
        <SiteFooter />
      </main>
    </>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Transpira Labs" },
      { name: "description", content: "Transpira is building Manifest: one permissions-aware index across fifteen supply-chain systems. Plain-language questions, answers cited to the source record." },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Transpira Labs" },
      { name: "twitter:title", content: "Transpira Labs" },
      { property: "og:description", content: "Transpira is building Manifest: one permissions-aware index across fifteen supply-chain systems. Plain-language questions, answers cited to the source record." },
      { name: "twitter:description", content: "Transpira is building Manifest: one permissions-aware index across fifteen supply-chain systems. Plain-language questions, answers cited to the source record." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/jpeg", href: transpiraLogo },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
