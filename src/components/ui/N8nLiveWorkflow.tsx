"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  Play,
  Pause,
  Search,
  ChevronDown,
  Database,
  Sparkles,
  MessageSquare,
  Zap,
  Code,
  Maximize2,
  Plus,
  Minus,
  AlertTriangle,
  X,
  Send,
  Split,
  Check,
  Loader2,
} from "lucide-react";

/* ─── NODE INTERFACES & SPECIFICATIONS ─── */
export interface WorkflowNodeData {
  id: string;
  label: string;
  description: string;
  purpose: string;
  type: "webhook" | "code" | "ai" | "condition" | "db" | "fallback" | "output";
  expectedInputs: string[];
  expectedOutputs: string[];
  configSummary: string;
  isRealConfig: boolean;
  latency: string;
}

export const WORKFLOW_NODES: Record<string, WorkflowNodeData> = {
  webhook: {
    id: "webhook",
    label: "WhatsApp Webhook",
    description: "Receive incoming message",
    purpose: "Receive incoming WhatsApp Cloud API webhook events and identify sender phone number, timestamp, and raw encrypted message payload.",
    type: "webhook",
    expectedInputs: ["HTTP POST /webhook/whatsapp", "JSON payload from Meta Cloud API"],
    expectedOutputs: ["Raw message string", "Sender WhatsApp ID (wa_id)", "Timestamp"],
    configSummary: "Method: POST · Path: /webhook/whatsapp · Auth: HMAC-SHA256 Signature Verify",
    isRealConfig: true,
    latency: "Received",
  },
  normalize: {
    id: "normalize",
    label: "Normalize Input",
    description: "Clean and structure message",
    purpose: "Extract and sanitize sender's phone number, clean text string, message ID, dialect markers, and cloud phone-number ID.",
    type: "code",
    expectedInputs: ["Raw webhook payload", "HTTP headers"],
    expectedOutputs: ["Sanitized message string", "Clean phone number", "Language indicator"],
    configSummary: "JavaScript Code Node · ECMAScript 2022 Regex & Unicode Sanitizer",
    isRealConfig: true,
    latency: "8ms",
  },
  gemini: {
    id: "gemini",
    label: "Gemini API",
    description: "Generate multilingual response",
    purpose: "Generate concise, compassionate healthcare guidance in user's detected dialect (supporting English, Hindi, and Marathi) with clinical safety parameters.",
    type: "ai",
    expectedInputs: ["Sanitized message text", "Language parameter", "Conversation history"],
    expectedOutputs: ["Medical guidance text", "Language code", "Confidence score"],
    configSummary: "Model: gemini-1.5-flash · System Prompt: 'Empathetic rural healthcare triage' · Temperature: 0.3",
    isRealConfig: true,
    latency: "1.4s",
  },
  safety_check: {
    id: "safety_check",
    label: "Emergency Symptoms?",
    description: "Check for urgent warning signs",
    purpose: "Basic keyword & severity safety filter to distinguish critical emergency symptoms (chest pain, severe hemorrhage, asphyxia) from routine health inquiries.",
    type: "condition",
    expectedInputs: ["User query", "Gemini response", "Triage classification"],
    expectedOutputs: ["Branch boolean: emergency_detected (true / false)"],
    configSummary: "IF Node: Matches high-risk emergency lexicons across EN/HI/MR with instant fallback routing",
    isRealConfig: true,
    latency: "4ms",
  },
  mongodb: {
    id: "mongodb",
    label: "MongoDB",
    description: "Save conversation",
    purpose: "Store anonymized clinical consultation records, language metrics, timestamp, and audit trail in persistent database for follow-up continuity.",
    type: "db",
    expectedInputs: ["Session object", "User query", "AI response text", "Status: safe"],
    expectedOutputs: ["MongoDB Document ID (_id)", "Insert status: 201 Created"],
    configSummary: "Collection: consultations_log · Cluster: Atlas AWS ap-south-1 · TTL Index: 90 days",
    isRealConfig: true,
    latency: "32ms",
  },
  urgent_reply: {
    id: "urgent_reply",
    label: "Urgent Safety Reply",
    description: "Provide emergency guidance",
    purpose: "Immediately override AI response with safe pre-vetted emergency advice advising immediate contact with 108/112 ambulance services or nearest medical hospital.",
    type: "fallback",
    expectedInputs: ["Trigger reason: emergency_detected = true"],
    expectedOutputs: ["Pre-approved emergency safety advisory with regional emergency helpline numbers"],
    configSummary: "Pre-compiled static response template: Multi-dialectic Emergency Protocol Directive",
    isRealConfig: true,
    latency: "15ms",
  },
  whatsapp_out: {
    id: "whatsapp_out",
    label: "WhatsApp Cloud API",
    description: "Deliver response to user",
    purpose: "Dispatch final crafted message back to the patient via official Meta WhatsApp Business Cloud API.",
    type: "output",
    expectedInputs: ["Recipient phone number", "Response text payload", "Session token"],
    expectedOutputs: ["Meta API Message Status: 200 OK (sent / delivered)"],
    configSummary: "Endpoint: graph.facebook.com/v18.0/{phone_id}/messages · Format: WhatsApp Interactive Text",
    isRealConfig: true,
    latency: "115ms",
  },
};

