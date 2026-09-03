"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { ArrowRightIcon, CloseIcon, MenuIcon } from "@/components/site/icons";
import { LOGIN_HREF, NAV_LINKS, REQUEST_ACCESS_HREF } from "./nav-links";

/*
  Three of the five nav links are ANCHORS on the home page, not routes —
  "/#solutions", "/#how-it-works", "/#contact". Comparing pathname alone (which
  is what this did) therefore made "Home" permanently active and the other three
  permanently inactive: at /#contact the URL's pathname is still "/".

  So the home page needs a scroll-spy, and the nav needs to ask two different
  questions depending on whether a link is a route or a section.
*/
const SECTION_IDS = ["solutions", "how-it-works", "contact"] as const;

/*
  Matches `scroll-padding-top: 6rem` in globals.css and the sections' own
  `scroll-mt-24`. A section becomes current when its top crosses the line the
  browser scrolls it to — so clicking a link and landing on a section is the
  same event that highlights it, rather than two rules that can disagree.
*/
const SPY_OFFSET = 100;

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;

    let frame = 0;

    const read = () => {
      frame = 0;

      // Last section whose top has passed the header line. Walking in document
      // order and keeping the last match means the gaps BETWEEN observed
      // sections stay attributed to the section above them — an
      // IntersectionObserver band would blank out over the unobserved
      // sections in between and flick the highlight back to Home.
      let current: string | null = null;
      for (const id of SECTION_IDS) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= SPY_OFFSET) current = id;
      }

      // #contact lives in the footer and is short enough that on a tall viewport
      // its top may never reach the line. Hitting the bottom of the page always
      // counts as reaching the last section.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = SECTION_IDS[SECTION_IDS.length - 1];

      setActive(current);
    };

    // Deferred rather than called here: a synchronous setState inside an effect
    // is a cascading render, and one frame later the layout has settled anyway.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [enabled]);

  return enabled ? active : null;
}

function useIsActive() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const activeSection = useActiveSection(onHome);

  return (href: string): "page" | "true" | undefined => {
    const hash = href.startsWith("/#") ? href.slice(2) : null;

    // A section link is current only while that section is under the header.
    // `aria-current="true"` rather than "page": the page has not changed.
    if (hash) return onHome && activeSection === hash ? "true" : undefined;

    // Home is current on the home page until the reader reaches a section.
    if (href === "/") return onHome && !activeSection ? "page" : undefined;

    return pathname === href || pathname.startsWith(`${href}/`)
      ? "page"
      : undefined;
  };
}

export function Header() {
  const isActive = useIsActive();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  // Escape to dismiss, and lock the page behind the full-screen menu.
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-md">
        <Container>
          <div className="flex h-16 items-center justify-between gap-4 lg:h-21">
            <Logo className="text-heading" />

            {/* Desktop nav */}
            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-2">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        aria-current={active}
                        className={cn(
                          "inline-flex items-center rounded-full px-3 py-1.5 text-sm transition-colors",
                          active
                            ? "bg-primary-soft font-medium text-accent"
                            : "text-body hover:text-heading",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Desktop actions */}
            <div className="hidden items-center gap-6 lg:flex">
              <ThemeToggle />

              {/* Plain <a>: LOGIN_HREF is the TDARS app on another host. */}
              <a
                href={LOGIN_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm text-sm font-medium text-accent hover:text-accent"
              >
                Log In
              </a>
              <Button href={REQUEST_ACCESS_HREF} className="px-7">
                Request Access
                <ArrowRightIcon className="size-4" />
              </Button>
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <Button href={REQUEST_ACCESS_HREF} size="sm">
                Request Access
              </Button>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                /* No border or rounding here — MenuIcon draws its own 34x34 frame. */
                className="inline-flex items-center justify-center text-body"
              >
                <MenuIcon className="size-[34px]" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      {/* Rendered as a sibling of <header>, not inside it: the header's
          `backdrop-blur` makes it a containing block, which would otherwise clip
          this `fixed inset-0` overlay to the height of the nav bar. */}
      {menuOpen ? (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 flex flex-col bg-surface lg:hidden"
        >
          <Container>
            <div className="flex h-16 items-center justify-between">
              <Logo onClick={closeMenu} className="text-heading" />
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                autoFocus
                /* No border — CloseIcon draws its own 34x34 frame, the
                   hamburger's twin, so the two swap without the header moving. */
                className="inline-flex items-center justify-center text-body"
              >
                <CloseIcon className="size-[34px]" />
              </button>
            </div>
          </Container>

          <Container className="flex-1 overflow-y-auto pt-6 pb-10">
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => {
                  const active = isActive(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        aria-current={active}
                        className={cn(
                          "inline-flex items-center rounded-full px-3 py-2 text-sm transition-colors",
                          active
                            ? "bg-primary-soft font-medium text-accent"
                            : "text-body",
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <a
              href={LOGIN_HREF}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-8 inline-block rounded-sm px-3 text-base font-semibold text-accent"
            >
              Log In
            </a>
          </Container>
        </div>
      ) : null}
    </>
  );
}
