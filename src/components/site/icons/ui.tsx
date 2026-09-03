import type { SVGProps } from "react";

/*
  UI GLYPHS — every icon in this file inherits `currentColor`.

  This is one of exactly two icon files. The split is not arbitrary and matters
  for theming:

    ui.tsx     — single-colour glyphs. Colour comes from a text token on the
                 parent, so they follow light/dark automatically.
    brand.tsx  — fixed-palette illustrations. They keep their literal hex on
                 purpose and do NOT follow the theme.

  When adding an icon, ask which of those two it is. If it can be tinted from a
  text token, it belongs here.

  Everything is re-exported from `@/components/site/icons`, so call sites import
  from the folder rather than reaching into either file.
*/
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M12 20V4M6 10l6-6 6 6" />
    </svg>
  );
}

/**
 * The mobile menu button, from Yemi's export.
 *
 * Note this glyph DRAWS ITS OWN 34x34 rounded-rect border, so the button around
 * it must not add one of its own. It is also FILL-based (three bars of differing
 * length, indented top and bottom) rather than the even stroked rule the other
 * icons use — so it deliberately does not spread `base`.
 *
 * Yemi's export hardcodes #4D4D4D on both the rect and the bars; both are
 * swapped for `currentColor` so the control tints from a text token and can
 * invert. Same rule as the app's topbar icons.
 */
export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 34 34" fill="none" aria-hidden="true" {...props}>
      <rect
        x="0.5"
        y="0.5"
        width="33"
        height="33"
        rx="7.5"
        stroke="currentColor"
      />
      <path
        d="M8.25 17C8.25 16.586 8.586 16.25 9 16.25H25C25.414 16.25 25.75 16.586 25.75 17C25.75 17.414 25.414 17.75 25 17.75H9C8.586 17.75 8.25 17.414 8.25 17ZM11.25 10C11.25 9.586 11.586 9.25 12 9.25H22C22.414 9.25 22.75 9.586 22.75 10C22.75 10.414 22.414 10.75 22 10.75H12C11.586 10.75 11.25 10.414 11.25 10ZM12 23.25H22C22.414 23.25 22.75 23.586 22.75 24C22.75 24.414 22.414 24.75 22 24.75H12C11.586 24.75 11.25 24.414 11.25 24C11.25 23.586 11.586 23.25 12 23.25Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Closes the mobile menu. Yemi's export — the hamburger's twin, drawing the SAME
 * 34x34 rounded frame, so the two swap without the header shifting by a pixel.
 * Fill-based, `currentColor` in place of the export's #4D4D4D.
 */
export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 34 34" fill="none" aria-hidden="true" {...props}>
      <rect
        x="0.5"
        y="0.5"
        width="33"
        height="33"
        rx="7.5"
        stroke="currentColor"
      />
      <path
        d="M9.77151 9.29104C10.0528 9.00976 10.5078 9.00976 10.7891 9.29104L17.0003 15.5013L23.2115 9.29104C23.4928 9.00976 23.9478 9.00976 24.2291 9.29104C24.5104 9.57232 24.5104 10.0274 24.2291 10.3086L18.0189 16.5198L24.2291 22.731C24.5104 23.0123 24.5104 23.4674 24.2291 23.7486C23.9478 24.0299 23.4928 24.0299 23.2115 23.7486L17.0003 17.5384L10.7891 23.7486C10.5078 24.0299 10.0528 24.0299 9.77151 23.7486C9.49023 23.4674 9.49023 23.0123 9.77151 22.731L15.9817 16.5198L9.77151 10.3086C9.49023 10.0274 9.49023 9.57232 9.77151 9.29104Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ── Social marks (footer) ──────────────────────────────────────────────────
   Drawn as outlines to match the thin circular buttons in the Figma footer. */

