"use client";

import { useEffect } from "react";

export const TRIGGER_LOADER_EVENT = "dv-trigger-portfolio-loader";

let activeTimers: ReturnType<typeof setTimeout>[] = [];

function clearLoaderTimers() {
  activeTimers.forEach((t) => clearTimeout(t));
  activeTimers = [];
}

function dismissCurtainNow(immediate = false) {
  clearLoaderTimers();
  const curtain = document.getElementById("dv-static-curtain");
  document.documentElement.classList.remove("dv-loading-active");

  if (typeof window !== "undefined" && window.__lenis) {
    window.__lenis.start();
  }

  try {
    sessionStorage.setItem("dv_portfolio_visited", "true");
    sessionStorage.removeItem("dv_is_reload");
  } catch {}

  if (!curtain) return;

  if (immediate) {
    curtain.style.display = "none";
    curtain.style.opacity = "";
    curtain.style.transform = "";
    curtain.style.transition = "";
    return;
  }

  curtain.style.transition = "opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1), transform 0.32s cubic-bezier(0.16, 1, 0.3, 1)";
  curtain.style.opacity = "0";
  curtain.style.transform = "translate3d(0, -14px, 0)";
  const hideTimer = setTimeout(() => {
    curtain.style.display = "none";
  }, 330);
  activeTimers.push(hideTimer);
}

function scheduleLoaderSequence() {
  clearLoaderTimers();
  const txt = document.getElementById("dv-preload-txt");
  const curtain = document.getElementById("dv-static-curtain");

  if (typeof window !== "undefined" && window.__lenis) {
    window.__lenis.stop();
  }

  if (txt) txt.textContent = "Loading portfolio...";

  const t1 = setTimeout(() => {
    if (txt) txt.textContent = "Assembling components...";
  }, 600);
  const t2 = setTimeout(() => {
    if (txt) txt.textContent = "Preparing showcase...";
  }, 1100);
  const t3 = setTimeout(() => {
    if (txt) txt.textContent = "Ready";
  }, 1450);

  const tDismiss = setTimeout(() => {
    document.documentElement.classList.remove("dv-loading-active");
    if (curtain) {
      curtain.style.display = "none";
    }
    if (typeof window !== "undefined" && window.__lenis) {
      window.__lenis.start();
    }
    try {
      sessionStorage.setItem("dv_portfolio_visited", "true");
      sessionStorage.removeItem("dv_is_reload");
    } catch {}
  }, 1850);

  activeTimers.push(t1, t2, t3, tDismiss);
}

/**
 * Programmatically triggers the 3D portfolio loading screen on demand
 * (e.g. when directly clicking the DV header logo mark).
 */
export function triggerPortfolioLoader() {
  if (typeof window === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const curtain = document.getElementById("dv-static-curtain");
  const bar = document.getElementById("dv-preload-bar");
  if (!curtain) return;

  clearLoaderTimers();
  document.documentElement.classList.add("dv-loading-active");
  curtain.style.display = "flex";
  curtain.style.animation = "none";
  curtain.style.transition = "";
  curtain.style.opacity = "";
  curtain.style.transform = "";
  if (bar) {
    bar.style.animation = "none";
  }

  // Force reflow to restart CSS animations cleanly
  void curtain.offsetHeight;

  curtain.style.animation = "";
  if (bar) {
    bar.style.animation = "";
  }

  scheduleLoaderSequence();
}

export default function PortfolioLoadingScreen() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      dismissCurtainNow(true);
      return;
    }

    const isActive = document.documentElement.classList.contains("dv-loading-active");
    if (isActive) {
      window.scrollTo(0, 0);
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
      scheduleLoaderSequence();
    } else {
      dismissCurtainNow(true);
    }

    const curtain = document.getElementById("dv-static-curtain");
    const handleClick = () => dismissCurtainNow(false);

    if (curtain) {
      curtain.addEventListener("click", handleClick);
    }

    const markReload = () => {
      try {
        sessionStorage.setItem("dv_is_reload", "true");
      } catch {}
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && document.documentElement.classList.contains("dv-loading-active")) {
        dismissCurtainNow(false);
        return;
      }
      if ((e.key.toLowerCase() === "r" && (e.ctrlKey || e.metaKey)) || e.key === "F5") {
        markReload();
      }
    };

    window.addEventListener("beforeunload", markReload);
    window.addEventListener("pagehide", markReload);
    window.addEventListener("keydown", handleKeyDown, { capture: true });

    return () => {
      clearLoaderTimers();
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
