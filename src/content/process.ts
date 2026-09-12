export type ProcessStage = {
  number: string;
  label: string;
  duration: string;
  title: string;
  body: string;
  needsFromClient: string;
  clientDependency: boolean;
  youGet: string;
};

export const processStages: ProcessStage[] = [
  {
    number: "01",
    label: "SCOPE",
    duration: "1–2 DAYS",
    title: "We agree what we're building",
    body: "A call, then a written scope: pages, features, price, dates. Nothing starts until you've read it back to me.",
    needsFromClient: "30 MINUTES ON A CALL",
    clientDependency: true,
    youGet: "SCOPE DOC · FIXED PRICE · START DATE",
  },
  {
    number: "02",
    label: "DESIGN",
    duration: "3–6 DAYS",
    title: "You see it before it's built",
    body: "Full screens, real content, on desktop and phone. We do the revision rounds here, where changes are cheap.",
    needsFromClient: "LOGO · PRODUCT PHOTOS · PRICES · FEEDBACK IN 48H",
    clientDependency: true,
    youGet: "CLICKABLE DESIGN · [N] REVISION ROUNDS",
  },
  {
    number: "03",
    label: "BUILD",
    duration: "1–3 WEEKS",
    title: "I build it and you watch it happen",
    body: "A staging link from day one, updated as I go. Payments tested with real transactions before anyone else sees it.",
    needsFromClient: "PAYSTACK ACCOUNT · DOMAIN ACCESS",
    clientDependency: false,
    youGet: "STAGING LINK · WEEKLY UPDATE",
  },
  {
    number: "04",
    label: "LAUNCH",
    duration: "1 DAY",
    title: "It goes live and it's yours",
    body: "I hand over the code, the hosting and the domain in your name, walk you through updating it, and fix anything broken free for [N] days.",
    needsFromClient: "1 HOUR FOR THE HANDOVER CALL",
    clientDependency: false,
    youGet: "LIVE SITE · REPO · [N]-DAY FIXES",
  },
];
