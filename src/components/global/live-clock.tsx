"use client";

import { useSyncExternalStore } from "react";
import { siteConfig } from "@/content/site-config";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: siteConfig.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function subscribe(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}

function getSnapshot() {
  return formatter.format(new Date());
}

/** Always Moshood's local Lagos time, never the visitor's — brief 2, hero spec. */
export function LiveClock({ className }: { className?: string }) {
  // Intl with an explicit timeZone works identically on the server, so the
  // server-rendered snapshot is already correct — no placeholder flash.
  const time = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  return (
    <span className={className} suppressHydrationWarning>
      LAGOS {time} GMT+1
    </span>
  );
}
