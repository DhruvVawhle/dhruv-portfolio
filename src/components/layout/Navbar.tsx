"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/lib/data";
import ThemeToggle from "@/components/ui/ThemeToggle";

const springTransition = {
  type: "spring" as const,
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

function NavMenuItem({
  setActive,
  active,
  item,
  href,
  children,
}: {
  setActive: (item: string | null) => void;
  active: string | null;
  item: string;
  href: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      onMouseEnter={() => setActive(item)}
      className="relative"
    >
      <Link
        href={href}
        className="cursor-pointer text-xs font-mono font-medium text-text-secondary hover:text-text-primary dark:hover:text-white px-3 py-1.5 rounded-full transition-colors inline-block"
      >
        {item}
      </Link>
      {active !== null && children && (
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={springTransition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.8rem)] left-1/2 transform -translate-x-1/2 pt-2 z-50">
              <motion.div
                transition={springTransition}
                layoutId="active-navbar-card"
                className="bg-bg-surface/95 dark:bg-[#131418]/95 backdrop-blur-2xl rounded-2xl overflow-hidden border border-border-custom shadow-2xl"
              >
                <motion.div layout className="w-max h-full p-4">
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}

function NavProductItem({
  title,
  description,
  href,
  src,
  badge,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="flex space-x-3 p-2 rounded-xl hover:bg-foreground/5 transition-colors group"
    >
      <div className="relative w-28 h-16 rounded-lg overflow-hidden border border-border-custom flex-shrink-0 bg-black/40">
        <Image
          src={src}
          alt={title}
          fill
          sizes="112px"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col justify-center max-w-[13rem]">
        <div className="flex items-center gap-1.5">
          <h4 className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
            {title}
          </h4>
          {badge && (
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-accent/15 text-accent">
              {badge}
            </span>
          )}
        </div>
        <p className="text-text-secondary text-xs mt-0.5 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
}

function NavHoverLink({
  href,
  title,
  subtitle,
}: {
  href: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Link
      href={href}
      className="block p-2 rounded-xl hover:bg-foreground/5 transition-colors group"
    >
      <div className="text-xs font-bold text-text-primary group-hover:text-accent transition-colors font-mono">
        {title}
      </div>
      {subtitle && (
        <div className="text-[11px] text-text-secondary mt-0.5 max-w-[14rem] leading-snug">
          {subtitle}
        </div>
      )}
    </Link>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const isManualNavRef = useRef(false);
  const manualNavTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setActiveMenu(null);
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
          {/* Brand Logo */}
          <Link
            href="#"
            onClick={() => handleNavClick("")}
            className="font-display font-extrabold text-lg text-text-primary tracking-tight hover:text-accent transition-colors flex items-center gap-1.5"
            aria-label="Dhruv Vawhle — Home"
          >
            <span>DV</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
          </Link>

          {/* Aceternity Dynamic Navbar Menu (Desktop) */}
          <nav
            onMouseLeave={() => setActiveMenu(null)}
            className="hidden md:flex items-center gap-1 px-4 py-1.5 rounded-full bg-bg-surface/85 border border-border-custom shadow-input backdrop-blur-xl transition-all"
            aria-label="Main navigation"
          >
            {/* About */}
            <NavMenuItem
              setActive={setActiveMenu}
              active={activeMenu}
              item="About"
              href="#about"
            >
              <div className="grid grid-cols-1 gap-1 w-56">
                <NavHoverLink
                  href="#about"
                  title="Engineering Mindset"
                  subtitle="Problem-solving philosophy & intent"
                />
                <NavHoverLink
                  href="#about"
                  title="Execution Model"
                  subtitle="7-step production lifecycle"
                />
              </div>
            </NavMenuItem>

            {/* Projects with Rich ProductItem cards */}
            <NavMenuItem
              setActive={setActiveMenu}
              active={activeMenu}
              item="Projects"
              href="#projects"
            >
              <div className="grid grid-cols-2 gap-3 p-1 w-[32rem]">
                <NavProductItem
                  title="KrishiSaathi"
                  description="Farm-to-Market Marketplace with ARIMA price forecasting & Razorpay."
                  href="#projects"
                  src="/images/projects/krishisaathi-homepage.png"
                  badge="Live"
                />
                <NavProductItem
                  title="MedTalk"
                  description="24/7 Multilingual Healthcare AI Assistant with Gemini API & Speech STT/TTS."
                  href="#projects"
                  src="/images/projects/medtalk-aichatbot.png"
                  badge="AI"
                />
                <NavProductItem
                  title="IMDB Review Sentiment"
                  description="NLP binary sentiment classifier with Bidirectional LSTM on 50K reviews."
                  href="#projects"
                  src="/images/projects/imdb-sentiment-analysis.png"
                  badge="ML"
                />
                <div className="flex flex-col justify-center p-3 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="text-xs font-mono font-bold text-accent">
                    Explore All Projects →
                  </div>
                  <div className="text-[11px] text-text-secondary mt-1 leading-snug">
                    Deep-dive into architectures, metrics, and copyright registrations.
                  </div>
                  <Link
                    href="#projects"
                    className="mt-2 text-xs font-bold text-text-primary hover:underline"
                  >
                    View Systems
                  </Link>
                </div>
              </div>
            </NavMenuItem>

            {/* Experience */}
            <NavMenuItem
              setActive={setActiveMenu}
              active={activeMenu}
              item="Experience"
              href="#experience"
            >
              <div className="grid grid-cols-1 gap-1 w-64">
                <NavHoverLink
                  href="#experience"
                  title="Compozent (SDE Intern)"
                  subtitle="Dec '24 – Jan '25 · React & Node.js in Agile"
                />
                <NavHoverLink
                  href="#experience"
                  title="CodSoft (Web Dev Intern)"
                  subtitle="Dec '25 – Jan '26 · Responsive UI & Git"
                />
              </div>
            </NavMenuItem>

            {/* Hackathons */}
            <NavMenuItem
              setActive={setActiveMenu}
              active={activeMenu}
              item="Hackathons"
              href="#hackathons"
            >
              <div className="grid grid-cols-1 gap-1 w-64">
                <NavHoverLink
                  href="#hackathons"
                  title="Smart India Hackathon 2025"
                  subtitle="MediMitra (PS ID: SIH25049) · Top 30 Finalist"
                />
                <NavHoverLink
                  href="#hackathons"
                  title="Analytix'26 Datathon"
                  subtitle="Thakur College · First Place Winner"
                />
                <NavHoverLink
                  href="#hackathons"
                  title="Edith AI Agent Buildathon"
                  subtitle="12-hr Sprint · Top Innovator"
                />
              </div>
            </NavMenuItem>

            {/* Skills */}
            <NavMenuItem
              setActive={setActiveMenu}
              active={activeMenu}
              item="Skills"
              href="#skills"
            >
              <div className="grid grid-cols-2 gap-2 w-72">
                <NavHoverLink
                  href="#skills"
                  title="Frontend"
                  subtitle="React, Next.js, TS"
                />
                <NavHoverLink
                  href="#skills"
                  title="Backend"
                  subtitle="Node.js, Express, Python"
                />
                <NavHoverLink
                  href="#skills"
                  title="AI / ML"
                  subtitle="Gemini API, RAG, ARIMA"
                />
                <NavHoverLink
                  href="#skills"
                  title="Databases & Cloud"
                  subtitle="MongoDB, AWS, GCP"
                />
              </div>
            </NavMenuItem>

            {/* Contact */}
            <NavMenuItem
              setActive={setActiveMenu}
              active={activeMenu}
              item="Contact"
              href="#contact"
            >
              <div className="grid grid-cols-1 gap-1 w-60">
                <NavHoverLink
                  href="#contact"
                  title="Start a Conversation"
                  subtitle="dhruvawhle@gmail.com"
                />
                <NavHoverLink
                  href="/documents/Dhruv_Resume_Updated_07-08-2026_.pdf"
                  title="📄 Download Resume"
                  subtitle="Updated August 2026"
                />
              </div>
            </NavMenuItem>
          </nav>

          {/* Right Action & Theme */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-11 h-11 rounded-xl flex flex-col items-center justify-center gap-1.5 bg-bg-surface border border-border-custom cursor-pointer"
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
            <nav className="flex flex-col items-center justify-center h-full gap-5 sm:gap-7 px-6">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-xl xs:text-2xl font-display font-bold transition-colors relative px-7 py-3 min-h-[46px] flex items-center justify-center rounded-full z-10 w-full max-w-xs text-center ${
                      isActive
                        ? "text-background bg-foreground shadow-md"
                        : "text-text-primary hover:text-text-secondary"
                    }`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ delay: i * 0.04, duration: 0.25 }}
                  >
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

