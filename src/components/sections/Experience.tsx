"use client";

import React, { useState, useEffect, useRef } from "react";
import { EXPERIENCES_DATA, ExperienceItem } from "@/data/experienceAndCompetitions";
import ScrollReveal from "@/components/effects/ScrollReveal";
import PreviewDialog from "@/components/ui/PreviewDialog";
import TechIcon from "@/components/ui/TechIcon";

export default function Experience() {
  const [activeDots, setActiveDots] = useState<boolean[]>([false, false, false]);
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    title: string;
    imageSrc?: string;
    subtitle?: string;
  }>({
    isOpen: false,
    title: "",
  });

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll spy for vertical timeline filling and dot lighting at 60% viewport height
  useEffect(() => {
    let animId: number;

    const onScroll = () => {
      const triggerY = window.innerHeight * 0.6;
      const newActive = itemRefs.current.map((el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= triggerY;
      });
      setActiveDots(newActive);
    };

    const handleScroll = () => {
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(onScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  const openPreview = (item: ExperienceItem) => {
    if (!item.credential) return;
    setDialogState({
      isOpen: true,
      title: item.credential.title,
      imageSrc: item.credential.image,
      subtitle: `${item.role} · ${item.company} (${item.period})`,
    });
  };

  const activeCount = activeDots.filter(Boolean).length;
  const progressPercent = activeCount === 0 ? 0 : ((activeCount - 1) / (EXPERIENCES_DATA.length - 1)) * 100;

  return (
    <section
      id="experience"
      className="py-[var(--section-padding-y)] bg-bg section-alt relative"
      aria-label="Experience Section"
    >
      <div className="content-width">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                03 · EXPERIENCE
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent/60" />
              <span className="font-mono text-xs text-text-secondary">
                Professional roles that shaped my engineering craft.
              </span>
            </div>
            <span className="font-mono text-xs text-text-secondary">
              Agile production teams
            </span>
          </div>

          <div className="max-w-3xl mb-14">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
              Professional roles that shaped my engineering craft.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
              Real software development inside Agile development teams delivering responsive interfaces and scalable APIs.
            </p>
          </div>
        </ScrollReveal>

        {/* Scroll-Linked Vertical Timeline */}
        <div className="relative">
          {/* Vertical Timeline Guide Line */}
          <div
            aria-hidden="true"
            className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-8 bottom-8 w-0.5 bg-border-custom"
          >
            {/* Animated Fill Progress Line */}
            <div
              style={{ height: `${progressPercent}%` }}
              className="w-full bg-accent transition-all duration-300"
            />
          </div>

          <div className="space-y-12 sm:space-y-16">
            {EXPERIENCES_DATA.map((exp, idx) => {
              const isDotLit = activeDots[idx];
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={exp.id}
                  ref={(el) => {
                    itemRefs.current[idx] = el;
                  }}
                  className="relative flex flex-col sm:flex-row items-start"
                >
                  {/* Left Column: Date on Desktop (Right-aligned) */}
                  <div className="hidden sm:block sm:w-1/2 sm:pr-12 text-right pt-2">
                    {isEven ? (
                      <div>
                        <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-bg-surface border border-border-custom text-accent inline-block">
                          {exp.period}
                        </span>
                        <div className="font-mono text-xs text-text-secondary mt-2">
                          {exp.status === "Certificate pending" ? (
                            <span className="text-amber-500 font-medium">Certificate pending</span>
                          ) : (
                            <span>Verified Role</span>
                          )}
                        </div>
                      </div>
                    ) : (
                      /* Empty for alternating layout */
                      <div />
                    )}
                  </div>

                  {/* Middle Timeline Dot */}
                  <div
                    aria-hidden="true"
                    className={`absolute left-4 sm:left-1/2 -translate-x-1/2 top-4 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 shadow-sm ${
                      isDotLit
                        ? "bg-accent border-white ring-4 ring-accent/20 text-white"
                        : "bg-bg-surface border-border-custom text-text-secondary"
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-current" />
                  </div>

                  {/* Right Column (or Left on alternate desktop rows) */}
                  <div
                    className={`pl-12 sm:pl-0 sm:w-1/2 ${
                      isEven ? "sm:pl-12" : "sm:order-first sm:pr-12"
                    }`}
                  >
                    {/* Date label visible on Mobile */}
                    <div className="sm:hidden mb-3">
                      <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-bg-surface border border-border-custom text-accent inline-block">
                        {exp.period}
                      </span>
                    </div>

                    {/* Role Card */}
                    <div className="p-6 sm:p-8 rounded-3xl bg-bg-surface border border-border-custom hover:border-accent/50 shadow-sm transition-all duration-300">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-xs font-bold text-accent">
                          {exp.company}
                        </span>
                        <span className="font-mono text-[11px] text-text-secondary">
                          {exp.period}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-xl sm:text-2xl text-text-primary mb-4 leading-snug">
                        {exp.role}
                      </h3>

                      <ul className="space-y-2.5 mb-6 text-sm text-text-secondary leading-relaxed">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2.5">
                            <span className="text-accent font-bold mt-0.5">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-bg border border-border-custom font-mono text-[11px] text-text-secondary"
                          >
                            <TechIcon name={tag} size="sm" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>

                      {/* Credential Box or Dashed Certificate Pending Box */}
                      {exp.credential ? (
                        <div className="pt-4 border-t border-border-custom/80 flex flex-col gap-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <span className="font-mono text-[10px] text-emerald-500 font-semibold block uppercase">
                                {exp.credential.badge}
                              </span>
                              <span className="font-mono text-xs text-text-primary font-medium">
                                {exp.credential.issuerNote}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => openPreview(exp)}
                              className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent font-mono text-xs font-semibold border border-accent/20 transition-colors cursor-pointer w-fit"
                            >
                              <span>{exp.credential.buttonText} ↗</span>
                            </button>
                          </div>

                          {/* Certificate Preview Thumbnail with Click-to-Enlarge */}
                          {exp.credential.image && (
                            <div
                              onClick={() => openPreview(exp)}
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  openPreview(exp);
                                }
                              }}
                              aria-label={`Enlarge ${exp.credential.title}`}
                              className="relative w-full aspect-[16/9] max-h-48 rounded-2xl border border-border-custom bg-black/5 dark:bg-black/40 overflow-hidden cursor-pointer group/thumb hover:border-accent/60 transition-all shadow-xs"
                            >
                              <img
                                src={exp.credential.image}
                                alt={exp.credential.title}
                                className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-bg-surface text-text-primary font-mono text-xs font-bold shadow-lg">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    <line x1="11" y1="8" x2="11" y2="14" />
                                    <line x1="8" y1="11" x2="14" y2="11" />
                                  </svg>
                                  <span>Click to Enlarge</span>
                                </span>
                              </div>
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
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Certificate Preview Dialog */}
      <PreviewDialog
        isOpen={dialogState.isOpen}
        onClose={() => setDialogState({ ...dialogState, isOpen: false })}
        title={dialogState.title}
        imageSrc={dialogState.imageSrc}
        subtitle={dialogState.subtitle}
      />
    </section>
  );
}
