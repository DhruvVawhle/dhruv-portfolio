"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "@/lib/data";
import Badge from "@/components/ui/Badge";
import TechIcon from "@/components/ui/TechIcon";
import ProductShowcaseGallery, {
  ShowcaseSlide,
} from "@/components/ui/ProductShowcaseGallery";

interface CaseStudyModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

interface ProjectTheme {
  name: string;
  badgeBg: string;
  glowBg: string;
  dotColor: string;
  accentText: string;
  primaryBtn: string;
}

const PROJECT_THEMES: Record<string, ProjectTheme> = {
  krishisaathi: {
    name: "neutral",
    badgeBg: "bg-white/10 text-white border border-white/20",
    glowBg: "from-white/5 via-transparent to-transparent",
    dotColor: "bg-white",
    accentText: "text-gray-300",
    primaryBtn:
      "bg-white hover:bg-gray-200 text-black font-mono font-bold shadow-md",
  },
  medtalk: {
    name: "neutral",
    badgeBg: "bg-white/10 text-white border border-white/20",
    glowBg: "from-white/5 via-transparent to-transparent",
    dotColor: "bg-white",
    accentText: "text-gray-300",
    primaryBtn:
      "bg-white hover:bg-gray-200 text-black font-mono font-bold shadow-md",
  },
};

const DEFAULT_THEME: ProjectTheme = {
  name: "neutral",
  badgeBg: "bg-white/10 text-white border border-white/20",
  glowBg: "from-white/5 via-transparent to-transparent",
  dotColor: "bg-white",
  accentText: "text-gray-300",
  primaryBtn:
    "bg-white hover:bg-gray-200 text-black font-mono font-bold shadow-md",
};

const PROJECT_SHOWCASE_SLIDES: Record<string, ShowcaseSlide[]> = {
  krishisaathi: [
    {
      src: "/images/projects/krishisaathi-homepage.png",
      title: "Marketplace Homepage",
      description:
        "Browse fresh produce directly from verified farmers without middlemen.",
      caption: "Homepage — Direct-to-buyer agricultural trading",
    },
    {
      src: "/images/projects/krishisaathi-login.png",
      title: "Role-Based Authentication",
      description:
        "Secure multi-language onboarding tailored for agricultural farmers and buyers.",
      caption: "Login — Role-based secure authentication",
    },
    {
      src: "/images/projects/krishisaathi-marketplace.png",
      title: "Real-Time Commodity Trading",
      description:
        "Search and filter agricultural commodities by crop type, quality grade, and region.",
      caption: "Marketplace — Filtered search powered by Firestore",
    },
    {
      src: "/images/projects/krishisaathi-buyer-dashboard.png",
      title: "Buyer Management Dashboard",
      description:
        "Track active purchases, review transparent pricing, and manage order deliveries.",
      caption: "Buyer Dashboard — Comprehensive order oversight",
    },
    {
      src: "/images/projects/krishisaathi-farmer-dashboard.png",
      title: "Farmer Analytics Dashboard",
      description:
        "Manage products, track live orders, and monitor crop sales performance in one centralized view.",
      caption: "Farmer Dashboard — Real-time price and order tracking",
    },
    {
      src: "/images/projects/krishisaathi-order-details.png",
      title: "Order Details & Status",
      description:
        "Inspect individual order breakdowns, logistics milestones, and verification proofs.",
      caption: "Order Details — Transparent transaction verification",
    },
    {
      src: "/images/projects/krishisaathi-payment-gateway.png",
      title: "Secure Payment Gateway Integration",
      description:
        "Seamless digital payment processing ensuring protected transactions between buyers and farmers.",
      caption: "Payment Gateway — Escrow-protected checkout flow",
    },
    {
      src: "/images/projects/krishisaathi-purchase-details.png",
      title: "Purchase Details & History",
      description:
        "Complete historical record of transactions, invoices, and commodity specifications.",
      caption: "Purchase Details — End-to-end receipt and tracking",
    },
    {
      src: "/images/projects/krishisaathi-mlforecast.png",
      title: "AI Price Forecasting Engine",
      description:
        "View AI-powered mandi price predictions trained on 18,300+ government AGMARKNET records.",
      caption: "ML Forecast — ARIMA machine learning price models",
    },
  ],
  medtalk: [
    {
      src: "/images/projects/medtalk-aichatbot.png",
      title: "AI Chatbot UI",
      description:
        "Voice-enabled preliminary healthcare guidance powered by Google Gemini NLU.",
      caption: "AI Chatbot UI — Multilingual voice healthcare assistant",
    },
    {
      src: "/images/projects/medtalk-aichatbot.png",
      title: "Expandable Image View",
      description:
        "Instant speech-to-text interaction across regional vernacular languages with high accuracy.",
      caption: "Expandable Image — Speech recognition and voice synthesis",
    },
    {
      src: "/images/projects/medtalk-aichatbot.png",
      title: "Preliminary Medical Guidance",
      description:
        "Zoom on click & Lightbox modal inspection for 24/7 medical query resolution and triage.",
      caption: "Preliminary Guidance — Zoom on click and Lightbox support",
    },
  ],
};

const PROJECT_DISPLAY_MODES: Record<string, "desktop" | "mobile"> = {
  krishisaathi: "desktop",
  medtalk: "desktop",
};

const PROJECT_LEARNINGS: Record<string, string> = {
  krishisaathi:
    "Designing a hybrid Firestore + MongoDB architecture demonstrated how to decouple real-time session synchronization from high-throughput commodity catalog queries. Optimizing ARIMA inference on 18,300+ government market records highlighted the importance of edge-caching market forecasts to maintain sub-200ms API response times across regional rural networks.",
  medtalk:
    "Building a medical assistant for underserved rural communities underscored the necessity of voice-first multilingual UX design and rigorous input sanitization when transcribing speech-to-text medical queries.",
};

const ShieldIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const ExternalIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function CaseStudyModal({
  project,
  isOpen,
  onClose,
}: CaseStudyModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const theme = PROJECT_THEMES[project.id] || DEFAULT_THEME;
  const slides = PROJECT_SHOWCASE_SLIDES[project.id] || [];
  const displayMode = PROJECT_DISPLAY_MODES[project.id] || "desktop";
  const learnings = PROJECT_LEARNINGS[project.id];

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Drawer / Container with Mask Reveal and Scaling Transition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 30, clipPath: "inset(8% 8% 8% 8% round 32px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 24px)" }}
            exit={{ opacity: 0, scale: 0.95, y: 20, clipPath: "inset(5% 5% 5% 5% round 32px)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#111318] border border-border-custom text-white shadow-2xl z-10 scrollbar-thin"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Subtle top glow bar */}
            <div
              className={`absolute top-0 inset-x-0 h-40 bg-gradient-to-b ${theme.glowBg} pointer-events-none rounded-t-3xl`}
            />

            {/* Top Bar / Sticky Header */}
            <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#111318]/90 backdrop-blur-xl border-b border-border-custom/80">
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full font-mono text-xs font-bold uppercase ${theme.badgeBg}`}
                >
                  TECHNICAL DEEP DIVE
                </span>
                <span className="font-mono text-xs text-text-secondary">
                  {project.period}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-text-secondary hover:text-white transition-colors cursor-pointer"
                aria-label="Close Technical Deep Dive"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Modal Content Body with Sequential Section Animations */}
            <div className="p-6 sm:p-8 lg:p-12 space-y-12">
              {/* ── HERO BANNER ─────────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                  <h2
                    id="case-study-title"
                    className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight"
                  >
                    {project.title}
                  </h2>
                  {project.copyrightFiled && (
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-gray-300 font-mono text-xs border border-white/20">
                      <ShieldIcon />
                      <span>
                        Copyright Registered · Diary No.{" "}
                        {project.copyrightFiled.diaryNumber}
                      </span>
                    </div>
                  )}
                </div>
                <p
                  className={`font-mono text-sm sm:text-base ${theme.accentText} uppercase tracking-wider`}
                >
                  {project.subtitle}
                </p>
              </motion.div>

              {/* ── 1. THE PROBLEM vs 2. THE SOLUTION STORYTELLING GRID ── */}
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
              >
                <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <h3 className="font-mono text-xs font-bold text-red-400 uppercase tracking-widest">
                      01 · THE PROBLEM
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={`w-2 h-2 rounded-full ${theme.dotColor}`}
                    />
                    <h3
                      className={`font-mono text-xs font-bold uppercase tracking-widest ${theme.accentText}`}
                    >
                      02 · THE SOLUTION &amp; APPROACH
                    </h3>
                  </div>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {project.approach}
                  </p>
                </div>
              </motion.div>

              {/* ── 3. INTERACTIVE PRODUCT SHOWCASE GALLERY ──────────────── */}
              {slides.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                  className="pt-2"
                >
                  <ProductShowcaseGallery
                    slides={slides}
                    displayMode={displayMode}
                    accentName={theme.name}
                  />
                </motion.div>
              )}

              {/* ── 4. ENGINEERING ARCHITECTURE & TECH STACK ────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] as const }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-white/10"
              >
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest">
                    04 · ENGINEERING ARCHITECTURE
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {project.architecture}
                  </p>
                </div>

                <div className="lg:col-span-5">
                  <h3 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    APPLIED TECHNOLOGY STACK
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="outline"
                        className="inline-flex items-center gap-1.5 text-xs py-1 px-2.5 bg-white/[0.04] border-white/15 text-gray-200"
                      >
                        <TechIcon name={tech} size="sm" />
                        <span>{tech}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* ── 5. PRODUCTION RESULTS & METRICS ────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                className="pt-4 border-t border-white/10"
              >
                <h3 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">
                  05 · PRODUCTION RESULTS &amp; OUTCOMES
                </h3>

                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="p-5 rounded-2xl bg-white/[0.04] border border-white/10"
                      >
                        <div className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                          {metric.value}
                          {metric.suffix}
                        </div>
                        <div className="font-mono text-xs uppercase tracking-wider text-gray-400 mt-1">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <ul className="space-y-2.5">
                  {project.outcomes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm sm:text-base text-gray-300"
                    >
                      <span
                        className={`font-bold mt-1 text-xs ${theme.accentText}`}
                      >
                        ◆
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* ── 6. KEY LEARNINGS & REFLECTIONS ────────────────────── */}
              {learnings && (
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
                  className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10"
                >
                  <h3 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                    06 · ARCHITECTURAL LEARNINGS &amp; REFLECTIONS
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed italic">
                    &ldquo;{learnings}&rdquo;
                  </p>
                </motion.div>
              )}

              {/* ── FOOTER ACTION LINKS ───────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4"
              >
                <div className="flex flex-wrap items-center gap-3">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                        link.icon === "external"
                          ? theme.primaryBtn
                          : "bg-white/10 hover:bg-white/15 text-white border border-white/15"
                      }`}
                    >
                      {link.icon === "github" && <GithubIcon />}
                      {link.icon === "external" && <ExternalIcon />}
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl font-mono text-xs text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  Close Technical Deep Dive
                </button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
