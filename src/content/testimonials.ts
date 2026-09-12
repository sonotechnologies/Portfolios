export type Testimonial = {
  quote: string;
  name: string;
  business: string;
};

/**
 * Empty on purpose — Moshood has no testimonials yet. Brief 2, section 04:
 * "Never ship placeholder quotes, invented names, or fake client logos,
 * even temporarily." The Proof component renders the honest empty state
 * below instead of this array until real ones exist.
 */
export const testimonials: Testimonial[] = [];

export const proofEmptyState = {
  eyebrow: "04 / PROOF",
  heading: "No client quotes yet.\nHere's what's true instead.",
  body: "I haven't taken paid client work yet — everything above is self-initiated. Rather than fill this section with quotes I don't have, I'm asking to be one of the first: message me, and if we work together, I'll ask to feature your result and your words here.",
  ctaLabel: "MESSAGE ME",
};
