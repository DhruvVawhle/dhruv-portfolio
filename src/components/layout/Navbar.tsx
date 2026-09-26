"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { navLinks } from "@/lib/data";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { Menu, MenuItem, ProductItem, HoveredLink } from "@/components/ui/navbar-menu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHoverItem, setActiveHoverItem] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const isManualNavRef = useRef(false);
  const manualNavTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const determineActiveSection = useCallback(() => {
    if (isManualNavRef.current) return;

    // Check if scrolled to bottom edge of the document
    const isAtBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 30;

    if (isAtBottom && navLinks.length > 0) {
      setActiveSection(navLinks[navLinks.length - 1].href);
      return;
    }

    const focalY = window.innerHeight * 0.35; // Focal point 35% down viewport below sticky navbar
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

  // Synchronize on initial mount and hash changes
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

  // Secondary IntersectionObserver sync
  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.href.replace("#", ""));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        if (isManualNavRef.current) return;

        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => {
            const centerA = Math.abs(
              a.boundingClientRect.top +
                a.boundingClientRect.height / 2 -
                window.innerHeight / 2
            );
            const centerB = Math.abs(
              b.boundingClientRect.top +
                b.boundingClientRect.height / 2 -
                window.innerHeight / 2
            );
            return centerA - centerB;
          });
          setActiveSection(`#${visibleEntries[0].target.id}`);
        }
      },
      {
        rootMargin: "-80px 0px -40% 0px",
        threshold: [0.1, 0.3, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setActiveHoverItem(null);
    isManualNavRef.current = true;
    if (manualNavTimeoutRef.current) {
      clearTimeout(manualNavTimeoutRef.current);
    }
    manualNavTimeoutRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 900);
    setMobileOpen(false);
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
            : "bg-transparent py-3"
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
            onClick={() => handleNavClick("")}
            className="font-display font-extrabold text-lg text-text-primary tracking-tight hover:text-accent transition-colors flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-accent rounded-md"
            aria-label="Dhruv Vawhle — Home"
          >
            <span>DV</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          </a>

          {/* Desktop Aceternity Interactive Navbar Menu */}
          <div className="hidden md:block">
            <Menu setActive={setActiveHoverItem}>
              <MenuItem
                setActive={setActiveHoverItem}
                active={activeHoverItem}
                item="About"
                href="#about"
                onClick={() => handleNavClick("#about")}
              />

              <MenuItem
                setActive={setActiveHoverItem}
                active={activeHoverItem}
                item="Projects"
                href="#projects"
                onClick={() => handleNavClick("#projects")}
              >
                <div className="grid grid-cols-2 gap-4 p-2 w-[520px]">
                  <ProductItem
                    title="KrishiSaathi"
                    href="#projects"
                    src="/images/projects/krishisaathi-homepage.png"
                    description="Farm-to-market marketplace with ARIMA price forecasting & hybrid Firestore+MongoDB architecture."
                    onClick={() => handleNavClick("#projects")}
                  />
                  <ProductItem
                    title="MedTalk AI"
                    href="#projects"
                    src="/images/projects/medtalk-aichatbot.png"
                    description="24/7 multilingual healthcare assistant powered by Google Gemini and Speech STT/TTS."
                    onClick={() => handleNavClick("#projects")}
                  />
                  <ProductItem
                    title="IMDB Sentiment"
                    href="#projects"
                    src="/images/projects/imdb-sentiment-analysis.png"
                    description="NLP sentiment analysis pipeline evaluated on 50,000 reviews with TF-IDF & Bi-LSTM."
                    onClick={() => handleNavClick("#projects")}
                  />
                  <ProductItem
                    title="MediMitra (SIH)"
                    href="#hackathons"
                    src="/images/hackathons/medimitra-chatbot.png"
                    description="National Finalist at SIH 2025: WhatsApp + n8n healthcare assistant for government problem statement."
                    onClick={() => handleNavClick("#hackathons")}
                  />
                </div>
              </MenuItem>

              <MenuItem
                setActive={setActiveHoverItem}
                active={activeHoverItem}
                item="Experience"
                href="#experience"
                onClick={() => handleNavClick("#experience")}
              >
                <div className="flex flex-col space-y-3.5 p-2 w-64">
                  <div className="border-b border-border-custom/50 pb-2">
                    <span className="font-mono text-[10px] text-accent uppercase tracking-wider font-bold">
                      Work Experience
                    </span>
                    <HoveredLink
                      href="#experience"
                      onClick={() => handleNavClick("#experience")}
                      className="font-bold text-text-primary hover:text-accent mt-1"
                    >
                      CodSoft · Web Dev Intern
                    </HoveredLink>
                    <HoveredLink
                      href="#experience"
                      onClick={() => handleNavClick("#experience")}
                      className="font-bold text-text-primary hover:text-accent"
                    >
                      Compozent · SDE (Web) Intern
                    </HoveredLink>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-accent uppercase tracking-wider font-bold">
                      Hackathons
                    </span>
                    <HoveredLink
                      href="#hackathons"
                      onClick={() => handleNavClick("#hackathons")}
                    >
                      SIH 2025 · MediMitra
                    </HoveredLink>
                    <HoveredLink
                      href="#hackathons"
                      onClick={() => handleNavClick("#hackathons")}
                    >
                      Analytix&apos;26 Datathon · 1st Place
                    </HoveredLink>
                    <HoveredLink
                      href="#hackathons"
                      onClick={() => handleNavClick("#hackathons")}
                    >
                      Edith AI Buildathon
                    </HoveredLink>
                  </div>
                </div>
              </MenuItem>

              <MenuItem
                setActive={setActiveHoverItem}
                active={activeHoverItem}
                item="Skills"
                href="#skills"
                onClick={() => handleNavClick("#skills")}
              >
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 p-2 w-72">
                  <div>
                    <span className="font-mono text-[10px] text-accent uppercase tracking-wider font-bold block mb-1.5">
                      Frontend
                    </span>
                    <HoveredLink href="#skills" onClick={() => handleNavClick("#skills")}>
                      React &amp; Next.js
                    </HoveredLink>
                    <HoveredLink href="#skills" onClick={() => handleNavClick("#skills")}>
                      TypeScript &amp; Tailwind
                    </HoveredLink>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-accent uppercase tracking-wider font-bold block mb-1.5">
                      Backend
                    </span>
                    <HoveredLink href="#skills" onClick={() => handleNavClick("#skills")}>
                      Node.js &amp; Express
                    </HoveredLink>
                    <HoveredLink href="#skills" onClick={() => handleNavClick("#skills")}>
                      Python &amp; REST APIs
                    </HoveredLink>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-accent uppercase tracking-wider font-bold block mb-1.5">
                      AI &amp; Data
                    </span>
                    <HoveredLink href="#skills" onClick={() => handleNavClick("#skills")}>
                      Gemini API &amp; RAG
                    </HoveredLink>
                    <HoveredLink href="#skills" onClick={() => handleNavClick("#skills")}>
                      ARIMA &amp; Pandas
                    </HoveredLink>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-accent uppercase tracking-wider font-bold block mb-1.5">
                      Cloud &amp; DB
                    </span>
                    <HoveredLink href="#skills" onClick={() => handleNavClick("#skills")}>
                      MongoDB &amp; Firestore
                    </HoveredLink>
                    <HoveredLink href="#skills" onClick={() => handleNavClick("#skills")}>
                      AWS, GCP &amp; Docker
                    </HoveredLink>
                  </div>
                </div>
              </MenuItem>

              <MenuItem
                setActive={setActiveHoverItem}
                active={activeHoverItem}
                item="Contact"
                href="#contact"
                onClick={() => handleNavClick("#contact")}
              />
            </Menu>
          </div>

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
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-xl xs:text-2xl font-display font-bold transition-colors relative px-7 py-3.5 min-h-[48px] flex items-center justify-center rounded-full z-10 w-full max-w-xs text-center ${
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
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
