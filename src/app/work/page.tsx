import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { MonoLabel } from "@/components/ui/mono-label";
import { Tag } from "@/components/ui/tag";
import { Header } from "@/components/sections/header";
import { ContactFooter } from "@/components/sections/contact-footer";
import { ViewTransitionLink } from "@/components/motion/view-transition-link";
import { plateTransitionStyle } from "@/lib/view-transition-names";
import { MeridianPlate, OdaraPlate, RelayPlate } from "@/components/sections/project-plates";

const plates: Record<string, React.ComponentType> = {
  meridian: MeridianPlate,
  relay: RelayPlate,
  odara: OdaraPlate,
};

export const metadata: Metadata = {
  title: "All Work",
  description: "The full list of concept builds — self-initiated, documented, and shipped.",
};

export default function WorkIndexPage() {
  return (
    <div>
      <Header />
      <main>
        <section className="px-5 py-16 md:px-20 md:py-24">
          <div className="border-t border-edge pt-6">
            <MonoLabel className="mb-4 block text-hazard">ALL WORK</MonoLabel>
            <h1 className="font-display text-48 font-semibold leading-[0.9] tracking-tight text-paper md:text-96">
              Every build,
              <br />
              in one place
            </h1>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
            {projects.map((project) => {
              const Plate = plates[project.slug];
              return (
                <ViewTransitionLink
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  data-cursor="view"
                  style={plateTransitionStyle(project.slug)}
                  className="group flex flex-col border border-edge"
                >
                  <div className="relative h-[220px] w-full overflow-hidden border-b border-edge">
                    {Plate ? (
                      <div className="h-full w-full transition-transform duration-300 ease-out group-hover:scale-[1.02]">
                        <Plate />
                      </div>
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(22deg, var(--color-blueprint) 0 5px, var(--color-surface) 5px 11px)",
                        }}
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-baseline justify-between">
                      <span className="font-display text-24 font-medium tracking-tight text-paper group-hover:text-hazard">
                        {project.name}
                      </span>
                      <span className="mono-label text-10 text-hazard">CONCEPT · {project.year}</span>
                    </div>
                    <p className="font-sans text-14 leading-relaxed text-annotation">
                      {project.oneLiner}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-3">
                      {project.stack ? (
                        project.stack.map((s) => <Tag key={s}>{s}</Tag>)
                      ) : (
                        <Tag>[STACK — SEND ME THE LIST]</Tag>
                      )}
                    </div>
                  </div>
                </ViewTransitionLink>
              );
            })}
          </div>
        </section>
        <ContactFooter />
      </main>
    </div>
  );
}
