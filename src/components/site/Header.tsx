"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { ArrowRightIcon, CloseIcon, MenuIcon } from "./icons";
import { LOGIN_HREF, NAV_LINKS, REQUEST_ACCESS_HREF } from "./nav-links";

function useIsActive() {
  const pathname = usePathname();
  return (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
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
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "inline-flex items-center rounded-full px-3 py-1.5 text-sm transition-colors",
                          active
                            ? "bg-primary-soft font-medium text-primary"
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
              {/* Plain <a>: LOGIN_HREF is the TDARS app on another host. */}
              <a
                href={LOGIN_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm text-sm font-medium text-primary hover:text-primary-hover"
              >
                Log In
              </a>
              <Button href={REQUEST_ACCESS_HREF} className="px-7">
                Request Access
                <ArrowRightIcon className="size-4" />
              </Button>
            </div>

            {/* Mobile actions */}
            <div className="flex items-center gap-3 lg:hidden">
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
                className="inline-flex items-center justify-center text-text-2"
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
                className="inline-flex size-9 items-center justify-center rounded-md border border-border text-heading"
              >
                <CloseIcon className="size-5" />
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
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "inline-flex items-center rounded-full px-3 py-2 text-sm transition-colors",
                          active
                            ? "bg-primary-soft font-medium text-primary"
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
              className="mt-8 inline-block rounded-sm px-3 text-base font-semibold text-primary"
            >
              Log In
            </a>
          </Container>
        </div>
      ) : null}
    </>
  );
}
