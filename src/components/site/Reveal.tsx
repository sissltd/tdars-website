"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/cn";

/**
 * Scroll-triggered entrance animation.
 *
 * WHY NOT FRAMER MOTION
 *
 * Every section of this site is a SERVER component. Framer Motion animates by
 * rendering, so each animated section would have to become a client component —
 * shipping its markup as JS payload on top of the HTML, for an effect that is a
 * CSS transition. This is ~1KB of JS with no dependency, and because `children`
 * is a prop, everything inside stays server-rendered.
 *
 * HOW IT PERFORMS
 *
 * Only `opacity` and `transform` are animated. Both are composited on the GPU,
 * so a reveal costs no layout and no paint no matter how many run at once. One
 * IntersectionObserver is SHARED by every instance, and each element is
 * unobserved the moment it reveals — the work is O(elements entering), not
 * O(elements on the page), and it stops entirely once the reader reaches the
 * bottom. The observer flips a data attribute on the DOM node directly rather
 * than setting state, so a reveal triggers no React render at all.
 *
 * HOW IT FAILS
 *
 * Content must never be invisible because an animation did not run:
 *   · `prefers-reduced-motion` shows everything immediately (globals.css)
 *   · a <noscript> block in the layout does the same when JS is off
 *   · an element scrolled PAST before hydration — a deep link to #contact, or a
 *     restored scroll position — is revealed on the observer's first callback
 *     rather than waiting for an intersection that will never come
 */

/** Shared across every instance; created lazily so it never runs during SSR. */
let observer: IntersectionObserver | null = null;

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // `boundingClientRect.top < 0` catches anything already scrolled past.
        // Without it, a reader landing on /#contact would find every section
        // above the footer stuck at opacity 0 — permanently, since they can
        // never intersect again on the way back up.
        if (!entry.isIntersecting && entry.boundingClientRect.top >= 0)
          continue;
        (entry.target as HTMLElement).dataset.revealed = "true";
        observer?.unobserve(entry.target);
      }
    },
    // Starts the reveal a little BEFORE the element reaches the fold, so it is
    // settling as it arrives rather than beginning once it is already read.
    { rootMargin: "0px 0px -12% 0px" },
  );
  return observer;
}

type RevealFrom = "up" | "left" | "right" | "fade";

type RevealProps = {
  children: ReactNode;
  /** Direction the element travels IN from. Defaults to `up`. */
  from?: RevealFrom;
  /** Stagger, in ms. Keep the whole run under ~400ms or it reads as lag. */
  delay?: number;
  /** The element to render. `li` matters — a wrapper div inside a <ul> is invalid. */
  as?: "div" | "li" | "section" | "header";
  className?: string;
};

export function Reveal({
  children,
  from = "up",
  delay = 0,
  as: Tag = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      data-reveal={from}
      style={
        delay
          ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}
