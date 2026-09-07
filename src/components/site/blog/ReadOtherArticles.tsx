"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/cn";
import type { Post } from "@/content/posts";

import { PostCard } from "./PostCard";
import { ArrowRightIcon } from "@/components/site/icons";

/*
  design/site/web/home-web-Blog-detail-page3.png
  design/site/mobile/home-mobile-Blog-detail4.png

  A horizontal rail, not a grid: the frame cuts the fourth card off mid-width at
  the right edge, which is how a scroller announces itself. Paired with the two
  round buttons top-right — the left one drawn disabled (grey) at rest because
  the rail starts at its beginning.

  Native scroll with snap points rather than a carousel library: it keeps
  keyboard, trackpad and touch behaviour for free, and the buttons just nudge
  `scrollLeft`. The rail is focusable and labelled so it is reachable without a
  pointer.

  AUTO-ADVANCE

  The rail moves on by itself, and it is the same `scrollBy` the buttons use —
  so dragging, swiping, the scrollbar and the arrows all keep working exactly as
  they did. It is deliberately easy to stop:

    · it STOPS FOR GOOD the moment the reader takes control — a button, a swipe,
      a wheel, an arrow key. Auto-advance is a hint that the rail scrolls, not a
      thing to fight someone who has understood the hint.
    · it PAUSES while the pointer is over it or focus is inside it (someone is
      reading), while it is off screen, and while the tab is in the background.
    · it never starts under `prefers-reduced-motion`.

  Between them those are the WCAG 2.2.2 "pause, stop, hide" mechanism: any of
  hovering, focusing, touching or clicking halts the movement.
*/

/**
 * How long a card rests before the rail advances.
 *
 * Long enough to read a headline and the first line of the excerpt. Below ~4s
 * this reads as the page twitching; much above ~7s and it looks broken rather
 * than automatic.
 */
const AUTO_ADVANCE_MS = 5000;

export function ReadOtherArticles({ posts }: { posts: Post[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  /** The reader has driven the rail themselves — do not move it again. */
  const [userTookControl, setUserTookControl] = useState(false);
  /** Temporarily held: hovered, focused, scrolled out of view, or tab hidden. */
  const [isPaused, setIsPaused] = useState(false);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    // 1px of slack: sub-pixel widths mean scrollLeft rarely lands exactly on the
    // maximum, which would leave the forward button enabled at the end forever.
    setAtStart(rail.scrollLeft <= 1);
    setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 1);
  }, []);

  useEffect(() => {
    sync();
    const rail = railRef.current;
    if (!rail) return;
    const observer = new ResizeObserver(sync);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [sync]);

  const nudge = useCallback((direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    // One card plus its gap, derived from the rail rather than hardcoded so it
    // stays right across breakpoints.
    const card = rail.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: direction * step, behavior: "smooth" });
  }, []);

  /* Pause while the rail is off screen or the tab is hidden. Neither is a
     nicety: a rail that keeps advancing out of sight has silently run to its
     end by the time the reader scrolls back to it, and a background tab throttles
     the timer into a burst of jumps when it is foregrounded again. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let onScreen = true;
    const apply = () => setIsPaused(!onScreen || document.hidden);

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      apply();
    });
    observer.observe(section);
    document.addEventListener("visibilitychange", apply);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", apply);
    };
  }, []);

  useEffect(() => {
    // Nothing to advance THROUGH with one card, and on a wide screen every card
    // may already be visible — `atEnd` covers that, since the rail cannot scroll.
    if (userTookControl || isPaused || posts.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      const rail = railRef.current;
      if (!rail) return;
      // Read the DOM rather than the `atEnd` state: the interval closes over
      // whatever that was when it was created, which goes stale as it scrolls.
      const isAtEnd =
        rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 1;
      if (isAtEnd) {
        rail.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        nudge(1);
      }
    }, AUTO_ADVANCE_MS);

    return () => window.clearInterval(timer);
  }, [userTookControl, isPaused, posts.length, nudge]);

  /* Intent, not scroll position. `onScroll` cannot tell the reader's swipe from
     our own `scrollBy`, so the handover is detected from the input itself. */
  const takeControl = useCallback(() => setUserTookControl(true), []);

  if (posts.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="other-articles-title"
      /* Hovering or focusing anything in here means someone is reading it.
         React's onFocus/onBlur are focusin/focusout, so they cover descendants;
         the relatedTarget check stops focus moving BETWEEN two cards from
         reading as having left the section. */
      onPointerEnter={() => setIsPaused(true)}
      onPointerLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setIsPaused(false);
        }
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <h2
          id="other-articles-title"
          className="font-heading text-h2 font-semibold text-heading lg:text-h2-lg"
        >
          Read other articles
        </h2>

        <div className="flex shrink-0 gap-2">
          <RailButton
            direction="prev"
            disabled={atStart}
            onClick={() => {
              takeControl();
              nudge(-1);
            }}
          />
          <RailButton
            direction="next"
            disabled={atEnd}
            onClick={() => {
              takeControl();
              nudge(1);
            }}
          />
        </div>
      </div>

      <div
        ref={railRef}
        onScroll={sync}
        /* A swipe, a trackpad flick or an arrow key is the reader driving the
           rail — hand it over permanently. Deliberately NOT `onScroll`, which
           fires for our own auto-advance too and would stop it on its first tick. */
        onPointerDown={takeControl}
        onWheel={takeControl}
        onKeyDown={takeControl}
        tabIndex={0}
        role="group"
        aria-label="Other articles"
        className="scrollbar-none mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2"
      >
        {posts.map((post) => (
          <div
            key={post.slug}
            /*
              372px fixed from `lg`, not a percentage. The frame measures the
              card at 372 x 376 against the 1280 container: three cards plus two
              20px gaps is 1156, and the 124px left over is the fourth card
              peeking — which is what tells the viewer the rail scrolls. A
              percentage width drifts off that and loses the peek.
            */
            className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-[372px]"
          >
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </section>
  );
}

function RailButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "prev" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous articles" : "Next articles"}
      className={cn(
        "flex size-10 items-center justify-center rounded-full transition-colors",
        disabled
          ? "cursor-not-allowed bg-primary/25 text-primary-foreground"
          : "bg-primary text-primary-foreground hover:bg-primary-hover",
      )}
    >
      <ArrowRightIcon
        className={cn("size-5", direction === "prev" && "rotate-180")}
      />
    </button>
  );
}
