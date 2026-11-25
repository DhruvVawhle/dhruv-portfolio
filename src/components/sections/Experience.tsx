"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { ZoomIn, Award } from "lucide-react";
import { EXPERIENCES_DATA, ExperienceItem } from "@/data/experienceAndCompetitions";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { usePointerTilt } from "@/components/sections/project-showcase/hooks";

const PreviewDialog = dynamic(() => import("@/components/ui/PreviewDialog"), {
  ssr: false,
});

interface ExperienceRoleCardProps {
  exp: ExperienceItem;
  index: number;
  isEven: boolean;
  isLit: boolean;
  shouldReduceMotion: boolean;
  onOpenPreview: (item: ExperienceItem) => void;
}

function ExperienceRoleCard({
  exp,
  index,
  isEven,
  isLit,
  shouldReduceMotion,
  onOpenPreview,
}: ExperienceRoleCardProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { cardRef, handlePointerMove, handlePointerLeave } =
    usePointerTilt(shouldReduceMotion);

  return (
    <div className="relative flex flex-col sm:flex-row items-start">
      {/* Timeline Date Column on Desktop */}
      <div
        className={`hidden sm:block sm:w-1/2 pt-2 ${
          isEven ? "sm:pr-12 text-right" : "sm:pl-12 text-left"
        }`}
      >
        <ScrollReveal
          direction={isEven ? "right" : "left"}
          distance={18}
          delay={0.04}
        >
          <div className="inline-flex flex-col items-end gap-1.5">
            <span
              className={`font-mono text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-colors duration-200 ${
                isLit
                  ? "bg-accent/15 border-accent/40 text-accent"
                  : "bg-bg-surface border-border-custom text-text-secondary"
              }`}
            >
              {exp.period}
            </span>
            {exp.status === "Certificate pending" && (
              <span className="font-mono text-xs text-amber-500 font-medium">
                Certificate pending
              </span>
            )}
          </div>
        </ScrollReveal>
      </div>

      {/* Middle Timeline Node */}
      <div
        aria-hidden="true"
        className={`absolute left-2.5 sm:left-1/2 -translate-x-1/2 top-4 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 transition-[background-color,border-color,box-shadow,transform] duration-300 z-10 shadow-sm ${
          isLit
            ? "bg-accent border-white ring-4 ring-accent/20 text-white scale-110"
            : "bg-bg-surface border-border-custom text-text-secondary scale-100"
        }`}
      >
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current" />
      </div>

      {/* Card Column */}
      <div
        className={`pl-8 sm:pl-0 w-full sm:w-1/2 ${
          isEven ? "sm:pl-12" : "sm:order-first sm:pr-12"
        }`}
      >
        <ScrollReveal
          direction={isEven ? "left" : "right"}
          distance={24}
          delay={Math.min(index * 0.05, 0.15)}
        >
          {/* Mobile Date Pill */}
          <div className="sm:hidden mb-2.5 flex flex-wrap items-center gap-2">
            <span
              className={`font-mono text-xs font-semibold px-3 py-1 rounded-full border transition-colors duration-200 ${
                isLit
                  ? "bg-accent/15 border-accent/40 text-accent"
                  : "bg-bg-surface border-border-custom text-text-secondary"
              }`}
            >
              {exp.period}
            </span>
          </div>

          {/* Outer Hover Lift Wrapper */}
          <div className="transition-transform duration-200 ease-out hover:-translate-y-0.5">
            <article
              ref={cardRef}
              onPointerMove={handlePointerMove}
              onPointerLeave={handlePointerLeave}
              style={{
                transform: shouldReduceMotion
                  ? undefined
                  : "perspective(1100px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
                transition: shouldReduceMotion
                  ? undefined
                  : "transform var(--tilt-ease, 200ms) cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease, box-shadow 200ms ease",
              }}
              className="group relative p-5 sm:p-7 rounded-3xl bg-bg-surface border border-border-custom hover:border-accent/55 shadow-sm hover:shadow-xl hover:shadow-accent/10 overflow-hidden will-change-transform"
            >
              {/* Pointer-tracked specular sheen */}
              {!shouldReduceMotion && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(59, 130, 246, 0.11), transparent 65%)",
                  }}
                />
              )}

              <div className="relative z-20">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-semibold text-accent">
                    {exp.company}
                  </span>
                  <span className="text-[11px] font-mono text-text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary mb-4 leading-snug group-hover:text-accent transition-colors duration-200">
                  {exp.role}
                </h3>

                <ul className="space-y-2.5 mb-6 text-sm text-text-secondary leading-relaxed">
                  {exp.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="text-accent font-bold mt-0.5" aria-hidden="true">
                        •
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* Credential Preview */}
                {exp.credential ? (
                  <div className="pt-4 border-t border-border-custom/80">
                    {exp.credential.image && !imgFailed ? (
                      <button
                        type="button"
                        onClick={() => onOpenPreview(exp)}
                        aria-label={`View ${exp.credential.title}`}
                        className="group/thumb relative w-full aspect-[16/9] max-h-52 rounded-2xl border border-border-custom bg-bg overflow-hidden cursor-pointer hover:border-accent/60 transition-[border-color,box-shadow] duration-200 shadow-xs text-left focus-visible:outline-2 focus-visible:outline-accent block"
                      >
                        {!imgLoaded && (
                          <div
                            aria-hidden="true"
                            className="absolute inset-0 bg-bg-surface animate-pulse"
                          />
                        )}
                        <div className="absolute inset-0 transform-gpu transition-transform duration-500 ease-out group-hover/thumb:scale-[1.03] will-change-transform">
                          <Image
                            src={exp.credential.image}
                            alt={`${exp.credential.title} – ${exp.company} (${exp.role})`}
                            fill
                            sizes="(max-width: 640px) 100vw, 480px"
                            quality={75}
                            loading="eager"
                            decoding="async"
                            onLoad={() => setImgLoaded(true)}
                            onError={() => setImgFailed(true)}
                            className={`object-cover object-top transition-opacity duration-300 ${
                              imgLoaded ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        </div>

                        {/* Bottom Certificate Meta Bar */}
                        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-bg-surface/95 via-bg-surface/75 to-transparent flex items-center justify-between pointer-events-none">
                          <div className="min-w-0">
                            <p className="font-display font-semibold text-xs sm:text-sm text-text-primary truncate leading-tight">
                              {exp.credential.title}
                            </p>
                            <span className="font-mono text-[11px] text-text-secondary block mt-0.5">
                              {exp.company} · Official Certificate
                            </span>
                          </div>
                        </div>

                        {/* Hover Overlay Pill */}
                        <div className="absolute inset-0 bg-neutral-950/45 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-surface text-text-primary font-sans text-xs font-semibold shadow-xl border border-border-custom transition-transform duration-200 group-hover/thumb:scale-105">
                            <ZoomIn className="w-3.5 h-3.5 text-accent" />
                            <span>View certificate</span>
                          </span>
                        </div>
                      </button>
                    ) : (
                      <div className="p-3.5 rounded-2xl border border-dashed border-amber-500/40 bg-amber-500/[0.04] flex items-center justify-between text-xs font-mono text-amber-600 dark:text-amber-400">
                        <span className="font-semibold flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          <span>{exp.credential.title}</span>
                        </span>
                        <span className="text-[11px] opacity-80">Official credential</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl border border-dashed border-amber-500/40 bg-amber-500/[0.04] flex items-center justify-between text-xs font-mono text-amber-600 dark:text-amber-400">
                    <span className="font-semibold">Certificate pending</span>
                    <span className="text-[11px] opacity-80">Under official review</span>
                  </div>
                )}
              </div>
            </article>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

export default function Experience() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const timelineRef = useRef<HTMLDivElement>(null);
  const [litCount, setLitCount] = useState(1);
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    title: string;
    imageSrc?: string;
    subtitle?: string;
  }>({
    isOpen: false,
    title: "",
  });

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 60%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.4,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const total = EXPERIENCES_DATA.length;
    const nextLit = Math.min(total, Math.max(1, Math.ceil(latest * total)));
    if (nextLit !== litCount) {
      setLitCount(nextLit);
    }
  });

  const openPreview = (item: ExperienceItem) => {
    if (!item.credential) return;
    setDialogState({
      isOpen: true,
      title: item.credential.title,
      imageSrc: item.credential.image,
      subtitle: `${item.role} · ${item.company} (${item.period})`,
    });
  };

  return (
    <section
      id="experience"
      className="py-[var(--section-padding-y)] bg-bg section-alt relative scroll-mt-20 sm:scroll-mt-24 overflow-x-clip"
      aria-label="Experience Section"
    >
      <div className="content-width">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-text-secondary">
                Work experience
              </span>
            </div>
          </div>

          <div className="max-w-3xl mb-14">
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
              Professional roles that shaped my engineering craft.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
              Real software development inside Agile development teams delivering responsive interfaces and scalable APIs.
            </p>
          </div>
        </ScrollReveal>

        {/* Scroll-Linked Vertical Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical Timeline Guide Line */}
          <div
            aria-hidden="true"
            className="absolute left-2.5 sm:left-1/2 -translate-x-1/2 top-6 bottom-6 w-0.5 bg-border-custom overflow-hidden rounded-full"
          >
            <motion.div
              style={{
                scaleY: shouldReduceMotion ? 1 : smoothProgress,
              }}
              className="w-full h-full bg-accent origin-top will-change-transform"
            />
          </div>

          <div className="space-y-12 sm:space-y-16">
            {EXPERIENCES_DATA.map((exp, idx) => (
              <ExperienceRoleCard
                key={exp.id}
                exp={exp}
                index={idx}
                isEven={idx % 2 === 0}
                isLit={shouldReduceMotion || idx < litCount}
                shouldReduceMotion={shouldReduceMotion}
                onOpenPreview={openPreview}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Certificate Preview Dialog */}
      <PreviewDialog
        isOpen={dialogState.isOpen}
        onClose={() => setDialogState((prev) => ({ ...prev, isOpen: false }))}
        title={dialogState.title}
        imageSrc={dialogState.imageSrc}
        subtitle={dialogState.subtitle}
      />
    </section>
  );
}
