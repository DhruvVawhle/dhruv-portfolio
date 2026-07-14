"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { hero, socialLinks } from "@/lib/data";
import Button from "@/components/ui/Button";

/* ─── Icons & Engineering Graphic Motifs ───────────────────────────── */
const ShieldIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const DatabaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5V19A9 3 0 0 0 21 19V5" />
    <path d="M3 12A9 3 0 0 0 21 12" />
  </svg>
);

const RocketIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
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

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);



const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/btn:translate-x-[2px] transition-transform duration-200">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

const trustIcons = [
  <ShieldIcon key="shield" />,
  <DatabaseIcon key="db" />,
  <RocketIcon key="rocket" />,
];

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "github") return <GithubIcon />;
  if (icon === "linkedin") return <LinkedinIcon />;
  if (icon === "mail") return <MailIcon />;
  if (icon === "phone") return <PhoneIcon />;
  return null;
}

/* ─── Engineering Architectural SVG Motifs (Minimal & Low Opacity) ─── */
function ApiFlowMotif() {
  return (
    <svg width="140" height="44" viewBox="0 0 140 44" fill="none" className="text-text-secondary opacity-35 dark:opacity-45 select-none pointer-events-none">
      <circle cx="12" cy="22" r="4" fill="currentColor" />
      <line x1="16" y1="22" x2="54" y2="22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
      <rect x="54" y="10" width="32" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <text x="70" y="25" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="currentColor">
        API
      </text>
      <line x1="86" y1="22" x2="124" y2="22" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="128" cy="22" r="4" fill="var(--accent)" />
    </svg>
  );
}

