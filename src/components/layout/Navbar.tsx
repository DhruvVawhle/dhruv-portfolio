"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useReducedMotion } from "motion/react";
import { navLinks } from "@/lib/data";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("#about");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const isManualNavRef = useRef(false);
  const manualNavTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect touch device
  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window);
    setIsTouchDevice(isTouch);
  }, []);

  // Determine active section based on scroll position
  const determineActiveSection = useCallback(() => {
    if (isManualNavRef.current) return;

    const isAtBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 30;

    if (isAtBottom && navLinks.length > 0) {
      setActiveSection(navLinks[navLinks.length - 1].href);
      return;
    }

    const focalY = window.innerHeight * 0.35;
    let currentActive = "";

    for (const link of navLinks) {
      const id = link.href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      if (rect.top <= focalY && rect.bottom > 80) {
        currentActive = link.href;
      }
    }

    if (currentActive) {
      setActiveSection(currentActive);
    }
  }, []);

  // Scroll listener: update active section
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          determineActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    determineActiveSection();

    return () => window.removeEventListener("scroll", onScroll);
  }, [determineActiveSection]);

  // Synchronize on hash changes
  useEffect(() => {
    const syncWithHash = () => {
      const hash = window.location.hash;
      if (hash && navLinks.some((link) => link.href === hash)) {
        setActiveSection(hash);
      } else {
        determineActiveSection();
      }
    };

    syncWithHash();
    window.addEventListener("hashchange", syncWithHash);
    return () => window.removeEventListener("hashchange", syncWithHash);
  }, [determineActiveSection]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveSection(href);
    isManualNavRef.current = true;
    if (manualNavTimeoutRef.current) {
      clearTimeout(manualNavTimeoutRef.current);
    }
    manualNavTimeoutRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 850);

    if (typeof window !== "undefined") {
      if (window.__lenis) {
        const target = href === "#" || href === "#hero" ? 0 : href;
        window.__lenis.scrollTo(target, { offset: -70 });
      } else {
        const id = href.replace("#", "");
        if (id) {
          const el = document.getElementById(id);
          if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 70;
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
      history.pushState(null, "", href);
    }
  };

  const indicatorTarget = hoveredSection || activeSection;

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 pointer-events-none flex justify-center px-3 sm:px-4">
      <nav
        aria-label="Main floating navigation"
        className="pointer-events-auto max-w-[calc(100vw-1.5rem)] sm:max-w-max flex items-center gap-1.5 sm:gap-3 p-1.5 sm:p-2 rounded-full bg-bg-surface/85 dark:bg-bg-surface/80 border border-border-custom/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300"
      >
        {/* Brand Home mark */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="flex-shrink-0 pl-2 sm:pl-3 pr-1 text-xs font-mono font-bold text-text-primary hover:text-accent transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent rounded-full"
          aria-label="Dhruv Vawhle — Back to Top"
        >
          <span>DV</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        </a>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-border-custom/80 flex-shrink-0" />

        {/* Scrollable Pill Container for Nav Items */}
        <div className="relative flex-1 min-w-0 flex items-center">
          <div
            onMouseLeave={() => setHoveredSection(null)}
            className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap px-1 py-0.5"
          >
            {navLinks.map((link) => {
              const isSelected = indicatorTarget === link.href;
              const isCurrent = activeSection === link.href;

              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => {
                    if (!isTouchDevice && !shouldReduceMotion) {
                      setHoveredSection(link.href);
                    }
                  }}
                  className={`relative text-[11px] sm:text-xs font-mono px-3 sm:px-3.5 py-1.5 rounded-full transition-colors duration-200 z-10 select-none focus-visible:outline-2 focus-visible:outline-accent ${
                    isSelected
                      ? "text-background font-semibold"
                      : isCurrent
                        ? "text-text-primary font-medium"
                        : "text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="floating-nav-indicator"
                      className="absolute inset-0 bg-foreground rounded-full -z-10 shadow-sm"
                      transition={
                        shouldReduceMotion || isTouchDevice
                          ? { duration: 0 }
                          : {
                              type: "spring",
                              stiffness: 420,
                              damping: 30,
                            }
                      }
                    />
                  )}
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Fade on the right edge for mobile sideways scrolling */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-bg-surface/95 dark:from-bg-surface/95 to-transparent md:hidden"
          />
        </div>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-border-custom/80 flex-shrink-0" />

        {/* Dark Mode Switch at the right */}
        <div className="flex-shrink-0 pr-1 sm:pr-1.5 flex items-center">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
