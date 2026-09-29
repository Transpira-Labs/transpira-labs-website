/*
 * The story page's behaviour, ported from the DCLogic class in
 * Transpira-Labs/manifest-story source/Broker Story Fusion.dc.html.
 *
 * Everything is driven by scroll position: `[data-scbefore]` blocks advance
 * the chaos board, `[data-scstep]` blocks advance the phone story, and
 * `[data-reveal]` blocks fade in once they cross 85% of the viewport.
 */
import { useCallback, useEffect, useRef, useState } from "react";

type State = {
  rv: Record<string, boolean>;
  scBefore: number;
  scChaosCount: number;
  scStep: number;
  scChoice: "A" | "B" | null;
  scTyping: boolean;
  scFocus: string | null;
  vw: number;
  vh: number;
};

const INITIAL: State = {
  rv: {},
  scBefore: 0,
  scChaosCount: 0,
  scStep: 0,
  scChoice: null,
  scTyping: false,
  scFocus: null,
  vw: 1440,
  vh: 900,
};

// [app, initial, icon colour, who, text, badge]
const CHAOS: [string, string, string, string, string, string][] = [
  [
    "Gmail",
    "G",
    "#c5221f",
    "Erin Caldwell",
    "Kubota Macon to Raleigh Thursday, what would it cost?",
    "1,439",
  ],
  ["Phone", "✆", "#34c759", "Missed call", "Unknown · Georgia", "4"],
  ["Messages", "●", "#34c759", "(912) 555-0114", "kubota still open? what it paying", "3"],
  ["WhatsApp", "W", "#25d366", "Marco Reyes", "ya te mandé el pago", "5"],
  [
    "Voicemail",
    "▶",
    "#3a4763",
    "(478) 555-0182",
    '0:42 · "yeah calling about the tractor, is it—"',
    "",
  ],
  ["Super Dispatch", "S", "#0f6cbd", "New bid · L-2038", "Bluegrass Haulers bid $900", ""],
  ["Gmail", "G", "#c5221f", "Beacon Insurance", "Certificate attached. Holder: (blank)", ""],
  ["Messages", "●", "#34c759", "Tyler Brooks", "any update?", "2"],
  ["Trucker Tools", "T", "#217346", "Driver at stop", "6 h 12 min · detention not billed", "140"],
  ["Phone", "✆", "#34c759", "Missed call", "Delta Haul dispatch", "9"],
  ["Copart", "C", "#d6a800", "Vehicle not released", "Payment due. Storage $25/day from Fri", ""],
  ["Messages", "●", "#34c759", "Marcus · driver", "at the yard. gate locked. nobody here", "1"],
  [
    "Central Dispatch",
    "CD",
    "#c8102e",
    "Security alert",
    "Violation with a carrier you used last week",
    "",
  ],
  ["Gmail", "G", "#c5221f", "dispatch@ · Spam (302)", "Rate con L-2044, did you get this?", "302"],
  ["Payments", "P", "#46617a", "$1,750 to Ridgeline", "Pending · bank reports delays", ""],
  ["Messages", "●", "#34c759", "Tyler Brooks", "any update??", "3"],
  ["Phone", "✆", "#34c759", "Missed call", "Erin Caldwell", "12"],
  ["Messages", "●", "#34c759", "(229) 555-0131", "1750 all in. need answer now driver empty", ""],
  ["Notes", "N", "#e0b400", "TODO", "pay dry run fee jb auto!! · weight?? · call Erin", ""],
  ["Gmail", "G", "#c5221f", "Erin Caldwell", "Following up on the Kubota quote", ""],
  ["Voicemail", "▶", "#3a4763", "Tyler Brooks", '0:18 · "is the suburban still—"', "4"],
  ["Messages", "●", "#34c759", "JB Auto", "still waiting on that dry run fee from 3 weeks ago", ""],
  ["Phone", "✆", "#34c759", "Missed call", "Unknown · Florida", "17"],
  ["Gmail", "G", "#c5221f", "Erin Caldwell", "Never mind, we found a truck. Thanks anyway.", ""],
];

const DASH_STATS = (
  [
    ["Active loads", 7, "#1b2420"],
    ["Drafts waiting", 1, "#1b2420"],
    ["Owed to you", "$750", "#2f6f5e"],
    ["You owe", "$1,750", "#b04a2d"],
  ] as const
).map(([k, v, color]) => ({ k, v, color }));

const DASH_FEED = [
  ["Agent", "8:41 AM", "Moved L-2041 Kubota to Finding a truck. Erin accepted $2,100."],
  ["You", "8:07 AM", "Tapped A. Quote sent to Erin Caldwell."],
  ["Agent", "8:06 AM", "Drafted $1,900 for L-2047 John Deere. Waiting on your tap."],
  ["Agent", "7:52 AM", "Asked Delta Haul for a corrected COI on L-2044."],
  ["Agent", "7:30 AM", "Flagged L-2045: driver waiting 2 h. Detention drafted."],
  ["Agent", "7:00 AM", "Sent your morning text: 1 decision, $750 owed on L-2036."],
].map(([src, when, text]) => ({
  src,
  when,
  text,
  srcColor: src === "You" ? "#2f6f5e" : "#565f5c",
}));

