"use client";

import React, { useState, useEffect } from "react";

export default function StickyPillNav() {
  const [activeSection, setActiveSection] = useState<"experience" | "hackathons">("experience");

  useEffect(() => {
    const handleScroll = () => {
      const expEl = document.getElementById("experience");
      const compEl = document.getElementById("hackathons");

      if (!expEl || !compEl) return;

      const expRect = expEl.getBoundingClientRect();
      const compRect = compEl.getBoundingClientRect();

      // If Competitions top has entered upper half of viewport, highlight Competitions
      if (compRect.top <= window.innerHeight * 0.4) {
        setActiveSection("hackathons");
      } else {
        setActiveSection("experience");
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const yOffset = -90;
    const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="sticky top-20 z-40 flex items-center justify-center py-4 pointer-events-none">
      <div className="pointer-events-auto inline-flex items-center gap-1.5 p-1.5 rounded-full bg-bg-surface/90 backdrop-blur-md border border-border-custom shadow-lg">
        <button
          onClick={() => scrollTo("experience")}
          className={`px-5 py-2 rounded-full font-mono text-xs font-semibold transition-all duration-300 cursor-pointer ${
            activeSection === "experience"
              ? "bg-accent text-white shadow-sm"
              : "text-text-secondary hover:text-text-primary hover:bg-foreground/5"
          }`}
        >
          Experience
        </button>
        <button
          onClick={() => scrollTo("hackathons")}
          className={`px-5 py-2 rounded-full font-mono text-xs font-semibold transition-all duration-300 cursor-pointer ${
            activeSection === "hackathons"
              ? "bg-accent text-white shadow-sm"
              : "text-text-secondary hover:text-text-primary hover:bg-foreground/5"
          }`}
        >
          Competitions
        </button>
      </div>
    </div>
  );
}
