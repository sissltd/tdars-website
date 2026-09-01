import { Button } from "@/components/site/Button";
import { PostImage } from "@/components/site/PostImage";
import { ArrowRightIcon } from "@/components/site/icons";
import type { Post } from "@/content/posts";

/*
  design/site/web/home-web-Blog-page1.png · design/site/mobile/home-mobile-Blog1..2.png

  Desktop: photo left, copy right, both filling half the row and vertically
  centred against each other. Mobile: photo on top, copy beneath, full width.

  The desktop frame gives the photo noticeably more height than the copy block
  needs, which is the 4:3 box holding its shape while the text sits centred
  beside it — not a taller image. Same ratio as the cards, so the two read as one
  family.
*/
export function FeaturedPost({ post }: { post: Post }) {
  return (
    <article className="grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-12">
      <PostImage
        src={post.image}
        alt={post.title}
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="aspect-[4/3] w-full"
        priority
      />

      <div>
        <h2 className="font-heading text-h2 text-heading lg:text-h2-lg">
          {post.title}
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-body lg:text-base">
          {post.excerpt}
        </p>

        <Button
          href={`/blog/${post.slug}`}
          variant="outline"
          size="md"
          className="mt-6 text-primary"
        >
          Read more
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>
    </article>
  );
}
