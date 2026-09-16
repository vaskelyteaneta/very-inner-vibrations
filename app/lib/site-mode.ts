export type SiteMode = "light" | "dark";

// Very Inner Vibrations is always the dark site — a fully separate
// deployment from Malak Haynes (which is always light; see its own site-mode.ts).
export async function getSiteMode(): Promise<SiteMode> {
  return "dark";
}
