import { Monogram } from "@/components/ui/monogram";
import { siteConfig } from "@/content/site-config";

const navItems = [
  { href: "#work", label: "01 WORK" },
  { href: "#services", label: "02 SERVICES" },
  { href: "#process", label: "03 PROCESS" },
  { href: "#about", label: "05 ABOUT" },
  { href: "#contact", label: "06 CONTACT" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-edge/0 bg-ink/80 px-5 py-4 backdrop-blur-sm md:px-20 md:py-5">
      <a href="#top" className="flex items-center gap-3.5">
        <Monogram />
        <span className="mono-label hidden text-11 text-paper sm:inline">
          {siteConfig.brand.toUpperCase()}
        </span>
      </a>
      <nav className="mono-label hidden gap-9 text-11 text-annotation lg:flex">
        {navItems.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            className={
              i === navItems.length - 1
                ? "border-b border-hazard pb-0.5 text-hazard"
                : "hover:text-paper"
            }
          >
            {item.label}
          </a>
        ))}
      </nav>
      <a href="#contact" className="mono-label border border-edge px-3 py-1.5 text-11 text-paper lg:hidden">
        MENU
      </a>
    </header>
  );
}
