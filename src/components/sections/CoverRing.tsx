"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, Pause, RotateCcw } from "lucide-react";
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

  // Responsive radius calculation
  const [radius, setRadius] = useState(420);
  const [stageHeight, setStageHeight] = useState(560);

  // 3D rotation state (in degrees)
  const [rotation, setRotation] = useState(0);
  const targetRotationRef = useRef(0);
  const currentRotationRef = useRef(0);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;
  const isInternalUpdateRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartRotRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const lastDragXRef = useRef(0);

  // Auto orbit
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse parallax tilt
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  const total = projects.length;
  const stepAngle = total > 0 ? 360 / total : 72;

  // Sync radius with window resize
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 380) {
        setRadius(185);
        setStageHeight(480);
      } else if (width < 640) {
        setRadius(225);
        setStageHeight(500);
      } else if (width < 1024) {
        setRadius(340);
        setStageHeight(540);
      } else {
        setRadius(430);
        setStageHeight(560);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // When activeIndex changes externally (e.g. filter or dots), rotate to it
  useEffect(() => {
    if (isDraggingRef.current) return;
    if (isInternalUpdateRef.current) {
      isInternalUpdateRef.current = false;
      return;
    }
    const currentNorm = ((currentRotationRef.current % 360) + 360) % 360;
    const targetNorm = activeIndex * stepAngle;
    let deltaAngle = targetNorm - currentNorm;
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;
    targetRotationRef.current = currentRotationRef.current + deltaAngle;
  }, [activeIndex, stepAngle]);

  // Smooth animation frame loop for rotation spring physics and auto-orbit
  useEffect(() => {
    if (shouldReduceMotion) return;

    let animId: number;

    const animate = () => {
      if (isAutoOrbit && !isHovered && !isDraggingRef.current && !isPaused) {
        targetRotationRef.current += 0.12; // Gentle orbit speed
        const normalizedTarget = ((targetRotationRef.current % 360) + 360) % 360;
        const nearestIdx = Math.round(normalizedTarget / stepAngle) % total;
        if (nearestIdx !== activeIndexRef.current) {
          isInternalUpdateRef.current = true;
          setActiveIndex(nearestIdx);
        }
      }

      if (!isDraggingRef.current) {
        const diff = targetRotationRef.current - currentRotationRef.current;
        currentRotationRef.current += diff * 0.12;
        setRotation(currentRotationRef.current);
      }

      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isAutoOrbit, isHovered, isPaused, shouldReduceMotion, stepAngle, total, setActiveIndex]);

  // Pointer drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
    dragStartRotRef.current = currentRotationRef.current;
    lastDragXRef.current = e.clientX;
    lastDragTimeRef.current = performance.now();
    dragVelocityRef.current = 0;

    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      setMouseTilt({
        x: relY * -6,
        y: relX * 6,
      });
    }

    if (!isDraggingRef.current) return;

    const currentX = e.clientX;
    const deltaX = currentX - dragStartXRef.current;
    const now = performance.now();
    const dt = now - lastDragTimeRef.current;

    if (dt > 0) {
      dragVelocityRef.current = (currentX - lastDragXRef.current) / dt;
    }
    lastDragXRef.current = currentX;
    lastDragTimeRef.current = now;

    const sensitivity = 0.32;
    const newRot = dragStartRotRef.current - deltaX * sensitivity;
    currentRotationRef.current = newRot;
    setRotation(newRot);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);

    const finalRot = currentRotationRef.current - dragVelocityRef.current * 80;
    const rawIndex = Math.round(finalRot / stepAngle);
    targetRotationRef.current = rawIndex * stepAngle;

    const normalizedIndex = ((rawIndex % total) + total) % total;
    setActiveIndex(normalizedIndex);
  };

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      // Only capture wheel when user intends horizontal ring navigation or holds Shift
      const isHorizontalScroll = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.5;
      if (e.shiftKey || isHorizontalScroll) {
        const delta = isHorizontalScroll ? e.deltaX : e.deltaY;
        if (Math.abs(delta) > 3) {
          targetRotationRef.current += delta * 0.18;
          const normalized = ((targetRotationRef.current % 360) + 360) % 360;
          const nearestIdx = Math.round(normalized / stepAngle) % total;
          if (nearestIdx !== activeIndexRef.current) {
            isInternalUpdateRef.current = true;
            setActiveIndex(nearestIdx);
          }
        }
      }
      // Vertical scroll passes through smoothly to window/Lenis
    },
    [stepAngle, total, setActiveIndex]
  );

  const rotateToIndex = (targetIdx: number) => {
    const currentNorm = ((currentRotationRef.current % 360) + 360) % 360;
    const targetNorm = targetIdx * stepAngle;

    let deltaAngle = targetNorm - currentNorm;
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;

    targetRotationRef.current = currentRotationRef.current + deltaAngle;
    setActiveIndex(targetIdx);
  };

  const handlePrev = () => {
    const nextIdx = (activeIndex - 1 + total) % total;
    rotateToIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % total;
    rotateToIndex(nextIdx);
  };

  const activeProject = projects[activeIndex];

  return (
    <div
      ref={containerRef}
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMouseTilt({ x: 0, y: 0 });
      }}
      className="relative w-full flex flex-col items-center select-none"
    >
      {/* 3D Stage Viewport */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          perspective: "1350px",
          height: `${stageHeight}px`,
          touchAction: "pan-y",
        }}
        className="relative w-full flex items-center justify-center overflow-visible cursor-grab active:cursor-grabbing"
      >
        {/* Floor Pedestal Stage Ring */}
        <div
          aria-hidden="true"
          style={{
            transform: `rotateX(${75 + mouseTilt.x * 0.5}deg) translateZ(-160px)`,
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
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${11 + mouseTilt.x}deg) rotateY(${mouseTilt.y * 0.7}deg)`,
            transition: isDraggingRef.current ? "none" : "transform 0.4s ease-out",
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {projects.map((project, idx) => {
            const cardRawAngle = idx * stepAngle - rotation;
            const normAngle = ((((cardRawAngle % 360) + 540) % 360) - 180);
            const rad = (normAngle * Math.PI) / 180;

            const x = Math.sin(rad) * radius;
            const z = Math.cos(rad) * radius - radius;

            const depthRatio = (1 - Math.cos(rad)) / 2;
            const scale = 1 - depthRatio * 0.28;
            const opacity = Math.max(0.25, 1 - depthRatio * 0.68);
            const zIndex = Math.round((1 - depthRatio) * 100);
            const rotateY = normAngle * 0.88;
            const isFront = Math.abs(normAngle) < stepAngle / 2;

            return (
              <div
                key={project.id}
                style={{
                  position: "absolute",
                  transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transformStyle: "preserve-3d",
                  transition: isDraggingRef.current ? "opacity 0.1s" : "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  pointerEvents: depthRatio > 0.88 ? "none" : "auto",
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

      {/* Ring Controls Bar */}
      <div className="w-full max-w-4xl mt-3 sm:mt-4 px-2 sm:px-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 z-20">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Rotate ring to previous project"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-border-custom bg-bg-surface hover:border-accent hover:text-accent flex items-center justify-center text-text-primary transition-colors duration-150 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-accent active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-bg-surface border border-border-custom shadow-xs">
            {projects.map((proj, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => rotateToIndex(idx)}
                  aria-label={`Rotate to ${proj.title}`}
                  className="min-w-[28px] min-h-[36px] flex items-center justify-center p-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent rounded-full transition-transform active:scale-90"
                >
                  <span
                    className={`h-2 rounded-full transition-colors duration-200 pointer-events-none ${
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
            aria-label="Rotate ring to next project"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-border-custom bg-bg-surface hover:border-accent hover:text-accent flex items-center justify-center text-text-primary transition-colors duration-150 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-accent active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="font-mono text-xs text-text-secondary flex items-center gap-2">
          <span className="font-semibold text-text-primary">
            {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <span className="text-border-custom">/</span>
          <span className="text-accent font-medium truncate max-w-[200px]">
            {activeProject?.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsAutoOrbit((prev) => !prev)}
            aria-label={isAutoOrbit ? "Pause auto-orbit" : "Enable continuous 3D auto-orbit"}
            aria-pressed={isAutoOrbit}
            className={`min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border transition-colors duration-150 cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-accent active:scale-95 disabled:opacity-50 ${
              isAutoOrbit
                ? "bg-accent/15 border-accent text-accent"
                : "bg-bg-surface border-border-custom text-text-secondary hover:text-text-primary hover:border-accent/40"
            }`}
          >
            {isAutoOrbit ? (
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
            title="Reset ring to first card"
            aria-label="Reset ring to first card"
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-full border border-border-custom bg-bg-surface text-text-secondary hover:text-text-primary hover:border-accent flex items-center justify-center transition-colors cursor-pointer shadow-xs focus-visible:outline-2 focus-visible:outline-accent"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

