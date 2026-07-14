import React from "react";
import { socialLinks } from "@/lib/data";

const navLinks = [
  { label: "Top", href: "#top" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Credentials", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-border-custom bg-bg-surface py-12 sm:py-16"
      aria-label="Site Footer"
    >
      <div className="content-width">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-border-custom/60">
          {/* Identity & Subtitle */}
          <div className="text-center lg:text-left">
            <a
              href="#top"
              className="font-display font-black text-xl sm:text-2xl text-text-primary tracking-tight hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            >
              Dhruv Vawhle<span className="text-accent">.</span>
            </a>
            <p className="mt-1.5 text-xs sm:text-sm text-text-secondary font-mono">
              Full-Stack Software Engineer · Applied AI Systems
            </p>
            <p className="mt-0.5 text-xs text-text-secondary/80">
              Mumbai, India · Available for 2027 Engineering Roles
            </p>
          </div>

          {/* Quick Section Navigation & Social Connect */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
            <nav
              aria-label="Footer Section Links"
              className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-mono font-medium text-text-secondary"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-text-primary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="hidden sm:block w-px h-6 bg-border-custom" aria-hidden="true" />

            <nav
              aria-label="Footer Social Links"
              className="flex items-center gap-4 text-xs font-mono font-medium"
            >
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.url.startsWith("http") || link.url.endsWith(".pdf") ? "_blank" : undefined}
                  rel={
                    link.url.startsWith("http") || link.url.endsWith(".pdf")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  aria-label={link.label === "Resume" ? "Open Dhruv Vawhle Resume" : link.label}
                  className="text-text-secondary hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-text-secondary/80 text-center sm:text-left">
          <p>&copy; {currentYear} Dhruv Vawhle. All rights reserved.</p>
          <p>Crafted with Next.js, Tailwind CSS &amp; Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
