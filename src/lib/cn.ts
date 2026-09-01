type ClassValue = string | false | null | undefined;

/**
 * Minimal class joiner. No `tailwind-merge` here on purpose — this site has no
 * runtime deps beyond Next/React, so keep conflicting utilities out of the same
 * element rather than relying on a merge pass.
 */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
