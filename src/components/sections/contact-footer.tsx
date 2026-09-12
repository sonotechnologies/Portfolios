import { Monogram } from "@/components/ui/monogram";
import { MonoLabel } from "@/components/ui/mono-label";
import { Button } from "@/components/ui/button";
import { AvailabilityBadge } from "@/components/global/availability-badge";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { budgetRanges, brokenOptions } from "@/content/contact";
import { siteConfig, whatsappHref } from "@/content/site-config";
import { ContactForm } from "./contact-form";

export function ContactFooter() {
  return (
    <>
      <section id="contact" data-section className="px-5 pt-20 md:px-20 md:pt-40">
        <div className="relative mb-16 border-t border-edge pt-5 md:mb-24">
          <span className="absolute -top-px left-0 h-0.5 w-14 bg-hazard" />
          <MonoLabel className="text-hazard">06 / CONTACT</MonoLabel>
        </div>

        <div className="grid gap-16 lg:grid-cols-[1fr_560px] lg:items-start lg:gap-20">
          <div>
            <SplitReveal
              as="h2"
              text={"Tell me what's\nbreaking"}
              className="font-display text-56 font-semibold leading-[0.9] tracking-tight text-paper md:text-112"
            />
            <p className="mt-8 max-w-[520px] font-sans text-18 leading-relaxed text-annotation md:text-20">
              WhatsApp is fastest — I answer within a few hours most days. If
              you&apos;d rather write it out, the form goes to the same place.
            </p>

            <div className="mt-11 flex flex-col items-start gap-3.5">
              <Button href={whatsappHref()} variant="primary" className="text-14">
                WHATSAPP {siteConfig.whatsapp.display}
              </Button>
              <span className="mono-label text-11 text-annotation">
                OPENS A CHAT WITH A PRE-FILLED FIRST MESSAGE
              </span>
            </div>

            <div className="mt-14 flex max-w-[520px] flex-col gap-4 border-t border-edge pt-6">
              <div className="mono-label flex justify-between text-11 text-annotation">
                <span>EMAIL</span>
                <a href={`mailto:${siteConfig.email}`} className="text-paper hover:text-hazard">
                  {siteConfig.email}
                </a>
              </div>
              <div className="mono-label flex justify-between text-11 text-annotation">
                <span>INSTAGRAM</span>
                <span className="text-paper">{siteConfig.social.instagram ?? "[@HANDLE]"}</span>
              </div>
              <div className="mono-label flex justify-between text-11 text-annotation">
                <span>GITHUB</span>
                <span className="text-paper">{siteConfig.social.github ?? "[@HANDLE]"}</span>
              </div>
              <div className="mono-label flex justify-between text-11 text-annotation">
                <span>HOURS</span>
                <span className="text-paper">{siteConfig.hours}</span>
              </div>
            </div>

            <div className="mt-11">
              <AvailabilityBadge withClock={false} />
            </div>
          </div>

          <Reveal>
            <ContactForm brokenOptions={brokenOptions} budgetRanges={budgetRanges} />
          </Reveal>
        </div>
      </section>

      <footer className="mt-24 flex flex-col items-start gap-6 border-t border-edge px-5 py-11 md:mt-32 md:flex-row md:items-end md:justify-between md:px-20">
        <div className="flex items-center gap-3.5">
          <Monogram />
          <span className="mono-label text-11 text-annotation">
            {siteConfig.brand.toUpperCase()} — {siteConfig.name.toUpperCase()} · LAGOS, NG
          </span>
        </div>
        <div className="mono-label flex gap-7 text-11 text-annotation">
          <span>{siteConfig.social.instagram ?? "[@INSTAGRAM]"}</span>
          <span>{siteConfig.social.github ?? "[@GITHUB]"}</span>
          <span className="text-paper">
            © {new Date().getFullYear()} {siteConfig.name.toUpperCase()} · BUILT IN LAGOS · v1.0
          </span>
        </div>
      </footer>
    </>
  );
}
