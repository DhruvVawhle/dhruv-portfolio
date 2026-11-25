"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Eye } from "lucide-react";
import { ShowcaseProject } from "@/data/showcaseProjects";
import CoverRingCard from "./CoverRingCard";

interface CoverRingProps {
  projects: ShowcaseProject[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onOpenDetail: (project: ShowcaseProject) => void;
  shouldReduceMotion?: boolean;
  isPaused?: boolean;
}

export default function CoverRing({
  projects,
  activeIndex,
  setActiveIndex,
  onOpenDetail,
  shouldReduceMotion = false,
  isPaused = false,
}: CoverRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pedestalRef = useRef<HTMLDivElement>(null);
  const ringGroupRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Responsive radius calculation
  const [radius, setRadius] = useState(430);
  const [stageHeight, setStageHeight] = useState(560);
  const radiusRef = useRef(radius);

  // 3D rotation refs (mutated directly in RAF for zero React re-renders per frame)
  const targetRotationRef = useRef(0);
  const currentRotationRef = useRef(0);
  const animIdRef = useRef<number | null>(null);
  const mouseTiltRef = useRef({ x: 0, y: 0 });

  // Drag interaction refs/state
  const isDraggingRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);
  const activeIndexRef = useRef(activeIndex);
  const isInternalUpdateRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartRotRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const lastDragXRef = useRef(0);

