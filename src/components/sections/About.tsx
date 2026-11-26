"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValueEvent,
  useReducedMotion,
} from "motion/react";
import { Layers, Brain, ShieldCheck, ArrowUpRight, Bot, Check } from "lucide-react";
import dynamic from "next/dynamic";
import { WORKFLOW_STEPS } from "@/data/engineeringWorkflow";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { usePointerTilt } from "@/components/sections/project-showcase/hooks";

const VSCodeEditor = dynamic(() => import("@/components/sections/VSCodeEditor"), {
  ssr: false,
});

const PHILOSOPHY_BULLETS = [
  "Solve real user problems before writing code.",
  "Design systems that are maintainable and scalable.",
  "Prioritize performance, accessibility, and reliability.",
  "Choose technologies based on long-term value, not trends.",
  "Continuously learn, iterate, and improve.",
];

export default function About() {
  const [activeStepCount, setActiveStepCount] = useState<number>(1);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const workflowRef = useRef<HTMLDivElement>(null);

  const philosophyTilt = usePointerTilt(shouldReduceMotion);
  const editorTilt = usePointerTilt(shouldReduceMotion);

  // Continuous GPU-composited scroll progress for the 7-step workflow spine
  const { scrollYProgress } = useScroll({
    target: workflowRef,
    offset: ["start 55%", "end 62%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    mass: 0.4,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const total = WORKFLOW_STEPS.length;
    const nextCount = Math.min(total, Math.max(1, Math.round(latest * (total - 1)) + 1));
    if (nextCount !== activeStepCount) {
      setActiveStepCount(nextCount);
    }
  });

  const scrollToStep = (index: number) => {
    const el = stepRefs.current[index];
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -140, duration: 0.9 });
    } else {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 140;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="py-[var(--section-padding-y)] bg-bg section-alt relative scroll-mt-20 sm:scroll-mt-24 overflow-x-clip"
      aria-label="About and Engineering Philosophy Section"
    >
      <div className="content-width">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-accent">Profile &amp; philosophy</span>
            </div>
          </div>

          <div className="max-w-3xl mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
              Engineering with intent and problem-first focus.
            </h2>
            <p className="mt-3 text-base sm:text-lg text-text-secondary leading-relaxed">
              Transforming complex algorithmic challenges into accessible, high-performance web applications and secure AI solutions.
            </p>
          </div>
        </ScrollReveal>

        {/* Engineering With Intent (Hover-Interactive Two-Column Card) */}
        <ScrollReveal>
          <div className="mb-16 transition-transform duration-200 ease-out hover:-translate-y-0.5">
            <div
              ref={philosophyTilt.cardRef}
              onPointerMove={philosophyTilt.handlePointerMove}
              onPointerLeave={philosophyTilt.handlePointerLeave}
              style={{
                transform: shouldReduceMotion
                  ? undefined
                  : "perspective(1200px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
                transition: shouldReduceMotion
                  ? undefined
                  : "transform var(--tilt-ease, 200ms) cubic-bezier(0.16, 1, 0.3, 1), border-color 200ms ease, box-shadow 200ms ease",
              }}
              className="group/phil relative p-7 sm:p-10 rounded-3xl bg-bg-surface border border-border-custom hover:border-accent/45 shadow-sm hover:shadow-xl hover:shadow-accent/10 overflow-hidden will-change-transform"
            >
              {!shouldReduceMotion && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover/phil:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), rgba(59, 130, 246, 0.08), transparent 65%)",
                  }}
                />
              )}

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-12 items-stretch">
                {/* Left Column: Quote & Philosophy Bullets */}
                <div className="flex flex-col">
                  <blockquote className="border-l-4 border-accent pl-4 sm:pl-6 my-2">
                    <p className="font-display font-bold text-[17px] lg:text-[22px] leading-snug text-text-primary italic">
                      &ldquo;Great software isn&apos;t measured by the number of features it has, but by how effectively it solves real problems.&rdquo;
                    </p>
                  </blockquote>

                  <p className="mt-5 mb-4 text-sm text-text-secondary font-medium">
                    Every project I build follows a simple philosophy:
                  </p>

                  <ul className="flex flex-col justify-between gap-3 flex-1">
                    {PHILOSOPHY_BULLETS.map((bullet) => (
                      <li
                        key={bullet}
                        className="group/item flex-1 flex items-center gap-3 border-b border-border-custom pb-3 last:border-b-0 last:pb-0"
                      >
                        <span className="w-[18px] h-[18px] min-w-[18px] min-h-[18px] rounded-full bg-accent/10 border border-accent/25 text-accent flex items-center justify-center flex-shrink-0 transition-colors group-hover/item:bg-accent group-hover/item:text-white">
                          <Check className="w-2.5 h-2.5" strokeWidth={3} />
                        </span>
                        <span className="text-[14.5px] text-text-primary leading-relaxed">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Column: Focus Areas & Currently Building */}
                <div className="lg:border-l lg:border-border-custom lg:pl-12 flex flex-col">
                  <div className="rounded-2xl border border-border-custom bg-bg/40 p-5 sm:p-6 h-full flex flex-col justify-between gap-6">
                    {/* Focus areas */}
                    <div>
                      <div className="text-xs font-mono font-semibold text-accent mb-2">
                        Focus areas
                      </div>
                      <div className="divide-y divide-border-custom">
                        <div className="flex items-center gap-3 py-3 first:pt-2">
                          <div className="w-8 h-8 rounded-lg bg-bg-surface border border-border-custom flex items-center justify-center flex-shrink-0 text-accent shadow-xs">
                            <Layers className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-text-primary">
                              Full-stack development
                            </div>
                            <div className="text-[12.5px] text-text-secondary leading-normal">
                              Next.js, TypeScript and Tailwind front ends with API backends.
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 py-3 last:pb-0">
                          <div className="w-8 h-8 rounded-lg bg-bg-surface border border-border-custom flex items-center justify-center flex-shrink-0 text-accent shadow-xs">
                            <Brain className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-semibold text-text-primary">
                              AI / ML engineering
                            </div>
                            <div className="text-[12.5px] text-text-secondary leading-normal">
                              LLM security, detection models and applied AI products.
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Currently building */}
                    <div>
                      <div className="text-xs font-mono font-semibold text-accent mb-2">
                        Currently building
                      </div>
                      <div className="divide-y divide-border-custom">
                        <a
                          href="#projects"
                          className="group flex items-center justify-between gap-3 py-3 first:pt-1 focus-visible:outline-2 focus-visible:outline-accent rounded-lg"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-bg-surface border border-border-custom flex items-center justify-center flex-shrink-0 text-accent shadow-xs group-hover:border-accent/40 transition-colors">
                              <ShieldCheck className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                                PromptShield
                              </div>
                              <div className="text-[12.5px] text-text-secondary leading-normal">
                                Prompt injection detection for LLMs.
                              </div>
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" />
                        </a>

                        <a
                          href="#projects"
                          className="group flex items-center justify-between gap-3 py-3 last:pb-1 focus-visible:outline-2 focus-visible:outline-accent rounded-lg"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-8 h-8 rounded-lg bg-bg-surface border border-border-custom flex items-center justify-center flex-shrink-0 text-accent shadow-xs group-hover:border-accent/40 transition-colors">
                              <Bot className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors">
                                CampusAI
                              </div>
                              <div className="text-[12.5px] text-text-secondary leading-normal">
                                Autonomous multilingual AI reception robot kiosk.
                              </div>
                            </div>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-text-secondary group-hover:text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* How I Build Software (Scroll-Driven Steps + Sticky VS Code Window) */}
        <div>
          <ScrollReveal>
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="font-display font-bold text-2xl sm:text-4xl text-text-primary tracking-tight">
                  How I build software
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-accent/10 text-xs font-medium text-blue-700 dark:text-accent tabular-nums">
                <span>Step {activeStepCount} of {WORKFLOW_STEPS.length}</span>
              </div>
            </div>
          </ScrollReveal>

          <div ref={workflowRef} className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: 7 Interactive Steps */}
            <div className="lg:col-span-6 relative pb-12">
              {/* Vertical Continuous GPU Progress Line */}
              <div
                aria-hidden="true"
                className="absolute left-6 top-8 bottom-8 w-0.5 bg-border-custom overflow-hidden rounded-full"
              >
                <motion.div
                  style={{
                    scaleY: shouldReduceMotion ? 1 : smoothProgress,
                  }}
                  className="w-full h-full bg-accent origin-top will-change-transform"
                />
              </div>

              <div className="space-y-6">
                {WORKFLOW_STEPS.map((step, idx) => {
                  const isDone = shouldReduceMotion || idx < activeStepCount;

                  return (
                    <div
                      key={step.id}
                      ref={(el) => {
                        stepRefs.current[idx] = el;
                      }}
                      className="relative pl-14"
                    >
                      {/* Step Status Icon */}
                      <button
                        type="button"
                        onClick={() => scrollToStep(idx)}
                        aria-label={`Scroll to step ${step.id}: ${step.fnName}`}
                        className={`absolute left-0 top-4 w-12 h-12 rounded-2xl flex items-center justify-center border transition-[background-color,border-color,color,transform] duration-200 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-accent active:scale-95 ${
                          isDone
                            ? "bg-accent border-accent text-white"
                            : "bg-bg-surface border-border-custom text-text-secondary hover:border-accent/50"
                        }`}
                      >
                        {isDone ? (
                          <Check className="w-5 h-5" strokeWidth={2.75} />
                        ) : (
                          <span className="font-mono text-xs font-bold">{step.id}</span>
                        )}
                      </button>

                      {/* Step Card */}
                      <button
                        type="button"
                        onClick={() => scrollToStep(idx)}
                        className={`w-full text-left p-5 sm:p-6 rounded-2xl border transition-[background-color,border-color,opacity,transform] duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent active:scale-[0.99] hover:-translate-y-0.5 ${
                          isDone
                            ? "bg-bg-surface border-border-custom hover:border-accent/50 opacity-100 shadow-sm"
                            : "bg-bg-surface/50 border-border-custom/50 opacity-50 hover:opacity-85 hover:border-accent/40"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="font-mono text-xs font-bold text-accent">
                            {step.id}. {step.fnName}()
                          </span>
                          {isDone && (
                            <span className="font-mono text-[10px] text-text-secondary bg-foreground/5 px-2 py-0.5 rounded border border-border-custom">
                              added to solve.ts
                            </span>
                          )}
                        </div>

                        <h4 className="font-display font-bold text-lg text-text-primary mb-1">
                          {step.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                          {step.description}
                        </p>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Sticky VS Code Window with Hover Tilt */}
            <div className="lg:col-span-6 lg:sticky lg:top-24 z-20">
              <ScrollReveal direction="left" delay={0.15} scale={0.98}>
                <div className="transition-transform duration-200 ease-out hover:-translate-y-0.5">
                  <div
                    ref={editorTilt.cardRef}
                    onPointerMove={editorTilt.handlePointerMove}
                    onPointerLeave={editorTilt.handlePointerLeave}
                    style={{
                      transform: shouldReduceMotion
                        ? undefined
                        : "perspective(1200px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg))",
                      transition: shouldReduceMotion
                        ? undefined
                        : "transform var(--tilt-ease, 200ms) cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                    className="rounded-3xl will-change-transform"
                  >
                    <VSCodeEditor
                      activeStepCount={activeStepCount}
                      isTyping={false}
                    />
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
