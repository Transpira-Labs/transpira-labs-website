import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/manifest/AboutPage";

const DESCRIPTION =
  "Transpira Labs is a research lab ensuring that AI is actually useful for everyone, not just a select few. Manifest is where that work meets freight brokers. Backed by Fusen World.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Transpira Labs" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "About | Transpira Labs" },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: AboutPage,
});
