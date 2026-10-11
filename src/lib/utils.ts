import { type ClassValue, clsx } from "clsx";

/**
 * Merge class names conditionally.
 * Lightweight alternative to clsx+tailwind-merge for this project.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
