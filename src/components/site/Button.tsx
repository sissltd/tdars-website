import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

/**
 * `primary`  — rust fill, white label. Nav "Request Access", hero "Get Started",
 *              footer "Send Message". Disabled = `primary/30`, which is exactly
 *              what the greyed-out "Submit" on Request access samples (#EAC4C1).
 * `wash`     — near-white fill, rust label. "Talk to our team" on the rust CTA card.
 * `outline`  — white fill, hairline border. Blog filter chips, "Read more".
 */
type ButtonVariant = "primary" | "wash" | "outline";

/** Heights read off the screenshots: nav CTA is 48px desktop (84 − 20 − 16), 36px mobile. */
type ButtonSize = "sm" | "md" | "lg";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover disabled:bg-primary/30",
  // The light button that sits ON the rust card — theme-invariant, same reason
  // as the badge above it.
  wash: "bg-on-rust-button text-on-rust-button-text hover:opacity-90",
  outline:
    "border border-border bg-surface text-heading hover:border-primary hover:text-accent",
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "h-9 px-4",
  md: "h-11 px-5",
  lg: "h-12 px-6",
};

type BaseProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps | "href">;

type ButtonAsLink = BaseProps & {
  href: string;
  /** Renders a plain `<a>` for off-site destinations (e.g. the app's login). */
  external?: boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function buttonClasses({ variant = "primary", size = "lg", fullWidth, className }: BaseProps) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors disabled:cursor-not-allowed",
    variantClass[variant],
    sizeClass[size],
    fullWidth && "w-full",
    className,
  );
}

function isLink(props: ButtonProps): props is ButtonAsLink {
  return "href" in props && typeof props.href === "string";
}

/** Styling props are consumed by `buttonClasses`; keep them out of the DOM. */
const STYLING_PROPS = new Set(["children", "variant", "size", "fullWidth", "className"]);

function domProps(props: ButtonAsButton): ButtonHTMLAttributes<HTMLButtonElement> {
  return Object.fromEntries(
    Object.entries(props).filter(([key]) => !STYLING_PROPS.has(key)),
  ) as ButtonHTMLAttributes<HTMLButtonElement>;
}

export function Button(props: ButtonProps) {
  const { children } = props;
  const classes = buttonClasses(props);

  if (isLink(props)) {
    if (props.external) {
      return (
        <a href={props.href} className={classes} rel="noreferrer">
          {children}
        </a>
      );
    }

    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...domProps(props)}>
      {children}
    </button>
  );
}
