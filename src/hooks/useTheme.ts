"use client";

import { useEffect, useState, useCallback } from "react";

type Theme = "dark" | "light";

/**
 * Theme management hook.
 * - Respects prefers-color-scheme on first visit
 * - Persists user choice in localStorage
 * - No FOUC — theme is applied before paint via the synchronous script in <head>
 * - Listens for dynamic OS theme changes when no explicit override is saved
 */
export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const activeAttr = document.documentElement.getAttribute("data-theme") as Theme | null;
      if (activeAttr === "dark" || activeAttr === "light") {
        return activeAttr;
      }
      try {
        const stored = localStorage.getItem("theme") as Theme | null;
        if (stored === "dark" || stored === "light") return stored;
      } catch (e) {}
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    // Ensure document attribute is in sync with resolved state
    const activeAttr = document.documentElement.getAttribute("data-theme");
    if (!activeAttr || activeAttr !== theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  // Listen for system theme changes if user hasn't chosen an explicit override
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      try {
        const stored = localStorage.getItem("theme");
        if (!stored) {
          const newTheme: Theme = e.matches ? "dark" : "light";
          setThemeState(newTheme);
          document.documentElement.setAttribute("data-theme", newTheme);
        }
      } catch (err) {}
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem("theme", newTheme);
    } catch (e) {}
    document.documentElement.setAttribute("data-theme", newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  }, [theme, setTheme]);

  return { theme, toggleTheme, mounted };
}
