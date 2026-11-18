import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/manifest/HomePage";

const TITLE = "Manifest | Quote, cover and get paid with a one-word text";
const DESCRIPTION =
  "Manifest is a text agent for freight brokers. It reads the request, prices the load and drafts the reply. You text back yes.";

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