export function LinkedInIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M6.94 5.5a1.94 1.94 0 1 1-3.88 0 1.94 1.94 0 0 1 3.88 0ZM3.4 8.9h3.2V19H3.4V8.9Zm5.3 0h3.06v1.38h.04c.43-.78 1.47-1.6 3.03-1.6 3.24 0 3.84 2.06 3.84 4.74V19h-3.2v-4.94c0-1.18-.02-2.7-1.68-2.7-1.68 0-1.94 1.29-1.94 2.62V19H8.7V8.9Z" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M14.3 21v-8.2h2.77l.41-3.2H14.3V7.55c0-.93.26-1.56 1.6-1.56h1.7V3.13A23.3 23.3 0 0 0 15.1 3c-2.46 0-4.15 1.5-4.15 4.26V9.6H8.18v3.2h2.77V21h3.35Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M12.04 3a8.94 8.94 0 0 0-7.6 13.66L3 21.5l4.98-1.4A8.94 8.94 0 1 0 12.04 3Zm0 1.6a7.34 7.34 0 1 1-3.85 13.6l-.28-.17-2.72.76.73-2.68-.18-.29A7.34 7.34 0 0 1 12.04 4.6Zm-3.1 3.5c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.19.86 2.33.98 2.49.12.16 1.68 2.68 4.16 3.65 2.06.8 2.48.64 2.93.6.45-.04 1.44-.58 1.65-1.15.2-.57.2-1.05.14-1.15-.06-.1-.22-.16-.46-.28-.24-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.54.12-.16.24-.62.79-.76.95-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.95-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.32-.73-1.8-.19-.47-.38-.4-.53-.41h-.57Z" />
    </svg>
  );
}

export function XIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M17.2 4h2.7l-5.9 6.74L21 20h-5.44l-4.26-5.57L6.42 20H3.7l6.31-7.2L3.3 4h5.58l3.85 5.09L17.2 4Zm-.95 14.4h1.5L8.03 5.52h-1.6L16.25 18.4Z" />
    </svg>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      {...props}
    >
      <path d="M12 3.6c2.73 0 3.06.01 4.14.06 1 .05 1.54.21 1.9.35.48.19.82.41 1.18.77.36.36.58.7.77 1.18.14.36.3.9.35 1.9.05 1.08.06 1.4.06 4.14s-.01 3.06-.06 4.14c-.05 1-.21 1.54-.35 1.9a3.2 3.2 0 0 1-.77 1.18c-.36.36-.7.58-1.18.77-.36.14-.9.3-1.9.35-1.08.05-1.4.06-4.14.06s-3.06-.01-4.14-.06c-1-.05-1.54-.21-1.9-.35a3.2 3.2 0 0 1-1.18-.77 3.2 3.2 0 0 1-.77-1.18c-.14-.36-.3-.9-.35-1.9-.05-1.08-.06-1.4-.06-4.14s.01-3.06.06-4.14c.05-1 .21-1.54.35-1.9.19-.48.41-.82.77-1.18.36-.36.7-.58 1.18-.77.36-.14.9-.3 1.9-.35C8.94 3.61 9.27 3.6 12 3.6Zm0 4.72a3.68 3.68 0 1 0 0 7.36 3.68 3.68 0 0 0 0-7.36Zm0 6.07a2.39 2.39 0 1 1 0-4.78 2.39 2.39 0 0 1 0 4.78Zm4.69-6.22a.86.86 0 1 1-1.72 0 .86.86 0 0 1 1.72 0Z" />
    </svg>
  );
}

/*
  Trust-strip glyphs, from Yemi's exports. Each hardcodes #646464 on every path;
  all swapped for `currentColor` so the row tints from a text token — same rule
  as the app's topbar icons. Stroke weight is 1.5 in the exports, not `base`'s
  1.75, so it is set per-icon.
*/
export function TenantIsolatedIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...base}
      strokeWidth={1.5}
      {...props}
    >
      <path d="M13.0095 2.92031L18.9095 5.54031C20.6095 6.29031 20.6095 7.53031 18.9095 8.28031L13.0095 10.9003C12.3395 11.2003 11.2395 11.2003 10.5695 10.9003L4.66953 8.28031C2.96953 7.53031 2.96953 6.29031 4.66953 5.54031L10.5695 2.92031C11.2395 2.62031 12.3395 2.62031 13.0095 2.92031Z" />
      <path d="M3 11C3 11.84 3.63 12.81 4.4 13.15L11.19 16.17C11.71 16.4 12.3 16.4 12.81 16.17L19.6 13.15C20.37 12.81 21 11.84 21 11" />
      <path d="M3 16C3 16.93 3.55 17.77 4.4 18.15L11.19 21.17C11.71 21.4 12.3 21.4 12.81 21.17L19.6 18.15C20.45 17.77 21 16.93 21 16" />
    </svg>
  );
}

