import Link from "next/link";

import { cn } from "@/lib/cn";
import { LogoMark } from "@/components/site/icons";

type LogoProps = {
  /** Wrap the lockup in a link home. Pass `null` for the footer's static lockup. */
  href?: string | null;
  onClick?: () => void;
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
};

export function Logo({
  href = "/",
  onClick,
  className,
  markClassName,
  wordmarkClassName,
}: LogoProps) {
  const lockup = (
    <>
      <LogoMark className={markClassName} />
      {/*
        Measured on the header lockup: Bricolage Grotesque, BOLD 700, 27.17px,
        line-height 120%, letter-spacing 0%, Gray/Gray 1.

        Three of those were wrong. It was inheriting INTER (the body font) at
        EXTRABOLD 800 with `tracking-tight` — a different family, a heavier
        weight and negative tracking, where the frame specifies none.

        Figma reports the box as 88 x 18 because it trims to CAP HEIGHT; 18px is
        the cap height of 27px Bricolage Bold, not the line box. Sizing to 18
        would have produced a wordmark two-thirds too small.

        ⚠️ The 27px is measured at 1440 only — Yemi drew no mobile lockup. Mobile
        holds 20px because the header there also carries the Request Access
        button, the theme toggle and the menu button; at 27px that row has
        roughly 17px of slack left, which is not enough to trust.
      */}
      <span
        className={cn(
          "font-heading text-xl leading-[1.2] font-bold md:text-[27px]",
          wordmarkClassName,
        )}
      >
        TDARS
      </span>
    </>
  );

  // No colour here on purpose: the header wants `text-heading`, the footer
  // `text-footer-foreground`, and two same-specificity utilities would fight.
  const classes = cn("inline-flex items-center gap-2", className);

  if (!href) {
    return <span className={classes}>{lockup}</span>;
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(classes, "rounded-sm")}
      aria-label="TDARS — home"
    >
      {lockup}
    </Link>
  );
}
