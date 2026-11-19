"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { FOOTER_NAV_LINKS, FOOTER_SOCIAL_LINKS, EMAIL_ADDRESS } from "@/data/credentialsAndConnect";
import { FileText, Mail } from "lucide-react";
import ScrollReveal from "@/components/effects/ScrollReveal";
import { PlayableWordmark } from "@/components/ui/shutter-glyph-footer";

/* ──────────────────── Social SVG Icons ──────────────────── */

const LinkedinIcon = ({ size = 17 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 448 512" fill="currentColor">
    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
  </svg>
);

const GithubIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 496 512" fill="currentColor">
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
  </svg>
);

/* ──────────────────── Profile Icon Data ──────────────────── */

const linkedinUrl = FOOTER_SOCIAL_LINKS.find((l) => l.label === "LinkedIn")?.url ?? "#";
const githubUrl = FOOTER_SOCIAL_LINKS.find((l) => l.label === "GitHub")?.url ?? "#";
const resumeUrl = "/Dhruv_Resume.pdf";
const emailUrl = `mailto:${EMAIL_ADDRESS}`;

interface ProfileIcon {
  label: string;
  url: string;
  icon: React.ReactNode;
  tooltipText: string;
  tooltipTag?: string;
  external: boolean;
}

const PROFILE_ICONS: ProfileIcon[] = [
  {
    label: "LinkedIn",
    url: linkedinUrl,
    icon: <LinkedinIcon size={17} />,
    tooltipText: "LinkedIn",
    tooltipTag: "↗",
    external: true,
  },
  {
    label: "GitHub",
    url: githubUrl,
    icon: <GithubIcon size={18} />,
    tooltipText: "GitHub",
    tooltipTag: "↗",
    external: true,
  },
  {
    label: "Resume",
    url: resumeUrl,
    icon: <FileText size={17} strokeWidth={2} />,
    tooltipText: "Resume",
    tooltipTag: "PDF ↗",
    external: true,
  },
  {
    label: "Email",
    url: emailUrl,
    icon: <Mail size={17} strokeWidth={2} />,
    tooltipText: EMAIL_ADDRESS,
    external: false,
  },
];

/* ──────────────────── Refined Anti-Slop Tooltip ──────────────────── */

