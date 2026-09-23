import { useEffect } from "react";
import posthog from "posthog-js";

/**
 * The PostHog project, shared with the quoting app. A `phc_` key is a public
 * write-only ingest token - it ships in every page that reports, here and at
 * quoting.transpiralabs.com, and cannot read anything back. The env var is
 * the override; the literal is what makes this work without one.
 *
 * It has to be a literal rather than a runtime read: Vite inlines
 * `import.meta.env.VITE_*` at build time, and this site is built by Cloud
 * Build with only DOCKER_BUILD passed in - so a variable set on Cloud Run
 * afterwards would be undefined in the artefact however carefully it was set.
 * The quoting app reads a plain `process.env.POSTHOG_KEY` on the server and
 * hands it down as a prop, which is the same problem solved the other way.
 */
const KEY = import.meta.env.VITE_POSTHOG_KEY || "phc_4iL1j5Gx1sPdAnA35znKyBrZ8NwGiRHFwRILdEcMXW6";

/** The relay path on this site's own origin (a routeRule in vite.config.ts). */
const RELAY_PATH = "/sap";

/** Where PostHog's own UI lives, for links it renders (toolbar, surveys). */
const UI_HOST = "https://us.posthog.com";

/**
 * Starts PostHog in the browser. Mounted once from the root route, renders
 * nothing.
 *
 * The visitor this counts is the same visitor the quoting app counts.
 * `cross_subdomain_cookie` writes the id at .transpiralabs.com rather than at
 * this host, so somebody who reads the marketing site, clicks through to the
 * demo and then signs in at quoting is one person with one funnel instead of
 * three strangers. That only holds while both sites use the key above.
 *
 * Nothing runs on localhost. The relay below is a build-time route rule, so
 * it does not exist under `vite dev` - and a developer reloading a page forty
 * times is not a visitor. Check a change on the deployed site, not here.
 */
export function Analytics() {
  useEffect(() => {
    if (!KEY) return;
    if (posthog.__loaded) return;
    const host = window.location.hostname;
    if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")) return;

    posthog.init(KEY, {
      // First-party, so ad blockers do not drop it. On a marketing site the
      // traffic they would drop is the top of the funnel - the part these
      // numbers exist to measure.
      api_host: RELAY_PATH,
      ui_host: UI_HOST,
      // Carries capture_pageview: "history_change", which is what a router
      // that never reloads the document needs: without it this site would
      // report one page view per visit no matter how many pages were read.
      defaults: "2026-05-30",
      person_profiles: "identified_only",
      cross_subdomain_cookie: true,
      // Session replay. Anything typed is masked - the contact form takes a
      // name, an email and a message, and none of that belongs in a
      // recording. What is left is the part worth watching: which sections
      // hold attention, where a scroll stops, which page loses people.
      session_recording: { maskAllInputs: true },
      mask_all_element_attributes: true,
      // Registered in `loaded` rather than after init: the first page view is
      // captured during init, and a property added afterwards would miss it -
      // which is the one event where knowing the landing host matters most.
      loaded: (ph) => ph.register({ site: host }),
    });
  }, []);

  return null;
}
