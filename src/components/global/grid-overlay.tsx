/**
 * The blueprint grid: fixed, pointer-events:none, global per the brief.
 * Column pitch matches the 12-col / 80px margin desktop grid and the
 * 4-col / 20px margin mobile grid from the artboards.
 */
export function GridOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.055]"
      style={{
        backgroundImage:
          "repeating-linear-gradient(to right, var(--color-blueprint) 0 1px, transparent 1px 114px), repeating-linear-gradient(to bottom, var(--color-blueprint) 0 1px, transparent 1px 48px)",
        backgroundPosition: "80px 0",
      }}
    />
  );
}
