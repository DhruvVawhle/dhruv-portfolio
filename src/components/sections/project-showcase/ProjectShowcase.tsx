"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Eye,
  ExternalLink,
  FolderOpen,
  Terminal,
} from "lucide-react";
import type { ShowcaseProject } from "@/data/showcaseProjects";
import TechIcon from "@/components/ui/TechIcon";
import { getTechWebsite } from "@/lib/techUrls";
import {
  FILTER_CHIPS,
  type FilterChip,
  type ProjectShowcaseProps,
} from "./types";
import { filterShowcaseProjects, getGitHubArchiveCard } from "./data";
import { useIsDesktopStage, usePointerTilt } from "./hooks";

const GithubIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

interface ProjectFolderCardProps {
  project: ShowcaseProject;
  index: number;
  isActive: boolean;
  onSelectCard?: () => void;
  onOpenDetail: (project: ShowcaseProject) => void;
  shouldReduceMotion: boolean;
}

/**
 * 3-layer physical folder card:
 * 1. Back panel + stepped folder tab
 * 2. Inner project image sheet that rises out of the pocket when active/hovered
 * 3. Frosted front pocket that hinges forward to reveal the project preview & info
 */
function ProjectFolderCard({
  project,
  index,
  isActive,
  onSelectCard,
  onOpenDetail,
  shouldReduceMotion,
}: ProjectFolderCardProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [isWideImage, setIsWideImage] = useState(false);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const { cardRef, handlePointerMove, handlePointerLeave } = usePointerTilt(
    shouldReduceMotion || !isActive
  );

  const primaryMetric = project.metrics?.[0] ?? null;
  // Active card opens slightly so image + info stay visible; hover opens further
  const isSlightlyOpen = isActive || isCardHovered;

  return (
    <div
      className="w-full transition-transform duration-200 ease-out hover:-translate-y-0.5"
      onMouseEnter={() => setIsCardHovered(true)}
      onMouseLeave={() => setIsCardHovered(false)}
    >
      <article
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={!isActive && onSelectCard ? onSelectCard : undefined}
        aria-label={`${project.title} project folder`}
        style={{
          transform: shouldReduceMotion
            ? undefined
            : "perspective(1100px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
          transition: shouldReduceMotion
            ? undefined
            : "transform var(--tilt-ease, 200ms) cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className={`group relative w-full pt-8 select-none will-change-transform ${
          !isActive ? "cursor-pointer" : ""
        }`}
      >
        {/* LAYER 1: Folder Top Tab + Back Panel */}
        <div
          className={`absolute top-0 left-4 h-9 px-4 rounded-t-2xl border border-b-0 flex items-center gap-2 z-0 transition-colors duration-200 ${
            isActive
              ? "bg-bg-surface border-accent/55 text-accent"
              : "bg-bg-surface/90 border-border-custom text-text-secondary group-hover:border-accent/40"
          }`}
        >
          <FolderOpen className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="font-mono text-[11px] font-semibold">
            {String(index + 1).padStart(2, "0")} · {project.title}
          </span>
        </div>

        <div
          className={`relative rounded-3xl rounded-tl-none border bg-bg-surface/95 shadow-2xl transition-[border-color,box-shadow] duration-200 ${
            isActive
              ? "border-accent/50 shadow-accent/10"
              : "border-border-custom/90 group-hover:border-accent/40"
          }`}
        >
          {/* Pointer-tracked specular highlight */}
          {!shouldReduceMotion && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-30 rounded-3xl rounded-tl-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(460px circle at var(--mx, 50%) var(--my, 50%), rgba(59, 130, 246, 0.14), transparent 65%)",
              }}
            />
          )}

          {/* Folder Interior Pocket Shadow */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-28 rounded-tr-3xl bg-gradient-to-b from-black/15 dark:from-black/45 to-transparent pointer-events-none z-0"
          />

          {/* LAYER 2: Inner Project Image Sheet (Rises out of folder when active / hovered) */}
          <div className="relative z-10 px-3 sm:px-4 pt-3">
            <div
              style={{
                transform: shouldReduceMotion
                  ? undefined
                  : isCardHovered && isActive
                    ? "translate3d(0, -18px, 16px) scale(1.018)"
                    : isSlightlyOpen
                      ? "translate3d(0, -8px, 8px)"
                      : "translate3d(0, 6px, 0px) scale(0.97)",
                transition: "transform 420ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-border-custom bg-bg shadow-lg will-change-transform"
            >
              {project.image && failedSrc !== project.image ? (
                <div className="absolute inset-0 transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.03] will-change-transform">
                  <Image
                    src={project.image}
                    alt={project.imageAlt || `${project.title} interface preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 560px"
                    quality={75}
                    loading="lazy"
                    decoding="async"
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      if (img.naturalWidth && img.naturalHeight) {
                        setIsWideImage(img.naturalWidth / img.naturalHeight > 2.2);
                      }
                    }}
                    onError={() => setFailedSrc(project.image)}
                    className={
                      isWideImage ? "object-contain p-3 bg-[#0c0e13]" : "object-cover object-top"
                    }
                  />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                  <Activity className="w-7 h-7 text-accent mb-2" />
                  <span className="text-xs font-medium text-text-secondary">
                    {project.title} architecture
                  </span>
                </div>
              )}

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent"
              />

              {/* Top Badges on Sheet */}
              <div className="absolute top-3 inset-x-3 z-10 flex items-center justify-between gap-2">
                <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-bg-surface/90 backdrop-blur-md border border-border-custom text-text-primary">
                  {project.tag}
                </span>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-bg-surface/90 backdrop-blur-md border border-border-custom text-accent">
                  {project.status}
                </span>
              </div>

              {/* Floating Metric Pill on Sheet */}
              {primaryMetric && (
                <div className="absolute bottom-3 left-3 z-10 px-3 py-1.5 rounded-xl bg-bg-surface/90 backdrop-blur-md border border-border-custom/90">
                  <span className="text-[11px] text-text-secondary mr-1.5">
                    {primaryMetric.label}:
                  </span>
                  <span className="font-display font-bold text-sm text-accent">
                    {primaryMetric.value}
                  </span>
                  {primaryMetric.suffix && (
                    <span className="text-[11px] text-text-secondary ml-1">
                      {primaryMetric.suffix}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* LAYER 3: Frosted Front Folder Pocket (Leans forward on bottom hinge when open/hovered) */}
          <div
            style={{
              transformOrigin: "bottom center",
              transform: shouldReduceMotion
                ? undefined
                : isCardHovered && isActive
                  ? "perspective(900px) rotateX(-14deg)"
                  : isSlightlyOpen
                    ? "perspective(900px) rotateX(-7deg)"
                    : "perspective(900px) rotateX(0deg)",
              transition: "transform 420ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="relative z-20 -mt-5 rounded-3xl border-t border-border-custom bg-bg-surface/92 backdrop-blur-xl p-4 sm:p-5 shadow-[0_-8px_24px_rgba(0,0,0,0.18)] flex items-center justify-between gap-3 will-change-transform"
          >
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-display font-bold text-lg sm:text-xl text-text-primary truncate group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </h3>
              </div>
              <p className="text-xs text-text-secondary truncate mt-0.5">
                {project.subtitle}
              </p>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenDetail(project);
              }}
              aria-label={`Open ${project.title} overview`}
              className="flex-shrink-0 inline-flex items-center gap-1.5 min-h-[40px] px-4 py-2 rounded-full bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-[background-color,transform] duration-150 cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Overview</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}

interface ScrollDeckItemProps {
  project: ShowcaseProject;
  index: number;
  total: number;
  smoothProgress: MotionValue<number>;
  isStackHovered: boolean;
  isActive: boolean;
  onSelectCard: () => void;
  onOpenDetail: (project: ShowcaseProject) => void;
  shouldReduceMotion: boolean;
}

function ScrollDeckItem({
  project,
  index,
  total,
  smoothProgress,
  isStackHovered,
  isActive,
  onSelectCard,
  onOpenDetail,
  shouldReduceMotion,
}: ScrollDeckItemProps) {
  const denom = Math.max(1, total - 1);
  const spreadFactor = isStackHovered ? 1.38 : 1;

  // Continuous queue offset: 0 = front open folder, +1 = 1st queued folder behind, -1 = scrolled past
  const queueOffset = useTransform(smoothProgress, (p) => index - p * denom);

  const y = useTransform(queueOffset, (offset) => {
    if (offset < 0) return offset * -68;
    return Math.min(offset, 4) * -32 * spreadFactor;
  });

  const x = useTransform(queueOffset, (offset) => {
    if (offset < 0) return 0;
    return Math.min(offset, 4) * 18 * spreadFactor;
  });

  const scale = useTransform(queueOffset, (offset) => {
    if (offset < 0) return Math.min(1.05, 1 + Math.abs(offset) * 0.04);
    return Math.max(0.76, 1 - offset * 0.055);
  });

  const opacity = useTransform(queueOffset, (offset) => {
    if (offset <= -0.65) return 0;
    if (offset < 0) return Math.max(0, 1 + offset * 1.5);
    if (offset > 3.6) return 0;
    return Math.max(0.22, 1 - offset * 0.22);
  });

  const rotateX = useTransform(queueOffset, (offset) => {
    if (offset < 0) return Math.max(-6, offset * 6);
    return Math.min(4, offset * 1.1);
  });

  const zIndex = Math.max(1, total * 10 - index * 10);

  if (total === 1) {
    return (
      <div className="relative w-full">
        <ProjectFolderCard
          project={project}
          index={index}
          isActive
          onOpenDetail={onOpenDetail}
          shouldReduceMotion={shouldReduceMotion}
        />
      </div>
    );
  }

  return (
    <motion.div
      style={{
        y,
        x,
        scale,
        opacity,
        rotateX,
        transformPerspective: 1200,
        zIndex: isActive ? total * 10 + 10 : zIndex,
      }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 flex items-center justify-center will-change-transform"
    >
      <ProjectFolderCard
        project={project}
        index={index}
        isActive={isActive}
        onSelectCard={onSelectCard}
        onOpenDetail={onOpenDetail}
        shouldReduceMotion={shouldReduceMotion}
      />
    </motion.div>
  );
}

interface CinematicScrollStageProps {
  projects: ShowcaseProject[];
  onOpenDetail: (project: ShowcaseProject) => void;
  shouldReduceMotion: boolean;
}

function CinematicScrollStage({
  projects,
  onOpenDetail,
  shouldReduceMotion,
}: CinematicScrollStageProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isStackHovered, setIsStackHovered] = useState(false);

  const total = projects.length;
  const safeIndex = Math.min(activeIndex, Math.max(0, total - 1));
  const activeProject = projects[safeIndex];

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    mass: 0.45,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (total <= 1) return;
    const nextIdx = Math.min(
      total - 1,
      Math.max(0, Math.round(latest * (total - 1)))
    );
    if (nextIdx !== activeIndex) {
      setActiveIndex(nextIdx);
    }
  });

  const scrollToChapter = (idx: number) => {
    const track = trackRef.current;
    if (!track || total <= 1) return;
    const rect = track.getBoundingClientRect();
    const trackTop = window.scrollY + rect.top;
    const scrollableDistance = track.offsetHeight - window.innerHeight;
    if (scrollableDistance <= 0) return;

    const targetY = trackTop + (idx / (total - 1)) * scrollableDistance;
    if (window.__lenis) {
      window.__lenis.scrollTo(targetY, { duration: 0.9 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  };

  if (!activeProject) return null;

  const trackHeight = total > 1 ? `${total * 72}vh` : "auto";

  return (
    <div
      ref={trackRef}
      style={{ minHeight: trackHeight }}
      className="relative w-full"
    >
      <div
        className={`${
          total > 1 ? "sticky top-20 min-h-[calc(100vh-6rem)]" : "py-4"
        } flex flex-col justify-center`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 items-center">
          {/* Left Column: Active Project Dossier & Overview Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-4 font-mono text-xs text-text-secondary">
                <span>
                  Folder{" "}
                  <strong className="text-text-primary font-semibold">
                    {String(safeIndex + 1).padStart(2, "0")}
                  </strong>{" "}
                  / {String(total).padStart(2, "0")}
                </span>
                <span className="text-accent font-medium">{activeProject.status}</span>
              </div>

              {total > 1 && (
                <div className="h-0.5 w-full bg-border-custom/70 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-accent origin-left"
                    style={{ scaleX: smoothProgress }}
                  />
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <div>
                  <span className="inline-block text-xs font-medium text-accent mb-1.5">
                    {activeProject.tag}
                  </span>
                  <h3 className="font-display font-bold text-2xl xl:text-3xl text-text-primary tracking-tight leading-tight">
                    {activeProject.title}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                    {activeProject.subtitle}
                  </p>
                </div>

                {activeProject.metrics.length > 0 && (
                  <div className="grid grid-cols-2 gap-2.5 pt-1">
                    {activeProject.metrics.slice(0, 2).map((metric) => (
                      <div
                        key={metric.label}
                        className="p-3 rounded-2xl bg-bg-surface border border-border-custom"
                      >
                        <span className="text-[11px] text-text-secondary block">
                          {metric.label}
                        </span>
                        <div className="mt-0.5 font-display font-bold text-lg text-accent">
                          {metric.value}
                          {metric.suffix && (
                            <span className="text-[11px] font-normal text-text-secondary ml-1">
                              {metric.suffix}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeProject.stack.slice(0, 5).map((tech) => (
                    <a
                      key={tech}
                      href={getTechWebsite(tech)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Visit official ${tech} website`}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-bg-surface hover:bg-accent/10 border border-border-custom hover:border-accent/40 font-mono text-[11px] text-text-secondary hover:text-accent transition-[color,background-color,border-color,transform] duration-150 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <TechIcon name={tech} size="sm" />
                      <span>{tech}</span>
                    </a>
                  ))}
                  {activeProject.stack.length > 5 && (
                    <span className="px-2.5 py-1 rounded-lg bg-bg-surface border border-border-custom font-mono text-[11px] text-text-secondary">
                      +{activeProject.stack.length - 5}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenDetail(activeProject)}
                    className="min-h-[44px] px-5 py-2.5 rounded-full bg-accent text-white text-xs font-semibold inline-flex items-center gap-2 hover:bg-accent/90 transition-[background-color,transform] duration-150 cursor-pointer active:scale-95 focus-visible:outline-2 focus-visible:outline-accent"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Open overview</span>
                  </button>

                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] px-4 py-2.5 rounded-full bg-bg-surface border border-border-custom hover:border-accent text-text-primary hover:text-accent text-xs font-medium inline-flex items-center gap-1.5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Live demo</span>
                    </a>
                  )}

                  {activeProject.githubUrl && (
                    <a
                      href={activeProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="min-h-[44px] px-4 py-2.5 rounded-full bg-bg-surface border border-border-custom hover:border-accent text-text-primary hover:text-accent text-xs font-medium inline-flex items-center gap-1.5 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Source</span>
                    </a>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {total > 1 && (
              <nav
                aria-label="Project folders"
                className="flex flex-wrap items-center gap-1.5 pt-3 border-t border-border-custom/60"
              >
                {projects.map((proj, idx) => {
                  const isCurrent = idx === safeIndex;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => scrollToChapter(idx)}
                      aria-current={isCurrent ? "true" : undefined}
                      className={`min-h-[34px] px-3 py-1 rounded-full text-xs font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent ${
                        isCurrent
                          ? "bg-accent/15 text-blue-700 dark:text-accent border border-accent/40 font-semibold"
                          : "bg-bg-surface text-text-secondary border border-border-custom hover:text-text-primary hover:border-accent/30"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")} · {proj.title}
                    </button>
                  );
                })}
              </nav>
            )}
          </div>

          {/* Right Column: Cinematic Queued Folder Stack (Slightly Open + Hover Fan-Out) */}
          <div
            onMouseEnter={() => setIsStackHovered(true)}
            onMouseLeave={() => setIsStackHovered(false)}
            className="lg:col-span-7 relative min-h-[510px] xl:min-h-[550px] flex items-center justify-center pr-6 sm:pr-10 pt-14"
          >
            {projects.map((project, idx) => (
              <ScrollDeckItem
                key={project.id}
                project={project}
                index={idx}
                total={total}
                smoothProgress={smoothProgress}
                isStackHovered={isStackHovered}
                isActive={idx === safeIndex}
                onSelectCard={() => scrollToChapter(idx)}
                onOpenDetail={onOpenDetail}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileScrollFolderItem({
  project,
  index,
  onOpenDetail,
  shouldReduceMotion,
}: {
  project: ShowcaseProject;
  index: number;
  onOpenDetail: (project: ShowcaseProject) => void;
  shouldReduceMotion: boolean;
}) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [isInFocus, setIsInFocus] = useState(index === 0);

  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 92%", "center 55%"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 26,
    mass: 0.4,
  });
  const y = useTransform(smoothScroll, [0, 1], [20, 0]);
  const scale = useTransform(smoothScroll, [0, 1], [0.95, 1]);
  const opacity = useTransform(smoothScroll, [0, 0.45, 1], [0.4, 0.9, 1]);

  useMotionValueEvent(smoothScroll, "change", (latest) => {
    const active = latest >= 0.45;
    if (active !== isInFocus) setIsInFocus(active);
  });

  return (
    <motion.div
      ref={itemRef}
      style={shouldReduceMotion ? undefined : { y, scale, opacity }}
      className="will-change-transform"
    >
      <ProjectFolderCard
        project={project}
        index={index}
        isActive={shouldReduceMotion || isInFocus}
        onOpenDetail={onOpenDetail}
        shouldReduceMotion={shouldReduceMotion}
      />
    </motion.div>
  );
}

export default function ProjectShowcase({
  projects,
  onOpenDetail,
}: ProjectShowcaseProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const isDesktop = useIsDesktopStage();
  const [activeFilter, setActiveFilter] = useState<FilterChip>("All");

  // Preload all project images once so scrolling & filtering never flicker or reload
  useEffect(() => {
    if (typeof window === "undefined") return;
    projects.forEach((p) => {
      if (p.image) {
        const preloader = new window.Image();
        preloader.decoding = "async";
        preloader.src = p.image;
      }
    });
  }, [projects]);

  const filterCounts = useMemo(() => {
    const counts = {} as Record<FilterChip, number>;
    for (const chip of FILTER_CHIPS) {
      counts[chip] = filterShowcaseProjects(projects, chip).length;
    }
    return counts;
  }, [projects]);

  const filteredProjects = useMemo(
    () => filterShowcaseProjects(projects, activeFilter),
    [projects, activeFilter]
  );

  const githubArchive = useMemo(
    () => getGitHubArchiveCard(projects),
    [projects]
  );

  const useCinematicStage = isDesktop && !shouldReduceMotion;

  return (
    <div className="space-y-8">
      {/* Filter Chips with Sliding Spring Indicator */}
      <div
        role="group"
        aria-label="Filter projects by category"
        className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto pb-2.5 scrollbar-none py-1 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {FILTER_CHIPS.map((chip) => {
          const isActive = activeFilter === chip;
          return (
            <button
              key={chip}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActiveFilter(chip)}
              className={`relative min-h-[44px] h-11 px-4 sm:px-5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-[color,border-color,transform] duration-150 border cursor-pointer inline-flex items-center justify-center gap-2 flex-shrink-0 touch-manipulation z-10 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-accent active:scale-[0.98] ${
                isActive
                  ? "text-white border-transparent font-semibold"
                  : "bg-bg-surface border-border-custom text-text-secondary hover:text-text-primary hover:border-accent/45"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="project-filter-active-pill"
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 420, damping: 30 }
                  }
                  className="absolute inset-0 rounded-full bg-accent -z-10 shadow-sm"
                />
              )}
              <span>{chip}</span>
              <span
                className={`font-mono text-[11px] px-1.5 py-0.5 rounded-full transition-colors ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-bg text-text-secondary border border-border-custom/70"
                }`}
              >
                {filterCounts[chip]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Showcase Body */}
      {filteredProjects.length === 0 ? (
        <div className="w-full py-16 text-center rounded-3xl border border-border-custom bg-bg-surface/60">
          <p className="text-sm text-text-secondary">
            No projects match this filter yet.
          </p>
        </div>
      ) : useCinematicStage ? (
        <CinematicScrollStage
          key={activeFilter}
          projects={filteredProjects}
          onOpenDetail={onOpenDetail}
          shouldReduceMotion={shouldReduceMotion}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <MobileScrollFolderItem
              key={project.id}
              project={project}
              index={idx}
              onOpenDetail={onOpenDetail}
              shouldReduceMotion={shouldReduceMotion}
            />
          ))}
        </div>
      )}

      {/* Compact GitHub Archive Band */}
      {githubArchive && (
        <div className="pt-4">
          <a
            href={githubArchive.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl border border-border-custom bg-bg-surface/80 hover:border-accent/60 hover:-translate-y-0.5 transition-[transform,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-accent"
          >
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-accent/10 border border-accent/20 text-accent flex items-center justify-center flex-shrink-0">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-base sm:text-lg text-text-primary group-hover:text-accent transition-colors">
                  {githubArchive.title}
                </h3>
                <p className="text-xs sm:text-sm text-text-secondary">
                  {githubArchive.subtitle}
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 text-xs font-semibold text-accent flex-shrink-0">
              <GithubIcon className="w-4 h-4" />
              <span>github.com/DhruvVawhle</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
