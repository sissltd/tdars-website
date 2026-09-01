import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

/**
 * The site content container: max 1440px, 16px gutter on mobile, 80px from `lg`
 * up (design/TOKENS.md → "Layout (desktop)"). Everything on a page sits inside
 * one of these so the left edge lines up across sections.
 */
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-site px-4 md:px-10 lg:px-20", className)}>
      {children}
    </div>
  );
}
