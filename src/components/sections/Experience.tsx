"use client";

import React, { useState, useEffect, useRef } from "react";
import { EXPERIENCES_DATA, ExperienceItem } from "@/data/experienceAndCompetitions";
import ScrollReveal from "@/components/effects/ScrollReveal";
import PreviewDialog from "@/components/ui/PreviewDialog";

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

    let isNearViewport = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry.isIntersecting;
        if (entry.isIntersecting) {
          onScroll();
        }
      },
      { rootMargin: "200px" }
    );

    const sectionEl = document.getElementById("experience");
    if (sectionEl) observer.observe(sectionEl);

    const handleScroll = () => {
      if (!isNearViewport) return;
      cancelAnimationFrame(animId);
      animId = requestAnimationFrame(onScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
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
      className="py-[var(--section-padding-y)] bg-bg section-alt relative scroll-mt-20 sm:scroll-mt-24"
      aria-label="Experience Section"
    >
      <div className="content-width">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                Experience
              </span>
            </div>
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
            className="absolute left-2.5 sm:left-1/2 -translate-x-1/2 top-8 bottom-8 w-0.5 bg-border-custom"
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
                  {/* Timeline Date Column on Desktop */}
                  <div
                    className={`hidden sm:block sm:w-1/2 pt-2 ${
                      isEven ? "sm:pr-12 text-right" : "sm:pl-12 text-left"
                    }`}
                  >
                    <div>
                      <span className="font-mono text-xs font-bold px-3 py-1.5 rounded-full bg-bg-surface border border-border-custom text-accent inline-block">
                        {exp.period}
                      </span>
                      <div className={`mt-2 ${isEven ? "flex justify-end" : "flex justify-start"}`}>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-[11px] font-semibold border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          Completed Internship
                        </span>
                      </div>
                      {exp.status === "Certificate pending" && (
                        <div className="font-mono text-xs text-text-secondary mt-1.5">
                          <span className="text-amber-500 font-medium">Certificate pending</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Middle Timeline Dot */}
                  <div
                    aria-hidden="true"
                    className={`absolute left-2.5 sm:left-1/2 -translate-x-1/2 top-4 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 shadow-sm ${
                      isDotLit
                        ? "bg-accent border-white ring-4 ring-accent/20 text-white"
                        : "bg-bg-surface border-border-custom text-text-secondary"
                    }`}
                  >
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-current" />
                  </div>

                  {/* Right Column (or Left on alternate desktop rows) */}
                  <div
                    className={`pl-7 sm:pl-0 sm:w-1/2 ${
                      isEven ? "sm:pl-12" : "sm:order-first sm:pr-12"
                    }`}
                  >
                    {/* Date label visible on Mobile */}
                    <div className="sm:hidden mb-2.5 flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-bg-surface border border-border-custom text-accent inline-block">
                        {exp.period}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-[10px] font-semibold border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Completed Internship
                      </span>
                    </div>

                    {/* Role Card */}
                    <div className="p-4.5 sm:p-8 rounded-3xl bg-bg-surface border border-border-custom hover:border-accent/50 shadow-sm transition-all duration-300">
                      <div className="mb-2.5">
                        <span className="font-mono text-xs font-bold text-accent">
                          {exp.company}
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


                      {/* Credential Box or Dashed Certificate Pending Box */}
                      {exp.credential ? (
                        <div className="pt-4 border-t border-border-custom/80">
                          {exp.credential.image ? (
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
                              aria-label={`View ${exp.credential.title}`}
                              className="group/thumb relative w-full aspect-[16/9] max-h-52 rounded-2xl border border-border-custom bg-black/5 dark:bg-black/40 overflow-hidden cursor-pointer hover:border-accent/60 transition-all shadow-xs"
                            >
                              <img
                                src={exp.credential.image}
                                alt={`${exp.credential.title} – ${exp.company} (${exp.role})`}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover object-top group-hover/thumb:scale-[1.02] transition-transform duration-300"
                              />

                              {/* Bottom Certificate Meta Bar */}
                              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-bg-surface/95 via-bg-surface/70 to-transparent flex items-center justify-between pointer-events-none">
                                <div className="min-w-0">
                                  <p className="font-display font-semibold text-xs sm:text-sm text-text-primary truncate leading-tight">
                                    {exp.credential.title}
                                  </p>
                                  <span className="font-mono text-[10px] text-text-secondary block mt-0.5">
                                    {exp.company} · Official Certificate
                                  </span>
                                </div>
                              </div>

                              {/* Restored Hover Overlay with "View Certificate" Pill */}
                              <div className="absolute inset-0 bg-black/45 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-surface text-text-primary font-sans text-xs font-semibold shadow-xl border border-border-custom group-hover/thumb:scale-105 transition-transform duration-200">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                    <line x1="11" y1="8" x2="11" y2="14" />
                                    <line x1="8" y1="11" x2="14" y2="11" />
                                  </svg>
                                  <span>View Certificate</span>
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div className="p-3.5 rounded-2xl border border-dashed border-amber-500/40 bg-amber-500/[0.04] flex items-center justify-between text-xs font-mono text-amber-600 dark:text-amber-400">
                              <span className="font-semibold">{exp.credential.title}</span>
                              <span className="text-[11px] opacity-80">Under review</span>
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
