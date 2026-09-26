"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ui/ThemeToggle";

const springTransition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#about");
  const [activeHoverItem, setActiveHoverItem] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const isManualNavRef = useRef(false);
  const manualNavTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navItems = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects", hasDropdown: true },
    { label: "Experience", href: "#experience", hasDropdown: true },
    { label: "Hackathons", href: "#hackathons" },
    { label: "Skills", href: "#skills", hasDropdown: true },
    { label: "Contact", href: "#contact" },
  ];

  const determineActiveSection = useCallback(() => {
    if (isManualNavRef.current) return;

    const isAtBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 30;

    if (isAtBottom) {
      setActiveSection("#contact");
      return;
    }

    const focalY = window.innerHeight * 0.35;
    let currentActive = "";

    for (const item of navItems) {
      const id = item.href.replace("#", "");
      const el = document.getElementById(id);
      if (!el) continue;

      const rect = el.getBoundingClientRect();
      if (rect.top <= focalY && rect.bottom > 80) {
        currentActive = item.href;
      }
    }

    if (currentActive) {
      setActiveSection(currentActive);
    }
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 30);
          const totalScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          const currentScroll = window.scrollY;
          setScrollProgress(
            totalScroll > 0
              ? Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100))
              : 0
          );

          determineActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [determineActiveSection]);

  const scrollToTarget = (targetIdOrHref: string) => {
    const rawId = targetIdOrHref.replace("#", "");
    const cleanProjectId = rawId.replace(/^project-/, "");

    setActiveHoverItem(null);
    setMobileOpen(false);

    const isProjectJump =
      rawId.startsWith("project-") ||
      cleanProjectId === "imdbsentiment" ||
      cleanProjectId === "krishisaathi" ||
      cleanProjectId === "medtalk";

    if (isProjectJump) {
      window.dispatchEvent(new CustomEvent("project-jump", { detail: cleanProjectId }));
      setActiveSection("#projects");
      try {
        window.history.pushState(null, "", `#project-${cleanProjectId}`);
      } catch {
        // Fallback if pushState fails
      }

      const attemptScroll = () => {
        const candidates = Array.from(
          document.querySelectorAll(
            `[data-project-id="${cleanProjectId}"], [data-project-target="project-${cleanProjectId}"], #project-${cleanProjectId}, #mobile-project-${cleanProjectId}`
          )
        ) as HTMLElement[];

        const visible = candidates.find(
          (el) => el.offsetParent !== null || el.getClientRects().length > 0
        );

        if (visible) {
          const navOffset = 85;
          const topPos = visible.getBoundingClientRect().top + window.scrollY - navOffset;
          window.scrollTo({
            top: Math.max(0, topPos),
            behavior: "smooth",
          });
          return true;
        }
        return false;
      };

      if (!attemptScroll()) {
        setTimeout(attemptScroll, 60);
      }
    } else {
      const candidates = Array.from(
        document.querySelectorAll(`[id="${rawId}"], [data-project-target="${rawId}"]`)
      ) as HTMLElement[];

      const visible =
        candidates.find(
          (el) => el.offsetParent !== null || el.getClientRects().length > 0
        ) || candidates[0] || document.getElementById(rawId);

      if (visible) {
        const navOffset = 80;
        const topPos = visible.getBoundingClientRect().top + window.scrollY - navOffset;
        window.scrollTo({
          top: Math.max(0, topPos),
          behavior: "smooth",
        });

        if (targetIdOrHref.startsWith("#hackathon-")) {
          setActiveSection("#hackathons");
        } else {
          setActiveSection(targetIdOrHref);
        }
      } else {
        window.location.hash = targetIdOrHref;
      }
    }

    isManualNavRef.current = true;
    if (manualNavTimeoutRef.current) {
      clearTimeout(manualNavTimeoutRef.current);
    }
    manualNavTimeoutRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 1000);
  };

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-bg/85 backdrop-blur-2xl border-b border-border-custom shadow-[0_4px_30px_rgba(0,0,0,0.15)] py-1"
            : "bg-transparent py-2.5"
        }`}
      >
        {/* Top Edge Scroll Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-border-custom/20 overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="content-width flex items-center justify-between h-14 sm:h-16 mx-auto">
          {/* Logo/Name */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="font-display font-extrabold text-lg text-text-primary tracking-tight hover:text-accent transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-accent rounded-md"
            aria-label="Dhruv Vawhle — Home"
          >
            <span>DV</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          </a>

          {/* Desktop Glass Pill Navbar with Aceternity Hover Popovers */}
          <nav
            onMouseLeave={() => setActiveHoverItem(null)}
            className="hidden md:flex items-center gap-1 p-1.5 rounded-full bg-bg-surface/75 dark:bg-[#131418]/75 border border-border-custom/80 backdrop-blur-xl shadow-xs ring-1 ring-black/5 dark:ring-white/5 relative"
            aria-label="Desktop Navigation"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href;

              return (
                <div
                  key={item.href}
                  onMouseEnter={() => item.hasDropdown ? setActiveHoverItem(item.label) : setActiveHoverItem(null)}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() => scrollToTarget(item.href)}
                    className={`text-xs font-mono px-4 py-1.5 rounded-full transition-colors duration-200 relative z-10 cursor-pointer select-none inline-flex items-center gap-1 ${
                      isActive
                        ? "text-background font-bold"
                        : "text-text-secondary hover:text-text-primary font-medium"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        className="absolute inset-0 bg-foreground rounded-full shadow-sm -z-10"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : {
                                type: "spring",
                                stiffness: 420,
                                damping: 28,
                              }
                        }
                      />
                    )}
                    <span>{item.label}</span>
                  </button>

                  {/* Aceternity Spring Animated Dropdown Popover */}
                  {item.hasDropdown && activeHoverItem === item.label && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.88, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.88, y: 8 }}
                      transition={springTransition}
                      className="absolute top-[calc(100%_+_0.6rem)] left-1/2 transform -translate-x-1/2 pt-1 z-50"
                    >
                      <motion.div
                        layoutId="navbar-dropdown-active"
                        className="bg-bg-surface/95 dark:bg-[#131418]/95 backdrop-blur-2xl rounded-2xl overflow-hidden border border-border-custom shadow-2xl ring-1 ring-black/5 dark:ring-white/10"
                      >
                        {/* 1. Projects Dropdown with Direct Jump Anchors */}
                        {item.label === "Projects" && (
                          <div className="grid grid-cols-2 gap-3 p-3 w-[520px]">
                            {/* IMDB Sentiment */}
                            <button
                              type="button"
                              onClick={() => scrollToTarget("#project-imdbsentiment")}
                              className="flex space-x-3 group/item p-2 rounded-xl hover:bg-foreground/5 transition-colors text-left cursor-pointer w-full"
                            >
                              <div className="relative w-[110px] h-[65px] rounded-lg overflow-hidden flex-shrink-0 border border-border-custom bg-black/20">
                                <Image
                                  src="/images/projects/imdb-sentiment-analysis.png"
                                  fill
                                  alt="IMDB Sentiment"
                                  sizes="110px"
                                  className="object-cover group-hover/item:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold font-display text-text-primary group-hover/item:text-accent transition-colors leading-tight mb-1">
                                  IMDB Sentiment
                                </h4>
                                <p className="text-text-secondary text-xs line-clamp-2 leading-relaxed font-sans">
                                  NLP sentiment classifier on 50K reviews with TF-IDF &amp; Bi-LSTM.
                                </p>
                              </div>
                            </button>

                            {/* KrishiSaathi */}
                            <button
                              type="button"
                              onClick={() => scrollToTarget("#project-krishisaathi")}
                              className="flex space-x-3 group/item p-2 rounded-xl hover:bg-foreground/5 transition-colors text-left cursor-pointer w-full"
                            >
                              <div className="relative w-[110px] h-[65px] rounded-lg overflow-hidden flex-shrink-0 border border-border-custom bg-black/20">
                                <Image
                                  src="/images/projects/krishisaathi-homepage.png"
                                  fill
                                  alt="KrishiSaathi"
                                  sizes="110px"
                                  className="object-cover group-hover/item:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold font-display text-text-primary group-hover/item:text-accent transition-colors leading-tight mb-1">
                                  KrishiSaathi
                                </h4>
                                <p className="text-text-secondary text-xs line-clamp-2 leading-relaxed font-sans">
                                  Farm-to-market platform with ARIMA mandi forecasting.
                                </p>
                              </div>
                            </button>

                            {/* MedTalk AI */}
                            <button
                              type="button"
                              onClick={() => scrollToTarget("#project-medtalk")}
                              className="flex space-x-3 group/item p-2 rounded-xl hover:bg-foreground/5 transition-colors text-left cursor-pointer w-full"
                            >
                              <div className="relative w-[110px] h-[65px] rounded-lg overflow-hidden flex-shrink-0 border border-border-custom bg-black/20">
                                <Image
                                  src="/images/projects/medtalk-aichatbot.png"
                                  fill
                                  alt="MedTalk AI"
                                  sizes="110px"
                                  className="object-cover group-hover/item:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold font-display text-text-primary group-hover/item:text-accent transition-colors leading-tight mb-1">
                                  MedTalk AI
                                </h4>
                                <p className="text-text-secondary text-xs line-clamp-2 leading-relaxed font-sans">
                                  Multilingual 24/7 healthcare assistant via Gemini &amp; Speech API.
                                </p>
                              </div>
                            </button>

                            {/* MediMitra SIH */}
                            <button
                              type="button"
                              onClick={() => scrollToTarget("#hackathon-medimitra")}
                              className="flex space-x-3 group/item p-2 rounded-xl hover:bg-foreground/5 transition-colors text-left cursor-pointer w-full"
                            >
                              <div className="relative w-[110px] h-[65px] rounded-lg overflow-hidden flex-shrink-0 border border-border-custom bg-black/20">
                                <Image
                                  src="/images/hackathons/medimitra-chatbot.png"
                                  fill
                                  alt="MediMitra SIH"
                                  sizes="110px"
                                  className="object-cover group-hover/item:scale-105 transition-transform duration-300"
                                />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold font-display text-text-primary group-hover/item:text-accent transition-colors leading-tight mb-1">
                                  MediMitra (SIH)
                                </h4>
                                <p className="text-text-secondary text-xs line-clamp-2 leading-relaxed font-sans">
                                  National Finalist SIH 2025: WhatsApp + n8n automation.
                                </p>
                              </div>
                            </button>
                          </div>
                        )}

                        {/* 2. Experience Dropdown */}
                        {item.label === "Experience" && (
                          <div className="flex flex-col space-y-3 p-3 w-64 text-left">
                            <div className="border-b border-border-custom/50 pb-2.5">
                              <span className="font-mono text-[10px] text-accent uppercase tracking-wider font-bold block mb-1">
                                Work Experience
                              </span>
                              <button
                                type="button"
                                onClick={() => scrollToTarget("#experience")}
                                className="w-full text-left font-bold text-xs text-text-primary hover:text-accent py-1 block transition-colors cursor-pointer"
                              >
                                CodSoft · Web Dev Intern
                              </button>
                              <button
                                type="button"
                                onClick={() => scrollToTarget("#experience")}
                                className="w-full text-left font-bold text-xs text-text-primary hover:text-accent py-1 block transition-colors cursor-pointer"
                              >
                                Compozent · SDE (Web) Intern
                              </button>
                            </div>
                            <div>
                              <span className="font-mono text-[10px] text-accent uppercase tracking-wider font-bold block mb-1">
                                Hackathons &amp; Sprints
                              </span>
                              <button
                                type="button"
                                onClick={() => scrollToTarget("#hackathon-medimitra")}
                                className="w-full text-left text-xs text-text-secondary hover:text-accent py-0.5 block transition-colors cursor-pointer font-mono"
                              >
                                SIH 2025 · MediMitra
                              </button>
                              <button
                                type="button"
                                onClick={() => scrollToTarget("#hackathons")}
                                className="w-full text-left text-xs text-text-secondary hover:text-accent py-0.5 block transition-colors cursor-pointer font-mono"
                              >
                                Analytix&apos;26 Datathon · 1st Place
                              </button>
                              <button
                                type="button"
                                onClick={() => scrollToTarget("#hackathons")}
                                className="w-full text-left text-xs text-text-secondary hover:text-accent py-0.5 block transition-colors cursor-pointer font-mono"
                              >
                                Edith AI Buildathon
                              </button>
                            </div>
                          </div>
                        )}

                        {/* 3. Skills Dropdown */}
                        {item.label === "Skills" && (
                          <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-3 w-72 text-left">
                            <div>
                              <span className="font-mono text-[10px] text-accent uppercase tracking-wider font-bold block mb-1">
                                Frontend
                              </span>
                              <button
                                type="button"
                                onClick={() => scrollToTarget("#skills")}
                                className="text-xs text-text-secondary hover:text-accent transition-colors font-mono block py-0.5 cursor-pointer text-left w-full"
                              >
                                React &amp; Next.js
                              </button>
                              <button
                                type="button"
                                onClick={() => scrollToTarget("#skills")}
                                className="text-xs text-text-secondary hover:text-accent transition-colors font-mono block py-0.5 cursor-pointer text-left w-full"
                              >
                                TypeScript &amp; Tailwind
                              </button>
                            </div>
                            <div>
                              <span className="font-mono text-[10px] text-accent uppercase tracking-wider font-bold block mb-1">
                                Backend
                              </span>
                              <button
                                type="button"
                                onClick={() => scrollToTarget("#skills")}
                                className="text-xs text-text-secondary hover:text-accent transition-colors font-mono block py-0.5 cursor-pointer text-left w-full"
                              >
                                Node.js &amp; Express
                              </button>
                              <button
                                type="button"
                                onClick={() => scrollToTarget("#skills")}
                                className="text-xs text-text-secondary hover:text-accent transition-colors font-mono block py-0.5 cursor-pointer text-left w-full"
                              >
                                Python &amp; REST APIs
                              </button>
                            </div>
                            <div>
                              <span className="font-mono text-[10px] text-accent uppercase tracking-wider font-bold block mb-1">
                                AI &amp; Data
                              </span>
                              <button
                                type="button"
                                onClick={() => scrollToTarget("#skills")}
                                className="text-xs text-text-secondary hover:text-accent transition-colors font-mono block py-0.5 cursor-pointer text-left w-full"
                              >
                                Gemini API &amp; RAG
                              </button>
                              <button
                                type="button"
                                onClick={() => scrollToTarget("#skills")}
                                className="text-xs text-text-secondary hover:text-accent transition-colors font-mono block py-0.5 cursor-pointer text-left w-full"
                              >
                                ARIMA &amp; Pandas
                              </button>
                            </div>
                            <div>
                              <span className="font-mono text-[10px] text-accent uppercase tracking-wider font-bold block mb-1">
                                Cloud &amp; DB
                              </span>
                              <button
                                type="button"
                                onClick={() => scrollToTarget("#skills")}
                                className="text-xs text-text-secondary hover:text-accent transition-colors font-mono block py-0.5 cursor-pointer text-left w-full"
                              >
                                MongoDB &amp; Firestore
                              </button>
                              <button
                                type="button"
                                onClick={() => scrollToTarget("#skills")}
                                className="text-xs text-text-secondary hover:text-accent transition-colors font-mono block py-0.5 cursor-pointer text-left w-full"
                              >
                                AWS, GCP &amp; Docker
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-11 h-11 min-h-[44px] min-w-[44px] rounded-xl flex flex-col items-center justify-center gap-1.5 bg-bg-surface border border-border-custom cursor-pointer focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              id="mobile-menu-toggle"
            >
              <motion.span
                className="w-4 h-0.5 bg-text-primary block rounded-full"
                animate={
                  mobileOpen
                    ? { rotate: 45, y: 4 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="w-4 h-0.5 bg-text-primary block rounded-full"
                animate={
                  mobileOpen
                    ? { rotate: -45, y: -4 }
                    : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-2xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col items-center justify-center h-full gap-5 sm:gap-8 px-6">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.href;
                return (
                  <motion.button
                    key={item.href}
                    type="button"
                    onClick={() => scrollToTarget(item.href)}
                    className={`text-xl xs:text-2xl font-display font-bold transition-colors relative px-7 py-3.5 min-h-[48px] flex items-center justify-center rounded-full z-10 w-full max-w-xs text-center cursor-pointer ${
                      isActive
                        ? "text-background"
                        : "text-text-primary hover:text-text-secondary"
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: i * 0.05, duration: 0.3 }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-mobile-pill"
                        className="absolute inset-0 bg-foreground rounded-full -z-10"
                        transition={
                          shouldReduceMotion
                            ? { duration: 0 }
                            : {
                                type: "spring",
                                stiffness: 380,
                                damping: 30,
                              }
                        }
                      />
                    )}
                    {item.label}
                  </motion.button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
