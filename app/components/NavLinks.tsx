"use client";

import { usePathname } from "next/navigation";
import { PrismicNextLink } from "@prismicio/next";
import { isFilled, asLink, type Content } from "@prismicio/client";
import type { SiteMode } from "@/app/lib/site-mode";
import { linkResolver } from "@/prismicio";

// Each nav item can be limited to the White (light = Malak Haynes) or Black
// (dark = Very Inner Vibrations) version. "Both" (or unset) always shows.
function visibleForMode(item: Content.SettingsDocumentDataNavigationItem, mode: SiteMode): boolean {
  const v = item.visible_on ?? "Both";
  if (v === "White only") return mode === "light";
  if (v === "Black only") return mode === "dark";
  return true;
}

export default function NavLinks({ items, mode }: { items: Content.SettingsDocumentDataNavigationItem[]; mode: SiteMode }) {
  const pathname = usePathname();

  return (
    <nav style={{ display: "flex", gap: "2.5rem" }}>
      {items.filter((item) => visibleForMode(item, mode)).map((item) => {
        const href = isFilled.link(item.link) ? asLink(item.link, linkResolver) : undefined;
        const isActive = href
          ? href === "/"
            ? pathname === "/"
            : pathname === href || pathname.startsWith(`${href}/`)
          : false;

        return (
          <PrismicNextLink
            key={item.label}
            field={item.link}
            linkResolver={linkResolver}
            style={{
              fontSize: "1rem",
              color: isActive ? "#888" : "var(--foreground)",
              textDecoration: "none",
            }}
          >
            {item.label}
          </PrismicNextLink>
        );
      })}
    </nav>
  );
}
