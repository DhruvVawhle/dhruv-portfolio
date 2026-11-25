import type { ShowcaseProject } from "@/data/showcaseProjects";

export const FILTER_CHIPS = [
  "All",
  "Web",
  "AI",
  "Machine Learning",
  "NLP",
  "Cloud",
] as const;

export type FilterChip = (typeof FILTER_CHIPS)[number];

export interface ProjectShowcaseProps {
  projects: ShowcaseProject[];
  onOpenDetail: (project: ShowcaseProject) => void;
  isSheetOpen: boolean;
}

export interface ProjectCardFrameProps {
  project: ShowcaseProject;
  isActive: boolean;
  onOpenDetail: (project: ShowcaseProject) => void;
  shouldReduceMotion: boolean;
}
