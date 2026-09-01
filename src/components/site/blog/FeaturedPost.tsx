import { Button } from "@/components/site/Button";
import { PostImage } from "@/components/site/PostImage";
import { ArrowRightIcon } from "@/components/site/icons";
import type { Post } from "@/content/posts";

/*
  design/site/web/home-web-Blog-page1.png · design/site/mobile/home-mobile-Blog1..2.png

  Desktop: photo left, copy right. Mobile: photo on top, copy beneath.

  The columns are NOT even, and the exact widths matter. Figma measures the photo
  at 746 x 464 and the copy container at Fill(494), with a 40px gap — 746 + 40 +
  494 = 1280, the content width. Those three numbers are used literally rather
  than approximated, because the copy column's width is what makes the headline
  break across THREE lines as drawn. An earlier 3fr/2fr split gave the column
  ~30px too much and the title fell to four.

  The copy is TOP-aligned with 40px of padding above it, not vertically centred:
  the frame's container reads `Padding Top 40 · Gap 40`, and the photo being
  taller is what leaves the space beneath.
*/
export function FeaturedPost({ post }: { post: Post }) {
  return (
    <article className="grid gap-6 lg:grid-cols-[746fr_494fr] lg:items-start lg:gap-10">
      <PostImage
        src={post.image}
        alt={post.title}
        // 746/464 from the frame — kept as the raw ratio rather than rounded to
        // 16:10 so the box matches the export exactly.
        sizes="(min-width: 1024px) 58vw, 100vw"
        className="aspect-[746/464] w-full"
        priority
      />

      <div className="lg:pt-10">
        <h2 className="font-heading text-h2 text-heading lg:text-h2-lg">
          {post.title}
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-body lg:text-base">
          {post.excerpt}
        </p>

        {/* 40px from the copy above it — the container's `Gap 40`. */}
        <Button
          href={`/blog/${post.slug}`}
          variant="outline"
          size="md"
          className="mt-6 text-primary lg:mt-10"
        >
          Read more
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </article>
  );
}
