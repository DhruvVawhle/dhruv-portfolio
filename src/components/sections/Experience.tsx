"use client";

import React, { useState } from "react";
import Image from "next/image";
import { experiences } from "@/lib/data";
import ScrollReveal from "@/components/effects/ScrollReveal";
import LightboxModal, { LightboxSlide } from "@/components/ui/LightboxModal";

const CompanyLogoTile = ({ company }: { company: string }) => {
  const letter = company.charAt(0).toUpperCase();

  return (
    <div className="w-11 h-11 rounded-xl flex items-center justify-center font-display font-black text-lg flex-shrink-0 bg-foreground/5 text-text-primary border border-border-custom">
      {letter}
    </div>
  );
};

export default function Experience() {
  const [activeSlideIdx, setActiveSlideIdx] = useState<number | null>(null);

  const certSlides: LightboxSlide[] = experiences
    .filter((exp) => exp.certificate)
    .map((exp) => ({
      src: exp.certificate!.image,
      title: exp.certificate!.title,
      caption: `${exp.role} · ${exp.company} (${exp.period})`,
    }));

  const openCertificate = (certImage: string) => {
    const idx = certSlides.findIndex((s) => s.src === certImage);
    if (idx !== -1) {
      setActiveSlideIdx(idx);
    }
  };

  return (
    <section
      id="experience"
      className="py-[var(--section-padding-y)] bg-bg section-alt border-b border-border-custom/40 relative overflow-hidden"
    >
      <div className="content-width">
        {/* ── 1. EDITORIAL CHAPTER HEADER ──────────────────────────── */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                04 · EXPERIENCE
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent/60" />
              <span className="font-mono text-xs text-text-secondary">
                Engineering Roles
              </span>
            </div>
            <span className="font-mono text-xs text-text-secondary">
              Agile Production Teams
            </span>
          </div>

          <div className="max-w-2xl mb-16">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary tracking-tight">
              Professional roles that shaped my engineering craft.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
              Real software development inside Agile development teams delivering responsive interfaces and scalable APIs.
            </p>
          </div>
        </ScrollReveal>

        {/* ── 2. EDITORIAL VERTICAL TIMELINE ───────────────────────── */}
        <div className="relative pl-8 sm:pl-12 md:pl-16 max-w-4xl mx-auto">
          {/* 2px Vertical Timeline Track */}
          <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-gradient-to-b from-accent via-border-custom to-border-custom/20" />

          {experiences.map((exp, i) => (
            <ScrollReveal
              key={exp.id}
              delay={i * 0.12}
              className={i !== experiences.length - 1 ? "mb-12 sm:mb-16" : ""}
            >
              <div className="relative group">
                {/* Crisp Timeline Ring Node Dot centered over 2px track */}
                <div className="absolute -left-8 sm:-left-12 md:-left-16 top-8 -translate-x-[7px] w-4 h-4 rounded-full bg-accent ring-4 ring-bg-surface shadow-[0_0_12px_rgba(59,130,246,0.6)] group-hover:scale-110 group-hover:ring-accent/30 transition-all duration-300 z-10" />

                {/* Content Card with Subtle Hover Lift */}
                <div className="bg-bg-surface/80 border border-border-custom group-hover:border-accent/40 rounded-3xl p-6 sm:p-8 shadow-sm group-hover:shadow-xl group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-border-custom/60">
                    <div className="flex items-center gap-4">
                      <CompanyLogoTile company={exp.company} />
                      <div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-text-primary leading-snug">
                          {exp.role}
                        </h3>
                        <span className="text-sm font-semibold text-accent">
                          {exp.company}
                        </span>
                      </div>
                    </div>

                    {/* Emphasized Date Period Badge with High Contrast */}
                    <span className="font-mono text-sm sm:text-xs font-bold text-accent bg-accent/20 px-4 py-1.5 rounded-full border border-accent/50 w-fit shadow-xs min-h-[36px] sm:min-h-[28px] inline-flex items-center">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-3.5">
                    {exp.bullets.map((bullet, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-base text-text-secondary leading-relaxed"
                      >
                        <span className="text-accent font-bold mt-1 text-xs flex-shrink-0">
                          ◆
                        </span>
                        <span className="text-text-primary/90">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Supporting Certificate Proof Area */}
                  {exp.certificate && (
                    <div className="mt-8 pt-6 border-t border-border-custom/60">
                      <div className="bg-bg/40 dark:bg-bg/30 border border-border-custom rounded-2xl p-5 sm:p-6 transition-all duration-300">
                        {/* 1. Subtle Monochrome Metadata Row */}
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium text-text-secondary bg-bg-surface border border-border-custom shadow-xs">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            <span>Completed Internship • Verified</span>
                          </span>
                          <span className="font-mono text-xs text-text-secondary/70 hidden sm:inline">
                            {exp.company} Official Credential
                          </span>
                        </div>

                        {/* 2. Internship Title as Visual Focus */}
                        <h4 className="font-display font-bold text-lg sm:text-xl text-text-primary tracking-tight leading-snug mb-5">
                          {exp.certificate.title}
                        </h4>

                        {/* 3. Certificate Preview & Action Container */}
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-5 pt-1">
                          {/* Certificate Preview (Second Strongest Visual Element) */}
                          <div
                            onClick={() => openCertificate(exp.certificate!.image)}
                            className="group/cert relative w-full sm:w-56 md:w-64 aspect-[16/11] rounded-xl overflow-hidden border border-border-custom bg-bg/80 cursor-pointer transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-500 hover:shadow-md flex-shrink-0"
                          >
                            <Image
                              src={exp.certificate.image}
                              alt={exp.certificate.title}
                              fill
                              sizes="(max-width:640px) 100vw, 256px"
                              className="object-cover transition-transform duration-500 group-hover/cert:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="p-2 rounded-full bg-bg-surface/90 text-text-primary shadow-sm">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="11" cy="11" r="8" />
                                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                  <line x1="11" y1="8" x2="11" y2="14" />
                                  <line x1="8" y1="11" x2="14" y2="11" />
                                </svg>
                              </span>
                            </div>
                          </div>

                          {/* Understated Secondary CTA */}
                          <div className="flex flex-col sm:items-end justify-center">
                            <button
                              onClick={() => openCertificate(exp.certificate!.image)}
                              className="group/btn inline-flex items-center justify-center gap-2 h-9 px-4 rounded-full text-[13px] font-semibold text-text-primary bg-bg-surface hover:bg-bg-surface-hover border border-border-custom hover:border-neutral-300 dark:hover:border-neutral-600 shadow-xs hover:shadow-sm transition-all duration-200 cursor-pointer w-full sm:w-auto whitespace-nowrap"
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-secondary">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <polyline points="10 9 9 9 8 9" />
                              </svg>
                              <span>View Internship Certificate</span>
                              <span className="transform group-hover/btn:translate-x-0.5 transition-transform text-text-secondary">
                                →
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Fullscreen Certificate Preview */}
      <LightboxModal
        isOpen={activeSlideIdx !== null}
        onClose={() => setActiveSlideIdx(null)}
        slides={certSlides}
        initialIndex={activeSlideIdx ?? 0}
      />
    </section>
  );
}
