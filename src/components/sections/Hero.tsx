"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  motion,
  useSpring,
  useMotionValue,
  useReducedMotion,
  type Variants,
} from "motion/react";
import dynamic from "next/dynamic";

const HeroNodeNetwork = dynamic(
  () => import("@/components/effects/HeroNodeNetwork"),
  { ssr: false }
);

/* ─── Engineering Icons ─────────────────────────────────────────── */
const ShieldIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const DatabaseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
);


const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const ResumeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/btn:translate-x-1 transition-transform duration-200">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const MessageIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

/* ─── Micro Animated Node-Graph Chip ────────────────────────────── */
function NodeGraphChip() {
  return (
    <div className="p-2 sm:p-2.5 rounded-xl bg-bg-surface/85 backdrop-blur-md border border-border-custom/80 shadow-md">
      <svg width="56" height="26" viewBox="0 0 56 26" fill="none" className="overflow-visible select-none pointer-events-none">
        {/* Connection lines */}
        <line x1="8" y1="13" x2="28" y2="6" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
        <line x1="8" y1="13" x2="28" y2="20" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
        <line x1="28" y1="6" x2="48" y2="13" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />
        <line x1="28" y1="20" x2="48" y2="13" stroke="var(--accent)" strokeWidth="1.2" strokeOpacity="0.4" />

        {/* Nodes */}
        <circle cx="8" cy="13" r="3" fill="currentColor" className="text-text-secondary" />
        <circle cx="28" cy="6" r="3.2" fill="var(--accent)" />
        <circle cx="28" cy="20" r="3.2" fill="var(--accent)" />
        <circle cx="48" cy="13" r="3.5" fill="var(--accent)" />

        {/* Dynamic Pulse Ring */}
        <circle cx="48" cy="13" r="6" stroke="var(--accent)" strokeWidth="1" strokeOpacity="0.5" className="animate-ping" />

        {/* Traveling signal */}
        <circle
          r="1.8"
          fill="#ffffff"
          className="animate-traveling-signal"
        />
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

  const scramble = useCallback(() => {
    if (isTouchDevice || shouldReduceMotion || isScramblingRef.current) return;
    isScramblingRef.current = true;

    const length = text.length;
    let iteration = 0;
    const maxIterations = length * 3;

    const interval = setInterval(() => {
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
        clearInterval(interval);
        setDisplayText(text);
        isScramblingRef.current = false;
      }
    }, 28);
  }, [text, isTouchDevice, shouldReduceMotion]);

  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  return (
    <span
      onMouseEnter={() => {
        if (!isTouchDevice && !shouldReduceMotion) {
          scramble();
        }
      }}
      className={`relative inline-block cursor-default select-none ${className}`}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{displayText}</span>
    </span>
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
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = (e.clientX - centerX) * 0.22;
    const distanceY = (e.clientY - centerY) * 0.22;
    x.set(distanceX);
    y.set(distanceY);
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

/* ─── Magnifying Dock Component ─────────────────────────────────── */
interface DockItem {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  ariaLabel: string;
  external?: boolean;
}

function DirectContactDock({
  isTouchDevice,
  shouldReduceMotion,
}: {
  isTouchDevice: boolean;
  shouldReduceMotion: boolean;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const items: DockItem[] = [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://linkedin.com/in/dhruv-vawhle-277b2b2b8",
      icon: <LinkedinIcon />,
      ariaLabel: "LinkedIn Profile",
      external: true,
    },
    {
      id: "github",
      label: "GitHub",
      href: "https://github.com/DhruvVawhle",
      icon: <GithubIcon />,
      ariaLabel: "GitHub Profile",
      external: true,
    },
    {
      id: "resume",
      label: "Resume",
      href: "/resume.pdf",
      icon: <ResumeIcon />,
      ariaLabel: "View resume",
      external: true,
    },
    {
      id: "email",
      label: "Email",
      href: "mailto:dhruvvawhle@gmail.com",
      icon: <MessageIcon />,
      ariaLabel: "Email dhruvvawhle@gmail.com",
      external: true,
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || shouldReduceMotion || !dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  };

  const handleMouseLeave = () => {
    setMouseX(null);
    setHoveredIndex(null);
  };

  return (
    <div
      ref={dockRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-xl bg-bg/60 border border-border-custom/80 shadow-xs"
    >
      {items.map((item, index) => {
        let scale = 1;
        if (!isTouchDevice && !shouldReduceMotion && mouseX !== null) {
          const itemCenter = index * 48 + 24;
          const dist = Math.abs(mouseX - itemCenter);
          scale = 1 + Math.max(0, 0.32 * (1 - dist / 80));
        }

        const isItemHovered = hoveredIndex === index && !isTouchDevice;

        return (
          <div key={item.id} className="relative flex flex-col items-center">
            {/* Tooltip on mouse hover */}
            {isItemHovered && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: -4 }}
                exit={{ opacity: 0, y: 6 }}
                className="absolute -top-8 px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold bg-foreground text-background pointer-events-none shadow-md whitespace-nowrap z-30"
              >
                {item.label}
              </motion.div>
            )}

            <motion.a
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={item.ariaLabel}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              animate={{ scale: isTouchDevice || shouldReduceMotion ? 1 : scale }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-colors focus-visible:outline-2 focus-visible:outline-accent"
            >
              {item.icon}
            </motion.a>
          </div>
        );
      })}
    </div>
  );
}

/* ─── Credibility Spotlight Card ────────────────────────────────── */
function CredibilityCard({
  category,
  title,
  icon,
  isTouchDevice,
}: {
  category: string;
  title: string;
  icon: React.ReactNode;
  isTouchDevice: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setSpotlight((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative p-5 sm:p-6 rounded-2xl bg-bg-surface border border-border-custom hover:border-accent/40 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 overflow-hidden group select-none"
    >
      {/* Radial Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: spotlight.active ? 1 : 0,
          background: `radial-gradient(220px circle at ${spotlight.x}px ${spotlight.y}px, rgba(59, 130, 246, 0.14), transparent 80%)`,
        }}
      />

      <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>

      <div className="relative z-10">
        <div className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
          {category}
        </div>
        <div className="text-xs sm:text-sm font-semibold text-text-primary leading-snug mt-0.5">
          {title}
        </div>
      </div>
    </div>
  );
}

/* ─── Hero Section Component ────────────────────────────────────── */
export default function Hero() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isTouchColorActive, setIsTouchColorActive] = useState(false);
  const [activeSpecialty, setActiveSpecialty] = useState(0);

  // 3D tilt & glare states for portrait
  const portraitCardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovering: false });

  // Detect touch capability
  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(hover: none)").matches ||
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window);
    setIsTouchDevice(isTouch);
  }, []);

  // Cycling specialties highlight in paragraph
  useEffect(() => {
    if (shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveSpecialty((prev) => (prev + 1) % 3);
    }, 2600);
    return () => clearInterval(interval);
  }, [shouldReduceMotion]);

  // Defer Three.js WebGL node network to idle time on desktop only (>=768px)
  const [mountNetwork, setMountNetwork] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768 && !shouldReduceMotion) {
      if ("requestIdleCallback" in window) {
        const handle = (window as any).requestIdleCallback(() => setMountNetwork(true), { timeout: 2000 });
        return () => (window as any).cancelIdleCallback?.(handle);
      } else {
        const timer = setTimeout(() => setMountNetwork(true), 1200);
        return () => clearTimeout(timer);
      }
    }
  }, [shouldReduceMotion]);

  // Handle 3D Tilt & Glare on Portrait (Mouse only)
  const handlePortraitMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || shouldReduceMotion || !portraitCardRef.current) return;
    const rect = portraitCardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const maxTilt = 7;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -maxTilt;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * maxTilt;

    const glareX = ((e.clientX - rect.left) / rect.width) * 100;
    const glareY = ((e.clientY - rect.top) / rect.height) * 100;

    setTilt({ rotateX, rotateY, glareX, glareY, isHovering: true });
  };

  const handlePortraitMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0, glareX: 50, glareY: 50, isHovering: false });
  };

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
      id="hero"
      className="relative overflow-hidden pt-24 xs:pt-28 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 bg-bg border-b border-border-custom/40 scroll-mt-20 sm:scroll-mt-24"
      aria-label="Portfolio Introduction"
    >
      {/* ── 1. Single WebGL Canvas: Three.js Node Network Background (Deferred Desktop Only) ── */}
      {mountNetwork && <HeroNodeNetwork />}

      {/* ── Subtle Architectural Grid Line Overlay ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
          style={{
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
        className="content-width relative z-10"
      >
        {/* ── TOP STRIP ──────────────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 xs:gap-4 pb-3 sm:pb-5 mb-5 sm:mb-10 border-b border-border-custom/60"
        >
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
              Dhruv Vawhle
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-text-secondary">
              AI Security Specialist
            </span>
          </div>
        </motion.div>

        {/* ── MAIN HERO GRID ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT ZONE: Stacked Typography, Bio, CTA Buttons (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4 sm:space-y-7">
            <motion.div variants={itemVariants}>

              {/* Headline with Scramble Effect */}
              <h1 className="font-display font-black tracking-tighter uppercase leading-[0.95] sm:leading-[0.88] select-none text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[5.75rem]">
                <span className="sr-only">Dhruv Vawhle — Software Engineer &amp; AI Security Specialist</span>
                <div className="text-text-primary">
                  <ScrambleWord
                    text="ENGINEER"
                    isTouchDevice={isTouchDevice}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </div>
                <div className="text-accent">
                  <ScrambleWord
                    text="BUILDER"
                    isTouchDevice={isTouchDevice}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </div>
                <div className="text-text-primary">
                  <ScrambleWord
                    text="PROBLEM"
                    isTouchDevice={isTouchDevice}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </div>
                <div className="text-text-primary">
                  <ScrambleWord
                    text="SOLVER"
                    isTouchDevice={isTouchDevice}
                    shouldReduceMotion={shouldReduceMotion}
                  />
                </div>
              </h1>

              {/* Attribution Title & Paragraph with Moving Specialty Highlights */}
              <div className="mt-4 sm:mt-6 max-w-xl">
                <p className="text-base sm:text-lg md:text-xl font-bold text-text-primary font-display">
                  Dhruv Vawhle — Software Engineer
                </p>
                <p className="mt-2.5 sm:mt-3 text-sm sm:text-base md:text-lg text-text-secondary leading-relaxed">
                  Final-year Information Technology undergraduate specializing in{" "}
                  <span
                    className={`inline-block rounded-md px-1.5 py-0.5 transition-all duration-500 ${
                      activeSpecialty === 0
                        ? "bg-accent/15 text-accent dark:bg-accent/25 dark:text-accent font-semibold shadow-xs ring-1 ring-accent/30"
                        : "text-text-primary"
                    }`}
                  >
                    full-stack web development
                  </span>,{" "}
                  <span
                    className={`inline-block rounded-md px-1.5 py-0.5 transition-all duration-500 ${
                      activeSpecialty === 1
                        ? "bg-accent/15 text-accent dark:bg-accent/25 dark:text-accent font-semibold shadow-xs ring-1 ring-accent/30"
                        : "text-text-primary"
                    }`}
                  >
                    applied machine learning
                  </span>, and{" "}
                  <span
                    className={`inline-block rounded-md px-1.5 py-0.5 transition-all duration-500 ${
                      activeSpecialty === 2
                        ? "bg-accent/15 text-accent dark:bg-accent/25 dark:text-accent font-semibold shadow-xs ring-1 ring-accent/30"
                        : "text-text-primary"
                    }`}
                  >
                    AI security
                  </span>.
                </p>
              </div>
            </motion.div>

            {/* CTA Buttons: Shimmer on Primary, Magnetic Lean toward Cursor */}
            <motion.div
              variants={itemVariants}
              className="pt-4 sm:pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4.5"
            >
              {/* Primary: Explore Featured Projects */}
              <MagneticButton
                isTouchDevice={isTouchDevice}
                shouldReduceMotion={shouldReduceMotion}
              >
                <a
                  href="#projects"
                  className="group/btn relative overflow-hidden w-full sm:w-auto h-[50px] min-h-[48px] px-8 rounded-full text-[15px] sm:text-base font-semibold leading-none whitespace-nowrap bg-accent text-white shadow-md hover:shadow-lg hover:bg-accent-hover transition-all duration-300 inline-flex items-center justify-center gap-2.5 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  {/* Continuous subtle shimmer streak */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -translate-x-full animate-[shimmer_2.8s_infinite] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
                  />
                  <span className="relative z-10">Explore Featured Projects</span>
                  <ArrowRightIcon />
                </a>
              </MagneticButton>

              {/* Secondary: View Resume (Normal <a> link to /resume.pdf, opens new tab) */}
              <MagneticButton
                isTouchDevice={isTouchDevice}
                shouldReduceMotion={shouldReduceMotion}
              >
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto h-[50px] min-h-[48px] px-7 rounded-full text-[15px] sm:text-base font-semibold leading-none whitespace-nowrap bg-bg-surface hover:bg-bg-surface-hover text-text-primary border border-border-custom hover:border-accent hover:text-accent shadow-xs hover:shadow-md transition-all duration-300 inline-flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-accent"
                >
                  <ResumeIcon />
                  <span>View Resume</span>
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* RIGHT ZONE: Portrait with 3D Tilt, Glare, Beam, Chip, Info Card, Dock (5 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 relative z-20">

            {/* 3D Tilt Container */}
            <div
              ref={portraitCardRef}
              onMouseMove={handlePortraitMouseMove}
              onMouseLeave={handlePortraitMouseLeave}
              style={{
                perspective: 1000,
              }}
              className="w-full"
            >
              <motion.div
                animate={
                  isTouchDevice || shouldReduceMotion
                    ? { rotateX: 0, rotateY: 0 }
                    : {
                        rotateX: tilt.rotateX,
                        rotateY: tilt.rotateY,
                      }
                }
                transition={{
                  type: "spring",
                  stiffness: 280,
                  damping: 24,
                }}
                tabIndex={0}
                role="region"
                aria-label="Dhruv Vawhle portrait, turns to color on hover or focus"
                onClick={handlePortraitTap}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handlePortraitTap();
                  }
                }}
                className={`relative w-full max-w-[340px] sm:max-w-md lg:max-w-none mx-auto aspect-[4/5] rounded-[22px] overflow-hidden border border-border-custom shadow-2xl bg-bg-surface/90 group cursor-pointer focus-visible:outline-2 focus-visible:outline-accent select-none ${
                  isTouchColorActive ? "touch-color-active" : ""
                }`}
              >
                {/* Image Component */}
                <Image
                  src="/images/profile/dhruv-vawhle.jpg"
                  alt="Dhruv Vawhle – Software Engineer & AI Security Specialist Portrait"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 480px"
                  className={`object-cover grayscale contrast-[1.06] transition-[filter] duration-700 motion-reduce:transition-none group-hover:grayscale-0 group-focus-visible:grayscale-0 ${
                    isTouchColorActive ? "!grayscale-0" : ""
                  }`}
                  style={{ objectPosition: "50% 20%" }}
                />

                {/* Glare effect on mouse move */}
                {!isTouchDevice && !shouldReduceMotion && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300 rounded-[22px]"
                    style={{
                      opacity: tilt.isHovering ? 0.35 : 0,
                      background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.6) 0%, transparent 60%)`,
                    }}
                  />
                )}

                {/* Animated Border Beam */}
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full pointer-events-none z-20 rounded-[22px] overflow-hidden"
                  fill="none"
                >
                  <defs>
                    <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="transparent" />
                      <stop offset="50%" stopColor="var(--accent)" />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                  </defs>
                  <rect
                    x="1"
                    y="1"
                    width="calc(100% - 2px)"
                    height="calc(100% - 2px)"
                    rx="21"
                    stroke="url(#beamGradient)"
                    strokeWidth="2"
                    strokeDasharray="100 380"
                    className={shouldReduceMotion ? undefined : "animate-border-beam"}
                  />
                </svg>


                {/* Animated Node-Graph Chip Top Right (Hidden on mobile < sm to prevent overlapping portrait) */}
                <div className="hidden sm:block absolute top-3.5 right-3.5 z-20">
                  <NodeGraphChip />
                </div>

                {/* Info Card inside Portrait */}
                <div className="absolute inset-x-3.5 bottom-3.5 z-20 p-5 sm:p-6 rounded-2xl bg-bg-surface/95 backdrop-blur-xl border border-border-custom shadow-lg space-y-2.5 transition-all duration-300">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-text-primary leading-none">
                      Dhruv Vawhle
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-accent mt-1.5 font-medium">
                      AI Security Specialist
                    </p>
                  </div>
                  <div className="pt-2.5 border-t border-border-custom/60 flex items-center justify-between text-xs font-mono text-text-secondary">
                    <span>B.Tech IT (Graduating 2027) · Mumbai, India</span>
                    <div className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Available for Roles</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Direct Contact Channels Dock alongside Portrait */}
            <div className="mt-4 flex items-center justify-between p-2.5 sm:p-3 max-w-[340px] sm:max-w-md lg:max-w-none mx-auto rounded-2xl bg-bg-surface border border-border-custom shadow-xs">
              <div className="flex items-center pl-2 sm:pl-3">
                <div className="flex flex-col">
                  <span className="font-mono text-xs font-bold text-text-primary leading-tight">
                    Profiles &amp; Resume
                  </span>
                  <span className="hidden sm:inline font-mono text-[11px] text-text-secondary leading-tight mt-0.5">
                    Quick Connect
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

        {/* ── 3. CREDIBILITY ROW ─────────────────────────────────────── */}
        <motion.div
          variants={itemVariants}
          className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-border-custom/60"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CredibilityCard
              category="Legal ownership"
              title="Copyright-Filed Software"
              icon={<ShieldIcon />}
              isTouchDevice={isTouchDevice}
            />
            <CredibilityCard
              category="Systems architecture"
              title="Full-Stack & Applied AI Systems"
              icon={<DatabaseIcon />}
              isTouchDevice={isTouchDevice}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
