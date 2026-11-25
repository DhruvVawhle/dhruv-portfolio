"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ZoomIn } from "lucide-react";
import { OTHER_COMPETITIONS, type HackathonCard } from "@/data/experienceAndCompetitions";
import ScrollReveal from "@/components/effects/ScrollReveal";
import dynamic from "next/dynamic";
import MediMitraSection from "@/components/sections/MediMitraSection";
import { usePointerTilt } from "@/components/sections/project-showcase/hooks";

const PreviewDialog = dynamic(() => import("@/components/ui/PreviewDialog"), {
  ssr: false,
});

interface CompetitionCardProps {
  comp: HackathonCard;
  index: number;
  shouldReduceMotion: boolean;
  onPreview: (comp: HackathonCard) => void;
}

function CompetitionCard({
  comp,
  index,
  shouldReduceMotion,
  onPreview,
}: CompetitionCardProps) {
  const { cardRef, handlePointerMove, handlePointerLeave } =
    usePointerTilt(shouldReduceMotion);

  return (
    <ScrollReveal
      delay={Math.min(index * 0.08, 0.16)}
      direction="up"
      className="h-full"
    >
      <div className="transition-transform duration-200 ease-out hover:-translate-y-0.5 h-full">
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
          className="group relative h-full p-6 sm:p-8 rounded-3xl bg-bg-surface border border-border-custom shadow-xs hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 flex flex-col justify-between overflow-hidden will-change-transform"
        >
          {!shouldReduceMotion && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(59, 130, 246, 0.1), transparent 65%)",
              }}
            />
          )}

          <div className="relative z-10">
            <div className="mb-3">
              <span className="font-mono text-xs font-semibold text-accent">
                {comp.period} · {comp.team}
              </span>
            </div>

            <h4 className="font-display font-bold text-xl text-text-primary mb-4 group-hover:text-accent transition-colors">
              {comp.title}
            </h4>

            <div className="p-3.5 rounded-2xl bg-bg border border-border-custom mb-6">
              <span className="font-mono text-[11px] text-text-secondary block font-medium mb-0.5">
                Outcome
              </span>
              <p className="font-mono text-xs text-text-primary leading-relaxed">
                {comp.outcome}
              </p>
            </div>
          </div>

          {comp.certificateImage && (
            <button
              type="button"
              onClick={() => onPreview(comp)}
              aria-label={`Enlarge ${comp.title} certificate`}
              className="relative z-10 w-full aspect-[16/9] max-h-48 rounded-2xl border border-border-custom bg-bg overflow-hidden cursor-pointer group/cardthumb hover:border-accent/60 transition-[border-color,box-shadow] duration-200 shadow-xs text-left focus-visible:outline-2 focus-visible:outline-accent"
            >
              <div className="absolute inset-0 transform-gpu transition-transform duration-500 ease-out group-hover/cardthumb:scale-[1.03] will-change-transform">
                <Image
                  src={comp.certificateImage}
                  alt={`${comp.title} Certificate – Hackathon & Competition Recognition`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={75}
                  loading="eager"
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-bg-surface/90 backdrop-blur-md border border-border-custom text-text-primary font-mono text-[11px] flex items-center gap-1.5 opacity-85 group-hover/cardthumb:opacity-100 transition-opacity">
                <ZoomIn className="w-3 h-3 text-accent" />
                <span>Preview</span>
              </div>
            </button>
          )}
        </article>
      </div>
    </ScrollReveal>
  );
}

export default function Hackathons() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const sectionRef = useRef<HTMLElement>(null);
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    mass: 0.4,
  });
  const flagshipScale = useTransform(smoothScroll, [0, 0.35, 0.75], [0.96, 1, 0.985]);

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
      ref={sectionRef}
      className="py-[var(--section-padding-y)] bg-bg relative scroll-mt-20 sm:scroll-mt-24 overflow-x-clip"
      aria-label="Competitive engineering Section"
    >
      <div className="content-width">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-accent">
                Competitive engineering
              </span>
            </div>
          </div>

          <div className="max-w-3xl mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
              Building under pressure, with a team, against the clock.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
              From National-Level Smart India Hackathon prototypes to intensive 24-hour AI agent buildathons.
            </p>
          </div>
        </ScrollReveal>

        {/* Flagship Showcase with Scroll-Linked Perspective Scale */}
        <motion.div
          style={shouldReduceMotion ? undefined : { scale: flagshipScale }}
          className="mb-16 will-change-transform"
        >
          <ScrollReveal direction="up" delay={0.06}>
            <MediMitraSection onOpenCaseStudy={handleOpenMediMitraCaseStudy} />
          </ScrollReveal>
        </motion.div>

        {/* Other Hackathons & Buildathons */}
        <div className="pt-8 border-t border-border-custom/60">
          <ScrollReveal>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight mb-8">
              Other hackathons and buildathons
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OTHER_COMPETITIONS.map((comp, idx) => (
              <CompetitionCard
                key={comp.id}
                comp={comp}
                index={idx}
                shouldReduceMotion={shouldReduceMotion}
                onPreview={(c) =>
                  setDialogState({
                    isOpen: true,
                    title: c.title,
                    imageSrc: c.certificateImage,
                    subtitle: `${c.period} · ${c.team}`,
                  })
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Case Study / Certificate Preview Dialog */}
      <PreviewDialog
        isOpen={dialogState.isOpen}
        onClose={() => setDialogState((prev) => ({ ...prev, isOpen: false }))}
        title={dialogState.title}
        imageSrc={dialogState.imageSrc}
        pdfSrc={dialogState.pdfSrc}
        subtitle={dialogState.subtitle}
      />
    </section>
  );
}
