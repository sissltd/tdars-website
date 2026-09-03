import type { ReactNode } from "react";

import { cn } from "@/lib/cn";
import { Container } from "./Container";

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
  "aria-labelledby": ariaLabelledby,
  "aria-label": ariaLabel,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledby}
      aria-label={ariaLabel}
      className={cn(toneClass[tone], "py-14 md:py-20 lg:py-24", className)}
    >
      {bleed ? children : <Container className={containerClassName}>{children}</Container>}
    </section>
  );
}
