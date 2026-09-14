"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { SiteMode } from "@/app/lib/site-mode";

// Same cookie proxy.ts reads (MODE_COOKIE) — set directly on the client so
// switching themes doesn't require a full page navigation (which would
// reset scroll position to the top).
const MODE_COOKIE = "site-mode";

export default function ThemeToggle({ mode }: { mode: SiteMode }) {
  const router = useRouter();
  const nextMode: SiteMode = mode === "dark" ? "light" : "dark";
  const [dimmed, setDimmed] = useState(false);
  const blinkInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const startBlink = () => {
    if (blinkInterval.current) return;
    // Only blink on devices with a real hover (desktop). On touch, a tap fires
    // mouseenter but never mouseleave, so the blink would get stuck "on".
    if (typeof window !== "undefined" && !window.matchMedia("(hover: hover)").matches) return;
    blinkInterval.current = setInterval(() => setDimmed((prev) => !prev), 500);
  };

  const stopBlink = () => {
    if (blinkInterval.current) {
      clearInterval(blinkInterval.current);
      blinkInterval.current = null;
    }
    setDimmed(false);
  };

  const toggle = () => {
    document.cookie = `${MODE_COOKIE}=${nextMode}; path=/; max-age=${60 * 60 * 24 * 365}`;
    // Each mode has its own home (proxy.ts redirects "/" to /music for dark,
    // /movies for light) and pages don't necessarily exist in both modes, so
    // land on the new mode's home instead of refreshing in place.
    router.push("/");
  };

  return (
    <button
      type="button"
      onClick={toggle}
      onMouseEnter={startBlink}
      onMouseLeave={stopBlink}
      aria-label={`Switch to ${nextMode} mode`}
      className="theme-toggle"
      style={{
        display: "block",
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: nextMode === "dark" ? "#000" : "#fff",
        border: "1px solid rgba(128,128,128,0.5)",
        padding: 0,
        cursor: "pointer",
        opacity: dimmed ? 0.15 : 1,
        transition: "opacity 0.15s ease",
      }}
    />
  );
}
