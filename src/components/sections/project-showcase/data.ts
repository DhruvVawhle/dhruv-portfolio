import { SHOWCASE_PROJECTS, type ShowcaseProject } from "@/data/showcaseProjects";
import type { FilterChip } from "./types";

export function filterShowcaseProjects(
  projects: ShowcaseProject[],
  activeFilter: FilterChip
): ShowcaseProject[] {
  if (activeFilter === "All") {
    return projects.filter((p) => !p.isGitHubCard);
  }
  return projects.filter(
    (p) =>
      !p.isGitHubCard &&
      p.categories.includes(activeFilter as (typeof p.categories)[number])
  );
}

export function getGitHubArchiveCard(
  projects: ShowcaseProject[] = SHOWCASE_PROJECTS
): ShowcaseProject | undefined {
  return projects.find((p) => p.isGitHubCard);
}
