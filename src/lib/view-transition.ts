"use client";

/**
 * Page transitions per the brief: "a GSAP overlay: blueprint sheet wipes
 * across, route commits behind it, next page draws in." The browser's
 * native View Transitions API turns out to be the simpler tool for this —
 * it captures old/new snapshots of the page (and of any element sharing a
 * `view-transition-name`, which is how the work-card Flip morph works) and
 * lets us replace the default crossfade with our own wipe keyframes in CSS
 * (globals.css), with zero risk of it fighting Next's own DOM updates.
 *
 * We only ever wrap forward navigations triggered by ViewTransitionLink.
 * Browser back/forward is never intercepted, so history and scroll
 * restoration stay exactly as Next.js already handles them.
 */

let pendingResolve: (() => void) | null = null;

function supportsViewTransitions() {
  return typeof document !== "undefined" && "startViewTransition" in document;
}

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function beginViewTransitionNavigate(navigate: () => void) {
  if (!supportsViewTransitions() || prefersReducedMotion()) {
    navigate();
    return;
  }

  // Resolve any transition an interrupted click left hanging.
  pendingResolve?.();

  const documentWithViewTransitions = document as Document & {
    startViewTransition: (callback: () => void | Promise<void>) => void;
  };

  documentWithViewTransitions.startViewTransition(
    () =>
      new Promise<void>((resolve) => {
        pendingResolve = resolve;
        navigate();
        // Safety net: if the route-settled signal never fires (e.g. the
        // target unmounts before committing), don't leave the transition
        // — and the page — stuck.
        setTimeout(() => {
          if (pendingResolve === resolve) {
            resolve();
            pendingResolve = null;
          }
        }, 1600);
      }),
  );
}

/** Called from RouteTransitionSignal whenever the pathname actually changes. */
export function signalRouteSettled() {
  pendingResolve?.();
  pendingResolve = null;
}
