"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { signalRouteSettled } from "@/lib/view-transition";

/**
 * Renders nothing — just watches for the route to actually change and
 * resolves the pending view transition at that point, which is more
 * reliable than guessing a fixed delay (RSC fetch time varies).
 */
export function RouteTransitionSignal() {
  const pathname = usePathname();

  useEffect(() => {
    signalRouteSettled();
  }, [pathname]);

  return null;
}
