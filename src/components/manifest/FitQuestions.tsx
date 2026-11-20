import { useEffect, useRef, type ReactNode } from "react";
import { Bubbles } from "./Chrome";

/*
 * What a broker still wants to know after the demo, as two numbered
 * questions. Each has its answer on the left, which stays in view, and the
 * thing that proves it on the right. This one section replaces four that each
 * made one of these points on its own.
 *
 * TODO(before launch): confirm which integrations exist today.
 */
const CONNECTIONS: [string, string][] = [
  ["Gmail and Outlook", "Reads quote requests, sends as you"],
  ["DAT and Truckstop", "Posts loads, collects bids"],
  ["WhatsApp", "Texts drivers and carriers"],
  ["Your TMS", "Keeps loads and invoices in sync"],
  ["Your phone", "Where you approve, by text"],
];

function Row({
  n,
  question,
  answer,
  children,
}: {
  n: string;
  question: string;
  answer: string;
  children: ReactNode;
}) {
  return (
    <li className="mf-fit-row">
      <div className="mf-fit-text">
        <span className="mf-fit-n">{n}</span>
        <div>
          <h3>{question}</h3>
          <p>{answer}</p>
        </div>
      </div>
      <div className="mf-fit-proof">{children}</div>
    </li>
  );
}

export function FitQuestions() {
  const list = useRef<HTMLOListElement>(null);

  // Each row rises into place once, when it comes into view.
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.dataset.live = "true";
    const seen = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.in = "true";
          seen.unobserve(e.target);
        }
      },
      { threshold: 0.15 },
    );
    el.querySelectorAll(".mf-fit-row").forEach((row) => seen.observe(row));
    return () => seen.disconnect();
  }, []);

  return (
    <section id="how" className="mf-wrap mf-fit">
      <h2 className="mf-h2 mf-h2--xl">One phone. One agent. Any number of loads.</h2>
      <ol ref={list} className="mf-fit-list">
        <Row
          n="01"
          question="Does anything go out without me?"
          answer="No. The agent drafts every email, text and load posting, then waits for your reply before anything reaches a customer or carrier."
        >
          <div className="mf-fit-panel mf-fit-thread">
            <Bubbles
              msgs={[
                [false, "Draft for Erin is ready: $2,100, with a question about weight. Send it?"],
              ]}
            />
            <div className="mf-fit-replies" aria-hidden="true">
              <span>Yes</span>
              <span>Change it</span>
              <span>No</span>
            </div>
            <p>Reply yes to send, change it, or say no.</p>
          </div>
        </Row>

        <Row
          n="02"
          question="What do I have to set up?"
          answer="Sign in with Gmail or Outlook and add your phone number. The agent links your load boards and shows up as a contact in Messages. There is nothing to install."
        >
          <ul className="mf-rows">
            {CONNECTIONS.map(([name, what]) => (
              <li key={name}>
                <strong>{name}</strong>
                <span>{what}</span>
              </li>
            ))}
          </ul>
        </Row>
      </ol>
    </section>
  );
}
