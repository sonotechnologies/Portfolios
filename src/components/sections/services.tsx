import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import { SpecRow } from "@/components/ui/spec-row";
import { HazardTape } from "@/components/ui/hazard-tape";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { paymentTerms, pricingTiers } from "@/content/pricing";
import { siteConfig, whatsappHref } from "@/content/site-config";

export function Services() {
  return (
    <section id="services" data-section className="px-5 py-20 md:px-20 md:py-40">
      <SectionHeader
        eyebrow="02 / SERVICES & PRICING"
        heading="What it costs"
        intro="Fixed price, agreed before I start. If the scope changes we re-quote in writing. Prices in naira; dollar equivalent for clients billing abroad."
      />

      <div className="grid gap-6 lg:grid-cols-3 lg:items-start">
        {pricingTiers.map((tier, index) => (
          <Reveal
            key={tier.tierNumber}
            index={index}
            className={cn(
              "relative flex flex-col gap-7 border p-8",
              // Mobile: recommended tier renders first, fully open (brief 1, M02 note).
              tier.recommended
                ? "order-first border-hazard bg-surface lg:order-none lg:-mt-8"
                : "border-edge bg-ink",
            )}
          >
            {tier.recommended && <HazardTape className="absolute inset-x-0 top-0" />}
            <div
              className={cn(
                "mono-label flex justify-between text-10",
                tier.recommended ? "mt-3 text-hazard" : "text-annotation",
              )}
            >
              <span>
                TIER {tier.tierNumber}
                {tier.recommended ? " — WHAT MOST PEOPLE NEED" : ""}
              </span>
              <span>{tier.timeframe ?? "[TIMEFRAME]"}</span>
            </div>
            <div>
              <div className="font-display text-32 font-medium tracking-tight text-paper">
                {tier.name ?? "[TIER NAME]"}
              </div>
              <p className="mt-3.5 font-sans text-16 leading-relaxed text-annotation">
                {tier.audience ??
                  "[One line on who this is for — send me the tier definitions and I'll write it.]"}
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {tier.lineItems.map((item) => (
                <SpecRow key={item.label} label={item.label} value={item.value} />
              ))}
            </div>
            {tier.notIncluded && (
              <div className="mono-label border-l border-hazard pl-3.5 text-10 leading-relaxed text-annotation">
                NOT INCLUDED
                <br />
                <span className="text-paper">[{tier.notIncluded}]</span>
              </div>
            )}
            <div className="mt-auto flex flex-col gap-5">
              <div className="border-t border-edge pt-5">
                <div className="font-display text-48 font-semibold tracking-tight text-paper">
                  {tier.priceNaira ? `₦${tier.priceNaira}` : "₦[—]"}
                </div>
                <div className="mono-label mt-2 text-10 text-annotation">
                  ≈ {tier.priceUsd ? `$${tier.priceUsd}` : "$[—]"} · {tier.paymentNote}
                </div>
              </div>
              {tier.ctaLabel === "WHATSAPP" ? (
                <Button href={whatsappHref()} variant="primary" className="w-full">
                  WHATSAPP {siteConfig.whatsapp.display}
                </Button>
              ) : (
                <Button href="#contact" variant="ghost" className="w-full">
                  {tier.ctaLabel === "BOOK A CALL" ? "BOOK A CALL" : "START HERE"}
                </Button>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-20 flex flex-col gap-6 border-t border-edge pt-8 md:flex-row md:gap-20">
        <div className="mono-label w-full shrink-0 text-11 text-hazard md:w-[200px]">
          HOW PAYMENT WORKS
        </div>
        <p className="max-w-[640px] font-sans text-16 leading-relaxed text-annotation md:text-18">
          {paymentTerms}
        </p>
      </div>
    </section>
  );
}
