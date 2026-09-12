# Brief 1 — Claude Design

**Paste this into Claude Design first. The build brief (Brief 2) comes after, once the visuals are settled.**

---

## Me

| | |
|---|---|
| Name | **Moshood Ibrahim Bolaji** |
| Brand / trading name | Sono Technologies (short form: **Sono**) |
| Location | Lagos, Nigeria (GMT+1) |
| Email | `sonotechnologies@gmail.com` |
| WhatsApp | `0913 092 8293` (display form) — links use `wa.me/2349130928293` |
| Domain | not registered yet |

Use the full name for the hero byline and the footer copyright. "Sono" is the conversational name and the basis for the logo mark — a monogram (`MIB` or `S.`) drawn as blueprint linework. Give me 2–3 monogram options on the system sheet.

---

## What I need

Design a personal portfolio site for me — a freelance web developer/designer based in Lagos, Nigeria. Dark, cinematic, heavily animated, built around one strong concept. I need artboards, not code.

The single hardest requirement: **it must not look like a generated portfolio template.** Read the "Do not" list at the bottom before you design anything. If a choice would show up in a hundred other AI-built portfolios, make a different choice.

---

## The concept: "The Build Floor"

The site is a workshop, not a brochure. The visual language is fabrication and engineering drawing — blueprints, exposed measurements, part annotations, assembly, hazard markings, station numbers. Projects are things that were *built*, shown mid-assembly with their parts labelled.

Why this concept: it positions me as someone who builds things rather than a "digital solutions provider", it reads credible to both a shop owner and an engineering manager, and it produces motion ideas (parts assembling, lines drawing, annotations pointing) that no generic gradient site can imitate.

Every screen should feel like a page from a technical document that happens to be beautiful. Nothing floats in empty space for decoration — every element sits on the grid and can justify its position.

---

## Audience

Four at once, in this priority order:

1. **Nigerian business owners** arriving from WhatsApp/Instagram on a mid-range Android. They need to understand what I do, see proof, and message me — in under 30 seconds.
2. **International freelance clients** judging craft. They need the motion and the case studies.
3. **Recruiters/hiring managers** scanning for real engineering. They need stack visibility and depth.
4. **Designers/devs** who might share it. They need the site to be memorable.

Design for #1 on mobile and #2/#4 on desktop. They are the same site, not two designs.

---

## Color

One saturated accent only. No second bright color, no gradients as the main visual device.

| Role | Value | Use |
|---|---|---|
| Ink (page base) | `#0A0A0B` | Everything sits on this |
| Surface | `#131417` | Cards, panels, raised blocks |
| Surface edge | `#23252A` | 1px borders, panel separation |
| Blueprint line | `#1E2A30` | The visible grid, hairlines, tick marks |
| Annotation | `#7E8B93` | Measurement text, leader lines, secondary labels |
| Paper (primary text) | `#EDEAE3` — warm off-white, never pure `#FFF` | Headlines, body |
| **Hazard (accent)** | `#FF5B04` | One accent. Underlines, active states, the cursor, section numbers, CTAs |
| Hazard dim | `#8A3203` | Accent at rest / pressed states |
| Signal (rare) | `#C9F24D` | Used at most twice on the whole site — "available for work" dot, a success state. Sparingly enough that it's a surprise |

Light mode: skip it. This is a single-theme site, and committing to one look is part of the identity. If you disagree, argue for it — don't silently add a toggle.

Texture: a subtle film grain overlay across the whole page (2–4% opacity, animated noise), and a faint blueprint grid visible at 4–6% opacity. These two things do most of the work in killing the "generated" feel.

---

## Typography

Three faces, all free from Fontshare or Google Fonts. **Do not use Inter.**

