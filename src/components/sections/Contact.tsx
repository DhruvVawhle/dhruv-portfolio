import React from "react";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/effects/ScrollReveal";

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);


const LocationIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

export default function Contact() {
  return (
    <section id="contact" className="py-[var(--section-padding-y)] bg-bg" aria-label="Contact Section">
      <div className="content-width">
        {/* Apple Spatial Section Header */}
        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-border-custom/60">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-semibold text-accent tracking-widest uppercase">
                08 · CONNECT
              </span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-accent/60" />
              <span className="font-mono text-xs text-text-secondary">
                Engineering Collaboration
              </span>
            </div>
            <span className="font-mono text-xs text-text-secondary">
              Open to Software Engineering Roles (2027)
            </span>
          </div>

          <div className="p-8 sm:p-12 lg:p-16 rounded-3xl bg-bg-surface border border-border-custom shadow-xl">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono font-medium min-h-[28px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for 2027 Engineering Roles</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-foreground/5 border border-border-custom text-text-secondary text-xs font-mono min-h-[28px]">
                  <LocationIcon />
                  <span>Mumbai, India</span>
                </div>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-text-primary tracking-tight leading-tight">
                Let&apos;s build reliable software together.
              </h2>
              <p className="mt-4 text-base sm:text-lg text-text-secondary leading-relaxed max-w-2xl">
                Whether you are hiring for your engineering team or looking to discuss full-stack architecture and applied AI systems, I am available for 2027 engineering opportunities.
              </p>

              {/* Authoritative Primary + Secondary Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
                <Button
                  variant="primary"
                  size="lg"
                  href="mailto:dhruvawhle@gmail.com"
                  className="shadow-md hover:shadow-lg transition-all duration-200 justify-center"
                >
                  <MailIcon />
                  <span>Start a Conversation</span>
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  href="/documents/Dhruv_Vawhle_Resume.pdf"
                  external
                  aria-label="Open Dhruv Vawhle Resume"
                  className="justify-center hover:border-accent transition-all duration-200"
                >
                  <span>📄 View Resume</span>
                </Button>
              </div>

              {/* Non-Duplicated Social Connect Dock */}
              <div className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-border-custom/60">
                <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">
                  Verified Profiles:
                </span>
                <a
                  href="https://github.com/DhruvVawhle"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
                  aria-label="GitHub Profile (opens in new tab)"
                >
                  <span className="text-accent">
                    <GithubIcon />
                  </span>
                  <span>GitHub</span>
                  <ExternalLinkIcon />
                </a>
                <a
                  href="https://linkedin.com/in/dhruv-vawhle-277b2b2b8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
                  aria-label="LinkedIn Profile (opens in new tab)"
                >
                  <span className="text-accent">
                    <LinkedinIcon />
                  </span>
                  <span>LinkedIn</span>
                  <ExternalLinkIcon />
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
