import { Button } from "@/components/ui/button";
import { MonoLabel } from "@/components/ui/mono-label";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { proofEmptyState, testimonials } from "@/content/testimonials";
import { whatsappHref } from "@/content/site-config";

export function Proof() {
  if (testimonials.length > 0) {
    return (
      <section id="proof" data-section className="px-5 py-20 md:px-20 md:py-40">
        <MonoLabel className="mb-4 block text-hazard">04 / PROOF</MonoLabel>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} index={i} className="flex flex-col gap-5 border border-edge p-8">
              <p className="font-sans text-18 leading-relaxed text-paper">&ldquo;{t.quote}&rdquo;</p>
              <div className="mono-label text-11 text-annotation">
                {t.name.toUpperCase()} — {t.business.toUpperCase()}
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="proof" data-section className="px-5 py-20 md:px-20 md:py-40">
      <Reveal className="border border-edge p-10 md:p-16">
        <MonoLabel className="mb-6 block text-hazard">{proofEmptyState.eyebrow}</MonoLabel>
        <SplitReveal
          as="h2"
          text={proofEmptyState.heading}
          className="font-display text-32 font-semibold tracking-tight text-paper md:text-48"
        />
        <p className="mt-6 max-w-[560px] font-sans text-16 leading-relaxed text-annotation md:text-18">
          {proofEmptyState.body}
        </p>
        <Button href={whatsappHref()} variant="ghost" className="mt-8 inline-flex">
          {proofEmptyState.ctaLabel}
        </Button>
      </Reveal>
    </section>
  );
}
