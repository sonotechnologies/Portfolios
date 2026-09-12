"use client";

import { useLayoutEffect, useRef } from "react";
import { useMotionTier } from "@/lib/motion-tier";
import { HazardTape } from "@/components/ui/hazard-tape";

const BASE_SPEED = 0.5; // px/frame
const MAX_BOOST = 3.5;

/**
 * Hazard-striped ticker for the stack/capability list. Seamless loop, speed
 * reacts to scroll velocity, pauses on hover. Disabled (static, no loop) on
 * the `still` tier — brief: "no autoplaying loops" under reduced motion.
 */
export function Marquee({ items }: { items: string[] }) {
  const tier = useMotionTier();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (tier === "still" || !track || !wrap) return;

    let x = 0;
    let paused = false;
    let velocityBoost = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();

    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    wrap.addEventListener("mouseenter", onEnter);
    wrap.addEventListener("mouseleave", onLeave);

    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(now - lastT, 16);
      const dy = window.scrollY - lastY;
      velocityBoost = Math.min(Math.abs(dy / dt) * 8, MAX_BOOST);
      lastY = window.scrollY;
      lastT = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf: number;
    const halfWidth = () => track.scrollWidth / 2;

    const tick = () => {
      if (!paused) {
        x -= BASE_SPEED + velocityBoost;
        velocityBoost *= 0.94; // decays back to baseline
        const w = halfWidth();
        if (w > 0 && Math.abs(x) >= w) x += w;
        track.style.transform = `translateX(${x}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("mouseenter", onEnter);
      wrap.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [tier]);

  const line = (
    <span className="mono-label flex shrink-0 items-center gap-8 pr-8 text-14 text-paper">
      {items.map((item) => (
        <span key={item} className="flex items-center gap-8">
          {item}
          <span aria-hidden className="text-hazard">
            ✦
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div ref={wrapRef} className="relative overflow-hidden border-y border-edge py-5">
      <HazardTape className="absolute inset-x-0 top-0 h-1" />
      <HazardTape className="absolute inset-x-0 bottom-0 h-1" />
      {tier === "still" ? (
        <div className="mono-label flex flex-wrap justify-center gap-x-8 gap-y-2 px-5 text-14 text-paper">
          {items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : (
        <div ref={trackRef} className="flex w-max whitespace-nowrap will-change-transform">
          {line}
          {line}
        </div>
      )}
    </div>
  );
}
