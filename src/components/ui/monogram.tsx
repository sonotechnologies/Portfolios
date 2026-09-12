import { cn } from "@/lib/utils";

/** Locked mark from the system sheet: option B, "the datum point". */
export function Monogram({ size = 30, className }: { size?: number; className?: string }) {
  const fontSize = Math.round(size * 0.5);
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full border border-hazard",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <span
        className="font-display font-semibold tracking-tight text-paper"
        style={{ fontSize }}
      >
        S<span className="text-hazard">.</span>
      </span>
    </span>
  );
}
