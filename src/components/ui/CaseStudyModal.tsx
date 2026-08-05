"use client";

import React, { useEffect, useRef } from "react";
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
  imdbsentiment: {
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
        "Seamless digital payment processing ensuring escrow-protected transactions between buyers and farmers.",
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
  imdbsentiment: [
    {
      src: "/images/projects/imdb-sentiment-analysis.png",
      title: "Sentiment Analysis Dashboard",
      description:
        "Visualizing positive and negative sentiment distributions on IMDB movie reviews.",
      caption: "Main Dashboard — Sentiment metrics and text classification stats",
    },
  ],
};

const PROJECT_DISPLAY_MODES: Record<string, "desktop" | "mobile"> = {
  krishisaathi: "desktop",
  medtalk: "desktop",
  imdbsentiment: "desktop",
};

const PROJECT_LEARNINGS: Record<string, string> = {
  krishisaathi:
    "Designing a hybrid Firestore + MongoDB architecture demonstrated how to decouple real-time session synchronization from high-throughput commodity catalog queries. Optimizing ARIMA inference on 18,300+ government market records highlighted the importance of edge-caching market forecasts to maintain sub-200ms API response times across regional rural networks.",
  medtalk:
    "Building a medical assistant for underserved rural communities underscored the necessity of voice-first multilingual UX design and rigorous input sanitization when transcribing speech-to-text medical queries.",
  imdbsentiment:
    "Building this NLP workflow demonstrated the critical role of data cleaning and tokenization strategies in reducing noise before training. I learned to balance model complexity against inference latency, comparing classic statistical models (Logistic Regression, Naive Bayes) with Deep Learning architectures (Keras/TensorFlow).",
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

import FolderTree, { FolderNode } from "@/components/ui/FolderTree";

const KRISHISAATHI_FOLDERS: FolderNode[] = [
  {
    name: "apps",
    type: "folder",
    children: [
      {
        name: "web",
        type: "folder",
        children: [
          { name: "src", type: "folder", children: [{ name: "components", type: "folder" }, { name: "app", type: "folder" }] },
          { name: "package.json", type: "file" }
        ]
      },
      {
        name: "backend",
        type: "folder",
        children: [
          { name: "src", type: "folder", children: [{ name: "controllers", type: "folder" }, { name: "routes", type: "folder" }, { name: "models", type: "folder" }] },
          { name: "package.json", type: "file" }
        ]
      },
      {
        name: "ml-prediction",
        type: "folder",
        children: [
          { name: "arima_model.py", type: "file" },
          { name: "requirements.txt", type: "file" }
        ]
      }
    ]
  },
  {
    name: "packages",
    type: "folder",
    children: [
      { name: "shared-schemas", type: "folder" }
    ]
  },
  { name: "README.md", type: "file" }
];

const MEDTALK_FOLDERS: FolderNode[] = [
  {
    name: "app",
    type: "folder",
    children: [
      { name: "templates", type: "folder" },
      { name: "static", type: "folder" },
      { name: "routes.py", type: "file" }
    ]
  },
  {
    name: "services",
    type: "folder",
    children: [
      { name: "gemini_service.py", type: "file" },
      { name: "speech_service.py", type: "file" }
    ]
  },
  { name: "config.py", type: "file" },
  { name: "requirements.txt", type: "file" }
];

const IMDBSENTIMENT_FOLDERS: FolderNode[] = [
  {
    name: "notebooks",
    type: "folder",
    children: [
      { name: "sentiment_analysis.ipynb", type: "file" }
    ]
  },
  {
    name: "src",
    type: "folder",
    children: [
      { name: "preprocessing.py", type: "file" },
      { name: "model.py", type: "file" },
      { name: "utils.py", type: "file" }
    ]
  },
  { name: "requirements.txt", type: "file" },
  { name: "README.md", type: "file" }
];

function CollapsibleSection({
  title,
  isOpen,
  onToggle,
  children
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/[0.02] transition-colors duration-250">
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-6 py-4 flex items-center justify-between text-left font-display font-bold text-sm sm:text-base text-white hover:bg-white/[0.03] transition-colors focus:outline-none focus-visible:bg-white/[0.04]"
      >
        <span>{title}</span>
        <span className="font-mono text-xs text-text-secondary select-none">
          {isOpen ? "Collapse [-]" : "Expand [+]"}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 pt-2 border-t border-white/10 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}

export default function CaseStudyModal({
  project,
  isOpen,
  onClose,
}: CaseStudyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [sectionsOpen, setSectionsOpen] = React.useState({
    overview: true,
    architecture: false,
    folder: false,
    decisions: false,
    challenges: false,
    deployment: false,
    improvements: false
  });

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex="0"]'
        );
        if (focusableElements.length === 0) return;
        
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      // Auto focus the close button or first action
      setTimeout(() => {
        if (modalRef.current) {
          const closeBtn = modalRef.current.querySelector('button[aria-label="Close Technical Deep Dive"]') as HTMLElement;
          closeBtn?.focus();
        }
      }, 50);
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
  const folders =
    project.id === "krishisaathi"
      ? KRISHISAATHI_FOLDERS
      : project.id === "medtalk"
      ? MEDTALK_FOLDERS
      : IMDBSENTIMENT_FOLDERS;

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
            ref={modalRef}
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

            {/* Modal Content Body with Collapsible Sections */}
            <div className="p-6 sm:p-8 lg:p-12 space-y-6">
              <div>
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
                        Copyright Registered · Diary No. {project.copyrightFiled.diaryNumber}
                      </span>
                    </div>
                  )}
                </div>
                <p className={`font-mono text-sm sm:text-base ${theme.accentText} uppercase tracking-wider`}>
                  {project.subtitle}
                </p>
              </div>

              {/* ── Collapsible Section: Overview ── */}
              <CollapsibleSection
                title="Overview & Project Purpose"
                isOpen={sectionsOpen.overview}
                onToggle={() => toggleSection("overview")}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block mr-2" />
                    <span className="font-mono text-xs text-red-400 uppercase tracking-wider font-bold">The Problem</span>
                    <p className="mt-2 text-sm text-gray-300 leading-relaxed">{project.problem}</p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block mr-2" />
                    <span className="font-mono text-xs text-accent uppercase tracking-wider font-bold">The Solution</span>
                    <p className="mt-2 text-sm text-gray-300 leading-relaxed">{project.approach}</p>
                  </div>
                </div>

                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                    {project.metrics.map((metric) => (
                      <div key={metric.label} className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                        <div className="font-display font-extrabold text-2xl text-white">{metric.value}{metric.suffix}</div>
                        <div className="font-mono text-[10px] uppercase tracking-wider text-gray-400 mt-1">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CollapsibleSection>

              {/* ── Collapsible Section: Architecture ── */}
              <CollapsibleSection
                title="Architecture & Flow Diagram"
                isOpen={sectionsOpen.architecture}
                onToggle={() => toggleSection("architecture")}
              >
                <p className="text-sm text-gray-300 leading-relaxed">{project.architecture}</p>
                {slides.length > 0 && (
                  <div className="pt-2">
                    <ProductShowcaseGallery
                      slides={slides}
                      displayMode={displayMode}
                      accentName={theme.name}
                    />
                  </div>
                )}
              </CollapsibleSection>

              {/* ── Collapsible Section: Folder Structure ── */}
              <CollapsibleSection
                title="Folder Structure & Codebase Layout"
                isOpen={sectionsOpen.folder}
                onToggle={() => toggleSection("folder")}
              >
                <FolderTree data={folders} />
              </CollapsibleSection>

              {/* ── Collapsible Section: Engineering Decisions ── */}
              <CollapsibleSection
                title="Engineering Decisions"
                isOpen={sectionsOpen.decisions}
                onToggle={() => toggleSection("decisions")}
              >
                <div className="space-y-4 font-mono text-xs sm:text-sm">
                  {project.id === "krishisaathi" ? (
                    <>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-white font-bold mb-1">Choice: Next.js/React</div>
                        <div className="text-gray-400 leading-relaxed">
                          Selected to deliver fast client-side navigation. Preserves separation of concerns while routing dynamic agricultural product lists efficiently.
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-white font-bold mb-1">Choice: Firestore + MongoDB</div>
                        <div className="text-gray-400 leading-relaxed">
                          Firestore coordinates real-time user bids and instant sessions. MongoDB aggregates high-volume static commodity catalogs and historical mandi pricing data under flexible document schemas.
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-white font-bold mb-1">Choice: Python/ARIMA</div>
                        <div className="text-gray-400 leading-relaxed">
                          Offers lightweight, fast statistical model inference on time-series government market statistics without the latency of deep learning layers.
                        </div>
                      </div>
                    </>
                  ) : project.id === "imdbsentiment" ? (
                    <>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-white font-bold mb-1">Choice: NLTK for Preprocessing</div>
                        <div className="text-gray-400 leading-relaxed">
                          NLTK provides robust, resource-efficient methods for text tokenization, stop-word elimination, and lemmatization to clean raw review text.
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-white font-bold mb-1">Choice: TF-IDF Vectorization</div>
                        <div className="text-gray-400 leading-relaxed">
                          Converts processed text tokens into high-quality numerical features, capturing term frequencies and inverse document frequencies across reviews.
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-white font-bold mb-1">Choice: Scikit-learn + TensorFlow/Keras</div>
                        <div className="text-gray-400 leading-relaxed">
                          Allows comparisons between classical linear algorithms (Logistic Regression, Naive Bayes) and deeper Neural Network structures for optimized classification.
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-white font-bold mb-1">Choice: Python/Flask</div>
                        <div className="text-gray-400 leading-relaxed">
                          Keeps the chatbot system micro-sized and provides simple integrations with Google Cloud TTS/STT pipelines and native AI APIs.
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-white font-bold mb-1">Choice: Google Gemini NLU</div>
                        <div className="text-gray-400 leading-relaxed">
                          Provides zero-setup natural language classification and medical triage assessment with high translation capacity for regional vernacular languages.
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CollapsibleSection>

              {/* ── Collapsible Section: Challenges & Solutions ── */}
              <CollapsibleSection
                title="Challenges & Solutions"
                isOpen={sectionsOpen.challenges}
                onToggle={() => toggleSection("challenges")}
              >
                <div className="space-y-4 font-mono text-xs sm:text-sm text-gray-300">
                  {project.id === "krishisaathi" ? (
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-red-400 font-bold mb-1">Challenge: Processing 18,300+ AGMARKNET records on client request</div>
                      <div className="text-gray-400 leading-relaxed">
                        Querying MongoDB directly on client scroll created unacceptable API latency spikes.
                      </div>
                      <div className="text-emerald-400 font-bold mt-3 mb-1">Solution: Edge Caching & Indexing</div>
                      <div className="text-gray-400 leading-relaxed">
                        Pre-aggregated ARIMA model predictions and indexed commodity query parameters, lowering average lookup response speeds under 100ms.
                      </div>
                    </div>
                  ) : project.id === "imdbsentiment" ? (
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-red-400 font-bold mb-1">Challenge: Processing high-dimensional TF-IDF vectors</div>
                      <div className="text-gray-400 leading-relaxed">
                        Too many unique words in 50K reviews create sparse matrices that lead to memory overflow during training.
                      </div>
                      <div className="text-emerald-400 font-bold mt-3 mb-1">Solution: Max Features Limit & Sub-sampling</div>
                      <div className="text-gray-400 leading-relaxed">
                        Constrained TF-IDF vectorizer to the top 5,000 most relevant features and utilized sparse matrices natively throughout training.
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-red-400 font-bold mb-1">Challenge: Unacceptable speech translation delays on audio files</div>
                      <div className="text-gray-400 leading-relaxed">
                        Transferring raw audio payloads in real-time over poor cellular rural networks failed frequently.
                      </div>
                      <div className="text-emerald-400 font-bold mt-3 mb-1">Solution: Compressed Audio Streams</div>
                      <div className="text-gray-400 leading-relaxed">
                        Implemented stream chunking and compressed audio compression layers before transmitting to the Google Cloud AI services.
                      </div>
                    </div>
                  )}
                </div>
              </CollapsibleSection>

              {/* ── Collapsible Section: Deployment ── */}
              <CollapsibleSection
                title="Deployment & Runtime Environments"
                isOpen={sectionsOpen.deployment}
                onToggle={() => toggleSection("deployment")}
              >
                <p className="text-sm text-gray-300 leading-relaxed">
                  {project.id === "krishisaathi"
                    ? "Client application hosted on Vercel Edge networks; database and Node.js REST controllers running on a secured cloud VPS under Docker containers with automated SSL hooks."
                    : project.id === "imdbsentiment"
                    ? "Jupyter Notebook environment for exploratory data analysis, pipeline testing, and training. Production script version is package-ready as a standalone CLI application."
                    : "Deployed inside a containerized lightweight Python backend with secured API keys and environment variables integration."}
                </p>
              </CollapsibleSection>

              {/* ── Collapsible Section: Future Improvements ── */}
              <CollapsibleSection
                title="Future Improvements & Roadmap"
                isOpen={sectionsOpen.improvements}
                onToggle={() => toggleSection("improvements")}
              >
                <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                  {project.id === "krishisaathi" ? (
                    <>
                      <li>Integrate WhatsApp business gateway for offline bids from rural farmers.</li>
                      <li>Incorporate automated SMS translation alerts for commodity price drops.</li>
                    </>
                  ) : project.id === "imdbsentiment" ? (
                    <>
                      <li>Deploy the trained model as a REST API endpoint using FastAPI or Flask.</li>
                      <li>Incorporate live user rating feedback to periodically retrain models.</li>
                    </>
                  ) : (
                    <>
                      <li>Implement Retrieval-Augmented Generation (RAG) on WHO medical databases.</li>
                      <li>Incorporate localized audio output for vernacular tribal dialects.</li>
                    </>
                  )}
                </ul>
              </CollapsibleSection>

              {/* ── Outcomes ── */}
              <div className="pt-4 border-t border-white/10">
                <h3 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
                  Outcomes &amp; Accomplishments
                </h3>
                <ul className="space-y-2">
                  {project.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className={`font-bold mt-1 text-xs ${theme.accentText}`}>◆</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Key Learnings ── */}
              {learnings && (
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h3 className="font-mono text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Architectural Learnings &amp; Reflections
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed italic">&ldquo;{learnings}&rdquo;</p>
                </div>
              )}

              {/* ── Footer Action Links ── */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
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
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
