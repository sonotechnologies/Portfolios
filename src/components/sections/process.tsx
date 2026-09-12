"use client";

import { useRef } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/motion/reveal";
import { ProcessRule } from "@/components/motion/process-rule";
import { processStages } from "@/content/process";

export function Process() {
  const sectionRef = useRef<HTMLElement | null>(null);

  return (
    <section
      id="process"
      data-section
      ref={sectionRef}
      className="px-5 py-20 md:px-20 md:py-40"
    >
      <SectionHeader
        eyebrow="03 / PROCESS"
        heading={"Four stages,\nno surprises"}
        intro="You always know which stage we're in and what's waiting on you. Anything waiting on you is marked — those are the only things that make a project late."
      />

      <div className="relative flex flex-col gap-10 md:flex-row md:gap-6">
        <ProcessRule sectionRef={sectionRef} />

        {processStages.map((stage, index) => (
          <Reveal
            key={stage.number}
            index={index}
            className="relative flex gap-6 md:flex-1 md:flex-col md:gap-0"
          >
            <span className="mono-label z-10 h-[54px] w-[54px] shrink-0 bg-ink font-display text-32 font-semibold leading-none tracking-tight text-paper md:h-[78px] md:w-auto md:pb-1 md:text-64">
              {stage.number}
            </span>
            <div className="flex flex-1 flex-col gap-5 md:pt-7">
              <div className="mono-label flex justify-between text-10 text-annotation">
                <span className={stage.number === "01" ? "text-hazard" : ""}>{stage.label}</span>
                <span>{stage.duration}</span>
              </div>
              <div className="font-display text-19 font-medium leading-tight tracking-tight text-paper md:text-28">
                {stage.title}
              </div>
              <p className="font-sans text-15 leading-relaxed text-annotation md:text-16">
                {stage.body}
              </p>
              <div
                className={`flex flex-col gap-2 border p-3.5 ${
                  stage.clientDependency ? "border-hazard-dim" : "border-edge"
                }`}
              >
                <span className={`mono-label text-10 ${stage.clientDependency ? "text-hazard" : "text-annotation"}`}>
                  ▲ I NEED FROM YOU
                </span>
                <span className="mono-label text-10 leading-relaxed text-paper">
                  {stage.needsFromClient}
                </span>
              </div>
              <div className="mono-label border-t border-dotted border-edge pt-3.5 text-10 leading-relaxed text-annotation">
                YOU GET
                <br />
                <span className="text-paper">{stage.youGet}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
