"use client";

import { useMotionTier } from "@/lib/motion-tier";

const NOISE_SVG =
  "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22140%22 height=%22140%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22/></filter><rect width=%22140%22 height=%22140%22 filter=%22url(%23n)%22/></svg>')";

/**
 * Full-page grain, 3% opacity. Animated (position jitter) on the `full`
 * tier only — a static texture reads identically on mid-range Android and
 * costs nothing, per the design brief's mobile-performance note.
 */
export function GrainOverlay() {
  const tier = useMotionTier();

  return (
    <div
      aria-hidden
      data-grain={tier === "full" ? "animated" : "static"}
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.03] [&[data-grain=animated]]:animate-grain"
      style={{ backgroundImage: NOISE_SVG }}
    />
  );
}
