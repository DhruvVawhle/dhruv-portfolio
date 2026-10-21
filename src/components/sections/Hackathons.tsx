"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { OTHER_COMPETITIONS, HackathonCard } from "@/data/experienceAndCompetitions";
import ScrollReveal from "@/components/effects/ScrollReveal";
import PreviewDialog from "@/components/ui/PreviewDialog";
import N8nLiveWorkflow from "@/components/ui/N8nLiveWorkflow";
import WhatsAppLiveChat from "@/components/ui/WhatsAppLiveChat";

export default function Hackathons() {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    title: string;
    imageSrc?: string;
    pdfSrc?: string;
    subtitle?: string;
  }>({
    isOpen: false,
    title: "",
  });

  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const heroSectionRef = useRef<HTMLDivElement>(null);

  // Check reduced motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  /* ── Spotlight Component for Bento Tiles ───────────────── */
  const BentoTile = ({
    children,
    className = "",
    innerClassName = "",
    isWarm = false,
    padding = "",
  }: {
    children: React.ReactNode;
    className?: string;
    innerClassName?: string;
    isWarm?: boolean;
    padding?: string;
  }) => {
    const tileRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(-500);
    const mouseY = useMotionValue(-500);

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = tileRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const onMouseLeave = () => {
      mouseX.set(-500);
      mouseY.set(-500);
    };

    const defaultPadding = padding || (className.includes("p-") ? "" : "p-6 sm:p-8");

    return (
      <div
        ref={tileRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`relative rounded-3xl bg-bg-surface border border-border-custom ${defaultPadding} overflow-hidden group shadow-sm transition-all duration-300 ${className}`}
      >
        {/* Spotlight Radial Glow following cursor */}
        <motion.div
          style={{
            left: mouseX,
            top: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className={`pointer-events-none absolute w-80 h-80 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isWarm ? "bg-amber-500/20" : "bg-accent/15"
          }`}
        />
        <div className={`relative z-10 ${innerClassName || "h-full flex flex-col justify-between"}`}>
          {children}
        </div>
      </div>
    );
  };

  return (
    <section
      id="hackathons"
      className="py-[var(--section-padding-y)] bg-bg relative scroll-mt-20 sm:scroll-mt-24"
      aria-label="Competitive Engineering Section"
    >
      <div className="content-width">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                Competitive Engineering
              </span>
            </div>
          </div>

          <div className="max-w-3xl mb-12">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
              Building under pressure, with a team, against the clock.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
              From National-Level Smart India Hackathon prototypes to intensive 24-hour AI agent buildathons.
            </p>
          </div>
        </ScrollReveal>

        {/* ── BENTO GRID (12 Columns Desktop, 1 Column Mobile) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {/* 1. HERO TILE (7 Cols) with Warm Orange Border Beam */}
          <div
            ref={heroSectionRef}
            className="lg:col-span-7 relative rounded-3xl bg-bg-surface border-2 border-amber-500/40 p-6 sm:p-8 overflow-hidden shadow-md flex flex-col justify-between group"
          >
            {/* Animated Magic UI-style Border Beam in warm orange */}
            {!prefersReducedMotion && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[2px] rounded-3xl overflow-hidden"
              >
                <div className="border-beam-line absolute -inset-[100%] rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,#f59e0b_360deg)] opacity-60 animate-[spin_5s_linear_infinite]" />
                <div className="absolute inset-[2px] rounded-3xl bg-bg-surface" />
              </div>
            )}

            <div className="relative z-10">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                  Participated in SIH 2025
                </span>
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl text-text-primary tracking-tight mb-1">
                MediMitra
              </h3>
              <p className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold mb-4">
                Team Lead / Team MediMitra (6 members)
              </p>

              <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 mb-6">
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Public health awareness in rural communities limited by low internet bandwidth and lack of medical app adoption.
                </p>
              </div>

              {/* Standalone Realistic WhatsApp-Style Healthcare Chat Section */}
              <div className="w-full mt-2">
                <WhatsAppLiveChat />
              </div>
            </div>
          </div>

          {/* Side Column: STATS & KEY FACTS CARDS (5 Cols Desktop, Stacked Mobile) */}
          <div className="lg:col-span-5 flex flex-col gap-4 items-start">
            {/* 2. STATS TILE */}
            <BentoTile className="p-5 lg:flex-none" isWarm={true} innerClassName="flex flex-col">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-[14px] border border-border-custom p-4 min-h-[104px] flex flex-col gap-1.5 bg-bg">
                  <div className="font-display text-3xl font-bold text-amber-600 dark:text-amber-400 leading-none">
                    Top 30
                  </div>
                  <span className="font-mono text-[11px] text-text-secondary mt-auto block leading-tight">
                    SIH 2025 college finalists
                  </span>
                </div>

                <div className="rounded-[14px] border border-border-custom p-4 min-h-[104px] flex flex-col gap-1.5 bg-bg">
                  <div className="font-display text-3xl font-bold text-text-primary leading-none">
                    6
                  </div>
                  <span className="font-mono text-[11px] text-text-secondary mt-auto block leading-tight">
                    Team MediMitra members
                  </span>
                </div>

                <div className="rounded-[14px] border border-border-custom p-4 min-h-[104px] flex flex-col gap-1.5 bg-bg">
                  <div className="font-display text-3xl font-bold text-accent leading-none">
                    24 hr
                  </div>
                  <span className="font-mono text-[11px] text-text-secondary mt-auto block leading-tight">
                    Analytix 2026 Datathon
                  </span>
                </div>

                <div className="rounded-[14px] border border-border-custom p-4 min-h-[104px] flex flex-col gap-1.5 bg-bg">
                  <div className="font-display text-3xl font-bold text-accent leading-none">
                    12 hr
                  </div>
                  <span className="font-mono text-[11px] text-text-secondary mt-auto block leading-tight">
                    Buildathon, Team Edith
                  </span>
                </div>
              </div>
            </BentoTile>

            {/* 3. KEY FACTS TILE */}
            <BentoTile className="p-5 self-start w-full" innerClassName=" ">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent block mb-3">
                KEY FACTS
              </span>

              <dl className="space-y-0 text-xs sm:text-sm">
                <div className="py-3 grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-1 sm:gap-x-4 items-baseline">
                  <dt className="font-bold text-text-primary sm:whitespace-nowrap">Role:</dt>
                  <dd className="text-text-secondary leading-relaxed m-0">
                    Team Lead and AI Architect. Designed the n8n workflow automation and multilingual Gemini NLU pipeline.
                  </dd>
                </div>

                <div className="py-3 border-t border-border-custom grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-1 sm:gap-x-4 items-baseline">
                  <dt className="font-bold text-text-primary sm:whitespace-nowrap">Outcome:</dt>
                  <dd className="text-text-secondary leading-relaxed m-0">
                    Selected as college finalists for Smart India Hackathon software-track submission.
                  </dd>
                </div>

                <div className="py-3 border-t border-border-custom grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-y-1 sm:gap-x-4 items-baseline">
                  <dt className="font-bold text-text-primary sm:whitespace-nowrap">Time constraint:</dt>
                  <dd className="text-text-secondary leading-relaxed m-0">
                    SIH National Software Sprint.
                  </dd>
                </div>
              </dl>
            </BentoTile>
          </div>

          {/* 4. STACK TILE (Full Width, 12 Cols) with Live Interactive n8n Workflow */}
          <BentoTile className="lg:col-span-12 p-2 sm:p-4">
            <div className="w-full">
              <N8nLiveWorkflow />
            </div>
          </BentoTile>

          {/* 5. CONTRIBUTION TILE (5 Cols) with 2-Column Responsive Tiles */}
          <BentoTile className="lg:col-span-5 p-5 lg:h-full" padding="p-5" innerClassName="flex flex-col lg:h-full">
            <div className="flex flex-col lg:h-full">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent block mb-3">
                CONTRIBUTIONS
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 content-start">
                {[
                  "Team Lead",
                  "AI Workflow Design",
                  "Gemini API Integration",
                  "n8n Workflow Development",
                  "WhatsApp Conversation Flow",
                  "Backend Architecture",
                  "MongoDB Design",
                  "Technical Documentation",
                  "Smart India Hackathon Submission",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 rounded-[10px] border border-border-custom bg-bg/60 dark:bg-bg/40 px-3 py-2.5 text-[13px] text-text-primary"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="font-medium leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </BentoTile>

          {/* 6. CASE STUDY TILE (7 Cols) with 3D Depth Card */}
          <BentoTile className="lg:col-span-7">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent block mb-3">
                Technical Case Study
              </span>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                Explore the Smart India Hackathon submission covering the complete engineering process, from AI architecture and workflow orchestration to deployment strategy, technical decisions, and expected impact.
              </p>

              {/* Document Card with Visual Preview */}
              <a
                href="/medimitra-case-study.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 rounded-2xl bg-bg border border-border-custom mb-6 cursor-pointer group/study hover:border-accent/60 transition-all shadow-xs"
              >
                <div className="mb-3">
                  <h4 className="font-display font-bold text-base text-text-primary group-hover/study:text-accent transition-colors">
                    MediMitra AI Healthcare Case Study
                  </h4>
                </div>

                {/* Visible Document Thumbnail */}
                <div className="relative w-full aspect-[16/9] max-h-48 rounded-xl border border-border-custom bg-black/5 dark:bg-black/40 overflow-hidden mb-3">
                  <img
                    src="/images/hackathons/medimitra-case-study-preview.png"
                    alt="MediMitra AI Healthcare Case Study – Multilingual Triage & n8n Architecture Presentation"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover/study:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-bg/85 backdrop-blur-md border border-border-custom text-text-primary font-mono text-[11px] flex items-center gap-1.5 opacity-80 group-hover/study:opacity-100 transition-opacity">
                    <span>PDF Preview</span>
                  </div>
                </div>


              </a>

              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/medimitra-case-study.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-mono text-xs font-bold hover:bg-accent/90 transition-colors cursor-pointer shadow-md"
                >
                  <span>View presentation / case study ↗</span>
                </a>
              </div>
            </div>
          </BentoTile>
        </div>

        {/* ── FOCUS CARDS: OTHER HACKATHONS AND BUILDATHONS ── */}
        <div className="pt-8 border-t border-border-custom/60">
          <ScrollReveal>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight mb-8">
              Other hackathons and buildathons
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OTHER_COMPETITIONS.map((comp) => {
              const isDimmed = hoveredCardId !== null && hoveredCardId !== comp.id;

              return (
                <div
                  key={comp.id}
                  onMouseEnter={() => setHoveredCardId(comp.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className={`relative p-6 sm:p-8 rounded-3xl bg-bg-surface border border-border-custom shadow-sm transition-all duration-300 ${
                    isDimmed ? "opacity-35 blur-[1px]" : "opacity-100"
                  }`}
                >
                  <div className="mb-3">
                    <span className="font-mono text-xs font-bold text-accent">
                      {comp.period} · {comp.team}
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-xl text-text-primary mb-4">
                    {comp.title}
                  </h4>

                  <div className="p-3.5 rounded-2xl bg-bg border border-border-custom mb-6">
                    <span className="font-mono text-[10px] uppercase text-text-secondary block font-semibold mb-0.5">
                      Outcome
                    </span>
                    <p className="font-mono text-xs text-text-primary">
                      {comp.outcome}
                    </p>
                  </div>

                  {/* Visible Certificate Preview Thumbnail with Click-to-Enlarge */}
                  {comp.certificateImage && (
                    <div
                      onClick={() =>
                        setDialogState({
                          isOpen: true,
                          title: comp.title,
                          imageSrc: comp.certificateImage,
                          subtitle: `${comp.period} · ${comp.team}`,
                        })
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setDialogState({
                            isOpen: true,
                            title: comp.title,
                            imageSrc: comp.certificateImage,
                            subtitle: `${comp.period} · ${comp.team}`,
                          });
                        }
                      }}
                      aria-label={`Enlarge ${comp.title} certificate`}
                      className="relative w-full aspect-[16/9] max-h-48 rounded-2xl border border-border-custom bg-black/5 dark:bg-black/40 overflow-hidden mb-4 cursor-pointer group/cardthumb hover:border-accent/60 transition-all shadow-xs"
                    >
                      <img
                        src={comp.certificateImage}
                        alt={`${comp.title} Certificate – Hackathon & Competition Recognition`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top group-hover/cardthumb:scale-[1.02] transition-transform duration-300"
                      />
                      <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-bg/85 backdrop-blur-md border border-border-custom text-text-primary font-mono text-[11px] flex items-center gap-1.5 opacity-80 group-hover/cardthumb:opacity-100 transition-opacity">
                        <span>Preview</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Case Study / Certificate Preview Dialog */}
      <PreviewDialog
        isOpen={dialogState.isOpen}
        onClose={() => setDialogState({ ...dialogState, isOpen: false })}
        title={dialogState.title}
        imageSrc={dialogState.imageSrc}
        pdfSrc={dialogState.pdfSrc}
        subtitle={dialogState.subtitle}
      />
    </section>
  );
}

