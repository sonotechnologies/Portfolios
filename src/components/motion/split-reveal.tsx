"use client";

import { Children, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useMotionTier } from "@/lib/motion-tier";

type Tag = "h1" | "h2" | "h3" | "div";

function useLineRevealEffect(
  ref: React.RefObject<HTMLElement | null>,
  trigger: "scroll" | "mount",
) {
  const tier = useMotionTier();

  useLayoutEffect(() => {
    const el = ref.current;
    if (tier === "still" || !el) return;

    const ctx = gsap.context(() => {
      const targets = el.querySelectorAll(".reveal-inner");
      gsap.set(targets, { yPercent: 110, rotate: 6, opacity: 0 });

      const play = () =>
        gsap.to(targets, {
          yPercent: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
        });

      if (trigger === "mount") {
        play();
      } else {
        ScrollTrigger.create({ trigger: el, start: "top 80%", once: true, onEnter: play });
      }
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tier, trigger]);
}

/**
 * The brief's global text-reveal rule: split to lines, clip-mask + y:110% +
 * rotate 6deg, 80ms stagger, power3.out, 0.9s. Every headline uses it.
 *
 * Takes line content as children (one child per line — can carry its own
 * markup, e.g. an inline underline) rather than a plain string, so a line
 * with embedded decoration still gets a single mask/transform wrapper.
 *
 * Lines render as plain visible content in the initial markup — the hidden
 * starting state is applied by gsap.set() at effect time, never by CSS
 * that defaults to hidden. If JS never runs, the heading just sits there
 * fully readable (brief: "never animate in a way that leaves text
 * invisible if JS fails").
 */
export function RevealLines({
  children,
  as = "div",
  className,
  trigger = "scroll",
}: {
  children: React.ReactNode;
  as?: Tag;
  className?: string;
  trigger?: "scroll" | "mount";
}) {
  const containerRef = useRef<HTMLElement | null>(null);
  useLineRevealEffect(containerRef, trigger);

  const Tag = as;

  return (
    <Tag ref={containerRef as never} className={className}>
      {Children.map(children, (line, i) => (
        <span key={i} className="block overflow-hidden">
          <span className="reveal-inner inline-block">{line}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Convenience wrapper for the common case: a heading made of plain-text lines. */
export function SplitReveal({
  text,
  as = "div",
  className,
  trigger = "scroll",
}: {
  text: string;
  as?: Tag;
  className?: string;
  trigger?: "scroll" | "mount";
}) {
  return (
    <RevealLines as={as} className={className} trigger={trigger}>
      {text.split("\n")}
    </RevealLines>
  );
}
