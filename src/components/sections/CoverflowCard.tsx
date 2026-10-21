"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { Eye, ExternalLink } from "lucide-react";
import { ShowcaseProject } from "@/data/showcaseProjects";
import TechIcon from "@/components/ui/TechIcon";

interface CardProps {
  project: ShowcaseProject;
  isFront: boolean;
  offset: number;
  onSelect: () => void;
  onOpenDetail: () => void;
}

export default function CoverflowCard({
  project,
  isFront,
  offset,
  onSelect,
  onOpenDetail,
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  // 3D Coverflow positioning math
  const absOffset = Math.abs(offset);
  const translateX = offset * 210;
  const translateZ = -absOffset * 150;
  const rotateYCover = offset * -28;
  const opacity = absOffset >= 2 ? Math.max(0.15, 1 - absOffset * 0.45) : 1;
  const zIndex = 50 - absOffset * 10;
  const pointerEvents = absOffset > 2 ? "none" : "auto";

  // Card click behavior
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFront) {
      if (project.isGitHubCard) {
        window.open(project.githubUrl, "_blank", "noopener,noreferrer");
      } else {
        onOpenDetail();
      }
    } else {
      onSelect();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (isFront && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      handleClick(e as any);
    }
  };

  const primaryMetric = project.metrics && project.metrics.length > 0 ? project.metrics[0] : null;

  return (
    <motion.div
      id={project.id}
      onMouseEnter={() => {
        if (isFront) setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isFront ? 0 : -1}
      role="button"
      aria-label={`${project.title}. ${isFront ? "Click to view project details." : "Click to bring to front."}`}
      animate={{
        x: translateX,
        z: translateZ,
        rotateY: rotateYCover,
        opacity: opacity,
        scale: isFront ? (isHovered && !reducedMotion ? 1.02 : 1) : 0.9,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 26,
      }}
      style={{
        zIndex,
        pointerEvents: pointerEvents as any,
        transformStyle: "preserve-3d",
      }}
      className={`absolute top-0 w-[300px] sm:w-[350px] md:w-[380px] h-[485px] sm:h-[505px] select-none rounded-3xl cursor-pointer focus:outline-none ${
        isFront ? "focus-visible:ring-2 focus-visible:ring-accent" : ""
      }`}
    >
      {/* Stable container for active card with smooth lift on hover */}
      <div
        className={`relative w-full h-full rounded-3xl bg-bg-surface border p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 overflow-hidden group ${
          isFront
            ? isHovered
              ? "border-accent ring-2 ring-accent/30 shadow-2xl"
              : "border-accent/40 shadow-xl hover:border-accent"
            : "border-border-custom hover:border-accent/40 shadow-md"
        }`}
      >
        {/* Full Card Blurry Showcase Hover Overlay (Zero Glitch, Pointer Events None) */}
        {isFront && (
          <div
            className={`pointer-events-none absolute inset-0 z-30 rounded-3xl bg-neutral-950/65 dark:bg-neutral-950/80 backdrop-blur-md transition-all duration-300 flex flex-col items-center justify-center p-6 text-center ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`flex flex-col items-center gap-2.5 transition-all duration-300 ${
                isHovered ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"
              }`}
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white font-sans text-sm font-bold shadow-xl shadow-accent/30 border border-white/20">
                <Eye className="w-4 h-4 text-white" />
                <span>{project.isGitHubCard ? "Open Repository" : "View Project Details"}</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </div>
              <span className="font-mono text-xs text-white/85 font-medium">
                Click anywhere to view full case study
              </span>
            </div>
          </div>
        )}

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Top Meta Bar */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-3.5">
              <span className="font-mono text-[11px] font-semibold px-2.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent">
                {project.tag}
              </span>
              <span className="font-mono text-[11px] text-text-secondary flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    project.status === "Live" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                  }`}
                />
                {project.status}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-text-primary tracking-tight leading-tight group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="mt-1 font-mono text-xs text-text-secondary line-clamp-2 leading-relaxed">
              {project.subtitle}
            </p>

            {/* Project Image Preview Slot */}
            {!project.isGitHubCard && (
              <div className="mt-3 relative w-full h-28 sm:h-32 rounded-xl border border-border-custom bg-bg/50 overflow-hidden flex items-center justify-center">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.imageAlt || `${project.title} – ${project.subtitle}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-3 text-center">
                    <span className="font-mono text-[10px] text-accent">Architecture Slot</span>
                    <span className="font-mono text-[9px] text-text-secondary mt-0.5">Asset ready</span>
                  </div>
                )}
                
                {/* Subtle bottom shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/80 via-transparent to-transparent pointer-events-none" />
              </div>
            )}
          </div>

          {/* Center: Primary Blue Metric Box or GitHub Prompt */}
          {project.isGitHubCard ? (
            <div className="my-auto p-4 rounded-2xl bg-accent/5 border border-accent/20 text-center">
              <p className="font-mono text-xs text-text-secondary leading-relaxed">
                Explore open-source repositories, experiments, and research prototypes.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-text-primary text-bg font-mono text-xs font-semibold shadow-xs">
                <span>View All Repositories ↗</span>
              </div>
            </div>
          ) : (
            primaryMetric && (
              <div className="my-3 p-3.5 rounded-2xl bg-accent/5 border border-accent/20">
                <span className="font-mono text-[10px] uppercase tracking-wider text-text-secondary block">
                  {primaryMetric.label}
                </span>
                <div className="mt-0.5 font-display font-black text-2xl text-accent">
                  {primaryMetric.value}{" "}
                  {primaryMetric.suffix && (
                    <span className="text-xs font-mono font-medium text-text-secondary">
                      {primaryMetric.suffix}
                    </span>
                  )}
                </div>
              </div>
            )
          )}

          {/* Bottom: Stack Chips & Clean Action Link */}
          <div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-bg border border-border-custom font-mono text-[11px] text-text-secondary"
                >
                  <TechIcon name={tech} size="sm" />
                  <span>{tech}</span>
                </span>
              ))}
              {project.stack.length > 4 && (
                <span className="px-2 py-1 rounded-lg bg-bg border border-border-custom font-mono text-[11px] text-text-secondary">
                  +{project.stack.length - 4}
                </span>
              )}
            </div>

            {/* Bottom Meta & Action Prompt */}
            <div className="pt-3 border-t border-border-custom/60 flex items-center justify-between font-mono text-xs text-text-secondary">
              <span className="group-hover:text-accent font-medium transition-colors">
                {isFront ? (project.isGitHubCard ? "Open GitHub Repository" : "View Project Case Study") : "Click to bring forward"}
              </span>
              <span className="text-accent transform group-hover:translate-x-1.5 transition-transform duration-200">
                {project.isGitHubCard ? "↗" : "→"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
