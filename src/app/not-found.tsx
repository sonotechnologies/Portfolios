import { Header } from "@/components/sections/header";
import { ButtonLink } from "@/components/ui/button";
import { MonoLabel } from "@/components/ui/mono-label";

export default function NotFound() {
  return (
    <div>
      <Header />
      <main className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
        <MonoLabel className="mb-6 text-hazard">FIG. 404</MonoLabel>
        <h1 className="font-display text-64 font-semibold tracking-tight text-paper md:text-112">
          PART NOT FOUND
        </h1>
        <p className="mt-6 max-w-md font-sans text-16 leading-relaxed text-annotation md:text-18">
          Whatever you were looking for isn&apos;t on this drawing. Check the
          part number, or go back to the assembly.
        </p>
        <ButtonLink href="/" variant="ghost" className="mt-10">
          BACK TO THE FLOOR
        </ButtonLink>
      </main>
    </div>
  );
}
