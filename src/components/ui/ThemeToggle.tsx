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
        className="flex items-center gap-2"
        aria-label="Toggle theme"
        id="theme-toggle"
      >
        <span className="w-4 h-4" />
        <div className="w-14 h-7 rounded-full bg-bg-surface border border-border-custom" />
        <span className="w-4 h-4" />
      </div>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 cursor-pointer group"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      id="theme-toggle"
      type="button"
    >
      {/* Sun Icon */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-colors duration-300"
        animate={{
          color: isDark ? "var(--color-text-secondary)" : "var(--color-accent)",
          scale: isDark ? 0.85 : 1,
          opacity: isDark ? 0.4 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
      <div className="relative w-14 h-7 rounded-full bg-text-primary/90 transition-colors duration-300 shadow-inner">
        {/* Sliding Knob */}
        <motion.div
          className="absolute top-1 left-1 w-5 h-5 rounded-full bg-bg shadow-md"
          animate={{ x: isDark ? 28 : 0 }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </div>

      {/* Moon Icon */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-colors duration-300"
        animate={{
          color: isDark ? "var(--color-accent)" : "var(--color-text-secondary)",
          scale: isDark ? 1 : 0.85,
          opacity: isDark ? 1 : 0.4,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </motion.svg>
    </button>
  );
}
