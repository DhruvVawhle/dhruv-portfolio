"use client";

import { useTheme } from "@/hooks/useTheme";
import { motion } from "motion/react";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  const isDark = theme === "dark";

  // Avoid hydration mismatch
  if (!mounted) {
    return (
      <div
        className="flex items-center gap-1.5 sm:gap-2 px-1 py-1"
        aria-label="Toggle theme"
        id="theme-toggle"
      >
        <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
        <div className="w-12 h-6 rounded-full bg-bg-surface border border-border-custom" />
        <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group min-h-[44px] px-1 py-1 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95 motion-safe:transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      id="theme-toggle"
      type="button"
    >
      {/* Sun Icon (Visible on both mobile and desktop) */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-300 flex-shrink-0"
        animate={{
          color: isDark ? "var(--color-text-secondary)" : "var(--color-accent)",
          scale: isDark ? 0.85 : 1.05,
          opacity: isDark ? 0.45 : 1,
        }}
        transition={{ duration: 0.25 }}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </motion.svg>

      {/* Toggle Track */}
      <div className="relative w-12 h-6 rounded-full bg-text-primary/90 transition-colors duration-300 shadow-inner flex items-center">
        {/* Sliding Knob */}
        <motion.div
          className="absolute top-[2px] left-[2px] w-5 h-5 rounded-full bg-bg shadow-sm pointer-events-none"
          animate={{ x: isDark ? 24 : 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </div>

      {/* Moon Icon (Visible on both mobile and desktop) */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-300 flex-shrink-0"
        animate={{
          color: isDark ? "var(--color-accent)" : "var(--color-text-secondary)",
          scale: isDark ? 1.05 : 0.85,
          opacity: isDark ? 1 : 0.45,
        }}
        transition={{ duration: 0.25 }}
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </motion.svg>
    </button>
  );
}