function IconTooltip({
  text,
  tag,
  visible,
  isLast,
}: {
  text: string;
  tag?: string;
  visible: boolean;
  isLast?: boolean;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 3, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 2, scale: 0.98 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
          className={`absolute bottom-full mb-2 z-50 pointer-events-none ${
            isLast
              ? "right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2"
              : "left-1/2 -translate-x-1/2"
          }`}
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 text-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 shadow-md border border-white/10 dark:border-black/10 whitespace-nowrap text-[11px] font-mono leading-none tracking-tight select-none">
            <span className="font-medium">{text}</span>
            {tag && (
              <span className="opacity-50 font-normal">{tag}</span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────── ProfileIconButton ──────────────────── */

function ProfileIconButton({
  item,
  isLast,
}: {
  item: ProfileIcon;
  isLast: boolean;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative flex items-center justify-center">
      <IconTooltip
        text={item.tooltipText}
        tag={item.tooltipTag}
        visible={show}
        isLast={isLast}
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
        className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] rounded-full border border-border-custom text-text-secondary
          hover:border-accent hover:text-accent hover:bg-accent/5 hover:-translate-y-0.5
          focus-visible:border-accent focus-visible:text-accent focus-visible:bg-accent/5 focus-visible:-translate-y-0.5
          transition-all duration-150"
      >
        <span className="sr-only">{item.label}</span>
        {item.icon}
      </a>
    </div>
  );
}

/* ──────────────────── Mouse Icon SVG ──────────────────── */

const MOUSE_WHEEL_STYLES = `
@keyframes mouseWheelFlick {
  0% {
    transform: translateY(4.5px);
    opacity: 0;
  }
  6% {
    transform: translateY(3px);
    opacity: 1;
  }
  22% {
    transform: translateY(-2.2px);
    opacity: 1;
  }
  28% {
    transform: translateY(-4.2px);
    opacity: 0;
  }
  29% {
    transform: translateY(4.5px);
    opacity: 0;
  }
  100% {
    transform: translateY(4.5px);
    opacity: 0;
  }
}

@keyframes mouseWheelFlickTrail {
  0%, 4% {
    transform: translateY(4.5px);
    opacity: 0;
  }
  11% {
    transform: translateY(3px);
    opacity: 0.65;
  }
  26% {
    transform: translateY(-2.2px);
    opacity: 0.65;
  }
  32% {
    transform: translateY(-4.2px);
    opacity: 0;
  }
  33% {
    transform: translateY(4.5px);
    opacity: 0;
  }
  100% {
    transform: translateY(4.5px);
    opacity: 0;
  }
}

@keyframes mouseWheelGoing {
  0% {
    transform: translateY(4.5px);
    opacity: 0;
  }
  15% {
    transform: translateY(2.5px);
    opacity: 1;
  }
  80% {
    transform: translateY(-2.5px);
    opacity: 1;
  }
  100% {
    transform: translateY(-4.8px);
    opacity: 0;
  }
}

.mouse-anim-flick {
  animation: mouseWheelFlick 2.4s cubic-bezier(0.25, 1, 0.5, 1) infinite;
  transform-box: view-box;
  transform-origin: 8px 8px;
}

.mouse-anim-flick-trail {
  animation: mouseWheelFlickTrail 2.4s cubic-bezier(0.25, 1, 0.5, 1) infinite;
  transform-box: view-box;
  transform-origin: 8px 8px;
}

.mouse-anim-going {
  animation: mouseWheelGoing 0.32s linear infinite;
  transform-box: view-box;
  transform-origin: 8px 8px;
}

.mouse-anim-going-trail {
  animation: mouseWheelGoing 0.32s linear infinite;
  animation-delay: -0.16s;
  transform-box: view-box;
  transform-origin: 8px 8px;
}
`;

function MouseIcon({
  going,
  hovered,
  hoverCount,
  reduced,
}: {
  going: boolean;
  hovered: boolean;
  hoverCount: number;
  reduced: boolean;
}) {
  return (
    <svg
      width="16"
      height="24"
      viewBox="0 0 16 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
      aria-hidden="true"
    >
      <style>{MOUSE_WHEEL_STYLES}</style>

      {/* Outer Mouse Shell */}
      <rect
        x="1"
        y="1"
        width="14"
        height="22"
        rx="7"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        className="transition-colors duration-200"
      />

      {/* Subtle Wheel Slot Track */}
      <line
        x1="8"
        y1="5"
        x2="8"
        y2="13"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        className="opacity-20 group-hover:opacity-40 transition-opacity duration-200"
      />

      {reduced ? (
        <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      ) : going ? (
        /* Click / Going State: continuous rapid ascent stream */
        <g key="going">
          <circle cx="8" cy="8" r="1.5" fill="currentColor" className="mouse-anim-going" />
          <circle cx="8" cy="8" r="1.2" fill="currentColor" className="mouse-anim-going-trail" opacity="0.75" />
        </g>
      ) : hovered ? (
        /* Hover State: immediate single up-scroll flick on mouse entry, then 1.7s calm pause, then repeat */
        <g key={`hovered-${hoverCount}`}>
          {/* Faint resting center notch during the pause so mouse never feels empty */}
          <circle cx="8" cy="8" r="1.5" fill="currentColor" opacity="0.32" />

          {/* Active single upward scroll bead starting immediately at frame 0 */}
          <circle cx="8" cy="8" r="1.5" fill="currentColor" className="mouse-anim-flick" />

          {/* Cascading second wheel notch */}
          <circle cx="8" cy="8" r="1.2" fill="currentColor" className="mouse-anim-flick-trail" />
        </g>
      ) : (
        /* Resting State */
        <circle
          cx="8"
          cy="8"
          r="1.5"
          fill="currentColor"
          className="transition-opacity duration-200 opacity-80"
        />
      )}
    </svg>
  );
}

/* ──────────────────── BackToTop ──────────────────── */

function BackToTop() {
  const [going, setGoing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverCount, setHoverCount] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReduced = useReducedMotion();

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

    if (prefersReduced) {
      window.scrollTo({ top: 0 });
      finish();
      return;
    }

    const lenis = typeof window !== "undefined" ? window.__lenis : null;
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 1.8,
        onComplete: () => finish(),
      });
      timeoutRef.current = setTimeout(finish, 2600);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
      timeoutRef.current = setTimeout(finish, 2000);
    }
  }, [going, prefersReduced]);

  return (
    <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 z-20">
      <motion.button
        type="button"
        aria-label="Back to top"
        onClick={handleClick}
        onMouseEnter={() => {
          setHoverCount((c) => c + 1);
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => {
          setHoverCount((c) => c + 1);
          setIsHovered(true);
        }}
        onBlur={() => setIsHovered(false)}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className={`
          group flex items-center gap-2 rounded-full border min-h-[44px] px-4 sm:px-5 py-2.5 font-mono text-[12px] sm:text-[13px]
          bg-bg-surface shadow-sm select-none
          transition-colors duration-200
          focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none
          ${
            going
              ? "border-accent text-accent shadow-md shadow-accent/10"
              : "border-border-custom text-text-secondary hover:border-accent hover:text-accent hover:shadow-md hover:shadow-accent/5"
          }
        `}
      >
        <MouseIcon
          going={going}
          hovered={isHovered}
          hoverCount={hoverCount}
          reduced={!!prefersReduced}
        />
        <span className="tracking-tight transition-colors duration-200">Back to top</span>
      </motion.button>
    </div>
  );
}

