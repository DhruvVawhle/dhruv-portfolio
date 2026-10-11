"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { OTHER_COMPETITIONS, HackathonCard } from "@/data/experienceAndCompetitions";
import ScrollReveal from "@/components/effects/ScrollReveal";
import PreviewDialog from "@/components/ui/PreviewDialog";

/* ── Chat Sequence Definition ────────────────────────── */
interface ChatMsg {
  sender: "bot" | "user";
  text: string;
}

const CHAT_SCRIPT: ChatMsg[] = [
  { sender: "bot", text: "What is your gender? (Male / Female / Other)" },
  { sender: "user", text: "Male" },
  { sender: "bot", text: "Which language do you feel more comfortable with? (English / Hindi / Marathi)" },
  { sender: "user", text: "English" },
  { sender: "bot", text: "Thank you! Now please describe your symptoms briefly." },
];

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

  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [chatStep, setChatStep] = useState<number>(0);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [hasScrolledIntoView, setHasScrolledIntoView] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  const heroSectionRef = useRef<HTMLDivElement>(null);

  // Check reduced motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }
  }, []);

  // WhatsApp chat animation on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledIntoView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (heroSectionRef.current) {
      observer.observe(heroSectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Chat message step progression
  useEffect(() => {
    if (!hasScrolledIntoView) return;
    if (prefersReducedMotion) {
      setChatStep(CHAT_SCRIPT.length);
      return;
    }

    if (chatStep < CHAT_SCRIPT.length) {
      const nextMsg = CHAT_SCRIPT[chatStep];
      if (nextMsg.sender === "bot") {
        setIsTyping(true);
        const timer = setTimeout(() => {
          setIsTyping(false);
          setChatStep((prev) => prev + 1);
        }, 1100);
        return () => clearTimeout(timer);
      } else {
        const timer = setTimeout(() => {
          setChatStep((prev) => prev + 1);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [hasScrolledIntoView, chatStep, prefersReducedMotion]);

  const replayChat = () => {
    setChatStep(0);
    setIsTyping(false);
    setHasScrolledIntoView(true);
  };

  /* ── Spotlight Component for Bento Tiles ───────────────── */
  const BentoTile = ({
    children,
    className = "",
    isWarm = false,
  }: {
    children: React.ReactNode;
    className?: string;
    isWarm?: boolean;
  }) => {
    const tileRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(-500);
    const mouseY = useMotionValue(-500);

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = tileRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    const onMouseLeave = () => {
      mouseX.set(-500);
      mouseY.set(-500);
    };

    return (
      <div
        ref={tileRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`relative rounded-3xl bg-bg-surface border border-border-custom p-6 sm:p-8 overflow-hidden group shadow-sm transition-all duration-300 ${className}`}
      >
        {/* Spotlight Radial Glow following cursor */}
        <motion.div
          style={{
            left: mouseX,
            top: mouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className={`pointer-events-none absolute w-80 h-80 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isWarm ? "bg-amber-500/20" : "bg-accent/15"
          }`}
        />
        <div className="relative z-10 h-full flex flex-col justify-between">
          {children}
        </div>
      </div>
    );
  };

  return (
    <section
      id="hackathons"
      className="py-[var(--section-padding-y)] bg-bg relative"
      aria-label="Competitive Engineering Section"
    >
      <div className="content-width">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                04 · COMPETITIVE ENGINEERING
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent/60" />
              <span className="font-mono text-xs text-text-secondary">
                Building under pressure, with a team, against the clock.
              </span>
            </div>
            <span className="font-mono text-xs text-text-secondary">
              Rapid prototyping / applied AI
            </span>
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

        {/* ── BENTO GRID (12 Columns Desktop, 1 Column Mobile) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          {/* 1. HERO TILE (7 Cols, 2 Rows) with Warm Orange Border Beam */}
          <div
            ref={heroSectionRef}
            className="lg:col-span-7 lg:row-span-2 relative rounded-3xl bg-bg-surface border-2 border-amber-500/40 p-6 sm:p-8 overflow-hidden shadow-md flex flex-col justify-between group"
          >
            {/* Animated Magic UI-style Border Beam in warm orange */}
            {!prefersReducedMotion && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-[2px] rounded-3xl overflow-hidden"
              >
                <div className="border-beam-line absolute -inset-[100%] rounded-full bg-[conic-gradient(from_0deg,transparent_0_300deg,#f59e0b_360deg)] opacity-60 animate-[spin_5s_linear_infinite]" />
                <div className="absolute inset-[2px] rounded-3xl bg-bg-surface" />
              </div>
            )}

            <div className="relative z-10">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                  Participated in SIH 2025
                </span>
                <span className="px-3 py-1 rounded-full bg-foreground/5 border border-border-custom text-text-secondary font-mono text-xs">
                  National level / SIH 2025
                </span>
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl text-text-primary tracking-tight mb-1">
                MediMitra
              </h3>
              <p className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold mb-4">
                Team Lead / Team MediMitra (6 members)
              </p>

              <div className="p-4 rounded-2xl bg-amber-500/[0.04] border border-amber-500/20 mb-6">
                <span className="font-mono text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                  Challenge
                </span>
                <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Public health awareness in rural communities limited by low internet bandwidth and lack of medical app adoption.
                </p>
              </div>

              {/* Phone Mockup with WhatsApp-Style Chat */}
              <div className="w-full max-w-md mx-auto rounded-2xl border border-border-custom bg-black/5 dark:bg-black/30 p-4 shadow-inner">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-border-custom/80 font-mono text-xs">
                  <span className="flex items-center gap-2 text-text-primary font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    MediMitra AI Bot
                  </span>
                  <button
                    onClick={replayChat}
                    className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline font-semibold cursor-pointer"
                  >
                    ↻ Replay
                  </button>
                </div>

                <div className="space-y-2.5 min-h-[190px] flex flex-col justify-end">
                  {CHAT_SCRIPT.slice(0, chatStep).map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                          msg.sender === "user"
                            ? "bg-emerald-600 text-white rounded-br-none"
                            : "bg-bg-surface border border-border-custom text-text-primary rounded-bl-none shadow-xs"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="px-3.5 py-2 rounded-2xl bg-bg-surface border border-border-custom text-text-secondary text-xs flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 2. STATS TILE (5 Cols) with Magic UI Number Ticker */}
          <BentoTile className="lg:col-span-5" isWarm={true}>
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-4">
                National Sprint Metrics
              </span>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-bg border border-border-custom">
                  <div className="font-display font-black text-2xl sm:text-3xl text-amber-600 dark:text-amber-400">
                    Top 30
                  </div>
                  <span className="font-mono text-[11px] text-text-secondary mt-1 block">
                    SIH 2025 college finalists
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-bg border border-border-custom">
                  <div className="font-display font-black text-2xl sm:text-3xl text-text-primary">
                    6
                  </div>
                  <span className="font-mono text-[11px] text-text-secondary mt-1 block">
                    Team MediMitra members
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-bg border border-border-custom">
                  <div className="font-display font-black text-2xl sm:text-3xl text-accent">
                    24 hr
                  </div>
                  <span className="font-mono text-[11px] text-text-secondary mt-1 block">
                    Analytix 2026 Datathon
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-bg border border-border-custom">
                  <div className="font-display font-black text-2xl sm:text-3xl text-accent">
                    12 hr
                  </div>
                  <span className="font-mono text-[11px] text-text-secondary mt-1 block">
                    Buildathon, Team Edith
                  </span>
                </div>
              </div>
            </div>
          </BentoTile>

          {/* 3. FACTS TILE (5 Cols) */}
          <BentoTile className="lg:col-span-5">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent block mb-3">
                Key Facts
              </span>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div>
                  <span className="font-mono text-[11px] font-semibold text-text-secondary uppercase block">
                    Role:
                  </span>
                  <p className="text-text-primary mt-0.5 leading-relaxed font-medium">
                    Team Lead and AI Architect. Designed the n8n workflow automation and multilingual Gemini NLU pipeline.
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[11px] font-semibold text-text-secondary uppercase block">
                    Outcome:
                  </span>
                  <p className="text-text-primary mt-0.5 leading-relaxed font-medium">
                    Selected among Top 30 college finalists for Smart India Hackathon software-track submission.
                  </p>
                </div>

                <div>
                  <span className="font-mono text-[11px] font-semibold text-text-secondary uppercase block">
                    Time constraint:
                  </span>
                  <p className="text-text-primary mt-0.5 font-mono text-xs">
                    SIH National Software Sprint.
                  </p>
                </div>
              </div>
            </div>
          </BentoTile>

          {/* 4. STACK TILE (Full Width, 12 Cols) with Animated Beam Flow & Marquee */}
          <BentoTile className="lg:col-span-12">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent block mb-4">
                Architecture Flow: Patient To Storage
              </span>

              {/* Animated Beam Nodes */}
              <div className="relative py-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative z-10">
                  {[
                    { node: "WhatsApp API", role: "patient conversation" },
                    { node: "n8n", role: "workflow automation" },
                    { node: "Gemini API", role: "multilingual NLU" },
                    { node: "MongoDB", role: "data storage" },
                  ].map((item, idx) => (
                    <div
                      key={item.node}
                      className="p-4 rounded-2xl bg-bg border border-border-custom flex flex-col items-center text-center relative shadow-xs"
                    >
                      <span className="font-mono text-xs font-bold text-accent">
                        {item.node}
                      </span>
                      <span className="font-mono text-[11px] text-text-secondary mt-1">
                        ({item.role})
                      </span>
                      {idx < 3 && (
                        <span className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-accent font-bold z-20">
                          →
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Marquee Tags with pause on hover */}
              <div className="mt-6 pt-4 border-t border-border-custom/80 overflow-hidden group/marquee">
                <div className="flex gap-3 whitespace-nowrap animate-[marquee_18s_linear_infinite] group-hover/marquee:[animation-play-state:paused]">
                  {[
                    "Smart India Hackathon 2025",
                    "AI Healthcare",
                    "WhatsApp Bot",
                    "Gemini AI",
                    "n8n",
                    "MongoDB",
                    "Smart India Hackathon 2025",
                    "AI Healthcare",
                    "WhatsApp Bot",
                    "Gemini AI",
                    "n8n",
                    "MongoDB",
                  ].map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3.5 py-1.5 rounded-full bg-foreground/5 border border-border-custom font-mono text-xs text-text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </BentoTile>

          {/* 5. CONTRIBUTION TILE (5 Cols) with Key Areas Badge */}
          <BentoTile className="lg:col-span-5">
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent">
                  Contributions
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 font-mono text-[10px] text-accent font-semibold">
                  Key areas
                </span>
              </div>

              <div className="space-y-1.5">
                {[
                  "Team Lead",
                  "AI Workflow Design",
                  "Gemini API Integration",
                  "n8n Workflow Development",
                  "WhatsApp Conversation Flow",
                  "Backend Architecture",
                  "MongoDB Design",
                  "Technical Documentation",
                  "Smart India Hackathon Submission",
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-bg border border-border-custom font-mono text-xs text-text-primary flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </BentoTile>

          {/* 6. CASE STUDY TILE (7 Cols) with 3D Depth Card */}
          <BentoTile className="lg:col-span-7">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent block mb-3">
                Technical Case Study
              </span>

              <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-6">
                Explore the Smart India Hackathon submission covering the complete engineering process, from AI architecture and workflow orchestration to deployment strategy, technical decisions, and expected impact.
              </p>

              {/* Document Card with Visual Preview */}
              <div
                onClick={() =>
                  setDialogState({
                    isOpen: true,
                    title: "MediMitra AI Healthcare Case Study",
                    imageSrc: "/images/hackathons/medimitra-case-study-preview.png",
                    pdfSrc: "/medimitra-case-study.pdf",
                    subtitle: "Smart India Hackathon 2025 Submission",
                  })
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setDialogState({
                      isOpen: true,
                      title: "MediMitra AI Healthcare Case Study",
                      imageSrc: "/images/hackathons/medimitra-case-study-preview.png",
                      pdfSrc: "/medimitra-case-study.pdf",
                      subtitle: "Smart India Hackathon 2025 Submission",
                    });
                  }
                }}
                className="p-5 rounded-2xl bg-bg border border-border-custom mb-6 cursor-pointer group/study hover:border-accent/60 transition-all shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h4 className="font-display font-bold text-base text-text-primary group-hover/study:text-accent transition-colors">
                    MediMitra AI Healthcare Case Study
                  </h4>
                  <span className="font-mono text-[11px] text-accent font-semibold">
                    Technical Presentation &amp; Architecture Document
                  </span>
                </div>

                {/* Visible Document Thumbnail */}
                <div className="relative w-full aspect-[16/9] max-h-48 rounded-xl border border-border-custom bg-black/5 dark:bg-black/40 overflow-hidden mb-3">
                  <img
                    src="/images/hackathons/medimitra-case-study-preview.png"
                    alt="MediMitra AI Healthcare Case Study Preview"
                    className="w-full h-full object-cover object-top group-hover/study:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/study:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-bg-surface text-text-primary font-mono text-xs font-bold shadow-lg">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                      <span>Click to View Presentation / PDF</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-[11px] font-mono text-text-secondary">
                  <span className="px-2 py-0.5 rounded bg-bg-surface border border-border-custom">
                    Project Overview
                  </span>
                  <span className="px-2 py-0.5 rounded bg-bg-surface border border-border-custom">
                    Technical Architecture
                  </span>
                  <span className="px-2 py-0.5 rounded bg-bg-surface border border-border-custom">
                    Expected Impact
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setDialogState({
                      isOpen: true,
                      title: "MediMitra AI Healthcare Case Study",
                      imageSrc: "/images/hackathons/medimitra-case-study-preview.png",
                      pdfSrc: "/medimitra-case-study.pdf",
                      subtitle: "Smart India Hackathon 2025 Submission",
                    })
                  }
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-accent text-white font-mono text-xs font-bold hover:bg-accent/90 transition-colors cursor-pointer shadow-md"
                >
                  <span>View presentation / case study ↗</span>
                </button>

                <a
                  href="/medimitra-case-study.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-border-custom bg-bg-surface hover:border-accent hover:text-accent font-mono text-xs font-semibold text-text-secondary transition-colors"
                >
                  <span>Open PDF in new tab ↗</span>
                </a>
              </div>
            </div>
          </BentoTile>
        </div>

        {/* ── FOCUS CARDS: OTHER HACKATHONS AND BUILDATHONS ── */}
        <div className="pt-8 border-t border-border-custom/60">
          <ScrollReveal>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-text-primary tracking-tight mb-8">
              Other hackathons and buildathons
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OTHER_COMPETITIONS.map((comp) => {
              const isDimmed = hoveredCardId !== null && hoveredCardId !== comp.id;

              return (
                <div
                  key={comp.id}
                  onMouseEnter={() => setHoveredCardId(comp.id)}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className={`relative p-6 sm:p-8 rounded-3xl bg-bg-surface border border-border-custom shadow-sm transition-all duration-300 ${
                    isDimmed ? "opacity-35 blur-[1px]" : "opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="font-mono text-xs font-bold text-accent">
                      {comp.period} · {comp.team}
                    </span>
                    <span className="font-mono text-[11px] text-text-secondary">
                      Competitive Sprint
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-xl text-text-primary mb-3">
                    {comp.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                    &ldquo;{comp.quote}&rdquo;
                  </p>

                  <div className="p-3.5 rounded-2xl bg-bg border border-border-custom mb-6">
                    <span className="font-mono text-[10px] uppercase text-text-secondary block font-semibold mb-0.5">
                      Outcome
                    </span>
                    <p className="font-mono text-xs text-text-primary">
                      {comp.outcome}
                    </p>
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
                      className="relative w-full aspect-[16/9] max-h-48 rounded-2xl border border-border-custom bg-black/5 dark:bg-black/40 overflow-hidden mb-4 cursor-pointer group/cardthumb hover:border-accent/60 transition-all shadow-xs"
                    >
                      <img
                        src={comp.certificateImage}
                        alt={`${comp.title} Certificate`}
                        className="w-full h-full object-cover object-top group-hover/cardthumb:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cardthumb:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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

                  {comp.certificateImage && (
                    <button
                      type="button"
                      onClick={() =>
                        setDialogState({
                          isOpen: true,
                          title: comp.title,
                          imageSrc: comp.certificateImage,
                          subtitle: `${comp.period} · ${comp.team}`,
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent/10 hover:bg-accent/20 text-accent font-mono text-xs font-semibold border border-accent/20 transition-colors cursor-pointer"
                    >
                      <span>View certificate ↗</span>
                    </button>
                  )}
                </div>
              );
            })}
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

