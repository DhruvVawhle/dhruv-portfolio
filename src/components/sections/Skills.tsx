"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import TechIcon from "@/components/ui/TechIcon";
import Button from "@/components/ui/Button";

// Orbit ring configuration for default hero visual
interface RingConfig {
  id: string;
  radiusClass: string;
  duration: number;
  direction: 1 | -1;
  skills: string[];
}

const ORBIT_RINGS: RingConfig[] = [
  {
    id: "inner",
    radiusClass: "w-[210px] h-[210px] lg:w-[240px] lg:h-[240px]",
    duration: 22,
    direction: 1,
    skills: ["React", "TypeScript", "Node.js", "Python"],
  },
  {
    id: "middle",
    radiusClass: "w-[350px] h-[350px] lg:w-[400px] lg:h-[400px]",
    duration: 30,
    direction: -1,
    skills: ["Next.js", "MongoDB", "Tailwind CSS", "Express"],
  },
  {
    id: "outer",
    radiusClass: "w-[490px] h-[490px] lg:w-[570px] lg:h-[570px]",
    duration: 38,
    direction: 1,
    skills: ["AWS", "GCP", "Docker", "Git", "SQL"],
  },
];

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
    accentColor: "#3B82F6", // Blue
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
    accentColor: "#10B981", // Green
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
    accentColor: "#A855F7", // Purple
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
    accentColor: "#F97316", // Orange
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
    accentColor: "#059669", // Emerald
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
    accentColor: "#EF4444", // Red
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
  description: string;
  usedIn: string;
  skillLevel: string;
}

const TECH_DETAILS_MAP: Record<string, TechDetailInfo> = {
  React: {
    category: "Frontend Engineering",
    categoryColor: "#3B82F6",
    description: "Component-driven UI library & reactive DOM reconciliation",
    usedIn: "KrishiSaathi AI Platform & MedTalk Clinical Chatbot",
    skillLevel: "Expert / Production Ready",
  },
  "Next.js": {
    category: "Frontend Engineering",
    categoryColor: "#3B82F6",
    description: "Full-stack React framework, App Router & Server Actions",
    usedIn: "Portfolio Architecture & KrishiSaathi Core API",
    skillLevel: "Expert / Production Ready",
  },
  TypeScript: {
    category: "Frontend Engineering",
    categoryColor: "#3B82F6",
    description: "End-to-end static typing, generics & safety contracts",
    usedIn: "100% Strict Type Codebase across all applications",
    skillLevel: "Expert / Production Ready",
  },
  "Tailwind CSS": {
    category: "Frontend Engineering",
    categoryColor: "#3B82F6",
    description: "Token-based utility styling & responsive glassmorphism",
    usedIn: "Portfolio Design System & Mobile Dashboards",
    skillLevel: "Expert / Production Ready",
  },
  "Node.js": {
    category: "Backend & APIs",
    categoryColor: "#10B981",
    description: "Async V8 JavaScript event loop & backend microservices",
    usedIn: "KrishiSaathi Gateway & Edith AI Orchestrator",
    skillLevel: "Expert / Production Ready",
  },
  Express: {
    category: "Backend & APIs",
    categoryColor: "#10B981",
    description: "Modular HTTP REST API gateway & middleware pipeline",
    usedIn: "KrishiSaathi Microservices & Order Routes",
    skillLevel: "Expert / Production Ready",
  },
  Python: {
    category: "AI / Machine Learning",
    categoryColor: "#A855F7",
    description: "Data analysis, predictive modeling & backend endpoints",
    usedIn: "Crop Price Prediction ML Engine & MedTalk Backend",
    skillLevel: "Expert / Applied ML",
  },
  "REST APIs": {
    category: "Backend & APIs",
    categoryColor: "#10B981",
    description: "Structured HTTP service contracts & webhook callbacks",
    usedIn: "All core distributed applications & integrations",
    skillLevel: "Expert / Production Ready",
  },
  "Gemini API": {
    category: "AI / Machine Learning",
    categoryColor: "#A855F7",
    description: "Multimodal NLU, structured outputs & reasoning pipelines",
    usedIn: "Edith Assistant & Automated Portfolio Insights",
    skillLevel: "Expert / Production Ready",
  },
  RAG: {
    category: "AI / Machine Learning",
    categoryColor: "#A855F7",
    description: "Retrieval-Augmented Generation & vector embedding search",
    usedIn: "MedTalk Clinical Knowledge Retrieval Engine",
    skillLevel: "Advanced / Production Ready",
  },
  Pandas: {
    category: "AI / Machine Learning",
    categoryColor: "#A855F7",
    description: "High-performance structured tabular data cleaning & ETL",
    usedIn: "Historical Mandi Crop Data Processing Pipelines",
    skillLevel: "Advanced / Data Engineering",
  },
  Matplotlib: {
    category: "AI / Machine Learning",
    categoryColor: "#A855F7",
    description: "Exploratory technical visualization & statistical charting",
    usedIn: "Agricultural Market Trend Analysis & Reports",
    skillLevel: "Advanced / Visual Analytics",
  },
  AWS: {
    category: "Cloud Infrastructure",
    categoryColor: "#F97316",
    description: "Scalable cloud compute, S3 storage & Lambda triggers",
    usedIn: "High-Availability Production Cloud Deployments",
    skillLevel: "Advanced / Cloud Architect",
  },
  GCP: {
    category: "Cloud Infrastructure",
    categoryColor: "#F97316",
    description: "Vertex AI endpoints, BigQuery SQL & Cloud Functions",
    usedIn: "Google Cloud Certified AI Security & Analytics",
    skillLevel: "Certified / Cloud Specialist",
  },
  Docker: {
    category: "Cloud Infrastructure",
    categoryColor: "#F97316",
    description: "Multi-stage containerized reproducible runtimes",
    usedIn: "Isolated Local Dev & Cloud Orchestration",
    skillLevel: "Advanced / DevOps",
  },
  Firebase: {
    category: "Cloud Infrastructure",
    categoryColor: "#F97316",
    description: "Real-time document synchronization & serverless auth",
    usedIn: "Real-time Order Updates & User Authentication",
    skillLevel: "Expert / Production Ready",
  },
  MongoDB: {
    category: "Database Systems",
    categoryColor: "#059669",
    description: "Distributed NoSQL document store & aggregation pipeline",
    usedIn: "KrishiSaathi Core Transactional & Geospatial Logs",
    skillLevel: "Expert / Production Ready",
  },
  "Vector Database": {
    category: "Database Systems",
    categoryColor: "#059669",
    description: "High-dimensional semantic similarity indexing & search",
    usedIn: "AI Memory Embeddings & Document Retrieval",
    skillLevel: "Advanced / Production Ready",
  },
  SQL: {
    category: "Database Systems",
    categoryColor: "#059669",
    description: "Normalized 3NF relational schema modeling & queries",
    usedIn: "Structured Financial & Transactional Records",
    skillLevel: "Advanced / Production Ready",
  },
  Firestore: {
    category: "Database Systems",
    categoryColor: "#059669",
    description: "Low-latency cloud document store & live subscriptions",
    usedIn: "Real-Time Chat & Live Marketplace Sync",
    skillLevel: "Expert / Production Ready",
  },
  Git: {
    category: "Developer Tools",
    categoryColor: "#EF4444",
    description: "Distributed version control, CI/CD gates & GitFlow",
    usedIn: "Rigorous Version Control across all Repositories",
    skillLevel: "Expert / Production Ready",
  },
};

