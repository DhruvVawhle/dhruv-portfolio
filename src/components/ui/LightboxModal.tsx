"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export interface LightboxSlide {
  src: string;
  title?: string;
  caption?: string;
}

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides?: LightboxSlide[];
  initialIndex?: number;
  src?: string;
  alt?: string;
  caption?: string;
}

export default function LightboxModal({
  isOpen,
  onClose,
  slides = [],
  initialIndex = 0,
  src,
  alt = "Preview",
  caption,
}: LightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLoading, setIsLoading] = useState(true);

  // Normalize single slide vs slides array
  const activeSlides: LightboxSlide[] =
    slides.length > 0
      ? slides
      : src
      ? [{ src, title: alt, caption }]
      : [];

  useEffect(() => {
    if (isOpen) {
      const id = requestAnimationFrame(() => {
        setCurrentIndex(initialIndex);
        setIsLoading(true);
      });
      return () => cancelAnimationFrame(id);
    }
  }, [isOpen, initialIndex]);

  const handlePrev = useCallback(() => {
    if (activeSlides.length <= 1) return;
    setIsLoading(true);
    setCurrentIndex((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  }, [activeSlides.length]);

  const handleNext = useCallback(() => {
    if (activeSlides.length <= 1) return;
    setIsLoading(true);
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  }, [activeSlides.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
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
  }, [isOpen, onClose, handlePrev, handleNext]);

  const currentSlide = activeSlides[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && currentSlide && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8 cursor-zoom-out"
          role="dialog"
          aria-modal="true"
          aria-label="Fullscreen High-Resolution Image Lightbox"
        >
          {/* Top Bar */}
          <div
            className="absolute top-4 inset-x-4 md:inset-x-8 flex items-center justify-between z-10 pointer-events-none"
          >
            <div className="flex items-center gap-3 pointer-events-auto">
              {activeSlides.length > 1 && (
                <span className="px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white font-mono text-xs font-semibold border border-white/20">
                  {currentIndex + 1} / {activeSlides.length}
                </span>
              )}
              {currentSlide.title && (
                <span className="font-display font-bold text-sm sm:text-base text-white">
                  {currentSlide.title}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2.5 pointer-events-auto">
              <a
                href={currentSlide.src}
                target="_blank"
                rel="noopener noreferrer"
                download
                onClick={(e) => e.stopPropagation()}
                title="Download / Open Full Resolution"
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 font-mono text-xs font-medium sm:px-3.5"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span className="hidden sm:inline">Download</span>
              </a>
              <button
                onClick={onClose}
                aria-label="Close lightbox"
                className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Buttons */}
          {activeSlides.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous image"
                className="absolute left-4 md:left-8 z-10 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer transform hover:scale-105"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next image"
                className="absolute right-4 md:right-8 z-10 p-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-all cursor-pointer transform hover:scale-105"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          )}

          {/* Main Stage Image */}
          <motion.div
            key={currentSlide.src}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-6xl h-[70vh] sm:h-[78vh] flex items-center justify-center cursor-default"
          >
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              </div>
            )}
            <Image
              src={currentSlide.src}
              alt={currentSlide.title || alt}
              fill
              sizes="100vw"
              className="object-contain"
              onLoad={() => setIsLoading(false)}
            />
          </motion.div>

          {/* Caption Bottom Bar */}
          {currentSlide.caption && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="mt-4 max-w-3xl px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-center text-sm sm:text-base text-gray-200 font-mono"
            >
              {currentSlide.caption}
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
