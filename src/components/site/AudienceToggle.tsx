import Link from "next/link";

import { cn } from "@/lib/cn";
import { INDIVIDUAL_HREF } from "./nav-links";

/*
  "Organizations | Individual" — the segmented switch above both hero headlines
  (design/site/individual/02-landing-hero.png). Two LINKS, not tabs: each audience
  is its own page, so the switch is shareable, indexable and survives a reload.

  Track: 1px Gray 4 pill. Selected segment: 1px Gray 2 ring on Gray 5, as drawn.
  Centred over the 440px email row (frame: toggle centre x=300 = 80 + 440/2).
*/
const SEGMENTS = [
  { label: "Organizations", href: "/" },
  { label: "Individual", href: INDIVIDUAL_HREF },
] as const;

export function AudienceToggle({ active }: { active: "Organizations" | "Individual" }) {
  return (
    <nav
      aria-label="Audience"
      className="inline-flex items-center gap-0.5 rounded-full border border-border bg-surface p-0.5"
    >
      {SEGMENTS.map((segment) => {
        const on = segment.label === active;
        return (
          <Link
            key={segment.label}
            href={segment.href}
            // Keep the reader where they are; the hero swaps in place.
            scroll={false}
            aria-current={on ? "page" : undefined}
            className={cn(
              "rounded-full border px-3 py-1 text-sm leading-5 transition-colors",
              on
                ? "border-body bg-gray-5 text-heading"
                : "border-transparent text-body hover:text-heading",
            )}
          >
            {segment.label}
          </Link>
        );
      })}
    </nav>
  );
}
