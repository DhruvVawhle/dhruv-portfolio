"use client";

import React, { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import ScrollReveal from "@/components/effects/ScrollReveal";

/* ─── Minimal Line Icons for Workflow Steps ────────────────────────── */
const UnderstandIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="2" x2="12" y2="4" />
    <line x1="12" y1="20" x2="12" y2="22" />
    <line x1="2" y1="12" x2="4" y2="12" />
    <line x1="20" y1="12" x2="22" y2="12" />
  </svg>
);

const ResearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const ArchitectureIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="14" y="14" width="7" height="7" rx="1.5" />
    <path d="M6.5 10v4a2 2 0 0 0 2 2h5.5" />
  </svg>
);

const BuildIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const TestIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const DeployIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    <polyline points="12 11 12 17" />
    <polyline points="9 14 12 11 15 14" />
  </svg>
);

const IterateIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);

interface WorkflowStep {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: "Understand the Problem",
    description:
      "Define core requirements, user pain points, and success metrics before writing code.",
    icon: <UnderstandIcon />,
  },
  {
    step: "02",
    title: "Research & Plan",
    description:
      "Evaluate technical tradeoffs, data models, and edge cases to minimize technical debt.",
    icon: <ResearchIcon />,
  },
  {
    step: "03",
    title: "Design the Architecture",
    description:
      "Structure modular, API-first boundaries designed for maintainability and scale.",
    icon: <ArchitectureIcon />,
  },
  {
    step: "04",
    title: "Build the MVP",
    description:
      "Execute clean, typed, and well-tested core functionality with rapid iteration cycles.",
    icon: <BuildIcon />,
  },
  {
    step: "05",
    title: "Test & Validate",
    description:
      "Verify end-to-end reliability, security boundaries, and edge-case resilience against real data.",
    icon: <TestIcon />,
  },
  {
    step: "06",
    title: "Deploy & Monitor",
    description:
      "Ship to production with automated CI/CD pipelines, active telemetry, and zero-downtime practices.",
    icon: <DeployIcon />,
  },
  {
    step: "07",
    title: "Iterate & Improve",
    description:
      "Refine performance and expand capabilities driven by real user feedback and system metrics.",
    icon: <IterateIcon />,
  },
];

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const [openStep, setOpenStep] = useState<string | null>("01");

  return (
    <section
      id="about"
      className="py-[var(--section-padding-y)] bg-bg section-alt border-b border-border-custom/40 relative overflow-hidden"
      aria-label="Engineering Philosophy and Problem-Solving Workflow"
    >
      <div className="content-width">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                02 · PHILOSOPHY
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent/60" />
              <span className="font-mono text-xs text-text-secondary">
                Engineering Mindset
              </span>
            </div>
            <span className="font-mono text-xs text-text-secondary">
              Problem-Solving Discipline
            </span>
          </div>

          <div className="max-w-3xl mb-16">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
              Engineering Philosophy
            </h2>
            <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
              How I approach software engineering—from understanding the problem to delivering reliable, scalable solutions.
            </p>
          </div>
        </ScrollReveal>

        {/* Two-Column Desktop / Stacked Mobile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* =========================================================
              LEFT COLUMN: Engineering Philosophy (Mindset & Intent)
             ========================================================= */}
          <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-8">
            <ScrollReveal>
              <div className="p-8 sm:p-9 rounded-3xl bg-bg-surface border border-border-custom shadow-sm relative overflow-hidden group hover:border-accent/30 transition-all duration-300">
                <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-accent/80 rounded-l-3xl" />
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border-custom/60">
                  <h3 className="font-display font-bold text-2xl text-text-primary">
                    Engineering with Intent
                  </h3>
                </div>

                <p className="text-text-primary text-base sm:text-lg font-medium leading-relaxed mb-6">
                  I believe great software isn&apos;t measured by the number of features it has, but by how effectively it solves real problems.
                </p>
                <p className="text-text-secondary text-base leading-relaxed mb-6 font-mono">
                  Every project I build follows a simple philosophy:
                </p>

                <ul className="space-y-4 text-base text-text-secondary">
                  {[
                    "Solve real user problems before writing code.",
                    "Design systems that are maintainable and scalable.",
                    "Prioritize performance, accessibility, and reliability.",
                    "Choose technologies based on long-term value, not trends.",
                    "Continuously learn, iterate, and improve.",
                  ].map((principle, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span className="leading-relaxed text-text-primary/90">
                        {principle}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* =========================================================
              RIGHT COLUMN: How I Build Software (Animated Workflow)
             ========================================================= */}
          <div className="lg:col-span-8 space-y-6">
            <ScrollReveal>
              <div className="flex items-center justify-between pb-4 border-b border-border-custom/60">
                <h3 className="font-display font-bold text-2xl text-text-primary">
                  How I Build Software
                </h3>
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold px-3 py-1 rounded-full bg-accent/10 hidden sm:inline">
                  EXECUTION MODEL
                </span>
              </div>
            </ScrollReveal>

            {/* Mobile Accordion View (block md:hidden) */}
            <div className="block md:hidden space-y-3.5 pt-2">
              {WORKFLOW_STEPS.map((stepItem) => {
                const isOpen = openStep === stepItem.step;
                return (
                  <div
                    key={stepItem.step}
                    className="rounded-2xl bg-bg-surface/80 border border-border-custom overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenStep(isOpen ? null : stepItem.step)}
                      aria-expanded={isOpen}
                      className="w-full min-h-[56px] px-6 py-4 flex items-center justify-between text-left focus-visible:outline-2 focus-visible:outline-accent cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 min-h-[48px] rounded-xl bg-bg border border-border-custom text-accent flex items-center justify-center flex-shrink-0">
                          {stepItem.icon}
                        </div>
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-sm font-bold text-accent">
                            {stepItem.step}
                          </span>
                          <span className="font-display font-bold text-lg text-text-primary">
                            {stepItem.title}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-accent font-mono text-sm transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-border-custom/40 text-base font-sans text-text-secondary leading-relaxed">
                            {stepItem.description}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Desktop Animated Workflow View (hidden md:block) */}
            <div className="hidden md:block relative pt-2">
              {WORKFLOW_STEPS.map((stepItem, i) => {
                const isLast = i === WORKFLOW_STEPS.length - 1;

                return (
                  <motion.div
                    key={stepItem.step}
                    initial={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: 18 }
                    }
                    whileInView={
                      shouldReduceMotion
                        ? { opacity: 1 }
                        : { opacity: 1, y: 0 }
                    }
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.4,
                      delay: shouldReduceMotion ? 0 : i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative"
                  >
                    {/* Workflow Step Card */}
                    <div
                      tabIndex={0}
                      role="region"
                      aria-label={`Step ${stepItem.step}: ${stepItem.title}`}
                      className="group p-6 sm:p-7 rounded-2xl bg-bg-surface/70 border border-border-custom/60 
                        hover:border-accent/40 hover:bg-bg-surface hover:-translate-y-1 hover:shadow-lg 
                        focus:outline-none focus-visible:ring-2 focus-visible:ring-accent 
                        transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Subtle hover accent highlight bar on top edge */}
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent/0 group-hover:bg-accent transition-colors duration-300" />

                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 sm:gap-5">
                          {/* Minimal Line Icon Badge */}
                          <div className="w-11 h-11 rounded-xl bg-bg border border-border-custom group-hover:border-accent/40 text-accent flex items-center justify-center flex-shrink-0 transition-colors shadow-2xs">
                            {stepItem.icon}
                          </div>

                          {/* Step Content */}
                          <div>
                            <div className="flex items-center gap-3 mb-1.5">
                              <span className="font-mono text-xs font-bold text-accent">
                                {stepItem.step}
                              </span>
                              <h4 className="font-display font-bold text-lg sm:text-xl text-text-primary group-hover:text-accent transition-colors">
                                {stepItem.title}
                              </h4>
                            </div>
                            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-mono">
                              {stepItem.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Directional Arrow Connector between steps */}
                    {!isLast && (
                      <div className="flex justify-center py-2" aria-hidden="true">
                        <div className="w-6 h-6 rounded-full bg-bg-surface border border-border-custom flex items-center justify-center text-accent/80 text-xs font-mono shadow-2xs">
                          ↓
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
