import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * The rust eyebrow pill that opens most sections — "Our solutions",
 * "How it works", "Mock Exams & CBT", "Who is TDARS built for?", "Get started".
 *
 * `soft` is the light-on-white pill; `dark` is the near-black pill used on the
 * rust CTA card ("Get started"), which samples the heading grey #373737.
 */
type BadgeTone = "soft" | "dark";

/**
 * The two eyebrows are NOT the same shape, which is easy to miss.
 *
 *   pill — Home's section eyebrows: radius 26 on a 32px-tall pill, i.e. fully
 *          rounded. Measured on "How it works" (124 x 32 desktop, 111 x 28 mobile).
 *   rect — the CTA's "Get started": radius 12, a rounded rectangle.
 */
type BadgeShape = "pill" | "rect";

const toneClass: Record<BadgeTone, string> = {
  soft: "border border-primary-2 bg-primary-soft text-accent",
  // Its ground is the rust card, which does not change theme — so neither
  // does the pill. `bg-heading` would have inverted to near-white under
  // white text.
  dark: "bg-on-rust-chip text-primary-foreground",
};

const shapeClass: Record<BadgeShape, string> = {
  pill: "rounded-full",
  rect: "rounded-md",
};

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  shape?: BadgeShape;
  className?: string;
};

export function Badge({ children, tone = "soft", shape = "pill", className }: BadgeProps) {
  return (
    <span
      className={cn(
        // Padding 4 top/bottom, 12 left/right around Body 1/Medium — which is
        // what produces the measured 28px (mobile) and 32px (desktop) heights.
        "inline-flex items-center px-3 py-1 text-sm leading-5 font-medium lg:text-base lg:leading-6",
        toneClass[tone],
        shapeClass[shape],
        className,
      )}
    >
      {children}
    </span>
  );
}
