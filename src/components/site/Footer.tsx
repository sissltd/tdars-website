import Link from "next/link";

import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
  XIcon,
} from "@/components/site/icons";
import { ContactForm } from "./ContactForm";
import { FOOTER_COLUMNS } from "./nav-links";

const SOCIALS = [
  { label: "TDARS on LinkedIn", href: "#", Icon: LinkedInIcon },
  { label: "TDARS on Facebook", href: "#", Icon: FacebookIcon },
  { label: "TDARS on WhatsApp", href: "#", Icon: WhatsAppIcon },
  { label: "TDARS on X", href: "#", Icon: XIcon },
  { label: "TDARS on Instagram", href: "#", Icon: InstagramIcon },
];

function ContactCard() {
  return (
    <div
      id="contact"
      className="scroll-mt-24 flex flex-col rounded-md border-2 border-footer-border bg-footer-card px-3 pt-3 pb-5 lg:justify-between lg:rounded-lg lg:p-5"
    >
      {/*
        The label, heading and form are ONE child of the card's space-between
        column; only the Privacy / Terms row is the second. Leaving all four as
        siblings made `justify-between` spread every one of them down the card,
        which is what blew out the gaps under "CONTACT US" and the heading.

        Inside, the frame's `top` block is Fill 526 x Hug 564 with a 32px gap.
      */}
      <div>
        <p className="text-base font-semibold text-primary-3">CONTACT US</p>

        {/* 526 x 88 — two lines, breaking after "assistance?". The max-width is
            the frame's own text box; without it the line breaks somewhere else. */}
        <h2 className="mt-8 max-w-[526px] font-heading text-h2 font-medium lg:text-h2-footer">
          <span className="text-muted">Looking for tailored assistance?</span>{" "}
          <span className="text-footer-foreground">
            Make a contact with our team.
          </span>
        </h2>

        {/*
          Wired to POST /api/v1/support/ through `app/api/support/route.ts`
          (17/09/2026). The form moved into `ContactForm` because it needs state
          and this footer is a server component; the markup is unchanged.
        */}
        <ContactForm />
      </div>

      {/*
          125px below the button at desktop. In the frame the card is
          `Fill 747 · space-between`, so this gap is what falls out of pinning
          this row to the bottom — measured rather than derived, because the
          column only stretches to 747 when the taller right-hand column says so.
        */}
      <div className="mt-10 flex items-center justify-between text-xs leading-[18px] text-footer-foreground lg:mt-0">
        <Link
          href="/privacy"
          className="rounded-sm hover:text-footer-foreground/70"
        >
          Privacy
        </Link>
        <Link
          href="/terms"
          className="rounded-sm hover:text-footer-foreground/70"
        >
          Terms and Conditions
        </Link>
      </div>
    </div>
  );
}

/*
  Yemi's footer frame (29/10/2026): the right column is the brand block (574 wide),
  the Menu / Company / Individual link row, then the socials and copyright.
  Address and phone are Body 2 in Gray 5; the description is Body 1 in Gray 4.
*/
function SiteInfo() {
  return (
    <div className="flex min-w-0 flex-col lg:justify-between">
      <div>
        <Logo
          href={null}
          className="text-footer-foreground"
          wordmarkClassName="text-2xl md:text-3xl"
          markClassName="h-8"
        />

        <address className="mt-3 text-sm leading-5 text-footer-foreground not-italic">
          <span className="block">483920, Abuja, Nigeria 22/2/5, Office 4</span>
          <a
            href="tel:+19998887766"
            className="mt-2 block w-fit rounded-sm hover:text-footer-foreground/70"
          >
            +1 (999) 888-77-66
          </a>
        </address>

        <p className="mt-6 max-w-[574px] text-base leading-6 text-footer-body">
          Secure digital records management and computer-based examinations. It
          helps organizations digitize, organize, manage, and retrieve records,
          while providing examination practice and assessment tools for
          institutions and individual candidates.
        </p>

        {/* 574 wide, three 153px columns spread space-between. */}
        <div className="mt-12 grid max-w-[574px] grid-cols-2 gap-x-6 gap-y-8 sm:flex sm:justify-between lg:mt-32">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading} className="sm:w-[153px]">
              <h3 className="text-base leading-6 font-semibold text-footer-foreground">
                {column.heading}
              </h3>
              <ul className="mt-2 flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="rounded-sm text-sm leading-5 text-footer-body hover:text-footer-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Pinned to the bottom of the column at desktop — the frame's space-between. */}
      <div className="mt-14 flex max-w-[574px] flex-wrap items-end justify-between gap-6 lg:mt-12">
        <ul className="grid grid-cols-2 gap-3 [--chip:32.73px]">
          {SOCIALS.map(({ label, href, Icon }, index) => (
            <li
              key={label}
              // The Figma stacks these 1 / 2 / 2, so LinkedIn sits alone on the
              // first row and Facebook opens a fresh one.
              className={cn(index === 1 && "col-start-1")}
            >
              <a
                href={href}
                aria-label={label}
                className="inline-flex size-[var(--chip)] items-center justify-center rounded-full border-[0.79px] border-footer-foreground text-footer-foreground hover:opacity-70"
              >
                <Icon className="size-4" />
              </a>
            </li>
          ))}
        </ul>

        <p className="text-right text-xs leading-[18px] text-footer-foreground">
          © 2025 — Copyright
          <br />
          All Rights reserved
        </p>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground">
      {/* 64px top/bottom; the 80px side gutter is Container's own. */}
      <Container className="py-8 lg:py-16">
        {/* Contact card + 574px info column, space-between across 1280. */}
        <div className="grid items-stretch gap-[60px] lg:grid-cols-[minmax(0,606fr)_minmax(0,574fr)] lg:gap-[100px]">
          <ContactCard />
          <SiteInfo />
        </div>
      </Container>
    </footer>
  );
}
