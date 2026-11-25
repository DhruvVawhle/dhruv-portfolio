"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { SHOWCASE_PROJECTS, ShowcaseProject } from "@/data/showcaseProjects";
import ScrollReveal from "@/components/effects/ScrollReveal";
import ProjectShowcase from "@/components/sections/project-showcase/ProjectShowcase";

const ProjectDetailSheet = dynamic(
  () => import("@/components/sections/ProjectDetailSheet"),
  { ssr: false }
);

const DriftingParticleField = dynamic(
  () => import("@/components/sections/DriftingParticleField"),
  { ssr: false }
);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);

  // Pause Three.js particle loop when section is off-screen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const openProjectSheet = (project: ShowcaseProject) => {
    setSelectedProject(project);
    setIsSheetOpen(true);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-[var(--section-padding-y)] bg-bg relative overflow-x-clip scroll-mt-20 sm:scroll-mt-24"
      aria-label="Projects Section"
    >
      {/* Three.js subtle drifting particles behind the stage */}
      <DriftingParticleField paused={!isSectionVisible || isSheetOpen} />

      <div className="content-width relative z-10">
        {/* Editorial Chapter Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-text-secondary">Selected work</span>
            </div>
          </div>

          <div className="max-w-3xl mb-8">
            <h2 className="font-display font-bold text-2xl xs:text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
              Engineering systems built for production scale.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
              Full-stack architectures, applied machine learning systems, and AI security gateways with measurable impact.
            </p>
          </div>
        </ScrollReveal>

        <ProjectShowcase
          projects={SHOWCASE_PROJECTS}
          onOpenDetail={openProjectSheet}
          isSheetOpen={isSheetOpen}
        />
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
