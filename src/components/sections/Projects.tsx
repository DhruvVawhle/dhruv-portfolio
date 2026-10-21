"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  const [activeFilter, setActiveFilter] = useState<FilterChip>("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(true);
  const [showFallbackList, setShowFallbackList] = useState(false);

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

          {/* Filter Chips (WCAG 2.5.5 touch target >= 44x44px with comfortable spacing) */}
          <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto pb-4 mb-8 scrollbar-none py-1">
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
        </ScrollReveal>

        {/* 3D Coverflow Stage */}
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

        {/* Carousel Navigation Bar (Prev / Next & Dots) */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveIndex((prev) => Math.max(0, prev - 1))}
              disabled={activeIndex === 0}
              aria-label="Previous project card"
              className="w-10 h-10 rounded-full border border-border-custom bg-bg-surface hover:border-accent disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-text-primary transition-colors cursor-pointer shadow-xs"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2">
              {filteredProjects.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex === idx ? "w-7 bg-accent" : "w-2 bg-border-custom hover:bg-neutral-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setActiveIndex((prev) => Math.min(filteredProjects.length - 1, prev + 1))}
              disabled={activeIndex === filteredProjects.length - 1}
              aria-label="Next project card"
              className="w-10 h-10 rounded-full border border-border-custom bg-bg-surface hover:border-accent disabled:opacity-30 disabled:pointer-events-none flex items-center justify-center text-text-primary transition-colors cursor-pointer shadow-xs"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Toggle Non-3D Fallback List */}
          <button
            onClick={() => setShowFallbackList(!showFallbackList)}
            className="font-mono text-xs text-text-secondary hover:text-accent underline underline-offset-4 cursor-pointer transition-colors"
          >
            {showFallbackList ? "Hide standard list view" : "View as standard list"}
          </button>
        </div>

        {/* GitHub profile invitation line */}
        <div className="mt-8 pt-6 border-t border-border-custom/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="font-mono text-xs sm:text-sm text-text-secondary">
            Want to see more projects? Browse my GitHub profile.
          </p>
          <a
            href="https://github.com/DhruvVawhle"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-custom hover:border-accent bg-bg-surface font-mono text-xs font-semibold text-text-primary transition-colors shadow-xs"
          >
            <span>github.com/DhruvVawhle ↗</span>
          </a>
        </div>

        {/* Accessible Plain "All Projects" Non-3D Fallback List */}
        <AnimatePresence>
          {showFallbackList && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-10 overflow-hidden"
            >
              <h3 className="font-mono text-xs uppercase tracking-widest text-text-secondary mb-4">
                All Projects Reference List
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SHOWCASE_PROJECTS.filter((p) => !p.isGitHubCard).map((p) => (
                  <div
                    key={`fallback-${p.id}`}
                    onClick={() => openProjectSheet(p)}
                    className="p-5 rounded-2xl border border-border-custom bg-bg-surface hover:border-accent transition-all cursor-pointer shadow-xs"
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-display font-bold text-base text-text-primary">
                        {p.title}
                      </span>
                      <span className="font-mono text-[11px] text-accent">
                        {p.status}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed mb-3">
                      {p.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.stack.slice(0, 5).map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-bg font-mono text-[10px] text-text-secondary border border-border-custom"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
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
