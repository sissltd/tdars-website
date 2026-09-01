import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PostImage } from "@/components/site/PostImage";
import { ReadyToGoDigital } from "@/components/site/ReadyToGoDigital";
import { Section } from "@/components/site/Section";
import { ReadOtherArticles } from "@/components/site/blog/ReadOtherArticles";
import { getArticle } from "@/content/articles";
import { ALL_POSTS, getPostBySlug } from "@/content/posts";

type Params = { params: Promise<{ slug: string }> };

/** Every post is known at build time, so all detail pages prerender. */
export function generateStaticParams() {
  return ALL_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      type: "article",
      ...(post.image ? { images: [{ url: post.image }] } : {}),
    },
  };
}

/*
  design/site/web/home-web-Blog-detail-page1..4.png
  design/site/mobile/home-mobile-Blog-detail1..6.png

  "Go Back" → article card → "Read other articles" rail → the rust CTA → footer.

  The article sits on a #F8F8F8 card on desktop; the mobile frame runs it on
  plain white with no card, so the tint and rounding only appear from `lg`.
*/
export default async function BlogDetailPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const article = getArticle(slug);
  const others = ALL_POSTS.filter((p) => p.slug !== slug);

  return (
    <>
      {/*
        ONE section, not two. Measured off the frame: 60px above the "Go Back"
        link, 40px below it, then the card. Two stacked <Section>s each
        contributed their own vertical rhythm on top of that, which was the extra
        gap at the top.
      */}
      <Section className="pb-0 pt-8 lg:pt-10">
        {/*
          "Go Back" is a link to the index, not `history.back()`. The frame gives
          it a fixed destination, and a history call would send someone who
          arrived from a search engine to whatever preceded it — or nowhere.
        */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-body transition-colors hover:text-primary lg:text-base"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-5">
            <path
              d="M19 12H5m0 0 6-6m-6 6 6 6"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Go Back
        </Link>

        {/*
          The card fills the 1280 container (20px radius, #F7F7F7). The copy
          inside does NOT fill it: the frame measures that inner column at 907,
          leaving ~186px either side — which is why the text is nowhere near the
          card's edges. `max-w-[907px]` + `mx-auto` is that measurement, and it
          collapses to full width below `lg` where the card itself disappears.
        */}
        <article className="mt-10 lg:rounded-lg lg:bg-surface-subtle lg:py-10">
          <div className="mx-auto w-full lg:max-w-[907px]">
          {article ? (
            <p className="text-sm font-medium leading-5 text-body lg:text-base lg:leading-6">
              {article.date}
            </p>
          ) : null}

          <h1 className="mt-2 font-heading text-h2 font-semibold text-heading lg:text-h2-lg">
            {post.title}
          </h1>

          <PostImage
            src={post.image}
            alt={post.title}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="mt-6 aspect-[358/216] w-full lg:mt-8 lg:aspect-[907/525]"
            priority
          />

          {article ? (
            article.sections.map((section) => (
              <section key={section.heading} className="mt-8 lg:mt-10">
                <h2 className="font-heading text-h2 font-semibold text-heading lg:text-h2-lg">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="mt-4 text-sm leading-[1.4] tracking-[-0.02em] text-prose"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))
          ) : (
            /*
              No body copy exists for this post anywhere in the design — see
              src/content/articles.ts. The excerpt stands in as the lead so the
              page is never blank, and the article renders in full the moment
              copy is added.
            */
            <p className="mt-8 text-sm leading-[1.4] tracking-[-0.02em] text-prose lg:mt-10">
              {post.excerpt}
            </p>
          )}
          </div>
        </article>
      </Section>

      <Section>
        <ReadOtherArticles posts={others} />
      </Section>

      {/* 80px above and below: the frame hugs at 598 = 438 card + 80 + 80. */}
      <Section aria-labelledby="ready-title" className="py-14 lg:py-20">
        <ReadyToGoDigital />
      </Section>
    </>
  );
}
