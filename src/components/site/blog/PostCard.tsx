import Link from "next/link";

import { PostImage } from "@/components/site/PostImage";
import type { Post } from "@/content/posts";

/*
  design/site/web/home-web-Blog-page2.png · design/site/mobile/home-mobile-Blog3.png

  Hairline card, photo on top, then title and excerpt. The frame truncates the
  excerpt mid-sentence with an ellipsis at two lines on both breakpoints —
  `line-clamp-2` rather than a shortened string, so the full text stays in the
  content file and the truncation is the browser's job at whatever width it gets.
*/
export function PostCard({ post }: { post: Post }) {
  return (
    // `relative` is load-bearing: the title's stretched link positions against it.
    <article className="group relative flex flex-col overflow-hidden rounded-md border border-border bg-surface transition-colors hover:border-primary/40">
      <PostImage
        src={post.image}
        alt={post.title}
        // One column below md, two at md, three at lg — matches the grid below.
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className="aspect-[4/3] w-full rounded-none"
      />

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-h4 text-heading">
          {/* Stretched link: the whole card is the target, but only the title is
              the accessible name — a card with several links reads as noise. */}
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-body">
          {post.excerpt}
        </p>
      </div>
    </article>
  );
}
