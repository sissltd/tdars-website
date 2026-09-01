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

const toneClass: Record<BadgeTone, string> = {
  soft: "border border-primary/30 bg-primary-soft text-primary",
  dark: "bg-heading text-primary-foreground",
};

type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
};

export function Badge({ children, tone = "soft", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium md:text-sm",
        toneClass[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
