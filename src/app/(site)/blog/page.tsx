import type { Metadata } from "next";

import { ReadyToGoDigital } from "@/components/site/ReadyToGoDigital";
import { Section } from "@/components/site/Section";
import { FeaturedPost } from "@/components/site/blog/FeaturedPost";
import { PostFilter } from "@/components/site/blog/PostFilter";
import { FEATURED_POST, POSTS } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog & articles",
  description:
    "Insights on secure records management, digital archives, and compliance for national agencies, military commands, and security structures.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog & articles — TDARS",
    description:
      "Insights on secure records management, digital archives, and compliance for national agencies, military commands, and security structures.",
    url: "/blog",
    type: "website",
  },
};

/*
  design/site/web/home-web-Blog-page1..4.png
  design/site/mobile/home-mobile-Blog1..9.png

  Title → filter chips → featured post → "Latest insights and trends" grid → the
  rust CTA → footer. The last two are the shared shell, unchanged from Home.

  The heading and the chips sit in one section with the featured post because the
  frame gives them a single continuous run of white with no band change between
  them; the grid then sits on its own #F8F8F8 card.
*/
export default function BlogPage() {
  return (
    <>
      {/* Tightened: the frame runs the heading close under the header rule. */}
      <Section
        reveal="load"
        aria-labelledby="blog-title"
        className="pb-0 pt-8 lg:pt-10"
      >
        <h1
          id="blog-title"
          className="font-heading text-h1 text-heading lg:text-h1-lg"
        >
          Blog &amp; articles
        </h1>

        <div className="mt-6 lg:mt-8">
          <PostFilter
            posts={POSTS}
            featured={<FeaturedPost post={FEATURED_POST} />}
          />
        </div>
      </Section>

      {/* 80px above and below: the frame hugs at 598 = 438 card + 80 + 80. */}
      <Section aria-labelledby="ready-title" className="py-14 lg:py-20">
        <ReadyToGoDigital />
      </Section>
    </>
  );
}
