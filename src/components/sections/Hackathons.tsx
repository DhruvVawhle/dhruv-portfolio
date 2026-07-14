"use client";

import React, { useState } from "react";
import Image from "next/image";
import { hackathons } from "@/lib/data";
import ScrollReveal from "@/components/effects/ScrollReveal";
import Badge from "@/components/ui/Badge";
import TechIcon from "@/components/ui/TechIcon";
import LightboxModal from "@/components/ui/LightboxModal";

const TrophyIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);

export default function Hackathons() {
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
    caption?: string;
  } | null>(null);

  const featured = hackathons[0];
  const secondaryHackathons = hackathons.slice(1);

  return (
    <section id="hackathons" className="py-[var(--section-padding-y)] bg-bg border-b border-border-custom/40 relative overflow-hidden">
      <div className="content-width">
        {/* ── 1. EDITORIAL CHAPTER HEADER ──────────────────────────── */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                05 · COMPETITIVE ENGINEERING
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent/60" />
              <span className="font-mono text-xs text-text-secondary">
                Competitive Engineering
              </span>
            </div>
            <span className="font-mono text-xs text-text-secondary">
              Rapid Prototyping · Applied AI
            </span>
          </div>

          <div className="max-w-2xl mb-14">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary tracking-tight">
              Building under pressure, with a team, against the clock.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed">
              From National-Level Smart India Hackathon prototypes to intensive 24-hour AI agent buildathons.
            </p>
          </div>
        </ScrollReveal>

        {/* ── 2. FEATURED 1.5X SHOWCASE: MEDIMITRA (SIH 2025 ) ── */}
        <ScrollReveal>
          <div className="mb-16">
            <div className="p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-amber-500/10 via-bg-surface to-bg-surface border-2 border-amber-500/50 shadow-xl relative overflow-hidden">
              {/* Top Row: Featured Badge + Trophy Winner Ribbon */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-border-custom/60 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-amber-500 text-black font-mono text-[11px] font-black tracking-wider uppercase shadow-xs min-h-[28px] inline-flex items-center">
                    PARTICIPATED IN SIH 2025
                  </span>
                  <span className="font-mono text-xs text-text-secondary hidden sm:inline">
                    {featured.organizer} · {featured.date}
                  </span>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/40 shadow-xs min-h-[28px]">
                  <TrophyIcon />
                  <span>{featured.badge || "National Level "}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                {/* Left 7 Columns: Editorial Details */}
                <div className="lg:col-span-7">
                  <h3 className="font-display font-extrabold text-2xl sm:text-4xl text-text-primary mb-2">
                    {featured.name}
                  </h3>
                  <div className="font-mono text-xs text-accent mb-6">
                    {featured.roleTeam}
                  </div>

                  {/* High-Signal Editorial Structured Data */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {featured.challenge && (
                      <div className="p-3.5 rounded-xl bg-bg border border-border-custom">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-accent mb-1">
                          Challenge
                        </div>
                        <p className="text-xs text-text-primary leading-relaxed">
                          {featured.challenge}
                        </p>
                      </div>
                    )}
                    {featured.outcome && (
                      <div className="p-3.5 rounded-xl bg-bg border border-border-custom">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-accent mb-1">
                          Outcome
                        </div>
                        <p className="text-xs text-text-primary leading-relaxed">
                          {featured.outcome}
                        </p>
                      </div>
                    )}
                    {featured.role && (
                      <div className="p-3.5 rounded-xl bg-bg border border-border-custom">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-accent mb-1">
                          Role
                        </div>
                        <p className="text-xs text-text-primary leading-relaxed">
                          {featured.role}
                        </p>
                      </div>
                    )}
                    {featured.timeConstraint && (
                      <div className="p-3.5 rounded-xl bg-bg border border-border-custom">
                        <div className="font-mono text-[10px] uppercase tracking-wider text-accent mb-1">
                          Time Constraint
                        </div>
                        <p className="text-xs text-text-primary leading-relaxed">
                          {featured.timeConstraint}
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-[11px] font-mono text-text-secondary uppercase tracking-wider mb-2">
                      Applied Technology Stack
                    </h4>
                    <p className="font-mono text-xs sm:text-sm text-text-primary/90 leading-relaxed">
                      {featured.techStack.join(" · ")}
                    </p>
                  </div>
                </div>

                {/* Right 5 Columns: Interactive WhatsApp Bot Preview */}
                <div className="lg:col-span-5">
                  <div
                    onClick={() =>
                      setLightboxImage({
                        src: "/images/hackathons/medimitra-chatbot.png",
                        alt: `${featured.name} WhatsApp UI Preview`,
                        caption: `${featured.name} (${featured.organizer})`,
                      })
                    }
                    className="group relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-border-custom bg-bg shadow-md cursor-pointer"
                  >
                    <Image
                      src="/images/hackathons/medimitra-chatbot.png"
                      alt={`${featured.name} WhatsApp Bot UI`}
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                    />

                    {/* Enlarge Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-surface text-text-primary font-mono text-xs font-medium shadow-lg transform group-hover:scale-[1.03] transition-transform">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8" />
                          <line x1="21" y1="21" x2="16.65" y2="16.65" />
                          <line x1="11" y1="8" x2="11" y2="14" />
                          <line x1="8" y1="11" x2="14" y2="11" />
                        </svg>
                        Enlarge Screenshot
                      </span>
                    </div>

                    <div className="absolute inset-x-3 bottom-3 p-2.5 rounded-xl bg-bg-surface/90 backdrop-blur-md border border-border-custom/80 font-mono text-[11px] text-text-secondary">
                      WhatsApp RAG Assistant · n8n + Gemini
                    </div>
                  </div>
                </div>
              </div>

              {/* ── MEDIMITRA CASE STUDY & CONTRIBUTION ── */}
              <div className="mt-10 pt-8 border-t border-border-custom/60 relative z-10 space-y-8">
                {/* Metadata Pills */}
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    "Smart India Hackathon 2025",
                    "AI Healthcare",
                    "WhatsApp Bot",
                    "Gemini AI",
                    "n8n",
                    "MongoDB",
                  ].map((pill) => (
                    <Badge
                      key={pill}
                      variant="outline"
                      className="font-mono text-xs py-1 px-3 bg-bg border-border-custom text-text-primary shadow-xs"
                    >
                      {pill}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  {/* Left 7 Columns: Case Study Description + Notion/Figma Card */}
                  <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                    <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-2">
                        Case Study
                      </div>
                      <p className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-[520px]">
                        Explore the Smart India Hackathon submission covering the complete engineering process—from AI architecture and workflow orchestration to deployment strategy, technical decisions, and expected impact.
                      </p>
                    </div>

                    {/* Premium Notion/Figma Document Preview Card */}
                    <div className="group/doc rounded-2xl bg-bg border border-border-custom hover:border-accent/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between">
                      <div className="p-5 sm:p-6 border-b border-border-custom/60 bg-bg-surface/50 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 text-lg">
                            📄
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-base sm:text-lg text-text-primary group-hover/doc:text-accent transition-colors">
                              MediMitra AI Healthcare Case Study
                            </h4>
                            <span className="font-mono text-xs text-text-secondary block mt-0.5">
                              3 Pages · Official Technical Document
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center flex-1">
                        {/* Thumbnail */}
                        <div className="sm:col-span-5">
                          <a
                            href="/MediMitra AI Healthcare Case Study.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Preview MediMitra AI Healthcare Case Study document"
                            className="block relative aspect-[4/3] w-full rounded-xl overflow-hidden border border-border-custom bg-black/40 group/img shadow-sm"
                          >
                            <Image
                              src="/images/hackathons/medimitra-case-study-preview.png"
                              alt="MediMitra AI Healthcare Case Study Preview Thumbnail"
                              fill
                              sizes="(max-width:768px) 100vw, 300px"
                              loading="lazy"
                              className="object-cover object-top group-hover/img:scale-[1.03] transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="font-mono text-xs font-semibold px-3 py-1.5 rounded-full bg-bg-surface text-text-primary shadow-md">
                                Preview Document
                              </span>
                            </div>
                          </a>
                        </div>

                        {/* Table of Contents + Action Button */}
                        <div className="sm:col-span-7 flex flex-col justify-between h-full space-y-5">
                          <div className="space-y-2.5">
                            <div className="font-mono text-[11px] uppercase tracking-wider text-text-secondary/80 font-semibold">
                              Included Sections
                            </div>
                            <ul className="space-y-1.5 text-xs sm:text-sm text-text-primary font-mono">
                              <li className="flex items-center gap-2.5">
                                <span className="text-accent text-[10px]">◆</span>
                                <span>Project Overview</span>
                              </li>
                              <li className="flex items-center gap-2.5">
                                <span className="text-accent text-[10px]">◆</span>
                                <span>Technical Architecture</span>
                              </li>
                              <li className="flex items-center gap-2.5">
                                <span className="text-accent text-[10px]">◆</span>
                                <span>Expected Impact</span>
                              </li>
                            </ul>
                          </div>

                          <div>
                            <a
                              href="/MediMitra AI Healthcare Case Study.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              title="Technical architecture, implementation and project impact."
                              aria-label="View MediMitra AI Healthcare Case Study PDF in a new tab"
                              className="group/btn inline-flex items-center justify-center gap-2.5 text-sm sm:text-base font-mono font-bold text-accent hover:text-text-primary transition-colors min-h-[52px] sm:min-h-[54px] py-3.5 px-6 rounded-xl bg-accent/15 hover:bg-accent/25 w-full sm:w-auto shadow-xs border border-accent/20"
                            >
                              <span>📄 View Case Study</span>
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.2"
                                className="transform group-hover/btn:translate-x-0.5 transition-transform"
                              >
                                <path d="M5 12h14" />
                                <path d="m12 5 7 7-7 7" />
                              </svg>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right 5 Columns: My Contribution Card */}
                  <div className="lg:col-span-5 flex flex-col">
                    <div className="group/contrib rounded-2xl bg-bg border border-border-custom hover:border-accent/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-4 pb-3.5 border-b border-border-custom/60">
                          <h4 className="font-display font-bold text-base sm:text-lg text-text-primary">
                            My Contribution
                          </h4>
                          <span className="font-mono text-xs text-accent font-semibold px-2.5 py-1 rounded-md bg-accent/10 border border-accent/20">
                            9 Key Areas
                          </span>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-2.5 gap-x-4">
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
                          ].map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary leading-relaxed"
                            >
                              <span className="text-accent font-bold mt-0.5 text-xs shrink-0">
                                ✓
                              </span>
                              <span className="font-medium text-text-primary/90">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* ── 3. SECONDARY HACKATHONS GRID ─────────────────────────── */}
        <ScrollReveal>
          <div className="mb-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-text-secondary">
              OTHER HACKATHONS &amp; BUILDATHONS
            </h3>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {secondaryHackathons.map((hackathon, index) => (
            <ScrollReveal
              key={hackathon.id}
              delay={index * 0.1}
              className="h-full"
            >
              <div className="group p-6 sm:p-8 rounded-2xl bg-bg-surface border border-border-custom hover:border-accent/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs text-accent font-bold">
                      {hackathon.date}
                    </span>
                    <span className="font-mono text-xs text-text-secondary">
                      {hackathon.organizer}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-text-primary mb-1 group-hover:text-accent transition-colors">
                    {hackathon.name}
                  </h3>
                  <div className="font-mono text-xs text-text-secondary mb-4">
                    {hackathon.roleTeam}
                  </div>

                  {hackathon.image && (
                    <div
                      onClick={() =>
                        setLightboxImage({
                          src: hackathon.image!,
                          alt: `${hackathon.name} Certificate`,
                          caption: `${hackathon.name} (${hackathon.organizer})`,
                        })
                      }
                      className="group/img relative aspect-[16/10] w-full rounded-xl overflow-hidden border border-border-custom bg-black/40 mb-5 cursor-pointer shadow-sm"
                    >
                      <Image
                        src={hackathon.image}
                        alt={`${hackathon.name} Certificate Preview`}
                        fill
                        sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                        className="object-cover group-hover/img:scale-[1.03] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-surface text-text-primary font-mono text-xs font-medium shadow-md">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="11" y1="8" x2="11" y2="14" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                          </svg>
                          Enlarge Certificate
                        </span>
                      </div>
                    </div>
                  )}

                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {hackathon.description}
                  </p>

                  {hackathon.outcome && (
                    <div className="p-3.5 rounded-xl bg-bg border border-border-custom mb-6">
                      <div className="font-mono text-[10px] uppercase tracking-wider text-accent mb-0.5 font-bold">
                        Outcome
                      </div>
                      <div className="text-xs text-text-primary leading-relaxed">
                        {hackathon.outcome}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-border-custom/40">
                  <p className="font-mono text-xs text-text-secondary">
                    {hackathon.techStack.join(" · ")}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <LightboxModal
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
        src={lightboxImage?.src || ""}
        alt={lightboxImage?.alt || ""}
        caption={lightboxImage?.caption}
      />
    </section>
  );
}
