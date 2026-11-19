"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Project } from "@/lib/data";
import Badge from "@/components/ui/Badge";
import TechIcon from "@/components/ui/TechIcon";
import { getTechWebsite } from "@/lib/techUrls";
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
  promptshield: {
    name: "red",
    badgeBg: "bg-red-500/20 text-red-300 border border-red-500/30",
    glowBg: "from-red-500/10 via-transparent to-transparent",
    dotColor: "bg-red-400",
    accentText: "text-red-300",
    primaryBtn:
      "bg-red-500 hover:bg-red-600 text-white font-mono font-bold shadow-md",
  },
  campusai: {
    name: "cyan",
    badgeBg: "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30",
    glowBg: "from-cyan-500/10 via-transparent to-transparent",
    dotColor: "bg-cyan-400",
    accentText: "text-cyan-300",
    primaryBtn:
      "bg-cyan-500 hover:bg-cyan-600 text-black font-mono font-bold shadow-md",
  },
  krishisaathi: {
    name: "green",
    badgeBg: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
    glowBg: "from-emerald-500/10 via-transparent to-transparent",
    dotColor: "bg-emerald-400",
    accentText: "text-emerald-300",
    primaryBtn:
      "bg-emerald-500 hover:bg-emerald-600 text-black font-mono font-bold shadow-md",
  },
  medtalk: {
    name: "blue",
    badgeBg: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    glowBg: "from-blue-500/10 via-transparent to-transparent",
    dotColor: "bg-blue-400",
    accentText: "text-blue-300",
    primaryBtn:
      "bg-blue-500 hover:bg-blue-600 text-white font-mono font-bold shadow-md",
  },
  braintumordetection: {
    name: "rose",
    badgeBg: "bg-rose-500/20 text-rose-300 border border-rose-500/30",
    glowBg: "from-rose-500/10 via-transparent to-transparent",
    dotColor: "bg-rose-400",
    accentText: "text-rose-300",
    primaryBtn: "bg-rose-500 hover:bg-rose-600 text-white font-mono font-bold shadow-md",
  },
  imdbsentiment: {
    name: "orange",
    badgeBg: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
    glowBg: "from-amber-500/10 via-transparent to-transparent",
    dotColor: "bg-amber-400",
    accentText: "text-amber-300",
    primaryBtn:
      "bg-amber-500 hover:bg-amber-600 text-black font-mono font-bold shadow-md",
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
  promptshield: [
    {
      src: "/images/projects/promptshield.png",
      title: "PromptShield Architecture & Threat Simulator",
      description:
        "High-throughput AI security gateway featuring sub-15ms inspection, morphological suffix-stripping heuristics, OWASP LLM Top 10 defense, and 2-line OpenAI SDK drop-in.",
      caption: "Architecture Blueprint — Deterministic policy precedence & real-time risk scoring (0–100)",
    },
  ],
  campusai: [
    {
      src: "/images/projects/campusai.png",
      title: "CampusAI SLRTCE Touchscreen Kiosk UI",
      description:
        "Autonomous college reception robot kiosk for SLRTCE Mumbai featuring a state-reactive 3D avatar (idle/listening/speaking), interactive SVG floor maps with mobile QR route handoffs, and 4-language voice loop.",
      caption: "Kiosk UI — Multilingual voice assistant (EN, HI, MR, Hinglish) & indoor wayfinding",
    },
  ],
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
  ],
  braintumordetection: [
    {
      src: "/images/projects/brain-tumor-detection.png",
      title: "Grad-CAM Saliency & Tumor Localization",
      description:
        "Visual interpretability heatmaps highlighting the exact pathological regions influencing model predictions.",
      caption: "Grad-CAM Explainability — Axial MRI scan with blended activation heatmap",
    },
    {
      src: "/images/projects/brain-tumor-model-comparison.png",
      title: "Model Architecture Benchmark",
      description:
        "Comparative evaluation across Custom CNN, ResNet18, and MobileNetV3 across 1,600 held-out test scans.",
      caption: "Benchmark Analytics — ResNet18 leading with 94.75% test accuracy and 0.9462 F1-score",
    },
  ],
  imdbsentiment: [
    {
      src: "/images/projects/cinesense-preview.png",
      title: "CineSense Sentiment Analysis & Discovery",
      description:
        "Real-time sentiment inference across Logistic Regression, Naive Bayes, and PyTorch BiLSTM with explainable AI word highlighting.",
      caption: "CineSense Dashboard — Real-time multi-model sentiment inference and LIME word attribution",
    },
  ],
};

