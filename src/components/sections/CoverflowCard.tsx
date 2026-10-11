"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  // 3D Tilt & Glare mouse interaction for the active front card
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);
  const glareOpacity = useMotionValue(0);

  const springTiltX = useSpring(rotateX, { stiffness: 260, damping: 20 });
  const springTiltY = useSpring(rotateY, { stiffness: 260, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isFront || reducedMotion) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;

    rotateX.set(tiltX);
    rotateY.set(tiltY);

    glareX.set((x / rect.width) * 100);
    glareY.set((y / rect.height) * 100);
    glareOpacity.set(0.35);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  };

  // 3D Coverflow positioning math
  const absOffset = Math.abs(offset);
  const translateX = offset * 210;
  const translateZ = -absOffset * 150;
  const rotateYCover = offset * -28;
  const opacity = absOffset >= 2 ? Math.max(0.15, 1 - absOffset * 0.45) : 1;
  const zIndex = 50 - absOffset * 10;
  const pointerEvents = absOffset > 2 ? "none" : "auto";

  // Card click behavior
  const handleClick = () => {
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
      handleClick();
    }
  };

  const primaryMetric = project.metrics && project.metrics.length > 0 ? project.metrics[0] : null;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={isFront ? 0 : -1}
      role="button"
      aria-label={`${project.title}. ${isFront ? "Click or press Enter to view details." : "Click to bring to front."}`}
      animate={{
        x: translateX,
        z: translateZ,
        rotateY: rotateYCover,
        opacity: opacity,
        scale: isFront ? 1 : 0.9,
      }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 24,
      }}
      style={{
        zIndex,
        pointerEvents: pointerEvents as any,
        transformStyle: "preserve-3d",
      }}
      className={`absolute top-0 w-[300px] sm:w-[350px] md:w-[380px] h-[460px] sm:h-[480px] select-none rounded-3xl cursor-pointer focus:outline-none ${
        isFront ? "focus-visible:ring-2 focus-visible:ring-accent" : ""
      }`}
    >
      {/* Tilt container for active card */}
      <motion.div
        style={{
          rotateX: isFront && !reducedMotion ? springTiltX : 0,
          rotateY: isFront && !reducedMotion ? springTiltY : 0,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full rounded-3xl bg-bg-surface border border-border-custom p-6 sm:p-7 flex flex-col justify-between shadow-xl transition-shadow duration-300 overflow-hidden group"
      >
        {/* Magic UI-style animated border beam for front card */}
        {isFront && !reducedMotion && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-[1px] rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 border-2 border-accent/40 rounded-3xl" />
            <div className="border-beam-line absolute -inset-[100%] rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,#3b82f6_360deg)] opacity-70 animate-[spin_4s_linear_infinite]" />
            <div className="absolute inset-[1.5px] rounded-3xl bg-bg-surface" />
          </div>
        )}

        {/* Aceternity glare overlay on front card */}
        {isFront && !reducedMotion && (
          <motion.div
            style={{
              opacity: glareOpacity,
              background: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18) 0%, transparent 65%)`,
            }}
            className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-200"
          />
        )}

        {/* Content Container */}
        <div className="relative z-10 flex flex-col h-full justify-between">
          {/* Top Meta Bar */}
          <div>
            <div className="flex items-center justify-between gap-2 mb-4">
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
              <div className="mt-3 relative w-full h-32 rounded-xl border border-border-custom bg-bg/50 overflow-hidden flex items-center justify-center">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      // Fallback gracefully if image is a TODO slot
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-3 text-center">
                    <span className="font-mono text-[10px] text-accent">Architecture Slot</span>
                    <span className="font-mono text-[9px] text-text-secondary mt-0.5">Asset ready</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/80 via-transparent to-transparent pointer-events-none" />
              </div>
            )}
          </div>

          {/* Center: Primary Blue Metric Box or GitHub Prompt */}
          {project.isGitHubCard ? (
            <div className="my-auto p-4 rounded-2xl bg-accent/5 border border-accent/20 text-center">
              <p className="font-mono text-xs text-text-secondary leading-relaxed">
                The rest of my work lives on my GitHub profile.
              </p>
              <div className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-text-primary text-bg font-mono text-xs font-semibold shadow-xs">
                <span>View All Repositories ↗</span>
              </div>
            </div>
          ) : (
            primaryMetric && (
              <div className="my-4 p-4 rounded-2xl bg-accent/5 border border-accent/20">
                <span className="font-mono text-[11px] uppercase tracking-wider text-text-secondary block">
                  {primaryMetric.label}
                </span>
                <div className="mt-1 font-display font-black text-2xl sm:text-3xl text-accent">
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

          {/* Bottom: Stack Chips & CTA prompt */}
          <div>
            <div className="flex flex-wrap gap-1.5 mb-4">
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

            <div className="pt-3 border-t border-border-custom/60 flex items-center justify-between font-mono text-xs text-text-secondary">
              <span>{isFront ? (project.isGitHubCard ? "Click to open GitHub ↗" : "Click to view case study") : "Click to bring forward"}</span>
              <span className="text-accent">→</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
