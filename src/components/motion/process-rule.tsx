"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotionTier } from "@/lib/motion-tier";

/**
 * The base rule + hazard progress overlay for the process conveyor, scrubbed
 * to scroll through the section — "the horizontal rule draws L→R... scrubbed
 * to scroll" (brief 2, 03 Process). Mobile gets the brief's stated
 * equivalent: "vertical rule down the left... same draw, top to bottom."
 */
export function ProcessRule({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
  const hFillRef = useRef<HTMLSpanElement | null>(null);
  const vFillRef = useRef<HTMLSpanElement | null>(null);
  const tier = useMotionTier();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (tier === "still" || !section) return;

    const ctx = gsap.context(() => {
      gsap.set([hFillRef.current, vFillRef.current], { width: "0%", height: "0%" });
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        end: "bottom 60%",
        scrub: 0.6,
        onUpdate: (self) => {
          const pct = `${self.progress * 100}%`;
          if (hFillRef.current) hFillRef.current.style.width = pct;
          if (vFillRef.current) vFillRef.current.style.height = pct;
        },
      });
    }, section);

    return () => ctx.revert();
  }, [tier, sectionRef]);

  const stillStyle = tier === "still" ? { width: "100%", height: "100%" } : undefined;

  return (
    <>
      {/* mobile: vertical */}
      <span className="absolute left-[27px] top-0 h-full w-px bg-edge md:hidden" />
      <span
        ref={vFillRef}
        className="absolute left-[27px] top-0 w-0.5 bg-hazard md:hidden"
        style={stillStyle}
      />
      {/* desktop: horizontal */}
      <span className="absolute left-0 top-[78px] hidden h-px w-full bg-edge md:block" />
      <span
        ref={hFillRef}
        className="absolute left-0 top-[78px] hidden h-0.5 bg-hazard md:block"
        style={stillStyle}
      />
    </>
  );
}
