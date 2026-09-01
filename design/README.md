# TDARS marketing site — design → code workflow

This is the **public marketing website** (separate from `tdars-frontend`, the app).
Yemi's Figma is the source of truth. Conversion is done by **OClaude** (the VS Code
terminal Claude) one screen at a time, against extracted tokens, with review.

## Folders
- `design/site/web/` — desktop/tablet screenshots (one per page/section).
- `design/site/mobile/` — the matching mobile breakpoints (same pages).
- `design/TOKENS.md` — the extracted design system (produced from the screens
  **before** any screen is built). Colors, gradients, type ramp, spacing, radii,
  shadows → mapped to Tailwind v4 `@theme` tokens in `src/app/globals.css`.
- `design/OCLAUDE_PROMPT.md` — the conversion prompt to paste into the VS Code terminal.

## Order (don't skip)
1. **Dump screens** into `web/` + `mobile/` (name them by page: `home-web.png`,
   `home-mobile.png`, `pricing-web.png`, …).
2. **Extract tokens → `TOKENS.md`** and wire them into `globals.css` (this terminal
   can do this once screens land — don't let OClaude invent the design system).
3. **Build the shared shell first** (layout, header/nav, footer, buttons, section
   wrappers) — everything else composes from these.
4. **Then OClaude converts page-by-page**, mobile-first, matching both breakpoints,
   reviewing each against the screenshot before moving on.
