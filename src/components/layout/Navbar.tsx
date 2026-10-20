"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { navLinks } from "@/lib/data";
import ThemeToggle from "@/components/ui/ThemeToggle";

const mobileNavItems = [
  { label: "Home", href: "#hero", index: "01" },
  { label: "About", href: "#about", index: "02" },
  { label: "Projects", href: "#projects", index: "03" },
  { label: "Experience", href: "#experience", index: "04" },
  { label: "Hackathons", href: "#hackathons", index: "05" },
  { label: "Skills", href: "#skills", index: "06" },
  { label: "Contact", href: "#contact", index: "07" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("#about");
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on Escape key and on window resize to desktop
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Determine active section based on scroll position
  const determineActiveSection = useCallback(() => {
    if (isManualNavRef.current) return;

    if (window.scrollY < 200) {
      setActiveSection("#hero");
      return;
    }

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
      if (hash && (hash === "#hero" || navLinks.some((link) => link.href === hash))) {
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
        if (id && id !== "hero") {
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
    <>
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 pointer-events-none flex justify-center px-3 sm:px-4">
        {/* ─── Desktop Navigation Bar (md and up) ─── */}
        <nav
          aria-label="Main floating navigation"
          className="hidden md:flex pointer-events-auto max-w-max items-center gap-3 p-2 rounded-full bg-bg-surface/85 dark:bg-bg-surface/80 border border-border-custom/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300"
        >
          {/* Brand Home mark */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex-shrink-0 pl-3 pr-1 text-xs font-mono font-bold text-text-primary hover:text-accent transition-colors flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent rounded-full"
            aria-label="Dhruv Vawhle — Back to Top"
          >
            <span>DV</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </a>

          {/* Divider */}
          <div className="w-[1px] h-4 bg-border-custom/80 flex-shrink-0" />

          {/* Pill Container for Nav Items */}
          <div
            onMouseLeave={() => setHoveredSection(null)}
            className="flex items-center gap-1 whitespace-nowrap px-1 py-0.5"
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
                  className={`relative text-xs font-mono px-3.5 py-1.5 rounded-full transition-colors duration-200 z-10 select-none focus-visible:outline-2 focus-visible:outline-accent ${
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

          {/* Divider */}
          <div className="w-[1px] h-4 bg-border-custom/80 flex-shrink-0" />

          {/* Dark Mode Switch */}
          <div className="flex-shrink-0 pr-1.5 flex items-center">
            <ThemeToggle />
          </div>
        </nav>

        {/* ─── Mobile Navigation Bar (< md) ─── */}
        <div
          className="md:hidden pointer-events-auto w-full max-w-[calc(100vw-1.5rem)] flex items-center justify-between px-3.5 py-1.5 rounded-full bg-bg-surface/90 dark:bg-bg-surface/85 border border-border-custom/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
        >
          {/* Brand mark */}
          <a
            href="#"
            onClick={(e) => {
              handleNavClick(e, "#hero");
              setIsMobileMenuOpen(false);
            }}
            className="flex items-center gap-1.5 text-xs font-mono font-bold text-text-primary hover:text-accent transition-colors pl-1 focus-visible:outline-2 focus-visible:outline-accent rounded-full"
            aria-label="Dhruv Vawhle — Back to Top"
          >
            <span>DV</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          </a>

          {/* Right side controls: Theme Toggle + 3-Line Hamburger Menu */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="w-[1px] h-4 bg-border-custom/80" />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="relative w-9 h-9 rounded-full flex flex-col items-center justify-center gap-1.5 text-text-primary hover:text-accent focus-visible:outline-2 focus-visible:outline-accent transition-colors"
            >
              <span
                className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2 bg-accent" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-current rounded-full transition-all duration-300 origin-center ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2 bg-accent" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ─── Fullscreen Centered Mobile Menu Overlay ─── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="fixed inset-0 z-40 md:hidden bg-bg/95 dark:bg-bg/98 backdrop-blur-2xl flex flex-col justify-between px-6 pt-24 pb-8 overflow-y-auto"
          >
            {/* Centered Navigation Links */}
            <div className="flex-1 flex flex-col items-center justify-center my-auto w-full max-w-sm mx-auto space-y-1.5">
              {mobileNavItems.map((item, idx) => {
                const isCurrent =
                  (item.href === "#hero" && activeSection === "#hero") ||
                  activeSection === item.href;

                return (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      handleNavClick(e, item.href);
                      setIsMobileMenuOpen(false);
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: shouldReduceMotion ? 0 : 0.04 * idx,
                      duration: 0.28,
                      ease: "easeOut",
                    }}
                    className={`group relative flex items-center justify-center gap-3 px-6 py-2.5 rounded-2xl w-full text-center transition-all duration-200 select-none ${
                      isCurrent
                        ? "bg-accent/15 text-accent font-bold shadow-xs"
                        : "text-text-primary hover:text-accent hover:bg-bg-surface/70"
                    }`}
                  >
                    <span className="font-mono text-xs text-accent/70 font-semibold tracking-wider">
                      {item.index}
                    </span>
                    <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
                      {item.label}
                    </span>
                    {isCurrent && (
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    )}
                  </motion.a>
                );
              })}
            </div>

            {/* Bottom Actions & Socials */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: shouldReduceMotion ? 0 : 0.32,
                duration: 0.28,
              }}
              className="w-full max-w-sm mx-auto pt-6 border-t border-border-custom/60 flex flex-col items-center gap-4"
            >
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-full bg-bg-surface hover:bg-bg-surface-hover text-text-primary border border-border-custom hover:border-accent hover:text-accent text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                <span>View Resume</span>
              </a>

              <div className="flex items-center gap-4 text-text-secondary">
                <a
                  href="https://github.com/DhruvVawhle"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  className="p-2.5 rounded-full hover:text-accent hover:bg-accent/10 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com/in/dhruv-vawhle-277b2b2b8"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  className="p-2.5 rounded-full hover:text-accent hover:bg-accent/10 transition-colors"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a
                  href="mailto:dhruvvawhle@gmail.com"
                  aria-label="Email Dhruv"
                  className="p-2.5 rounded-full hover:text-accent hover:bg-accent/10 transition-colors"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
