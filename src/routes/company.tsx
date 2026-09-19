import { createFileRoute, redirect } from "@tanstack/react-router";

/* The Company tab became About; keep the old URL working. */
export const Route = createFileRoute("/company")({
  beforeLoad: () => {
    throw redirect({ to: "/about", statusCode: 301 });
  },
});
