"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useSpring,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import dynamic from "next/dynamic";
import { ArrowRight, FileText, Mail, ShieldCheck, Database } from "lucide-react";
import { useIsDesktopStage, usePointerTilt } from "@/components/sections/project-showcase/hooks";

const HeroNodeNetwork = dynamic(
  () => import("@/components/effects/HeroNodeNetwork"),
  { ssr: false }
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

/* ─── Micro Animated Node-Graph Chip ────────────────────────────── */
function NodeGraphChip() {
  return (
    <div className="p-2 sm:p-2.5 rounded-xl bg-bg-surface/85 backdrop-blur-md border border-border-custom/80 shadow-md">
      <svg
        width="56"
        height="26"
        viewBox="0 0 56 26"
        fill="none"
        className="overflow-visible select-none pointer-events-none"
        aria-hidden="true"
      >
        <line x1="8" y1="13" x2="28" y2="6" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
        <line x1="8" y1="13" x2="28" y2="20" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
        <line x1="28" y1="6" x2="48" y2="13" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
        <line x1="28" y1="20" x2="48" y2="13" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
        <circle cx="8" cy="13" r="3" fill="currentColor" className="text-text-secondary" />
        <circle cx="28" cy="6" r="3.2" fill="var(--accent)" />
        <circle cx="28" cy="20" r="3.2" fill="var(--accent)" />
        <circle cx="48" cy="13" r="3.5" fill="var(--accent)" />
        <circle cx="48" cy="13" r="6" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.3" />
        <circle cx="0" cy="0" r="1.8" fill="#ffffff" className="animate-traveling-signal" />
      </svg>
    </div>
  );
}

/* ─── Scramble Word Component ───────────────────────────────────── */
const SCRAMBLE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789!<>_—=*+";

function ScrambleWord({
  text,
  className = "",
  isTouchDevice = false,
  shouldReduceMotion = false,
}: {
  text: string;
  className?: string;
  isTouchDevice?: boolean;
  shouldReduceMotion?: boolean;
}) {
  const [displayText, setDisplayText] = useState(text);
  const isScramblingRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const scramble = useCallback(() => {
    if (isTouchDevice || shouldReduceMotion || isScramblingRef.current) return;
    isScramblingRef.current = true;

    const length = text.length;
    let iteration = 0;
    const maxIterations = length * 3;

    intervalRef.current = setInterval(() => {
      iteration++;
      const resolvedIndex = Math.floor((iteration / maxIterations) * length);

      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < resolvedIndex) return text[index];
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
        isScramblingRef.current = false;
      }
    }, 28);
  }, [text, isTouchDevice, shouldReduceMotion]);

  return (
    <span
      onMouseEnter={scramble}
      className={`relative inline-block cursor-default select-none ${className}`}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{displayText}</span>
    </span>
  );
}

/* ─── Isolated Specialty Bio (Prevents Full-Hero Interval Re-renders) ── */
function HeroSpecialtyBio({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const [activeSpecialty, setActiveSpecialty] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveSpecialty((prev) => (prev + 1) % 3);
    }, 2600);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  const specialties = [
    "full-stack web development",
    "applied machine learning",
    "AI security",
  ];

  return (
    <p className="mt-2.5 sm:mt-3 text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed">
      Final-year Information Technology undergraduate specializing in{" "}
      {specialties.map((label, idx) => (
        <React.Fragment key={label}>
          {idx === 1 && ", "}
          {idx === 2 && ", and "}
          <span
            className={`inline-block rounded-md px-1.5 py-0.5 font-medium ${activeSpecialty === idx
              ? "bg-accent/15 text-accent ring-1 ring-accent/30"
              : "text-text-primary"
              }`}
          >
            {label}
          </span>
        </React.Fragment>
      ))}
      .
    </p>
  );
}

