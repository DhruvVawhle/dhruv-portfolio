"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/sections/About"), {
  ssr: false,
  loading: () => <section id="about" aria-label="About" className="min-h-[760px]" />,
});
const Projects = dynamic(() => import("@/components/sections/Projects"), {
  ssr: false,
  loading: () => <section id="projects" aria-label="Projects" className="min-h-[760px]" />,
});
const Experience = dynamic(() => import("@/components/sections/Experience"), {
  ssr: false,
  loading: () => <section id="experience" aria-label="Experience" className="min-h-[760px]" />,
});
const Hackathons = dynamic(() => import("@/components/sections/Hackathons"), {
  ssr: false,
  loading: () => <section id="hackathons" aria-label="Hackathons" className="min-h-[760px]" />,
});
const Skills = dynamic(() => import("@/components/sections/Skills"), {
  ssr: false,
  loading: () => <section id="skills" aria-label="Skills" className="min-h-[760px]" />,
});
const Certifications = dynamic(() => import("@/components/sections/Certifications"), {
  ssr: false,
  loading: () => <section id="certifications" aria-label="Certifications" className="min-h-[760px]" />,
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  ssr: false,
  loading: () => <section id="contact" aria-label="Contact" className="min-h-[760px]" />,
});

export default function BelowFoldSections() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const isSearchBot = /Googlebot|bingbot|Applebot|DuckDuckBot|YandexBot|Baiduspider/i.test(
      navigator.userAgent
    );
    if (isSearchBot || window.scrollY > 0 || window.location.hash) {
      setMounted(true);
      return;
    }

    const activate = () => setMounted(true);
    const events: Array<keyof WindowEventMap> = [
      "scroll",
      "pointerdown",
      "pointermove",
      "keydown",
      "touchstart",
      "hashchange",
    ];
    events.forEach((ev) => window.addEventListener(ev, activate, { once: true, passive: true }));

    // Fallback: mount automatically after initial load/TBT window settles
    const timer = setTimeout(activate, 5500);

    return () => {
      clearTimeout(timer);
      events.forEach((ev) => window.removeEventListener(ev, activate));
    };
  }, []);

  if (!mounted) {
    return (
      <>
        <section id="about" aria-label="About" className="min-h-[760px]" />
        <section id="projects" aria-label="Projects" className="min-h-[760px]" />
        <section id="experience" aria-label="Experience" className="min-h-[760px]" />
        <section id="hackathons" aria-label="Hackathons" className="min-h-[760px]" />
        <section id="skills" aria-label="Skills" className="min-h-[760px]" />
        <section id="certifications" aria-label="Certifications" className="min-h-[760px]" />
        <section id="contact" aria-label="Contact" className="min-h-[760px]" />
      </>
    );
  }

  return (
    <>
      <About />
      <Projects />
      <Experience />
      <Hackathons />
      <Skills />
      <Certifications />
      <Contact />
    </>
  );
}
