import Link from "next/link";

import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Container } from "./Container";
import { Logo } from "./Logo";
import {
  ChevronDownIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
  XIcon,
} from "@/components/site/icons";
import { FOOTER_LINKS } from "./nav-links";

const LANGUAGES = ["Eng", "Yor", "Igb", "Hau", "Fre"];

const SOCIALS = [
  { label: "TDARS on LinkedIn", href: "#", Icon: LinkedInIcon },
  { label: "TDARS on Facebook", href: "#", Icon: FacebookIcon },
  { label: "TDARS on WhatsApp", href: "#", Icon: WhatsAppIcon },
  { label: "TDARS on X", href: "#", Icon: XIcon },
  { label: "TDARS on Instagram", href: "#", Icon: InstagramIcon },
];

const fieldClass =
  "h-11 w-full rounded-md bg-surface-subtle px-3 text-sm text-heading placeholder:text-muted";

const labelClass = "mb-1.5 block text-sm font-medium text-footer-foreground";

function RequiredMark() {
  return (
    <span aria-hidden="true" className="text-accent">
      {" "}
      *
    </span>
  );
}

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
          TODO(review): this form has no endpoint — the brief is a static marketing
          site with no API calls, and the Figma has no success/error state for it
          (unlike Request access). Left as a plain, unwired form; tell me where the
          submission should go and I will wire it up.

          The name field is RESPONSIVE, not inconsistent between frames: the
          desktop footer is one "Full Name" beside "Email Address", while the
          mobile footer stacks separate "First Name" and "Last Name". Both are
          rendered and swapped at `lg`.
        */}
        <form className="mt-8 space-y-4">
          {/*
            Mobile: First Name and Last Name as separate stacked fields.
            Desktop: a single Full Name beside Email Address.

            Both are in the markup and swapped at `lg` rather than one being
            relabelled, because they are genuinely different fields — a desktop
            submission carries `name`, a mobile one carries `firstName` +
            `lastName`. `hidden` also removes them from the tab order and from the
            form's submitted values, so the inactive pair cannot post empty
            strings alongside the active one.
          */}
          <div className="grid gap-4 lg:hidden">
            <div>
              <label htmlFor="footer-first-name" className={labelClass}>
                First Name
                <RequiredMark />
              </label>
              <input
                id="footer-first-name"
                name="firstName"
                type="text"
                placeholder="Placeholder"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="footer-last-name" className={labelClass}>
                Last Name
                <RequiredMark />
              </label>
              <input
                id="footer-last-name"
                name="lastName"
                type="text"
                placeholder="Placeholder"
                className={fieldClass}
              />
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="hidden lg:block">
              <label htmlFor="footer-name" className={labelClass}>
                Full Name
                <RequiredMark />
              </label>
              <input
                id="footer-name"
                name="name"
                type="text"
                placeholder="Placeholder"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="footer-email" className={labelClass}>
                Email Address
                <RequiredMark />
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                required
                placeholder="Placeholder"
                className={fieldClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="footer-phone" className={labelClass}>
              Phone Number
              <RequiredMark />
            </label>
            <div className="flex w-full overflow-hidden rounded-md bg-surface-subtle sm:w-2/3">
              <div className="relative flex shrink-0 items-center border-r border-border">
                <select
                  id="footer-phone-country"
                  name="phoneCountry"
                  aria-label="Country dialling code"
                  className="h-11 appearance-none bg-transparent pr-8 pl-3 text-sm text-heading"
                >
                  <option value="US">US</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-2 size-4 text-heading" />
              </div>
              <input
                id="footer-phone"
                name="phone"
                type="tel"
                required
                placeholder="Placeholder"
                className="h-11 w-full bg-transparent px-3 text-sm text-heading placeholder:text-muted"
              />
            </div>
          </div>

          <div>
            <label htmlFor="footer-message" className={labelClass}>
              Message
              <RequiredMark />
            </label>
            <textarea
              id="footer-message"
              name="message"
              required
              rows={4}
              placeholder="Enter your message here"
              className="w-full resize-y rounded-md bg-surface-subtle p-3 text-sm text-heading placeholder:text-muted"
            />
          </div>

          <Button type="submit" fullWidth className="mt-2">
            Send Message
          </Button>
        </form>
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

function SiteInfo() {
  return (
    <div className="flex flex-col">
      <Logo
        href={null}
        className="text-footer-foreground"
        wordmarkClassName="text-2xl md:text-3xl"
        markClassName="h-8"
      />

      <p className="mt-5 max-w-[478px] text-base leading-6 text-footer-body">
        Secure digital archive and career dossier systems engineered
        specifically for national agencies, military commands, and security
        structures.
      </p>

      <ul className="mt-5 flex flex-wrap gap-x-10 gap-y-2">
        {FOOTER_LINKS.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="rounded-sm text-base leading-6 font-semibold text-on-rust-body hover:opacity-80"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {/*
        Contact Us and Location are ONE block in the frame — 632 x 200 with
        space-between — NOT two siblings separated by a gap. That block sits
        120px below the Platform./Solutions./How it works. block above it, and
        145px above the social row below it. Treating them as siblings put the
        spacing between them instead of around them.
      */}
      <div className="mt-12 lg:mt-[120px] lg:flex lg:h-[200px] lg:flex-col lg:justify-between">
        <div>
          <h3 className="text-base leading-6 font-semibold text-footer-foreground">
            Contact Us
          </h3>
          <address className="mt-3 text-sm leading-relaxed text-footer-foreground not-italic">
            <a
              href="tel:+19998887766"
              className="block rounded-sm hover:text-footer-foreground/70"
            >
              +1 (999) 888-77-66
            </a>
            <a
              href="mailto:hello@cK.com"
              className="block rounded-sm hover:text-footer-foreground/70"
            >
              hello@cK.com
            </a>
          </address>
        </div>

        {/* Location left / Languages right stays side-by-side on mobile too — see
            design/site/mobile/home-mobile21.png. */}
        <div className="mt-10 flex items-start justify-between gap-6 lg:mt-0">
          <div>
            <h3 className="text-base leading-6 font-semibold text-footer-foreground">
              Location
            </h3>
            <address className="mt-3 text-sm leading-relaxed text-footer-foreground not-italic">
              483920, Abuja, Nigeria
              <br />
              22/2/5, Office 4
            </address>
          </div>

          <div className="text-right">
            <h3 className="text-xs text-footer-foreground">Languages</h3>
            <ul className="mt-3 flex gap-3 text-sm whitespace-nowrap text-footer-foreground md:gap-4">
              {LANGUAGES.map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 145px below the address at desktop — the same space-between result on the
          right-hand column. */}
      <div className="mt-14 flex flex-wrap items-end justify-between gap-6 lg:mt-[145px]">
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
        {/* 566 + 82 + 632 = 1280 — space-between, not an even split. */}
        <div className="grid items-stretch gap-[60px] lg:grid-cols-[566fr_632fr] lg:gap-[82px]">
          <ContactCard />
          <SiteInfo />
        </div>
      </Container>
    </footer>
  );
}
