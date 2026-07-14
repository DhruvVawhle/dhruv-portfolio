"use client";

import { useLayoutEffect } from "react";

/**
 * Initializes the data-theme attribute synchronously before the browser paints.
 * This replaces inline <script> tags in app/layout.tsx which React 19 / Next.js 16
 * flag with: "Encountered a script tag while rendering React component."
 */
export default function ThemeInitializer() {
  useLayoutEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      const theme =
        stored ||
        (window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light");
      document.documentElement.setAttribute("data-theme", theme);
    } catch (e) {}
  }, []);

  return null;
}
