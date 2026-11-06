"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useReducedMotion } from "motion/react";
import { SHOWCASE_PROJECTS, ShowcaseProject } from "@/data/showcaseProjects";
import CoverRing from "@/components/sections/CoverRing";
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

  const sectionRef = useRef<HTMLElement>(null);

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
        setActiveIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
      } else if (e.key === "ArrowRight") {
        setActiveIndex((prev) => (prev + 1) % filteredProjects.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filteredProjects.length, isSheetOpen]);

  const openProjectSheet = (project: ShowcaseProject) => {
    setSelectedProject(project);
    setIsSheetOpen(true);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-[var(--section-padding-y)] bg-bg relative overflow-hidden scroll-mt-20 sm:scroll-mt-24"
      aria-label="Projects Section"
    >
      {/* Three.js subtle drifting particles behind the stage */}
      <DriftingParticleField paused={!isSectionVisible} />

      <div className="content-width relative z-10">
        {/* Editorial Chapter Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-text-secondary">Selected work</span>
            </div>
          </div>

          <div className="max-w-3xl mb-8">
            <h2 className="font-display font-extrabold text-2xl xs:text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
              Engineering systems built for production scale.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
              Full-stack architectures, applied machine learning systems, and AI security gateways with measurable impact.
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto pb-2 scrollbar-none py-1 mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            {FILTER_CHIPS.map((chip) => {
              const isActive = activeFilter === chip;
              return (
                <button
                  key={chip}
                  onClick={() => setActiveFilter(chip)}
                  className={`min-h-[44px] h-11 px-4 sm:px-5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-colors duration-150 border cursor-pointer inline-flex items-center justify-center flex-shrink-0 touch-manipulation focus-visible:outline-2 focus-visible:outline-accent active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${
                    isActive
                      ? "bg-accent/15 border-accent text-accent shadow-xs font-semibold"
                      : "bg-bg-surface border-border-custom text-text-secondary hover:text-text-primary hover:border-neutral-300 dark:hover:border-neutral-600"
                  }`}
                >
                  {chip}
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        {/* 3D Auto-Orbiting Cover Ring Stage */}
        <ScrollReveal direction="up" delay={0.05} distance={16}>
          <CoverRing
            projects={filteredProjects}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            onOpenDetail={openProjectSheet}
            shouldReduceMotion={shouldReduceMotion ?? false}
            isPaused={isSheetOpen}
          />
        </ScrollReveal>
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
