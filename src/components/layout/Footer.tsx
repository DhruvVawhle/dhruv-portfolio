"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { FOOTER_NAV_LINKS, FOOTER_SOCIAL_LINKS, EMAIL_ADDRESS } from "@/data/credentialsAndConnect";
import { FileText, Mail } from "lucide-react";
import ScrollReveal from "@/components/effects/ScrollReveal";


const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 448 512" fill="currentColor">
    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
  </svg>
);

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 496 512" fill="currentColor">
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
  </svg>
);

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
    icon: <LinkedinIcon size={18} />,
    tooltipTitle: "LinkedIn",
    tooltipSub: `${urlHostPath(linkedinUrl)} ↗`,
    external: true,
  },
  {
    label: "GitHub",
    url: githubUrl,
    icon: <GithubIcon size={18} />,
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
        rel={
          item.external
            ? item.label === "GitHub" || item.label === "LinkedIn"
              ? "noopener noreferrer me"
              : "noopener noreferrer"
            : undefined
        }
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
          flex items-center gap-2 rounded-full border min-h-[44px] px-4.5 py-2.5 font-mono text-[13px]
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
        <ScrollReveal direction="up" delay={0.05}>
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

          {/* Bottom Bar */}
          <div className="border-t border-border-custom/60 pt-8 pb-[max(2rem,calc(env(safe-area-inset-bottom,0px)+1rem))] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-secondary text-center sm:text-left">
            <p>© 2026 Dhruv Vawhle. All rights reserved.</p>
            <p>Crafted with Next.js, Tailwind CSS &amp; Framer Motion.</p>
          </div>
        </ScrollReveal>
      </div>
    </footer>

  );
}
