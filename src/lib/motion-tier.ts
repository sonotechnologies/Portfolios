"use client";

import { useSyncExternalStore } from "react";

export type MotionTier = "full" | "lite" | "still";

function computeTier(): MotionTier {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) return "still";

  const pointerFine = window.matchMedia("(pointer: fine)").matches;
  const viewportWide = window.matchMedia("(min-width: 1024px)").matches;
  const cores = navigator.hardwareConcurrency ?? 4;

  if (pointerFine && viewportWide && cores >= 4) return "full";
  return "lite";
}

function subscribe(callback: () => void) {
  const reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  reduceQuery.addEventListener("change", callback);
  return () => reduceQuery.removeEventListener("change", callback);
}

function getServerSnapshot(): MotionTier {
  return "still";
}

/**
 * Decided once at mount (re-derived only if prefers-reduced-motion flips),
 * per the brief's three-tier degradation model:
 * full  — pointer:fine, viewport >=1024, hardwareConcurrency >=4, no reduced-motion: R3F, pins, custom cursor, transitions.
 * lite  — touch / <1024 / low core count: no three.js bundle, no pins, no custom cursor, simple reveals/fades.
 * still — prefers-reduced-motion: no Lenis, no scrubs, no parallax, no autoplaying loops. Content is opacity-only.
 */
export function useMotionTier(): MotionTier {
  return useSyncExternalStore(subscribe, computeTier, getServerSnapshot);
}
