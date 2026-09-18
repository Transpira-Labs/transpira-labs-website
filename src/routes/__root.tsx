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
import transpiraLogo from "@/assets/transpira-logo.png";
import {
  SiteNav,
  SiteFooter,
  CONTACT_EMAIL,
  BTN_PRIMARY,
  BTN_GHOST,
} from "@/components/site-chrome";

const DESCRIPTION =
  "Manifest is the team of AI agents for freight brokers. It reads the inbox, reaches carriers where they already are, prices the load, and drafts every reply. A human approves every send.";

function NotFoundComponent() {
  return (
    <main className="flex min-h-screen flex-col">
      <SiteNav />
      <section className="flex flex-1 items-center px-6 py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <div className="eyebrow">404</div>
          <h1 className="m-0 font-display text-[clamp(2.25rem,6vw,5rem)] leading-[1.05] text-balance text-white">
            This page doesn't exist
          </h1>
          <p className="m-0 max-w-xl text-lg leading-relaxed text-fog">
            The page you're looking for may have been moved, renamed, or never existed.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/" className={BTN_PRIMARY}>
              Go home
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className={BTN_GHOST}>
              Contact us
            </a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
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
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
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
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#1b2420" },
      { title: "Manifest by Transpira" },
      { name: "description", content: DESCRIPTION },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Manifest by Transpira" },
      { name: "twitter:title", content: "Manifest by Transpira" },
      { property: "og:description", content: DESCRIPTION },
      { name: "twitter:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: transpiraLogo },
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
