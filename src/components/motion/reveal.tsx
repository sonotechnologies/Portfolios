"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotionTier } from "@/lib/motion-tier";
import { cn } from "@/lib/utils";

/**
 * Generic section-entrance reveal: fade + slide up, triggered once when
 * scrolled into view. Used for cards, rows, tiles — anything that isn't a
 * headline (those use SplitReveal). `index` staggers siblings that enter
 * together without needing a shared parent observer.
 */
export function Reveal({
  children,
  className,
  index = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const tier = useMotionTier();

  useLayoutEffect(() => {
    const el = ref.current;
    if (tier === "still" || !el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y });
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () =>
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            delay: Math.min(index, 8) * 0.08,
          }),
      });
    }, el);

    return () => ctx.revert();
  }, [tier, index, y]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}
