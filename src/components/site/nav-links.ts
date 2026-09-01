/**
 * Nav order is verbatim from the Figma (design/TOKENS.md → "Content"):
 * Home · Solutions · How it works · Blog · Contact Us · Log In · Request Access →
 */
export type NavLink = {
  label: string;
  href: string;
};

/*
  Solutions, How it works and Contact Us are SECTIONS of the home page, not pages
  of their own — confirmed by Kaz 2026-09-01, and consistent with `design/site/`
  carrying no frames for them. They are anchors, so they work from any page:
  "/#solutions" from /blog navigates home and scrolls, where "#solutions" alone
  would look for a section on the blog page and do nothing.

  "Contact Us" resolves to the footer's contact card — the only contact form in
  the design.
*/
export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/#solutions" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/#contact" },
];

/**
 * "Log In" leaves the marketing site for the TDARS application — confirmed by Kaz
 * 2026-09-01. The marketing site has no auth of its own.
 *
 * Absolute, so it must render as a plain `<a>`: a next/link would try to prefetch
 * a route this app does not have.
 */
export const LOGIN_HREF = "https://www.tdars.org/login";

export const REQUEST_ACCESS_HREF = "/request-access";

/**
 * Footer link row, verbatim including the trailing full stops.
 *
 * TODO(review): "Platform." has no matching page in the screenshots or the nav.
 * Pointed at /solutions for now — confirm whether it should be its own route.
 */
export const FOOTER_LINKS: NavLink[] = [
  { label: "Platform.", href: "/#solutions" },
  { label: "Solutions.", href: "/#solutions" },
  { label: "How it works.", href: "/#how-it-works" },
];
