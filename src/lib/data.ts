/* ─── Dynamic Portfolio Data Router ─── */

import heroData from "@/data/profile.json";
import projectsData from "@/data/projects.json";
import experienceData from "@/data/experience.json";
import skillsData from "@/data/skills.json";
import certificatesData from "@/data/certificates.json";
import achievementsData from "@/data/achievements.json";
import socialsData from "@/data/socials.json";

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  problem: string;
  approach: string;
  architecture: string;
  outcomes: string[];
  metrics: { label: string; value: string; suffix?: string }[];
  techStack: string[];
  links: { label: string; url: string; icon: "github" | "external" | "doc" }[];
  copyrightFiled?: {
    diaryNumber: string;
    status: string;
  };
  image?: string;
  images?: string[];
  category: string;
  featured: boolean;
  features: string[];
  status: string;
  liveDemo?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  bullets: string[];
  certificate?: {
    title: string;
    image: string;
    verifiedId?: string;
  };
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  image?: string;
  credentialId?: string;
  verifyUrl?: string;
  category: string;
}

export interface Hackathon {
  id: string;
  name: string;
  badge?: string;
  organizer: string;
  date: string;
  roleTeam: string;
  description: string;
  challenge?: string;
  role?: string;
  timeConstraint?: string;
  outcome?: string;
  techStack: string[];
  image?: string;
}

export interface TrustSignal {
  icon: string;
  label: string;
}

// ─── Hero ───
export const hero = {
  name: heroData.name,
  role: heroData.currentRole,
  tagline: heroData.tagline,
  trustSignals: heroData.trustSignals as TrustSignal[],
};

// ─── Projects ───
export const projects: Project[] = projectsData.map((p) => {
  const links: { label: string; url: string; icon: "github" | "external" | "doc" }[] = [];
  if (p.githubRepository) {
    links.push({ label: "GitHub", url: p.githubRepository, icon: "github" });
  }
  if (p.liveDemo) {
    links.push({ label: "Live Demo", url: p.liveDemo, icon: "external" });
  }
  if (p.datasetLink) {
    links.push({ label: "Dataset", url: p.datasetLink, icon: "external" });
  }
  return {
    id: p.id,
    title: p.title,
    subtitle: p.description,
    period: p.duration,
    problem: p.problem,
    approach: p.approach,
    architecture: p.architecture,
    outcomes: p.highlights,
    metrics: p.metrics,
    techStack: p.technologies,
    links: links,
    copyrightFiled: p.copyrightFiled || undefined,
    image: p.thumbnail,
    images: p.screenshots,
    category: p.category,
    featured: p.featured,
    features: p.features,
    status: p.status,
    liveDemo: p.liveDemo || undefined,
  };
});

// ─── Experience ───
export const experiences: Experience[] = experienceData.map((e) => ({
  id: e.id,
  company: e.company,
  role: e.role,
  period: e.duration,
  bullets: e.responsibilities,
  certificate: e.certificate || undefined,
}));

// ─── Skills ───
export const orbitRings = skillsData.orbitRings;
export const relationshipsMap = skillsData.relationshipsMap;
export const engineeringStack = skillsData.engineeringStack;
export const techDetailsMap = skillsData.techDetailsMap;

// Legacy compatibility for simple list mapping:
export const skillCategories: SkillCategory[] = skillsData.engineeringStack.map((cat) => ({
  title: cat.title,
  skills: cat.technologies.map((t) => t.name),
}));

// ─── Hackathons ───
export const hackathons: Hackathon[] = achievementsData.hackathons.map((h) => ({
  id: h.id,
  name: h.name,
  badge: h.badge || undefined,
  organizer: h.organizer,
  date: h.date,
  roleTeam: h.roleTeam,
  description: h.description,
  challenge: h.challenge || undefined,
  role: h.role || undefined,
  timeConstraint: h.timeConstraint || undefined,
  outcome: h.outcome || undefined,
  techStack: h.techStack,
  image: h.image || undefined,
}));

// ─── Certifications ───
export const certifications: Certification[] = certificatesData.map((c) => ({
  title: c.title,
  issuer: c.issuer,
  image: c.image || undefined,
  credentialId: c.credentialId || undefined,
  verifyUrl: c.verifyUrl || undefined,
  category: c.category,
}));

// ─── Navigation ───
export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

// ─── Social Links ───
export const socialLinks = socialsData;
