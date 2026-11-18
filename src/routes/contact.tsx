import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/manifest/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | Transpira" },
      {
        name: "description",
        content: "Get in touch with Transpira Labs: email us or book a meeting.",
      },
      { property: "og:title", content: "Contact | Transpira" },
      {
        property: "og:description",
        content: "Get in touch with Transpira Labs: email us or book a meeting.",
      },
    ],
  }),
  component: ContactPage,
});