- **Display** — `Clash Display` (Fontshare), weights 500/600. Big, tight tracking (-0.03em), used at 72–160px. Alternative if you prefer something wider and colder: `Archivo Expanded`.
- **Body/UI** — `General Sans` (Fontshare), 400/500. 16–18px body, 1.6 line height.
- **Technical/mono** — `JetBrains Mono`, 400/500. Uppercase, letter-spaced `0.12em`, 11–13px. This is the workshop voice: section numbers, measurements, labels, timestamps, part names, the cursor readout.

The mono is not decoration — it's the annotation layer. Every major element gets a small mono label near it the way a technical drawing labels its parts (`01 / SELECTED WORK`, `FIG. 03`, `1440 × 900`, `LAGOS 23:41 GMT+1`, `STACK — NEXT.JS · POSTGRES · STRIPE`).

Type scale: 12 / 14 / 16 / 18 / 24 / 32 / 48 / 72 / 112 / 160. Use the extremes. A portfolio where the biggest text is 48px looks timid.

---

## Layout & grid

- 12-column grid, 1440px reference width, 80px outer margin desktop / 20px mobile, 24px gutter.
- **The grid is visible.** Hairline column rules at low opacity down the whole page, with corner crop marks at section boundaries and a left-edge "spec rail" showing the current section number and a scroll progress line.
- Asymmetry everywhere. Nothing is centered except deliberate full-bleed statement type. Content blocks should sit off-axis, hang into the margin, and break the grid once or twice per page on purpose.
- Vertical rhythm in multiples of 8. Section padding 160px desktop / 80px mobile.

---

## Artboards to produce

Desktop (1440 wide) and mobile (390 wide) for each, unless noted.

**Home (one long page, sections 00–06):**

1. `00 — Preloader` — drafting animation state: the `MIB` / `S.` monogram drawn as blueprint lines, a mono counter `000 → 100`, a status line (`COMPILING · 47 FILES`). Show 3 frames of it.
2. `00 — Hero` — full viewport. A 3D "exploded assembly" object centered-right (an abstract machine made of web-page parts: a nav bar, a card, a button, a database cylinder, floating apart with leader lines pointing to each labelled part). Big display statement on the left, off-axis, with **Moshood Ibrahim Bolaji** set as the byline and the role line beneath it. Mono availability status, `LAGOS`, and the local Lagos time. Scroll cue at the bottom as a measurement arrow.
3. `01 — Selected Work` (index) — 3 project entries. These are self-initiated concept builds and must be labelled honestly as such (not as client work): **Meridian** (property listings + map search), **Relay** (logistics/dispatch dashboard), **Ọdàrà** (salon booking with deposits). Use plausible interface screenshots for each — three visibly different products, not three recolors of the same layout. Not a symmetrical card grid. Alternating large plate + offset metadata block, each numbered, each with stack tags in mono, each with a thumbnail that will hold a looping video. Show the hover state on one of them (hazard-tape border wipe, thumbnail scale, cursor becomes `VIEW`).
4. `02 — Services & Pricing` — three tiers laid out as spec sheets, not pricing cards: line-itemed deliverables with dotted leader lines to values, timelines, and prices in ₦ with a $ equivalent. One tier marked as recommended with hazard marking, not a colored blob.
5. `03 — Process` — a horizontal "conveyor belt" of 4 stations (Brief → Design → Build → Launch), designed as one wide artboard meant to be scroll-pinned. Each station is a labelled part with a number, a duration, and what the client actually receives.
6. `04 — Proof` — testimonials + results. **Design it with real quote slots and an honest empty state**, because I don't have testimonials yet. Show both: the populated version and the launch version (e.g. a "first three clients" invitation block that occupies the same space with dignity).
7. `05 — About` — a portrait treated like a workshop photo (high contrast, grain, hazard-orange duotone accents), a first-person paragraph, a tool/stack list as an annotated parts diagram, and a few honest numbers.
8. `06 — Contact + Footer` — giant display type CTA whose fill scrubs with scroll, and a short form (name, business, budget, message). WhatsApp is the primary CTA and needs real weight — a prominent button reading `0913 092 8293`, since most Nigerian business leads will arrive from a WhatsApp or Instagram link. Beneath it: `sonotechnologies@gmail.com` with a copy affordance, a live Lagos clock, and a bottom strip reading `© 2026 MOSHOOD IBRAHIM BOLAJI · BUILT IN LAGOS · v1.0`. Design the form's error, sending and success states too.

