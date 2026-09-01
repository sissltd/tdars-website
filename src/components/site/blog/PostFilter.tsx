"use client";

import { useMemo, useState, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { CATEGORIES, type Category, type Post } from "@/content/posts";

import { PostCard } from "./PostCard";

/*
  design/site/web/home-web-Blog-page1..3.png · design/site/mobile/home-mobile-Blog1..5.png

  The chips and the grid are one client island so the rest of the page stays a
  server component — only the part that actually needs state ships JS.

  The frame draws the chips with "All" selected and never shows another state, so
  the selected treatment (rust hairline + rust label) is taken from the "All"
  chip as drawn and applied to whichever chip is active.

  Chips wrap to a second row on mobile at exactly Archives/Updates — that falls
  out of `flex-wrap` at 375px rather than being forced, so it stays correct at
  the widths between the two frames.
*/
export function PostFilter({
  posts,
  featured,
}: {
  posts: Post[];
  /*
    The featured article sits BETWEEN the chips and the grid in the frame, and
    the chips have to drive the grid — so it comes through as a slot rather than
    splitting this into two components that would need shared state hoisted
    above both. Passed from the server page, so it stays server-rendered even
    though it lands inside a client component.

    It does not filter: the frame shows one fixed featured post above chips that
    plainly govern the "Latest insights and trends" grid below.
  */
  featured: ReactNode;
}) {
  const [active, setActive] = useState<Category>("All");

  const visible = useMemo(
    () => (active === "All" ? posts : posts.filter((p) => p.category === active)),
    [posts, active],
  );

  return (
    <>
      <div
        role="group"
        aria-label="Filter articles by category"
        className="flex flex-wrap gap-2"
      >
        {CATEGORIES.map((category) => {
          const selected = category === active;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              aria-pressed={selected}
              /*
                Hug x 30 · radius 8 · 1px border · 4px top/bottom, 10px
                left/right. Not a pill: the frame's 8px corner on a 30px chip
                reads as a rounded rectangle, and `rounded-full` was rendering
                these noticeably taller and more capsule-shaped than drawn.

                8px is `rounded-sm` HERE — this project overrides Tailwind's
                radius scale (sm 8 / md 12 / lg 20 / xl 32), so `rounded-lg`
                would be 20px, not the 8 you would expect from stock Tailwind.
                Selected carries the Primary/Primary 1 (#B93A2C) hairline.
              */
              className={cn(
                "h-[30px] rounded-sm border px-2.5 text-xs transition-colors",
                selected
                  ? "border-primary text-primary"
                  : "border-border bg-surface text-body hover:border-primary hover:text-primary",
              )}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-10 md:mt-14">{featured}</div>

      {/*
        Panel: Fill 1280 · radius 32 · padding 40 · gap 40 · #F7F7F7.
        `rounded-xl` IS 32 here (this project overrides Tailwind's radius scale).
      */}
      <div className="mt-10 rounded-lg bg-surface-subtle p-4 md:mt-14 lg:rounded-xl lg:p-10">
        {/*
          368 x 38 desktop, 249 x 26 mobile — the same H3 as the featured
          headline (38px line at desktop), NOT the 20/28 `--text-h3-lg` that
          Home's column headings use.
        */}
        <h2
          id="latest-title"
          className="font-heading text-h3 text-heading lg:text-h3-feature"
        >
          Latest insights and trends
        </h2>

        {visible.length > 0 ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-10">
            {visible.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          // Not in the frame — but a filter that can return nothing needs to say
          // so, otherwise the grid silently empties and reads as a broken page.
          <p className="mt-6 text-sm text-body">
            No articles in this category yet.
          </p>
        )}
      </div>
    </>
  );
}