/* ─── Magnetic Button Wrapper (Mouse Only) ───────────────────────── */
function MagneticButton({
  children,
  className = "",
  isTouchDevice = false,
  shouldReduceMotion = false,
}: {
  children: React.ReactNode;
  className?: string;
  isTouchDevice?: boolean;
  shouldReduceMotion?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 260, damping: 20 });
  const springY = useSpring(y, { stiffness: 260, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * 0.2);
    y.set((e.clientY - (rect.top + rect.height / 2)) * 0.2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: isTouchDevice || shouldReduceMotion ? 0 : springX,
        y: isTouchDevice || shouldReduceMotion ? 0 : springY,
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ─── Zero-Rerender Magnifying Dock ─────────────────────────────── */
interface DockItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
}

function DirectContactDock({
  isTouchDevice,
  shouldReduceMotion,
}: {
  isTouchDevice: boolean;
  shouldReduceMotion: boolean;
}) {
  const dockRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const items: DockItem[] = [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/dhruv-vawhle-277b2b2b8",
      icon: <LinkedinIcon />,
      ariaLabel: "LinkedIn Profile",
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/DhruvVawhle",
      icon: <GithubIcon />,
      ariaLabel: "GitHub Profile",
    },
    {
      id: "resume",
      label: "Resume",
      href: "/resume.pdf",
      icon: <FileText className="w-[18px] h-[18px]" />,
      ariaLabel: "View resume",
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:dhruvvawhle@gmail.com",
      icon: <Mail className="w-[18px] h-[18px]" />,
      ariaLabel: "Email dhruvvawhle@gmail.com",
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || shouldReduceMotion || !dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;

    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      const itemCenter = idx * 52 + 28;
      const dist = Math.abs(mouseX - itemCenter);
      const scale = 1 + Math.max(0, 0.25 * (1 - dist / 84));
      el.style.transform = `scale(${scale.toFixed(3)})`;
    });
  };

  const handleMouseLeave = () => {
    itemRefs.current.forEach((el) => {
      if (el) el.style.transform = "scale(1)";
    });
  };

  return (
    <div
      ref={dockRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-bg/60 border border-border-custom/80 shadow-xs"
    >
      {items.map((item, index) => (
        <div key={item.id} className="group/dock relative flex flex-col items-center">
          <span className="pointer-events-none absolute -top-8 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-foreground text-background shadow-md whitespace-nowrap z-30 opacity-0 translate-y-1 group-hover/dock:opacity-100 group-hover/dock:-translate-y-0.5 transition-[opacity,transform] duration-150">
            {item.label}
          </span>

          <a
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.ariaLabel}
            className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-xl flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-[color,background-color,transform] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-accent active:scale-95 touch-manipulation"
          >
            {item.icon}
          </a>
        </div>
      ))}
    </div>
  );
}

/* ─── Credibility Card with Hover Specular Sheen ────────────────── */
function CredibilityCard({
  category,
  title,
  detail,
  icon,
  href,
  shouldReduceMotion,
}: {
  category: string;
  title: string;
  detail?: string;
  icon: React.ReactNode;
  href?: string;
  shouldReduceMotion: boolean;
}) {
  const { cardRef, handlePointerMove, handlePointerLeave } =
    usePointerTilt(shouldReduceMotion);

  const inner = (
    <div className="transition-transform duration-200 ease-out hover:-translate-y-0.5 h-full">
      <div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{
          transform: shouldReduceMotion
            ? undefined
            : "perspective(1100px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
          transition: shouldReduceMotion
            ? undefined
            : "transform var(--tilt-ease, 200ms) cubic-bezier(0.16, 1, 0.3, 1), border-color 150ms ease, box-shadow 150ms ease",
        }}
        className="group relative p-5 sm:p-6 rounded-2xl bg-bg-surface border border-border-custom hover:border-accent/45 shadow-xs hover:shadow-md flex items-start gap-4 select-none h-full overflow-hidden will-change-transform"
      >
        {!shouldReduceMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(59, 130, 246, 0.1), transparent 65%)",
            }}
          />
        )}

        <div className="relative z-10 w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
          {icon}
        </div>

        <div className="relative z-10 flex-1 min-w-0">
          <div className="text-xs text-text-secondary font-normal leading-normal">
            {category}
          </div>
          <div className="text-sm sm:text-base font-semibold text-text-primary tracking-tight leading-snug mt-1 group-hover:text-accent transition-colors duration-150">
            {title}
          </div>
          {detail && (
            <div className="text-xs text-text-secondary font-normal leading-normal mt-1">
              {detail}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-accent active:scale-[0.99]"
      >
        {inner}
      </a>
    );
  }

  return inner;
}