  // Robust pointer & tap tracking
  const pointerDownPosRef = useRef({ x: 0, y: 0, time: 0 });
  const hasDraggedRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const activePointerIdRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto orbit
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const total = projects.length;
  const safeTotal = Math.max(1, total);
  const stepAngle = 360 / safeTotal;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    radiusRef.current = radius;
  }, [radius]);

  // Apply 3D transforms directly to card DOM nodes without triggering React re-renders
  const applyTransforms = useCallback(
    (rot: number) => {
      const r = radiusRef.current;
      const tilt = mouseTiltRef.current;

      if (pedestalRef.current) {
        pedestalRef.current.style.transform = `rotateX(${75 + tilt.x * 0.5}deg) translateZ(-160px)`;
      }
      if (ringGroupRef.current) {
        ringGroupRef.current.style.transform = `rotateX(${11 + tilt.x}deg) rotateY(${tilt.y * 0.7}deg)`;
      }

      for (let idx = 0; idx < total; idx++) {
        const el = cardRefs.current[idx];
        if (!el) continue;

        const cardRawAngle = idx * stepAngle - rot;
        const normAngle = ((((cardRawAngle % 360) + 540) % 360) - 180);
        const rad = (normAngle * Math.PI) / 180;

        const x = Math.sin(rad) * r;
        const z = total === 1 ? 0 : Math.cos(rad) * r - r;
        const depthRatio = total === 1 ? 0 : (1 - Math.cos(rad)) / 2;
        const scale = 1 - depthRatio * 0.28;
        const opacity = Math.max(0.25, 1 - depthRatio * 0.68);
        const zIndex = Math.round((1 - depthRatio) * 100);
        const rotateY = total === 1 ? 0 : normAngle * 0.88;

        el.style.transform = `translate3d(${x}px, 0px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(zIndex);
        el.style.pointerEvents = depthRatio > 0.88 ? "none" : "auto";
        el.style.setProperty("--card-depth", depthRatio.toFixed(3));
      }
    },
    [stepAngle, total]
  );

  // Sync radius with window resize
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      let nextRadius = 430;
      let nextHeight = 560;
      if (width < 380) {
        nextRadius = 185;
        nextHeight = 480;
      } else if (width < 640) {
        nextRadius = 225;
        nextHeight = 500;
      } else if (width < 1024) {
        nextRadius = 340;
        nextHeight = 540;
      }
      radiusRef.current = nextRadius;
      setRadius(nextRadius);
      setStageHeight(nextHeight);
      applyTransforms(currentRotationRef.current);
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [applyTransforms]);

  // Start/keep RAF loop running when needed; automatically sleeps when settled
  const startLoopRef = useRef<() => void>(() => {});

  useEffect(() => {
    if (total === 0) return;

    if (shouldReduceMotion) {
      if (animIdRef.current !== null) {
        cancelAnimationFrame(animIdRef.current);
        animIdRef.current = null;
      }
      const snapped = activeIndexRef.current * stepAngle;
      currentRotationRef.current = snapped;
      targetRotationRef.current = snapped;
      applyTransforms(snapped);
      return;
    }

    const tick = () => {
      const orbiting = isAutoOrbit && !isHovered && !isDraggingRef.current && !isPaused && total > 1;
      if (orbiting) {
        targetRotationRef.current += 0.12;
        const normalizedTarget = ((targetRotationRef.current % 360) + 360) % 360;
        const nearestIdx = Math.round(normalizedTarget / stepAngle) % safeTotal;
        if (nearestIdx !== activeIndexRef.current) {
          isInternalUpdateRef.current = true;
          setActiveIndex(nearestIdx);
        }
      }

      let settled = false;
      if (!isDraggingRef.current) {
        const diff = targetRotationRef.current - currentRotationRef.current;
        if (Math.abs(diff) < 0.02 && !orbiting) {
          currentRotationRef.current = targetRotationRef.current;
          settled = true;
        } else {
          currentRotationRef.current += diff * 0.12;
        }
        applyTransforms(currentRotationRef.current);
      }

      if (settled && !orbiting) {
        animIdRef.current = null;
        return;
      }
      animIdRef.current = requestAnimationFrame(tick);
    };

    startLoopRef.current = () => {
      if (animIdRef.current === null && !isPaused && !shouldReduceMotion) {
        animIdRef.current = requestAnimationFrame(tick);
      }
    };

    if (!isPaused) {
      startLoopRef.current();
    }

    return () => {
      if (animIdRef.current !== null) {
        cancelAnimationFrame(animIdRef.current);
        animIdRef.current = null;
      }
    };
  }, [isAutoOrbit, isHovered, isPaused, shouldReduceMotion, stepAngle, total, safeTotal, setActiveIndex, applyTransforms]);

  // When activeIndex changes externally (e.g. filter, keyboard, or dots), rotate to it
  useEffect(() => {
    if (isDraggingRef.current || total === 0) return;
    if (isInternalUpdateRef.current) {
      isInternalUpdateRef.current = false;
      return;
    }
    const clampedIdx = Math.min(activeIndex, total - 1);
    const currentNorm = ((currentRotationRef.current % 360) + 360) % 360;
    const targetNorm = clampedIdx * stepAngle;
    let deltaAngle = targetNorm - currentNorm;
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;

    targetRotationRef.current = currentRotationRef.current + deltaAngle;

    if (shouldReduceMotion) {
      currentRotationRef.current = targetRotationRef.current;
      applyTransforms(currentRotationRef.current);
    } else {
      startLoopRef.current();
    }
  }, [activeIndex, stepAngle, total, shouldReduceMotion, applyTransforms]);

  // Cleanup resume timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  // Pointer drag gestures with non-intrusive tap detection
  const handlePointerDown = (e: React.PointerEvent) => {
    if (total <= 1) return;
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }

    pointerDownPosRef.current = { x: e.clientX, y: e.clientY, time: performance.now() };
    dragStartXRef.current = e.clientX;
    dragStartRotRef.current = currentRotationRef.current;
    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = performance.now();
    dragVelocityRef.current = 0;
    hasDraggedRef.current = false;
    isDraggingRef.current = false;
    setIsDragging(false);
    isPointerDownRef.current = true;
    activePointerIdRef.current = e.pointerId;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Parallax mouse tilt (desktop mouse only, zero React re-renders)
    if (containerRef.current && e.pointerType === "mouse" && !shouldReduceMotion) {
      const rect = containerRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      mouseTiltRef.current = { x: relY * -6, y: relX * 6 };
      if (pedestalRef.current) {
        pedestalRef.current.style.transform = `rotateX(${75 + mouseTiltRef.current.x * 0.5}deg) translateZ(-160px)`;
      }
      if (ringGroupRef.current) {
        ringGroupRef.current.style.transform = `rotateX(${11 + mouseTiltRef.current.x}deg) rotateY(${mouseTiltRef.current.y * 0.7}deg)`;
      }
    }

    if (!isPointerDownRef.current || activePointerIdRef.current !== e.pointerId) return;

    const deltaX = e.clientX - pointerDownPosRef.current.x;
    const deltaY = e.clientY - pointerDownPosRef.current.y;

    // Only engage drag if horizontal movement exceeds drag threshold (8px)
    if (!hasDraggedRef.current) {
      if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
        hasDraggedRef.current = true;
        isDraggingRef.current = true;
        setIsDragging(true);
        setIsHovered(true);
        stageRef.current?.setPointerCapture?.(e.pointerId);
      } else {
        return;
      }
    }

    if (!isDraggingRef.current) return;

    const currentX = e.clientX;
    const moveX = currentX - dragStartXRef.current;
    const now = performance.now();
    const dt = now - lastDragTimeRef.current;

    if (dt > 0) {
      dragVelocityRef.current = (currentX - lastDragXRef.current) / dt;
    }
    lastDragXRef.current = currentX;
    lastDragTimeRef.current = now;

    const sensitivity = 0.32;
    const newRot = dragStartRotRef.current - moveX * sensitivity;
    currentRotationRef.current = newRot;
    applyTransforms(newRot);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current || activePointerIdRef.current !== e.pointerId) return;
    isPointerDownRef.current = false;
    activePointerIdRef.current = null;

    if (hasDraggedRef.current && isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
      hasDraggedRef.current = false;
      stageRef.current?.releasePointerCapture?.(e.pointerId);

      const finalRot = currentRotationRef.current - dragVelocityRef.current * 80;
      const rawIndex = Math.round(finalRot / stepAngle);
      targetRotationRef.current = rawIndex * stepAngle;

      const normalizedIndex = ((rawIndex % safeTotal) + safeTotal) % safeTotal;
      setActiveIndex(normalizedIndex);
      startLoopRef.current();
    } else {
      isDraggingRef.current = false;
      setIsDragging(false);
      hasDraggedRef.current = false;
    }

    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 1000);
  };

  const handlePointerCancel = (e: React.PointerEvent) => {
    if (activePointerIdRef.current === e.pointerId) {
      if (hasDraggedRef.current) {
        stageRef.current?.releasePointerCapture?.(e.pointerId);
      }
      isPointerDownRef.current = false;
      isDraggingRef.current = false;
      setIsDragging(false);
      hasDraggedRef.current = false;
      activePointerIdRef.current = null;
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
      setIsHovered(false);
    }
  };

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (total <= 1) return;
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5;
      if (e.shiftKey || isHorizontalScroll) {
        const delta = isHorizontalScroll ? e.deltaX : e.deltaY;
        if (Math.abs(delta) > 3) {
          targetRotationRef.current += delta * 0.18;
          const normalized = ((targetRotationRef.current % 360) + 360) % 360;
          const nearestIdx = Math.round(normalized / stepAngle) % safeTotal;
          if (nearestIdx !== activeIndexRef.current) {
            isInternalUpdateRef.current = true;
            setActiveIndex(nearestIdx);
          }
          startLoopRef.current();
        }
      }
    },
    [stepAngle, total, safeTotal, setActiveIndex]
  );

  const rotateToIndex = (targetIdx: number) => {
    if (total === 0) return;
    const clampedIdx = ((targetIdx % total) + total) % total;
    const currentNorm = ((currentRotationRef.current % 360) + 360) % 360;
    const targetNorm = clampedIdx * stepAngle;

    let deltaAngle = targetNorm - currentNorm;
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;

    targetRotationRef.current = currentRotationRef.current + deltaAngle;
    setActiveIndex(clampedIdx);

    if (shouldReduceMotion) {
      currentRotationRef.current = targetRotationRef.current;
      applyTransforms(currentRotationRef.current);
    } else {
      startLoopRef.current();
    }
  };

  const handlePrev = () => rotateToIndex((activeIndex - 1 + safeTotal) % safeTotal);
  const handleNext = () => rotateToIndex((activeIndex + 1) % safeTotal);

  if (total === 0) {
    return (
      <div className="w-full py-16 text-center rounded-3xl border border-border-custom bg-bg-surface/60">
        <p className="text-sm text-text-secondary">No projects match this filter yet.</p>
      </div>
    );
  }

  const safeActiveIndex = Math.min(activeIndex, total - 1);
  const activeProject = projects[safeActiveIndex];

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseEnter={() => {
        if (typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches) {
          setIsHovered(true);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseTiltRef.current = { x: 0, y: 0 };
        if (pedestalRef.current) {
          pedestalRef.current.style.transform = "rotateX(75deg) translateZ(-160px)";
        }
        if (ringGroupRef.current) {
          ringGroupRef.current.style.transform = "rotateX(11deg) rotateY(0deg)";
        }
      }}
      className="relative w-full flex flex-col items-center select-none"
    >
      {/* 3D Stage Viewport */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        style={{
          perspective: "1350px",
          height: `${stageHeight}px`,
          touchAction: "pan-y",
        }}
        className={`relative w-full flex items-center justify-center overflow-visible ${
          total > 1 ? "cursor-grab active:cursor-grabbing" : ""
        }`}
      >
        {/* Floor Pedestal Stage Ring */}
        <div
          ref={pedestalRef}
          aria-hidden="true"
          style={{
            transform: "rotateX(75deg) translateZ(-160px)",
            width: `${radius * 2.2}px`,
            height: `${radius * 2.2}px`,
          }}
          className="pointer-events-none absolute rounded-full border border-accent/25 motion-safe:transition-transform duration-500 ease-out flex items-center justify-center"
        >
          <div className="absolute inset-0 rounded-full border border-accent/10" />
          <div className="w-[82%] h-[82%] rounded-full border border-dashed border-accent/20" />
          <div className="w-[60%] h-[60%] rounded-full border border-accent/15" />
          <div className="absolute bottom-4 w-40 h-10 rounded-full bg-accent/25 blur-lg" />
        </div>

        {/* 3D Cover Ring Carousel */}
        <div
          ref={ringGroupRef}
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(11deg) rotateY(0deg)",
            transition: isDragging ? "none" : "transform 0.4s ease-out",
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {projects.map((project, idx) => {
            const cardRawAngle = idx * stepAngle - safeActiveIndex * stepAngle;
            const normAngle = ((((cardRawAngle % 360) + 540) % 360) - 180);
            const rad = (normAngle * Math.PI) / 180;
            const x = Math.sin(rad) * radius;
            const z = total === 1 ? 0 : Math.cos(rad) * radius - radius;
            const depthRatio = total === 1 ? 0 : (1 - Math.cos(rad)) / 2;
            const scale = 1 - depthRatio * 0.28;
            const opacity = Math.max(0.25, 1 - depthRatio * 0.68);
            const zIndex = Math.round((1 - depthRatio) * 100);
            const rotateY = total === 1 ? 0 : normAngle * 0.88;
            const isFront = idx === safeActiveIndex;

            return (
              <div
                key={project.id}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                style={{
                  position: "absolute",
                  transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformStyle: "preserve-3d",
                  pointerEvents: depthRatio > 0.88 ? "none" : "auto",
                  ["--card-depth" as string]: depthRatio.toFixed(3),
                }}
                className="will-change-transform"
              >
                <CoverRingCard
                  project={project}
                  isFront={isFront}
                  angle={normAngle}
                  depthRatio={depthRatio}
                  onSelect={() => rotateToIndex(idx)}
                  onOpenDetail={() => onOpenDetail(project)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Upper Hand: Active Project Indicator & Header */}
      <div className="w-full flex items-center justify-center mt-3 sm:mt-4 mb-2 sm:mb-3 px-3 z-20">
        <div
          aria-live="polite"
          className="inline-flex items-center gap-2 sm:gap-2.5 py-1.5 px-4 rounded-full bg-bg-surface/90 backdrop-blur-md border border-border-custom shadow-xs font-mono text-xs transition-colors duration-200"
        >
          <span className="font-semibold text-text-primary tracking-tight">
            {String(safeActiveIndex + 1).padStart(2, "0")}{" "}
            <span className="text-border-custom">/</span>{" "}
            {String(total).padStart(2, "0")}
          </span>
          <span className="text-border-custom" aria-hidden="true">
            /
          </span>
          {activeProject && (
            <button
              type="button"
              onClick={() => {
                if (activeProject.isGitHubCard) {
                  window.open(activeProject.githubUrl, "_blank", "noopener,noreferrer");
                } else {
                  onOpenDetail(activeProject);
                }
              }}
              aria-label={`View ${activeProject.title} project`}
              className="text-accent font-semibold truncate max-w-[200px] sm:max-w-[280px] hover:underline cursor-pointer flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-accent rounded-sm"
            >
              <span>{activeProject.title}</span>
              <Eye className="w-3.5 h-3.5 flex-shrink-0" />
            </button>
          )}
        </div>
      </div>

      {/* Ground Controls Deck */}
      <div className="w-full max-w-5xl px-2 sm:px-4 grid grid-cols-1 md:grid-cols-3 items-center gap-3.5 sm:gap-4 z-20">
        <div className="hidden md:block" aria-hidden="true" />

        {/* Center: Prev/Next & Pagination Dots */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3 justify-self-center">
          <button
            type="button"
            onClick={handlePrev}
            disabled={total <= 1}
            aria-label="Rotate ring to previous project"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-border-custom bg-bg-surface hover:border-accent hover:text-accent flex items-center justify-center text-text-primary transition-colors duration-150 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-accent active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-surface border border-border-custom shadow-xs">
            {projects.map((proj, idx) => {
              const isActive = safeActiveIndex === idx;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => rotateToIndex(idx)}
                  aria-label={`Rotate to ${proj.title}`}
                  aria-current={isActive ? "true" : undefined}
                  className="min-w-[28px] min-h-[36px] flex items-center justify-center p-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent rounded-full transition-transform active:scale-90"
                >
                  <span
                    className={`h-2 rounded-full transition-[width,background-color] duration-200 pointer-events-none ${
                      isActive
                        ? "w-7 bg-accent shadow-xs shadow-accent/50"
                        : "w-2 bg-border-custom hover:bg-text-secondary/50"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={total <= 1}
            aria-label="Rotate ring to next project"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-border-custom bg-bg-surface hover:border-accent hover:text-accent flex items-center justify-center text-text-primary transition-colors duration-150 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-accent active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Right portion: View Case Study, Orbiting Toggle, and Camera Reset */}
        <div className="flex items-center gap-2 flex-wrap justify-center md:justify-end justify-self-center md:justify-self-end">
          {activeProject && (
            <button
              type="button"
              onClick={() => {
                if (activeProject.isGitHubCard) {
                  window.open(activeProject.githubUrl, "_blank", "noopener,noreferrer");
                } else {
                  onOpenDetail(activeProject);
                }
              }}
              aria-label={`View ${activeProject.title} case study`}
              className="min-h-[44px] h-11 px-4 py-2 rounded-full text-xs font-semibold bg-accent text-white flex items-center gap-1.5 shadow-md shadow-accent/20 hover:bg-accent/90 active:scale-95 cursor-pointer touch-manipulation focus-visible:outline-2 focus-visible:outline-accent"
            >
              <Eye className="w-3.5 h-3.5 text-white" />
              <span>{activeProject.isGitHubCard ? "Open GitHub" : "View Case Study"}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsAutoOrbit((prev) => !prev)}
            disabled={total <= 1 || shouldReduceMotion}
            aria-label={isAutoOrbit ? "Pause auto-orbit" : "Enable continuous 3D auto-orbit"}
            aria-pressed={isAutoOrbit}
            className={`min-h-[44px] h-11 px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border transition-colors duration-150 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-accent active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation ${
              isAutoOrbit && !shouldReduceMotion
                ? "bg-accent/15 border-accent text-accent"
                : "bg-bg-surface border-border-custom text-text-secondary hover:text-text-primary hover:border-accent/40"
            }`}
          >
            {isAutoOrbit && !shouldReduceMotion ? (
              <>
                <Pause className="w-3.5 h-3.5 text-accent" />
                <span>Orbiting</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5" />
                <span>Auto-Orbit</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => rotateToIndex(0)}
            disabled={total <= 1}
            title="Reset ring to first card"
            aria-label="Reset ring to first card"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-border-custom bg-bg-surface text-text-secondary hover:text-text-primary hover:border-accent flex items-center justify-center transition-colors cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-accent touch-manipulation active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
