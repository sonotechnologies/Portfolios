import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge ships with a hardcoded picture of Tailwind's own default
// theme — it has no way to know our custom @theme tokens (globals.css)
// exist. Left unconfigured, it silently misclassifies our numeric type
// scale (text-9…text-160) as colliding with text-color utilities
// (text-ink, text-hazard, …) and drops whichever one appears first,
// regardless of order. Caught via a real Lighthouse contrast failure on
// the primary WhatsApp CTA: `cn("...", "text-14")` was silently deleting
// `text-ink` from the button, leaving the default (inherited) paper-toned
// text on a hazard background — 2.6:1 contrast against a 4.5:1 minimum.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "text-color": [
        {
          text: [
            "ink",
            "surface",
            "edge",
            "blueprint",
            "annotation",
            "paper",
            "hazard",
            "hazard-dim",
            "signal",
          ],
        },
      ],
      "font-size": [
        {
          text: [
            "9",
            "10",
            "11",
            "12",
            "14",
            "15",
            "16",
            "17",
            "18",
            "19",
            "20",
            "24",
            "28",
            "32",
            "48",
            "56",
            "64",
            "72",
            "96",
            "112",
            "160",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
