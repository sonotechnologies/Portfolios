"use client";

import { useActionState, useState } from "react";
import { cn } from "@/lib/utils";
import { submitContactForm, type ContactFormState } from "@/lib/actions/contact";

const initialState: ContactFormState = { status: "idle" };

function FieldError({ messages }: { messages?: string[] }) {
  if (!messages?.length) return null;
  return <span className="mono-label text-10 text-hazard">{messages[0]}</span>;
}

export function ContactForm({
  brokenOptions,
  budgetRanges,
}: {
  brokenOptions: readonly string[];
  budgetRanges: (string | null)[];
}) {
  const [broken, setBroken] = useState(brokenOptions[0]);
  const [budgetIndex, setBudgetIndex] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [timeline, setTimeline] = useState("");
  const [message, setMessage] = useState("");
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);

  // React resets every uncontrolled field of a <form action={...}> once the
  // action settles — success or error. Left uncontrolled, a visitor who
  // fills the whole form but misses one required chip would see their
  // error... and an empty form. Controlling every text field from state we
  // own (state the action never touches) keeps typed values intact.

  const budgetValue = budgetIndex !== null ? (budgetRanges[budgetIndex] ?? "₦[—]") : "";

  if (state.status === "success") {
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
    <form action={formAction} className="flex flex-col gap-8 border border-edge p-8 md:p-10">
      <div className="mono-label flex justify-between text-10 text-annotation">
        <span>ENQUIRY — 5 FIELDS</span>
        <span>2 MIN</span>
      </div>

      {state.status === "error" && state.message && (
        <div className="mono-label border border-hazard-dim px-4 py-3 text-11 text-hazard">
          ▲ {state.message}
        </div>
      )}

      <label className="flex flex-col gap-2">
        <span className="mono-label text-10 text-annotation">YOUR NAME</span>
        <input
          required
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-b border-edge bg-transparent py-3 font-sans text-16 text-paper outline-none placeholder:text-annotation focus:border-hazard"
          placeholder="Type here"
        />
        <FieldError messages={state.fieldErrors?.name} />
      </label>

      <label className="flex flex-col gap-2">
        <span className="mono-label text-10 text-annotation">BUSINESS — WHAT DO YOU SELL?</span>
        <input
          required
          name="business"
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
          className="border-b border-edge bg-transparent py-3 font-sans text-16 text-paper outline-none placeholder:text-annotation focus:border-hazard"
          placeholder="e.g. Ọdàrà Salon — silk press, braids"
        />
        <FieldError messages={state.fieldErrors?.business} />
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
        <input type="hidden" name="broken" value={broken} />
      </fieldset>

      <fieldset className="flex flex-col gap-3">
        <legend className="mono-label mb-1 text-10 text-annotation">BUDGET RANGE</legend>
        <div className="flex gap-2">
          {budgetRanges.map((range, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setBudgetIndex(i)}
              className={cn(
                "mono-label flex-1 border px-2 py-2.5 text-center text-11",
                budgetIndex === i ? "border-hazard text-hazard" : "border-edge text-annotation",
              )}
            >
              {range ?? "₦[—]"}
            </button>
          ))}
        </div>
        <span className="mono-label text-10 text-annotation">
          RANGES MIRROR THE THREE TIERS — BLOCKED ON YOUR PRICES
        </span>
        <input type="hidden" name="budget" value={budgetValue} />
        <FieldError messages={state.fieldErrors?.budget} />
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className="mono-label text-10 text-annotation">WHEN DO YOU NEED IT?</span>
        <input
          name="timeline"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
          className="border-b border-edge bg-transparent py-3 font-sans text-16 text-paper outline-none placeholder:text-annotation focus:border-hazard"
          placeholder="Type here"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="mono-label text-10 text-annotation">MESSAGE</span>
        <textarea
          required
          name="message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="resize-none border-b border-edge bg-transparent py-3 font-sans text-16 text-paper outline-none placeholder:text-annotation focus:border-hazard"
          placeholder="Type here"
        />
        <FieldError messages={state.fieldErrors?.message} />
      </label>

      {/* honeypot — real visitors never fill this in */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <button
        type="submit"
        disabled={isPending}
        className="mono-label bg-hazard py-[18px] text-center text-[13px] font-medium text-ink transition-colors hover:bg-paper disabled:opacity-60"
      >
        {isPending ? "SENDING…" : "SEND IT"}
      </button>
      <span className="mono-label text-center text-10 text-annotation">
        I REPLY TO EVERY ONE, EVEN THE NOS.
      </span>
    </form>
  );
}
