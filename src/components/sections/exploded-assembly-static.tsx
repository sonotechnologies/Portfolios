/**
 * Static stand-in for the FIG.01 exploded assembly. The real R3F version
 * (idle float + mouse parallax + scroll-scrubbed assembly) is a later
 * build-order step (5) — this CSS approximation carries the same parts
 * and labels so the section is complete and reviewable without it, and
 * doubles as the `lite`/`still` fallback art once R3F lands.
 */
export function ExplodedAssemblyStatic() {
  const parts = [
    { label: "01 NAV", top: "6%", left: "14%", w: "58%", h: 44 },
    { label: "02 PLATE", top: "26%", left: "8%", w: "64%", h: 74 },
    { label: "03 LISTINGS", top: "48%", left: "6%", w: "66%", h: 56 },
    { label: "04 CHECKOUT", top: "66%", left: "22%", w: "34%", h: 40, hazard: true },
    { label: "05 DATA", top: "82%", left: "30%", w: "22%", h: 40 },
  ];

  return (
    <div className="relative aspect-[15/16] w-full max-w-[600px]">
      <span className="mono-label absolute -top-6 left-0 text-10 text-annotation">
        FIG. 01 — EXPLODED ASSEMBLY
      </span>
      <div
        className="absolute inset-0"
        style={{ perspective: "900px" }}
        aria-label="Exploded diagram of a web app: nav bar, content plate, listings, checkout button and a database cylinder, connected by leader lines"
        role="img"
      >
        {parts.map((part) => (
          <div
            key={part.label}
            className="absolute"
            style={{
              top: part.top,
              left: part.left,
              width: part.w,
              transform: "rotateX(58deg) rotateZ(-36deg)",
            }}
          >
            <div
              className={`border ${part.hazard ? "border-hazard bg-hazard text-ink" : "border-edge bg-surface"}`}
              style={{ height: part.h }}
            />
            <span
              className={`mono-label absolute left-full ml-4 top-1/2 -translate-y-1/2 whitespace-nowrap text-10 ${part.hazard ? "text-hazard" : "text-paper"}`}
            >
              {part.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
