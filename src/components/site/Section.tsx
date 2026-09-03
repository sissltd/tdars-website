import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

/**
 * `surface` — white page background (most sections).
 * `subtle`  — the #FAFAFA band ("Who is TDARS built for?", "Access controls…").
 *             Gray/Gray 5, NOT `--surface-subtle` (#F8F8F8): the two are 2/255
 *             apart and Figma names them separately, and this frame states
 *             #FAFAFA explicitly. `--surface-subtle` stays what it is — the
 *             fill behind form fields and inset cards.
 * `dark`    — #2D2D2D panel ("Still running on paper?").
 */
type SectionTone = "surface" | "subtle" | "dark";

const toneClass: Record<SectionTone, string> = {
  surface: "bg-surface",
  subtle: "bg-gray-5",
  dark: "bg-dark-panel text-white",
};

type SectionProps = {
  children: ReactNode;
  /** Anchor id, also used to label the section for assistive tech. */
  id?: string;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  /** Skip the `Container` when a section needs to bleed to the viewport edge. */
  bleed?: boolean;
  /**
   * `true`   — rise into view as the section is reached (IntersectionObserver).
   *            The default: a marketing page wants it everywhere.
   * `"load"` — rise on page load, in CSS, with no JS involved. For sections in
   *            the FIRST SCREEN. The observer holds an element at opacity 0
   *            until hydration, which below the fold is invisible but above it
   *            leaves the first screen blank for the whole of TTI — seconds on
   *            a slow connection.
   * `false`  — the section animates its own contents.
   */
  reveal?: boolean | "load";
  "aria-labelledby"?: string;
  "aria-label"?: string;
};

export function Section({
  children,
  id,
  tone = "surface",
  className,
  containerClassName,
  bleed = false,
  reveal = true,
  "aria-labelledby": ariaLabelledby,
  "aria-label": ariaLabel,
}: SectionProps) {
  const inner =
    reveal === "load" ? (
      // A plain server-rendered element. No client component, no observer.
      <div data-enter="up">{children}</div>
    ) : reveal ? (
      <Reveal>{children}</Reveal>
    ) : (
      children
    );

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      aria-label={ariaLabel}
      className={cn(toneClass[tone], "py-14 md:py-20 lg:py-24", className)}
    >
      {bleed ? (
        inner
      ) : (
        <Container className={containerClassName}>{inner}</Container>
      )}
    </section>
  );
}
