/**
 * Nav order is verbatim from the Figma (design/TOKENS.md → "Content"):
 * Home · Solutions · How it works · Blog · Contact Us · Log In · Request Access →
 */
export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/solutions" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

/*
  TODO(review): "Log In" has no destination in the Figma — the marketing site has
  no auth, so this presumably points at the TDARS app on another host. Pointing it
  at /login for now; give me the real URL and it becomes an external link.
*/
export const LOGIN_HREF = "/login";

export const REQUEST_ACCESS_HREF = "/request-access";

/**
 * Footer link row, verbatim including the trailing full stops.
 *
 * TODO(review): "Platform." has no matching page in the screenshots or the nav.
 * Pointed at /solutions for now — confirm whether it should be its own route.
 */
export const FOOTER_LINKS: NavLink[] = [
  { label: "Platform.", href: "/solutions" },
  { label: "Solutions.", href: "/solutions" },
  { label: "How it works.", href: "/how-it-works" },
];
