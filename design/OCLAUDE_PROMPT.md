# OClaude conversion prompt — TDARS marketing site

> Paste this into the VS Code terminal Claude (OClaude), scoped to this repo
> (`tdars-site`) on a dedicated branch with auto-accept edits. Do ONE page at a
> time; stop and let the reviewer check each against the screenshot before the next.

---

You are building the **TDARS public marketing website** — a fresh Next.js 16 app
(App Router, TypeScript strict, Tailwind v4, `src/` dir, import alias `@/*`). It is
a **static marketing site**: no auth, no app/dashboard logic, no API calls. The
source of truth is Yemi's Figma, exported as screenshots under `design/site/`.

## Absolute rules (do not violate)
1. **Use the design tokens, never hardcoded hex.** All colors/type/spacing come
   from `design/TOKENS.md` → wired into `src/app/globals.css` as Tailwind v4
   `@theme` tokens. Reference `bg-surface`, `text-heading`, etc. — NOT `bg-[#fff]`.
   If a value isn't in the tokens, add it to the token file first, then use it.
   (This is the #1 lesson from the app: hardcoded hex can't be themed or reskinned.)
2. **Don't invent the design system or content.** Match the screenshots exactly —
   layout, spacing, type sizes, copy. If a screen is ambiguous, leave a
   `{/* TODO(review): ... */}` and ask, don't guess.
3. **Mobile-first + responsive.** Every page has a `web/` and `mobile/` screenshot.
   Build the mobile layout first, then layer desktop with `md:`/`lg:` — match BOTH.
4. **No cross-project bleed.** This is the marketing site only. Do not import
   anything from `tdars-frontend` or reference the app's screens/components.
5. **Verify before moving on.** After each page: `npm run lint` and `npx tsc
   --noEmit` clean; the page renders at its route; it matches the screenshot at
   both breakpoints. Then stop for review.

## Build order
1. **Tokens + globals.css** — confirm `design/TOKENS.md` is wired into
   `src/app/globals.css` (colors, gradients, the fluid type ramp, radii, shadows,
   fonts). If `TOKENS.md` is missing, STOP and ask — do not extract/guess a palette.
2. **Shared shell** — `src/components/site/`: `Header`/nav (with mobile menu),
   `Footer`, `Button`, `Container`/`Section` wrappers, and the `app/layout.tsx`
   metadata (title/description/OpenGraph). Everything else composes from these.
3. **Pages** — one at a time, in `src/app/<route>/page.tsx`, each split into
   section components. Use `next/image` for all images, semantic HTML
   (`<header>/<main>/<section>/<footer>`), and accessible names on interactive
   elements. Keep copy verbatim from the Figma.

## Quality bar
- **SEO/meta** per page (title, description, canonical, OG image).
- **Accessibility**: heading order, alt text, focus states, `aria-label`s on icon
  buttons, colour-contrast from the tokens.
- **Performance**: `next/image` with sizes, no layout shift, lazy where sensible.
- **Responsive**: verify at ~375px (mobile screenshot) and ~1440px (web screenshot).

## Per-page loop
For page `X`:
1. Open `design/site/web/X-web.*` and `design/site/mobile/X-mobile.*`.
2. Build `src/app/X/page.tsx` + section components using tokens.
3. `npx tsc --noEmit` + `npm run lint` clean.
4. Report: route, components added, and anything ambiguous — then STOP for review.

Start with the shared shell (step 2) once tokens are confirmed. Ask before
inventing anything not visible in the screenshots.
