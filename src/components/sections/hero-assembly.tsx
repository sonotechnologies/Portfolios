"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotionTier } from "@/lib/motion-tier";
import { ExplodedAssemblyStatic } from "./exploded-assembly-static";
import type { HeroScene as HeroSceneComponent } from "@/components/three/hero-scene";

/**
 * FIG. 01 — the exploded assembly. `full` tier gets the real R3F scene,
 * scrubbed by scroll through this section; everything else gets the
 * static CSS diagram — brief: "mobile gets a single static exploded
 * [diagram]... no scrub."
 *
 * The `import()` below is only ever called from inside an effect gated on
 * `tier === "full"`, rather than relying on next/dynamic's conditional-
 * render-based splitting — measured requests showed Turbopack still
 * fetching a next/dynamic-wrapped chunk even when its component never
 * rendered. A plain dynamic `import()` is always its own chunk regardless
 * of bundler, so gating the call itself is the only way to guarantee the
 * three.js bundle never reaches a phone.
 */
export function HeroAssembly() {
  const tier = useMotionTier();
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);
  const [Scene, setScene] = useState<typeof HeroSceneComponent | null>(null);

  useEffect(() => {
    if (tier !== "full") return;
    let cancelled = false;
    import("@/components/three/hero-scene").then((mod) => {
      if (!cancelled) setScene(() => mod.HeroScene);
    });
    return () => {
      cancelled = true;
    };
  }, [tier]);

  useLayoutEffect(() => {
    const el = wrapperRef.current;
    if (tier !== "full" || !el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 75%",
        end: "bottom 20%",
        scrub: 0.6,
        onUpdate: (self) => {
          progressRef.current = self.progress;
        },
      });
    }, el);

    return () => ctx.revert();
  }, [tier]);

  return (
    <div ref={wrapperRef} className="relative aspect-[15/16] w-full max-w-[600px]">
      <span className="mono-label absolute -top-6 left-0 text-10 text-annotation">
        FIG. 01 — EXPLODED ASSEMBLY {tier === "full" ? "· SCRUBBED 0→100% SCROLL" : ""}
      </span>
      {tier === "full" && Scene ? <Scene progressRef={progressRef} /> : <ExplodedAssemblyStatic />}
    </div>
  );
}
