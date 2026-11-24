"use client";

import React, { useState } from "react";
import Image from "next/image";
import { OTHER_COMPETITIONS } from "@/data/experienceAndCompetitions";
import ScrollReveal from "@/components/effects/ScrollReveal";
import dynamic from "next/dynamic";
import MediMitraSection from "@/components/sections/MediMitraSection";

const PreviewDialog = dynamic(() => import("@/components/ui/PreviewDialog"), {
  ssr: false,
});

export default function Hackathons() {
  const [dialogState, setDialogState] = useState<{
    isOpen: boolean;
    title: string;
    imageSrc?: string;
    pdfSrc?: string;
    subtitle?: string;
  }>({
    isOpen: false,
    title: "",
  });

  const handleOpenMediMitraCaseStudy = () => {
    setDialogState({
      isOpen: true,
      title: "MediMitra AI Healthcare Case Study",
      pdfSrc: "/medimitra-case-study.pdf",
      imageSrc: "/images/hackathons/medimitra-case-study-preview.png",
      subtitle: "Smart India Hackathon 2025 · PS ID: SIH25049",
    });
  };

  return (
    <section
      id="hackathons"
      className="py-[var(--section-padding-y)] bg-bg relative scroll-mt-20 sm:scroll-mt-24"
      aria-label="Competitive engineering Section"
    >
      <div className="content-width">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-accent">
                Competitive Engineering
              </span>
            </div>
          </div>

          <div className="max-w-3xl mb-12">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
              Building under pressure, with a team, against the clock.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
              From National-Level Smart India Hackathon prototypes to intensive 24-hour AI agent buildathons.
            </p>
          </div>
        </ScrollReveal>

        {/* ── FLAGSHIP SHOWCASE: MEDIMITRA ── */}
        <ScrollReveal direction="up" delay={0.08} className="mb-16">
          <MediMitraSection onOpenCaseStudy={handleOpenMediMitraCaseStudy} />
        </ScrollReveal>


        {/* ── FOCUS CARDS: OTHER HACKATHONS AND BUILDATHONS ── */}
        <div className="pt-8 border-t border-border-custom/60">
          <ScrollReveal>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight mb-8">
              Other hackathons and buildathons
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OTHER_COMPETITIONS.map((comp, idx) => (
              <ScrollReveal key={comp.id} delay={idx * 0.12} direction="up" className="h-full">
                <div
                  className="h-full relative p-6 sm:p-8 rounded-3xl bg-bg-surface border border-border-custom shadow-xs hover:border-accent/40 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="mb-3">
                      <span className="font-mono text-xs font-bold text-accent">
                        {comp.period} · {comp.team}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-xl text-text-primary mb-4 group-hover:text-accent transition-colors">
                      {comp.title}
                    </h4>

                    <div className="p-3.5 rounded-2xl bg-bg border border-border-custom mb-6">
                      <span className="font-mono text-[10px] uppercase text-text-secondary block font-semibold mb-0.5">
                        Outcome
                      </span>
                      <p className="font-mono text-xs text-text-primary">
                        {comp.outcome}
                      </p>
                    </div>
                  </div>

                  {/* Visible Certificate Preview Thumbnail with Click-to-Enlarge */}
                  {comp.certificateImage && (
                    <div
                      onClick={() =>
                        setDialogState({
                          isOpen: true,
                          title: comp.title,
                          imageSrc: comp.certificateImage,
                          subtitle: `${comp.period} · ${comp.team}`,
                        })
                      }
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setDialogState({
                            isOpen: true,
                            title: comp.title,
                            imageSrc: comp.certificateImage,
                            subtitle: `${comp.period} · ${comp.team}`,
                          });
                        }
                      }}
                      aria-label={`Enlarge ${comp.title} certificate`}
                      className="relative w-full aspect-[16/9] max-h-48 rounded-2xl border border-border-custom bg-black/5 dark:bg-black/40 overflow-hidden cursor-pointer group/cardthumb hover:border-accent/60 transition-all shadow-xs"
                    >
                      <Image
                        src={comp.certificateImage}
                        alt={`${comp.title} Certificate – Hackathon & Competition Recognition`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover object-top transform-gpu group-hover/cardthumb:scale-[1.02] transition-transform duration-300 ease-out"
                      />
                      <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-bg/85 backdrop-blur-md border border-border-custom text-text-primary font-mono text-[11px] flex items-center gap-1.5 opacity-80 group-hover/cardthumb:opacity-100 transition-opacity">
                        <span>Preview</span>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>

      {/* Case Study / Certificate Preview Dialog */}
      <PreviewDialog
        isOpen={dialogState.isOpen}
        onClose={() => setDialogState({ ...dialogState, isOpen: false })}
        title={dialogState.title}
        imageSrc={dialogState.imageSrc}
        pdfSrc={dialogState.pdfSrc}
        subtitle={dialogState.subtitle}
      />
    </section>
  );
}

