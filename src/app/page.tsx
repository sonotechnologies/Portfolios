import { Header } from "@/components/sections/header";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { Services } from "@/components/sections/services";
import { Process } from "@/components/sections/process";
import { Proof } from "@/components/sections/proof";
import { About } from "@/components/sections/about";
import { ContactFooter } from "@/components/sections/contact-footer";
import { SpecRail } from "@/components/global/spec-rail";
import { PersonJsonLd } from "@/components/global/json-ld";
import { Marquee } from "@/components/motion/marquee";
import { capabilities } from "@/content/capabilities";

const sections = [
  { id: "hero", label: "HERO" },
  { id: "work", label: "SELECTED WORK" },
  { id: "services", label: "SERVICES" },
  { id: "process", label: "PROCESS" },
  { id: "proof", label: "PROOF" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

export default function Home() {
  return (
    <div id="top">
      <PersonJsonLd />
      <SpecRail sections={sections} />
      <Header />
      <main>
        <Hero />
        <Marquee items={capabilities} />
        <Work />
        <Services />
        <Process />
        <Proof />
        <About />
        <ContactFooter />
      </main>
    </div>
  );
}