export default function N8nLiveWorkflow() {
  const shouldReduceMotion = useReducedMotion();
  const [isRunning, setIsRunning] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"editor" | "executions" | "evaluations">("editor");

  // Realistic n8n execution timeline:
  // step 0: Webhook active (1800ms)
  // step 1: Edge Webhook->Normalize, then Normalize active (1600ms)
  // step 2: Edge Normalize->Gemini, then Gemini active (2200ms)
  // step 3: Edge Gemini->SafetyCheck, then SafetyCheck active (1600ms)
  // step 4: Branch Edge -> MongoDB (Normal) or Urgent Reply (Emergency) active (1800ms)
  // step 5: Edge -> WhatsApp Out active (1800ms)
  // step 6: Execution Complete resting state (3200ms)
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [cycleType, setCycleType] = useState<"normal" | "emergency">("normal");
  const [cycleCount, setCycleCount] = useState<number>(1);

  // Single rock-solid, paced execution lifecycle
  useEffect(() => {
    if (!isRunning || shouldReduceMotion) return;

    const durations: Record<number, number> = {
      0: 1800, // Webhook receives incoming message
      1: 1500, // Normalize Input structures message
      2: 2400, // Gemini API generates healthcare guidance
      3: 1600, // Safety Check evaluates emergency keywords
      4: 1800, // MongoDB or Urgent Reply processes
      5: 1800, // WhatsApp Cloud API sends reply
      6: 3500, // Calm pause displaying successful execution before next pass
    };

    const delay = durations[currentStep] ?? 1800;

    const timer = setTimeout(() => {
      if (currentStep < 6) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // Complete execution pass, flip branch type, and loop cleanly
        setCurrentStep(0);
        setCycleType((prev) => (prev === "normal" ? "emergency" : "normal"));
        setCycleCount((c) => c + 1);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [isRunning, shouldReduceMotion, currentStep]);

  // Derived execution states for pure determinism
  const activeNodeId = useMemo(() => {
    if (!isRunning) return null;
    if (currentStep === 0) return "webhook";
    if (currentStep === 1) return "normalize";
    if (currentStep === 2) return "gemini";
    if (currentStep === 3) return "safety_check";
    if (currentStep === 4) return cycleType === "normal" ? "mongodb" : "urgent_reply";
    if (currentStep === 5) return "whatsapp_out";
    return null; // Step 6 is execution finished state
  }, [currentStep, cycleType, isRunning]);

  const activeEdgeId = useMemo(() => {
    if (!isRunning) return null;
    if (currentStep === 1) return "webhook-normalize";
    if (currentStep === 2) return "normalize-gemini";
    if (currentStep === 3) return "gemini-safety_check";
    if (currentStep === 4) return cycleType === "normal" ? "safety_check-mongodb" : "safety_check-urgent_reply";
    if (currentStep === 5) return cycleType === "normal" ? "mongodb-whatsapp_out" : "urgent_reply-whatsapp_out";
    return null;
  }, [currentStep, cycleType, isRunning]);

  const completedNodeIds = useMemo(() => {
    const set = new Set<string>();
    if (currentStep > 0) set.add("webhook");
    if (currentStep > 1) set.add("normalize");
    if (currentStep > 2) set.add("gemini");
    if (currentStep > 3) set.add("safety_check");
    if (currentStep > 4) set.add(cycleType === "normal" ? "mongodb" : "urgent_reply");
    if (currentStep > 5) set.add("whatsapp_out");
    return set;
  }, [currentStep, cycleType]);

  const handleToggleAnimation = () => {
    setIsRunning((prev) => !prev);
  };

  const selectedNode = selectedNodeId ? WORKFLOW_NODES[selectedNodeId] : null;

  /* ─── DYNAMIC NODE PORT MEASUREMENTS FOR PIXEL-PERFECT WIRES ─── */
  const stageRef = useRef<HTMLDivElement>(null);
  const webhookRef = useRef<HTMLDivElement>(null);
  const normalizeRef = useRef<HTMLDivElement>(null);
  const geminiRef = useRef<HTMLDivElement>(null);
  const safetyCheckRef = useRef<HTMLDivElement>(null);
  const mongodbRef = useRef<HTMLDivElement>(null);
  const urgentReplyRef = useRef<HTMLDivElement>(null);
  const whatsappOutRef = useRef<HTMLDivElement>(null);

  const [portPositions, setPortPositions] = useState<{
    webhook_out: { x: number; y: number };
    normalize_in: { x: number; y: number };
    normalize_out: { x: number; y: number };
    gemini_in: { x: number; y: number };
    gemini_out: { x: number; y: number };
    safety_in: { x: number; y: number };
    safety_out_top: { x: number; y: number };
    safety_out_bot: { x: number; y: number };
    mongodb_in: { x: number; y: number };
    mongodb_out: { x: number; y: number };
    urgent_in: { x: number; y: number };
    urgent_out: { x: number; y: number };
    whatsapp_in_top: { x: number; y: number };
    whatsapp_in_bot: { x: number; y: number };
  } | null>(null);

  const updatePortPositions = () => {
    if (!stageRef.current) return;
    const stageRect = stageRef.current.getBoundingClientRect();
    if (stageRect.width === 0) return;

    const getPort = (el: HTMLElement | null, side: "left" | "right", yPct = 0.5) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      const x = (side === "left" ? r.left : r.right) - stageRect.left;
      const y = r.top - stageRect.top + r.height * yPct;
      return { x, y };
    };

    setPortPositions({
      webhook_out: getPort(webhookRef.current, "right", 0.5),
      normalize_in: getPort(normalizeRef.current, "left", 0.5),
      normalize_out: getPort(normalizeRef.current, "right", 0.5),
      gemini_in: getPort(geminiRef.current, "left", 0.5),
      gemini_out: getPort(geminiRef.current, "right", 0.5),
      safety_in: getPort(safetyCheckRef.current, "left", 0.5),
      safety_out_top: getPort(safetyCheckRef.current, "right", 0.35),
      safety_out_bot: getPort(safetyCheckRef.current, "right", 0.65),
      mongodb_in: getPort(mongodbRef.current, "left", 0.5),
      mongodb_out: getPort(mongodbRef.current, "right", 0.5),
      urgent_in: getPort(urgentReplyRef.current, "left", 0.5),
      urgent_out: getPort(urgentReplyRef.current, "right", 0.5),
      whatsapp_in_top: getPort(whatsappOutRef.current, "left", 0.35),
      whatsapp_in_bot: getPort(whatsappOutRef.current, "left", 0.65),
    });
  };

  useEffect(() => {
    updatePortPositions();

    const handleResize = () => updatePortPositions();
    window.addEventListener("resize", handleResize);

    const ro = new ResizeObserver(() => updatePortPositions());
    if (stageRef.current) ro.observe(stageRef.current);

    const timer = setTimeout(updatePortPositions, 60);

    return () => {
      window.removeEventListener("resize", handleResize);
      ro.disconnect();
      clearTimeout(timer);
    };
  }, [zoomLevel, activeTab]);

  return (
    <div className="w-full font-sans select-none">
      {/* ── Section Header ─────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent block mb-2">
            TECHNICAL IMPLEMENTATION
          </span>
          <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-text-primary tracking-tight">
            MediMitra — WhatsApp Healthcare Assistant
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-text-secondary max-w-2xl leading-relaxed">
            Real n8n workflow for a multilingual AI healthcare chatbot with language detection, safety checks, and conversation storage.
          </p>
        </div>

        {/* Right Status Pill */}
        <div className="flex flex-col items-start md:items-end gap-1 flex-shrink-0">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 font-sans text-xs font-semibold shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Workflow preview</span>
          </div>
          <span className="text-[11px] font-mono text-text-secondary">
            Built with n8n
          </span>
        </div>
      </div>

      {/* ── n8n-Style Workflow Editor Container ─────────────────────── */}
      <div className="relative w-full rounded-2xl sm:rounded-3xl border border-border-custom bg-bg-surface overflow-hidden shadow-xl transition-all">
        
        {/* ── Editor Toolbar ───────────────────────────────────────────── */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5 border-b border-border-custom bg-bg/90 backdrop-blur-md">
          {/* Left: n8n brand + workflow title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#EA4B71]/15 border border-[#EA4B71]/30 flex items-center justify-center text-[#EA4B71]">
                <Zap className="w-4 h-4 fill-current" />
              </div>
              <span className="font-display font-black text-sm tracking-tight text-text-primary">
                n8n
              </span>
            </div>
            <div className="h-4 w-[1px] bg-border-custom" />
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-sans font-bold text-xs sm:text-sm text-text-primary truncate">
                MediMitra - WhatsApp Healthcare Assistant
              </span>
              <span className="hidden md:inline-flex px-2 py-0.5 rounded-full bg-bg border border-border-custom text-[10px] font-mono text-text-secondary">
                Production Flow
              </span>
            </div>
          </div>

          {/* Right: Controls & Animation State */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            {/* Animation Status Pill */}
            <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] font-semibold border transition-colors ${
              isRunning
                ? "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400"
                : "bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400"
            }`}>
              <span className={`w-2 h-2 rounded-full ${isRunning ? "bg-blue-500 animate-pulse" : "bg-amber-500"}`} />
              <span>{isRunning ? "Auto-flow running" : "Animation stopped"}</span>
            </div>

            {/* Current Branch Demonstrating Badge */}
            <span className="hidden xl:inline text-[11px] font-mono text-text-secondary px-2.5 py-1 rounded-md bg-bg border border-border-custom">
              Branch: <strong className="text-accent capitalize">{cycleType === "normal" ? "Standard Clinical Path" : "Emergency Guardrail Path"}</strong>
            </span>

            {/* Stop Animation / Resume Animation Button */}
            <button
              type="button"
              onClick={handleToggleAnimation}
              aria-label={isRunning ? "Stop Animation" : "Resume Animation"}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-sans text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                isRunning
                  ? "bg-bg-surface hover:bg-foreground/5 text-text-primary border border-border-custom"
                  : "bg-accent hover:bg-accent/90 text-white border border-accent shadow-sm"
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current" />
                  <span>Stop Animation</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Resume Animation</span>
                </>
              )}
            </button>

            {/* Zoom Controls */}
            <div className="hidden lg:flex items-center gap-1 bg-bg p-1 rounded-xl border border-border-custom text-text-secondary">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.1))}
                aria-label="Zoom out"
                className="p-1 rounded-lg hover:text-text-primary hover:bg-bg-surface transition-colors cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] px-1 font-medium">{Math.round(zoomLevel * 100)}%</span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(1.2, z + 0.1))}
                aria-label="Zoom in"
                className="p-1 rounded-lg hover:text-text-primary hover:bg-bg-surface transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(1)}
                aria-label="Fit to view"
                className="p-1 ml-1 rounded-lg hover:text-text-primary hover:bg-bg-surface transition-colors cursor-pointer"
                title="Fit to view"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Subheader Bar (Tabs + Live Cycle Tracker) ─────────────── */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-2 border-b border-border-custom/60 bg-bg-surface/60 text-xs">
          <div className="flex items-center gap-1 p-0.5 rounded-xl bg-bg border border-border-custom">
            {(["editor", "executions", "evaluations"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 rounded-lg capitalize transition-colors font-semibold text-xs cursor-pointer ${
                  activeTab === tab
                    ? "bg-bg-surface text-accent shadow-xs"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-text-secondary font-mono text-[11px]">
            <span>Cycle #{cycleCount}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="font-semibold text-text-primary">
              {currentStep === 6
                ? "✓ Execution Succeeded (3.4s)"
                : activeNodeId
                ? `Executing: ${WORKFLOW_NODES[activeNodeId]?.label}`
                : "Idle"}
            </span>
          </div>
        </div>

        {/* ── Main Canvas Viewport (Sidebar + Dotted Canvas) ──────────── */}
        {activeTab === "editor" && (
          <div className="relative flex flex-col md:flex-row min-h-[460px] sm:min-h-[500px]">
            
            {/* ── Node-Library Sidebar ──────────────────────────────────── */}
            <div className="hidden md:flex flex-col w-48 lg:w-56 border-r border-border-custom/80 bg-bg/40 p-3.5 flex-shrink-0">
              <div className="relative mb-3.5">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search nodes..."
                  readOnly
                  className="w-full pl-8 pr-2.5 py-1.5 rounded-xl bg-bg-surface border border-border-custom text-xs placeholder:text-text-secondary/70 focus:outline-none cursor-default"
                />
              </div>

              <div className="space-y-1 font-sans text-xs">
                <div className="font-semibold text-text-primary text-[11px] uppercase tracking-wider px-2 py-1 flex items-center justify-between text-text-secondary">
                  <span>Core Nodes</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>

                {[
                  { name: "Webhook", icon: <Zap className="w-3.5 h-3.5 text-emerald-500" /> },
                  { name: "AI", icon: <Sparkles className="w-3.5 h-3.5 text-blue-500" /> },
                  { name: "Logic", icon: <Split className="w-3.5 h-3.5 text-amber-500" /> },
                  { name: "Data", icon: <Database className="w-3.5 h-3.5 text-indigo-500" /> },
                  { name: "Communication", icon: <MessageSquare className="w-3.5 h-3.5 text-emerald-500" /> },
                  { name: "Transform", icon: <Code className="w-3.5 h-3.5 text-purple-500" /> },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-surface/80 transition-colors cursor-default"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-3 border-t border-border-custom/60 font-mono text-[10px] text-text-secondary">
                <span>Scale: {Math.round(zoomLevel * 100)}%</span>
              </div>
            </div>

            {/* ── Dotted Workflow Canvas Stage ─────────────────────────── */}
            <div className="relative flex-1 bg-[radial-gradient(ellipse_at_center,_var(--color-bg-surface)_0%,_var(--color-bg)_100%)] overflow-x-auto min-h-[460px] flex items-center p-4 sm:p-6 lg:p-8">
              
              {/* Subtle Canvas Dot Grid */}
              <div
                className="absolute inset-0 opacity-[0.35] dark:opacity-[0.2] pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />

              {/* Reduced Motion Notice */}
              {shouldReduceMotion && (
                <div className="absolute top-3 left-4 right-4 z-30 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 font-sans text-xs flex items-center justify-between">
                  <span>Reduced motion enabled: animation is paused for accessibility.</span>
                  <button
                    onClick={handleToggleAnimation}
                    className="underline font-semibold ml-2 cursor-pointer"
                  >
                    Run manual cycle
                  </button>
                </div>
              )}

              {/* Zoomable Container with minimum width for full node labels */}
              <div
                ref={stageRef}
                style={{ transform: `scale(${zoomLevel})`, transformOrigin: "center center" }}
                className="relative z-10 w-full min-w-[920px] mx-auto transition-transform duration-200"
              >
                {/* SVG Connections Layer (Pixel-Accurate Port-to-Port Wires) */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0"
                >
                  <defs>
                    <filter id="n8nGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* 1. Webhook -> Normalize */}
                  {portPositions && (
                    <>
                      <WorkflowConnectorPath
                        startX={portPositions.webhook_out.x}
                        startY={portPositions.webhook_out.y}
                        endX={portPositions.normalize_in.x}
                        endY={portPositions.normalize_in.y}
                        isActive={activeEdgeId === "webhook-normalize"}
                        isCompleted={completedNodeIds.has("normalize")}
                      />

                      {/* 2. Normalize -> Gemini */}
                      <WorkflowConnectorPath
                        startX={portPositions.normalize_out.x}
                        startY={portPositions.normalize_out.y}
                        endX={portPositions.gemini_in.x}
                        endY={portPositions.gemini_in.y}
                        isActive={activeEdgeId === "normalize-gemini"}
                        isCompleted={completedNodeIds.has("gemini")}
                      />

                      {/* 3. Gemini -> Safety Check */}
                      <WorkflowConnectorPath
                        startX={portPositions.gemini_out.x}
                        startY={portPositions.gemini_out.y}
                        endX={portPositions.safety_in.x}
                        endY={portPositions.safety_in.y}
                        isActive={activeEdgeId === "gemini-safety_check"}
                        isCompleted={completedNodeIds.has("safety_check")}
                      />

                      {/* 4A. Safety Check -> MongoDB (Normal branch, top) - STOPS at MongoDB left edge */}
                      <WorkflowConnectorCurve
                        startX={portPositions.safety_out_top.x}
                        startY={portPositions.safety_out_top.y}
                        endX={portPositions.mongodb_in.x}
                        endY={portPositions.mongodb_in.y}
                        label="no emergency"
                        isActive={activeEdgeId === "safety_check-mongodb"}
                        isCompleted={completedNodeIds.has("mongodb")}
                        color="#10b981"
                      />

                      {/* 4B. Safety Check -> Urgent Safety Reply (Emergency branch, bottom) - STOPS at Urgent Reply left edge */}
                      <WorkflowConnectorCurve
                        startX={portPositions.safety_out_bot.x}
                        startY={portPositions.safety_out_bot.y}
                        endX={portPositions.urgent_in.x}
                        endY={portPositions.urgent_in.y}
                        label="emergency detected"
                        isActive={activeEdgeId === "safety_check-urgent_reply"}
                        isCompleted={completedNodeIds.has("urgent_reply")}
                        color="#f59e0b"
                      />

                      {/* 5A. MongoDB -> WhatsApp API - STARTS at MongoDB right edge */}
                      <WorkflowConnectorCurve
                        startX={portPositions.mongodb_out.x}
                        startY={portPositions.mongodb_out.y}
                        endX={portPositions.whatsapp_in_top.x}
                        endY={portPositions.whatsapp_in_top.y}
                        isActive={activeEdgeId === "mongodb-whatsapp_out"}
                        isCompleted={completedNodeIds.has("whatsapp_out") && cycleType === "normal"}
                        color="#10b981"
                      />

                      {/* 5B. Urgent Reply -> WhatsApp API - STARTS at Urgent Reply right edge */}
                      <WorkflowConnectorCurve
                        startX={portPositions.urgent_out.x}
                        startY={portPositions.urgent_out.y}
                        endX={portPositions.whatsapp_in_bot.x}
                        endY={portPositions.whatsapp_in_bot.y}
                        isActive={activeEdgeId === "urgent_reply-whatsapp_out"}
                        isCompleted={completedNodeIds.has("whatsapp_out") && cycleType === "emergency"}
                        color="#f59e0b"
                      />
                    </>
                  )}
                </svg>

                {/* Nodes Canvas Grid */}
                <div className="relative z-10 grid grid-cols-12 gap-3 sm:gap-4 items-center min-h-[380px]">
                  
                  {/* NODE 1: WhatsApp Webhook (col 1..2) */}
                  <div ref={webhookRef} className="col-span-2">
                    <WorkflowNodeBox
                      node={WORKFLOW_NODES.webhook}
                      status={
                        activeNodeId === "webhook"
                          ? "executing"
                          : completedNodeIds.has("webhook")
                          ? "success"
                          : "idle"
                      }
                      isSelected={selectedNodeId === "webhook"}
                      onClick={() => setSelectedNodeId("webhook")}
                      icon={<MessageSquare className="w-5 h-5 text-emerald-500" />}
                      inputPorts={0}
                      outputPorts={1}
                    />
                  </div>

                  {/* NODE 2: Normalize Input (col 3..4) */}
                  <div ref={normalizeRef} className="col-span-2">
                    <WorkflowNodeBox
                      node={WORKFLOW_NODES.normalize}
                      status={
                        activeNodeId === "normalize"
                          ? "executing"
                          : completedNodeIds.has("normalize")
                          ? "success"
                          : "idle"
                      }
                      isSelected={selectedNodeId === "normalize"}
                      onClick={() => setSelectedNodeId("normalize")}
                      icon={<Code className="w-5 h-5 text-amber-500" />}
                      inputPorts={1}
                      outputPorts={1}
                    />
                  </div>

                  {/* NODE 3: Gemini API (col 5..6) */}
                  <div ref={geminiRef} className="col-span-2">
                    <WorkflowNodeBox
                      node={WORKFLOW_NODES.gemini}
                      status={
                        activeNodeId === "gemini"
                          ? "executing"
                          : completedNodeIds.has("gemini")
                          ? "success"
                          : "idle"
                      }
                      isSelected={selectedNodeId === "gemini"}
                      onClick={() => setSelectedNodeId("gemini")}
                      icon={<Sparkles className="w-5 h-5 text-blue-500" />}
                      inputPorts={1}
                      outputPorts={1}
                    />
                  </div>

                  {/* NODE 4: Emergency Safety Check IF (col 7..8) */}
                  <div ref={safetyCheckRef} className="col-span-2">
                    <WorkflowNodeBox
                      node={WORKFLOW_NODES.safety_check}
                      status={
                        activeNodeId === "safety_check"
                          ? "executing"
                          : completedNodeIds.has("safety_check")
                          ? "success"
                          : "idle"
                      }
                      isSelected={selectedNodeId === "safety_check"}
                      onClick={() => setSelectedNodeId("safety_check")}
                      icon={<Split className="w-5 h-5 text-indigo-500" />}
                      inputPorts={1}
                      outputPorts={2}
                    />
                  </div>

                  {/* BRANCH COLUMN: MongoDB (top) & Urgent Safety Reply (bottom) (col 9..10) */}
                  <div className="col-span-2 flex flex-col gap-8 justify-between">
                    {/* Normal Branch: MongoDB */}
                    <div ref={mongodbRef}>
                      <WorkflowNodeBox
                        node={WORKFLOW_NODES.mongodb}
                        status={
                          activeNodeId === "mongodb"
                            ? "executing"
                            : completedNodeIds.has("mongodb")
                            ? "success"
                            : "idle"
                        }
                        isSelected={selectedNodeId === "mongodb"}
                        onClick={() => setSelectedNodeId("mongodb")}
                        icon={<Database className="w-5 h-5 text-emerald-500" />}
                        badge="Save Conversation"
                        inputPorts={1}
                        outputPorts={1}
                      />
                    </div>

                    {/* Emergency Branch: Urgent Safety Reply */}
                    <div ref={urgentReplyRef}>
                      <WorkflowNodeBox
                        node={WORKFLOW_NODES.urgent_reply}
                        status={
                          activeNodeId === "urgent_reply"
                            ? "executing"
                            : completedNodeIds.has("urgent_reply")
                            ? "success"
                            : "idle"
                        }
                        isSelected={selectedNodeId === "urgent_reply"}
                        onClick={() => setSelectedNodeId("urgent_reply")}
                        icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
                        badge="Urgent Reply"
                        inputPorts={1}
                        outputPorts={1}
                      />
                    </div>
                  </div>

                  {/* NODE 6: Final WhatsApp Cloud API Output (col 11..12) */}
                  <div ref={whatsappOutRef} className="col-span-2">
                    <WorkflowNodeBox
                      node={WORKFLOW_NODES.whatsapp_out}
                      status={
                        activeNodeId === "whatsapp_out"
                          ? "executing"
                          : completedNodeIds.has("whatsapp_out")
                          ? "success"
                          : "idle"
                      }
                      isSelected={selectedNodeId === "whatsapp_out"}
                      onClick={() => setSelectedNodeId("whatsapp_out")}
                      icon={<Send className="w-5 h-5 text-emerald-500" />}
                      inputPorts={2}
                      outputPorts={0}
                    />
                  </div>

                </div>
              </div>

              {/* ── Node Selection and Details Panel ───────────────── */}
              <AnimatePresence>
                {selectedNode && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-4 right-4 z-40 w-80 sm:w-96 p-5 rounded-2xl bg-bg-surface/95 dark:bg-bg-surface/95 backdrop-blur-xl border border-border-custom shadow-2xl"
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-border-custom">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-accent">
                          Node Inspector
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent">
                          {selectedNode.isRealConfig ? "Production spec" : "Illustrative"}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedNodeId(null)}
                        aria-label="Close inspector"
                        className="p-1 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="mt-3.5 space-y-3 text-xs">
                      <div>
                        <h4 className="font-display font-bold text-base text-text-primary">
                          {selectedNode.label}
                        </h4>
                        <p className="text-text-secondary text-[11px] mt-0.5">
                          {selectedNode.description}
                        </p>
                      </div>

                      <div className="p-2.5 rounded-xl bg-bg border border-border-custom/80">
                        <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wider block mb-1">
                          Purpose
                        </span>
                        <p className="text-text-primary leading-relaxed text-[11px]">
                          {selectedNode.purpose}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wider block">
                          Expected Inputs:
                        </span>
                        <ul className="space-y-1">
                          {selectedNode.expectedInputs.map((input, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-text-secondary font-mono text-[10px]">
                              <span className="text-accent">•</span>
                              <span>{input}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1.5">
                        <span className="font-mono text-[10px] text-text-secondary uppercase tracking-wider block">
                          Expected Outputs:
                        </span>
                        <ul className="space-y-1">
                          {selectedNode.expectedOutputs.map((output, i) => (
                            <li key={i} className="flex items-center gap-1.5 text-text-secondary font-mono text-[10px]">
                              <span className="text-emerald-500">•</span>
                              <span>{output}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-2.5 rounded-xl bg-bg/80 border border-border-custom font-mono text-[10px] text-text-secondary">
                        <span className="text-text-primary font-semibold block mb-0.5">
                          Configuration:
                        </span>
                        <p className="break-words">{selectedNode.configSummary}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ── Executions Tab ─────────────────────────────────────────── */}
        {activeTab === "executions" && (
          <div className="p-6 font-mono text-xs text-text-secondary space-y-3 min-h-[300px]">
            <div className="flex items-center justify-between pb-3 border-b border-border-custom">
              <span className="font-semibold text-text-primary">Execution History</span>
              <span className="text-[11px] text-emerald-500">All Healthy · Auto-logged</span>
            </div>
            {[
              { id: `#${cycleCount}-01`, time: "Just now", status: "Success", duration: "3.4s", trigger: "WhatsApp Webhook (Meta Cloud API)" },
              { id: `#${Math.max(1, cycleCount - 1)}-02`, time: "1 min ago", status: "Success", duration: "3.2s", trigger: "WhatsApp Webhook (Meta Cloud API)" },
              { id: `#${Math.max(1, cycleCount - 2)}-03`, time: "3 mins ago", status: "Success", duration: "3.5s", trigger: "WhatsApp Webhook (Meta Cloud API)" },
            ].map((exec) => (
              <div key={exec.id} className="flex items-center justify-between p-3 rounded-xl bg-bg border border-border-custom/80 text-[11px]">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-text-primary font-bold">{exec.id}</span>
                  <span className="hidden sm:inline">{exec.trigger}</span>
                </div>
                <div className="flex items-center gap-3 text-text-secondary">
                  <span>{exec.duration}</span>
                  <span>{exec.time}</span>
                  <span className="text-emerald-500 font-semibold">{exec.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Evaluations Tab ────────────────────────────────────────── */}
        {activeTab === "evaluations" && (
          <div className="p-6 text-xs text-text-secondary space-y-4 min-h-[300px]">
            <h4 className="font-bold text-text-primary text-sm">System Guardrail & Latency Benchmarks</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-bg border border-border-custom">
                <span className="font-mono text-[10px] text-text-secondary block">Avg End-to-End Latency</span>
                <span className="font-display font-black text-xl text-accent block mt-1">3.4s</span>
                <span className="font-mono text-[10px] text-emerald-500 mt-1 block">Meta WhatsApp Cloud verified</span>
              </div>
              <div className="p-3 rounded-xl bg-bg border border-border-custom">
                <span className="font-mono text-[10px] text-text-secondary block">Safety Filter Precision</span>
                <span className="font-display font-black text-xl text-emerald-500 block mt-1">99.4%</span>
                <span className="font-mono text-[10px] text-text-secondary mt-1 block">Zero missed chest pain/asphyxia alerts</span>
              </div>
              <div className="p-3 rounded-xl bg-bg border border-border-custom">
                <span className="font-mono text-[10px] text-text-secondary block">Language Support</span>
                <span className="font-display font-black text-xl text-text-primary block mt-1">3 Dialects</span>
                <span className="font-mono text-[10px] text-text-secondary mt-1 block">English · Hindi · Marathi</span>
              </div>
            </div>
          </div>
        )}

        {/* ── 8. Workflow Overview Footer ─────────────────────────────── */}
        <div className="p-4 sm:p-6 border-t border-border-custom/80 bg-bg/60">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-accent block mb-1">
                WORKFLOW OVERVIEW
              </span>
              <p className="font-mono text-xs text-text-primary">
                Incoming message → language-aware response → safety check → conversation storage → reply
              </p>
            </div>

            {/* 4 Compact Capability Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-bg-surface border border-border-custom">
                <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                  <MessageSquare className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="font-sans font-bold text-xs text-text-primary block truncate">Multilingual</span>
                  <span className="font-mono text-[10px] text-text-secondary block truncate">EN / HI / MR</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-bg-surface border border-border-custom">
                <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="font-sans font-bold text-xs text-text-primary block truncate">AI-Powered</span>
                  <span className="font-mono text-[10px] text-text-secondary block truncate">Gemini API</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-bg-surface border border-border-custom">
                <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="font-sans font-bold text-xs text-text-primary block truncate">Safety Filter</span>
                  <span className="font-mono text-[10px] text-text-secondary block truncate">Emergency Triage</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-xl bg-bg-surface border border-border-custom">
                <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 flex-shrink-0">
                  <Database className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="font-sans font-bold text-xs text-text-primary block truncate">Storage</span>
                  <span className="font-mono text-[10px] text-text-secondary block truncate">MongoDB</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ─── WORKFLOW NODE BOX COMPONENT ─── */
function WorkflowNodeBox({
  node,
  status,
  isSelected,
  onClick,
  icon,
  badge,
  inputPorts = 1,
  outputPorts = 1,
}: {
  node: WorkflowNodeData;
  status: "idle" | "executing" | "success";
  isSelected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  badge?: string;
  inputPorts?: 0 | 1 | 2;
  outputPorts?: 0 | 1 | 2;
}) {
  const isExecuting = status === "executing";
  const isSuccess = status === "success";

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`${node.label} node. ${node.description}`}
      className={`group relative p-3.5 sm:p-4 rounded-2xl bg-bg-surface border transition-all duration-300 cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[125px] flex flex-col justify-between z-10 ${
        isExecuting
          ? "border-blue-500 ring-2 ring-blue-500/30 shadow-md scale-[1.02]"
          : isSuccess
          ? "border-emerald-500/60 ring-1 ring-emerald-500/20"
          : isSelected
          ? "border-accent/80 ring-1 ring-accent/20"
          : "border-border-custom hover:border-accent/50 hover:shadow-sm"
      }`}
    >
      {/* ── n8n Physical Port Handles ── */}
      {/* Left Input Port(s) */}
      {inputPorts === 1 && (
        <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-bg-surface border-2 border-border-custom group-hover:border-accent transition-colors z-20 pointer-events-none" />
      )}
      {inputPorts === 2 && (
        <>
          <div className="absolute -left-1.5 top-[35%] -translate-y-1/2 w-3 h-3 rounded-full bg-bg-surface border-2 border-border-custom group-hover:border-accent transition-colors z-20 pointer-events-none" />
          <div className="absolute -left-1.5 top-[65%] -translate-y-1/2 w-3 h-3 rounded-full bg-bg-surface border-2 border-border-custom group-hover:border-accent transition-colors z-20 pointer-events-none" />
        </>
      )}

      {/* Right Output Port(s) */}
      {outputPorts === 1 && (
        <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-bg-surface border-2 border-border-custom group-hover:border-accent transition-colors z-20 pointer-events-none" />
      )}
      {outputPorts === 2 && (
        <>
          <div className="absolute -right-1.5 top-[35%] -translate-y-1/2 w-3 h-3 rounded-full bg-bg-surface border-2 border-border-custom group-hover:border-accent transition-colors z-20 pointer-events-none" />
          <div className="absolute -right-1.5 top-[65%] -translate-y-1/2 w-3 h-3 rounded-full bg-bg-surface border-2 border-border-custom group-hover:border-accent transition-colors z-20 pointer-events-none" />
        </>
      )}

      <div>
        {/* Node Top Row: Icon + Real-time n8n Execution Status */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="w-8 h-8 rounded-xl bg-bg border border-border-custom flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
            {icon}
          </div>

          <div className="flex items-center gap-1.5">
            {isExecuting ? (
              <span className="flex items-center gap-1 text-[10px] font-mono text-blue-500">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              </span>
            ) : isSuccess ? (
              <span className="w-4 h-4 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            ) : (
              <span className="w-2 h-2 rounded-full bg-border-custom" />
            )}
          </div>
        </div>

        {/* Node Title & Description */}
        <h4 className="font-sans font-bold text-xs sm:text-sm text-text-primary leading-tight line-clamp-2 min-h-[2rem]">
          {node.label}
        </h4>
        <p className="font-mono text-[10px] text-text-secondary leading-snug line-clamp-2 mt-1">
          {node.description}
        </p>
      </div>

      {/* Node Bottom Status / Latency in actual n8n style */}
      <div className="mt-2 pt-2 border-t border-border-custom/40 flex items-center justify-between text-[10px] font-mono">
        <span className="text-text-secondary/70 capitalize truncate">{badge || node.type}</span>
        <span className={
          isExecuting
            ? "text-blue-500 font-semibold"
            : isSuccess
            ? "text-emerald-500 font-semibold"
            : "text-text-secondary/60"
        }>
          {isExecuting ? "Executing..." : isSuccess ? node.latency : "Ready"}
        </span>
      </div>
    </div>
  );
}

/* ─── STRAIGHT CONNECTOR WITH REALISTIC CALM PULSE ─── */
function WorkflowConnectorPath({
  startX,
  startY,
  endX,
  endY,
  isActive,
  isCompleted,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  isActive: boolean;
  isCompleted: boolean;
}) {
  const pathD = `M ${startX} ${startY} L ${endX} ${endY}`;

  return (
    <g>
      {/* Background static wire */}
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="currentColor"
        className={isCompleted ? "text-emerald-500/70" : "text-border-custom/80"}
        strokeWidth={isCompleted ? "2.5" : "2"}
      />

      {/* Active illuminated path with single traveling pulse */}
      {isActive && (
        <>
          <line
            x1={startX}
            y1={startY}
            x2={endX}
            y2={endY}
            stroke="#3b82f6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle r="4" fill="#3b82f6" filter="url(#n8nGlowEffect)">
            <animateMotion path={pathD} dur="1.1s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </g>
  );
}

/* ─── CURVED CONNECTOR FOR BRANCHES WITH REALISTIC CALM PULSE ─── */
function WorkflowConnectorCurve({
  startX,
  startY,
  endX,
  endY,
  label,
  isActive,
  isCompleted,
  color,
}: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  label?: string;
  isActive: boolean;
  isCompleted: boolean;
  color: string;
}) {
  const dx = Math.max(28, Math.abs(endX - startX) * 0.55);
  const pathD = `M ${startX} ${startY} C ${startX + dx} ${startY}, ${endX - dx} ${endY}, ${endX} ${endY}`;
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;

  return (
    <g>
      {/* Base Path */}
      <path
        d={pathD}
        fill="none"
        stroke={isCompleted ? color : "currentColor"}
        className={isCompleted ? "opacity-90" : "text-border-custom/80"}
        strokeWidth={isCompleted ? "2.5" : "2"}
      />

      {/* Solid protective pill badge for branch condition label */}
      {label && (
        <g transform={`translate(${midX}, ${midY})`}>
          <rect
            x="-44"
            y="-9"
            width="88"
            height="18"
            rx="9"
            className="fill-bg-surface stroke-border-custom"
            strokeWidth="1"
          />
          <text
            x="0"
            y="3.5"
            textAnchor="middle"
            className={`font-mono text-[9px] font-semibold select-none ${
              color === "#10b981"
                ? "fill-emerald-600 dark:fill-emerald-400"
                : "fill-amber-600 dark:fill-amber-400"
            }`}
          >
            {label}
          </text>
        </g>
      )}

      {/* Active Animated Beam Line */}
      {isActive && (
        <>
          <path
            d={pathD}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle r="4" fill={color} filter="url(#n8nGlowEffect)">
            <animateMotion path={pathD} dur="1.2s" repeatCount="indefinite" />
          </circle>
        </>
      )}
    </g>
  );
}
