import Link from "next/link";

import { cn } from "@/lib/cn";

/*
  TODO(review): the TDARS lockup is traced from the Figma exports (the shield in
  public/images/hero-desktop.png at 4x is the sharpest copy available) — a rust
  heater shield with a centre peak and a white "T", set next to an extrabold
  grotesque wordmark. Please drop the official logo SVG into public/ and this
  component swaps to it. Drawn rather than cropped so the wordmark can flip to
  white on the dark footer without a second asset.
*/

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 24 29"
      aria-hidden="true"
      className={cn("h-7 w-auto text-primary", className)}
    >
      <path
        d="M12 0.6 1 6.5v9.1c0 5.6 4.2 10 11 12.8 6.8-2.8 11-7.2 11-12.8V6.5L12 .6Z"
        fill="currentColor"
      />
      <path d="M6.4 8.9h11.2v3.4h-3.9v8.9h-3.4v-8.9H6.4z" className="fill-surface" />
    </svg>
  );
}

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
      <span
        className={cn(
          "text-xl font-extrabold tracking-tight md:text-2xl",
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
