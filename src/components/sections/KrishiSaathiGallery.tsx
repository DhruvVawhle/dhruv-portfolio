"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import LightboxModal from "@/components/ui/LightboxModal";

interface ScreenshotItem {
  src: string;
  title: string;
  caption: string;
}

const screenshots: ScreenshotItem[] = [
  {
    src: "/images/projects/krishisaathi-homepage.png",
    title: "Homepage",
    caption: "Homepage — Direct-to-buyer agricultural trading",
  },
  {
    src: "/images/projects/krishisaathi-login.png",
    title: "Login",
    caption: "Login — Role-based secure authentication",
  },
  {
    src: "/images/projects/krishisaathi-marketplace.png",
    title: "Marketplace",
    caption: "Marketplace — Filtered search powered by Firestore",
  },
  {
    src: "/images/projects/krishisaathi-buyer-dashboard.png",
    title: "Buyer Dashboard",
    caption: "Buyer Dashboard — Comprehensive order oversight",
  },
  {
    src: "/images/projects/krishisaathi-farmer-dashboard.png",
    title: "Farmer Dashboard",
    caption: "Farmer Dashboard — Real-time price and order tracking",
  },
  {
    src: "/images/projects/krishisaathi-order-details.png",
    title: "Order Details",
    caption: "Order Details — Transparent transaction verification",
  },
  {
    src: "/images/projects/krishisaathi-payment-gateway.png",
    title: "Payment Gateway",
    caption: "Payment Gateway — Escrow-protected checkout flow",
  },
  {
    src: "/images/projects/krishisaathi-purchase-details.png",
    title: "Purchase Details",
    caption: "Purchase Details — End-to-end receipt and tracking",
  },
  {
    src: "/images/projects/krishisaathi-mlforecast.png",
    title: "ML Forecast",
    caption: "ML Forecast — ARIMA machine learning price models",
  },
];

export default function KrishiSaathiGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const activeShot = screenshots[activeIndex];

  const nextSlide = useCallback(() => {
    setImageLoaded(false);
    setActiveIndex((prev) => (prev + 1) % screenshots.length);
  }, []);

  const prevSlide = useCallback(() => {
    setImageLoaded(false);
    setActiveIndex((prev) =>
      prev === 0 ? screenshots.length - 1 : prev - 1
    );
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      if (e.key === "ArrowLeft") prevSlide();
      if (e.key === "ArrowRight") nextSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [prevSlide, nextSlide, lightboxOpen]);

  // Autoplay 4-second interval with pause on hover
  useEffect(() => {
    if (isHovered || lightboxOpen) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [isHovered, lightboxOpen, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    setTouchStart(null);
  };

  return (
    <div
      className="mb-10 w-full space-y-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-mono text-accent uppercase tracking-wider font-bold">
          Product Preview
        </h4>
        <span className="text-xs font-mono text-text-secondary font-semibold">
          {activeIndex + 1} / {screenshots.length}
        </span>
      </div>

      {/* Browser Mockup Frame */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="rounded-xl border border-border-custom bg-bg-surface overflow-hidden shadow-lg"
      >
        {/* Browser Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border-custom bg-bg/60">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <div className="px-3 py-1 rounded-md bg-bg text-[11px] font-mono text-text-secondary border border-border-custom truncate max-w-[200px] sm:max-w-xs text-center">
            krishisaathi.app/{activeShot.title.toLowerCase().replace(/\s+/g, "-")}
          </div>
          <div className="w-12" />
        </div>

        {/* Screenshot Viewport */}
        <div
          onClick={() => setLightboxOpen(true)}
          className="relative aspect-[16/9] w-full bg-bg/40 cursor-zoom-in group overflow-hidden flex items-center justify-center"
        >
          {/* Skeleton placeholder before load */}
          {!imageLoaded && !imageErrors[activeShot.src] && (
            <div className="absolute inset-0 flex items-center justify-center bg-bg/60">
              <div className="w-8 h-8 rounded-full border-2 border-accent/30 border-t-accent animate-spin" />
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeShot.src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
              {!imageErrors[activeShot.src] ? (
                <Image
                  src={activeShot.src}
                  alt={activeShot.caption}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.01]"
                  onLoad={() => setImageLoaded(true)}
                  onError={() =>
                    setImageErrors((prev) => ({
                      ...prev,
                      [activeShot.src]: true,
                    }))
                  }
                />
              ) : (
                /* Professional Fallback when image fails */
                <div className="flex flex-col items-center justify-center p-8 text-center space-y-2 bg-bg-surface/80 rounded-xl border border-border-custom m-4">
                  <div className="font-mono text-xs text-accent font-bold">
                    [{activeShot.title}]
                  </div>
                  <div className="font-mono text-xs text-text-secondary">
                    {activeShot.caption}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Hover Zoom Prompt */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
            <span className="px-3 py-1.5 rounded-full bg-black/70 text-white text-xs font-mono border border-white/20">
              Click to enlarge
            </span>
          </div>
        </div>

        {/* Carousel Footer & Controls */}
        <div className="px-4 py-3 border-t border-border-custom flex items-center justify-between bg-bg/30">
          <p className="text-xs text-text-secondary font-mono truncate">
            {activeShot.caption}
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              aria-label="Previous screenshot"
              className="p-1.5 rounded-lg border border-border-custom hover:border-accent text-text-secondary hover:text-accent transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              aria-label="Next screenshot"
              className="p-1.5 rounded-lg border border-border-custom hover:border-accent text-text-secondary hover:text-accent transition-colors"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
        {screenshots.map((item, i) => (
          <button
            key={item.src}
            onClick={() => {
              setImageLoaded(false);
              setActiveIndex(i);
            }}
            aria-label={`Go to ${item.title}`}
            className={`px-3 py-1 rounded-lg font-mono text-xs transition-all flex-shrink-0 ${
              i === activeIndex
                ? "bg-accent text-background font-bold shadow-sm"
                : "bg-bg-surface border border-border-custom text-text-secondary hover:text-text-primary"
            }`}
          >
            {i + 1}. {item.title}
          </button>
        ))}
      </div>

      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        src={activeShot.src}
        alt={activeShot.caption}
        caption={activeShot.caption}
      />
    </div>
  );
}
