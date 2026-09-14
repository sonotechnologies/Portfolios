import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { MonoLabel } from "@/components/ui/mono-label";
import { SpecRow } from "@/components/ui/spec-row";
import { Tag } from "@/components/ui/tag";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/sections/header";
import { ContactFooter } from "@/components/sections/contact-footer";
import { FreshEatsPlate, MeridianPlate, OdaraPlate, RelayPlate } from "@/components/sections/project-plates";
import { ViewTransitionLink } from "@/components/motion/view-transition-link";
import { plateTransitionStyle } from "@/lib/view-transition-names";

const plates = { meridian: MeridianPlate, relay: RelayPlate, odara: OdaraPlate, fresheats: FreshEatsPlate };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.description,
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const Plate = plates[project.slug as keyof typeof plates];
  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  const NextPlate = plates[nextProject.slug as keyof typeof plates];

  return (
    <div>
      <Header />
      <main>
        {/* HERO */}
        <section className="px-5 py-16 md:px-20 md:py-24">
          <div className="flex flex-col justify-between gap-10 border-t border-edge pt-6 md:flex-row md:items-end">
            <div>
              <MonoLabel className="mb-4 block text-hazard">
                {project.number} / CASE STUDY — {project.name.toUpperCase()} · CONCEPT BUILD
              </MonoLabel>
              <h1 className="font-display text-48 font-semibold leading-[0.9] tracking-tight text-paper md:text-96">
                {project.name}
              </h1>
            </div>
            <div className="flex w-full flex-col gap-3 md:w-[260px]">
              <SpecRow label="TYPE" value={project.caseStudy?.type ?? "CONCEPT"} />
              <SpecRow label="YEAR" value={project.year} />
              <SpecRow
                label="STACK"
                value={project.stack ? project.stack.join(" · ") : "[SEND]"}
              />
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

          <div
            className="relative mt-14 h-[280px] w-full border border-edge md:h-[560px]"
            style={plateTransitionStyle(project.slug)}
          >
            <Plate />
          </div>
        </section>

        {project.caseStudy ? (
          <section className="px-5 py-16 md:px-20 md:py-24">
            {/* sticky spec column + narrative */}
            <div className="grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-20">
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="flex flex-col gap-4">
                  <SpecRow label="ROLE" value={project.role.toUpperCase()} />
                  <SpecRow label="SCOPE" value={project.caseStudy.type} />
                  <SpecRow label="TIMELINE" value="[N WEEKS]" />
                  <SpecRow label="OUTCOME" value="[SEND]" />
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {(project.stack ?? ["[STACK — SEND ME THE LIST]"]).map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-16">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex flex-col gap-4 border border-edge p-8">
                    <MonoLabel>THE PROBLEM</MonoLabel>
                    <p className="font-sans text-20 leading-relaxed text-paper">
                      {project.caseStudy.problem}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 border border-hazard p-8">
                    <MonoLabel className="text-hazard">THE DECISION</MonoLabel>
                    <p className="font-sans text-20 leading-relaxed text-paper">
                      {project.caseStudy.decision}
                    </p>
                  </div>
                </div>

                <div>
                  <div className="mono-label mb-6 flex flex-wrap items-baseline gap-4 text-11 text-annotation">
                    <span className="text-hazard">FIG. 04</span>
                    <span className="text-paper">THE FLOW — {project.caseStudy.flow.length} SCREENS</span>
                  </div>
                  <div className="grid gap-6 sm:grid-cols-3">
                    {project.caseStudy.flow.map((screen) => (
                      <div key={screen.step} className="flex flex-col gap-4">
                        <div className="flex h-[280px] flex-col gap-4 border border-edge bg-surface p-5">
                          <div className="flex justify-between">
                            <span className="font-display text-15 font-semibold text-paper">
                              {project.name}
                            </span>
                            <span className="mono-label text-9 text-annotation">{screen.step}</span>
                          </div>
                          <div className="relative h-0.5 bg-edge">
                            <div
                              className="absolute inset-y-0 left-0 bg-hazard"
                              style={{ width: `${screen.progressPct}%` }}
                            />
                          </div>
                          <span className="mono-label text-9 text-hazard">{screen.label}</span>
                          <div className="mt-auto border border-edge py-3 text-center">
                            <span className="mono-label text-10 text-annotation">
                              {screen.progressPct === 100 ? "✓" : "CONTINUE"}
                            </span>
                          </div>
                        </div>
                        <p className="mono-label text-10 leading-relaxed text-annotation">
                          <span className="text-paper">{screen.note.title}</span>
                          <br />
                          {screen.note.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6 border-t border-edge pt-8 md:flex-row md:gap-20">
                  <div className="mono-label w-full shrink-0 text-11 text-hazard md:w-[200px]">
                    WHAT I&apos;D DO DIFFERENTLY
                  </div>
                  <p className="max-w-[700px] font-sans text-18 leading-relaxed text-annotation">
                    {project.caseStudy.whatIdDoDifferently}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="px-5 py-16 md:px-20 md:py-24">
            <div className="border border-edge p-10 md:p-16">
              <MonoLabel className="mb-4 block text-hazard">CASE STUDY — NOT WRITTEN YET</MonoLabel>
              <p className="max-w-[560px] font-sans text-18 leading-relaxed text-annotation">
                {project.description} A full decision-by-decision case study for {project.name}{" "}
                hasn&apos;t been written yet — this slot exists so the shape is ready once it is.
              </p>
            </div>
          </section>
        )}

        {/* NEXT PROJECT */}
        <section className="border-t border-edge px-5 py-16 md:px-20 md:py-24">
          <MonoLabel className="mb-6 block text-annotation">NEXT</MonoLabel>
          <ViewTransitionLink
            href={`/work/${nextProject.slug}`}
            style={plateTransitionStyle(nextProject.slug)}
            className="group relative flex h-[260px] flex-col justify-end overflow-hidden border border-edge p-8 md:h-[420px]"
          >
            <div className="absolute inset-0">
              <NextPlate />
            </div>
            <div className="relative bg-gradient-to-t from-ink via-ink/80 to-transparent pt-16">
              <span className="font-display text-32 font-medium tracking-tight text-paper group-hover:text-hazard md:text-56">
                {nextProject.name}
              </span>
            </div>
          </ViewTransitionLink>
          <div className="mt-10">
            <Button href="#contact" variant="ghost">
              TALK TO ME ABOUT A PROJECT LIKE THIS
            </Button>
          </div>
        </section>
        <ContactFooter />
      </main>
    </div>
  );
}
