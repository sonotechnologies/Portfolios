import { MonoLabel } from "@/components/ui/mono-label";
import { SplitReveal } from "@/components/motion/split-reveal";
import { Reveal } from "@/components/motion/reveal";
import { aboutCopy, aboutNumbers } from "@/content/about";

export function About() {
  return (
    <section id="about" data-section className="px-5 py-20 md:px-20 md:py-40">
      <div className="relative mb-16 border-t border-edge pt-5 md:mb-24">
        <span className="absolute -top-px left-0 h-0.5 w-14 bg-hazard" />
        <MonoLabel className="text-hazard">05 / ABOUT</MonoLabel>
      </div>

      <div className="grid gap-14 lg:grid-cols-[480px_1fr] lg:items-start lg:gap-20">
        <div>
          <div className="relative h-[320px] overflow-hidden border border-edge bg-surface md:h-[600px]">
            <div
              className="absolute inset-0 opacity-90"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(22deg, var(--color-blueprint) 0 5px, var(--color-surface) 5px 11px)",
              }}
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-ink/95 to-transparent p-5">
              <span className="mono-label text-10 text-hazard">▲ PLACEHOLDER — DROP A PHOTO HERE</span>
              <span className="mono-label text-10 leading-relaxed text-paper">
                PORTRAIT · 480 × 600 · DUOTONE INK/PAPER
              </span>
            </div>
          </div>
          <div className="mono-label mt-4 flex justify-between text-10 text-annotation">
            <span>FIG. 05 — THE BUILDER</span>
            <span>LAGOS, NG</span>
          </div>
        </div>

        <div>
          <SplitReveal
            as="h2"
            text={aboutCopy.heading}
            className="font-display text-48 font-semibold tracking-tight text-paper md:text-72 lg:text-96"
          />
          <div className="mt-8 flex flex-col gap-6">
            {aboutCopy.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`max-w-[600px] font-sans leading-relaxed ${
                  i === 0 ? "text-18 text-paper md:text-20" : "text-16 text-annotation md:text-18"
                }`}
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-10 grid grid-cols-3 gap-px border border-edge bg-edge">
            {aboutNumbers.map((n, i) => (
              <Reveal key={n.label} index={i} className="flex flex-col gap-2.5 bg-ink p-5">
                <span
                  className={`font-display text-56 font-semibold leading-none tracking-tight ${
                    n.hazard ? "text-hazard" : "text-paper"
                  }`}
                >
                  {n.value}
                </span>
                <span className="mono-label whitespace-pre-line text-10 leading-relaxed text-annotation">
                  {n.label}
                </span>
              </Reveal>
            ))}
          </div>
          <p className="mono-label mt-4 text-10 text-annotation">{aboutCopy.noClientCountNote}</p>
        </div>
      </div>
    </section>
  );
}
