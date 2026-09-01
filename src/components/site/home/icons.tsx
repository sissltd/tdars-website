import type { SVGProps } from "react";

/**
 * Home-only icons, traced from design/site/web/home-web1.png (trust strip) and the
 * product mock-ups in home-web7/home-web8. Kept out of the shared
 * `src/components/site/icons.tsx` so the shell stays untouched.
 *
 * Everything inherits `currentColor` — colour always comes from a text token.
 */
type IconProps = SVGProps<SVGSVGElement>;

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
