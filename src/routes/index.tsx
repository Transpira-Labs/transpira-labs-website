import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/home/HomePage";

// TODO(before launch): the design sets no page title, description or share
// image. These reuse the page's own headline and opening line; confirm them.
const TITLE = "Manifest | Quote, cover and get paid with a one-word text";
const DESCRIPTION =
  "Manifest is an agent for equipment brokers. It reads your email, prices loads, books trucks and chases paperwork, then texts you before anything goes out.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});
