"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotionTier } from "@/lib/motion-tier";

/**
 * Smooth scroll, wired per the brief: Lenis lerp 0.09, driven off GSAP's
 * ticker with ScrollTrigger.update on every lenis scroll event. Disabled
 * entirely on the `still` tier (prefers-reduced-motion) so native scroll
 * and anchor links / back-forward scroll restoration behave normally.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const tier = useMotionTier();

  useEffect(() => {
    if (tier === "still") return;

    const lenis = new Lenis({ lerp: 0.09 });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [tier]);

  // Pins/reveals land in the wrong place if triggers are measured before
  // fonts finish swapping or images finish laying out — brief's motion rules.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return <>{children}</>;
}
