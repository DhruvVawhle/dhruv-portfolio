"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import LightboxModal from "@/components/ui/LightboxModal";

export interface ShowcaseSlide {
  src: string;
  title: string;
  description: string;
  caption?: string;
}

interface ProductShowcaseGalleryProps {
  slides: ShowcaseSlide[];
  displayMode?: "desktop" | "mobile";
  accentName?: string;
}

export default function ProductShowcaseGallery({
  slides,
  displayMode = "desktop",
}: ProductShowcaseGalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const prefersReducedMotion = useReducedMotion();

  // Handle visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const goToPrev = useCallback(() => {
    setImageLoaded(false);
    setImageError(false);
    setActiveIdx((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToNext = useCallback(() => {
    setImageLoaded(false);
    setImageError(false);
    setActiveIdx((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const goToIndex = useCallback(
    (idx: number) => {
      if (idx === activeIdx) return;
      setImageLoaded(false);
      setImageError(false);
      setActiveIdx(idx);
    },
    [activeIdx]
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrev, goToNext, lightboxOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) goToNext();
    if (diff < -50) goToPrev();
    setTouchStart(null);
  };

  // Auto-slide effect every 3.8s
  useEffect(() => {
    if (
      slides.length <= 1 ||
      isHovered ||
      !isPageVisible ||
      lightboxOpen ||
      prefersReducedMotion
    ) {
      return;
    }

    const timer = setTimeout(() => {
      goToNext();
    }, 4000);

    return () => clearTimeout(timer);
  }, [
    activeIdx,
    isHovered,
    isPageVisible,
    lightboxOpen,
    prefersReducedMotion,
    slides.length,
    goToNext,
  ]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[activeIdx];

  const accentClasses = "text-white border-white/20 bg-white/10";
  const accentProgressBg = "bg-white";

  return (
    <div className="w-full space-y-6">
      {/* Top Header: Showcase Badge & Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`px-3 py-1 rounded-full font-mono text-xs font-bold uppercase ${accentClasses}`}
          >
            PRODUCT SHOWCASE
          </span>
          <span className="font-mono text-xs text-gray-400">
            Slide {activeIdx + 1} of {slides.length}
          </span>
        </div>

        {/* Navigation Arrows & Controls */}
        {slides.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrev}
              aria-label="Previous slide"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              aria-label="Next slide"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* ── STAGE SECTION (DESKTOP vs MOBILE PHONE MOCKUP) ── */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative"
      >
        {displayMode === "mobile" ? (
          /* ── REALISTIC MOBILE PHONE DEVICE MOCKUP ── */
          <div className="flex flex-col items-center justify-center py-4">
            <div
              onClick={() => setLightboxOpen(true)}
              className="group relative w-full max-w-[270px] sm:max-w-[300px] aspect-[9/19.5] rounded-[42px] border-[10px] border-[#1c1e24] bg-[#090a0e] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Top Speaker Notch / Dynamic Island */}
              <div className="absolute top-2 inset-x-0 flex justify-center z-20 pointer-events-none">
                <div className="w-20 h-4 rounded-full bg-[#1c1e24] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-black/60 mr-2" />
                  <div className="w-8 h-1 rounded-full bg-black/40" />
                </div>
              </div>

              {/* Skeleton Loader */}
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#111318]">
                  <div className="w-7 h-7 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                </div>
              )}

              {/* Screenshot Image (Uncropped Aspect Fit) */}
              {!imageError ? (
                <Image
                  src={currentSlide.src}
                  alt={currentSlide.title}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="object-contain pt-6 pb-2 px-1"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-6 text-center space-y-2 h-full text-white">
                  <div className="font-mono text-xs font-bold text-gray-300">[{currentSlide.title}]</div>
                  <div className="font-mono text-[10px] text-gray-400">{currentSlide.description}</div>
                </div>
              )}

              {/* Enlarge Overlay Prompt */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-30">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white font-mono text-xs font-semibold border border-white/20">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    <line x1="11" y1="8" x2="11" y2="14" />
                    <line x1="8" y1="11" x2="14" y2="11" />
                  </svg>
                  Inspect Full Screen
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* ── DESKTOP APPLE/STRIPE STAGE ── */
          <div
            onClick={() => setLightboxOpen(true)}
            className="group relative w-full h-[340px] sm:h-[420px] md:h-[480px] rounded-3xl bg-[#0d0f14] border border-white/10 shadow-2xl overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.01] flex items-center justify-center"
          >
            {/* Subtle stage ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />

            {/* Skeleton Loader */}
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white animate-spin" />
              </div>
            )}

            {/* Unstretched Screenshot Image (object-contain ensures pristine aspect ratio) */}
            <div className="relative w-full h-full p-4 sm:p-6 flex items-center justify-center">
              {!imageError ? (
                <Image
                  src={currentSlide.src}
                  alt={currentSlide.title}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="object-contain p-2 sm:p-4"
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="flex flex-col items-center justify-center p-8 text-center space-y-2 text-white">
                  <div className="font-mono text-sm font-bold text-gray-300">[{currentSlide.title}]</div>
                  <div className="font-mono text-xs text-gray-400">{currentSlide.description}</div>
                </div>
              )}
            </div>

            {/* Top Right Zoom Badge */}
            <div className="absolute top-4 right-4 z-20 opacity-80 group-hover:opacity-100 transition-opacity">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-gray-200 font-mono text-xs border border-white/15">
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="11" y1="8" x2="11" y2="14" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
                <span>Click to Enlarge</span>
              </span>
            </div>

            {/* Animated Progress Bar at bottom of stage */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10 overflow-hidden">
              <div
                key={activeIdx}
                className={`h-full ${accentProgressBg} transition-all duration-300`}
                style={{
                  width: isHovered || prefersReducedMotion ? "100%" : "100%",
                  animation:
                    !isHovered && !prefersReducedMotion
                      ? "progressFill 3.8s linear forwards"
                      : "none",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── SYNCHRONIZED SLIDE TITLE & NARRATIVE DESCRIPTION ── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 min-h-[96px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.title}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="space-y-1.5"
          >
            <h4 className="font-display font-bold text-lg sm:text-xl text-white">
              {currentSlide.title}
            </h4>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {currentSlide.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── CLICKABLE PAGINATION STRIP / THUMBNAILS ── */}
      {slides.length > 1 && (
        <div className="flex items-center justify-center gap-2.5 overflow-x-auto py-1">
          {slides.map((slide, idx) => (
            <button
              key={slide.src + idx}
              onClick={() => goToIndex(idx)}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-semibold transition-all cursor-pointer ${
                idx === activeIdx
                  ? `${accentClasses} shadow-md scale-105`
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-transparent"
              }`}
            >
              <span>{idx + 1}. </span>
              <span className="hidden sm:inline">{slide.title}</span>
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        slides={slides.map((s) => ({
          src: s.src,
          title: s.title,
          caption: s.description || s.caption,
        }))}
        initialIndex={activeIdx}
      />
    </div>
  );
}