const PROJECT_DISPLAY_MODES: Record<string, "desktop" | "mobile"> = {
  promptshield: "desktop",
  campusai: "desktop",
  krishisaathi: "desktop",
  medtalk: "desktop",
  braintumordetection: "desktop",
  imdbsentiment: "desktop",
};

const PROJECT_LEARNINGS: Record<string, string> = {
  promptshield:
    "Architecting an enterprise AI security gateway with sub-15ms latency on Next.js 16 demonstrated how combining deterministic morphological suffix-stripping heuristics with Groq LPU inference neutralizes adversarial jailbreaks before they reach LLM context windows. Enforcing strict policy precedence (ALLOW/WARN/SANITIZE/BLOCK) alongside HMAC-SHA256 audit logging ensures enterprise governance with zero friction on standard user interactions.",
  campusai:
    "Engineering an autonomous physical reception kiosk for Shree L. R. Tiwari College of Engineering taught me how to coordinate low-latency Web Audio buffers, reactive 3D robot avatar visual states, and interactive vector SVG indoor wayfinding under kiosk constraints. Collaborating with teammate Jayesh Tiwari reinforced disciplined interface boundaries between our Next.js frontend kiosk and FastAPI RAG backend.",
  krishisaathi:
    "Designing a hybrid Firestore + MongoDB architecture demonstrated how to decouple real-time session synchronization from high-throughput commodity catalog queries. Optimizing ARIMA inference on 18,300+ government market records highlighted the importance of edge-caching market forecasts to maintain sub-200ms API response times across regional rural networks.",
  medtalk:
    "Building a medical assistant for underserved rural communities underscored the necessity of voice-first multilingual UX design and rigorous input sanitization when transcribing speech-to-text medical queries.",
  imdbsentiment:
    "Benchmarking Logistic Regression against a PyTorch Bidirectional LSTM demonstrated that TF-IDF with linear regularization achieved superior accuracy (89.78%) and ROC-AUC (0.9634) over deep sequence models on benchmark sentiment data while avoiding heavy latency. Incorporating LIME token explainability made classification boundaries transparent, while modularizing Streamlit tabs into isolated services enabled reliable automated testing with 49 passing pytests.",
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

const PROMPTSHIELD_FOLDERS: FolderNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "app",
        type: "folder",
        children: [
          {
            name: "(public)",
            type: "folder",
            children: [
              { name: "page.tsx", type: "file" },
              { name: "security", type: "folder", children: [{ name: "page.tsx", type: "file" }] },
              { name: "architecture", type: "folder", children: [{ name: "page.tsx", type: "file" }] }
            ]
          },
          {
            name: "(dashboard)",
            type: "folder",
            children: [
              { name: "dashboard", type: "folder" },
              { name: "incidents", type: "folder" },
              { name: "policies", type: "folder" },
              { name: "audit-logs", type: "folder" },
              { name: "users", type: "folder" },
              { name: "system", type: "folder" }
            ]
          },
          {
            name: "api/v1",
            type: "folder",
            children: [
              { name: "analyze", type: "folder", children: [{ name: "route.ts", type: "file" }] },
              { name: "policies", type: "folder", children: [{ name: "route.ts", type: "file" }] },
              { name: "audit-logs", type: "folder", children: [{ name: "route.ts", type: "file" }] },
              { name: "system/status", type: "folder", children: [{ name: "route.ts", type: "file" }] },
              { name: "incidents", type: "folder", children: [{ name: "route.ts", type: "file" }] }
            ]
          }
        ]
      },
      {
        name: "components",
        type: "folder",
        children: [
          { name: "security", type: "folder", children: [{ name: "threat-simulator.tsx", type: "file" }] },
          { name: "dashboard", type: "folder" },
          { name: "ui", type: "folder" }
        ]
      },
      {
        name: "lib",
        type: "folder",
        children: [
          {
            name: "server",
            type: "folder",
            children: [
              { name: "security-engine.ts", type: "file" },
              { name: "policy-evaluator.ts", type: "file" },
              { name: "persistence.ts", type: "file" },
              { name: "audit.ts", type: "file" },
              { name: "rate-limiter.ts", type: "file" },
              { name: "groq.ts", type: "file" }
            ]
          },
          { name: "client", type: "folder" },
          { name: "types", type: "folder", children: [{ name: "security.ts", type: "file" }] }
        ]
      }
    ]
  },
  { name: "firestore.rules", type: "file" },
  { name: "package.json", type: "file" },
  { name: "README.md", type: "file" }
];