/* ─── Hero Section Component ────────────────────────────────────── */
export default function Hero() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const isDesktop = useIsDesktopStage();
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isTouchColorActive, setIsTouchColorActive] = useState(false);

  const portraitTilt = usePointerTilt(isTouchDevice || shouldReduceMotion);
  const enableDesktopParallax = isDesktop && !shouldReduceMotion;

  // Cinematic multi-plane scroll choreography for Hero
  const heroSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroSectionRef,
    offset: ["start start", "end start"],
  });
  const smoothScroll = useSpring(heroScrollProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.4,
  });
  const heroContentOpacity = useTransform(smoothScroll, [0, 0.85], [1, 0.2]);
  const leftColumnY = useTransform(smoothScroll, [0, 1], [0, 36]);
  const portraitColumnY = useTransform(smoothScroll, [0, 1], [0, -34]);
  const portraitScale = useTransform(smoothScroll, [0, 1], [1, 0.94]);
  const portraitInnerCardY = useTransform(smoothScroll, [0, 1], [0, -14]);
  const gridY = useTransform(smoothScroll, [0, 1], [0, 64]);
  const gridScale = useTransform(smoothScroll, [0, 1], [1, 1.06]);
  const word1X = useTransform(smoothScroll, [0, 1], [0, -18]);
  const word2X = useTransform(smoothScroll, [0, 1], [0, 22]);
  const word3X = useTransform(smoothScroll, [0, 1], [0, -14]);
  const word4X = useTransform(smoothScroll, [0, 1], [0, 18]);
  const scrollCueOpacity = useTransform(smoothScroll, [0, 0.22], [1, 0]);

  // Detect touch capability
  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window);
    const t = setTimeout(() => setIsTouchDevice(isTouch), 0);
    return () => clearTimeout(t);
  }, []);

  // Defer Three.js WebGL node network to idle time on desktop only (>=768px)
  const [mountNetwork, setMountNetwork] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768 && !shouldReduceMotion) {
      const win = window as Window & {
        requestIdleCallback?: (cb: () => void, opts: { timeout: number }) => number;
        cancelIdleCallback?: (id: number) => void;
      };
      if (typeof win.requestIdleCallback === "function") {
        const handle = win.requestIdleCallback(() => setMountNetwork(true), { timeout: 2000 });
        return () => win.cancelIdleCallback?.(handle);
      } else {
        const timer = setTimeout(() => setMountNetwork(true), 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [shouldReduceMotion]);

  const handlePortraitTap = () => {
    if (isTouchDevice) {
      setIsTouchColorActive((prev) => !prev);
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      ref={heroSectionRef}
      id="hero"
      className="relative overflow-x-clip pt-24 xs:pt-28 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 bg-bg border-b border-border-custom/40 scroll-mt-20 sm:scroll-mt-24"
      aria-label="Portfolio Introduction"
    >
      {/* Deferred Desktop-Only WebGL Node Network */}
      {mountNetwork && <HeroNodeNetwork />}

      {/* Subtle Architectural Grid Line Overlay with Scroll Depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <motion.div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08] will-change-transform"
          style={{
            y: shouldReduceMotion ? 0 : gridY,
            scale: shouldReduceMotion ? 1 : gridScale,
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
            maskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 75%, transparent 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
          }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          opacity: shouldReduceMotion ? 1 : heroContentOpacity,
        }}
        className="content-width relative z-10"
      >
        {/* Top Strip */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-4 pb-3 sm:pb-5 mb-5 sm:mb-10 border-b border-border-custom/60"
        >
          <div className="flex items-center gap-2.5">
            <span className="text-sm font-semibold text-text-primary tracking-tight">
              Dhruv Vawhle
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 border border-blue-500/30 text-blue-700 dark:text-blue-300">
              Software Engineer
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-text-secondary font-normal">
              B.Tech IT (Graduating 2027)
            </span>
          </div>
        </motion.div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Zone: Stacked Typography, Bio, CTA Buttons */}
          <motion.div
            style={{ y: enableDesktopParallax ? leftColumnY : 0 }}
            className="lg:col-span-7 flex flex-col space-y-3.5 sm:space-y-6 will-change-transform"
          >
            <motion.div variants={itemVariants}>
              <h1 className="font-display font-bold tracking-tight uppercase leading-[0.92] sm:leading-[0.88] select-none text-2xl xs:text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem]">
                <span className="sr-only">Dhruv Vawhle, Software Engineer</span>
                <motion.div style={{ x: shouldReduceMotion ? 0 : word1X }} className="text-text-primary will-change-transform">
                  <ScrambleWord
                    text="ENGINEER"
                    isTouchDevice={isTouchDevice}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </motion.div>
                <motion.div style={{ x: shouldReduceMotion ? 0 : word2X }} className="text-accent will-change-transform">
                  <ScrambleWord
                    text="BUILDER"
                    isTouchDevice={isTouchDevice}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </motion.div>
                <motion.div style={{ x: shouldReduceMotion ? 0 : word3X }} className="text-text-primary will-change-transform">
                  <ScrambleWord
                    text="PROBLEM"
                    isTouchDevice={isTouchDevice}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </motion.div>
                <motion.div style={{ x: shouldReduceMotion ? 0 : word4X }} className="text-text-primary will-change-transform">
                  <ScrambleWord
                    text="SOLVER"
                    isTouchDevice={isTouchDevice}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </motion.div>
              </h1>

              <div className="mt-3 sm:mt-5 max-w-xl">
                <p className="text-base sm:text-lg md:text-xl font-bold text-text-primary font-display">
                  Dhruv Vawhle, Software Engineer
                </p>
                <HeroSpecialtyBio shouldReduceMotion={shouldReduceMotion} />
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="pt-3 sm:pt-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              <MagneticButton
                isTouchDevice={isTouchDevice}
                shouldReduceMotion={shouldReduceMotion}
              >
                <a
                  href="#projects"
                  className="group/btn relative overflow-hidden w-full sm:w-auto h-[50px] min-h-[48px] px-8 rounded-full text-[15px] sm:text-base font-semibold leading-none whitespace-nowrap bg-accent text-white shadow-md hover:shadow-lg hover:bg-accent-hover transition-[background-color,box-shadow,transform] duration-150 active:scale-[0.98] inline-flex items-center justify-center gap-2.5 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <span className="relative z-10">Explore Projects</span>
                  <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-200" />
                </a>
              </MagneticButton>

              <MagneticButton
                isTouchDevice={isTouchDevice}
                shouldReduceMotion={shouldReduceMotion}
              >
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto h-[50px] min-h-[48px] px-7 rounded-full text-[15px] sm:text-base font-semibold leading-none whitespace-nowrap bg-bg-surface hover:bg-bg-surface-hover text-text-primary border border-border-custom hover:border-accent hover:text-accent shadow-xs hover:shadow-sm transition-[background-color,border-color,color,box-shadow,transform] duration-150 active:scale-[0.98] inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <FileText className="w-[18px] h-[18px]" />
                  <span>View Resume</span>
                </a>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right Zone: Portrait with Zero-Rerender 3D Tilt, Glare, Info Card & Dock */}
          <motion.div
            variants={itemVariants}
            style={{
              y: enableDesktopParallax ? portraitColumnY : 0,
              scale: enableDesktopParallax ? portraitScale : 1,
            }}
            className="lg:col-span-5 relative z-20 will-change-transform"
          >
            <div className="transition-transform duration-200 ease-out hover:-translate-y-0.5">
              <div
                ref={portraitTilt.cardRef}
                onPointerMove={portraitTilt.handlePointerMove}
                onPointerLeave={portraitTilt.handlePointerLeave}
                onClick={handlePortraitTap}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handlePortraitTap();
                  }
                }}
                tabIndex={0}
                role="region"
                aria-label="Dhruv Vawhle portrait, turns to color on hover or focus"
                style={{
                  transform:
                    isTouchDevice || shouldReduceMotion
                      ? undefined
                      : "perspective(1000px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
                  transition:
                    isTouchDevice || shouldReduceMotion
                      ? undefined
                      : "transform var(--tilt-ease, 200ms) cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease",
                }}
                className={`relative w-full max-w-[340px] sm:max-w-md lg:max-w-none mx-auto aspect-[4/5] rounded-[22px] overflow-hidden border border-border-custom hover:border-accent/50 shadow-2xl bg-bg-surface/90 group cursor-pointer focus-visible:outline-2 focus-visible:outline-accent select-none will-change-transform ${isTouchColorActive ? "touch-color-active" : ""
                  }`}
              >
                <div className="absolute inset-0 transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.02] will-change-transform">
                  <Image
                    src="/images/profile/dhruv-vawhle.jpg"
                    alt="Dhruv Vawhle – Software Engineer & AI Security Specialist Portrait"
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(max-width: 640px) 340px, (max-width: 1024px) 448px, 420px"
                    className={`object-cover grayscale contrast-[1.06] transition-[filter] duration-700 motion-reduce:transition-none group-hover:grayscale-0 group-focus-visible:grayscale-0 ${isTouchColorActive ? "!grayscale-0" : ""
                      }`}
                    style={{ objectPosition: "50% 15%" }}
                  />
                </div>

                {/* Pointer-tracked glare */}
                {!isTouchDevice && !shouldReduceMotion && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-35 transition-opacity duration-300 rounded-[22px]"
                    style={{
                      background:
                        "radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(255, 255, 255, 0.55) 0%, transparent 60%)",
                    }}
                  />
                )}

                <div className="hidden sm:block absolute top-3.5 right-3.5 z-20">
                  <NodeGraphChip />
                </div>

                <motion.div
                  style={{ y: shouldReduceMotion ? 0 : portraitInnerCardY }}
                  className="absolute inset-x-2.5 xs:inset-x-3.5 bottom-2.5 xs:bottom-3.5 z-20 p-3.5 xs:p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-bg-surface/95 backdrop-blur-md border border-border-custom shadow-md space-y-2 transition-colors duration-200 will-change-transform"
                >
                  <div>
                    <p className="font-display font-bold text-lg sm:text-xl text-text-primary leading-none">
                      Dhruv Vawhle
                    </p>
                    <p className="text-xs sm:text-sm text-accent mt-1.5 font-medium">
                      Software Engineer
                    </p>
                  </div>
                  <div className="pt-2.5 border-t border-border-custom/60 flex items-center justify-between text-xs text-text-secondary font-body">
                    <span>B.Tech IT (2027), Mumbai</span>
                    <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-medium">
                      <span>Available for roles</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Direct Contact Channels Dock */}
            <div className="mt-4 flex items-center justify-between p-2.5 sm:p-3 w-full max-w-[340px] sm:max-w-md lg:max-w-none mx-auto rounded-2xl bg-bg-surface border border-border-custom shadow-xs">
              <div className="flex items-center pl-2 sm:pl-3">
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-text-primary leading-tight">
                    Profiles &amp; resume
                  </span>
                  <span className="hidden sm:inline text-[11px] text-text-secondary leading-tight mt-0.5">
                    Quick connect
                  </span>
                </div>
              </div>
              <DirectContactDock
                isTouchDevice={isTouchDevice}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>
          </motion.div>
        </div>

        {/* Credibility Row */}
        <motion.div
          variants={itemVariants}
          className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-border-custom/60"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CredibilityCard
              category="Government of India"
              title="Copyright-Registered Software"
              detail="Certificate SW-2026024057, issued 29 Oct 2026"
              icon={<ShieldCheck className="w-[18px] h-[18px]" />}
              href="#projects"
              shouldReduceMotion={shouldReduceMotion}
            />
            <CredibilityCard
              category="Production engineering"
              title="Full-Stack & Applied AI Systems"
              detail="5 deployed systems across Web, Vision and Cloud"
              icon={<Database className="w-[18px] h-[18px]" />}
              href="#projects"
              shouldReduceMotion={shouldReduceMotion}
            />
          </div>
        </motion.div>

        {/* Scroll to Explore Indicator */}
        <motion.div
          variants={itemVariants}
          style={{ opacity: shouldReduceMotion ? 1 : scrollCueOpacity }}
          className="mt-10 sm:mt-12 flex flex-col items-center justify-center"
        >
          <a
            href="#about"
            aria-label="Scroll to explore About section"
            className="group inline-flex flex-col items-center gap-2 text-text-secondary hover:text-accent transition-colors duration-300 select-none focus-visible:outline-2 focus-visible:outline-accent rounded-lg p-2"
          >
            <span className="text-[11px] font-medium text-text-secondary opacity-70 group-hover:opacity-100 transition-opacity">
              Scroll to explore
            </span>
            <div className="w-5 h-8 rounded-full border-2 border-border-custom group-hover:border-accent p-1 flex justify-center transition-colors">
              <motion.div
                animate={shouldReduceMotion ? { y: 0 } : { y: [0, 11, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-2 rounded-full bg-accent"
              />
            </div>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
