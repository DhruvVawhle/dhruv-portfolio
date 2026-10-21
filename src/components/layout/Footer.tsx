"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { FOOTER_NAV_LINKS, FOOTER_SOCIAL_LINKS, EMAIL_ADDRESS } from "@/data/credentialsAndConnect";
import { FileText, Mail } from "lucide-react";
import { FaLinkedinIn, FaGithub } from "react-icons/fa";

/* ──────────────────── Profile icon data ──────────────────── */

const linkedinUrl = FOOTER_SOCIAL_LINKS.find((l) => l.label === "LinkedIn")?.url ?? "#";
const githubUrl = FOOTER_SOCIAL_LINKS.find((l) => l.label === "GitHub")?.url ?? "#";
const resumeUrl = "/resume.pdf";
const emailUrl = `mailto:${EMAIL_ADDRESS}`;

function urlHostPath(url: string) {
  try {
    const u = new URL(url);
    return `${u.host}${u.pathname}`.replace(/\/$/, "");
  } catch {
    return url;
  }
}

interface ProfileIcon {
  label: string;
  url: string;
  icon: React.ReactNode;
  tooltipTitle: string;
  tooltipSub: string;
  external: boolean;
}

const PROFILE_ICONS: ProfileIcon[] = [
  {
    label: "LinkedIn",
    url: linkedinUrl,
    icon: <FaLinkedinIn size={18} />,
    tooltipTitle: "LinkedIn",
    tooltipSub: `${urlHostPath(linkedinUrl)} ↗`,
    external: true,
  },
  {
    label: "GitHub",
    url: githubUrl,
    icon: <FaGithub size={18} />,
    tooltipTitle: "GitHub",
    tooltipSub: `${urlHostPath(githubUrl)} ↗`,
    external: true,
  },
  {
    label: "Resume",
    url: resumeUrl,
    icon: <FileText size={18} />,
    tooltipTitle: "Resume",
    tooltipSub: "Opens PDF in new tab ↗",
    external: true,
  },
  {
    label: "Email",
    url: emailUrl,
    icon: <Mail size={18} />,
    tooltipTitle: "Email",
    tooltipSub: "Send me a message",
    external: false,
  },
];

/* ──────────────────── Tooltip Component ──────────────────── */

function IconTooltip({
  title,
  subtitle,
  visible,
  idx,
  total,
}: {
  title: string;
  subtitle: string;
  visible: boolean;
  idx: number;
  total: number;
}) {
  // On mobile, align tooltips to prevent overflow. First items align left, last items align right.
  const isFirstHalf = idx < total / 2;
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.15 }}
          className={`absolute bottom-full mb-3 z-50 pointer-events-none ${
            isFirstHalf ? "left-0 sm:left-1/2 sm:-translate-x-1/2" : "right-0 sm:left-1/2 sm:-translate-x-1/2"
          }`}
        >
          <div className="rounded-[10px] bg-text-primary text-bg px-3.5 py-2 shadow-lg whitespace-nowrap">
            <p className="text-[12px] font-semibold leading-tight">{title}</p>
            <p className="text-[11px] opacity-70 leading-tight mt-0.5">{subtitle}</p>
          </div>
          {/* Arrow */}
          <div
            className={`absolute top-full w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-text-primary ${
              isFirstHalf
                ? "left-5 sm:left-1/2 sm:-translate-x-1/2"
                : "right-5 sm:left-1/2 sm:-translate-x-1/2"
            }`}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────── ProfileIconButton ──────────────────── */

function ProfileIconButton({
  item,
  idx,
  total,
}: {
  item: ProfileIcon;
  idx: number;
  total: number;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <IconTooltip
        title={item.tooltipTitle}
        subtitle={item.tooltipSub}
        visible={show}
        idx={idx}
        total={total}
      />
      <a
        href={item.url}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noopener noreferrer" : undefined}
        aria-label={item.label}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        className="flex items-center justify-center w-11 h-11 min-w-[44px] min-h-[44px] rounded-full border border-border-custom text-text-secondary
          hover:border-accent hover:text-accent hover:bg-accent-soft hover:-translate-y-0.5
          focus-visible:border-accent focus-visible:text-accent focus-visible:bg-accent-soft focus-visible:-translate-y-0.5
          transition-all duration-200"
      >
        <span className="sr-only">{item.label}</span>
        {item.icon}
      </a>
    </div>
  );
}

