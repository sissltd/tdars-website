/*
  Blog content, verbatim from Yemi's frames.

  design/site/web/home-web-Blog-page1..3.png
  design/site/mobile/home-mobile-Blog1..9.png

  ── IMAGES ────────────────────────────────────────────────────────────────────
  `image: null` renders the framed empty box the web frames draw (the exports were
  taken while the connection was down, so the photos are blank there — the mobile
  frames DO show them). To drop the real ones in later:

    1. Export from Figma at 2x, JPG or WebP, landscape ~16:10.
    2. Save into `public/images/blog/` using the `slug` below as the filename —
       e.g. `air-gapped-deployments.jpg` for the featured post.
    3. Set `image: "/images/blog/<slug>.jpg"` on that entry.

  Nothing else changes: `PostImage` swaps the placeholder for a real `next/image`
  the moment the path is non-null, and the aspect box is already reserved so
  adding them causes no layout shift.

  ── CATEGORIES ────────────────────────────────────────────────────────────────
  TODO(review): the filter chips are in the frame (All · News · Security ·
  Archives · Updates · Insights) but the frames never show WHICH category each
  post belongs to — no chip or label appears on the cards. The values below are
  provisional, inferred from each title, and are the one thing on this page not
  taken from the design. Confirm them with Yemi or content, and only "TDARS 2.0"
  is unambiguous (it is a release note → Updates).
*/

export const CATEGORIES = [
  "All",
  "News",
  "Security",
  "Archives",
  "Updates",
  "Insights",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type Post = {
  slug: string;
  title: string;
  /** Card copy. The frames truncate this to two lines; the full text is kept here. */
  excerpt: string;
  category: Exclude<Category, "All">;
  /** `/images/blog/<slug>.jpg` once exported — see the note above. */
  image: string | null;
};

/** The large post at the top of the page. */
export const FEATURED_POST: Post = {
  slug: "air-gapped-deployments",
  title:
    "Why Air-Gapped Deployments Are the Future of Secure Records Management",
  excerpt:
    "As cyber threats evolve, government agencies are rethinking how they store sensitive personnel records. Air-gapped deployments offer a proven layer of protection — isolating critical archives from internet-facing systems entirely. Here's how TDARS enables secure, offline-first record management without sacrificing usability.",
  category: "Security",
  image: "/images/blog/air-gapped-deployments.jpg",
};

/** "Latest insights and trends" — eight cards, three across on desktop. */
export const POSTS: Post[] = [
  {
    slug: "compliance-pitfalls",
    title: "5 Compliance Pitfalls in Government Record-Keeping",
    excerpt:
      "From retention schedules to audit trails, learn the most common compliance mistakes agencies make and how to avoid them.",
    category: "Insights",
    image: "/images/blog/compliance-pitfalls.jpg",
  },
  {
    slug: "digital-archives-retrieval-time",
    title: "How Digital Archives Reduce Retrieval Time by 80%",
    excerpt:
      "Manual filing systems cost agencies thousands of hours annually. See how digitising personnel dossiers changes the day-to-day.",
    category: "Archives",
    image: "/images/blog/digital-archives-retrieval-time.jpg",
  },
  {
    slug: "securing-personnel-records",
    title: "Securing Personnel Records: A Guide for Defence Agencies",
    excerpt:
      "Military and security organisations handle some of the most sensitive data. This guide covers best practice from intake to archive.",
    category: "Security",
    image: "/images/blog/securing-personnel-records.jpg",
  },
  {
    slug: "tenant-isolation",
    title: "The Role of Tenant Isolation in Multi-Agency Platforms",
    excerpt:
      "When multiple agencies share a platform, data boundaries matter. Learn how tenant isolation keeps each command's records its own.",
    category: "Security",
    image: "/images/blog/tenant-isolation.jpg",
  },
  {
    slug: "tdars-2-scanner-console",
    title: "TDARS 2.0: New Scanner Console and Batch Processing",
    excerpt:
      "Our latest release brings a redesigned scanner console, faster batch queuing, and improved document classification.",
    category: "Updates",
    image: "/images/blog/tdars-2-scanner-console.jpg",
  },
  {
    slug: "audit-trails",
    title: "Building Audit Trails That Stand Up to Scrutiny",
    excerpt:
      "Every access, edit, and export logged. Discover how immutable audit trails help agencies meet regulatory expectations.",
    category: "Archives",
    image: "/images/blog/audit-trails.jpg",
  },
  {
    slug: "migration-playbook",
    title: "From Paper to Digital: A Migration Playbook",
    excerpt:
      "Planning a large-scale digitisation project? This step-by-step playbook covers scanning, indexing, quality assurance, and go-live strategies.",
    category: "Archives",
    image: "/images/blog/migration-playbook.jpg",
  },
  {
    slug: "data-sovereignty-nigeria",
    title: "Understanding Data Sovereignty for Nigerian Agencies",
    excerpt:
      "Where your data lives matters. We explore Nigeria's data residency requirements and how on-premises deployments ensure full sovereignty.",
    category: "Security",
    image: "/images/blog/data-sovereignty-nigeria.jpg",
  },
  {
    slug: "unauthorised-access-prevention",
    title: "How Pending Approvals Workflow Prevents Unauthorised Access",
    excerpt:
      "TDARS built-in approval gates ensure no document is published or shared without proper authorisation from designated reviewers.",
    category: "Security",
    image: "/images/blog/unauthorised-access-prevention.jpg",
  },
  {
    slug: "scaling-across-state-commands",
    title: "Scaling Records Management Across State Commands",
    excerpt:
      "Deploying a unified archive system across multiple state offices brings unique challenges. Here's how to plan the rollout.",
    category: "News",
    image: "/images/blog/scaling-across-state-commands.jpg",
  },
  {
    slug: "hidden-cost-of-lost-records",
    title: "The Hidden Cost of Lost Records in Government",
    excerpt:
      "Missing files delay promotions, stall investigations, and erode institutional trust. Learn the real cost — and how to stop it.",
    category: "Insights",
    image: "/images/blog/hidden-cost-of-lost-records.jpg",
  },
];

export const ALL_POSTS: Post[] = [FEATURED_POST, ...POSTS];

export const getPostBySlug = (slug: string): Post | undefined =>
  ALL_POSTS.find((post) => post.slug === slug);
