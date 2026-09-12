"use client";

import { useEffect, useRef, useState } from "react";
import { useMotionTier } from "@/lib/motion-tier";

type Mode = "default" | "hover" | "view" | "text";

/**
 * Desktop pointer-fine only (`full` tier). Crosshair with a live coordinate
 * readout; hover (ring), view/drag (labelled disc) and text (I-beam) modes.
 * Lerped follow, mix-blend-mode difference over imagery. Never on touch —
 * the component renders nothing outside the `full` tier, so it never
 * fights a real cursor or blocks tap targets on phones.
 */
export function CustomCursor() {
  const tier = useMotionTier();
  const dotRef = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<Mode>("default");
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (tier !== "full") return;

    document.documentElement.classList.add("custom-cursor-active");

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...target };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      const el = e.target as HTMLElement | null;
      if (el?.closest('[data-cursor="view"]')) setMode("view");
      else if (el?.closest("input, textarea")) setMode("text");
      else if (el?.closest('a, button, [data-cursor="hover"]')) setMode("hover");
      else setMode("default");
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);

    let raf: number;
    const tick = () => {
      pos.x += (target.x - pos.x) * 0.2;
      pos.y += (target.y - pos.y) * 0.2;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [tier]);

  if (tier !== "full") return null;

  return (
    <div
      ref={dotRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 150ms" }}
    >
      {mode === "default" && (
        <div className="relative h-6 w-6">
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-paper" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-paper" />
          <span className="mono-label absolute left-3.5 top-2 whitespace-nowrap text-9 text-paper">
            {coords.x} · {coords.y}
          </span>
        </div>
      )}
      {mode === "hover" && <span className="block h-9 w-9 rounded-full border border-paper" />}
      {mode === "view" && (
        <span className="mono-label flex h-12 w-12 items-center justify-center rounded-full bg-hazard text-9 font-medium text-ink">
          VIEW
        </span>
      )}
      {mode === "text" && <span className="block h-6 w-0.5 bg-paper" />}
    </div>
  );
}