export function useStoryVals() {
  const [s, setS] = useState<State>(INITIAL);
  const sRef = useRef(s);
  const set = useCallback((patch: Partial<State>) => {
    sRef.current = { ...sRef.current, ...patch };
    setS(sRef.current);
  }, []);

  const scPhoneRef = useRef<HTMLDivElement>(null);
  const typingTimer = useRef<number | undefined>(undefined);

  const scCheck = useCallback(() => {
    const st = sRef.current;
    const rvh = window.innerHeight;
    let rch: Record<string, boolean> | null = null;
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      const k = el.dataset.reveal!;
      if (!st.rv[k] && el.getBoundingClientRect().top < rvh * 0.85) {
        rch = rch || { ...st.rv };
        rch[k] = true;
      }
    });
    if (rch) set({ rv: rch });

    const vh = window.innerHeight;
    const narrow = window.innerWidth < 900;
    const line = vh * (narrow ? 0.82 : 0.6);
    const mid = narrow ? vh * 0.81 : vh / 2;

    let n = 0;
    document.querySelectorAll<HTMLElement>("[data-scstep]").forEach((el) => {
      if (el.getBoundingClientRect().top < line) n = +el.dataset.scstep!;
    });

    let best: HTMLElement | null = null;
    let bd = 1e9;
    document.querySelectorAll<HTMLElement>("[data-scstep],[data-scbefore]").forEach((el) => {
      const r = el.getBoundingClientRect();
      const d = Math.abs(r.top + r.height / 2 - mid);
      if (r.bottom > 0 && r.top < vh && d < bd) {
        bd = d;
        best = el;
      }
    });
    const b0 = best as HTMLElement | null;
    const focus = b0
      ? b0.dataset.scstep
        ? "s" + b0.dataset.scstep
        : "b" + b0.dataset.scbefore
      : null;
    if (focus !== sRef.current.scFocus) set({ scFocus: focus });

    let b = 0;
    document.querySelectorAll<HTMLElement>("[data-scbefore]").forEach((el) => {
      if (el.getBoundingClientRect().top < line) b = +el.dataset.scbefore!;
    });
    const bw = document.querySelector("[data-scbeforewrap]");
    let cc = 0;
    if (bw) {
      const r = bw.getBoundingClientRect();
      cc = Math.max(0, Math.min(1, (line - r.top) / (r.height - window.innerHeight * 0.3)));
      cc = Math.round(cc * CHAOS.length);
    }
    if (b !== sRef.current.scBefore || cc !== sRef.current.scChaosCount) {
      set({ scBefore: b, scChaosCount: cc });
    }

    if (n === sRef.current.scStep) return;
    const prev = sRef.current.scStep;
    let c = sRef.current.scChoice;
    if (n < 3) c = null;
    else if (n >= 4 && !c) c = "A";
    const typing = n === 3 && prev < 3;
    set({ scStep: n, scChoice: c, scTyping: typing });
    window.clearTimeout(typingTimer.current);
    if (typing) typingTimer.current = window.setTimeout(() => set({ scTyping: false }), 1100);
  }, [set]);

  useEffect(() => {
    const onResize = () => {
      set({ vw: window.innerWidth, vh: window.innerHeight });
      scCheck();
    };
    set({ vw: window.innerWidth, vh: window.innerHeight });
    window.addEventListener("scroll", scCheck, { passive: true });
    window.addEventListener("resize", onResize);
    scCheck();
    return () => {
      window.clearTimeout(typingTimer.current);
      window.removeEventListener("scroll", scCheck);
      window.removeEventListener("resize", onResize);
    };
  }, [scCheck, set]);

  // Keep the phone thread pinned to its newest message, again after the
  // bubbles' entry animations have settled.
  useEffect(() => {
    const go = () => {
      const p = scPhoneRef.current;
      if (p) p.scrollTop = p.scrollHeight;
    };
    go();
    const t = window.setTimeout(go, 500);
    return () => window.clearTimeout(t);
  });

  const scPick = (k: "A" | "B") => {
    set({ scChoice: k });
    const el = document.querySelector('[data-scstep="4"]');
    if (el) {
      window.scrollTo({
        top: window.scrollY + el.getBoundingClientRect().top - window.innerHeight * 0.3,
        behavior: "smooth",
      });
    }
  };

  /* Chaos board */
  const chaosN = Math.min(s.scChaosCount, CHAOS.length);
  const scChaos = CHAOS.slice(0, chaosN).map(([app, ini, icon, who, text, badge], i) => {
    const r1 = (Math.sin(i * 12.9898 + 3) * 43758.5453) % 1;
    const r2 = (Math.sin(i * 78.233 + 7) * 43758.5453) % 1;
    const a = Math.abs(r1);
    const b = Math.abs(r2);
    const win = /Gmail|Dispatch|Copart|Trucker|Notes/.test(app);
    return {
      app,
      ini,
      icon,
      who,
      text,
      badge,
      hasBadge: !!badge,
      x: Math.round(-4 + a * 72) + "%",
      y: Math.round(2 + b * 80) + "%",
      w: win ? "270px" : "240px",
      rot: Math.round((b - 0.5) * 14) + "deg",
      rad: win ? "4px" : "14px",
      bg: win ? "#fff" : "rgba(245,245,247,.97)",
      bar: win ? icon : "transparent",
      ink: win ? "#fff" : "#6c6c70",
    };
  });
  const mins = 5 + Math.round((chaosN / CHAOS.length) * 69);
  const sb = (i: number) => (!s.scFocus || s.scFocus === "b" + i ? 1 : 0.35);

  /* Sticky phone story */
  const n = s.scStep;
  const narrow = s.vw < 900;
  const side = n === 8 || n === 9;
  const ctx = n === 0 || n === 3 ? 0 : side ? 470 : n >= 7 ? 720 : 360;
  const phoneOn = n < 7 || side;
  const pS = n === 3 ? 1.06 : 1;
  const textW = narrow ? 0 : Math.min(620, Math.round(s.vw * 0.44));
  const avail = (narrow ? s.vw : s.vw - textW) - 32;
  const availH = (narrow ? s.vh * 0.6 : s.vh) - 40;
  const need = ctx + (ctx && phoneOn ? 48 : 0) + (phoneOn ? 330 * pS : 0);
  const on = n >= 3 && !(n === 3 && s.scTyping);
  const so = (i: number) => (!s.scFocus || s.scFocus === "s" + i ? 1 : 0.35);

  const reveal = Object.fromEntries(
    [1, 2, 3, 4, 5, 6, 7, 8, 9].flatMap((k) => [
      ["rvO" + k, s.rv[k] ? 1 : 0],
      ["rvY" + k, s.rv[k] ? "0px" : "28px"],
    ]),
  ) as Record<`rvO${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`, number> &
    Record<`rvY${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`, string>;

  return {
    dashStats: DASH_STATS,
    dashFeed: DASH_FEED,

    scChaos,
    scChaosN: Math.max(1, Math.round(chaosN * 1.6)),
    scChaosClock: 8 + Math.floor(mins / 60) + ":" + String(mins % 60).padStart(2, "0") + " AM",
    sb1: sb(1),
    sb2: sb(2),
    sb3: sb(3),

    scCols: narrow ? "minmax(0,1fr)" : "minmax(0," + textW + "px) minmax(0,1fr)",
    scStageOrder: narrow ? 0 : 2,
    scStageH: narrow ? "62vh" : "100vh",
    scBlockH: narrow ? "75vh" : "100vh",
    scScale: Math.min(1, avail / need, availH / (phoneOn ? 690 * pS : 520)).toFixed(3),
    scGap: ctx && phoneOn ? "48px" : "0px",
    scPhoneDisp: phoneOn ? "block" : "none",
    scCtxW: ctx + "px",
    scPhoneS: pS,
    sc1: n === 1,
    sc2: n === 2,
    sc4: n === 4,
    sc5: n === 5,
    sc6: n === 6,
    sc7: n === 7,
    sc10: n === 10,
    sc11: n === 11,
    scBoardSide: side,
    scBobRead: n === 8,
    scBobBd: n === 8 ? "#007aff" : "#e3e7e6",
    scBobRing: n === 8 ? "4px" : "0px",
    scCatWrite: n === 9,
    scCatBd: n === 9 ? "#2f6f5e" : "#e3e7e6",
    scCatRing: n === 9 ? "4px" : "0px",
    scCatMeta: n >= 9 ? "Detention billed · $150" : "Driver waiting 2 h",
    scCatFg: n >= 9 ? "#2f6f5e" : "#b04a2d",
    scEmpty: n < 3,
    scTypingOn: n === 3 && s.scTyping,
    sp1: on,
    spOpts: n === 3 && !s.scTyping,
    sp2: n >= 4,
    spDelivered: n === 4,
    sp3: n >= 5,
    sp4: n >= 6,
    sp5: n >= 8,
    sp6: n >= 9,
    scChoiceKey: s.scChoice || "A",
    scPrice: s.scChoice === "B" ? "$2,200" : "$2,100",
    scPickA: () => scPick("A"),
    scPickB: () => scPick("B"),
    scYourTurn: n === 3,
    scArrow: narrow ? "↑" : "→",
    scPhoneRef,
    so1: so(1),
    so2: so(2),
    so3: so(3),
    so4: so(4),
    so5: so(5),
    so6: so(6),
    so7: so(7),
    so8: so(8),
    so9: so(9),
    so10: so(10),
    so11: so(11),

    rvCols: s.vw < 760 ? "minmax(0,1fr)" : "repeat(3,minmax(0,1fr))",
    ...reveal,
  };
}

export type StoryVals = ReturnType<typeof useStoryVals>;
