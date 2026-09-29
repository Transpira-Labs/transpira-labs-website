import { createFileRoute } from "@tanstack/react-router";
import { SiteNav, SiteFooter } from "@/components/site-chrome";
import { StoryMarkup } from "@/components/story/StoryMarkup";
import { ScrollCue } from "@/components/story/ScrollCue";
import { FloatingCall } from "@/components/story/FloatingCall";
import { useStoryVals } from "@/components/story/story-logic";

const DESCRIPTION =
  "Win and manage 10× the loads. Same team. Manifest reads the email, prices the load, posts it for carriers and only texts you when it needs you. You approve with one tap.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manifest | Win and manage 10× the loads. Same team." },
      { name: "description", content: DESCRIPTION },
      {
        property: "og:title",
        content: "Manifest | Win and manage 10× the loads. Same team.",
      },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Story,
});

/* The broker story page, ported from Transpira-Labs/manifest-story. */
function Story() {
  const v = useStoryVals();
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav sticky={false} />
      <main className="flex-1">
        <StoryMarkup v={v} />
        <ScrollCue />
        <FloatingCall />
      </main>
      <SiteFooter />
    </div>
  );
}
