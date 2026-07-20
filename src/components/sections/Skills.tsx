"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import TechIcon from "@/components/ui/TechIcon";
import Button from "@/components/ui/Button";

// Orbit ring configuration for the Engineering Ecosystem
interface RingConfig {
  id: "inner" | "middle" | "outer";
  radiusPx: number; // base desktop radius half (radius in pixels from center)
  mobileRadiusPx: number; // mobile radius in pixels
  duration: number;
  direction: 1 | -1;
  skills: string[];
}

const ORBIT_RINGS: RingConfig[] = [
  {
    id: "inner",
    radiusPx: 120, // 240px diameter
    mobileRadiusPx: 60, // 120px diameter
    duration: 75,
    direction: 1,
    skills: ["React", "TypeScript", "Node.js", "Python"],
  },
  {
    id: "middle",
    radiusPx: 200, // 400px diameter
    mobileRadiusPx: 105, // 210px diameter
    duration: 95,
    direction: -1,
    skills: ["Next.js", "MongoDB", "Tailwind CSS", "Express"],
  },
  {
    id: "outer",
    radiusPx: 285, // 570px diameter
    mobileRadiusPx: 150, // 300px diameter
    duration: 125,
    direction: 1,
    skills: ["AWS", "GCP", "Docker", "Git", "SQL"],
  },
];

// Intelligent Engineering Ecosystem Relationships
const RELATIONSHIPS_MAP: Record<string, string[]> = {
  React: ["Next.js", "TypeScript", "Tailwind CSS"],
  "Next.js": ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
  TypeScript: ["React", "Next.js", "Node.js", "Express"],
  "Tailwind CSS": ["React", "Next.js"],
  Python: ["Pandas", "Matplotlib", "Gemini API", "RAG", "Vector Database"],
  Pandas: ["Python", "Matplotlib", "SQL"],
  Matplotlib: ["Python", "Pandas"],
  "Gemini API": ["Python", "RAG", "Vector Database", "Node.js"],
  RAG: ["Python", "Gemini API", "Vector Database"],
  "Node.js": ["Express", "REST APIs", "MongoDB", "Firebase"],
  Express: ["Node.js", "REST APIs", "MongoDB"],
  "REST APIs": ["Node.js", "Express", "MongoDB", "Next.js"],
  AWS: ["Docker", "GCP", "SQL", "Git"],
  GCP: ["AWS", "Docker", "Gemini API"],
  Docker: ["AWS", "GCP", "Git", "Node.js"],
  Firebase: ["Node.js", "MongoDB", "Firestore", "React"],
  MongoDB: ["Node.js", "Express", "REST APIs", "Vector Database"],
  "Vector Database": ["Python", "RAG", "Gemini API", "MongoDB"],
  SQL: ["Pandas", "AWS", "Python"],
  Firestore: ["Firebase", "React", "Node.js"],
  Git: ["Docker", "TypeScript", "Next.js"],
};

interface TechCardItem {
  name: string;
  descriptor: string;
}

interface StackCategory {
  id: string;
  title: string;
  subtitle: string;
  accentColor: string;
  accentClass: string;
  technologies: TechCardItem[];
}

const ENGINEERING_STACK: StackCategory[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    subtitle: "Component architectures & tokenized styling",
    accentColor: "#3B82F6",
    accentClass: "text-[#3B82F6] border-[#3B82F6]/30 bg-[#3B82F6]/10",
    technologies: [
      { name: "React", descriptor: "Component-driven UI library" },
      { name: "Next.js", descriptor: "Full-stack React framework & App Router" },
      { name: "TypeScript", descriptor: "End-to-end static typing & safety" },
      { name: "Tailwind CSS", descriptor: "Token-based utility styling" },
    ],
  },
  {
    id: "backend",
    title: "Backend & APIs",
    subtitle: "Scalable server runtimes & RESTful endpoints",
    accentColor: "#10B981",
    accentClass: "text-[#10B981] border-[#10B981]/30 bg-[#10B981]/10",
    technologies: [
      { name: "Node.js", descriptor: "Async V8 JavaScript runtime" },
      { name: "Express", descriptor: "Lightweight web API middleware" },
      { name: "Python", descriptor: "Backend services & API integration" },
      { name: "REST APIs", descriptor: "Structured HTTP service contracts" },
    ],
  },
  {
    id: "ai-ml",
    title: "AI / Machine Learning",
    subtitle: "Applied generative AI & data transformation",
    accentColor: "#A855F7",
    accentClass: "text-[#A855F7] border-[#A855F7]/30 bg-[#A855F7]/10",
    technologies: [
      { name: "Gemini API", descriptor: "Multimodal NLU & reasoning models" },
      { name: "RAG", descriptor: "Retrieval-augmented generation pipelines" },
      { name: "Pandas", descriptor: "Structured data analysis & cleaning" },
      { name: "Matplotlib", descriptor: "Exploratory technical visualization" },
    ],
  },
  {
    id: "cloud-infrastructure",
    title: "Cloud Infrastructure",
    subtitle: "Managed compute & containerized environments",
    accentColor: "#F97316",
    accentClass: "text-[#F97316] border-[#F97316]/30 bg-[#F97316]/10",
    technologies: [
      { name: "AWS", descriptor: "Scalable cloud infrastructure & compute" },
      { name: "GCP", descriptor: "Google Cloud AI & managed services" },
      { name: "Docker", descriptor: "Containerized reproducible runtimes" },
      { name: "Firebase", descriptor: "Authentication & real-time serverless" },
    ],
  },
  {
    id: "databases",
    title: "Database Systems",
    subtitle: "Relational, document & high-dimensional storage",
    accentColor: "#059669",
    accentClass: "text-[#059669] border-[#059669]/30 bg-[#059669]/10",
    technologies: [
      { name: "MongoDB", descriptor: "Distributed document database" },
      { name: "Vector Database", descriptor: "High-dimensional semantic search" },
      { name: "SQL", descriptor: "Relational schema modeling & queries" },
      { name: "Firestore", descriptor: "Real-time document synchronization" },
    ],
  },
  {
    id: "developer-tools",
    title: "Developer Tools",
    subtitle: "Version control & collaborative engineering",
    accentColor: "#EF4444",
    accentClass: "text-[#EF4444] border-[#EF4444]/30 bg-[#EF4444]/10",
    technologies: [
      { name: "Git", descriptor: "Source control & branch management" },
      { name: "Docker", descriptor: "Isolated local dev environments" },
      { name: "REST APIs", descriptor: "API testing & contract validation" },
      { name: "Python", descriptor: "Automation & scripting utilities" },
    ],
  },
];

