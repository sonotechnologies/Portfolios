import { cn } from "@/lib/utils";

/** The repeating diagonal hazard stripe used to mark the recommended tier, hover states, etc. */
export function HazardTape({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("h-5 w-full", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, var(--color-hazard) 0 10px, var(--color-ink) 10px 20px)",
      }}
    />
  );
}
