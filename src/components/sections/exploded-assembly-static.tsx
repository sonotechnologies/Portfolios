/**
 * Static stand-in for the FIG.01 exploded assembly — the `lite`/`still`
 * fallback (mobile/touch/reduced-motion), rendered inside HeroAssembly's
 * shared wrapper. Same four parts as the R3F version (NAV, CARD,
 * CHECKOUT, DATABASE) so the object being described stays consistent
 * across tiers; the cursor part is R3F-only decoration.
 */
export function ExplodedAssemblyStatic() {
  const parts = [
    { label: "01 NAV", top: "6%", left: "14%", w: "58%", h: 44 },
    { label: "02 CARD", top: "28%", left: "10%", w: "62%", h: 90 },
    { label: "03 DATABASE", top: "58%", left: "30%", w: "22%", h: 56 },
    { label: "04 CHECKOUT", top: "78%", left: "22%", w: "34%", h: 40, hazard: true },
  ];

  return (
    <div
      className="absolute inset-0"
      style={{ perspective: "900px" }}
      aria-label="Exploded diagram of a web app: nav bar, content card, database and a checkout button, connected by leader lines"
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
  );
}
