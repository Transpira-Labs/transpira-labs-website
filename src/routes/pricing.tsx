import { createFileRoute, redirect } from "@tanstack/react-router";

/* Pricing lives on the homepage now. Old links to /pricing land on that section. */
export const Route = createFileRoute("/pricing")({
  beforeLoad: () => {
    throw redirect({ to: "/", hash: "pricing" });
  },
});
