import { SectionHeader } from "@/components/ui/section-header";
import { SpecRow } from "@/components/ui/spec-row";
import { Tag } from "@/components/ui/tag";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { ViewTransitionLink } from "@/components/motion/view-transition-link";
import { plateTransitionStyle } from "@/lib/view-transition-names";
import { projects } from "@/content/projects";
import { FreshEatsPlate, MeridianPlate, NexaPlate, OdaraPlate, RelayPlate } from "./project-plates";

const plates = {
  meridian: MeridianPlate,
  relay: RelayPlate,
  odara: OdaraPlate,
  fresheats: FreshEatsPlate,
  nexa: NexaPlate,
};
const FEATURED_COUNT = 3;

export function Work() {
  const featured = projects.slice(0, FEATURED_COUNT);
  const hasMore = projects.length > FEATURED_COUNT;

  return (
    <section id="work" data-section className="px-5 py-20 md:px-20 md:py-40">
      <SectionHeader
        eyebrow="01 / SELECTED WORK"
        heading={"Three concept\nbuilds"}
        intro="Self-initiated. No client paid for these — I built them to solve problems I kept seeing, and to have something to point at. Labelled as concepts everywhere they appear."
      />

      <div className="flex flex-col gap-24 md:gap-40">
        {featured.map((project, index) => {
          const Plate = plates[project.slug as keyof typeof plates];
          const reversed = index === 1;
          return (
            <Reveal
              key={project.slug}
              index={index}
              className={`flex flex-col gap-10 md:gap-14 lg:flex-row lg:items-start ${
                reversed ? "lg:flex-row-reverse" : ""
              }`}
            >
              <ViewTransitionLink
                href={`/work/${project.slug}`}
                data-cursor="view"
                style={plateTransitionStyle(project.slug)}
                className="group relative block h-[280px] w-full shrink-0 overflow-hidden border border-edge md:h-[420px] lg:w-[58%]"
              >
                <div className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.012]">
                  <Plate />
                </div>
                {/* hazard tape border wipe: draws L->R on hover, per the artboard note */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 border-2 border-hazard opacity-0 transition-[clip-path,opacity] duration-300 ease-out [clip-path:inset(0_100%_0_0)] group-hover:opacity-100 group-hover:[clip-path:inset(0_0_0_0)]"
                />
              </ViewTransitionLink>
              <div className="flex-1 lg:pt-12">
                <div className="mb-6 font-display text-[96px] font-semibold leading-[0.8] tracking-tight text-edge md:text-[140px]">
                  {project.number}
                </div>
                <ViewTransitionLink
                  href={`/work/${project.slug}`}
                  className="font-display text-32 font-medium tracking-tight text-paper hover:text-hazard md:text-48"
                >
                  {project.name}
                </ViewTransitionLink>
                <div className="mono-label mt-3.5 text-11 text-hazard">
                  CONCEPT BUILD · {project.year}
                </div>
                <p className="mt-6 max-w-[420px] font-sans text-16 leading-relaxed text-annotation md:text-18">
                  {project.description}
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  {project.stack ? (
                    project.stack.map((s) => <Tag key={s}>{s}</Tag>)
                  ) : (
                    <Tag>[STACK — SEND ME THE LIST]</Tag>
                  )}
                </div>
                <div className="mt-8 flex max-w-[420px] flex-col gap-2.5">
                  <SpecRow label="ROLE" value={project.role.toUpperCase()} />
                  <SpecRow
                    label="LIVE"
                    value={
                      project.liveUrl ? (
                        <a href={project.liveUrl} className="text-hazard">
                          {project.liveUrl}
                        </a>
                      ) : (
                        <span className="text-hazard">[URL]</span>
                      )
                    }
                  />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      {hasMore ? (
        <div className="mt-16 flex justify-center md:mt-24">
          <ButtonLink href="/work" variant="ghost">
            SEE MORE WORK
          </ButtonLink>
        </div>
      ) : null}
    </section>
  );
}
