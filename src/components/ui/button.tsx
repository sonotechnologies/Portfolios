import Link from "next/link";
import { cn } from "@/lib/utils";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost";
};

const base =
  "mono-label inline-flex items-center justify-center text-[13px] px-7 py-4 transition-colors duration-150";
const variants = {
  primary: "bg-hazard text-ink hover:bg-paper active:translate-y-0.5 active:bg-hazard-dim active:text-paper",
  ghost: "border border-edge text-paper hover:border-hazard hover:text-hazard",
};

export function Button({
  children,
  className,
  variant = "primary",
  href,
  ...props
}: BaseProps & { href?: string } & React.ComponentPropsWithoutRef<"a">) {
  const classes = cn(base, variants[variant], className);
  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {children}
      </a>
    );
  }
  return <span className={classes}>{children}</span>;
}

export function ButtonLink({
  children,
  className,
  variant = "primary",
  href,
}: BaseProps & { href: string }) {
  return (
    <Link href={href} className={cn(base, variants[variant], className)}>
      {children}
    </Link>
  );
}
