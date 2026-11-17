/*
 * The homepage's state, ported from the Component class at the bottom of
 * docs/homepage-handoff/design/homepage.dc.html. The design's `heroOpts` and
 * `data` arrays belong to earlier interactive phones that are not on the page,
 * so they are not ported.
 */
import { useEffect, useState } from "react";

export type Stop = { id: string; when: string; label: string };

/*
 * TODO(before launch): the times and figures on this page (7:00, 8:06, 9:10,
 * 9:12, 9:20, Thu 9:04, the $350 margin, Delta Haul's Friday pickup and the
 * Bluegrass $1,750 bid) are illustrative. Confirm them against the real product.
 */
export const STOPS: Stop[] = [
  { id: "quote", when: "Mon 8:07", label: "Quote" },
  { id: "cover", when: "Mon 9:10", label: "Cover" },
  { id: "paperwork", when: "Mon 9:20", label: "Paperwork" },
  { id: "track", when: "Thu 9:04", label: "On the road" },
  { id: "paid", when: "Fri", label: "Get paid" },
];

const STEPS = [
  {
    title: "Connect your inbox",
    body: "Sign in with Gmail or Outlook and add your phone number. The agent links your load boards.",
    label: "MONDAY, BEFORE 8 AM",
    lines: [
      { t: "7:40", x: "Outlook connected with one sign-in" },
      { t: "7:41", x: "DAT and Truckstop linked" },
      { t: "7:42", x: "Your phone added. Manifest is a contact in Messages." },
    ],
  },
  {
    title: "It reads and drafts",
    body: "Every quote request, carrier text and document is read, priced and drafted, then filed on the board.",
    label: "ERIN’S EMAIL",
    lines: [
      { t: "8:05", x: "Quote request from Erin read" },
      { t: "8:06", x: "Similar trips checked: $1,950 to $2,050" },
      { t: "8:06", x: "Draft ready: $2,100, with a question about weight" },
    ],
  },
  {
    title: "You approve with one text",
    body: "Anything with consequences comes to your phone first. Reply yes to send, change it, or say no.",
    label: "YOUR PART",
    lines: [
      { t: "8:06", x: "Texted you the draft" },
      { t: "8:07", x: "You replied yes" },
      { t: "8:07", x: "Sent to Erin from your own address" },
    ],
  },
  {
    title: "It follows through",
    body: "It posts the load, talks to carriers on its own number, books the truck you pick and sends the paperwork.",
    label: "AFTER ERIN SAYS YES",
    lines: [
      { t: "8:41", x: "Posted to DAT and Truckstop" },
      { t: "9:10", x: "You picked Bluegrass. Booked." },
      { t: "9:12", x: "Rate con sent" },
    ],
  },
  {
    title: "The board stays current",
    body: "Every load moves from quote to paid on its own. Open it on any computer when you want the detail.",
    label: "L-2041 ON THE BOARD",
    lines: [
      { t: "9:12", x: "Moved to Booked" },
      { t: "Thu", x: "Picked up, tracking on time" },
      { t: "Fri", x: "Delivered. Invoice drafted for your OK." },
    ],
  },
];

const FAQS = [
  {
    q: "Does anything go out without me?",
    a: "No. The agent drafts every email, text and load posting, and waits for your reply before anything reaches a customer or carrier.",
  },
  {
    q: "What do I need to install?",
    a: "Nothing. The agent is a contact in your phone’s messages, and the board opens in any browser.",
  },
  {
    q: "Which email does it work with?",
    a: "Gmail and Outlook. Outlook connects in one sign-in.",
  },
  {
    q: "Who do carriers talk to?",
    a: "The agent. It posts loads with its own number, so carrier calls and texts go to it, not your phone.",
  },
  {
    q: "What does it cost?",
    a: "$50 per user per month, with every connector included. No onboarding fee and no implementation fee.",
  },
];

/*
 * TODO(before launch): confirm which integrations exist today. Telegram is
 * shown switched off. The switches are visual only; nothing is saved.
 */
const CONNECTIONS: [name: string, what: string, on: boolean][] = [
  ["Gmail", "Reads quote requests, sends as you", true],
  ["Outlook", "Reads quote requests, sends as you", true],
  ["DAT", "Posts loads, collects bids", true],
  ["Truckstop", "Posts loads, collects bids", true],
  ["WhatsApp", "Texts drivers and carriers", true],
  ["Telegram", "Texts drivers and carriers", false],
  ["Your TMS", "Keeps loads and invoices in sync", true],
];

export function useHomeVals() {
  const [tab, setTab] = useState(0);
  const [paused, setPaused] = useState(false);
  const [step, setStep] = useState(2);
  const [faq, setFaq] = useState(0);
  const [conns, setConns] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(CONNECTIONS.map(([name, , on]) => [name, on])),
  );

  // The road moves on to the next stop every five seconds until the visitor
  // picks one. It stays put for people who ask for less motion.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setTab((n) => (n + 1) % STOPS.length), 5000);
    return () => window.clearInterval(t);
  }, [paused]);

  const cur = STOPS[tab].id;
  return {
    tab,
    pickStop: (n: number) => {
      setTab(n);
      setPaused(true);
    },
    isQuote: cur === "quote",
    isCover: cur === "cover",
    isPaperwork: cur === "paperwork",
    isTrack: cur === "track",
    isPaid: cur === "paid",
    steps: STEPS.map((s, n) => ({
      num: "0" + (n + 1),
      title: s.title,
      body: s.body,
      active: step === n,
      inactive: step !== n,
      pick: () => setStep(n),
    })),
    panel: { label: STEPS[step].label, lines: STEPS[step].lines },
    conns: CONNECTIONS.map(([name, what]) => ({
      name,
      what,
      on: conns[name],
      toggle: () => setConns((c) => ({ ...c, [name]: !c[name] })),
    })),
    faqs: FAQS.map((f, n) => ({
      q: f.q,
      a: f.a,
      open: faq === n,
      sign: faq === n ? "−" : "+",
      toggle: () => setFaq(faq === n ? -1 : n),
    })),
  };
}

export type HomeVals = ReturnType<typeof useHomeVals>;
