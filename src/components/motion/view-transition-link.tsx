"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { beginViewTransitionNavigate } from "@/lib/view-transition";

type LinkProps = React.ComponentProps<typeof Link>;

/** A next/link that navigates inside a View Transition when it can. */
export function ViewTransitionLink({ href, onClick, ...props }: LinkProps) {
  const router = useRouter();

  return (
    <Link
      href={href}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        // Let modified clicks (new tab, etc.) behave normally.
        if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

        e.preventDefault();
        beginViewTransitionNavigate(() => router.push(href.toString()));
      }}
      {...props}
    />
  );
}
