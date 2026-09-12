import { MonoLabel } from "./mono-label";
import { SplitReveal } from "@/components/motion/split-reveal";

export function SectionHeader({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: string;
  intro?: React.ReactNode;
}) {
  return (
    <div className="relative mb-16 flex flex-col items-start justify-between gap-8 border-t border-edge pt-5 md:mb-24 md:flex-row md:items-end">
      <span className="absolute -top-px left-0 h-0.5 w-14 bg-hazard" />
      <div>
        <MonoLabel className="mb-4 block text-hazard">{eyebrow}</MonoLabel>
        <SplitReveal
          as="h2"
          text={heading}
          className="font-display text-48 font-semibold tracking-tight text-paper md:text-72 lg:text-112"
        />
      </div>
      {intro ? (
        <p className="max-w-sm font-sans text-16 leading-relaxed text-annotation md:text-18">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
