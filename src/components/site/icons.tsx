import type { SVGProps } from "react";

/**
 * Inline icons traced from the Figma screenshots. All of them inherit
 * `currentColor` so colour always comes from a text token on the parent.
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

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...base} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
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
