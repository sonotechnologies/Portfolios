"use client";

import { useEffect, useState } from "react";

export type SpecRailSection = { id: string; label: string };

/**
 * Left-edge "spec rail": current section number + a scroll progress line.
 * Global, fixed, pointer-events:none, decorative (aria-hidden) — the real
 * navigation lives in the header. Section boundaries are read from
 * data-section elements already in the DOM rather than duplicated here.
 */
export function SpecRail({ sections }: { sections: SpecRailSection[] }) {
  const [progress, setProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);

      const midpoint = window.scrollY + window.innerHeight * 0.3;
      let current = 0;
      sections.forEach((section, index) => {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= midpoint) current = index;
      });
      setActiveIndex(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [sections]);

  const active = sections[activeIndex];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-8 top-[140px] bottom-[120px] hidden w-px bg-edge lg:block"
    >
      <div
        className="absolute left-0 top-0 w-0.5 bg-hazard transition-[height] duration-150"
        style={{ height: `${Math.min(1, Math.max(0, progress)) * 100}%` }}
      />
      <div className="mono-label absolute left-2.5 top-0 text-12 text-paper">
        {String(activeIndex).padStart(2, "0")}
      </div>
      <div
        className="mono-label absolute left-2.5 top-12 text-12 text-annotation"
        style={{ writingMode: "vertical-rl" }}
      >
        {active?.label}
      </div>
    </div>
  );
}