const CAMPUSAI_FOLDERS: FolderNode[] = [
  {
    name: "frontend",
    type: "folder",
    children: [
      {
        name: "app",
        type: "folder",
        children: [
          { name: "layout.tsx", type: "file" },
          { name: "page.tsx", type: "file" },
          { name: "kiosk", type: "folder", children: [{ name: "page.tsx", type: "file" }] }
        ]
      },
      {
        name: "components/kiosk",
        type: "folder",
        children: [
          { name: "kiosk-shell.tsx", type: "file" },
          { name: "campus-robot.tsx", type: "file" },
          { name: "rich-cards.tsx", type: "file" },
          { name: "voice-indicator.tsx", type: "file" },
          { name: "suggestion-chips.tsx", type: "file" },
          { name: "language-selector.tsx", type: "file" }
        ]
      },
      {
        name: "lib/kiosk",
        type: "folder",
        children: [
          { name: "campus-knowledge.ts", type: "file" },
          { name: "translations.ts", type: "file" }
        ]
      },
      { name: "package.json", type: "file" }
    ]
  },
  {
    name: "backend",
    type: "folder",
    children: [
      { name: "main.py", type: "file" },
      {
        name: "agents",
        type: "folder",
        children: [
          { name: "router.py", type: "file" },
          { name: "admission.py", type: "file" },
          { name: "student.py", type: "file" },
          { name: "faculty.py", type: "file" },
          { name: "nav.py", type: "file" }
        ]
      },
      {
        name: "api",
        type: "folder",
        children: [
          { name: "chat.py", type: "file" },
          { name: "voice.py", type: "file" },
          { name: "kiosk.py", type: "file" }
        ]
      },
      {
        name: "core",
        type: "folder",
        children: [
          { name: "rag_retriever.py", type: "file" },
          { name: "database.py", type: "file" },
          { name: "tts_service.py", type: "file" }
        ]
      },
      { name: "requirements.txt", type: "file" }
    ]
  },
  { name: "README.md", type: "file" }
];

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

const BRAINTUMOR_FOLDERS: FolderNode[] = [
  {
    name: "models",
    type: "folder",
    children: [
      { name: "custom_cnn.py", type: "file" },
      { name: "resnet18.pth", type: "file" },
      { name: "mobilenetv3.pth", type: "file" },
      { name: "class_names.json", type: "file" }
    ]
  },
  {
    name: "notebooks",
    type: "folder",
    children: [{ name: "brain_tumor_detection.ipynb", type: "file" }]
  },
  {
    name: "screenshots",
    type: "folder",
    children: [
      { name: "gradcam_explanation.png", type: "file" },
      { name: "model_performance_comparison.png", type: "file" }
    ]
  },
  { name: "app.py", type: "file" },
  { name: "gradcam.py", type: "file" },
  { name: "requirements.txt", type: "file" },
  { name: "README.md", type: "file" }
];