const getTechDetail = (name: string): TechDetailInfo => {
  if (TECH_DETAILS_MAP[name]) return TECH_DETAILS_MAP[name];
  return {
    category: "Engineering Stack",
    categoryColor: "#3B82F6",
    description: `Full-stack architecture component powering reliable ${name} execution.`,
    usedIn: "Core Portfolio Architecture & Applications",
    skillLevel: "Production Ready",
  };
};

// Rich Architectural Dictionary for Orbital Nodes & Stack Items
const ARCHITECTURE_MAP: Record<
  string,
  {
    role: string;
    architecture: string;
    keyPatterns: string[];
    usedInProjects: { title: string; usage: string }[];
  }
> = {
  React: {
    role: "Client-Side Component & State Architecture",
    architecture:
      "Implements unidirectional data flow with custom hooks and reactive virtual DOM reconciliation. Structured around atomic design tokens and memoized state selectors to eliminate unnecessary re-renders across high-frequency real-time interfaces.",
    keyPatterns: [
      "Custom Hooks & Context Providers",
      "Virtual DOM Reconciliation & Memoization",
      "Atomic Design System Components",
      "Lazy Loading & Code Splitting",
    ],
    usedInProjects: [
      { title: "KrishiSaathi AI Platform", usage: "Interactive farmer marketplace, AI price forecasting charts, and real-time order tracking" },
      { title: "MedTalk Clinical Chatbot", usage: "Real-time diagnostic chat interface with streaming markdown rendering" },
    ],
  },
  "Next.js": {
    role: "Full-Stack Server-Side Rendering & App Router Gateway",
    architecture:
      "Leverages React Server Components (RSCs), server actions, and edge route handlers for optimal First Contentful Paint (FCP) and secure server-to-server API execution without exposing client secrets.",
    keyPatterns: [
      "React Server Components (RSC)",
      "Dynamic Route Handlers & API Middleware",
      "Static Site Generation (SSG) + ISR",
      "Turbopack Bundling & Optimization",
    ],
    usedInProjects: [
      { title: "Portfolio Architecture", usage: "Built with Next.js App Router, custom typography tokens, and high-performance image optimization" },
      { title: "KrishiSaathi Ecosystem", usage: "Server-side dashboard rendering and secure API routing for payment gateways" },
    ],
  },
  TypeScript: {
    role: "Strict Static Type Contracts & Domain Models",
    architecture:
      "Enforces end-to-end type safety across client interfaces, REST request payloads, and database schema definitions. Eliminates runtime null pointer errors through discriminated unions and strict compiler rules.",
    keyPatterns: [
      "Strict Null Checks & Discriminated Unions",
      "Generics & Utility Type Transformations",
      "End-to-End API Payload Validation",
      "Shared Domain Type Definitions",
    ],
    usedInProjects: [
      { title: "Portfolio Site & Applications", usage: "100% strict TypeScript codebase with zero `any` types or unsafe casting" },
      { title: "KrishiSaathi Core API", usage: "Type-safe order lifecycle and payment state machines" },
    ],
  },
  "Node.js": {
    role: "Asynchronous Event-Driven Backend Runtime",
    architecture:
      "High-throughput non-blocking I/O runtime handling concurrent REST API requests, websocket streams, and background task dispatching across microservices and external LLM endpoints.",
    keyPatterns: [
      "Non-Blocking Event Loop & Streams",
      "JWT Authentication & Role Middleware",
      "Cluster Mode Multi-Processing",
      "Asynchronous Task Scheduling",
    ],
    usedInProjects: [
      { title: "KrishiSaathi Backend", usage: "RESTful API gateway handling farmer verification, order creation, and payment webhooks" },
      { title: "Edith AI Assistant", usage: "Backend orchestration service handling multi-tool LLM dispatching and context storage" },
    ],
  },
  Python: {
    role: "Applied Machine Learning & Data Processing Engine",
    architecture:
      "Powering predictive analytics pipelines, LLM inference endpoints, and automated data ingestion scripts. Utilizes vectorized numpy operations and FastAPI/Flask microservices for rapid data processing.",
    keyPatterns: [
      "FastAPI & Flask REST Endpoints",
      "Scikit-Learn Regression & Time-Series Models",
      "Vector Embeddings & RAG Retrieval",
      "Asynchronous Data Scraping & ETL",
    ],
    usedInProjects: [
      { title: "KrishiSaathi ML Engine", usage: "Ensemble regression models predicting crop market prices across 500+ mandis" },
      { title: "MedTalk AI Backend", usage: "Medical knowledge retrieval and diagnostic reasoning backend" },
    ],
  },
  MongoDB: {
    role: "Distributed NoSQL Document Store & Aggregation Engine",
    architecture:
      "Flexible BSON document schemas designed for rapid iteration, nested transaction histories, and multi-stage aggregation pipelines for high-speed real-time analytics and geospatial query filtering.",
    keyPatterns: [
      "Multi-Stage Aggregation Pipelines",
      "Compound Indexing & Query Optimization",
      "Geospatial Indexing for Local Markets",
      "Mongoose Schema Validation",
    ],
    usedInProjects: [
      { title: "KrishiSaathi Database", usage: "Stores farmer profiles, crop inventories, order transactions, and real-time mandi logs" },
    ],
  },
  "Tailwind CSS": {
    role: "Utility-First Tokenized Styling & Design System",
    architecture:
      "Constrained design system architecture using custom color tokens, responsive breakpoints, and modern layout algorithms (CSS Grid/Flexbox) with zero dead CSS and sub-millisecond styling execution.",
    keyPatterns: [
      "Custom Design Tokens & CSS Variables",
      "Dark Mode & Glassmorphic Surfaces",
      "Responsive Breakpoint Engineering",
      "Hardware-Accelerated Micro-Animations",
    ],
    usedInProjects: [
      { title: "Portfolio Design System", usage: "Custom tokenized CSS with rich glassmorphic aesthetics and zero layout shifts" },
      { title: "KrishiSaathi Responsive UI", usage: "Clean accessible dashboards for farmers and institutional buyers across mobile devices" },
    ],
  },
  Express: {
    role: "Lightweight HTTP API Gateway & Middleware Pipeline",
    architecture:
      "Modular middleware chain handling request sanitation, CORS policies, rate limiting, and structured JSON error serialization for high-reliability backend service integration.",
    keyPatterns: [
      "Middleware Chain of Responsibility",
      "Rate Limiting & DDOS Protection",
      "Structured Error Handling & Logging",
      "CORS & Security Headers (Helmet)",
    ],
    usedInProjects: [
      { title: "KrishiSaathi Microservices", usage: "Modular routes separating buyer orders, farmer listings, and payment callbacks" },
    ],
  },
  AWS: {
    role: "Cloud Infrastructure & Serverless Compute",
    architecture:
      "Scalable cloud deployment leveraging EC2 virtual server instances, S3 object asset storage, CloudFront CDN edge caching, and Lambda functions for asynchronous background triggers.",
    keyPatterns: [
      "S3 Object Storage & CDN Caching",
      "Serverless Lambda Functions",
      "IAM Role & Security Groups",
      "CloudWatch Metrics & Alerting",
    ],
    usedInProjects: [
      { title: "Production Cloud Deployments", usage: "High-availability cloud hosting, asset storage, and serverless compute triggers" },
    ],
  },
  GCP: {
    role: "AI Platform & Managed Cloud Datasets",
    architecture:
      "Utilizing Google Cloud Vertex AI for model evaluation and inference integration alongside BigQuery for analytical processing over large historical agricultural datasets.",
    keyPatterns: [
      "Vertex AI Model Endpoints",
      "BigQuery SQL Analytics",
      "Cloud Functions Event Processing",
      "IAM & Service Account Security",
    ],
    usedInProjects: [
      { title: "Google Cloud AI Security", usage: "Verified industry credential in securing AI workloads on GCP" },
      { title: "KrishiSaathi Analytics", usage: "Processing historical crop pricing trends using GCP analytical tools" },
    ],
  },
  Docker: {
    role: "Containerized Environment & Reproducible Builds",
    architecture:
      "Multi-stage container builds ensuring exact parity across local development, staging, and production cloud environments with minimal image footprint and fast cold starts.",
    keyPatterns: [
      "Multi-Stage Dockerfile Builds",
      "Docker Compose Local Microservices",
      "Environment Variable Isolation",
      "Container Health Checks & Restart Policies",
    ],
    usedInProjects: [
      { title: "Backend Microservice Deployments", usage: "Containerized API microservices enabling seamless cloud orchestration" },
    ],
  },
  Git: {
    role: "Distributed Version Control & CI/CD Workflow",
    architecture:
      "Disciplined branching strategy (GitFlow / Trunk-Based) with atomic commits, pull request code reviews, and automated linting/testing gates before merging into production.",
    keyPatterns: [
      "Trunk-Based Development & GitFlow",
      "Semantic Commit Messages",
      "Automated GitHub Actions CI/CD",
      "Branch Protection & Code Review Gates",
    ],
    usedInProjects: [
      { title: "All Software Repositories", usage: "Rigorous version control across personal projects, internships, and hackathons" },
    ],
  },
  SQL: {
    role: "Relational Schema Design & ACID Transactions",
    architecture:
      "Structured tabular data modeling with foreign key constraints, normalized tables (3NF), and high-concurrency ACID transaction guarantees for mission-critical records.",
    keyPatterns: [
      "ACID Transaction Integrity",
      "Normalized 3NF Relational Schemas",
      "Complex Joins & Window Functions",
      "Query Execution Plan Optimization",
    ],
    usedInProjects: [
      { title: "Structured Data Systems", usage: "Financial transaction logs and structured entity relationships across core projects" },
    ],
  },
};

