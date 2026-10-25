"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { SHOWCASE_PROJECTS, ShowcaseProject } from "@/data/showcaseProjects";
import CoverflowCard from "@/components/sections/CoverflowCard";
import dynamic from "next/dynamic";
import ScrollReveal from "@/components/effects/ScrollReveal";

const ProjectDetailSheet = dynamic(
  () => import("@/components/sections/ProjectDetailSheet"),
  { ssr: false }
);

const DriftingParticleField = dynamic(
  () => import("@/components/sections/DriftingParticleField"),
  { ssr: false }
);

const FILTER_CHIPS = ["All", "Web", "AI", "Machine Learning", "NLP", "Cloud"] as const;
type FilterChip = (typeof FILTER_CHIPS)[number];

export default function Projects() {
  const shouldReduceMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterChip>("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [viewMode, setViewMode] = useState<"showcase" | "grid">("showcase");

  const sectionRef = useRef<HTMLElement>(null);
  const dragStartX = useRef<number | null>(null);

  // Filter projects based on active chip
  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return SHOWCASE_PROJECTS;
    }
    // Filter out the GitHub card if not on "All" filter
    return SHOWCASE_PROJECTS.filter((p) =>
      !p.isGitHubCard && p.categories.includes(activeFilter as any)
    );
  }, [activeFilter]);

  // Reset to first matching card when filter changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeFilter]);

  // Track visibility to pause Three.js particle loop when off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Keyboard navigation for active card
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when sheet modal is open
      if (isSheetOpen) return;

      if (e.key === "ArrowLeft") {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => Math.min(filteredProjects.length - 1, prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredProjects.length, isSheetOpen]);

  // Drag / swipe handlers with touch-action: pan-y
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        // Swiped left -> next
        setActiveIndex((prev) => Math.min(filteredProjects.length - 1, prev + 1));
      } else {
        // Swiped right -> prev
        setActiveIndex((prev) => Math.max(0, prev - 1));
      }
    }
    dragStartX.current = null;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        setActiveIndex((prev) => Math.min(filteredProjects.length - 1, prev + 1));
      } else {
        setActiveIndex((prev) => Math.max(0, prev - 1));
      }
    }
    dragStartX.current = null;
  };

  const openProjectSheet = (project: ShowcaseProject) => {
    setSelectedProject(project);
    setIsSheetOpen(true);
  };

  const currentFrontProject = filteredProjects[activeIndex];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-[var(--section-padding-y)] bg-bg relative overflow-hidden scroll-mt-20 sm:scroll-mt-24"
      aria-label="Projects Section"
    >
      {/* Three.js subtle drifting particles behind the stage */}
      {isSectionVisible && <DriftingParticleField paused={!isSectionVisible} />}

      <div className="content-width relative z-10">
        {/* Editorial Chapter Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                Selected Work
              </span>
            </div>
          </div>

          <div className="max-w-3xl mb-8">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
              Engineering systems built for production scale.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
              Full-stack architectures, applied machine learning systems, and AI security gateways with measurable impact.
            </p>
          </div>

          {/* Filter Chips & View Mode Toggle */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            {/* Filter Chips */}
            <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none py-1">
              {FILTER_CHIPS.map((chip) => {
                const isActive = activeFilter === chip;
                return (
                  <button
                    key={chip}
                    onClick={() => setActiveFilter(chip)}
                    className={`min-h-[44px] h-11 px-4 sm:px-5 rounded-xl font-mono text-xs sm:text-sm font-semibold whitespace-nowrap transition-all border cursor-pointer inline-flex items-center justify-center flex-shrink-0 touch-manipulation focus-visible:outline-2 focus-visible:outline-accent ${
                      isActive
                        ? "bg-accent/15 border-accent text-accent shadow-xs font-bold"
                        : "bg-bg-surface border-border-custom text-text-secondary hover:text-text-primary hover:border-neutral-300 dark:hover:border-neutral-600"
                    }`}
                  >
                    {chip}
                  </button>
                );
              })}
            </div>

            {/* View Mode Segmented Switch: 3D Showcase vs Grid Matrix */}
            <div className="relative flex items-center p-1 rounded-2xl bg-bg-surface border border-border-custom shadow-xs self-start md:self-auto flex-shrink-0">
              <button
                type="button"
                onClick={() => setViewMode("showcase")}
                aria-label="3D Coverflow Showcase View"
                aria-pressed={viewMode === "showcase"}
                className={`relative min-h-[40px] px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-accent z-10 ${
                  viewMode === "showcase"
                    ? "text-white font-bold"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {viewMode === "showcase" && (
                  <motion.div
                    layoutId="viewModePill"
                    className="absolute inset-0 bg-accent rounded-xl shadow-xs -z-10"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 450, damping: 35 }
                    }
                  />
                )}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m21 16-9 5-9-5V8l9-5 9 5v8Z" />
                  <path d="M3.27 6.96 12 12.01l8.73-5.05" />
                  <path d="M12 22.08V12" />
                </svg>
                <span>3D Showcase</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode("grid")}
                aria-label="Engineering Grid Matrix View"
                aria-pressed={viewMode === "grid"}
                className={`relative min-h-[40px] px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-accent z-10 ${
                  viewMode === "grid"
                    ? "text-white font-bold"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {viewMode === "grid" && (
                  <motion.div
                    layoutId="viewModePill"
                    className="absolute inset-0 bg-accent rounded-xl shadow-xs -z-10"
                    transition={
                      shouldReduceMotion
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 450, damping: 35 }
                    }
                  />
                )}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
                <span>Grid Matrix</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {viewMode === "showcase" ? (
            <motion.div
              key="showcase-mode"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* ── Mode 1: 3D Coverflow Stage ── */}
              <ScrollReveal direction="up" delay={0.1} scale={0.96} blur>
                <div
                  style={{
                    perspective: "1100px",
                    touchAction: "pan-y",
                  }}
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  onMouseDown={handleMouseDown}
                  onMouseUp={handleMouseUp}
                  className="relative w-full h-[520px] sm:h-[540px] flex items-center justify-center overflow-visible"
                >
                  {filteredProjects.map((project, idx) => {
                    const offset = idx - activeIndex;
                    const isFront = offset === 0;

                    return (
                      <CoverflowCard
                        key={project.id}
                        project={project}
                        isFront={isFront}
                        offset={offset}
                        onSelect={() => setActiveIndex(idx)}
                        onOpenDetail={() => openProjectSheet(project)}
                      />
                    );
                  })}
                </div>
              </ScrollReveal>

              {/* Carousel Navigation Bar (Prev / Next & Dots with >=44px Touch Targets) */}
              <ScrollReveal direction="up" delay={0.15}>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
                      disabled={activeIndex === 0}
                      aria-label="Previous project card"
                      className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-border-custom bg-bg-surface hover:border-accent disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-text-primary transition-colors cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>

                    {/* Pagination Dots with Accessible 44px Touch Targets */}
                    <div className="flex items-center gap-1">
                      {filteredProjects.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveIndex(idx)}
                          aria-label={`Go to slide ${idx + 1}`}
                          className="min-w-[36px] sm:min-w-[40px] min-h-[44px] flex items-center justify-center p-1.5 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent rounded-full"
                        >
                          <span
                            className={`h-2 rounded-full transition-all duration-300 pointer-events-none ${
                              activeIndex === idx ? "w-7 bg-accent" : "w-2 bg-border-custom hover:bg-neutral-400"
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setActiveIndex((prev) => Math.min(filteredProjects.length - 1, prev + 1))}
                      disabled={activeIndex === filteredProjects.length - 1}
                      aria-label="Next project card"
                      className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-border-custom bg-bg-surface hover:border-accent disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-text-primary transition-colors cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>

                  {/* Quick Toggle to Grid */}
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    className="font-mono text-xs text-text-secondary hover:text-accent underline underline-offset-4 cursor-pointer transition-colors"
                  >
                    Switch to rapid-scan grid view
                  </button>
                </div>
              </ScrollReveal>
            </motion.div>
          ) : (
            <motion.div
              key="grid-mode"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* ── Mode 2: Engineering Grid Matrix (Fast Evaluation) ── */}
              <ScrollReveal direction="up" delay={0.08}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                  {filteredProjects.map((project) => {
                    if (project.isGitHubCard) {
                      return (
                        <a
                          key={project.id}
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-7 rounded-3xl border border-dashed border-accent/40 bg-accent/[0.04] hover:bg-accent/[0.08] flex flex-col justify-between transition-all duration-300 group focus-visible:outline-2 focus-visible:outline-accent"
                        >
                          <div>
                            <div className="w-12 h-12 rounded-2xl bg-accent/15 text-accent flex items-center justify-center mb-5 shadow-xs">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                            </div>
                            <h3 className="font-display font-bold text-xl text-text-primary group-hover:text-accent transition-colors">
                              {project.title}
                            </h3>
                            <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                              {project.subtitle}
                            </p>
                          </div>
                          <div className="mt-6 flex items-center gap-2 font-mono text-xs font-semibold text-accent">
                            <span>Visit GitHub Profile ↗</span>
                          </div>
                        </a>
                      );
                    }

                    const primaryMetric = project.metrics && project.metrics.length > 0 ? project.metrics[0] : null;

                    return (
                      <div
                        key={project.id}
                        className="p-6 sm:p-7 rounded-3xl border border-border-custom bg-bg-surface hover:border-accent/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
                      >
                        <div>
                          {/* Top Status & Metrics */}
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent">
                              {project.status}
                            </span>
                            {primaryMetric && (
                              <span className="font-mono text-[11px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                                {primaryMetric.value} {primaryMetric.label}
                              </span>
                            )}
                          </div>

                          <h3 className="font-display font-bold text-xl text-text-primary tracking-tight group-hover:text-accent transition-colors">
                            {project.title}
                          </h3>
                          <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                            {project.subtitle}
                          </p>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {project.stack.slice(0, 5).map((t) => (
                              <span
                                key={t}
                                className="px-2.5 py-1 rounded-lg bg-bg font-mono text-[11px] text-text-secondary border border-border-custom"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="pt-6 mt-6 border-t border-border-custom/80 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => openProjectSheet(project)}
                            aria-label={`View architectural deep-dive for ${project.title}`}
                            className="inline-flex items-center gap-2 font-sans text-xs font-semibold text-accent hover:text-accent-hover transition-colors cursor-pointer py-1.5 focus-visible:outline-2 focus-visible:outline-accent"
                          >
                            <span>Architectural Details</span>
                            <span>→</span>
                          </button>

                          <div className="flex items-center gap-2">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Live demo for ${project.title}`}
                                className="w-9 h-9 rounded-full border border-border-custom hover:border-accent flex items-center justify-center text-text-secondary hover:text-accent transition-colors shadow-xs"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                                  <polyline points="15 3 21 3 21 9" />
                                  <line x1="10" y1="14" x2="21" y2="3" />
                                </svg>
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`GitHub repository for ${project.title}`}
                                className="w-9 h-9 rounded-full border border-border-custom hover:border-accent flex items-center justify-center text-text-secondary hover:text-accent transition-colors shadow-xs"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollReveal>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Detail Sheet Portal */}
      <ProjectDetailSheet
        project={selectedProject}
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      />
    </section>
  );
}
