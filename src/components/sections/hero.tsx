import { AvailabilityBadge } from "@/components/global/availability-badge";
import { Button } from "@/components/ui/button";
import { RevealLines } from "@/components/motion/split-reveal";
import { ExplodedAssemblyStatic } from "./exploded-assembly-static";
import { siteConfig, whatsappHref } from "@/content/site-config";

export function Hero() {
  return (
    <section
      id="hero"
      data-section
      className="relative flex min-h-[calc(100dvh-64px)] flex-col justify-center gap-16 px-5 py-20 md:px-20 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-0"
    >
      <div className="max-w-[700px]">
        <div className="mb-9">
          <AvailabilityBadge />
        </div>
        <RevealLines
          as="h1"
          trigger="mount"
          className="font-display text-48 font-semibold leading-[0.9] tracking-tight text-paper md:text-72 lg:text-[82px]"
        >
          {"I build the part"}
          {"where the money"}
          <span className="relative inline-block">
            changes hands.
            <span className="absolute bottom-1 left-0 h-[3px] w-full bg-hazard md:h-[5px]" />
          </span>
        </RevealLines>
        <p className="mt-8 max-w-[470px] font-sans text-16 leading-relaxed text-annotation md:text-18">
          <span className="text-paper">Online stores and booking sites</span> for
          businesses that are losing sales to a broken WhatsApp DM flow. Two to
          four weeks, fixed price, stated before we start.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href={whatsappHref()} variant="primary">
            WHATSAPP {siteConfig.whatsapp.display}
          </Button>
          <Button href="#work" variant="ghost">
            SEE THE WORK ↓
          </Button>
        </div>
        <div className="mt-10 flex items-baseline gap-3 border-t border-edge pt-4">
          <span className="mono-label text-11 text-annotation">BY</span>
          <span className="font-sans text-16 font-medium text-paper md:text-18">
            {siteConfig.name}
          </span>
          <span className="mono-label hidden text-11 text-annotation sm:inline">
            — FREELANCE WEB DEVELOPER &amp; DESIGNER
          </span>
        </div>
      </div>

      <div className="hidden shrink-0 items-center justify-center lg:flex lg:w-[46%]">
        <ExplodedAssemblyStatic />
      </div>

      <div className="absolute bottom-8 left-5 hidden items-center gap-3.5 md:left-20 lg:flex">
        <span className="h-8 w-px bg-hazard" />
        <span className="mono-label text-10 text-annotation">
          SCROLL — 06 SECTIONS
        </span>
      </div>
    </section>
  );
}