export default function Skills() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedRingId, setSelectedRingId] = useState<string | null>(null);
  const [mobileOpenCategory, setMobileOpenCategory] = useState<string | null>("frontend-engineering");
  const [isMobileAccordionSectionOpen, setIsMobileAccordionSectionOpen] = useState(false);

  const stackRef = useRef<HTMLDivElement>(null);
  const architectureRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Handle clicking an orbital node or technology pill/card
  const handleNodeClick = (skillName: string) => {
    if (selectedNode === skillName) {
      // Clicking same node resets orbit
      setSelectedNode(null);
      setSelectedRingId(null);
      return;
    }

    // Find orbit ring containing this node
    const ring = ORBIT_RINGS.find((r) => r.skills.includes(skillName));
    setSelectedNode(skillName);
    setSelectedRingId(ring?.id || "outer");

    // Ensure architectural view is expanded
    if (!isExpanded) {
      setIsExpanded(true);
    }

    // Smooth camera scroll down towards the expanded architecture view right below the orbit
    setTimeout(() => {
      architectureRef.current?.scrollIntoView({
        behavior: shouldReduceMotion ? "auto" : "smooth",
        block: "center",
      });
    }, 140);
  };

  const handleToggleStack = () => {
    const nextState = !isExpanded;
    setIsExpanded(nextState);

    if (nextState) {
      setTimeout(() => {
        stackRef.current?.scrollIntoView({
          behavior: shouldReduceMotion ? "auto" : "smooth",
          block: "start",
        });
      }, 150);
    }
  };

  // Reusable Orbital Ring System Render (keeps exact desktop logic intact while powering mobile scaling)
  const renderOrbitalSystem = () => (
    <div className="flex flex-col items-center justify-center my-6 sm:my-10 w-full">
      <div className="relative w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] lg:w-[600px] lg:h-[600px] flex items-center justify-center">
        {/* Multi-layered Neon Radial Glow Core */}
        <div
          className={`absolute w-80 h-80 rounded-full pointer-events-none blur-3xl transition-opacity duration-500 ${
            selectedNode ? "opacity-90 animate-pulse" : "opacity-65 animate-pulse"
          }`}
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.55) 0%, rgba(139,92,246,0.3) 45%, transparent 75%)",
          }}
        />
        <div
          className={`absolute w-52 h-52 rounded-full pointer-events-none blur-2xl transition-all duration-500 ${
            selectedNode ? "scale-110 opacity-100" : "opacity-80"
          }`}
          style={{
            background:
              "radial-gradient(circle, #3B82F6 0%, transparent 70%)",
          }}
        />

        {/* Orbit Rings & Revolving Icons */}
        {ORBIT_RINGS.map((ring) => {
          const count = ring.skills.length;
          const isRingSelected = selectedRingId === ring.id;
          const isOtherRingSelected = selectedRingId && selectedRingId !== ring.id;

          return (
            <motion.div
              key={ring.id}
              className={`absolute rounded-full flex items-center justify-center transition-all duration-500 ${
                ring.radiusClass
              } ${
                isRingSelected
                  ? "border-2 border-[#3B82F6] shadow-[0_0_45px_rgba(59,130,246,0.7)] brightness-125 scale-[1.01] z-30 border-solid"
                  : isOtherRingSelected
                  ? "border border-[rgba(255,255,255,0.08)] border-dashed opacity-25 blur-[0.5px] z-10"
                  : "border border-[rgba(255,255,255,0.15)] border-dashed shadow-[0_0_20px_rgba(59,130,246,0.12)] z-20"
              }`}
              animate={
                shouldReduceMotion
                  ? undefined
                  : { rotate: ring.direction * 360 }
              }
              transition={{
                duration: ring.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {ring.skills.map((skill, i) => {
                const angleDeg = (360 / count) * i;
                const angleRad = (angleDeg * Math.PI) / 180;
                const leftPercent = (50 + Math.cos(angleRad) * 50).toFixed(4);
                const topPercent = (50 + Math.sin(angleRad) * 50).toFixed(4);

                const isNodeSelected = selectedNode === skill;
                const isOtherNodeSelected = selectedNode && selectedNode !== skill;
                const techDetail = getTechDetail(skill);
                const isTopNode = Number(topPercent) < 45;

                return (
                  <div
                    key={skill}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `${leftPercent}%`,
                      top: `${topPercent}%`,
                    }}
                  >
                    <motion.div
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : { rotate: ring.direction * -360 }
                      }
                      transition={{
                        duration: ring.duration,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="group relative flex items-center justify-center"
                    >
                      <button
                        type="button"
                        onClick={() => handleNodeClick(skill)}
                        aria-label={`Inspect ${skill} architecture`}
                        aria-pressed={isNodeSelected}
                        className={`relative rounded-full flex items-center justify-center transition-all duration-300 ease-out cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                          isNodeSelected
                            ? "w-14 h-14 lg:w-16 lg:h-16 bg-[#161B22] border-2 border-[#3B82F6] shadow-[0_0_38px_rgba(59,130,246,0.95)] scale-[1.15] lg:scale-[1.15] z-50"
                            : isOtherNodeSelected
                            ? "w-10 h-10 lg:w-12 lg:h-12 bg-[#161B22]/60 border border-[rgba(255,255,255,0.08)] opacity-30 blur-[1px] scale-90 grayscale-[40%] hover:opacity-90 hover:blur-none hover:scale-100 hover:grayscale-0"
                            : "w-10 h-10 lg:w-12 lg:h-12 bg-[#161B22] border border-[rgba(255,255,255,0.15)] shadow-[0_0_18px_rgba(59,130,246,0.25)] hover:scale-110 hover:border-[#3B82F6] hover:shadow-[0_0_28px_rgba(59,130,246,0.85)]"
                        }`}
                      >
                        {/* Animated Blue Outer Ring on Selected Node */}
                        {isNodeSelected && (
                          <span className="absolute -inset-2.5 rounded-full border-2 border-[#3B82F6] ring-4 ring-[#3B82F6]/40 animate-pulse pointer-events-none z-40 shadow-[0_0_24px_rgba(59,130,246,0.8)]" />
                        )}

                        <TechIcon name={skill} size={isNodeSelected ? "lg" : "md"} />
                      </button>

                      {/* Frosted Dark Tooltip Panel */}
                      <div
                        className={`absolute left-1/2 -translate-x-1/2 rounded-2xl border p-3.5 w-64 text-left pointer-events-none z-[60] transition-all duration-300 ease-out shadow-2xl ${
                          isTopNode ? "top-14" : "bottom-14"
                        } ${
                          isNodeSelected
                            ? "opacity-100 scale-100"
                            : isOtherNodeSelected
                            ? "opacity-0 scale-95 pointer-events-none"
                            : "opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100"
                        }`}
                        style={{
                          backgroundColor: "rgba(22, 27, 34, 0.95)",
                          borderColor: "rgba(255, 255, 255, 0.08)",
                          backdropFilter: "blur(12px)",
                        }}
                      >
                        <div className="flex items-center justify-between gap-2 border-b border-[rgba(255,255,255,0.08)] pb-2 mb-2">
                          <span className="font-display font-bold text-sm text-white">
                            {skill}
                          </span>
                          <span
                            className="px-2 py-0.5 rounded-full font-mono text-[10px] font-semibold border"
                            style={{
                              color: techDetail.categoryColor,
                              borderColor: `${techDetail.categoryColor}40`,
                              backgroundColor: `${techDetail.categoryColor}15`,
                            }}
                          >
                            {techDetail.category}
                          </span>
                        </div>
                        <p className="font-mono text-[11px] text-white/80 leading-relaxed mb-2">
                          {techDetail.description}
                        </p>
                        <div className="space-y-1 pt-1 border-t border-[rgba(255,255,255,0.06)] font-mono text-[10px]">
                          <div className="flex justify-between text-white/60">
                            <span>Used in:</span>
                            <span className="text-white font-medium text-right truncate max-w-[140px]">{techDetail.usedIn}</span>
                          </div>
                          <div className="flex justify-between text-white/60">
                            <span>Skill Level:</span>
                            <span className="text-emerald-400 font-semibold">{techDetail.skillLevel}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          );
        })}

        {/* Glowing Central Monogram Orb */}
        <motion.div
          onClick={() => {
            setSelectedNode(null);
            setSelectedRingId(null);
          }}
          className="relative z-20 w-24 h-24 lg:w-28 lg:h-28 rounded-full bg-[#161B22] border-2 border-[#3B82F6]/80 flex items-center justify-center shadow-[0_0_55px_rgba(59,130,246,0.55)] cursor-pointer hover:scale-105 transition-transform"
          animate={
            shouldReduceMotion
              ? undefined
              : { scale: [1, 1.05, 1] }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          title="Click to reset orbital view"
        >
          <span className="font-display font-bold text-3xl lg:text-4xl text-white tracking-tight">
            DV<span className="text-[#3B82F6] drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">.</span>
          </span>
        </motion.div>
      </div>

      {/* Currently Building With Chip Row */}
      <div className="mt-8 mb-4 flex flex-col items-center w-full">
        <div className="mb-8 flex flex-col items-center">
          <span className="font-mono text-[11px] uppercase tracking-wider text-white/60 mb-3 font-semibold">
            Currently Building With (Click to Inspect)
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-2xl px-4">
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
                  onClick={() => handleNodeClick(tech)}
                  className={`inline-flex items-center gap-2 px-4 py-2 min-h-[48px] rounded-[14px] border font-mono text-base sm:text-xs transition-all duration-300 ease-out cursor-pointer shadow-[0_0_18px_rgba(59,130,246,0.12)] ${
                    isChipSelected
                      ? "bg-[#1C2333] text-white border-[#3B82F6] font-bold shadow-[0_0_24px_rgba(59,130,246,0.85)] scale-105 ring-2 ring-[#3B82F6]/40"
                      : "bg-[#161B22] border-[rgba(255,255,255,0.08)] text-white/90 hover:border-[#3B82F6]/50 hover:bg-[#1C2333]"
                  }`}
                >
                  <TechIcon name={tech} size="sm" />
                  <span>{tech}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CAMERA SCROLL & EXPANDED ARCHITECTURE PANEL */}
        <div ref={architectureRef} className="w-full scroll-mt-28">
          <AnimatePresence mode="wait">
            {selectedNode && (
              <motion.div
                key={selectedNode}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, height: 0, scale: 0.97, y: 15 }}
                animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto", scale: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, scale: 0.97, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full max-w-4xl mx-auto my-8 overflow-hidden"
              >
                <div className="p-6 sm:p-8 rounded-3xl bg-[#161B22] border-2 border-[#3B82F6]/70 shadow-[0_0_55px_rgba(59,130,246,0.35)] relative">
                  {/* Top Header Bar with Close/Reset CTA */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[rgba(255,255,255,0.08)]">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-14 h-14 rounded-[14px] flex items-center justify-center border shadow-[0_0_18px_rgba(59,130,246,0.12)] flex-shrink-0"
                        style={{
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderColor: "rgba(255, 255, 255, 0.08)",
                        }}
                      >
                        <TechIcon name={selectedNode} size="lg" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                            {selectedNode}
                          </h3>
                          <span
                            className="px-2.5 py-0.5 rounded-full border font-mono text-[11px] font-bold uppercase tracking-wider"
                            style={{
                              color: getTechDetail(selectedNode).categoryColor,
                              borderColor: `${getTechDetail(selectedNode).categoryColor}40`,
                              backgroundColor: `${getTechDetail(selectedNode).categoryColor}15`,
                            }}
                          >
                            {getTechDetail(selectedNode).category}
                          </span>
                        </div>
                        <p className="font-mono text-xs sm:text-sm text-[#3B82F6]/90 mt-0.5">
                          {ARCHITECTURE_MAP[selectedNode]?.role ||
                            "Full-Stack & Applied AI System Component"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedNode(null);
                        setSelectedRingId(null);
                      }}
                      className="px-4 py-2 min-h-[48px] rounded-xl bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.1)] text-white/80 hover:text-white font-mono text-base sm:text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>✕ Reset Inspection</span>
                    </button>
                  </div>

                  {/* 2-Column High-Signal Architecture & Pattern Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start">
                    {/* Architectural Blueprint Column */}
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] mb-2 font-semibold flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />
                          System Architecture Blueprint
                        </h4>
                        <p className="text-base sm:text-sm text-white/80 leading-relaxed font-sans">
                          {ARCHITECTURE_MAP[selectedNode]?.architecture ||
                            `${selectedNode} is engineered into the primary production stack to guarantee modular boundary separation, fault-tolerant execution, and real-time client responsiveness.`}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-white/60 mb-2.5 font-semibold">
                          Core Implementation &amp; Design Patterns
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {(
                            ARCHITECTURE_MAP[selectedNode]?.keyPatterns || [
                              "Type-Safe API Contracts",
                              "High-Availability Cloud Execution",
                              "Automated CI/CD Validation Gates",
                              "Modular Component Architecture",
                            ]
                          ).map((pattern, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1.5 rounded-[14px] bg-[#111827] border border-[rgba(255,255,255,0.08)] font-mono text-xs text-white/90 shadow-2xs"
                            >
                              ◆ {pattern}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Deployed In Projects Column */}
                    <div className="p-5 rounded-2xl bg-[#111827] border border-[rgba(255,255,255,0.08)] flex flex-col justify-between">
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] mb-3 font-semibold flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-ping" />
                          Deployed In Projects
                        </h4>
                        <ul className="space-y-3.5">
                          {(
                            ARCHITECTURE_MAP[selectedNode]?.usedInProjects || [
                              {
                                title: "Flagship Production System",
                                usage: "Core engineering foundation and fullstack service execution",
                              },
                              {
                                title: "KrishiSaathi Platform",
                                usage: "Real-time responsive workflows and data synchronization",
                              },
                            ]
                          ).map((proj, idx) => (
                            <li key={idx} className="space-y-1">
                              <span className="font-display font-bold text-base sm:text-sm text-white block">
                                {proj.title}
                              </span>
                              <span className="text-sm sm:text-xs text-white/70 block leading-normal">
                                {proj.usage}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[rgba(255,255,255,0.08)] text-[11px] font-mono text-white/50 text-right">
                        Click another node above or in categories below to switch inspection
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );

  return (
    <section
      id="skills"
      className="py-[var(--section-padding-y)] bg-[#111827] text-white border-y border-[rgba(255,255,255,0.08)] relative overflow-hidden transition-colors duration-300"
      aria-label="Technical Architecture and Capabilities"
    >
      <div className="content-width">
        {/* Apple Spatial Section Header on Slate Background */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-[rgba(255,255,255,0.08)]">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-[#3B82F6] tracking-widest uppercase">
                06 · TECHNICAL ARCHITECTURE
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              <span className="font-mono text-xs text-white/70">
                Production Stack & System Capabilities
              </span>
            </div>
            <span className="font-mono text-xs text-white/70">
              {selectedNode ? `Active Inspection: ${selectedNode}` : "Interactive Orbital Architecture"}
            </span>
          </div>

          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-mono text-xs font-semibold mb-4">
              <span className="w-2 h-2 rounded-full bg-[#3B82F6] animate-pulse" />
              <span>Interactive Planetary Centerpiece</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              A carefully structured engineering ecosystem.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl font-sans">
              Click any orbital node to enlarge its system role, brighten its orbit, view frosted technical tooltips, and expand deep architectural blueprints.
            </p>
          </div>
        </ScrollReveal>

        {/* ── MOBILE VIEW: Scaled Orbit + Collapsed Accordion Action (`block md:hidden`) ── */}
        <div className="block md:hidden pt-2 pb-8">
          <div className="scale-[0.82] -my-6 flex justify-center overflow-visible">
            {renderOrbitalSystem()}
          </div>

          {/* Collapsed Architecture Cards Trigger */}
          <div className="pt-6 space-y-4">
            <Button
              variant={isMobileAccordionSectionOpen ? "secondary" : "primary"}
              size="lg"
              onClick={() => setIsMobileAccordionSectionOpen(!isMobileAccordionSectionOpen)}
              className="w-full min-h-[48px] text-base font-bold shadow-lg"
              aria-expanded={isMobileAccordionSectionOpen}
            >
              <span>
                {isMobileAccordionSectionOpen ? "Collapse Architecture Categories" : "View Architecture Categories"}
              </span>
              <span className="ml-2">{isMobileAccordionSectionOpen ? "▲" : "▼"}</span>
            </Button>

            <AnimatePresence>
              {isMobileAccordionSectionOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden space-y-4 pt-2"
                >
                  {ENGINEERING_STACK.map((category) => {
                    const isOpen = mobileOpenCategory === category.id;
                    return (
                      <div
                        key={`mobile-cat-${category.id}`}
                        className="rounded-3xl bg-[#161B22] border border-[rgba(255,255,255,0.08)] overflow-hidden transition-all duration-300"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            setMobileOpenCategory(isOpen ? null : category.id)
                          }
                          aria-expanded={isOpen}
                          className="w-full min-h-[56px] px-6 py-4 flex items-center justify-between text-left focus-visible:outline-2 focus-visible:outline-[#3B82F6] cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: category.accentColor }}
                            />
                            <div>
                              <h3
                                className="font-display font-bold text-lg text-white leading-tight"
                                style={{ color: isOpen ? category.accentColor : "#ffffff" }}
                              >
                                {category.title}
                              </h3>
                              <p className="font-mono text-sm text-white/60 mt-0.5">
                                {category.subtitle}
                              </p>
                            </div>
                          </div>
                          <span
                            className="font-mono text-sm text-[#3B82F6] transition-transform duration-200"
                            style={{
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            }}
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
                              <div className="px-5 pb-6 pt-2 border-t border-[rgba(255,255,255,0.08)] grid grid-cols-1 gap-3">
                                {category.technologies.map((tech) => (
                                  <div
                                    key={`mobile-tech-${tech.name}`}
                                    className="p-4 rounded-2xl bg-[#111827] border border-[rgba(255,255,255,0.08)] flex items-start gap-3.5"
                                  >
                                    <div className="w-10 h-10 min-h-[48px] rounded-xl bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center flex-shrink-0 mt-0.5">
                                      <TechIcon name={tech.name} size="md" />
                                    </div>
                                    <div>
                                      <h4 className="font-display font-bold text-base text-white">
                                        {tech.name}
                                      </h4>
                                      <p className="font-mono text-sm text-white/70 leading-relaxed mt-1">
                                        {tech.descriptor}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── DESKTOP ORBITAL ARCHITECTURE VIEW (`hidden md:block`) ── */}
        <div className="hidden md:block">
          {renderOrbitalSystem()}

          <div className="flex flex-col items-center justify-center my-4">
            <Button
              variant={isExpanded ? "secondary" : "primary"}
              size="lg"
              onClick={handleToggleStack}
              className="shadow-lg hover:shadow-xl transition-all duration-300 ease-out mt-2"
              aria-expanded={isExpanded}
              aria-controls="engineering-stack-view"
            >
              <span>
                {isExpanded ? "Collapse Categorized Stack" : "Explore Categorized Stack"}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-300 ease-out ${
                  isExpanded ? "rotate-180" : ""
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </Button>
            <span className="font-mono text-xs text-white/70 mt-3 tracking-wide">
              {isExpanded
                ? "Showing complete structured architectural view below"
                : "Interactive system architecture — click nodes above or categories below to inspect engineering capabilities."}
            </span>
          </div>
        </div>

        {/* =========================================================
            EXPANDABLE ARCHITECTURE VIEW (Linear / Vercel / Apple Style)
           ========================================================= */}
        <div ref={stackRef} className="hidden md:block scroll-mt-24">
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                id="engineering-stack-view"
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, height: 0 }
                }
                animate={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, height: "auto" }
                }
                exit={
                  shouldReduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, height: 0 }
                }
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden pt-12"
              >
                <div className="pt-10 border-t border-[rgba(255,255,255,0.08)] space-y-10">
                  <div className="max-w-2xl">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] font-semibold block mb-2">
                      SYSTEM ARCHITECTURE BREAKDOWN
                    </span>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-white">
                      Categorized Engineering Stack
                    </h3>
                  </div>

                  {/* 6 Categories arranged in 2 Columns */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {ENGINEERING_STACK.map((category) => (
                      <div
                        key={category.id}
                        className="group/cat p-6 sm:p-8 rounded-3xl bg-[#161B22] border border-[rgba(255,255,255,0.08)] shadow-xl hover:bg-[#1C2333] hover:border-[rgba(255,255,255,0.18)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-out flex flex-col justify-between"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-5 mb-6 border-b border-[rgba(255,255,255,0.08)]">
                          <div className="flex items-center gap-3">
                            <h4 className="font-display font-bold text-xl sm:text-2xl text-white transition-colors" style={{ color: category.accentColor }}>
                              {category.title}
                            </h4>
                            <span className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider border ${category.accentClass}`}>
                              Stack
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm font-mono text-white/60">
                            {category.subtitle}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                          {category.technologies.map((tech) => {
                            const isCardActive = selectedNode === tech.name;
                            return (
                              <div
                                key={tech.name}
                                onClick={() => handleNodeClick(tech.name)}
                                tabIndex={0}
                                role="button"
                                aria-label={`${tech.name}: ${tech.descriptor}`}
                                className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-300 ease-out flex flex-col justify-between h-full min-h-[120px] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] ${
                                  isCardActive
                                    ? "bg-[#1C2333] border-2 border-[#3B82F6] shadow-[0_0_25px_rgba(59,130,246,0.5)] -translate-y-1 ring-2 ring-[#3B82F6]/30"
                                    : "bg-[#111827] border-[rgba(255,255,255,0.08)] hover:bg-[#1C2333] hover:border-[rgba(255,255,255,0.18)] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:-translate-y-0.5"
                                }`}
                              >
                                <div className="flex items-center gap-3 mb-2.5">
                                  {/* Standardized Icon Container inside Card */}
                                  <div
                                    className="w-10 h-10 rounded-[14px] flex items-center justify-center transition-all duration-300 ease-out flex-shrink-0 border shadow-[0_0_18px_rgba(59,130,246,0.12)]"
                                    style={{
                                      backgroundColor: isCardActive ? "rgba(59,130,246,0.15)" : "rgba(255, 255, 255, 0.05)",
                                      borderColor: isCardActive ? "#3B82F6" : "rgba(255, 255, 255, 0.08)",
                                    }}
                                  >
                                    <TechIcon name={tech.name} size="md" />
                                  </div>
                                  <span
                                    className={`font-display font-bold text-base transition-colors duration-200 ${
                                      isCardActive ? "text-[#3B82F6]" : "text-white group-hover:text-white"
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
                      </div>
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
