"use client";

import { useEffect } from "react";

export const TRIGGER_LOADER_EVENT = "dv-trigger-portfolio-loader";

/**
 * Programmatically triggers the 3D portfolio loading screen on demand
 * (e.g. when directly clicking the DV. or # header logo mark).
 */
export function triggerPortfolioLoader() {
  if (typeof window === "undefined") return;

  const curtain = document.getElementById("dv-static-curtain");
  const bar = document.getElementById("dv-preload-bar");

  if (!curtain) return;

  document.documentElement.classList.add("dv-loading-active");
  curtain.style.display = "flex";
  curtain.style.animation = "none";
  if (bar) {
    bar.style.animation = "none";
  }

  // Force reflow to re-trigger CSS animations cleanly
  void curtain.offsetHeight;

  curtain.style.animation = "";
  if (bar) {
    bar.style.animation = "";
  }

  setTimeout(() => {
    document.documentElement.classList.remove("dv-loading-active");
    if (curtain) {
      curtain.style.display = "none";
    }
  }, 3300);
}

export default function PortfolioLoadingScreen() {
  useEffect(() => {
    // 1. Text sequence synchronized with full box formation, drop down, and opening
    const txt = document.getElementById("dv-preload-txt");
    const t1 = setTimeout(() => {
      if (txt) txt.textContent = "COMPONENTS ASSEMBLED";
    }, 1500);
    const t2 = setTimeout(() => {
      if (txt) txt.textContent = "SYNCHRONIZING SCENE...";
    }, 2100);
    const t3 = setTimeout(() => {
      if (txt) txt.textContent = "SYSTEM READY";
    }, 2650);

    // 2. Dismiss static curtain and cleanup session after initial loading sequence
    const tDismiss = setTimeout(() => {
      if (typeof document !== "undefined") {
        document.documentElement.classList.remove("dv-loading-active");
        const curtain = document.getElementById("dv-static-curtain");
        if (curtain) {
          curtain.style.display = "none";
        }
      }
      try {
        sessionStorage.setItem("dv_portfolio_visited", "true");
        sessionStorage.removeItem("dv_is_reload");
      } catch {}
    }, 3300);

    // 3. Click-to-dismiss early with smooth transition
    const curtain = document.getElementById("dv-static-curtain");
    const handleClick = () => {
      document.documentElement.classList.remove("dv-loading-active");
      if (curtain) {
        curtain.style.transition = "opacity 0.35s ease, transform 0.35s ease";
        curtain.style.opacity = "0";
        curtain.style.transform = "translateY(-14px)";
        setTimeout(() => {
          curtain.style.display = "none";
        }, 350);
      }
      try {
        sessionStorage.setItem("dv_portfolio_visited", "true");
        sessionStorage.removeItem("dv_is_reload");
      } catch {}
    };

    if (curtain) {
      curtain.addEventListener("click", handleClick);
    }

    // 4. Persistent reload triggers for browser reload button and Ctrl+R / F5
    const markReload = () => {
      try {
        sessionStorage.setItem("dv_is_reload", "true");
        document.documentElement.classList.add("dv-loading-active");
      } catch {}
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key.toLowerCase() === "r" && (e.ctrlKey || e.metaKey)) ||
        e.key === "F5"
      ) {
        markReload();
      }
    };

    window.addEventListener("beforeunload", markReload);
    window.addEventListener("pagehide", markReload);
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tDismiss);
      if (curtain) {
        curtain.removeEventListener("click", handleClick);
      }
      window.removeEventListener("beforeunload", markReload);
      window.removeEventListener("pagehide", markReload);
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
    };
  }, []);

  return null;
}