**Case study page (`/work/[slug]`):**

9. Case study hero — project title, role, year, stack, live link, one full-bleed image.
10. Case study body — sticky left "spec sheet" column (client, scope, timeline, stack, outcome) against a scrolling right column of narrative + full-bleed shots + before/after + a metrics row.
11. Case study footer — next project preview with a large hover/transition plate.

**System:**

12. Component sheet — buttons (3 states), form fields, tags, the custom cursor in its 4 modes (default crosshair with coordinates, hover, view/drag, text), link underline animation, section header pattern, hazard tape element, the spec rail.
13. Mobile artboards for hero, work index, services, process (stacks vertically instead of pinning), contact.

**Total: ~13 desktop artboards + ~6 mobile.**

---

## Motion to design for (annotate, don't animate here)

The build will use GSAP + ScrollTrigger + Lenis + React Three Fiber. Where a screen has motion, annotate the artboard with what moves, from what, to what. Specifically:

- Hero assembly scrubbed by scroll (parts fly in and lock together, annotation lines retract).
- Headline reveals: per-line clip mask, 6–8° rotation, 80ms stagger.
- Work thumbnails: video plays on hover, border wipes in hazard orange.
- Process belt pinned and dragged horizontally on vertical scroll.
- Page transition: a blueprint sheet wipes across, the clicked thumbnail flies into the case study hero position.
- Custom cursor with a live coordinate readout.
- Marquee tickers with hazard stripes for the stack list.

Mark on each artboard which elements are **desktop-only spectacle** and what the mobile equivalent is, because heavy 3D will be disabled on phones.

---

## Copy direction

Write the real copy on the artboards. No lorem ipsum, no placeholder-speak.

Voice: first person, plain, specific, a little dry. I state what I do and what it costs. I mention constraints and tradeoffs, which is what a real builder sounds like.

- Good: "I build online stores and booking sites for businesses that are losing sales to a broken WhatsApp DM flow. Two to four weeks, fixed price."
- Banned: "elevate your digital presence", "let's build something amazing together", "passionate about crafting", "seamless experiences", "I turn ideas into reality".

My name, email and WhatsApp number are in the table at the top — use the real ones on the artboards. For anything I haven't given you — service tier names, prices, timelines, social handles, years of experience, project counts — use a bracketed placeholder and ask me. Do not invent numbers about my track record.

---

## Do not (the anti-generic list)

1. No purple→blue or indigo→pink gradients. No gradient text.
2. No glassmorphic cards floating over blurred gradient blobs.
3. No Inter, Poppins, Montserrat, or default Tailwind type stack.
4. No emoji anywhere. No generic 6-icon feature grid.
5. No stock 3D blobs, abstract spheres, or floating crypto-looking shapes. The 3D is an *assembly of recognizable parts*, or it doesn't exist.
6. No everything-centered layouts. No three identical cards in a row.
7. No fake logos, fake client names, or invented testimonials. If proof doesn't exist yet, design the honest empty state.
8. No "Hi, I'm Moshood 👋" hero. No typewriter effect cycling through "Developer / Designer / Problem Solver".
9. No pure `#000` on pure `#FFF`, no pure-saturated `#0000FF`-family accents.
10. No dark-mode toggle bolted on to look thorough.

---

## Deliver

Artboards as listed, on one canvas, ordered: system sheet first, then home 00→06 desktop, then case study, then mobile. Include the color and type tokens as a visible legend on the canvas so the build brief can reference them exactly.

If you think one of my decisions is wrong — the concept, the palette, the single-accent rule — say so before you produce all 19 artboards, not after.
