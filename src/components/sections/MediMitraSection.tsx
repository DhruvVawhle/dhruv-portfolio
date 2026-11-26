"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ShieldAlert,
  Database,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Bot,
  Workflow,
  Radio,
  Clock,
  Layers,
  GitFork,
  FileText,
} from "lucide-react";

const WhatsAppLiveChat = dynamic(
  () => import("@/components/ui/WhatsAppLiveChat"),
  { ssr: false }
);

const N8nLiveWorkflow = dynamic(
  () => import("@/components/ui/N8nLiveWorkflow"),
  { ssr: false }
);

interface MediMitraSectionProps {
  onOpenCaseStudy: () => void;
}

export default function MediMitraSection({ onOpenCaseStudy }: MediMitraSectionProps) {
  const [activeTab, setActiveTab] = useState<"whatsapp" | "workflow" | "casestudy">("whatsapp");

  return (
    <article className="w-full space-y-6 sm:space-y-8" aria-labelledby="medimitra-title">
      {/* ── 1. Master Dossier Header ─────────────────────────────────── */}
      <div className="rounded-2xl sm:rounded-3xl bg-bg-surface border border-border-custom p-4 xs:p-6 sm:p-8 lg:p-10 relative overflow-hidden shadow-xs">
        <div className="max-w-4xl space-y-5 sm:space-y-6">
          {/* Eyebrow & Credential Badges */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-[11px] sm:text-xs font-medium">
              Smart India Hackathon 2025 · PS ID: SIH25049
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-400 font-mono text-[11px] sm:text-xs font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Top 30 National Finalists</span>
            </span>

            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-bg border border-border-custom text-text-secondary font-mono text-[11px] sm:text-xs">
              <GitFork className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Team Lead · 6-Member Squad</span>
            </span>
          </div>

          {/* Title & Core Narrative */}
          <div className="space-y-2.5 sm:space-y-3">
            <h3
              id="medimitra-title"
              className="font-display font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight leading-tight text-pretty"
            >
              MediMitra
            </h3>
            <p className="text-sm xs:text-base sm:text-lg font-medium text-emerald-700 dark:text-emerald-400 text-pretty">
              Multilingual WhatsApp healthcare triage with deterministic emergency escalation
            </p>
            <p className="text-xs xs:text-sm sm:text-base text-text-secondary leading-relaxed max-w-3xl">
              Engineered for rural Indian communities where low internet bandwidth, storage limits, and digital literacy prevent adoption of standard health applications. Patients interact natively through WhatsApp in Hindi, Marathi, and English. Inquiries are parsed through self-hosted n8n workflows and Google Gemini 1.5 Flash NLU, with a sub-15ms deterministic bypass intercepting life-threatening symptoms directly to 108/112 emergency services.
            </p>
          </div>

          {/* Key Facts Metric Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 pt-1 sm:pt-2">
            <div className="p-3 xs:p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-bg border border-border-custom flex flex-col justify-between">
              <span className="font-mono text-[11px] sm:text-xs text-text-secondary font-medium">
                National standing
              </span>
              <div className="mt-1.5 sm:mt-2">
                <span className="font-display font-bold text-xl xs:text-2xl text-text-primary tabular-nums">
                  Top 30
                </span>
                <p className="text-[10px] xs:text-[11px] text-text-secondary mt-0.5 leading-snug">
                  SIH 2025 college finalists
                </p>
              </div>
            </div>

            <div className="p-3 xs:p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-bg border border-border-custom flex flex-col justify-between">
              <span className="font-mono text-[11px] sm:text-xs text-text-secondary font-medium">
                Dialect coverage
              </span>
              <div className="mt-1.5 sm:mt-2">
                <span className="font-display font-bold text-xl xs:text-2xl text-text-primary">
                  3 Dialects
                </span>
                <p className="text-[10px] xs:text-[11px] text-text-secondary mt-0.5 leading-snug">
                  Hindi, Marathi, English
                </p>
              </div>
            </div>

            <div className="p-3 xs:p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-bg border border-border-custom flex flex-col justify-between">
              <span className="font-mono text-[11px] sm:text-xs text-text-secondary font-medium">
                Safety bypass speed
              </span>
              <div className="mt-1.5 sm:mt-2">
                <span className="font-display font-bold text-xl xs:text-2xl text-emerald-700 dark:text-emerald-400 tabular-nums">
                  &lt; 15ms
                </span>
                <p className="text-[10px] xs:text-[11px] text-text-secondary mt-0.5 leading-snug">
                  Emergency rule execution
                </p>
              </div>
            </div>

            <div className="p-3 xs:p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-bg border border-border-custom flex flex-col justify-between">
              <span className="font-mono text-[11px] sm:text-xs text-text-secondary font-medium">
                Engineering team
              </span>
              <div className="mt-1.5 sm:mt-2">
                <span className="font-display font-bold text-xl xs:text-2xl text-text-primary tabular-nums">
                  6 Engineers
                </span>
                <p className="text-[10px] xs:text-[11px] text-text-secondary mt-0.5 leading-snug">
                  Led by Dhruv Vawhle
                </p>
              </div>
            </div>
          </div>

          {/* Direct Quick Actions */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
            <button
              type="button"
              onClick={onOpenCaseStudy}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent/90 transition-colors cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-accent active:scale-[0.98] touch-manipulation"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Inspect presentation deck (PDF)</span>
            </button>

            <a
              href="https://github.com/DhruvVawhle/MediMitra-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-bg border border-border-custom text-text-primary text-xs font-medium hover:border-accent hover:text-accent transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-accent active:scale-[0.98] touch-manipulation"
            >
              <span>GitHub repository</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-text-secondary" />
            </a>

            <a
              href="/medimitra-case-study.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-bg border border-border-custom text-text-secondary text-xs font-medium hover:text-text-primary hover:border-border-custom transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-accent touch-manipulation"
            >
              <span>Download case study PDF</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── 2. Interactive System Explorer Console ───────────────────── */}
      <div className="rounded-2xl sm:rounded-3xl bg-bg-surface border border-border-custom overflow-hidden shadow-xs">
        {/* Navigation Toolbar */}
        <div className="px-3.5 xs:px-5 py-3 xs:py-4 border-b border-border-custom bg-bg/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-xs text-text-secondary flex-shrink-0">
              Console:
            </span>
            <span className="font-mono text-xs text-text-primary font-medium truncate">
              SIH 2025 Architecture Gateway
            </span>
          </div>

          {/* Segmented View Switcher */}
          <div
            role="tablist"
            aria-label="MediMitra system exploration views"
            className="w-full sm:w-auto overflow-x-auto scrollbar-none flex items-center gap-1 rounded-xl bg-bg p-1 border border-border-custom text-xs font-medium"
          >
            <button
              type="button"
              role="tab"
              id="tab-whatsapp"
              aria-controls="panel-whatsapp"
              aria-selected={activeTab === "whatsapp"}
              onClick={() => setActiveTab("whatsapp")}
              className={`min-h-[40px] px-3 sm:px-3.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap flex-shrink-0 touch-manipulation focus-visible:outline-2 focus-visible:outline-accent active:scale-[0.98] ${
                activeTab === "whatsapp"
                  ? "bg-bg-surface text-text-primary shadow-xs font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <span className="sm:hidden">WhatsApp</span>
              <span className="hidden sm:inline">Patient experience (WhatsApp)</span>
            </button>
            <button
              type="button"
              role="tab"
              id="tab-workflow"
              aria-controls="panel-workflow"
              aria-selected={activeTab === "workflow"}
              onClick={() => setActiveTab("workflow")}
              className={`min-h-[40px] px-3 sm:px-3.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap flex-shrink-0 touch-manipulation focus-visible:outline-2 focus-visible:outline-accent active:scale-[0.98] ${
                activeTab === "workflow"
                  ? "bg-bg-surface text-text-primary shadow-xs font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <span className="sm:hidden">n8n Pipeline</span>
              <span className="hidden sm:inline">Workflow engine (n8n)</span>
            </button>
            <button
              type="button"
              role="tab"
              id="tab-casestudy"
              aria-controls="panel-casestudy"
              aria-selected={activeTab === "casestudy"}
              onClick={() => setActiveTab("casestudy")}
              className={`min-h-[40px] px-3 sm:px-3.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap flex-shrink-0 touch-manipulation focus-visible:outline-2 focus-visible:outline-accent active:scale-[0.98] ${
                activeTab === "casestudy"
                  ? "bg-bg-surface text-text-primary shadow-xs font-semibold"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              <span className="sm:hidden">Case Study</span>
              <span className="hidden sm:inline">Case study deck</span>
            </button>
          </div>
        </div>

        {/* ── TAB 1: PATIENT EXPERIENCE (WhatsApp Cloud Interface) ─────── */}
        {activeTab === "whatsapp" && (
          <div
            id="panel-whatsapp"
            role="tabpanel"
            aria-labelledby="tab-whatsapp"
            className="p-3.5 xs:p-5 sm:p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Left Column: Live WhatsApp Interactive Chat Simulator */}
              <div className="lg:col-span-7 flex flex-col items-center w-full min-w-0">
                <WhatsAppLiveChat />
              </div>

              {/* Right Column: Architectural Context & Design Decisions */}
              <div className="lg:col-span-5 space-y-4 w-full min-w-0">
                <div className="space-y-1 pb-2 border-b border-border-custom">
                  <span className="font-mono text-xs text-accent font-medium">
                    Patient interface design
                  </span>
                  <h4 className="font-display font-bold text-lg sm:text-xl text-text-primary text-pretty">
                    Why WhatsApp for rural triage?
                  </h4>
                </div>

                <div className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-bg border border-border-custom space-y-1.5">
                    <h5 className="font-semibold text-text-primary flex items-center gap-2">
                      <Radio className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Zero app barrier &amp; 2G/3G compatibility</span>
                    </h5>
                    <p className="text-text-secondary leading-relaxed">
                      Rural users often have limited phone storage and low literacy with complex mobile apps. WhatsApp is already active on over 500 million Indian devices, requires no app installation, and transmits lightweight text payloads reliably over spotty rural connections.
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-bg border border-border-custom space-y-1.5">
                    <h5 className="font-semibold text-text-primary flex items-center gap-2">
                      <Bot className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>Trilingual dialect normalization</span>
                    </h5>
                    <p className="text-text-secondary leading-relaxed">
                      Supports Devanagari Hindi, Marathi, and English. Inbound messages are normalized for regional phrasing and colloquial terms before passing structured context to Google Gemini 1.5 Flash.
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-bg border border-border-custom space-y-1.5">
                    <h5 className="font-semibold text-text-primary flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span>Deterministic emergency safety bypass</span>
                    </h5>
                    <p className="text-text-secondary leading-relaxed">
                      Critical warning signs (acute chest pain, severe hemorrhage, respiratory arrest) are evaluated via zero-latency rule matching. Critical cases immediately bypass generative AI to eliminate hallucination risks, issuing urgent contact directives for 108/112 ambulance response.
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-bg border border-border-custom space-y-1.5">
                    <h5 className="font-semibold text-text-primary flex items-center gap-2">
                      <Clock className="w-4 h-4 text-text-secondary flex-shrink-0" />
                      <span>Strict clinical boundaries</span>
                    </h5>
                    <p className="text-text-secondary leading-relaxed">
                      Every output includes a clear statutory disclaimer that advice is general wellness triage and not a medical prescription, instructing users to visit local Primary Health Centres (PHCs) for persistent symptoms.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: WORKFLOW ENGINE (n8n Live Workflow Canvas) ────────── */}
        {activeTab === "workflow" && (
          <div
            id="panel-workflow"
            role="tabpanel"
            aria-labelledby="tab-workflow"
            className="p-3.5 xs:p-5 sm:p-6 space-y-4 sm:space-y-6"
          >
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-bg border border-border-custom flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
              <div className="space-y-1">
                <span className="font-mono text-xs text-accent font-medium">
                  Backend orchestration graph
                </span>
                <h4 className="font-display font-bold text-base sm:text-lg text-text-primary text-pretty">
                  Interactive n8n automation pipeline
                </h4>
                <p className="text-xs text-text-secondary">
                  Step through execution cycles, inspect node inputs/outputs, or toggle between flow and visual canvas views.
                </p>
              </div>

              <div className="hidden xs:flex items-center gap-2 sm:gap-3 text-xs font-mono text-text-secondary overflow-x-auto flex-shrink-0">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Meta Webhook
                </span>
                <span>→</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  Gemini NLU
                </span>
                <span>→</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  Safety Gate
                </span>
              </div>
            </div>

            {/* Embedded Live n8n Workflow Component */}
            <div className="w-full overflow-hidden">
              <N8nLiveWorkflow />
            </div>
          </div>
        )}

        {/* ── TAB 3: CASE STUDY DECK & PRESENTATION ────────────────────── */}
        {activeTab === "casestudy" && (
          <div
            id="panel-casestudy"
            role="tabpanel"
            aria-labelledby="tab-casestudy"
            className="p-3.5 xs:p-5 sm:p-8 space-y-6 sm:space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Visual Presentation Thumbnail */}
              <div className="lg:col-span-7 space-y-4">
                <div className="space-y-1 pb-2 border-b border-border-custom">
                  <span className="font-mono text-xs text-accent font-medium">
                    Smart India Hackathon 2025 presentation
                  </span>
                  <h4 className="font-display font-bold text-xl sm:text-2xl text-text-primary text-pretty">
                    MediMitra technical case study (12-slide deck)
                  </h4>
                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
                    Official submission deck covering user research in rural clinics, dialect normalization architecture, n8n webhook resiliency, and MongoDB Atlas consultation audit schemas.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onOpenCaseStudy}
                  className="relative w-full aspect-[16/9] rounded-xl sm:rounded-2xl border border-border-custom bg-black/5 dark:bg-black/40 overflow-hidden cursor-pointer group shadow-xs hover:border-accent/60 transition-all text-left focus-visible:outline-2 focus-visible:outline-accent active:scale-[0.99] touch-manipulation"
                  aria-label="Enlarge MediMitra AI Healthcare Case Study presentation"
                >
                  <Image
                    src="/images/hackathons/medimitra-case-study-preview.png"
                    alt="MediMitra AI Healthcare Case Study – Multilingual Triage & n8n Architecture Presentation"
                    fill
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-300 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 sm:p-4">
                    <span className="px-3 py-1.5 rounded-xl bg-bg/90 backdrop-blur-md text-text-primary font-mono text-xs font-semibold flex items-center gap-1.5">
                      <span>Click to enlarge presentation preview ↗</span>
                    </span>
                  </div>
                </button>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
                  <button
                    type="button"
                    onClick={onOpenCaseStudy}
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-accent text-white font-mono text-xs font-semibold hover:bg-accent/90 transition-colors cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-accent active:scale-[0.98] touch-manipulation"
                  >
                    <span>Inspect slide deck preview</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href="/medimitra-case-study.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 rounded-xl bg-bg border border-border-custom text-text-primary font-mono text-xs font-medium hover:border-accent transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-accent active:scale-[0.98] touch-manipulation"
                  >
                    <span>Download case study PDF</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-text-secondary" />
                  </a>
                </div>
              </div>

              {/* Architecture & Decision Points */}
              <div className="lg:col-span-5 space-y-4">
                <div className="space-y-1 pb-2 border-b border-border-custom">
                  <span className="font-mono text-xs text-accent font-medium">
                    Technical decisions
                  </span>
                  <h4 className="font-display font-bold text-base sm:text-lg text-text-primary text-pretty">
                    Engineering choices under sprint constraints
                  </h4>
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-bg border border-border-custom space-y-1">
                    <h5 className="font-display font-bold text-sm text-text-primary flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Deterministic safety routing</span>
                    </h5>
                    <p className="text-xs text-text-secondary leading-relaxed pl-6">
                      Excluded generative models from acute emergency triage to guarantee zero hallucination risk and sub-15ms response latency when critical cardiac or trauma symptoms are reported.
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-bg border border-border-custom space-y-1">
                    <h5 className="font-display font-bold text-sm text-text-primary flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Visual orchestration with n8n</span>
                    </h5>
                    <p className="text-xs text-text-secondary leading-relaxed pl-6">
                      Selected n8n over a monolithic backend to allow rapid node-level prototyping, independent API key rotation, visual execution logging, and modular webhook routing during the 36-hour sprint.
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-bg border border-border-custom space-y-1">
                    <h5 className="font-display font-bold text-sm text-text-primary flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>Encrypted audit trail with TTL index</span>
                    </h5>
                    <p className="text-xs text-text-secondary leading-relaxed pl-6">
                      Integrated MongoDB Atlas on AWS Mumbai with automatic 90-day TTL expiration, storing pseudonymized message hashes to support clinical continuity without violating patient data retention policies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── 3. Engineering Leadership & Deliverables ─────────────────── */}
      <div className="rounded-2xl sm:rounded-3xl bg-bg-surface border border-border-custom p-4 xs:p-6 sm:p-8 space-y-5 sm:space-y-6 shadow-xs">
        <div className="space-y-1 border-b border-border-custom pb-3.5 sm:pb-4">
          <span className="font-mono text-xs text-accent font-medium">
            Leadership &amp; engineering ownership
          </span>
          <h4 className="font-display font-bold text-lg sm:text-2xl text-text-primary text-pretty">
            Key contributions as Team Lead
          </h4>
          <p className="text-xs sm:text-sm text-text-secondary">
            Dhruv led a team of 6 engineers across architecture, development, clinical prompt safety, and the final Smart India Hackathon presentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-bg border border-border-custom space-y-2.5 sm:space-y-3">
            <div className="w-8 h-8 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Workflow className="w-4 h-4" />
            </div>
            <h5 className="font-display font-bold text-sm text-text-primary">
              AI &amp; Workflow Architecture
            </h5>
            <p className="text-xs text-text-secondary leading-relaxed">
              Designed the end-to-end n8n workflow pipeline, structured the Google Gemini 1.5 Flash clinical triage system prompts, and authored the deterministic regex emergency rule engine.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-bg border border-border-custom space-y-2.5 sm:space-y-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-700 dark:text-emerald-400">
              <Database className="w-4 h-4" />
            </div>
            <h5 className="font-display font-bold text-sm text-text-primary">
              Backend &amp; API Integration
            </h5>
            <p className="text-xs text-text-secondary leading-relaxed">
              Configured the Meta WhatsApp Cloud API webhooks with HMAC-SHA256 signature verification, managed async node retries, and structured the MongoDB Atlas schema with 90-day TTL indexes.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-bg border border-border-custom space-y-2.5 sm:space-y-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
              <Layers className="w-4 h-4" />
            </div>
            <h5 className="font-display font-bold text-sm text-text-primary">
              Sprint Leadership &amp; SIH Defense
            </h5>
            <p className="text-xs text-text-secondary leading-relaxed">
              Coordinated the 6-member engineering sprint across frontend simulator, backend integration, and clinical verification, delivering the technical presentation that placed in the Top 30 nationally.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
