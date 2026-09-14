/**
 * Simplified, structurally-distinct wireframe illustrations standing in for
 * real product screenshots — Meridian, Relay and Ọdàrà have no live demo or
 * screenshots yet (brief: "ask, don't invent"). These are honest sketches,
 * not fake product photography, and get swapped for real screenshots/video
 * loops once each project is deployed.
 */

export function MeridianPlate() {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden bg-surface">
      <div className="flex h-11 items-center gap-5 border-b border-edge px-5">
        <span className="font-display text-15 font-semibold text-paper">Meridian</span>
        <span className="h-6 flex-1 rounded-sm border border-edge" />
        <span className="h-6 w-16 bg-edge" />
      </div>
      <div className="flex flex-1">
        <div className="hidden w-[150px] shrink-0 flex-col gap-4 border-r border-edge p-4 sm:flex">
          <span className="mono-label text-9 text-annotation">FILTERS</span>
          {[80, 60, 70, 50].map((w, i) => (
            <span
              key={i}
              className={`h-1 rounded-full ${i === 2 ? "bg-hazard" : "bg-edge"}`}
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        <div className="grid flex-1 grid-cols-2 content-start gap-3 p-4">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`border ${i === 2 ? "border-hazard" : "border-edge"}`}>
              <div
                className="h-16"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, var(--color-blueprint) 0 6px, var(--color-surface) 6px 12px)",
                }}
              />
            </div>
          ))}
        </div>
        <div className="relative hidden flex-1 border-l border-edge bg-ink/60 md:block">
          <span className="absolute left-[25%] top-[30%] h-2.5 w-2.5 rounded-full bg-annotation" />
          <span className="absolute left-[55%] top-[55%] h-3.5 w-3.5 rounded-full bg-hazard shadow-[0_0_0_6px_rgba(255,91,4,0.18)]" />
          <span className="absolute left-[15%] top-[70%] h-2.5 w-2.5 rounded-full bg-annotation" />
        </div>
      </div>
    </div>
  );
}

