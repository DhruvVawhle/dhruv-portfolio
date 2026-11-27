"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import TechIcon from "@/components/ui/TechIcon";
import { orbitRings, relationshipsMap, techDetailsMap } from "@/lib/data";
import SkillInspectorPanel, {
  type TechDetailInfo,
} from "@/components/sections/skills/SkillInspectorPanel";

interface RingConfig {
  id: "inner" | "middle" | "outer";
  radiusPx: number;
  mobileRadiusPx: number;
  duration: number;
  direction: 1 | -1;
  skills: string[];
}

const ORBIT_RINGS: RingConfig[] = orbitRings as unknown as RingConfig[];
const RELATIONSHIPS_MAP: Record<string, string[]> = relationshipsMap;
const TECH_DETAILS_MAP: Record<string, TechDetailInfo> =
  techDetailsMap as unknown as Record<string, TechDetailInfo>;

const getTechDetail = (name: string): TechDetailInfo => {
  if (TECH_DETAILS_MAP[name]) return TECH_DETAILS_MAP[name];
  return {
    category: "Engineering Ecosystem",
    categoryColor: "#3B82F6",
    role: "Full-Stack System Architect",
    projectsList: ["Core Portfolio Architecture & Applications"],
    useCases: [
      "System Architecture",
      "High-Availability Execution",
      "Performance Optimization",
    ],
    architecture: `Full-stack architecture component powering reliable ${name} execution across the production engineering ecosystem.`,
    keyPatterns: [
      "Modular Component Architecture",
      "Type-Safe Execution Contracts",
      "Automated CI/CD Validation Gates",
      "High-Performance Runtime Caching",
    ],
  };
};

interface OrbitNodeItemProps {
  skill: string;
  ringId: "inner" | "middle" | "outer";
  ringDuration: number;
  targetX: number;
  targetY: number;
  ringSpread: MotionValue<number>;
  isNodeActive: boolean;
  isConnected: boolean;
  isOtherDimmed: boolean;
  isNodeHovered: boolean;
  isOrbitPaused: boolean;
  isSectionVisible: boolean;
  shouldReduceMotion: boolean;
  onSelect: (skill: string, e: React.MouseEvent) => void;
  onHoverChange: (skill: string | null) => void;
  registerNodeRef: (skill: string, el: HTMLButtonElement | null) => void;
}

