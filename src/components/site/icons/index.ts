/*
  The single import surface for every icon on the site.

  Two files sit behind this barrel, split by whether an icon can be tinted:

    ui.tsx     `currentColor` glyphs — follow light/dark automatically
    brand.tsx  fixed-palette illustrations — deliberately do not

  Call sites import from "@/components/site/icons" and never reach into either
  file directly, so an icon can move between them without touching call sites.
*/
export * from "./ui";
export * from "./brand";
