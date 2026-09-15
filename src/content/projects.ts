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
  number: "01" | "02" | "03" | "04" | "05";
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
  /** CONCEPT: a sketch/demo with no real backend. LIVE: a real, functioning, deployed build. */
  status: "CONCEPT" | "LIVE";
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
    status: "CONCEPT",
  },
  {
    slug: "relay",
    number: "02",
    name: "Relay",
    year: 2026,
    oneLiner: "Live dispatch board for courier businesses to track riders and jobs in real time.",
    description:
      "A multi-tenant dispatch board for small courier and logistics outfits. Dispatchers see every rider and job on one live board, assign and reassign work, message riders per job, and watch jobs move through their lifecycle on their own — the board stays active even without manual input.",
    role: "Direction + AI-assisted full-stack build",
    stack: [
      "Next.js 16",
      "PostgreSQL (Neon)",
      "Prisma",
      "NextAuth v5",
      "TypeScript",
      "Tailwind CSS v4",
      "SWR",
    ],
    liveUrl: "https://relay-gamma-three.vercel.app",
    screenCount: 5,
    caseStudy: {
      headline: "The poll\nwas the worker",
      type: "DISPATCH",
      problem:
        "Built to Moshood's own brief, not independent research: small courier and logistics outfits need a live view of who's carrying what and whether anything's running late, without adopting enterprise fleet-management software built for much bigger operations. I built to that brief — I didn't independently validate it against real dispatchers, so this solves the problem as specified, not as researched.",
      decision:
        "Vercel's serverless functions don't support a persistent background worker, so the board couldn't just run a simulation loop to feel \"live.\" Instead, the simulation tick is triggered inline by the same /api/board request that loads the data, guarded by an atomic lastTickAt claim so concurrent polls from multiple open tabs can't double-advance it. A daily cron hit is only a backstop for when nobody has the board open — the poll itself is the real driver. That one constraint shaped the whole backend: no queue, no separate worker, no WebSocket server.",
      flow: [
        {
          step: "1 / 4",
          label: "CREATE A DEPOT",
          progressPct: 25,
          note: {
            title: "01 — SIGN UP",
            body: "Business name, name, email, password. The tenant is seeded immediately with 8–12 riders and 14–19 jobs in mixed states, so the board opens active instead of empty.",
          },
        },
        {
          step: "2 / 4",
          label: "WATCH THE BOARD",
          progressPct: 50,
          note: {
            title: "02 — BOARD",
            body: "One dense screen — live stats, a filterable departures table, the rider roster — all auto-refreshing every ~4s. A dispatcher never has to navigate to see the whole operation.",
          },
        },
        {
          step: "3 / 4",
          label: "DISPATCH",
          progressPct: 75,
          note: {
            title: "03 — DISPATCH",
            body: "Click a job to assign or reassign a rider, advance its status, or flag it late. This is where manual action overrides the autonomous simulation.",
          },
        },
        {
          step: "4 / 4",
          label: "CHECK IN",
          progressPct: 100,
          note: {
            title: "04 — CHECK IN",
            body: "Rider Day lays one rider's jobs out on an hourly timeline; Messages is a per-rider, per-depot thread — both a narrower view than the board.",
          },
        },
      ],
      whatIdDoDifferently:
        "The simulation tick and tenant-seeding logic were both written as naive sequential per-row database writes first, and had to be rewritten for batching after hitting an 11.8-second board load and a 47-second signup against real network latency to Postgres — I'd design for bulk writes from the start next time. Mobile got a horizontal-scroll patch rather than a real responsive layout, which is fine for a desk-bound dispatcher tool but a real gap if anyone checks the board from a phone. And I didn't check Vercel's Hobby-plan Cron limits until the deploy actually failed on them — worth confirming hosting-tier constraints before finalizing infra config, not after.",
    },
    status: "LIVE",
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
    status: "CONCEPT",
  },
  {
    slug: "fresheats",
    number: "04",
    name: "FreshEats",
    year: 2026,
    oneLiner: "Mobile-first food delivery marketplace with live order tracking.",
    description:
      "Mobile-first food delivery marketplace with live order tracking. Browse restaurants, build an order, and watch it move from kitchen to door — built entirely as a front-end exercise, no backend, running on mock data.",
    role: "Direction + AI-assisted build",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Framer Motion", "next/og"],
    liveUrl: "https://fresh-eats-swart.vercel.app",
    screenCount: 10,
    caseStudy: {
      headline: "The browser\nwas the backend",
      type: "DELIVERY",
      problem:
        "There was no real user problem here — nobody was underserved and no research was done, so I'm not going to pretend otherwise. This started as a design-to-code exercise: take a static, multi-screen visual design and turn it into something a stranger could actually use on their phone from a shared link — not a clickable prototype, a working app.",
      decision:
        "Make the browser the entire backend. Every piece of state a server would normally hold — accounts, the cart, order history, live order status — persists to localStorage instead. That one constraint shaped everything: it's why account details carry through to checkout automatically, why orders stay scoped per device, and why the whole thing deploys as a static site with zero infrastructure. The tradeoff is real — it's a demo, not a foundation — and worth naming rather than hiding.",
      flow: [
        {
          step: "1 / 4",
          label: "SIGN UP",
          progressPct: 25,
          note: {
            title: "01 — SIGN UP",
            body: "Name, email, delivery address and a note, captured once — so the address is already filled in at checkout, the point most delivery apps make you retype it.",
          },
        },
        {
          step: "2 / 4",
          label: "BROWSE & BUILD",
          progressPct: 50,
          note: {
            title: "02 — BUILD ORDER",
            body: "Filter by category, add dishes with quantity steppers. A running total stays on screen, so you always know what you're spending before you commit.",
          },
        },
        {
          step: "3 / 4",
          label: "CHECKOUT",
          progressPct: 75,
          note: {
            title: "03 — CHECKOUT",
            body: "Saved address, delivery timing, payment method, one total, one confirm button — nothing to re-enter at the step where hesitation costs orders.",
          },
        },
        {
          step: "4 / 4",
          label: "TRACK",
          progressPct: 100,
          note: {
            title: "04 — TRACK",
            body: "The stepper advances on compressed time (~30s) while the on-screen timestamps show a realistic 22-minute delivery — enough to demo the best screen without the wait.",
          },
        },
      ],
      whatIdDoDifferently:
        "Real auth from the start — the localStorage shim stores passwords in plain text and doesn't survive a device switch, so it needs replacing, not upgrading. I'd self-host the food photography instead of hotlinking it, and branch from commit one instead of pushing straight to main and catching up later. Verification was a Playwright script I ran by hand each time — it caught real bugs, but it isn't a suite anyone else can run against a future change.",
    },
    status: "CONCEPT",
  },
  {
    slug: "nexa",
    number: "05",
    name: "Nexa",
    year: 2026,
    oneLiner: "A distinctive-brand storefront demo for a premium gadget retailer.",
    description:
      "A front-end e-commerce demo for a premium electronics store — phones, laptops, headsets, power banks. Browse, a product page with a drag-to-scrub gallery, sign-in-gated cart, and checkout through to confirmation — built as a reusable base to reskin per client.",
    role: "Design direction + AI-assisted build",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Zustand", "next/og"],
    liveUrl: "https://nexa-store-zeta.vercel.app",
    screenCount: 9,
    caseStudy: {
      headline: "Anodized violet,\nnot a palette",
      type: "COMMERCE",
      problem:
        "Not a researched user problem — the brief was a design one. Most AI-generated storefronts converge on the same look: cream-and-terracotta or neon-on-black, identical shadowed cards, generic type pairings. The goal was to prove a distinctive, non-templated storefront was achievable quickly, as something to show prospective small-electronics-retailer clients and reskin per client.",
      decision:
        "Reject the default styling choices up front. A deliberate type pairing — Archivo Expanded for headlines, IBM Plex Mono for every price, spec and SKU — and a single named accent color, \"anodized violet,\" instead of a generic palette. That choice, locked at the design-brief stage, is what the card treatments, the gallery interaction and the hairline-only structure were all built to stay consistent with.",
      flow: [
        {
          step: "1 / 4",
          label: "BROWSE",
          progressPct: 25,
          note: {
            title: "01 — BROWSE",
            body: "Home's category grid or the listing page with search, filter and sort. Grid-first, because a 16-item catalog doesn't need a search bar to feel useful.",
          },
        },
        {
          step: "2 / 4",
          label: "PRODUCT",
          progressPct: 50,
          note: {
            title: "02 — PRODUCT",
            body: "A gallery you drag and scrub through, finish swatches that swap the stage color, a storage picker. The one deliberately bold interaction in an otherwise quiet UI.",
          },
        },
        {
          step: "3 / 4",
          label: "SIGN IN TO BUY",
          progressPct: 75,
          note: {
            title: "03 — SIGN IN",
            body: "Add-to-bag redirects to sign-in if you're not authenticated, then returns you to what you were doing — every real cart action has to go through an account.",
          },
        },
        {
          step: "4 / 4",
          label: "CHECKOUT",
          progressPct: 100,
          note: {
            title: "04 — CHECKOUT",
            body: "Bag, then one shipping/payment form, then a confirmation with a mock order number. No multi-step wizard — the catalog's too simple to need one.",
          },
        },
      ],
      whatIdDoDifferently:
        "Product imagery is still a diagonal-stripe placeholder — every stock photo host I tried (Unsplash, Pexels, Pixabay, Wikimedia) was blocked by the build environment's network policy, so next time I'd get real photography into the repo from day one instead of working around it twice. Auth is client-side only, so a signed-out user with leftover cart items from before they signed out can still reach checkout — a gap I flagged but didn't close, since it was outside what was asked. And a few micro-interactions (the filter sheet, add-to-cart) are functional but not fully polished — I'd tighten those if this became more than a demo.",
    },
    status: "CONCEPT",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug) ?? null;
}
