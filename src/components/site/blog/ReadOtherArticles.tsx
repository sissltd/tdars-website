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
*/
export function ReadOtherArticles({ posts }: { posts: Post[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

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

  const nudge = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    // One card plus its gap, derived from the rail rather than hardcoded so it
    // stays right across breakpoints.
    const card = rail.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 20 : rail.clientWidth * 0.8;
    rail.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="other-articles-title">
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
            onClick={() => nudge(-1)}
          />
          <RailButton
            direction="next"
            disabled={atEnd}
            onClick={() => nudge(1)}
          />
        </div>
      </div>

      <div
        ref={railRef}
        onScroll={sync}
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