function GitGraphMotif() {
  return (
    <svg width="110" height="36" viewBox="0 0 110 36" fill="none" className="text-text-secondary opacity-35 dark:opacity-45 select-none pointer-events-none">
      <circle cx="14" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" />
      <line x1="18" y1="18" x2="42" y2="18" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="46" cy="18" r="4" fill="var(--accent)" />
      <line x1="50" y1="18" x2="74" y2="10" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="78" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <line x1="50" y1="18" x2="74" y2="26" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="78" cy="26" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const parallaxX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const parallaxY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 18;
      const y = (e.clientY / innerHeight - 0.5) * 18;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, shouldReduceMotion]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-8 pb-10 sm:pt-16 sm:pb-14 lg:pt-32 lg:pb-28 bg-bg border-b border-border-custom/40"
      aria-label="Portfolio Introduction"
    >
      {/* ── Architectural 1px Background Grid Pattern (Low Opacity) ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.10]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "44px 44px",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, var(--bg) 0%, transparent 100%)",
          }}
        />
      </div>

      <div className="content-width relative z-10">
        {/* ── 1. EDITORIAL CHAPTER METADATA BAR ───────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 sm:pb-5 mb-6 sm:mb-10 border-b border-border-custom/60">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
              01 · PORTFOLIO
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent/60" />
            <span className="font-mono text-xs text-text-secondary">
              Dhruv Vawhle
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-text-secondary">
              Full-Stack Developer &amp; Applied AI Engineer
            </span>
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-border-custom/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-mono text-[11px] text-text-secondary">
                PRODUCTION RUNTIME ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================
            MOBILE / TABLET VIEW (block lg:hidden): Optimized Hierarchy
            Headline -> Portrait -> Buttons -> Role/Bio -> Stats
           ========================================================= */}
        <div className="block lg:hidden space-y-7 pt-1">
          {/* 1. Identity & Headline */}
          <div>
            <div className="flex items-center gap-3 mb-3.5 font-mono text-[11px] text-text-secondary/60">
              <span>&lt;production_architecture /&gt;</span>
              <span className="w-8 h-[1px] bg-border-custom" />
              <span>v2.0.26</span>
            </div>
            <div className="font-display font-black tracking-tighter uppercase leading-[0.88] select-none text-5xl sm:text-7xl md:text-8xl">
              <div className="text-text-primary">ENGINEER</div>
              <div className="text-accent">BUILDER</div>
              <div className="text-text-primary">PROBLEM</div>
              <div className="text-text-primary">SOLVER</div>
            </div>
          </div>

          {/* 2. Portrait Card immediately inside first screen */}
          <div className="relative pt-2">
            <div className="flex items-center justify-between mb-2.5 px-1 font-mono text-xs text-text-secondary">
              <span>PORTRAIT // ARCHITECTURE</span>
              <span className="text-accent font-semibold">GRASSROOTS SCALE</span>
            </div>

            <div className="relative w-full max-w-[320px] sm:max-w-md mx-auto aspect-[4/5] rounded-3xl overflow-hidden border border-border-custom shadow-2xl bg-bg-surface/90">
              <Image
                src="/images/profile/dhruv-vawhle.jpg"
                alt="Dhruv Vawhle – Full-Stack & AI/ML Engineer Portrait"
                fill
                priority
                quality={100}
                sizes="(max-width:768px) 100vw, 50vw"
                className="object-cover grayscale contrast-110"
              />

              <div className="absolute inset-x-3.5 bottom-3.5 p-5 rounded-2xl bg-bg-surface/95 backdrop-blur-xl border border-border-custom shadow-lg space-y-2.5">
                <div>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-text-primary leading-none">
                    Dhruv Vawhle
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-accent mt-1.5 font-medium">
                    Full-Stack &amp; AI/ML Engineer
                  </p>
                </div>
                <div className="pt-2.5 border-t border-border-custom/60 flex items-center justify-between text-xs font-mono text-text-secondary">
                  <span>B.Tech IT · Mumbai, India</span>
                  <div className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Available for Roles</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct Contact Channels alongside portrait */}
            <div className="mt-3.5 flex items-center justify-between p-3.5 sm:p-4 max-w-[320px] sm:max-w-md mx-auto rounded-2xl bg-bg-surface border border-border-custom shadow-sm">
              <span className="font-mono text-xs text-text-secondary font-medium">
                DIRECT CONTACT CHANNELS
              </span>
              <div className="flex items-center gap-2">
                {socialLinks.map((link) => (
                  <a
                    key={`mobile-${link.label}`}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label === "Resume" ? "Open Dhruv Vawhle Resume" : link.label}
                    className="w-11 h-11 min-h-[48px] rounded-xl flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-all focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <SocialIcon icon={link.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Primary CTA Buttons (Stackable with >=48px height & 16px font) */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-[10px] sm:gap-[12px]">
            <Button
              variant="primary"
              href="#projects"
              className="group/btn w-full sm:w-auto h-[46px] min-h-[46px] sm:h-[48px] sm:min-h-[48px] px-[28px] sm:px-[32px] rounded-full text-[15px] font-semibold leading-none whitespace-nowrap shadow-sm hover:shadow-md hover:-translate-y-[2px] hover:bg-accent-hover transition-all duration-300 inline-flex items-center justify-center gap-[10px] sm:gap-[12px]"
            >
              <span>Explore Featured Projects</span>
              <ArrowRightIcon />
            </Button>
            <Button
              variant="secondary"
              href="/documents/Dhruv_Vawhle_Resume.pdf"
              external
              aria-label="Open Dhruv Vawhle Resume"
              className="w-full sm:w-auto h-[46px] min-h-[46px] sm:h-[48px] sm:min-h-[48px] px-[24px] sm:px-[28px] rounded-full text-[15px] font-semibold leading-none whitespace-nowrap bg-bg-surface hover:bg-bg-surface-hover text-text-primary border border-border-custom hover:border-neutral-300 dark:hover:border-neutral-600 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-300 inline-flex items-center justify-center"
            >
              <span>📄 View Resume</span>
            </Button>
          </div>

          {/* 4. Attribution Title & Mission Description (16px body text) */}
          <div className="pt-3 border-t border-border-custom/50">
            <h2 className="text-lg sm:text-xl font-bold text-text-primary font-display">
              Dhruv Vawhle — Full-Stack &amp; AI/ML Engineer
            </h2>
            <p className="mt-2.5 text-base text-text-secondary leading-relaxed">
              Driven by curiosity and a commitment to quality, I engineer
              production software backed by real data, real users, and real
              legal ownership.
            </p>
          </div>
        </div>

        {/* =========================================================
            DESKTOP VIEW (hidden lg:grid): 100% UNCHANGED
           ========================================================= */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-start">
          {/* LEFT ZONE: Oversized Stacked Editorial Headlines (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between z-10 pt-2 space-y-7 sm:space-y-8">
            <div>
              {/* Engineering Code Fragment Graphic Overlay */}
              <div className="flex items-center gap-3 mb-5 font-mono text-[11px] text-text-secondary/60">
                <span>&lt;production_architecture /&gt;</span>
                <span className="w-8 h-[1px] bg-border-custom" />
                <span>v2.0.26</span>
              </div>

              {/* Stacked Oversized Editorial Typography */}
              <div className="font-display font-black tracking-tighter uppercase leading-[0.88] select-none">
                <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.25rem] text-text-primary">
                  ENGINEER
                </div>
                <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.25rem] text-accent">
                  BUILDER
                </div>
                <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.25rem] text-text-primary">
                  PROBLEM
                </div>
                <div className="text-5xl sm:text-7xl md:text-8xl lg:text-[6.25rem] text-text-primary">
                  SOLVER
                </div>
              </div>

              {/* Attribution Title & Reference Mission Content */}
              <div className="mt-8 max-w-xl">
                <h2 className="text-lg md:text-xl font-bold text-text-primary font-display">
                  Dhruv Vawhle — Full-Stack &amp; AI/ML Engineer
                </h2>
                <p className="mt-3 text-base md:text-lg text-text-secondary leading-relaxed">
                  Driven by curiosity and a commitment to quality, I engineer
                  production software backed by real data, real users, and real
                  legal ownership.
                </p>
              </div>
            </div>

            {/* Action Dock & Telemetry */}
            <div className="pt-6 border-t border-border-custom/50 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex flex-row items-center gap-[16px] w-auto">
                <Button
                  variant="primary"
                  href="#projects"
                  className="group/btn w-auto h-[52px] min-h-[52px] px-[32px] rounded-full text-[16px] font-semibold leading-none whitespace-nowrap shadow-sm hover:shadow-md hover:-translate-y-[2px] hover:bg-accent-hover transition-all duration-300 inline-flex items-center justify-center gap-[12px]"
                >
                  <span>Explore Featured Projects</span>
                  <ArrowRightIcon />
                </Button>
                <Button
                  variant="secondary"
                  href="/documents/Dhruv_Vawhle_Resume.pdf"
                  external
                  aria-label="Open Dhruv Vawhle Resume"
                  className="w-auto h-[52px] min-h-[52px] px-[28px] rounded-full text-[16px] font-semibold leading-none whitespace-nowrap bg-bg-surface hover:bg-bg-surface-hover text-text-primary border border-border-custom hover:border-neutral-300 dark:hover:border-neutral-600 shadow-sm hover:shadow-md hover:-translate-y-[2px] transition-all duration-300 inline-flex items-center justify-center"
                >
                  <span>📄 View Resume</span>
                </Button>
              </div>

              {/* Minimal API Flow Motif block */}
              <div className="hidden xl:block">
                <ApiFlowMotif />
              </div>
            </div>
          </div>

          {/* RIGHT ZONE: Architectural Grayscale Portrait Frame (5 cols) */}
          <div className="lg:col-span-5 relative z-20">
            {/* Subtle Mouse Parallax Frame wrapper */}
            <motion.div
              style={
                shouldReduceMotion
                  ? undefined
                  : { x: parallaxX, y: parallaxY }
              }
              className="relative"
            >
              {/* Top Architectural Badge Tag above Portrait */}
              <div className="flex items-center justify-between mb-3 px-1 font-mono text-xs text-text-secondary">
                <span>PORTRAIT // ARCHITECTURE</span>
                <span className="text-accent font-semibold">GRASSROOTS SCALE</span>
              </div>

              {/* Portrait Container with Crisp Engineering Grid Frame */}
              <div className="relative w-full max-w-[300px] sm:max-w-md lg:max-w-none mx-auto aspect-[4/5] rounded-3xl overflow-hidden border border-border-custom shadow-2xl bg-bg-surface/90 group">
                <Image
                  src="/images/profile/dhruv-vawhle.jpg"
                  alt="Dhruv Vawhle – Full-Stack & AI/ML Engineer Portrait"
                  fill
                  priority
                  quality={100}
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="object-cover grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                />

                {/* Top Corner Git Graph Motif Overlay */}
                <div className="absolute top-4 right-4 p-2.5 rounded-xl bg-bg-surface/80 backdrop-blur-md border border-border-custom/60 hidden sm:block">
                  <GitGraphMotif />
                </div>

                {/* Bottom Structured Portrait Hierarchy Inside Card */}
                <div className="absolute inset-x-4 bottom-4 p-6 sm:p-7 rounded-2xl bg-bg-surface/95 backdrop-blur-xl border border-border-custom shadow-lg space-y-3 transition-all duration-300">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-text-primary leading-none">
                      Dhruv Vawhle
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-accent mt-1.5 font-medium">
                      Full-Stack &amp; AI/ML Engineer
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border-custom/60 flex items-center justify-between text-xs font-mono text-text-secondary">
                    <span>B.Tech IT · Mumbai, India</span>
                    <div className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Available for Roles</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Social Bar alongside Portrait Grid */}
              <div className="mt-4 flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-bg-surface border border-border-custom shadow-sm">
                <span className="font-mono text-xs text-text-secondary font-medium">
                  DIRECT CONTACT CHANNELS
                </span>
                <div className="flex items-center gap-2">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label === "Resume" ? "Open Dhruv Vawhle Resume" : link.label}
                      id={`hero-social-${link.icon}`}
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-all focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <SocialIcon icon={link.icon} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── 3. PRODUCTION CREDIBILITY MATRIX ALONG GRID BASE ────────── */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-border-custom/60">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <span className="font-mono text-xs text-text-secondary uppercase tracking-widest font-semibold">
              Production Credibility &amp; Ownership
            </span>
            <span className="font-mono text-xs text-text-secondary/70">
              Grassroots Verified Deployments
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hero.trustSignals.map((signal, i) => (
              <div
                key={signal.label}
                className="p-5 sm:p-6 rounded-2xl bg-bg-surface border border-border-custom hover:border-accent/40 shadow-sm transition-all duration-300 flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-xl bg-accent/10 text-accent flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                  {trustIcons[i]}
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-accent font-semibold">
                    {i === 0
                      ? "LEGAL OWNERSHIP"
                      : i === 1
                        ? "SYSTEMS ARCHITECTURE"
                        : "PRODUCTION SCALE"}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-text-primary leading-snug mt-0.5">
                    {signal.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