/* ──────────────────── Mouse Icon SVG ──────────────────── */

function MouseIcon({ going, reduced }: { going: boolean; reduced: boolean }) {
  return (
    <svg
      width="16"
      height="24"
      viewBox="0 0 16 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
      aria-hidden="true"
    >
      {/* Mouse body */}
      <rect
        x="1"
        y="1"
        width="14"
        height="22"
        rx="7"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Wheel dot */}
      {going && !reduced ? (
        /* Animated scrolling wheel */
        <g>
          <circle cx="8" r="1.5" fill="currentColor">
            <animate
              attributeName="cy"
              values="12;6;4"
              dur="0.55s"
              repeatCount="indefinite"
              calcMode="linear"
            />
            <animate
              attributeName="opacity"
              values="0;1;0"
              dur="0.55s"
              repeatCount="indefinite"
              calcMode="linear"
            />
          </circle>
        </g>
      ) : (
        /* Static wheel dot */
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      )}
    </svg>
  );
}

/* ──────────────────── BackToTop ──────────────────── */

function BackToTop() {
  const [going, setGoing] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReduced = useReducedMotion();

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = useCallback(() => {
    if (going) return;
    setGoing(true);

    const finish = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
      setGoing(false);
    };

    // Reduced motion: instant scroll
    if (prefersReduced) {
      window.scrollTo({ top: 0 });
      finish();
      return;
    }

    // Try Lenis first
    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.8,
        onComplete: () => finish(),
      });
      // Fallback timeout
      timeoutRef.current = setTimeout(finish, 2600);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      timeoutRef.current = setTimeout(finish, 2000);
    }
  }, [going, prefersReduced]);

  return (
    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-10">
      <motion.button
        type="button"
        aria-label="Back to top"
        onClick={handleClick}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 20, duration: 0.3 }}
        className={`
          flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[13px]
          bg-bg
          transition-colors duration-200
          focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none
          ${
            going
              ? "border-accent text-accent"
              : "border-border-custom text-text-secondary hover:border-accent hover:text-accent"
          }
        `}
      >
        <MouseIcon going={going} reduced={!!prefersReduced} />
        <span>Back to top</span>
      </motion.button>
    </div>
  );
}

/* ──────────────────── Footer ──────────────────── */

export default function Footer() {
  return (
    <footer
      className="bg-bg-surface"
      aria-label="Site Footer"
    >
      {/* Container with top border and the back-to-top pill sitting on it */}
      <div className="max-w-[1240px] mx-auto px-6 relative border-t border-border-custom">
        {/* Back to top pill on the border */}
        <BackToTop />

        {/* Main 3-column row */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-8 pt-20 pb-14">
          {/* Left: Identity */}
          <div className="text-left">
            <p className="font-display font-bold text-[30px] leading-tight text-text-primary tracking-tight">
              Dhruv Vawhle.
            </p>
            <p className="mt-1.5 text-sm text-text-secondary font-mono">
              Software Engineer
            </p>
            <p className="mt-1 text-xs text-text-secondary max-w-[30ch]">
              Mumbai, Maharashtra, India.
            </p>
          </div>

          {/* Center: Navigation */}
          <nav
            aria-label="Footer Section Navigation"
            className="flex flex-wrap lg:justify-center gap-x-7 gap-y-3 text-[14px] font-mono font-medium text-text-secondary"
          >
            {FOOTER_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Profile Icons */}
          <div className="flex gap-2.5 lg:justify-self-end">
            {PROFILE_ICONS.map((item, i) => (
              <ProfileIconButton
                key={item.label}
                item={item}
                idx={i}
                total={PROFILE_ICONS.length}
              />
            ))}
          </div>
        </div>

        {/* Bottom Bar (unchanged) */}
        <div className="border-t border-border-custom/60 pt-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-secondary text-center sm:text-left">
          <p>© 2026 Dhruv Vawhle. All rights reserved.</p>
          <p>Crafted with Next.js, Tailwind CSS &amp; Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
