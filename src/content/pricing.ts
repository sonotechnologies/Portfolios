/**
 * Every bracketed value here is a real blocker named in both briefs: tier
 * names, line items, prices (₦ + $), timelines and exclusions. None of it
 * is invented — ask Moshood, then replace the `null`s.
 */
export type PricingLineItem = { label: string; value: string | null };

export type PricingTier = {
  tierNumber: "01" | "02" | "03";
  recommended: boolean;
  name: string | null;
  timeframe: string | null;
  audience: string | null;
  lineItems: PricingLineItem[];
  notIncluded: string | null;
  priceNaira: string | null;
  priceUsd: string | null;
  paymentNote: string;
  ctaLabel: "START HERE" | "WHATSAPP" | "BOOK A CALL";
};

export const pricingTiers: PricingTier[] = [
  {
    tierNumber: "01",
    recommended: false,
    name: null,
    timeframe: null,
    audience: null,
    lineItems: [
      { label: "PAGES", value: null },
      { label: "REVISION ROUNDS", value: null },
      { label: "WHATSAPP ORDER FLOW", value: null },
      { label: "PAYMENTS", value: null },
      { label: "POST-LAUNCH FIXES", value: null },
    ],
    notIncluded: null,
    priceNaira: null,
    priceUsd: null,
    paymentNote: "50% TO START",
    ctaLabel: "START HERE",
  },
  {
    tierNumber: "02",
    recommended: true,
    name: null,
    timeframe: null,
    audience: null,
    lineItems: [
      { label: "PAGES", value: null },
      { label: "REVISION ROUNDS", value: null },
      { label: "PRODUCT CATALOGUE", value: null },
      { label: "PAYSTACK / FLUTTERWAVE", value: null },
      { label: "ADMIN DASHBOARD", value: null },
      { label: "TRAINING CALL", value: null },
      { label: "POST-LAUNCH FIXES", value: null },
    ],
    notIncluded: "COPYWRITING · PHOTOGRAPHY · ADS",
    priceNaira: null,
    priceUsd: null,
    paymentNote: "50% TO START",
    ctaLabel: "WHATSAPP",
  },
  {
    tierNumber: "03",
    recommended: false,
    name: null,
    timeframe: null,
    audience: null,
    lineItems: [
      { label: "SCOPE", value: "CUSTOM" },
      { label: "DISCOVERY", value: null },
      { label: "INTEGRATIONS", value: null },
      { label: "HANDOVER DOCS", value: null },
      { label: "SUPPORT RETAINER", value: "OPTIONAL" },
    ],
    notIncluded: null,
    priceNaira: null,
    priceUsd: null,
    paymentNote: "QUOTED AFTER A CALL",
    ctaLabel: "BOOK A CALL",
  },
];

export const paymentTerms =
  "50% to start, 50% on launch. Transfer or card. You own the code and the domain from day one — I hand over the repository and the hosting account, not a login to something of mine.";
