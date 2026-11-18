import { createFileRoute } from "@tanstack/react-router";
import { WalkthroughPage } from "@/components/manifest/WalkthroughPage";

const TITLE = "Manifest | A broker's Monday morning";
const DESCRIPTION =
  "Manifest reads the email, prices the load, posts it for carriers and only texts you when it needs you. You approve with one text.";

export const Route = createFileRoute("/walkthrough")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: WalkthroughPage,
});