function OrbitNodeItem({
  skill,
  ringId,
  ringDuration,
  targetX,
  targetY,
  ringSpread,
  isNodeActive,
  isConnected,
  isOtherDimmed,
  isNodeHovered,
  isOrbitPaused,
  isSectionVisible,
  shouldReduceMotion,
  onSelect,
  onHoverChange,
  registerNodeRef,
}: OrbitNodeItemProps) {
  const x = useTransform(ringSpread, [0, 1], [0, targetX]);
  const y = useTransform(ringSpread, [0, 1], [0, targetY]);
  const scale = useTransform(ringSpread, [0, 0.35, 1], [0.3, 0.85, 1]);
  const opacity = useTransform(ringSpread, [0, 0.2, 1], [0, 0.85, 1]);

  return (
    <motion.div
      style={
        shouldReduceMotion
          ? {
              left: "50%",
              top: "50%",
              x: targetX,
              y: targetY,
            }
          : {
              left: "50%",
              top: "50%",
              x,
              y,
              scale,
              opacity,
            }
      }
      className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
    >
      <div
        className="relative flex items-center justify-center pointer-events-none"
        style={{
          animationName: !shouldReduceMotion ? `orbit-counter-${ringId}` : "none",
          animationDuration: `${ringDuration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: isOrbitPaused || !isSectionVisible ? "paused" : "running",
        }}
      >
        <button
          ref={(el) => registerNodeRef(skill, el)}
          type="button"
          onClick={(e) => onSelect(skill, e)}
          onMouseEnter={() => onHoverChange(skill)}
          onMouseLeave={() => onHoverChange(null)}
          aria-label={`Inspect ${skill} engineering capabilities`}
          aria-pressed={isNodeActive}
          className={`pointer-events-auto relative rounded-full flex items-center justify-center transition-[transform,border-color,background-color,opacity] duration-200 ease-out transform-gpu cursor-pointer focus-visible:outline-2 focus-visible:outline-[#3B82F6] w-14 h-14 min-w-[48px] min-h-[48px] ${
            isNodeActive
              ? "bg-[#161B22] border-2 border-[#3B82F6] scale-110 z-50 ring-2 ring-[#3B82F6]/30"
              : isConnected
                ? "bg-emerald-500/15 border border-emerald-400 scale-105 z-40"
                : isOtherDimmed
                  ? "bg-[#161B22]/60 border border-white/10 opacity-40 scale-95 z-10 hover:opacity-95 hover:scale-105"
                  : "bg-[#161B22] border border-white/15 hover:scale-110 hover:border-[#3B82F6] z-20"
          }`}
        >
          <TechIcon name={skill} size="md" />
        </button>

        {isNodeHovered && (
          <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-full bg-[#161B22] border border-white/15 text-[11px] font-mono text-white shadow-lg z-50">
            {skill}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [isOrbitPaused, setIsOrbitPaused] = useState<boolean>(false);
  const [isSectionVisible, setIsSectionVisible] = useState<boolean>(true);

  const sectionRef = useRef<HTMLElement>(null);
  const orbitContainerRef = useRef<HTMLDivElement>(null);
  const inspectorWrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const lineRefs = useRef<Record<string, SVGLineElement | null>>({});
  const shouldReduceMotion = useReducedMotion() ?? false;

  const registerNodeRef = React.useCallback((skill: string, el: HTMLButtonElement | null) => {
    nodeRefs.current[skill] = el;
  }, []);

  // Scroll-driven radial burst: nodes start clustered at the center and spread outward to their orbits
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 88%", "center 52%"],
  });
  const smoothBurst = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 22,
    mass: 0.45,
  });

  // Staggered shockwave per ring (inner -> middle -> outer)
  const innerSpread = useTransform(smoothBurst, [0.05, 0.72], [0, 1]);
  const middleSpread = useTransform(smoothBurst, [0.15, 0.85], [0, 1]);
  const outerSpread = useTransform(smoothBurst, [0.25, 0.98], [0, 1]);

  const innerRingScale = useTransform(innerSpread, [0, 1], [0.22, 1]);
  const middleRingScale = useTransform(middleSpread, [0, 1], [0.22, 1]);
  const outerRingScale = useTransform(outerSpread, [0, 1], [0.22, 1]);

  const ringBorderOpacity = useTransform(smoothBurst, [0.05, 0.55], [0, 1]);

  const spreadMap = {
    inner: innerSpread,
    middle: middleSpread,
    outer: outerSpread,
  };
  const ringScaleMap = {
    inner: innerRingScale,
    middle: middleRingScale,
    outer: outerRingScale,
  };

  // Pause orbital animation when offscreen
  useEffect(() => {
    const el = orbitContainerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeTech = selectedNode;
  const activeDetail = activeTech ? getTechDetail(activeTech) : null;
  const connectedTechs = React.useMemo(
    () => (activeTech ? RELATIONSHIPS_MAP[activeTech] || [] : []),
    [activeTech]
  );

  // Sync SVG dotted connection lines to the live rotating DOM positions of orbit nodes
  useEffect(() => {
    if (!activeTech) return;

    let rafId: number | null = null;

    const updateLines = () => {
      const container = orbitContainerRef.current;
      const activeEl = nodeRefs.current[activeTech];
      if (container && activeEl) {
        const cRect = container.getBoundingClientRect();
        const aRect = activeEl.getBoundingClientRect();
        const cx = cRect.width / 2;
        const cy = cRect.height / 2;
        const ax = aRect.left + aRect.width / 2 - cRect.left;
        const ay = aRect.top + aRect.height / 2 - cRect.top;

        const centerUnder = lineRefs.current["center-under"];
        const centerFlow = lineRefs.current["center-flow"];
        [centerUnder, centerFlow].forEach((line) => {
          if (!line) return;
          line.setAttribute("x1", String(cx));
          line.setAttribute("y1", String(cy));
          line.setAttribute("x2", String(ax));
          line.setAttribute("y2", String(ay));
        });

        connectedTechs.forEach((connSkill) => {
          const connEl = nodeRefs.current[connSkill];
          const under = lineRefs.current[`conn-under-${connSkill}`];
          const flow = lineRefs.current[`conn-flow-${connSkill}`];
          if (!connEl || !under || !flow) return;

          const kRect = connEl.getBoundingClientRect();
          const kx = kRect.left + kRect.width / 2 - cRect.left;
          const ky = kRect.top + kRect.height / 2 - cRect.top;

          [under, flow].forEach((line) => {
            line.setAttribute("x1", String(ax));
            line.setAttribute("y1", String(ay));
            line.setAttribute("x2", String(kx));
            line.setAttribute("y2", String(ky));
          });
        });
      }

      if (isSectionVisible && !shouldReduceMotion) {
        rafId = requestAnimationFrame(updateLines);
      }
    };

    updateLines();
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [activeTech, connectedTechs, isSectionVisible, shouldReduceMotion]);

  // Outside Click Dismissal
  useEffect(() => {
    if (!selectedNode) return;
    const handleDocumentClick = () => setSelectedNode(null);
    const timer = setTimeout(() => {
      document.addEventListener("click", handleDocumentClick);
    }, 10);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [selectedNode]);

  const handleNodeClick = (skillName: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedNode((prev) => {
      const next = prev === skillName ? null : skillName;
      if (next && typeof window !== "undefined" && window.innerWidth < 1024) {
        setTimeout(() => {
          inspectorWrapRef.current?.scrollIntoView({
            behavior: shouldReduceMotion ? "auto" : "smooth",
            block: "nearest",
          });
        }, 60);
      }
      return next;
    });
  };

  // Inject CSS keyframes for GPU-composited orbital rotation
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
      @keyframes orbit-signal-flow { from { stroke-dashoffset: 20; } to { stroke-dashoffset: 0; } }
    `;
    document.head.appendChild(styleEl);
  }, []);

  const renderConnectionLines = () => {
    if (!activeTech) return null;

    return (
      <svg
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-15 overflow-visible w-full h-full"
      >
        <line
          ref={(el) => {
            lineRefs.current["center-under"] = el;
          }}
          x1={330}
          y1={330}
          x2={330}
          y2={330}
          stroke="#3B82F6"
          strokeWidth="1.5"
          strokeOpacity="0.25"
        />
        <line
          ref={(el) => {
            lineRefs.current["center-flow"] = el;
          }}
          x1={330}
          y1={330}
          x2={330}
          y2={330}
          stroke="#3B82F6"
          strokeWidth="2"
          strokeDasharray="5 5"
          style={{
            animation: !shouldReduceMotion ? "orbit-signal-flow 1.2s linear infinite" : "none",
          }}
        />
        {connectedTechs.map((connSkill) => (
          <g key={connSkill}>
            <line
              ref={(el) => {
                lineRefs.current[`conn-under-${connSkill}`] = el;
              }}
              x1={330}
              y1={330}
              x2={330}
              y2={330}
              stroke="#10B981"
              strokeWidth="1.2"
              strokeOpacity="0.22"
            />
            <line
              ref={(el) => {
                lineRefs.current[`conn-flow-${connSkill}`] = el;
              }}
              x1={330}
              y1={330}
              x2={330}
              y2={330}
              stroke="#10B981"
              strokeWidth="1.8"
              strokeDasharray="6 4"
              style={{
                animation: !shouldReduceMotion ? "orbit-signal-flow 1.5s linear infinite" : "none",
              }}
            />
          </g>
        ))}
      </svg>
    );
  };

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-[var(--section-padding-y)] bg-[#111318] text-white border-y border-white/10 relative overflow-x-clip scroll-mt-20 sm:scroll-mt-24"
      aria-label="Engineering Ecosystem and Technical Capabilities"
    >
      <div className="content-width relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-[#60a5fa]">
                Technical architecture
              </span>
            </div>
          </div>

          <div className="max-w-3xl mb-10">
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
              Engineering Ecosystem
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/70 leading-relaxed font-sans">
              Interactive technology orbit mapping core engineering domains, frameworks, and database systems. Click any node to inspect its architecture on the right.
            </p>
          </div>
        </ScrollReveal>

        {/* Orbital Centerpiece + Right-Side Inspector Panel */}
        <div
          className={`relative flex flex-col lg:flex-row items-center justify-center transition-[gap] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] w-full max-w-6xl mx-auto my-4 sm:my-8 ${
            activeTech && activeDetail ? "lg:justify-between gap-10 sm:gap-12" : "justify-center gap-0"
          }`}
        >
          <div
            className={`flex justify-center items-center transform-gpu ${
              activeTech && activeDetail ? "w-full lg:w-auto flex-1" : "w-full"
            }`}
          >
            {/* Mobile Touch-Optimized Stack Grid (< md) */}
            <div className="flex flex-col md:hidden py-4 w-full">
              <div className="text-center mb-4 px-2">
                <span className="font-mono text-xs font-semibold text-[#60a5fa] block">
                  Interactive technology ecosystem
                </span>
                <p className="text-xs text-white/65 mt-1">
                  Tap any technology to inspect architectural connections and use cases.
                </p>
              </div>

              <div className="space-y-4 px-1 max-w-lg mx-auto w-full">
                {ORBIT_RINGS.map((ring, ringIdx) => {
                  const ringLabels = [
                    "Core application & languages",
                    "Frameworks & databases",
                    "Cloud, DevOps & tools",
                  ];
                  return (
                    <div
                      key={ring.id}
                      className="p-3.5 rounded-2xl bg-[#161B22] border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="font-mono text-xs font-medium text-white/70">
                          {ringLabels[ringIdx] || `Layer ${ringIdx + 1}`}
                        </span>
                        <span className="font-mono text-[11px] text-[#3B82F6] font-semibold">
                          {ring.skills.length}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                        {ring.skills.map((skill) => {
                          const isNodeActive = activeTech === skill;
                          const isConnected = connectedTechs.includes(skill);

                          return (
                            <button
                              key={skill}
                              type="button"
                              onClick={(e) => handleNodeClick(skill, e)}
                              aria-label={`Inspect ${skill} capabilities`}
                              aria-pressed={isNodeActive}
                              className={`min-h-[48px] h-12 px-3 py-2 rounded-xl text-xs font-mono font-medium border flex items-center gap-2 transition-colors cursor-pointer touch-manipulation text-left focus-visible:outline-2 focus-visible:outline-[#3B82F6] active:scale-[0.98] ${
                                isNodeActive
                                  ? "bg-[#3B82F6]/15 border-[#3B82F6] text-[#3B82F6] font-semibold"
                                  : isConnected
                                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 font-semibold"
                                    : "bg-[#111318] border-white/10 text-white/90 hover:border-[#3B82F6]/40"
                              }`}
                            >
                              <TechIcon name={skill} size="sm" />
                              <span className="truncate">{skill}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Desktop Cinematic Radial-Burst Orbit (>= md) */}
            <div className="hidden md:flex py-6 min-h-[680px] items-center justify-center w-full">
              <div
                ref={orbitContainerRef}
                onMouseEnter={() => setIsOrbitPaused(true)}
                onMouseLeave={() => {
                  setIsOrbitPaused(false);
                  setHoveredNode(null);
                }}
                className="relative flex items-center justify-center select-none mx-auto"
                style={{ width: "660px", height: "660px" }}
              >
                {/* Quiet Single-Accent Radial Core */}
                <div
                  aria-hidden="true"
                  className={`absolute rounded-full pointer-events-none transition-opacity duration-500 ${
                    activeTech ? "opacity-90" : "opacity-55"
                  }`}
                  style={{
                    width: "340px",
                    height: "340px",
                    background:
                      "radial-gradient(circle, rgba(59,130,246,0.16) 0%, transparent 70%)",
                  }}
                />

                {renderConnectionLines()}

                {/* Concentric Expanding Orbit Rings + Revolving Nodes */}
                {ORBIT_RINGS.map((ring) => {
                  const count = ring.skills.length;
                  const diameterPx = ring.radiusPx * 2;
                  const isRingActive = activeTech && ring.skills.includes(activeTech);
                  const ringSpread = spreadMap[ring.id];
                  const ringScale = ringScaleMap[ring.id];

                  return (
                    <div
                      key={ring.id}
                      className="absolute flex items-center justify-center pointer-events-none"
                      style={{
                        width: `${diameterPx}px`,
                        height: `${diameterPx}px`,
                        animationName: !shouldReduceMotion ? `orbit-rotate-${ring.id}` : "none",
                        animationDuration: `${ring.duration}s`,
                        animationTimingFunction: "linear",
                        animationIterationCount: "infinite",
                        animationPlayState: isOrbitPaused || !isSectionVisible ? "paused" : "running",
                      }}
                    >
                      {/* Expanding Ring Border */}
                      <motion.div
                        aria-hidden="true"
                        style={
                          shouldReduceMotion
                            ? undefined
                            : { scale: ringScale, opacity: ringBorderOpacity }
                        }
                        className={`absolute inset-0 rounded-full border pointer-events-none transition-[border-color] duration-300 ${
                          isRingActive
                            ? "border-[#3B82F6]/60"
                            : activeTech
                              ? "border-white/10 border-dashed"
                              : "border-white/15 border-dashed"
                        }`}
                      />

                      {/* Nodes bursting outward from center to ring radius */}
                      {ring.skills.map((skill, i) => {
                        const angleDeg = (360 / count) * i;
                        const angleRad = (angleDeg * Math.PI) / 180;
                        const targetX = Math.cos(angleRad) * ring.radiusPx;
                        const targetY = Math.sin(angleRad) * ring.radiusPx;

                        const isNodeActive = activeTech === skill;
                        const isConnected = connectedTechs.includes(skill);
                        const isOtherDimmed = activeTech !== null && !isNodeActive && !isConnected;
                        const isNodeHovered = hoveredNode === skill;

                        return (
                          <OrbitNodeItem
                            key={skill}
                            skill={skill}
                            ringId={ring.id}
                            ringDuration={ring.duration}
                            targetX={targetX}
                            targetY={targetY}
                            ringSpread={ringSpread}
                            isNodeActive={isNodeActive}
                            isConnected={isConnected}
                            isOtherDimmed={isOtherDimmed}
                            isNodeHovered={isNodeHovered}
                            isOrbitPaused={isOrbitPaused}
                            isSectionVisible={isSectionVisible}
                            shouldReduceMotion={shouldReduceMotion}
                            onSelect={handleNodeClick}
                            onHoverChange={setHoveredNode}
                            registerNodeRef={registerNodeRef}
                          />
                        );
                      })}
                    </div>
                  );
                })}

                {/* Center Node / Monogram Core */}
                <button
                  type="button"
                  onClick={() => setSelectedNode(null)}
                  title="Reset selected technology"
                  className={`relative z-40 w-44 h-44 rounded-full bg-[#161B22] border-2 flex flex-col items-center justify-center transition-[transform,border-color,background-color] duration-300 cursor-pointer shadow-2xl overflow-hidden p-4 text-center focus-visible:outline-2 focus-visible:outline-[#3B82F6] ${
                    activeTech
                      ? "border-[#3B82F6] scale-105 bg-[#1A202C]"
                      : "border-[#3B82F6]/60 hover:scale-[1.03] hover:border-[#3B82F6]"
                  }`}
                >
                  <span className="sr-only">Reset selected technology: </span>
                  <AnimatePresence mode="wait">
                    {activeTech && activeDetail ? (
                      <motion.div
                        key={`active-${activeTech}`}
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94, y: 6 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -6 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex flex-col items-center justify-center relative z-10 w-full px-2"
                      >
                        <div className="mb-1.5">
                          <TechIcon name={activeTech} size="lg" />
                        </div>
                        <span className="font-display font-bold text-base sm:text-lg text-white leading-tight truncate max-w-[160px]">
                          {activeTech}
                        </span>
                        <span
                          className="font-mono text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 border"
                          style={{
                            color: activeDetail.categoryColor,
                            borderColor: `${activeDetail.categoryColor}50`,
                            backgroundColor: `${activeDetail.categoryColor}18`,
                          }}
                        >
                          {activeDetail.category}
                        </span>
                        <div className="mt-2 pt-1.5 border-t border-white/10 w-full font-mono text-[10px] text-white/80 flex justify-between px-1">
                          <span className="text-white/60">Projects</span>
                          <span className="font-semibold text-emerald-400">
                            {activeDetail.projectsList.length}
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="default-center"
                        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.94 }}
                        animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                        exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="flex flex-col items-center justify-center relative z-10"
                      >
                        <span className="font-display font-extrabold text-4xl text-white tracking-tight">
                          DV<span className="text-[#3B82F6]">.</span>
                        </span>
                        <span className="font-mono text-xs text-[#3B82F6] font-medium mt-1.5">
                          Software engineer
                        </span>
                        <span className="font-sans text-[11px] text-white/65 mt-1 max-w-[150px] leading-snug">
                          Click any node to inspect
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>

          {/* Right-Side Inspector Panel */}
          <div ref={inspectorWrapRef} className="w-full lg:w-auto scroll-mt-24">
            <AnimatePresence mode="popLayout">
              {activeTech && activeDetail && (
                <SkillInspectorPanel
                  activeTech={activeTech}
                  activeDetail={activeDetail}
                  connectedTechs={connectedTechs}
                  shouldReduceMotion={shouldReduceMotion}
                  onClose={() => setSelectedNode(null)}
                  onSelectTech={(tech) => handleNodeClick(tech)}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
