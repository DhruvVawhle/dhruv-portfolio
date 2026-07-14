"use client";

import React, { useState } from "react";
import Image from "next/image";
import { projects, Project } from "@/lib/data";
import Badge from "@/components/ui/Badge";
import ScrollReveal from "@/components/effects/ScrollReveal";
import TiltCard from "@/components/effects/TiltCard";
import TechIcon from "@/components/ui/TechIcon";
import CaseStudyModal from "@/components/ui/CaseStudyModal";

const ShieldIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const ExploreArrowIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const flagship = projects[0];
  const secondaryProjects = projects.slice(1);

  return (
    <section id="projects" className="py-[var(--section-padding-y)] bg-bg">
      <div className="content-width">
        {/* ── 1. FEATURED PROJECT HEADER ───────────────────────────────────── */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                03 · PRODUCTION SYSTEMS
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent/60" />
              <span className="font-mono text-xs text-text-secondary">
                Flagship &amp; Applied Work
              </span>
            </div>
            <span className="font-mono text-xs text-text-secondary">
              Real Users &amp; Scalable APIs
            </span>
          </div>

          <div className="max-w-3xl mb-14">
            <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-text-primary tracking-tight mb-4">
              Engineering systems built for production scale.
            </h2>
            <p className="text-base sm:text-lg text-text-secondary leading-relaxed">
              My most comprehensive and impactful software engineering project, showcasing full-stack development, AI/ML integration, scalable architecture, and production-ready implementation.
            </p>
          </div>
        </ScrollReveal>

        {/* ── MOBILE STREAMLINED SHOWCASE (block lg:hidden) ───────────────── */}
        <div className="block lg:hidden space-y-10 mb-12">
          {[flagship, ...secondaryProjects].map((proj, idx) => {
            const isMedtalk = proj.id === "medtalk";
            const primaryMetric = proj.metrics && proj.metrics.length > 0 ? proj.metrics[0] : null;

            return (
              <ScrollReveal key={`mobile-${proj.id}`} delay={idx * 0.08}>
                <div className="p-6 sm:p-8 rounded-3xl bg-bg-surface border border-border-custom hover:border-foreground/25 shadow-sm transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                  {/* Card Header Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-border-custom/60">
                    <span className="px-3 py-1 rounded-full bg-foreground/5 text-text-primary border border-border-custom font-mono text-[11px] font-bold tracking-wider uppercase">
                      {proj.id === "krishisaathi"
                        ? "FEATURED SYSTEM"
                        : proj.id === "medtalk"
                        ? "APPLIED AI HEALTHCARE"
                        : "TECHNICAL SHOWCASE"}
                    </span>
                    <span className="font-mono text-xs text-text-secondary">
                      {proj.period}
                    </span>
                  </div>

                  {/* Screenshot Preview with Intelligent Crop */}
                  <div
                    onClick={() => setSelectedProject(proj)}
                    className="group/img relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-border-custom bg-black/40 shadow-md mb-6 cursor-pointer"
                  >
                    <Image
                      src={
                        proj.image ||
                        (isMedtalk
                          ? "/images/projects/medtalk-aichatbot.png"
                          : "/images/projects/krishisaathi-homepage.png")
                      }
                      alt={`${proj.title} Preview`}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      className={`object-cover transition-transform duration-500 group-hover/img:scale-105 ${
                        isMedtalk ? "object-top" : "object-center"
                      }`}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                      <span className="px-5 py-2.5 rounded-full bg-foreground text-background font-mono text-sm sm:text-[15px] font-bold shadow-xl">
                        Explore Details
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-text-primary leading-tight">
                    {proj.title}
                  </h3>
                  <p className="font-mono text-sm text-text-secondary uppercase tracking-wider mt-1.5 mb-5">
                    {proj.subtitle}
                  </p>

                  {/* Primary Highlight Metric */}
                  {primaryMetric && (
                    <div className="mb-6 p-4 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-between">
                      <div>
                        <div className="font-mono text-[11px] text-accent uppercase tracking-wider font-bold">
                          {primaryMetric.label}
                        </div>
                        <div className="font-display font-black text-xl text-text-primary mt-0.5">
                          {primaryMetric.value}
                          {primaryMetric.suffix}
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-accent font-semibold px-2.5 py-1 rounded bg-accent/15">
                        KEY IMPACT
                      </span>
                    </div>
                  )}

                  {/* Tech Stack Chips */}
                  <div className="mb-6">
                    <div className="font-mono text-xs text-text-secondary uppercase tracking-wider mb-2 font-semibold">
                      Core Stack
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {proj.techStack.slice(0, 6).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1.5 rounded-md bg-bg border border-border-custom text-text-primary/90 font-mono text-xs sm:text-sm"
                        >
                          {tech}
                        </span>
                      ))}
                      {proj.techStack.length > 6 && (
                        <span className="px-2.5 py-1.5 rounded-md bg-bg border border-border-custom text-text-secondary font-mono text-xs sm:text-sm">
                          +{proj.techStack.length - 6} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Full Project Button (>= 48px touch target & text-base font-bold) */}
                  <div className="pt-4 border-t border-border-custom/60 flex flex-col gap-3.5">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(proj)}
                      className="w-full min-h-[54px] px-7 py-4 rounded-xl bg-foreground text-background font-mono text-base font-bold shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                    >
                      <span>View Full Project Case Study</span>
                      <ExploreArrowIcon />
                    </button>

                    <div className="flex items-center gap-3">
                      {proj.links.map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 min-h-[52px] flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-bg border border-border-custom hover:border-foreground/30 text-text-secondary hover:text-text-primary font-mono text-[15px] font-bold transition-colors"
                        >
                          {link.icon === "github" && <GithubIcon />}
                          {link.icon === "external" && <ExternalIcon />}
                          <span>{link.label}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ── DESKTOP FULL SHOWCASE (hidden lg:block) ─────────────────────── */}
        <div className="hidden lg:block">
          {/* ── 2. FEATURED PROJECT SYSTEM SHOWCASE: KRISHISAATHI ── */}
          <ScrollReveal>
          <div className="mb-16">
            <div className="group relative p-6 sm:p-8 lg:p-10 rounded-3xl bg-bg-surface border border-border-custom hover:border-foreground/25 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
              {/* Flagship Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border-custom/60 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-foreground/5 text-text-primary border border-border-custom font-mono text-[11px] font-bold tracking-wider uppercase">
                    FEATURED ENGINEERING SYSTEM
                  </span>
                  <span className="font-mono text-xs text-text-secondary">
                    {flagship.period}
                  </span>
                </div>
                {flagship.copyrightFiled && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 text-text-secondary font-mono text-xs border border-border-custom">
                    <ShieldIcon />
                    <span>
                      Copyright Registered · Diary No.{" "}
                      {flagship.copyrightFiled.diaryNumber}
                    </span>
                  </div>
                )}
              </div>

              {/* Grid: Hero Preview Image (Left 5) | High-Signal Metadata (Right 7) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                {/* Left 5 Columns (~15% reduced width): Hero Image Preview Hook */}
                <div className="lg:col-span-5">
                  <div
                    onClick={() => setSelectedProject(flagship)}
                    className="group/img relative aspect-[16/11] w-full rounded-2xl overflow-hidden border border-border-custom bg-black/40 shadow-xl cursor-pointer"
                  >
                    <Image
                      src="/images/projects/krishisaathi-homepage.png"
                      alt={`${flagship.title} Hero Preview`}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      className="object-cover group-hover/img:scale-[1.03] transition-transform duration-700"
                    />

                    {/* Hover Prompt */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-mono text-sm sm:text-[15px] font-bold shadow-xl transform group-hover/img:scale-[1.03] transition-transform">
                        <span>Explore Architecture</span>
                        <ExploreArrowIcon />
                      </span>
                    </div>

                    <div className="absolute inset-x-3 bottom-3 p-3 rounded-xl bg-bg-surface/95 backdrop-blur-md border border-border-custom flex items-center justify-between font-mono text-[11px] text-text-secondary">
                      <span>Hybrid Firestore + MongoDB</span>
                      <span className="text-text-primary font-bold">
                        Deep dive →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right 7 Columns: Spacious Scannable Overview & Differentiated Metrics */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-text-primary leading-tight">
                      {flagship.title}
                    </h3>
                    <p className="font-mono text-xs text-text-secondary uppercase tracking-wider mt-2 mb-6">
                      {flagship.subtitle}
                    </p>

                    {/* Differentiated Key Metrics Hierarchy */}
                    {flagship.metrics && flagship.metrics.length > 0 && (
                      <div className="space-y-4 mb-8">
                        {/* Primary Featured Impact Metric */}
                        <div className="px-5 py-4 sm:px-6 sm:py-5 rounded-2xl bg-accent/10 border-2 border-accent/40 flex items-center justify-between shadow-xs">
                          <div>
                            <div className="font-mono text-[11px] text-accent uppercase tracking-wider font-bold">
                              {flagship.metrics[0].label}
                            </div>
                            <div className="font-display font-black text-2xl sm:text-3xl text-text-primary mt-0.5">
                              {flagship.metrics[0].value}
                              {flagship.metrics[0].suffix}
                            </div>
                          </div>
                          <span className="font-mono text-[11px] text-accent font-semibold px-3 py-1 rounded-md bg-accent/15 hidden sm:inline">
                            PRIMARY IMPACT
                          </span>
                        </div>

                        {/* Secondary Supporting Metrics Grid */}
                        {flagship.metrics.length > 1 && (
                          <div className="grid grid-cols-2 gap-4 sm:gap-5">
                            {flagship.metrics.slice(1).map((metric) => (
                              <div
                                key={metric.label}
                                className="px-4 py-3.5 sm:px-5 sm:py-4 rounded-xl bg-bg/80 border border-border-custom text-left flex flex-col justify-between"
                              >
                                <div className="font-mono text-[10px] text-text-secondary uppercase tracking-wider line-clamp-1">
                                  {metric.label}
                                </div>
                                <div className="font-display font-bold text-lg sm:text-xl text-text-primary mt-1">
                                  {metric.value}
                                  {metric.suffix}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Applied Tech Stack as Regular Text */}
                    <div className="mb-8">
                      <h4 className="text-[11px] font-mono text-text-secondary uppercase tracking-wider mb-2">
                        Core Architecture & Stack
                      </h4>
                      <p className="font-mono text-xs sm:text-sm text-text-primary/90 leading-relaxed">
                        {flagship.techStack.join(" · ")}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons: Primary Engineering CTA */}
                  <div className="flex flex-wrap items-center gap-4 pt-5 border-t border-border-custom/60">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(flagship)}
                      aria-label={`Explore ${flagship.title} Platform Architecture and Technical Details`}
                      className="group/btn inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-foreground text-background hover:opacity-90 font-mono text-[15px] sm:text-base font-bold min-h-[52px] sm:min-h-[54px] shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-[#111318]"
                    >
                      <span>Explore Platform</span>
                      <span className="transform group-hover/btn:translate-x-1.5 transition-transform duration-300">
                        <ExploreArrowIcon />
                      </span>
                    </button>

                    {flagship.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-bg border border-border-custom hover:border-foreground/30 text-text-secondary hover:text-text-primary font-mono text-sm sm:text-[15px] font-bold min-h-[52px] sm:min-h-[54px] transition-colors"
                      >
                        {link.icon === "github" && <GithubIcon />}
                        {link.icon === "external" && <ExternalIcon />}
                        <span>{link.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── 3. SELECTED PROJECTS HEADER & DIVIDER ───────────────────────────── */}
        <ScrollReveal>
          <div className="pt-20 sm:pt-24 mt-16 border-t border-border-custom/80 mb-16">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-accent tracking-widest uppercase">
                  02
                </span>
                <span className="w-4 h-px bg-border-custom" />
                <span className="font-mono text-xs font-semibold text-text-secondary tracking-widest uppercase">
                  APPLIED AI &amp; HEALTHCARE ARCHITECTURE
                </span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-text-primary tracking-tight">
                Voice-Enabled Multilingual Healthcare Assistant
              </h3>
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed pt-1">
                Demonstrating applied artificial intelligence, natural language understanding, and voice-assisted RESTful architectures designed for 24/7 preliminary healthcare accessibility.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── ALTERNATING LAYOUT SHOWCASE: MEDTALK & SECONDARY PROJECTS ── */}
        <div className="space-y-20 lg:space-y-28">
          {secondaryProjects.map((project, index) => {
            // Alternate layout: even indices (0 -> MedTalk) have Content Left / Image Right!
            const isContentLeft = index % 2 === 0;

            return (
              <ScrollReveal key={project.id} delay={index * 0.1}>
                <article className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-bg-surface border border-border-custom hover:border-foreground/25 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  {/* Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border-custom/60 relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="px-3.5 py-1 rounded-full bg-foreground/5 text-text-primary border border-border-custom font-mono text-[11px] font-bold tracking-wider uppercase">
                        {project.id === "medtalk"
                          ? "APPLIED AI HEALTHCARE SYSTEM"
                          : "TECHNICAL SHOWCASE"}
                      </span>
                      <span className="font-mono text-xs text-text-secondary">
                        {project.period}
                      </span>
                    </div>
                  </div>

                  {/* Alternating Grid: Content Left (7 cols) / Image Right (5 cols) for MedTalk */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                    {/* Content Column (7 cols on left for MedTalk) */}
                    <div
                      className={`lg:col-span-7 flex flex-col justify-between ${
                        isContentLeft ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div>
                        <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-text-primary leading-tight">
                          {project.title}
                        </h3>
                        <p className="font-mono text-xs text-text-secondary uppercase tracking-wider mt-2 mb-6">
                          {project.subtitle}
                        </p>

                        {/* Differentiated Metrics for MedTalk */}
                        {project.metrics && project.metrics.length > 0 && (
                          <div className="mb-8">
                            <div className="p-4 sm:p-5 rounded-2xl bg-accent/10 border-2 border-accent/40 flex items-center justify-between shadow-xs max-w-md">
                              <div>
                                <div className="font-mono text-[11px] text-accent uppercase tracking-wider font-bold">
                                  {project.metrics[0].label}
                                </div>
                                <div className="font-display font-black text-2xl sm:text-3xl text-text-primary mt-0.5">
                                  {project.metrics[0].value}
                                  {project.metrics[0].suffix}
                                </div>
                              </div>
                              <span className="font-mono text-[11px] text-accent font-semibold px-3 py-1 rounded-md bg-accent/15 hidden sm:inline">
                                CONTINUOUS RUNTIME
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Applied Tech Stack */}
                        <div className="mb-8">
                          <h4 className="text-[11px] font-mono text-text-secondary uppercase tracking-wider mb-2">
                            Core Architecture &amp; Stack
                          </h4>
                          <p className="font-mono text-xs sm:text-sm text-text-primary/90 leading-relaxed">
                            {project.techStack.join(" · ")}
                          </p>
                        </div>
                      </div>

                      {/* Action CTA Button */}
                      <div className="flex flex-wrap items-center gap-3.5 pt-4 border-t border-border-custom/60">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          aria-label={`Explore ${project.title} Technical Overview and Features`}
                          className="group/btn inline-flex items-center gap-2.5 px-7 py-4 rounded-xl bg-foreground text-background hover:opacity-90 font-mono text-[15px] sm:text-base font-bold min-h-[52px] sm:min-h-[54px] shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-[#111318]"
                        >
                          <span>Explore AI Assistant</span>
                          <span className="transform group-hover/btn:translate-x-1.5 transition-transform duration-300">
                            <ExploreArrowIcon />
                          </span>
                        </button>

                        {project.links.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-bg border border-border-custom hover:border-foreground/30 text-text-secondary hover:text-text-primary font-mono text-sm sm:text-[15px] font-bold min-h-[52px] sm:min-h-[54px] transition-colors"
                          >
                            {link.icon === "github" && <GithubIcon />}
                            {link.icon === "external" && <ExternalIcon />}
                            <span>{link.label}</span>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Image Column (5 cols on right for MedTalk) */}
                    <div
                      className={`lg:col-span-5 ${
                        isContentLeft ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div
                        onClick={() => setSelectedProject(project)}
                        className="group/thumb relative aspect-[16/11] w-full rounded-2xl overflow-hidden border border-border-custom bg-black/40 shadow-xl cursor-pointer"
                      >
                        <Image
                          src={
                            project.image ||
                            (project.id === "medtalk"
                              ? "/images/projects/medtalk-aichatbot.png"
                              : "/images/projects/krishisaathi-homepage.png")
                          }
                          alt={`${project.title} Preview`}
                          fill
                          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                          className="object-cover group-hover/thumb:scale-[1.03] transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-mono text-sm sm:text-[15px] font-bold shadow-xl transform group-hover/thumb:scale-[1.03] transition-transform">
                            <span>Explore AI Assistant</span>
                            <ExploreArrowIcon />
                          </span>
                        </div>

                        <div className="absolute inset-x-3 bottom-3 p-3 rounded-xl bg-bg-surface/95 backdrop-blur-md border border-border-custom flex items-center justify-between font-mono text-[11px] text-text-secondary">
                          <span>Google Gemini API + Flask REST</span>
                          <span className="text-text-primary font-bold">
                            Deep dive →
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
        </div>
      </div>

      {/* ── TECHNICAL DEEP DIVE MODAL ──────────────────────────────── */}
      <CaseStudyModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
