import { siteConfig } from "@/content/site-config";
import { LiveClock } from "./live-clock";

export function AvailabilityBadge({ withClock = true }: { withClock?: boolean }) {
  const { isAvailable, takingWorkFrom } = siteConfig.availability;
  return (
    <div className="mono-label flex items-center gap-3 text-12">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-signal motion-safe:animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
      </span>
      <span className="text-paper">
        {isAvailable
          ? takingWorkFrom
            ? `AVAILABLE FROM ${takingWorkFrom}`
            : "AVAILABLE FOR WORK"
          : "BOOKED UP"}
      </span>
      {withClock ? (
        <>
          <span className="text-annotation">·</span>
          <LiveClock className="text-annotation" />
        </>
      ) : null}
    </div>
  );
}