interface TechDetailInfo {
  category: string;
  categoryColor: string;
  role: string;
  projectsList: string[];
  useCases: string[];
  architecture: string;
  keyPatterns: string[];
}

const TECH_DETAILS_MAP: Record<string, TechDetailInfo> = {
  React: {
    category: "Frontend Framework",
    categoryColor: "#3B82F6",
    role: "Client-Side UI Architect & State Engineer",
    projectsList: ["KrishiSaathi AI Platform", "MedTalk Clinical Chatbot", "Portfolio Architecture"],
    useCases: ["UI Architecture", "Reactive Reconciliation", "Component Design", "State Management"],
    architecture:
      "Implements unidirectional data flow with custom hooks and reactive virtual DOM reconciliation. Structured around atomic design tokens and memoized state selectors to eliminate unnecessary re-renders across high-frequency real-time interfaces.",
    keyPatterns: [
      "Custom Hooks & Context Providers",
      "Virtual DOM Reconciliation & Memoization",
      "Atomic Design System Components",
      "Lazy Loading & Code Splitting",
    ],
  },
  "Next.js": {
    category: "Full-Stack Framework",
    categoryColor: "#3B82F6",
    role: "SSR Architecture & App Router Engineer",
    projectsList: ["Portfolio Architecture", "KrishiSaathi Core API", "Enterprise Web Apps"],
    useCases: ["React Server Components (RSC)", "App Router Navigation", "API Route Gateway", "Static & Dynamic Caching"],
    architecture:
      "Leverages React Server Components (RSCs), server actions, and edge route handlers for optimal First Contentful Paint (FCP) and secure server-to-server API execution without exposing client secrets.",
    keyPatterns: [
      "React Server Components (RSC)",
      "Dynamic Route Handlers & API Middleware",
      "Static Site Generation (SSG) + ISR",
      "Turbopack Bundling & Optimization",
    ],
  },
  TypeScript: {
    category: "Type System & Language",
    categoryColor: "#3B82F6",
    role: "Domain Modeling & Type Contracts Engineer",
    projectsList: ["Portfolio Site & Applications", "KrishiSaathi Core API", "All Production Microservices"],
    useCases: ["End-to-End Type Safety", "API Payload Contracts", "Generics & Unions", "Zero Runtime Casting"],
    architecture:
      "Enforces end-to-end type safety across client interfaces, REST request payloads, and database schema definitions. Eliminates runtime null pointer errors through discriminated unions and strict compiler rules.",
    keyPatterns: [
      "Strict Null Checks & Discriminated Unions",
      "Generics & Utility Type Transformations",
      "End-to-End API Payload Validation",
      "Shared Domain Type Definitions",
    ],
  },
  "Tailwind CSS": {
    category: "Design System & Styling",
    categoryColor: "#3B82F6",
    role: "Tokenized UI & Responsive Design Engineer",
    projectsList: ["Portfolio Design System", "KrishiSaathi Responsive UI", "Mobile Dashboards"],
    useCases: ["Custom Design Tokens", "Glassmorphic Surfaces", "Responsive Breakpoints", "Zero Layout Shift"],
    architecture:
      "Constrained design system architecture using custom color tokens, responsive breakpoints, and modern layout algorithms (CSS Grid/Flexbox) with zero dead CSS and sub-millisecond styling execution.",
    keyPatterns: [
      "Custom Design Tokens & CSS Variables",
      "Dark Mode & Glassmorphic Surfaces",
      "Responsive Breakpoint Engineering",
      "Hardware-Accelerated Micro-Animations",
    ],
  },
  "Node.js": {
    category: "Backend Runtime",
    categoryColor: "#10B981",
    role: "Asynchronous Event-Driven Backend Engineer",
    projectsList: ["KrishiSaathi Backend", "Edith AI Orchestrator", "Distributed Microservices"],
    useCases: ["Non-Blocking I/O Streams", "Concurrent API Requests", "Cluster Processing", "Background Task Dispatch"],
    architecture:
      "High-throughput non-blocking I/O runtime handling concurrent REST API requests, websocket streams, and background task dispatching across microservices and external LLM endpoints.",
    keyPatterns: [
      "Non-Blocking Event Loop & Streams",
      "JWT Authentication & Role Middleware",
      "Cluster Mode Multi-Processing",
      "Asynchronous Task Scheduling",
    ],
  },
  Express: {
    category: "API Gateway & Middleware",
    categoryColor: "#10B981",
    role: "HTTP API Gateway & Middleware Architect",
    projectsList: ["KrishiSaathi Microservices", "Order & Inventory Routes", "Payment Gateway Integration"],
    useCases: ["Middleware Chain of Responsibility", "CORS & Security Policies", "Rate Limiting", "JSON Error Serialization"],
    architecture:
      "Modular middleware chain handling request sanitation, CORS policies, rate limiting, and structured JSON error serialization for high-reliability backend service integration.",
    keyPatterns: [
      "Middleware Chain of Responsibility",
      "Rate Limiting & DDOS Protection",
      "Structured Error Handling & Logging",
      "CORS & Security Headers (Helmet)",
    ],
  },
  Python: {
    category: "AI & Data Engineering",
    categoryColor: "#A855F7",
    role: "Machine Learning & Predictive Pipeline Engineer",
    projectsList: ["KrishiSaathi ML Engine", "MedTalk AI Backend", "Automated Data Scrapers"],
    useCases: ["Ensemble Regression Models", "Vector Embeddings & RAG", "FastAPI & Flask Endpoints", "Vectorized Numpy ETL"],
    architecture:
      "Powering predictive analytics pipelines, LLM inference endpoints, and automated data ingestion scripts. Utilizes vectorized numpy operations and FastAPI/Flask microservices for rapid data processing.",
    keyPatterns: [
      "FastAPI & Flask REST Endpoints",
      "Scikit-Learn Regression & Time-Series Models",
      "Vector Embeddings & RAG Retrieval",
      "Asynchronous Data Scraping & ETL",
    ],
  },
  "REST APIs": {
    category: "Service Architecture",
    categoryColor: "#10B981",
    role: "HTTP Service Contract & Webhook Engineer",
    projectsList: ["All Distributed Portfolio Systems", "Payment Webhook Endpoints", "External AI Gateway"],
    useCases: ["Structured HTTP Contracts", "Webhook Callbacks", "Idempotent Operations", "Contract Validation"],
    architecture:
      "Disciplined RESTful service contracts implementing strict JSON schema validation, idempotent HTTP verbs, and robust webhook retry buffers across distributed microservice boundaries.",
    keyPatterns: [
      "OpenAPI Specification Contracts",
      "Idempotent Payment Webhooks",
      "Structured JSON Schema Validation",
      "Distributed Tracing & Correlation IDs",
    ],
  },
  "Gemini API": {
    category: "Applied Generative AI",
    categoryColor: "#A855F7",
    role: "Multimodal AI Orchestrator & Prompt Engineer",
    projectsList: ["Edith Assistant Orchestrator", "Automated Portfolio Insights", "MedTalk Clinical Reasoning"],
    useCases: ["Multimodal NLU & Reasoning", "Structured JSON Outputs", "Multi-Step Tool Calling", "Context Caching"],
    architecture:
      "Integrates Google Gemini multimodal models using structured JSON schemas and function calling to execute complex reasoning workflows, code synthesis, and contextual document retrieval.",
    keyPatterns: [
      "Structured JSON Schema Enforcement",
      "Multi-Turn Tool Calling & Orchestration",
      "Low-Latency Streaming Token Handlers",
      "Context Caching & Token Optimization",
    ],
  },
  RAG: {
    category: "Applied AI Pipeline",
    categoryColor: "#A855F7",
    role: "Retrieval-Augmented Generation Architect",
    projectsList: ["MedTalk Clinical Knowledge Engine", "Document Query Retrieval Systems"],
    useCases: ["High-Dimensional Embeddings", "Semantic Vector Search", "Chunking Strategies", "Hallucination Mitigation"],
    architecture:
      "Retrieval-Augmented Generation pipeline using semantic vector distance search to ground LLM inference in factual domain literature while eliminating hallucinated answers.",
    keyPatterns: [
      "Recursive Text Chunking & Embeddings",
      "Cosine Similarity & Vector Indexing",
      "Context Window Compression",
      "Automated Citation Verification",
    ],
  },
  Pandas: {
    category: "Data Science & ETL",
    categoryColor: "#A855F7",
    role: "Tabular Data & Pipeline Engineer",
    projectsList: ["Historical Mandi Crop Data Processing", "Market Trend Ingestion Scripts"],
    useCases: ["Structured Tabular ETL", "Missing Value Imputation", "Time-Series Rolling Averages", "High-Speed CSV/Parquet Sync"],
    architecture:
      "High-performance dataframe manipulation and statistical aggregation across multi-year agricultural dataset streams to normalize pricing signals and train machine learning models.",
    keyPatterns: [
      "Vectorized Dataframe Transformations",
      "Rolling Window Statistical Calculations",
      "Multi-Source Dataset Normalization",
      "Memory-Efficient Parquet Serialization",
    ],
  },
  Matplotlib: {
    category: "Visual Analytics",
    categoryColor: "#A855F7",
    role: "Exploratory Statistical Charting Engineer",
    projectsList: ["Agricultural Market Trend Reports", "Crop Price Prediction Visualizations"],
    useCases: ["Time-Series Trend Charts", "Regression Error Distributions", "Exploratory Data Analysis", "Report Generation"],
    architecture:
      "Generating precise mathematical and statistical data charts directly within analytical Python pipelines to validate model drift, feature correlation, and historical accuracy.",
    keyPatterns: [
      "Time-Series Trend & Forecast Plots",
      "Correlation Heatmaps & Error Residuals",
      "Automated Report PNG Generation",
      "Custom Publication-Grade Styling",
    ],
  },
  AWS: {
    category: "Cloud Infrastructure",
    categoryColor: "#F97316",
    role: "Cloud Infrastructure Deployment Specialist",
    projectsList: ["High-Availability Cloud Deployments", "Asset Storage CDN", "Serverless Trigger Pipelines"],
    useCases: ["EC2 Virtual Compute", "S3 Asset Storage & CDN", "Lambda Asynchronous Triggers", "IAM Security Policies"],
    architecture:
      "Scalable cloud deployment leveraging EC2 virtual server instances, S3 object asset storage, CloudFront CDN edge caching, and Lambda functions for asynchronous background triggers.",
    keyPatterns: [
      "S3 Object Storage & CDN Caching",
      "Serverless Lambda Functions",
      "IAM Role & Security Groups",
      "CloudWatch Metrics & Alerting",
    ],
  },
  GCP: {
    category: "Managed Cloud AI",
    categoryColor: "#F97316",
    role: "Google Cloud Certified AI Specialist",
    projectsList: ["Google Cloud Certified AI Security", "Vertex AI Endpoint Integration", "BigQuery Analytics"],
    useCases: ["Vertex AI Endpoints", "BigQuery SQL Analytics", "Cloud Functions Processing", "IAM & Service Account Security"],
    architecture:
      "Utilizing Google Cloud Vertex AI for model evaluation and inference integration alongside BigQuery for analytical processing over large historical agricultural datasets.",
    keyPatterns: [
      "Vertex AI Model Endpoints",
      "BigQuery SQL Analytics",
      "Cloud Functions Event Processing",
      "IAM & Service Account Security",
    ],
  },
  Docker: {
    category: "DevOps & Containers",
    categoryColor: "#F97316",
    role: "Containerized Environment & CI/CD Architect",
    projectsList: ["Backend Microservice Orchestration", "Reproducible Staging & Prod Builds", "Isolated Local Dev Engine"],
    useCases: ["Multi-Stage Dockerfile Builds", "Docker Compose Orchestration", "Environment Parity", "Fast Cold Starts"],
    architecture:
      "Multi-stage container builds ensuring exact parity across local development, staging, and production cloud environments with minimal image footprint and fast cold starts.",
    keyPatterns: [
      "Multi-Stage Dockerfile Builds",
      "Docker Compose Local Microservices",
      "Environment Variable Isolation",
      "Container Health Checks & Restart Policies",
    ],
  },
  Firebase: {
    category: "Serverless Cloud Platform",
    categoryColor: "#F97316",
    role: "Real-Time Cloud Synchronization Engineer",
    projectsList: ["KrishiSaathi Real-time Order Updates", "Secure User Authentication", "Live Notification Engine"],
    useCases: ["Real-Time Document Sync", "Serverless Authentication", "Live Webhook Subscriptions", "Firestore Indexes"],
    architecture:
      "Real-time event synchronization and managed serverless identity infrastructure powering instantaneous order state updates across concurrent buyer and seller sessions.",
    keyPatterns: [
      "Real-Time Document Listeners",
      "Serverless Firebase Authentication",
      "Compound Indexing & Security Rules",
      "Cloud Functions Background Triggers",
    ],
  },
  MongoDB: {
    category: "NoSQL Database",
    categoryColor: "#059669",
    role: "Distributed Document Store Architect",
    projectsList: ["KrishiSaathi Core Transactional Logs", "Geospatial Mandi Indexing", "User Inventory Storage"],
    useCases: ["Multi-Stage Aggregations", "Compound & Geospatial Indexes", "Flexible BSON Schemas", "Mongoose Validation"],
    architecture:
      "Flexible BSON document schemas designed for rapid iteration, nested transaction histories, and multi-stage aggregation pipelines for high-speed real-time analytics and geospatial query filtering.",
    keyPatterns: [
      "Multi-Stage Aggregation Pipelines",
      "Compound Indexing & Query Optimization",
      "Geospatial Indexing for Local Markets",
      "Mongoose Schema Validation",
    ],
  },
  "Vector Database": {
    category: "Semantic Vector Storage",
    categoryColor: "#059669",
    role: "High-Dimensional Vector Search Engineer",
    projectsList: ["MedTalk AI Memory Embeddings", "Semantic Document Retrieval Engine"],
    useCases: ["High-Dimensional Indexing", "Cosine Similarity Queries", "Metadata Filtering", "Real-time Embedding Lookup"],
    architecture:
      "High-speed semantic similarity indexing engine designed to store and query dense vector embeddings generated by LLM encoders for high-precision context retrieval.",
    keyPatterns: [
      "HNSW Vector Indexing Algorithms",
      "Hybrid Keyword + Semantic Search",
      "Low-Latency Cosine Distance Queries",
      "Dynamic Metadata Filtering",
    ],
  },
  SQL: {
    category: "Relational Database",
    categoryColor: "#059669",
    role: "Normalized Relational Schema Engineer",
    projectsList: ["Structured Financial Records", "ACID Transactional Logs", "Mandi Catalog Schemas"],
    useCases: ["Normalized 3NF Relational Schemas", "ACID Transaction Integrity", "Complex Joins & Window Functions", "Query Plan Optimization"],
    architecture:
      "Structured tabular data modeling with foreign key constraints, normalized tables (3NF), and high-concurrency ACID transaction guarantees for mission-critical records.",
    keyPatterns: [
      "ACID Transaction Integrity",
      "Normalized 3NF Relational Schemas",
      "Complex Joins & Window Functions",
      "Query Execution Plan Optimization",
    ],
  },
  Firestore: {
    category: "Real-Time Document Store",
    categoryColor: "#059669",
    role: "Low-Latency Cloud Database Specialist",
    projectsList: ["Real-Time Marketplace Sync", "Live Diagnostic Chat Engine"],
    useCases: ["Low-Latency Cloud Document Store", "Live Client Subscriptions", "Optimistic Concurrency", "Granular Security Rules"],
    architecture:
      "Low-latency cloud document database offering live client subscriptions, offline persistence capabilities, and atomic document updates for real-time collaborative interfaces.",
    keyPatterns: [
      "Atomic Batch Document Transactions",
      "Offline Persistence Synchronization",
      "Granular IAM & Security Rules",
      "Compound Document Queries",
    ],
  },
  Git: {
    category: "Developer Tools",
    categoryColor: "#EF4444",
    role: "Version Control & CI/CD Gatekeeper",
    projectsList: ["100% of Personal & Production Repositories", "Automated GitHub Actions CI/CD"],
    useCases: ["Trunk-Based Development & GitFlow", "Semantic Commits", "Pull Request Review Gates", "Branch Protection"],
    architecture:
      "Disciplined branching strategy (GitFlow / Trunk-Based) with atomic commits, pull request code reviews, and automated linting/testing gates before merging into production.",
    keyPatterns: [
      "Trunk-Based Development & GitFlow",
      "Semantic Commit Messages",
      "Automated GitHub Actions CI/CD",
      "Branch Protection & Code Review Gates",
    ],
  },
};

