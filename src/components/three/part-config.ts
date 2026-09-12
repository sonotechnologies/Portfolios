export type PartKind = "box" | "cylinder" | "cursor";

export type PartConfig = {
  id: string;
  label: string;
  kind: PartKind;
  size: [number, number, number]; // width, height, depth (radius/height for cylinder)
  color: string;
  hazard?: boolean;
  /** Position at rest, floating apart. */
  exploded: [number, number, number];
  /** Position once scrolled fully assembled. */
  assembled: [number, number, number];
  /** Where its mono label + leader-line endpoint sits, in the exploded state. */
  labelOffset: [number, number, number];
};

/**
 * The exploded assembly: nav bar, card, button, database cylinder and a
 * cursor, per the brief's hero spec. Assembled positions stack them into
 * a single flat "page" — the cursor lands on the button, on the theme
 * ("I build the part where the money changes hands").
 */
export const heroParts: PartConfig[] = [
  {
    id: "nav",
    label: "01 NAV",
    kind: "box",
    size: [2.6, 0.34, 0.12],
    color: "#131417",
    exploded: [0.1, 1.9, -0.4],
    assembled: [0, 1.35, 0],
    labelOffset: [1.7, 0, 0],
  },
  {
    id: "card",
    label: "02 CARD",
    kind: "box",
    size: [2.2, 1.15, 0.12],
    color: "#131417",
    exploded: [-0.9, 0.55, 0.3],
    assembled: [0, 0.35, 0],
    labelOffset: [1.5, 0, 0],
  },
  {
    id: "database",
    label: "03 DATABASE",
    kind: "cylinder",
    size: [0.55, 0.9, 0],
    color: "#131417",
    exploded: [0.5, -0.85, -0.6],
    assembled: [0, -1.15, 0],
    labelOffset: [1.2, 0, 0],
  },
  {
    id: "button",
    label: "04 CHECKOUT",
    kind: "box",
    size: [0.95, 0.4, 0.16],
    color: "#FF5B04",
    hazard: true,
    exploded: [-0.9, -1.7, 0.5],
    assembled: [0, -0.35, 0.05],
    labelOffset: [1.5, 0, 0],
  },
  {
    id: "cursor",
    label: "05 CURSOR",
    kind: "cursor",
    size: [0.22, 0.28, 0],
    color: "#EDEAE3",
    exploded: [1.1, -1.5, 1.1],
    assembled: [0.55, -0.35, 0.35],
    labelOffset: [0.7, 0.1, 0],
  },
];