export function AuditableIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...base}
      strokeWidth={1.5}
      {...props}
    >
      <path d="M14 4.5H21" />
      <path d="M14 9.5H21" />
      <path d="M3 14.5H21" />
      <path d="M3 19.5H21" />
      <path d="M9.5 8.43V5.57C9.5 4.45 9.05 4 7.92 4H5.07C3.95 4 3.5 4.45 3.5 5.57V8.42C3.5 9.55 3.95 10 5.07 10H7.92C9.05 10 9.5 9.55 9.5 8.43Z" />
    </svg>
  );
}

export function CloudDeploymentIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...base}
      strokeWidth={1.5}
      strokeMiterlimit={10}
      {...props}
    >
      <path d="M21.8995 13.9607C22.1695 15.6307 21.6995 17.4207 20.2695 18.6807C19.2795 19.5907 17.9795 20.0907 16.6295 20.0807H5.53945C0.869454 19.7407 0.859454 12.9407 5.53945 12.6007H5.58945C3.39945 6.47071 9.08945 2.87071 13.3795 4.25071" />
      <path d="M7.25984 13.0096C6.73984 12.7496 6.16984 12.6096 5.58984 12.5996" />
      <path d="M21.9707 8.5C21.9707 9.6 21.4607 10.59 20.6507 11.23C20.0607 11.71 19.2907 12 18.4707 12C16.5407 12 14.9707 10.43 14.9707 8.5C14.9707 7.54 15.3607 6.67 16.0007 6.04V6.03C16.6307 5.39 17.5107 5 18.4707 5C20.4007 5 21.9707 6.57 21.9707 8.5Z" />
    </svg>
  );
}

const stroked = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/** Trust strip — "Tenant-isolated": three stacked plates. */
export function LayersIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroked} {...props}>
      <path d="M12 3.5 3 8l9 4.5L21 8l-9-4.5Z" />
      <path d="m3 12.5 9 4.5 9-4.5" />
      <path d="m3 16.75 9 4.5 9-4.5" />
    </svg>
  );
}

/** Trust strip — "Auditable": a record card, one field plus two ruled lines. */
export function RecordLinesIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroked} {...props}>
      <rect x="3" y="4" width="6" height="5" rx="1.5" />
      <path d="M12 5.5h9M12 8h6" />
      <path d="M3 13.5h18M3 17.5h13" />
    </svg>
  );
}

/** Trust strip — "Cloud / on-premises / air-gapped": a cloud with a detached node. */
export function CloudNodeIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroked} {...props}>
      <path d="M16 18.5H7a4 4 0 0 1-.4-7.98A5.5 5.5 0 0 1 16.9 9.4" />
      <circle cx="18.5" cy="7.5" r="2.75" />
    </svg>
  );
}

/* ── Product mock-up icons (home-web7 / home-web8) ────────────────────────── */

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroked} {...props}>
      <path d="m9 5 7 7-7 7" />
    </svg>
  );
}

/** Green tick used against each permitted policy row. */
export function CheckCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroked} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.2 2.6 2.6L16 9.4" />
    </svg>
  );
}

/** Rust minus used against "Delete record — Not permitted". */
export function MinusCircleIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroked} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.25 12h7.5" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroked} {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

/** Back / previous. The mirror of ArrowRightIcon, drawn rather than rotated so
    it can sit inline with text without a transform. */
export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M19 12H5m0 0 6-6m-6 6 6 6" />
    </svg>
  );
}

/** Dismiss, ringed. Distinct from CloseIcon, which draws the mobile menu's
    34x34 framed button. */
export function CircleCloseIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      {...base}
      strokeWidth={1.5}
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m9 9 6 6m0-6-6 6" />
    </svg>
  );
}

/** Light mode is active — offer dark. */
export function MoonIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

/** Dark mode is active — offer light. */
export function SunIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

/*
  The wave texture stroked across the "Ready to go digital" card.

  An SVG <pattern> rather than an export: it stays crisp at any width and costs
  ~300 bytes, where a PNG would band on these shallow curves and need a 2x
  variant. Purely decorative, so it is aria-hidden and sits behind the content.
*/
export function WaveTexture() {
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full text-cta-wave opacity-[0.08]"
    >
      <defs>
        <pattern
          id="cta-wave"
          width="40"
          height="11"
          patternUnits="userSpaceOnUse"
        >
          {/* One cycle. `T` mirrors the control point, so tiles meet seamlessly. */}
          <path
            d="M0 5.5Q10 2 20 5.5T40 5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.39"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cta-wave)" />
    </svg>
  );
}