export function RelayPlate() {
  const rows = [
    { id: "#4412", who: "A. OKON", status: "PICKED UP", eta: "12m", late: false },
    { id: "#4409", who: "T. BALOGUN", status: "LATE", eta: "+22m", late: true },
    { id: "#4408", who: "K. ADEYEMI", status: "EN ROUTE", eta: "31m", late: false },
    { id: "#4405", who: "I. MUSA", status: "QUEUED", eta: "—", late: false },
  ];
  return (
    <div className="flex h-full w-full flex-col bg-surface">
      <div className="grid grid-cols-4 divide-x divide-edge border-b border-edge">
        {[
          { label: "ACTIVE JOBS", value: "48" },
          { label: "RIDERS OUT", value: "11" },
          { label: "LATE", value: "3", hazard: true },
          { label: "AVG DROP", value: "41m" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1.5 p-3">
            <span className="mono-label text-9 text-annotation">{stat.label}</span>
            <span
              className={`font-display text-24 font-semibold ${stat.hazard ? "text-hazard" : "text-paper"}`}
            >
              {stat.value}
            </span>
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-hidden">
        <div className="mono-label flex gap-4 border-b border-edge px-4 py-2 text-9 text-annotation">
          <span className="w-14">JOB</span>
          <span className="flex-1">RIDER</span>
          <span className="w-20">STATUS</span>
        </div>
        {rows.map((row) => (
          <div
            key={row.id}
            className={`mono-label flex items-center gap-4 border-b border-blueprint px-4 py-2.5 text-10 text-paper ${row.late ? "bg-hazard/5" : ""}`}
          >
            <span className="w-14 text-annotation">{row.id}</span>
            <span className="flex-1">{row.who}</span>
            <span
              className={
                row.late
                  ? "bg-hazard px-1.5 py-0.5 text-9 font-medium text-ink"
                  : "border border-edge px-1.5 py-0.5 text-9 text-annotation"
              }
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FreshEatsPlate() {
  const steps = ["CONFIRMED", "PREPARING", "OUT FOR DELIVERY", "DELIVERED"];
  const activeStep = 2;
  return (
    <div className="flex h-full w-full bg-surface">
      <div className="flex flex-1 flex-col gap-4 border-r border-edge p-5">
        <div className="flex items-center justify-between">
          <span className="font-display text-17 font-semibold text-paper">FreshEats</span>
          <span className="h-6 w-20 rounded-full border border-edge" />
        </div>
        <div className="flex gap-2">
          {["ALL", "RICE", "GRILL", "SOUP"].map((c, i) => (
            <span
              key={c}
              className={`mono-label px-2.5 py-1 text-9 ${
                i === 1 ? "bg-hazard text-ink" : "border border-edge text-annotation"
              }`}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="grid flex-1 grid-cols-2 content-start gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-2 border border-edge p-2">
              <div
                className="h-12"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, var(--color-blueprint) 0 6px, var(--color-surface) 6px 12px)",
                }}
              />
              <span className="h-1.5 w-3/4 rounded-full bg-edge" />
            </div>
          ))}
        </div>
        <div className="mono-label flex items-center justify-between bg-hazard px-3 py-2.5 text-10 font-medium text-ink">
          <span>VIEW CART · 3 ITEMS</span>
          <span>₦6,200</span>
        </div>
      </div>
      <div className="hidden w-[42%] flex-col gap-4 p-5 sm:flex">
        <span className="mono-label text-9 text-annotation">YOUR ORDER — ETA 14 MIN</span>
        <div className="flex flex-col gap-2.5">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2.5">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  i <= activeStep ? "bg-hazard" : "border border-edge"
                }`}
              />
              <span
                className={`mono-label text-9 ${
                  i === activeStep ? "text-hazard" : i < activeStep ? "text-annotation line-through" : "text-annotation"
                }`}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-auto h-16 border-t border-edge pt-4">
          <span className="absolute left-0 top-1/2 h-px w-full bg-edge" />
          <span className="absolute left-[15%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-annotation" />
          <span className="absolute left-[60%] top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-hazard shadow-[0_0_0_6px_rgba(255,91,4,0.18)]" />
          <span className="absolute left-[92%] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-annotation" />
        </div>
      </div>
    </div>
  );
}

export function OdaraPlate() {
  return (
    <div className="flex h-full w-full bg-surface">
      <div className="flex flex-1 flex-col gap-4 border-r border-edge p-5">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-17 font-semibold text-paper">Ọdàrà</span>
          <span className="mono-label text-9 text-annotation">STEP 2 / 3</span>
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className={`aspect-square border ${i === 9 ? "border-hazard bg-hazard" : "border-blueprint"}`}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {["09:00", "10:30", "12:00", "14:30"].map((t) => (
            <span
              key={t}
              className={`mono-label px-2.5 py-1.5 text-10 ${
                t === "12:00"
                  ? "bg-hazard text-ink"
                  : t === "10:30"
                    ? "border border-edge text-annotation line-through"
                    : "border border-edge text-annotation"
              }`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="hidden w-[42%] flex-col gap-3.5 p-5 sm:flex">
        <span className="mono-label text-9 text-annotation">YOUR BOOKING</span>
        <div className="mono-label flex flex-col gap-2 text-10">
          <div className="flex justify-between text-annotation">
            <span>SERVICE</span>
            <span className="text-paper">SILK PRESS</span>
          </div>
          <div className="flex justify-between text-annotation">
            <span>WHEN</span>
            <span className="text-paper">WED 12:00</span>
          </div>
        </div>
        <div className="mono-label flex flex-col gap-2 border-t border-edge pt-3.5 text-10">
          <div className="flex justify-between text-annotation">
            <span>DEPOSIT NOW</span>
            <span className="text-hazard">₦8,400</span>
          </div>
        </div>
        <div className="mono-label mt-auto bg-hazard py-3 text-center text-11 font-medium text-ink">
          PAY DEPOSIT
        </div>
      </div>
    </div>
  );
}
