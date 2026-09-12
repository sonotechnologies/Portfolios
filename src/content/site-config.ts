/**
 * Central place for facts about Moshood / Sono Technologies that the brief
 * supplied directly. Fields set to `null` are the brief's own "ask, don't
 * invent" list — fill them in once real values exist; nothing downstream
 * should silently invent a fallback for them.
 */
export const siteConfig = {
  name: "Moshood Ibrahim Bolaji",
  brand: "Sono Technologies",
  brandShort: "Sono",
  location: "Lagos, Nigeria",
  timeZone: "Africa/Lagos" as const,
  email: "sonotechnologies@gmail.com",
  whatsapp: {
    display: "0913 092 8293",
    international: "2349130928293",
    prefilledMessage:
      "Hi Moshood, I saw your portfolio and I'd like to talk about a site for my business.",
  },
  /** Not registered yet — brief 2, "Who this is for" table. */
  domain: null as string | null,
  /** Brief 2 footer spec: "[SOCIAL LINKS] (ask me)". */
  social: {
    instagram: null as string | null,
    github: null as string | null,
  },
  hours: "MON–SAT · 09:00–20:00 WAT",
  /** Brief 1 system sheet: signal green is spent exactly once — here. */
  availability: {
    isAvailable: true,
    takingWorkFrom: null as string | null,
  },
  tagline:
    "I build online stores and booking sites for businesses that are losing sales to a broken WhatsApp DM flow. Two to four weeks, fixed price, stated before we start.",
} as const;

export function whatsappHref(message = siteConfig.whatsapp.prefilledMessage) {
  return `https://wa.me/${siteConfig.whatsapp.international}?text=${encodeURIComponent(message)}`;
}
