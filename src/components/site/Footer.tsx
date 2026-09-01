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
} from "./icons";
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
    <span aria-hidden="true" className="text-primary">
      {" "}
      *
    </span>
  );
}

function ContactCard() {
  return (
    <div className="rounded-md border border-white/10 bg-footer-card p-5 md:p-8">
      <p className="text-xs font-medium tracking-widest text-footer-foreground uppercase">
        Contact us
      </p>

      <h2 className="mt-4 font-heading text-2xl leading-snug font-semibold md:text-3xl">
        <span className="text-white/50">Looking for tailored assistance?</span>{" "}
        <span className="text-footer-foreground">Make a contact with our team.</span>
      </h2>

      {/*
        TODO(review): this form has no endpoint — the brief is a static marketing
        site with no API calls, and the Figma has no success/error state for it
        (unlike Request access). Left as a plain, unwired form; tell me where the
        submission should go and I will wire it up.

        TODO(review): the Home frame (home-web10) splits this into First Name /
        Last Name, while the Terms and Blog frames (home-web-T&C5,
        home-web-Blog-page4) use a single "Full Name". Using the two-frame
        majority — confirm which is canonical.
      */}
      <form className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="footer-name" className={labelClass}>
              Full Name
              <RequiredMark />
            </label>
            <input
              id="footer-name"
              name="name"
              type="text"
              required
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

      <div className="mt-10 flex items-center justify-between text-sm text-footer-foreground">
        <Link href="/privacy" className="rounded-sm hover:text-white/70">
          Privacy
        </Link>
        <Link href="/terms" className="rounded-sm hover:text-white/70">
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

      <p className="mt-5 max-w-md text-sm leading-relaxed text-footer-foreground">
        Secure digital archive and career dossier systems engineered specifically for
        national agencies, military commands, and security structures.
      </p>

      <ul className="mt-5 flex flex-wrap gap-x-10 gap-y-2">
        {FOOTER_LINKS.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="rounded-sm text-sm font-semibold text-footer-foreground hover:text-white/70"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <h3 className="mt-12 text-sm font-semibold text-footer-foreground">Contact Us</h3>
      <address className="mt-3 text-sm leading-relaxed text-footer-foreground not-italic">
        <a href="tel:+19998887766" className="block rounded-sm hover:text-white/70">
          +1 (999) 888-77-66
        </a>
        <a href="mailto:hello@cK.com" className="block rounded-sm hover:text-white/70">
          hello@cK.com
        </a>
      </address>

      {/* Location left / Languages right stays side-by-side on mobile too — see
          design/site/mobile/home-mobile21.png. */}
      <div className="mt-10 flex items-start justify-between gap-6">
        <div>
          <h3 className="text-sm font-semibold text-footer-foreground">Location</h3>
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

      <div className="mt-14 flex flex-wrap items-end justify-between gap-6">
        <ul className="grid grid-cols-2 gap-3">
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
                className="inline-flex size-8 items-center justify-center rounded-full border border-white/30 text-footer-foreground hover:border-white/70"
              >
                <Icon className="size-4" />
              </a>
            </li>
          ))}
        </ul>

        <p className="text-right text-xs leading-relaxed text-footer-foreground">
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
      <Container className="py-12 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <ContactCard />
          <SiteInfo />
        </div>
      </Container>
    </footer>
  );
}
