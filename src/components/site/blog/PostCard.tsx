import Link from "next/link";

import { PostImage } from "@/components/site/PostImage";
import type { Post } from "@/content/posts";

/*
  design/site/web/home-web-Blog-page2.png · design/site/mobile/home-mobile-Blog3.png

  Measured off the frame:
    Card    372 x 376 fixed · radius 12 · 1px Gray/Gray 4 (#E6E6E6)
            · padding 4 · gap 10 · fill Gray/Gray 5 (#FAFAFA)
    Image   362 x 243 · radius 12
    Title   354 x 48 (desktop) / 316 x 40 (mobile) — Body 1/Semi Bold, INTER
    Body    354 x 49 — Body 2/Regular, Gray/Gray 2 (#4D4D4D)

  Two things this corrects. The card is #FAFAFA, not white — it sits on the
  #F7F7F7 panel, so white made it float rather than settle. And the title is
  Inter Semi Bold, NOT the Bricolage heading face: Yemi uses the body family for
  card titles and reserves the display face for section headings.

  Both title and excerpt clamp to two lines, which is what holds every card to
  the same height without pinning one in CSS.
*/
export function PostCard({ post }: { post: Post }) {
  return (
    // `relative` is load-bearing: the title's stretched link positions against it.
    <article className="group relative flex flex-col gap-2.5 rounded-md border border-border bg-surface-subtle p-1 transition-colors hover:border-primary/40">
      <PostImage
        src={post.image}
        alt={post.title}
        // One column below md, two at md, three at lg — matches the grid.
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="aspect-[362/243] w-full"
      />

      {/* The copy is inset a little further than the card's 4px: the frame has
          the text at 354 inside a 372 card. */}
      <div className="flex flex-1 flex-col gap-2 px-1.5 pb-1.5">
        <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-heading lg:text-base lg:leading-6">
          {/* Stretched link: the whole card is the target, but only the title is
              the accessible name — a card with several links reads as noise. */}
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>

        <p className="line-clamp-2 text-sm leading-5 text-prose">{post.excerpt}</p>
      </div>
    </article>
  );
}
