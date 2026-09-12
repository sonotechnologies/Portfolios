export type CaseStudyFlowScreen = {
  step: string;
  label: string;
  progressPct: number;
  note: { title: string; body: string };
};

export type CaseStudy = {
  headline: string;
  type: string;
  problem: string;
  decision: string;
  flow: CaseStudyFlowScreen[];
  whatIdDoDifferently: string;
};

export type Project = {
  slug: string;
  number: "01" | "02" | "03";
  name: string;
  year: number;
  oneLiner: string;
  description: string;
  role: string;
  /** Ask Moshood — send the stack list per project. */
  stack: string[] | null;
  /** Ask Moshood — no live demo exists yet. */
  liveUrl: string | null;
  screenCount: number | null;
  caseStudy: CaseStudy | null;
};

export const projects: Project[] = [
  {
    slug: "meridian",
    number: "01",
    name: "Meridian",
    year: 2026,
    oneLiner: "Property listings with map search.",
    description:
      "Property listings with map search. Agents post once; buyers filter by area and price and see the pins move as they type.",
    role: "Design + Build",
    stack: null,
    liveUrl: null,
    screenCount: null,
    caseStudy: null,
  },
  {
    slug: "relay",
    number: "02",
    name: "Relay",
    year: 2026,
    oneLiner: "Dispatch board for a small logistics outfit.",
    description:
      "Dispatch board for a small logistics outfit. One screen shows every rider, every open job, and which deliveries are late — the thing that normally lives in six WhatsApp groups.",
    role: "Design + Build",
    stack: null,
    liveUrl: null,
    screenCount: null,
    caseStudy: null,
  },
  {
    slug: "odara",
    number: "03",
    name: "Ọdàrà",
    year: 2026,
    oneLiner: "Salon booking that takes a deposit.",
    description:
      "Salon booking that takes a deposit. The deposit is the whole point — it's what stops the 40% no-show rate that makes appointment software worthless here.",
    role: "Design + Build",
    stack: null,
    liveUrl: null,
    screenCount: null,
    caseStudy: {
      headline: "The deposit is\nthe product",
      type: "BOOKING",
      problem:
        "Salons here don't lose money on booking. They lose it on people who book and don't show up. Every free booking tool assumes the appointment itself is the valuable thing, so they all solve the wrong half.",
      decision:
        "Make the deposit mandatory and put it in the flow before confirmation, not after. A booking that hasn't paid isn't a booking — it never enters the calendar at all.",
      flow: [
        {
          step: "1 / 3",
          label: "PICK A SLOT",
          progressPct: 33,
          note: {
            title: "01 — SLOT",
            body: "Taken slots struck through, not hidden. Seeing what's gone makes the free slot feel scarce.",
          },
        },
        {
          step: "2 / 3",
          label: "HOLD THE SLOT",
          progressPct: 66,
          note: {
            title: "02 — DEPOSIT",
            body: '"₦8,400 now, ₦19,600 on the day" tests better than one total. The split is shown, never hidden.',
          },
        },
        {
          step: "3 / 3",
          label: "CONFIRMED",
          progressPct: 100,
          note: {
            title: "03 — CONFIRMED",
            body: "Success is hazard, not green. Receipt goes to WhatsApp because that's where the customer already lives.",
          },
        },
      ],
      whatIdDoDifferently:
        "The three-step flow is one step too many. A returning customer already knows the service and the stylist — they should land on a single screen with the slot picked and the deposit ready. I'd build that path first next time and keep the three-step version for first-timers only.",
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}