const getTechDetail = (name: string): TechDetailInfo => {
  if (TECH_DETAILS_MAP[name]) return TECH_DETAILS_MAP[name];
  return {
    category: "Engineering Ecosystem",
    categoryColor: "#3B82F6",
    role: "Full-Stack System Architect",
    projectsList: ["Core Portfolio Architecture & Applications"],
    useCases: ["System Architecture", "High-Availability Execution", "Performance Optimization"],
    architecture: `Full-stack architecture component powering reliable ${name} execution across the production engineering ecosystem.`,
    keyPatterns: [
      "Modular Component Architecture",
      "Type-Safe Execution Contracts",
      "Automated CI/CD Validation Gates",
      "High-Performance Runtime Caching",
    ],
  };
};

export default function Skills() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isOrbitPaused, setIsOrbitPaused] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [mobileOpenCategory, setMobileOpenCategory] = useState<string | null>("frontend");
  const [isMobileAccordionSectionOpen, setIsMobileAccordionSectionOpen] = useState(false);

  const orbitContainerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Active technology being inspected (clicked node)
  const activeTech = selectedNode;
  const activeDetail = activeTech ? getTechDetail(activeTech) : null;
  const connectedTechs = activeTech ? RELATIONSHIPS_MAP[activeTech] || [] : [];

  // Outside Click Dismissal: Close active inspection panel when clicking anywhere outside interactive tools/cards
  useEffect(() => {
    if (!selectedNode) return;

    const handleDocumentClick = () => {
      setSelectedNode(null);
    };

    const timer = setTimeout(() => {
      document.addEventListener("click", handleDocumentClick);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [selectedNode]);

  const getCategoryForTech = (techName: string) => {
    for (const cat of ENGINEERING_STACK) {
      if (cat.technologies.some((t) => t.name === techName)) {
        return cat.id;
      }
    }
    return null;
  };

  const handleNodeClick = (skillName: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedNode === skillName) {
      setSelectedNode(null);
      return;
    }
    setSelectedNode(skillName);
    setIsExpanded(true);

    const catId = getCategoryForTech(skillName);
    if (catId) {
      setMobileOpenCategory(catId);
    }
  };

  const handleToggleArchitecture = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsExpanded((prev) => !prev);
  };

  const handleBuildingWithClick = (techName: string, e?: React.MouseEvent) => {
    handleNodeClick(techName, e);
  };

  // Inject hardware-accelerated CSS keyframes for rotation that supports instant animation-play-state toggling
  useEffect(() => {
    const styleId = "engineering-ecosystem-keyframes";
    if (document.getElementById(styleId)) return;
    const styleEl = document.createElement("style");
    styleEl.id = styleId;
    styleEl.innerHTML = `
      @keyframes orbit-rotate-inner { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes orbit-counter-inner { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      @keyframes orbit-rotate-middle { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      @keyframes orbit-counter-middle { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes orbit-rotate-outer { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes orbit-counter-outer { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
    `;
    document.head.appendChild(styleEl);
  }, []);

  // Compute SVG connection lines from center (50%, 50%) to active node and its connected relationships
  const renderConnectionLines = (isMobile: boolean) => {
    if (!activeTech) return null;

    // Helper to calculate exact coordinates (percentage) for a given skill on its ring
    const getCoordinates = (skill: string) => {
      for (const ring of ORBIT_RINGS) {
        const idx = ring.skills.indexOf(skill);
        if (idx !== -1) {
          const count = ring.skills.length;
          const angleDeg = (360 / count) * idx;
          const angleRad = (angleDeg * Math.PI) / 180;
          const radius = isMobile ? ring.mobileRadiusPx : ring.radiusPx;
          // Orbit box center is at radius + buffer (e.g., 300px desktop half-width, 160px mobile half-width)
          const centerPx = isMobile ? 160 : 300;
          const x = centerPx + Math.cos(angleRad) * radius;
          const y = centerPx + Math.sin(angleRad) * radius;
          return { x, y };
        }
      }
      return null;
    };

    const activeCoords = getCoordinates(activeTech);
    if (!activeCoords) return null;

    const centerPx = isMobile ? 160 : 300;

    return (
      <svg className="absolute inset-0 pointer-events-none z-25 overflow-visible w-full h-full">
        {/* Ray from Center to Active Technology */}
        <line
          x1={centerPx}
          y1={centerPx}
          x2={activeCoords.x}
          y2={activeCoords.y}
          stroke="#3B82F6"
          strokeWidth={isMobile ? "1.5" : "2"}
          strokeDasharray="4 4"
          className="animate-pulse"
        />
        {/* Rays from Active Technology to Connected Technologies */}
        {connectedTechs.map((connSkill) => {
          const connCoords = getCoordinates(connSkill);
          if (!connCoords) return null;
          return (
            <line
              key={connSkill}
              x1={activeCoords.x}
              y1={activeCoords.y}
              x2={connCoords.x}
              y2={connCoords.y}
              stroke="#10B981"
              strokeWidth={isMobile ? "1.2" : "1.8"}
              strokeOpacity="0.8"
              strokeDasharray="6 4"
              className="animate-pulse"
            />
          );
        })}
      </svg>
    );
  };

  // Reusable Orbit Ring Renderer
  const renderOrbitalEcosystem = (isMobile: boolean) => {
    const boxSizePx = isMobile ? 340 : 600;

    return (
      <div
        ref={orbitContainerRef}
        onMouseEnter={() => setIsOrbitPaused(true)}
        onMouseLeave={() => setIsOrbitPaused(false)}
        className="relative flex items-center justify-center select-none mx-auto"
        style={{ width: `${boxSizePx}px`, height: `${boxSizePx}px` }}
      >
        {/* Ambient Multi-Layered Neon Radial Glow Core */}
        <div
          className={`absolute rounded-full pointer-events-none blur-3xl transition-opacity duration-500 ${
            activeTech ? "opacity-95 scale-105" : "opacity-70"
          }`}
          style={{
            width: isMobile ? "200px" : "420px",
            height: isMobile ? "200px" : "420px",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.5) 0%, rgba(168,85,247,0.25) 45%, transparent 75%)",
          }}
        />
        <div
          className="absolute rounded-full pointer-events-none blur-2xl transition-all duration-500"
          style={{
            width: isMobile ? "130px" : "280px",
            height: isMobile ? "130px" : "280px",
            background: "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
            opacity: activeTech ? 0.9 : 0.6,
          }}
        />

        {/* Connection Lines Overlay */}
        {renderConnectionLines(isMobile)}

        {/* Orbit Rings & Revolving Nodes */}
        {ORBIT_RINGS.map((ring) => {
          const count = ring.skills.length;
          const ringRadiusPx = isMobile ? ring.mobileRadiusPx : ring.radiusPx;
          const diameterPx = ringRadiusPx * 2;
          const isRingActive = activeTech && ring.skills.includes(activeTech);

          return (
            <div
              key={ring.id}
              className={`absolute rounded-full flex items-center justify-center transition-all duration-500 border pointer-events-none ${
                isRingActive
                  ? "border-[#3B82F6]/60 shadow-[0_0_35px_rgba(59,130,246,0.35)] z-30"
                  : activeTech
                  ? "border-white/10 border-dashed opacity-40 z-10"
                  : "border-white/15 border-dashed shadow-[0_0_20px_rgba(59,130,246,0.1)] z-20"
              }`}
              style={{
                width: `${diameterPx}px`,
                height: `${diameterPx}px`,
                animationName: !shouldReduceMotion ? `orbit-rotate-${ring.id}` : "none",
                animationDuration: `${ring.duration}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationPlayState: isOrbitPaused ? "paused" : "running",
                willChange: "transform",
              }}
            >
              {ring.skills.map((skill, i) => {
                const angleDeg = (360 / count) * i;
                const angleRad = (angleDeg * Math.PI) / 180;
                const leftPercent = (50 + Math.cos(angleRad) * 50).toFixed(4);
                const topPercent = (50 + Math.sin(angleRad) * 50).toFixed(4);

                const isNodeActive = activeTech === skill;
                const isConnected = connectedTechs.includes(skill);
                const isOtherDimmed = activeTech !== null && !isNodeActive && !isConnected;

                return (
                  <div
                    key={skill}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                    }}
                  >
                    <div
                      className="group/node relative flex items-center justify-center pointer-events-none"
                      style={{
                        animationName: !shouldReduceMotion ? `orbit-counter-${ring.id}` : "none",
                        animationDuration: `${ring.duration}s`,
                        animationTimingFunction: "linear",
                        animationIterationCount: "infinite",
                        animationPlayState: isOrbitPaused ? "paused" : "running",
                        willChange: "transform",
                      }}
                    >
                      <button
                        type="button"
                        onClick={(e) => handleNodeClick(skill, e)}
                        aria-label={`Inspect ${skill} engineering capabilities`}
                        aria-pressed={isNodeActive}
                        className={`pointer-events-auto relative rounded-full flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] w-12 h-12 sm:w-14 sm:h-14 ${
                          isNodeActive
                            ? "bg-[#161B22] border-2 border-[#3B82F6] shadow-[0_0_38px_rgba(59,130,246,0.95)] scale-125 z-50 ring-4 ring-[#3B82F6]/30"
                            : isConnected
                            ? "bg-[#10B981]/20 border-2 border-[#10B981] shadow-[0_0_26px_rgba(16,185,129,0.85)] scale-110 z-40 brightness-125"
                            : isOtherDimmed
                            ? "bg-[#161B22]/50 border border-white/10 opacity-30 blur-[0.8px] scale-90 grayscale-[30%] hover:opacity-90 hover:blur-none hover:scale-100 hover:grayscale-0 z-10"
                            : "bg-[#161B22] border border-white/15 shadow-[0_0_18px_rgba(59,130,246,0.22)] hover:scale-110 hover:border-[#3B82F6] hover:shadow-[0_0_28px_rgba(59,130,246,0.85)] z-20"
                        }`}
                      >
                        {/* Pulse Ring on Active or Connected Node */}
                        {isNodeActive && (
                          <span className="absolute -inset-2.5 rounded-full border-2 border-[#3B82F6] animate-ping pointer-events-none z-40 opacity-40" />
                        )}
                        {isConnected && (
                          <span className="absolute -inset-1.5 rounded-full border border-[#10B981] animate-pulse pointer-events-none z-30 opacity-60" />
                        )}

                        <TechIcon name={skill} size="md" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Dynamic Center Node / Monogram Core */}
        <div
          onClick={() => setSelectedNode(null)}
          role="button"
          tabIndex={0}
          aria-label="Click to reset center node view"
          className={`relative z-40 rounded-full bg-[#161B22] border-2 flex flex-col items-center justify-center transition-all duration-500 cursor-pointer shadow-2xl overflow-hidden p-4 text-center ${
            isMobile ? "w-36 h-36" : "w-48 h-48"
          } ${
            activeTech
              ? "border-[#3B82F6] shadow-[0_0_65px_rgba(59,130,246,0.65)] scale-105 bg-[#1A202C]"
              : "border-[#3B82F6]/70 shadow-[0_0_45px_rgba(59,130,246,0.4)] hover:scale-105"
          }`}
        >
          {/* Subtle core radial highlight */}
          <div
            className="absolute inset-1 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 75%)",
            }}
          />

          <AnimatePresence mode="wait">
            {activeTech && activeDetail ? (
              <motion.div
                key={`active-${activeTech}`}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92, y: 6 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, y: -6 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex flex-col items-center justify-center relative z-10 w-full px-2"
              >
                <div className="mb-1.5 transform scale-110">
                  <TechIcon name={activeTech} size={isMobile ? "md" : "lg"} />
                </div>
                <span className="font-display font-bold text-base sm:text-lg text-white leading-tight truncate max-w-[140px] sm:max-w-[170px]">
                  {activeTech}
                </span>
                <span
                  className="font-mono text-[9px] sm:text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full mt-1 border"
                  style={{
                    color: activeDetail.categoryColor,
                    borderColor: `${activeDetail.categoryColor}50`,
                    backgroundColor: `${activeDetail.categoryColor}18`,
                  }}
                >
                  {activeDetail.category}
                </span>
                <div className="mt-2 pt-1.5 border-t border-white/10 w-full font-mono text-[10px] text-white/80 space-y-1">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-white/60">Domain:</span>
                    <span className="font-bold text-[#3B82F6] truncate max-w-[90px]">{activeDetail.category}</span>
                  </div>
                  <div className="flex justify-between items-center px-1">
                    <span className="text-white/60">Used in:</span>
                    <span className="font-semibold text-emerald-400">{activeDetail.projectsList.length} {activeDetail.projectsList.length === 1 ? "Project" : "Projects"}</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="default-center"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.92 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="flex flex-col items-center justify-center relative z-10"
              >
                <span className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                  DV<span className="text-[#3B82F6] drop-shadow-[0_0_12px_rgba(59,130,246,0.9)]">.</span>
                </span>
                <span className="font-mono text-[10px] sm:text-xs text-[#3B82F6] font-bold uppercase tracking-widest mt-1.5">
                  Software Engineer
                </span>
                <span className="font-sans text-[10px] sm:text-[11px] text-white/65 mt-1 max-w-[150px] leading-snug">
                  Building production-ready systems
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <section
      id="skills"
      className="py-[var(--section-padding-y)] bg-[#111318] text-white border-y border-white/10 relative overflow-hidden transition-colors duration-300"
      aria-label="Engineering Ecosystem and Technical Capabilities"
    >
      {/* Soft Ambient Blue & Purple Gradients + CSS Particles */}
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none blur-[140px] opacity-25"
        style={{
          background:
            "radial-gradient(circle, rgba(59,130,246,0.35) 0%, rgba(139,92,246,0.18) 50%, transparent 80%)",
        }}
      />
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <span className="absolute top-16 left-[15%] w-1.5 h-1.5 rounded-full bg-[#3B82F6] animate-pulse" />
        <span className="absolute top-1/3 right-[18%] w-1 h-1 rounded-full bg-purple-400 animate-ping" />
        <span className="absolute bottom-1/4 left-[22%] w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="absolute top-2/3 right-[28%] w-1 h-1 rounded-full bg-blue-300 animate-pulse" />
      </div>

      <div className="content-width relative z-10">
        {/* Spatial Section Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-[#3B82F6] tracking-widest uppercase flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
                06 · TECHNICAL ARCHITECTURE
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              <span className="font-mono text-xs text-white/70">
                Production Stack &amp; System Capabilities
              </span>
            </div>
            <span className="font-mono text-xs text-white/70 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              {activeTech ? `Active Inspection: ${activeTech}` : "Interactive Orbital Navigation"}
            </span>
          </div>

          <div className="max-w-3xl mb-12">
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              Engineering Ecosystem
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed font-sans">
              Explore the technologies I use to design, build and deploy production-ready software systems.
            </p>
          </div>
        </ScrollReveal>

        {/* ── ORBITAL CENTERPIECE + FLOATING INFORMATION PANEL ── */}
        <div
          className={`relative flex flex-col lg:flex-row items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] w-full max-w-6xl mx-auto my-6 sm:my-10 ${
            activeTech && activeDetail
              ? "lg:justify-between gap-10 sm:gap-12"
              : "justify-center gap-0"
          }`}
        >
          {/* Orbit System Container (Pure CSS GPU transition, smoothly glides between center and left) */}
          <div
            className={`flex justify-center items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu ${
              activeTech && activeDetail ? "w-full lg:w-auto flex-1" : "w-full"
            }`}
          >
            {/* Mobile Orbit (< sm) */}
            <div className="flex sm:hidden py-6 min-h-[360px] items-center justify-center w-full">
              {renderOrbitalEcosystem(true)}
            </div>
            {/* Tablet & Desktop Orbit (>= sm) */}
            <div className="hidden sm:flex py-6 min-h-[620px] items-center justify-center w-full">
              {renderOrbitalEcosystem(false)}
            </div>
          </div>

          {/* Floating Information Card (popLayout pops exiting card to absolute positioning so it never drops below orbit when closing) */}
          <AnimatePresence mode="popLayout">
            {activeTech && activeDetail && (
              <motion.div
                key={`panel-${activeTech}`}
                onClick={(e) => e.stopPropagation()}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 30, scale: 0.96 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, scale: 1 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: 20, scale: 0.96 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] as const }}
                className="w-full lg:w-[440px] flex-shrink-0 p-6 sm:p-7 rounded-3xl bg-[#161B22]/95 border-2 border-[#3B82F6]/70 shadow-[0_12px_45px_rgba(0,0,0,0.6),0_0_35px_rgba(59,130,246,0.25)] backdrop-blur-xl space-y-6 z-40 transform-gpu will-change-transform mb-4 lg:mb-0"
              >
                {/* Top Header & Reset CTA */}
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-[14px] bg-white/5 border border-white/10 flex items-center justify-center shadow-md flex-shrink-0">
                      <TechIcon name={activeTech} size="lg" />
                    </div>
                    <div>
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                        {activeTech}
                      </h3>
                      <span
                        className="inline-block px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-wider mt-1 border"
                        style={{
                          backgroundColor: `${activeDetail.categoryColor}18`,
                          color: activeDetail.categoryColor,
                          borderColor: `${activeDetail.categoryColor}40`,
                        }}
                      >
                        {activeDetail.category} Layer
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedNode(null)}
                    className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 font-mono text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
                    title="Close panel"
                  >
                    ✕
                  </button>
                </div>

                {/* Skill Details Breakdown */}
                <div className="pb-4 border-b border-white/10 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-white/50 text-[10px] uppercase tracking-wider block">
                      Primary Engineering Role
                    </span>
                    <span className="text-[#3B82F6] font-bold text-sm sm:text-base block" title={activeDetail.role}>
                      {activeDetail.role}
                    </span>
                  </div>
                </div>

                {/* Primary Production Use Cases */}
                <div className="space-y-3">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/60 block font-semibold">
                    Core Engineering Capabilities
                  </span>
                  <ul className="space-y-2">
                    {activeDetail.useCases.map((useCase, idx) => (
                      <li
                        key={idx}
                        className="px-3 py-1.5 rounded-lg bg-[#111827] border border-white/10 font-mono text-xs text-white/90 flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
                        <span className="truncate">{useCase}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Used In Project References */}
                <div className="pt-3 border-t border-white/10">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-white/60 block mb-2 font-semibold">
                    Used In Production Projects
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeDetail.projectsList.map((proj, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-full bg-[#3B82F6]/15 border border-[#3B82F6]/30 font-mono text-xs font-semibold text-white/95"
                      >
                        ◆ {proj}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Connected Relationships Highlight */}
                {connectedTechs.length > 0 && (
                  <div className="p-3 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                      <span className="font-mono text-xs text-[#10B981] font-semibold">
                        Connected Ecosystem:
                      </span>
                    </div>
                    <span className="font-mono text-xs text-white/90 font-bold">
                      {connectedTechs.join(" · ")}
                    </span>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── CURRENTLY BUILDING WITH (Interactive Pills) ── */}
        <div className="my-12 flex flex-col items-center w-full">
          <span className="font-mono text-xs uppercase tracking-wider text-white/70 mb-4 font-semibold flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
            CURRENTLY BUILDING WITH
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 max-w-3xl px-4">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Python",
              "Gemini API",
              "MongoDB",
              "Tailwind CSS",
              "Firebase",
            ].map((tech) => {
              const isChipSelected = selectedNode === tech;
              return (
                <button
                  key={tech}
                  type="button"
                  onClick={(e) => handleBuildingWithClick(tech, e)}
                  className={`group inline-flex items-center gap-2.5 px-4 py-2.5 min-h-[48px] rounded-[16px] border font-mono text-xs sm:text-sm transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform cursor-pointer shadow-lg ${
                    isChipSelected
                      ? "bg-[#1C2333] text-white border-[#3B82F6] font-bold shadow-[0_0_28px_rgba(59,130,246,0.85)] scale-105 ring-2 ring-[#3B82F6]/40 -translate-y-0.5"
                      : "bg-[#161B22] border-white/10 text-white/90 hover:border-[#3B82F6] hover:bg-[#1C2333] hover:shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:-translate-y-0.5"
                  }`}
                >
                  <TechIcon name={tech} size="sm" />
                  <span>{tech}</span>
                  <span className="text-[#3B82F6] opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5 font-bold">
                    ↗
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── EXPAND BUTTON (`Explore Technical Architecture`) ── */}
        <div className="flex flex-col items-center justify-center my-8">
          <Button
            variant={isExpanded ? "secondary" : "primary"}
            size="lg"
            onClick={handleToggleArchitecture}
            className="shadow-xl hover:shadow-2xl transition-all duration-300 ease-out font-bold px-8"
            aria-expanded={isExpanded}
            aria-controls="technical-architecture-cards"
          >
            <span>
              {isExpanded ? "Collapse Technical Architecture" : "Explore Technical Architecture"}
            </span>
            <span className={`ml-2.5 inline-block transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
              ▼
            </span>
          </Button>
          <span className="font-mono text-xs text-white/60 mt-3 tracking-wide">
            {isExpanded
              ? "Showing complete categorized engineering architecture below"
              : "Click above to expand all 6 domain architecture categories with deep blueprints."}
          </span>
        </div>

        {/* ── TECHNICAL CARDS (`ENGINEERING_STACK` Categories & Cards) ── */}
        <div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                id="technical-architecture-cards"
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.42, ease: "easeInOut" }}
                className="overflow-hidden pt-6"
              >
                <div className="pt-8 border-t border-white/10 space-y-10">
                  <div className="max-w-2xl">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] font-semibold block mb-2">
                      SYSTEM ARCHITECTURE BREAKDOWN
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                      Technical Domain Stack
                    </h3>
                  </div>

                  {/* Mobile Accordion View (< lg) */}
                  <div className="block lg:hidden space-y-4">
                    {ENGINEERING_STACK.map((category, index) => {
                      const isOpen = mobileOpenCategory === category.id;
                      return (
                        <motion.div
                          key={`mobile-cat-${category.id}`}
                          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                          transition={{
                            duration: 0.35,
                            ease: "easeInOut",
                            delay: shouldReduceMotion ? 0 : index * 0.05 + 0.08,
                          }}
                          className="rounded-3xl bg-[#161B22] border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:border-[#3B82F6]/50 overflow-hidden transform-gpu transition-colors duration-300"
                        >
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setMobileOpenCategory(isOpen ? null : category.id);
                            }}
                            aria-expanded={isOpen}
                            className="w-full min-h-[56px] px-6 py-4 flex items-center justify-between text-left focus-visible:outline-2 focus-visible:outline-[#3B82F6] cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <span
                                className="w-2.5 h-2.5 rounded-full"
                                style={{ backgroundColor: category.accentColor }}
                              />
                              <div>
                                <h4 className="font-display font-extrabold text-base text-white">
                                  {category.title}
                                </h4>
                                <p className="font-mono text-xs text-white/60 mt-0.5">
                                  {category.subtitle}
                                </p>
                              </div>
                            </div>
                            <span
                              className="font-mono text-sm text-[#3B82F6] transition-transform duration-200 transform-gpu"
                              style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
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
                                <div className="px-5 pb-6 pt-2 border-t border-white/10 grid grid-cols-1 gap-3">
                                  {category.technologies.map((tech) => (
                                    <div
                                      key={`mobile-tech-${tech.name}`}
                                      onClick={(e) => handleBuildingWithClick(tech.name, e)}
                                      className="p-4 rounded-2xl bg-[#111827] border border-white/10 hover:border-[#3B82F6] flex items-start gap-3.5 cursor-pointer transition-transform duration-200 transform-gpu will-change-transform"
                                    >
                                      <div className="w-10 h-10 min-h-[48px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                                        <TechIcon name={tech.name} size="md" />
                                      </div>
                                      <div>
                                        <h5 className="font-display font-bold text-base text-white">
                                          {tech.name}
                                        </h5>
                                        <p className="font-mono text-xs text-white/70 leading-relaxed mt-1">
                                          {tech.descriptor}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Desktop 2-Column Grid (>= lg) */}
                  <div className="hidden lg:grid grid-cols-2 gap-8 items-stretch">
                    {ENGINEERING_STACK.map((category, index) => (
                      <motion.div
                        key={category.id}
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
                        transition={{
                          duration: 0.38,
                          ease: "easeInOut",
                          delay: shouldReduceMotion ? 0 : index * 0.05 + 0.08,
                        }}
                        className="group/cat p-7 sm:p-8 rounded-3xl bg-[#161B22] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:bg-[#1C2333] hover:border-[#3B82F6]/50 hover:-translate-y-1 hover:shadow-[0_0_36px_rgba(59,130,246,0.22)] transition-all duration-300 ease-out flex flex-col justify-between"
                      >
                        <div className="flex items-baseline justify-between gap-2 pb-5 mb-6 border-b border-white/10">
                          <div className="flex items-center gap-3">
                            <h4
                              className="font-display font-bold text-2xl text-white transition-colors"
                              style={{ color: category.accentColor }}
                            >
                              {category.title}
                            </h4>
                            <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border ${category.accentClass}`}>
                              Domain
                            </span>
                          </div>
                          <p className="text-xs font-mono text-white/60">
                            {category.subtitle}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 flex-grow">
                          {category.technologies.map((tech) => {
                            const isCardActive = activeTech === tech.name;
                            return (
                              <div
                                key={tech.name}
                                onClick={(e) => handleNodeClick(tech.name, e)}
                                tabIndex={0}
                                role="button"
                                aria-label={`${tech.name}: ${tech.descriptor}`}
                                className={`group/card p-5 rounded-2xl border transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform flex flex-col justify-between h-full min-h-[130px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                                  isCardActive
                                    ? "bg-[#1C2333] border-2 border-[#3B82F6] shadow-[0_0_28px_rgba(59,130,246,0.55)] -translate-y-1.5 ring-2 ring-[#3B82F6]/30"
                                    : "bg-[#111827] border-white/10 hover:bg-[#1C2333] hover:border-[#3B82F6]/60 hover:shadow-[0_4px_30px_rgba(59,130,246,0.2)] hover:-translate-y-1"
                                }`}
                              >
                                <div className="flex items-center gap-3.5 mb-3">
                                  <div
                                    className="w-11 h-11 rounded-[14px] flex items-center justify-center transition-transform duration-300 ease-out transform-gpu flex-shrink-0 border shadow-md group-hover/card:rotate-12 group-hover/card:scale-110"
                                    style={{
                                      backgroundColor: isCardActive ? "rgba(59,130,246,0.18)" : "rgba(255, 255, 255, 0.05)",
                                      borderColor: isCardActive ? "#3B82F6" : "rgba(255, 255, 255, 0.08)",
                                    }}
                                  >
                                    <TechIcon name={tech.name} size="md" />
                                  </div>
                                  <span
                                    className={`font-display font-bold text-base transition-colors duration-200 ${
                                      isCardActive ? "text-[#3B82F6]" : "text-white group-hover/card:text-white"
                                    }`}
                                  >
                                    {tech.name}
                                  </span>
                                </div>
                                <p className="text-xs text-white/70 leading-relaxed font-mono">
                                  {tech.descriptor}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
