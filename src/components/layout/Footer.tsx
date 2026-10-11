import React from "react";
import { FOOTER_NAV_LINKS, FOOTER_SOCIAL_LINKS } from "@/data/credentialsAndConnect";

export default function Footer() {
  return (
    <footer
      className="border-t border-border-custom bg-bg-surface py-12 sm:py-16"
      aria-label="Site Footer"
    >
      <div className="content-width">
        {/* Top Row: Left, Middle, Right */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 pb-10 border-b border-border-custom/60">
          {/* Left: Identity and Subtitle */}
          <div className="text-left">
            <a
              href="#top"
              className="font-display font-black text-xl sm:text-2xl text-text-primary tracking-tight hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded inline-block"
            >
              Dhruv Vawhle.
            </a>
            <p className="mt-1 text-xs sm:text-sm text-text-secondary font-mono">
              Software Engineer
            </p>
            <p className="mt-0.5 text-xs text-text-secondary">
              Mumbai, Maharashtra, India. Available for 2027 Engineering Roles.
            </p>
          </div>

          {/* Middle Links: Navigation */}
          <nav
            aria-label="Footer Section Navigation"
            className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono font-medium text-text-secondary"
          >
            {FOOTER_NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Links: Social & Professional */}
          <nav
            aria-label="Footer Professional Links"
            className="flex flex-wrap items-center gap-4 text-xs font-mono font-medium"
          >
            {FOOTER_SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith("http") || link.url.endsWith(".pdf") ? "_blank" : undefined}
                rel={
                  link.url.startsWith("http") || link.url.endsWith(".pdf")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-text-secondary hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-secondary text-center sm:text-left">
          <p>© 2026 Dhruv Vawhle. All rights reserved.</p>
          <p>Crafted with Next.js, Tailwind CSS &amp; Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}

