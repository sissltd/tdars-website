import { cn } from "@/lib/cn";

/*
  TODO(review): MISSING ASSETS.

  Three icon families on Home are multi-colour illustration assets in Yemi's Figma
  and were not part of the `design/site/` export, so there is nothing to trace:

  1. The four module icons — Scan (indigo), Records (cyan), Mock Exam (teal),
     CBT (indigo laptop)                                        → home-web2
  2. The ten Mock Exam / CBT feature icons — practice card, book, scorecard,
     pie chart, bulb, clipboard, bookmark, shield-tick, monitor, pencil
                                                                → home-web4
  3. The six audience icons — government building (green), shield-key (blue),
     dollar circle (purple), briefcase (tan), heart (red), mortar board (blue)
                                                                → home-web6

  Rather than invent them, every slot renders this token-coloured tile at the exact
  size the frame draws the icon. Export the icons (SVG, 1× is fine) into
  `public/images/icons/` and each `<IconPlaceholder>` swaps for an `<Image>`.

  Decorative only — the visible label always sits beside it, so it is aria-hidden.
*/
type IconPlaceholderProps = {
  /** Sizing utility, e.g. `size-8`. Defaults to the 32px module-icon box. */
  className?: string;
};

export function IconPlaceholder({ className }: IconPlaceholderProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-block shrink-0 rounded-md border border-primary/30 bg-primary-soft",
        className ?? "size-8",
      )}
    />
  );
}
