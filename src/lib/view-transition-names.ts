/**
 * Shared `view-transition-name` per project, used on both the work-index
 * plate and the case-study hero/next-project plate so the browser
 * interpolates position and size between them automatically — the
 * brief's "clicked thumbnail flies into the case-study hero position."
 */
export function plateTransitionName(slug: string) {
  return `plate-${slug}`;
}

/** React's CSSProperties type doesn't know about this property yet. */
export function plateTransitionStyle(slug: string): React.CSSProperties {
  return { viewTransitionName: plateTransitionName(slug) } as React.CSSProperties;
}
