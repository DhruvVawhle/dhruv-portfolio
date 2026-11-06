"use client";

import React, { useState } from "react";
import { Eye, ExternalLink, ArrowRight, Activity, Terminal } from "lucide-react";
import { ShowcaseProject } from "@/data/showcaseProjects";
import TechIcon from "@/components/ui/TechIcon";

const GithubIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

interface CoverRingCardProps {
  project: ShowcaseProject;
  isFront: boolean;
  angle: number;
  depthRatio: number;
  onSelect: () => void;
  onOpenDetail: () => void;
}

export default function CoverRingCard({
  project,
  isFront,
  depthRatio,
  onSelect,
  onOpenDetail,
}: CoverRingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.isGitHubCard) {
      window.open(project.githubUrl, "_blank", "noopener,noreferrer");
      return;
    }
    onSelect();
    onOpenDetail();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (project.isGitHubCard) {
        window.open(project.githubUrl, "_blank", "noopener,noreferrer");
      } else {
        onSelect();
        onOpenDetail();
      }
    }
  };

  const primaryMetric = project.metrics && project.metrics.length > 0 ? project.metrics[0] : null;

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${project.title}. Click to view architectural case study.`}
      aria-current={isFront ? "true" : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => isFront && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-[270px] xs:w-[305px] sm:w-[350px] md:w-[370px] h-[450px] xs:h-[475px] sm:h-[500px] select-none rounded-3xl cursor-pointer transition-shadow duration-300 focus:outline-none touch-manipulation active:scale-[0.99] ${
        isFront ? "focus-visible:ring-2 focus-visible:ring-accent" : ""
      }`}
    >
      <div
        className={`relative w-full h-full rounded-3xl bg-bg-surface border flex flex-col justify-between overflow-hidden transition-colors duration-200 ${
          isFront
            ? isHovered
              ? "border-accent shadow-xl shadow-accent/10"
              : "border-accent/40 shadow-md shadow-black/5 hover:border-accent"
            : "border-border-custom/80 shadow-xs hover:border-accent/30"
        }`}
      >
        {/* Animos Back-Fade Depth Overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-30 rounded-3xl bg-bg transition-opacity duration-200"
          style={{
            opacity: depthRatio * 0.65,
          }}
          aria-hidden="true"
        />

        {/* Ambient Top Glow Line */}
        <div
          className={`absolute top-0 inset-x-8 h-px bg-accent/30 transition-opacity duration-200 ${
            isFront ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        />

        {/* Front Hover Overlay with Quick Action Buttons */}
        {isFront && (
          <div
            className={`pointer-events-none absolute inset-0 z-40 rounded-3xl bg-neutral-950/60 transition-opacity duration-200 flex flex-col items-center justify-center p-6 text-center ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`flex flex-col items-center gap-3 transition-transform duration-200 motion-reduce:transform-none ${
                isHovered ? "scale-100 opacity-100" : "scale-95 opacity-0"
              }`}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (project.isGitHubCard) {
                    window.open(project.githubUrl, "_blank", "noopener,noreferrer");
                  } else {
                    onOpenDetail();
                  }
                }}
                className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-xs font-semibold shadow-lg shadow-accent/20 hover:bg-accent/90 cursor-pointer transition-colors active:scale-95 disabled:opacity-50"
              >
                <Eye className="w-4 h-4 text-white" />
                <span>{project.isGitHubCard ? "Open repository" : "Inspect architecture"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {!project.isGitHubCard && (
                <div className="pointer-events-auto flex items-center gap-2 mt-1">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium border border-white/15 transition-colors cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Live demo</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium border border-white/15 transition-colors cursor-pointer"
                    >
                      <GithubIcon className="w-3 h-3" />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Card Content Body */}
        <div className="relative z-10 flex flex-col h-full justify-between p-4 xs:p-5 sm:p-6">
          <div>
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent">
                {project.tag}
              </span>
              <span className="text-xs text-text-secondary font-medium">{project.status}</span>
            </div>

            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-text-primary tracking-tight leading-tight group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="mt-1 text-xs text-text-secondary line-clamp-2 leading-relaxed">
              {project.subtitle}
            </p>

            {/* Project Preview Image / Terminal Slot */}
            {!project.isGitHubCard ? (
              <div className="mt-2.5 sm:mt-3 relative w-full h-24 xs:h-28 sm:h-32 rounded-2xl border border-border-custom bg-bg/60 overflow-hidden flex items-center justify-center group">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.imageAlt || `${project.title} preview`}
                    loading={isFront ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={isFront ? "high" : "auto"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-3 text-center">
                    <Activity className="w-5 h-5 text-accent mb-1" />
                    <span className="text-[11px] text-accent font-medium">Architecture ready</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/70 via-transparent to-transparent pointer-events-none" />
              </div>
            ) : (
              <div className="mt-3 relative w-full h-28 sm:h-32 rounded-2xl border border-dashed border-accent/40 bg-accent/[0.04] p-4 flex flex-col justify-center items-center text-center">
                <div className="w-9 h-9 rounded-xl bg-accent/15 text-accent flex items-center justify-center mb-2">
                  <Terminal className="w-4 h-4" />
                </div>
                <span className="text-xs font-semibold text-text-primary">
                  GitHub Open Source
                </span>
                <span className="text-[11px] text-text-secondary mt-0.5">
                  Repositories, prototypes & microservices
                </span>
              </div>
            )}
          </div>

          {/* Metric Highlight */}
          {project.isGitHubCard ? (
            <div className="my-2 p-3 rounded-2xl bg-accent/5 border border-accent/15 text-center">
              <span className="text-xs text-accent font-medium flex items-center justify-center gap-1.5">
                <GithubIcon className="w-3.5 h-3.5" />
                <span>github.com/DhruvVawhle</span>
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          ) : (
            primaryMetric && (
              <div className="my-2 p-3 rounded-2xl bg-accent/[0.06] border border-accent/20">
                <span className="text-xs text-text-secondary block font-medium">{primaryMetric.label}</span>
                <div className="mt-0.5 font-display font-bold text-2xl text-accent">
                  {primaryMetric.value}{" "}
                  {primaryMetric.suffix && (
                    <span className="text-xs text-text-secondary font-normal">
                      {primaryMetric.suffix}
                    </span>
                  )}
                </div>
              </div>
            )
          )}

          {/* Tech Stack Chips & Action Link */}
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
                <span className="px-2 py-1 rounded-lg bg-bg border border-border-custom font-mono text-[11px] text-text-secondary font-medium">
                  +{project.stack.length - 4}
                </span>
              )}
            </div>

            <div className="pt-2.5 border-t border-border-custom/70 flex items-center justify-between text-xs">
              <span className="font-semibold text-accent flex items-center gap-1.5 transition-colors duration-150">
                <Eye className="w-3.5 h-3.5" />
                <span>
                  {project.isGitHubCard ? "Open GitHub repository" : "Inspect case study"}
                </span>
              </span>
              <span className="text-accent transition-transform duration-150 motion-safe:group-hover:translate-x-0.5">
                {project.isGitHubCard ? (
                  <ExternalLink className="w-3.5 h-3.5" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

