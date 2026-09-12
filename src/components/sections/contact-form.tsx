"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * UI only for now — no server action wired yet. Build order (brief 2) puts
 * the real Resend server action, honeypot + rate limit, and error states in
 * step 6, after the case study route and R3F hero. This gives an honest
 * success state locally so the layout is reviewable end to end.
 */
export function ContactForm({
  brokenOptions,
  budgetRanges,
}: {
  brokenOptions: readonly string[];
  budgetRanges: (string | null)[];
}) {
  const [broken, setBroken] = useState(brokenOptions[0]);
  const [budget, setBudget] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 border border-hazard p-16 text-center">
        <span className="flex h-[52px] w-[52px] items-center justify-center rounded-full border-2 border-hazard font-mono text-24 text-hazard">
          ✓
        </span>
        <p className="font-display text-24 font-medium text-paper">Message sent.</p>
        <p className="mono-label text-11 text-annotation">
          I REPLY TO EVERY ONE, EVEN THE NOS.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-8 border border-edge p-8 md:p-10"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="mono-label flex justify-between text-10 text-annotation">
        <span>ENQUIRY — 5 FIELDS</span>
        <span>2 MIN</span>
      </div>

      <label className="flex flex-col gap-2">
        <span className="mono-label text-10 text-annotation">YOUR NAME</span>
        <input
          required
          name="name"
          className="border-b border-edge bg-transparent py-3 font-sans text-16 text-paper outline-none placeholder:text-annotation focus:border-hazard"
          placeholder="Type here"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="mono-label text-10 text-annotation">BUSINESS — WHAT DO YOU SELL?</span>
        <input
          required
          name="business"
          className="border-b border-edge bg-transparent py-3 font-sans text-16 text-paper outline-none placeholder:text-annotation focus:border-hazard"
          placeholder="e.g. Ọdàrà Salon — silk press, braids"
        />
      </label>

      <fieldset className="flex flex-col gap-3">
        <legend className="mono-label mb-1 text-10 text-annotation">
          WHAT&apos;S BROKEN RIGHT NOW?
        </legend>
        <div className="flex flex-wrap gap-2">
          {brokenOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setBroken(option)}
              className={cn(
                "mono-label border px-3 py-2.5 text-11",
                broken === option ? "border-hazard text-hazard" : "border-edge text-annotation",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="mono-label mb-1 text-10 text-annotation">BUDGET RANGE</legend>
        <div className="flex gap-2">
          {budgetRanges.map((range, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setBudget(i)}
              className={cn(
                "mono-label flex-1 border px-2 py-2.5 text-center text-11",
                budget === i ? "border-hazard text-hazard" : "border-edge text-annotation",
              )}
            >
              {range ?? "₦[—]"}
            </button>
          ))}
        </div>
        <span className="mono-label text-10 text-annotation">
          RANGES MIRROR THE THREE TIERS — BLOCKED ON YOUR PRICES
        </span>
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className="mono-label text-10 text-annotation">WHEN DO YOU NEED IT?</span>
        <input
          name="timeline"
          className="border-b border-edge bg-transparent py-3 font-sans text-16 text-paper outline-none placeholder:text-annotation focus:border-hazard"
          placeholder="Type here"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="mono-label text-10 text-annotation">MESSAGE</span>
        <textarea
          name="message"
          rows={3}
          className="resize-none border-b border-edge bg-transparent py-3 font-sans text-16 text-paper outline-none placeholder:text-annotation focus:border-hazard"
          placeholder="Type here"
        />
      </label>

      {/* honeypot — real spam/rate-limit handling lands with the server action in build step 6 */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <button
        type="submit"
        className="mono-label bg-hazard py-[18px] text-center text-[13px] font-medium text-ink hover:bg-paper"
      >
        SEND IT
      </button>
      <span className="mono-label text-center text-10 text-annotation">
        I REPLY TO EVERY ONE, EVEN THE NOS.
      </span>
    </form>
  );
}