const IMDBSENTIMENT_FOLDERS: FolderNode[] = [
  {
    name: "services",
    type: "folder",
    children: [
      { name: "prediction_service.py", type: "file" },
      { name: "explainability_service.py", type: "file" },
      { name: "preprocessing.py", type: "file" },
      { name: "evaluation_service.py", type: "file" },
      { name: "tmdb_service.py", type: "file" },
      { name: "review_storage_service.py", type: "file" },
      { name: "data_service.py", type: "file" }
    ]
  },
  {
    name: "ui",
    type: "folder",
    children: [
      {
        name: "tabs",
        type: "folder",
        children: [
          { name: "analyzer.py", type: "file" },
          { name: "benchmarks.py", type: "file" },
          { name: "dataset.py", type: "file" },
          { name: "home.py", type: "file" },
          { name: "movies.py", type: "file" },
          { name: "overview.py", type: "file" },
          { name: "pipeline.py", type: "file" }
        ]
      },
      { name: "components.py", type: "file" },
      { name: "theme.py", type: "file" }
    ]
  },
  {
    name: "models",
    type: "folder",
    children: [
      { name: "logistic_regression.joblib", type: "file" },
      { name: "naive_bayes.joblib", type: "file" },
      { name: "bilstm_model.pt", type: "file" },
      { name: "tfidf_vectorizer.joblib", type: "file" }
    ]
  },
  {
    name: "tests",
    type: "folder",
    children: [
      { name: "test_prediction.py", type: "file" },
      { name: "test_preprocessing.py", type: "file" },
      { name: "test_evaluation_service.py", type: "file" },
      { name: "test_ui_tabs.py", type: "file" }
    ]
  },
  { name: "app.py", type: "file" },
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
    project.id === "promptshield"
      ? PROMPTSHIELD_FOLDERS
      : project.id === "campusai"
      ? CAMPUSAI_FOLDERS
      : project.id === "krishisaathi"
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
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto overscroll-contain rounded-3xl bg-[#111318] border border-border-custom text-white shadow-2xl z-10 scrollbar-thin"
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
                        Copyright Registered · Cert. No. {project.copyrightFiled.certificateNumber || "SW-2026024057"} (Govt. of India)
                      </span>
                    </div>
                  )}
                </div>
                <p className={`font-mono text-sm sm:text-base ${theme.accentText} uppercase tracking-wider`}>
                  {project.subtitle}
                </p>

                {/* Explicit Teammate Attribution Card for CampusAI */}
                {project.id === "campusai" && (
                  <div className="mt-4 p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 font-mono text-xs text-cyan-200 space-y-1">
                    <div className="font-bold text-cyan-400">Collaboration Attribution Notice:</div>
                    <p>
                      <strong>Frontend &amp; Kiosk Interface:</strong> Dhruv Vawhle (Next.js, TypeScript, Tailwind, Framer Motion, React Three Fiber).
                    </p>
                    <p>
                      <strong>Backend &amp; RAG Pipeline:</strong> Jayesh Tiwari (FastAPI, Groq LLM, Whisper, FAISS RAG, SQLite).
                    </p>
                    <p className="text-cyan-300/80">
                      Repository is a fork of upstream: <a href="https://github.com/jayeshtiwari-ai/CampusAI" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">jayeshtiwari-ai/CampusAI</a>
                    </p>
                  </div>
                )}
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

                {/* Technologies & Architecture Stack with Official Logos & Outbound Links */}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="pt-3 pb-1 border-t border-white/10">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="font-mono text-xs text-text-secondary uppercase tracking-wider font-bold">
                        Technologies &amp; Architecture Stack
                      </span>
                      <span className="font-mono text-[10px] text-text-secondary">
                        Click logo to visit website ↗
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <a
                          key={tech}
                          href={getTechWebsite(tech)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Visit official ${tech} website (opens in new tab)`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 font-mono text-xs text-gray-200 hover:text-white transition-all duration-200 transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-accent"
                        >
                          <TechIcon name={tech} size="sm" />
                          <span>{tech}</span>
                          <span className="text-[10px] opacity-60">↗</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

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
                  {project.id === "promptshield" ? (
                    <>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-white font-bold mb-1">Choice: Morphological Root-Stemming Heuristic Engine (&lt;15ms Latency)</div>
                        <div className="text-gray-400 leading-relaxed">
                          Zero-dependency normalization with morphological suffix-stripping (-ing, -ed, -ation, -ment) catches obfuscated adversarial prompt injections and jailbreaks before server invocation, reducing LLM token consumption and latency.
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-white font-bold mb-1">Choice: Deterministic 4-Tier Policy Precedence &amp; HMAC Audit Trail</div>
                        <div className="text-gray-400 leading-relaxed">
                          Enforces deterministic policy precedence (BLOCK &gt; SANITIZE &gt; WARN &gt; ALLOW) mapped to a 0–100 threat risk scale, backed by tamper-evident HMAC-SHA256 audit logging and a 2-line drop-in OpenAI SDK proxy.
                        </div>
                      </div>
                    </>
                  ) : project.id === "campusai" ? (
                    <>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-white font-bold mb-1">Choice: Interactive SVG Floor Maps &amp; Mobile QR Wayfinding Handoff</div>
                        <div className="text-gray-400 leading-relaxed">
                          Engineered step-by-step vector SVG indoor campus navigation for SLRTCE with instant smartphone QR code handoffs, allowing visitors to carry directions and checklists on their mobile devices to prevent kiosk queues.
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-white font-bold mb-1">Choice: State-Reactive 3D Robot Avatar &amp; Multilingual Voice Loop</div>
                        <div className="text-gray-400 leading-relaxed">
                          Rendered a reactive 3D avatar with synchronized Idle, Listening (pulsing halo + live STT transcription), and Speaking (bounce + neural TTS) states supporting English, Hindi, Marathi, and Hinglish.
                        </div>
                      </div>
                    </>
                  ) : project.id === "krishisaathi" ? (
                    <>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-white font-bold mb-1">Choice: React with Code Splitting</div>
                        <div className="text-gray-400 leading-relaxed">
                          Cut initial bundle size by 69% (2.9MB down to 900KB) to ensure rapid loading on low-bandwidth rural networks.
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                        <div className="text-white font-bold mb-1">Choice: Hybrid Firestore + MongoDB Architecture</div>
                        <div className="text-gray-400 leading-relaxed">
                          Firestore coordinates real-time user cart synchronization while MongoDB aggregates large commodity price catalogs and historical AGMARKNET mandi data.
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-white font-bold mb-1">Modular Architecture</div>
                      <div className="text-gray-400 leading-relaxed">
                        Designed with separation of concerns and typed contracts.
                      </div>
                    </div>
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
                  {project.id === "promptshield" ? (
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-red-400 font-bold mb-1">Challenge: Catching zero-day adversarial jailbreak variants without incurring 500ms+ deep LLM latency</div>
                      <div className="text-gray-400 leading-relaxed">
                        Evaluating complex prompt injection patterns and jailbreak signatures before forwarding to foundation models can introduce significant latency spikes and degrade UX.
                      </div>
                      <div className="text-emerald-400 font-bold mt-3 mb-1">Solution: Zero-Dependency Pipeline &amp; Groq LPU Speed</div>
                      <div className="text-gray-400 leading-relaxed">
                        Engineered a deterministic 6-stage pipeline using regex normalization and morphological suffix-stripping to catch 95%+ of structural jailbreaks under 15ms, offloading deep classification to Groq LPU hardware.
                      </div>
                    </div>
                  ) : project.id === "campusai" ? (
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-red-400 font-bold mb-1">Challenge: Preventing physical kiosk queues during peak campus admissions and handling noisy hall audio</div>
                      <div className="text-gray-400 leading-relaxed">
                        Long voice queries cause bottleneck congestion at physical kiosks, while noisy ambient corridor acoustics degrade speech recognition accuracy.
                      </div>
                      <div className="text-emerald-400 font-bold mt-3 mb-1">Solution: Mobile QR Handoff &amp; Groq Whisper STT Pipeline</div>
                      <div className="text-gray-400 leading-relaxed">
                        Implemented instant smartphone QR code handoff so visitors transfer routes/checklists to their phones within 20 seconds. Ambient noise filtering on Groq Whisper (large-v3-turbo) ensures reliable speech transcription.
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
                      <div className="text-red-400 font-bold mb-1">Challenge: Processing 18,300+ AGMARKNET records without latency spikes</div>
                      <div className="text-gray-400 leading-relaxed">
                        Querying MongoDB directly on client scroll created unacceptable API latency spikes.
                      </div>
                      <div className="text-emerald-400 font-bold mt-3 mb-1">Solution: Edge Caching &amp; Indexing</div>
                      <div className="text-gray-400 leading-relaxed">
                        Pre-aggregated ARIMA model predictions and indexed commodity query parameters, lowering average lookup speeds under 100ms.
                      </div>
                    </div>
                  )}
                </div>
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