/* ──────────────────── Responsive Unified Footer ──────────────────── */

export default function Footer() {
  return (
    <footer
      className="bg-bg-surface relative border-t border-border-custom w-full"
      aria-label="Site Footer"
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative">
        {/* Back to top pill sitting on the top border */}
        <BackToTop />

        {/* Main 3-column row from the original footer */}
        <ScrollReveal direction="up" delay={0.05}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-start md:items-center gap-7 sm:gap-8 pt-16 sm:pt-20 pb-8 sm:pb-12">
            {/* Left: Identity */}
            <div className="text-left">
              <p className="font-display font-bold text-[26px] sm:text-[30px] leading-tight text-text-primary tracking-tight">
                Dhruv Vawhle.
              </p>
              <p className="mt-1.5 text-xs sm:text-sm text-text-secondary font-mono">
                Software Engineer
              </p>
              <p className="mt-1 text-xs text-text-secondary max-w-[30ch]">
                Mumbai, Maharashtra, India.
              </p>
            </div>

            {/* Center: Navigation */}
            <nav
              aria-label="Footer Section Navigation"
              className="flex flex-wrap items-center lg:justify-center gap-x-5 sm:gap-x-7 gap-y-2 sm:gap-y-3 text-[13px] sm:text-[14px] font-mono font-medium text-text-secondary"
            >
              {FOOTER_NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right: Profile Icons */}
            <div className="flex flex-wrap gap-2.5 lg:justify-self-end">
              {PROFILE_ICONS.map((item, i) => (
                <ProfileIconButton
                  key={item.label}
                  item={item}
                  isLast={i === PROFILE_ICONS.length - 1}
                />
              ))}
            </div>
          </div>

          {/* ── Playable Wordmark Name (Fully Mobile Responsive) ── */}
          <div className="pt-2 sm:pt-4 pb-6 sm:pb-8 border-t border-border-custom/50 w-full overflow-hidden">
            <PlayableWordmark
              word="DHRUV"
              shutterAt={2}
              className="w-full text-text-primary/90 hover:text-text-primary transition-colors"
            />
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border-custom/60 pt-6 sm:pt-8 pb-[max(2rem,calc(env(safe-area-inset-bottom,0px)+1.5rem))] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-text-secondary text-center sm:text-left">
            <p>© 2026 Dhruv Vawhle. All rights reserved.</p>
            <p>Crafted with Next.js, Tailwind CSS &amp; Framer Motion.</p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
