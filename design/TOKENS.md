# TDARS marketing site — design tokens

Extracted from Yemi's Figma inspector (the screenshots in `design/site/`). Wired
into `src/app/globals.css` as Tailwind v4 `@theme` tokens. **Components reference
these tokens, never raw hex** (the #1 rule — see `OCLAUDE_PROMPT.md`).

## Fonts
- **Headings** → **Bricolage Grotesque** (`--font-heading`). H1 = Bold 700, H4 = SemiBold 600.
- **Body / UI** → **Inter** (`--font-sans`). Body 1/Regular, Body/Regular (14px/20px), Body 1/Medium 500.
- Figma has a **"Mobile" typography mode** → headings step down on small screens (mobile-first).

## Colors (exact from inspector)
| Token | Hex | Figma name | Used for |
|---|---|---|---|
| `--color-primary` | `#B93A2C` | Primary/Primary 1 | CTAs, active nav, links, accents |
| `--color-heading` | `#373737` | Gray/Gray 1 | headings, primary text |
| `--color-body` | `#4D4D4D` | Gray/Gray 2 | body / descriptions |
| `--color-border` | `#E6E6E6` | Gray/Gray 4 | borders, dividers, nav underline, inputs |
| `--color-surface` | `#FFFFFF` | — | cards, nav (at 80% opacity) |
| `--color-surface-subtle` | `#F8F8F8` | — | section backgrounds, mockup frame |
| `--color-footer` | `#151515` | — | footer / contact section bg |
| `--color-footer-foreground` | `#FFFFFF` | — | footer text |
| `--color-cta-border` | `#334155` | — | rust CTA card border (mobile) |
| `--color-success` | `#0E9F6E` | — | "Request submitted" check |

## Colors added during build (sampled from the screenshots)
These are values the screens clearly use but that weren't in the first inspector pass.
Each was read straight off the PNGs (solid-fill pixel histograms), not guessed.

| Token | Hex | Sampled from | Used for |
|---|---|---|---|
| `--color-primary-soft` | `#FAECEB` | `web1` active "Home" nav pill, `web4` "Mock Exams & CBT" pill | section eyebrow pills, active nav pill |
| `--color-primary-wash` | `#FDF7F7` | `web9` "Talk to our team" button | light button surface sitting on the rust CTA |
| `--color-gray-3` (`--color-muted`) | `#999999` | `web5` "01" step numerals, chip labels, input placeholders | step numerals, chips, placeholder text |
| `--color-dark-panel` | `#2D2D2D` | `web3` "How it works" card, `web8` "Still running on paper" section | the two dark panels (NOT the footer — that is `#151515`) |
| `--color-footer-card` | `#1A1A1A` | `web10` contact card inside the footer | contact-form card on the footer background |
| `--color-success-soft` | `#CDFFCC` | request-access success modal | halo behind the "Request submitted" check |

Derived, so deliberately **not** new tokens:
- Disabled `Submit` on Request access samples `#EAC4C1` = `--color-primary` at **30 %** → `bg-primary/30`.
- Eyebrow-pill border samples `#CEACAB` = `--color-primary` at ~**30 %** → `border-primary/30`.
- Card borders sample `#ECECEC`, i.e. `--color-border` rendered at 1 px → `border-border`.

> Note: large flat areas the inspector calls `#F8F8F8` render as `#FAFAFA` in the PNG
> exports. The 2/255 delta is invisible; `--color-surface-subtle` keeps the inspector
> value `#F8F8F8`. **TODO(review)** if the exact export value matters.
>
> Note: the success check in the Figma frame is an illustration and strokes `#008500`,
> not the inspector's `--color-success` `#0E9F6E`. **TODO(review)** — flagged again where
> the modal is built.

## Radii
- Buttons: **12px** (`--radius-md`). Cards: 12px (success) → **20px** (CTA). Phone-frame 13px.
- Large panels: **32px** (`--radius-xl`) — the dark "How it works" card (`web3`) and the rust
  "Ready to go digital?" card (`web9`) both measure ~36px at 1440 and ~20px on mobile, so they
  are `rounded-lg lg:rounded-xl`.

## Colors checked during the Home build
Pixel histograms over the Home frames, for the record:

| Frame | Region | Sampled | Maps to |
|---|---|---|---|
| `web1` | trust strip band | `#FAFAFA` | `--color-surface-subtle` |
| `web1` | hero wash, top-centre | `#F0F5FB` | `--gradient-hero` (models `#EEF5FD`) |
| `web2`, `web4`, `web9` | section background | `#FFFFFF` | `--color-surface` |
| `web3`, `web8`, `mobile15` | dark panels | `#2D2D2D` | `--color-dark-panel` |
| `web6`, `web7` | section background **and** the audience cards | `#FAFAFA` | `--color-surface-subtle` |
| `web9`, `mobile18` | CTA card, wave crests | `#B53A2D` | `--color-primary` |

Two findings from that sweep:
- The "Who is TDARS built for?" cards have **no fill** — card and section both sample `#FAFAFA`.
  They are outlined only (`border-border`), sitting on the subtle band.
- The CTA card's flat areas sample `#AB3A2A`–`#AE382A`, ~10 % darker than `--color-primary`.
  That is the wavy texture overlay, not a different fill: the crests sample `#B53A2D` = primary.
  **TODO(review)** — the wave pattern is an unexported Figma asset; the card ships flat rust.
- `--color-cta-border` (`#334155`) is **not** visible on the Home CTA card in either frame — the
  mobile edge goes white → rust with no slate line. Left off here. **TODO(review)** if it belongs.

## Layout (desktop)
- Top navbar: **84px** tall, bottom border `#E6E6E6`, padding **20 / 80 / 16 / 80**, `justify-between`.
- Footer: padding **64 / 80**, dark `#151515`, `justify-between`.
- Content container: max ~**1440px**, side padding **80px** desktop → tighter (≈20px) on mobile.

### Measured back off the screenshots
Scale was solved per screenshot from its own page bounds, then cross-checked
(`web1`: page spans 1128 px for a 1440 frame → 0.783; the H1 then lands at 81.7 px
from the edge, confirming the documented 80 px gutter).

- Desktop gutter **80px** (`lg:px-20`) · mobile gutter **16px** (`px-4`), not 20 —
  `mobile2` and `mobile21` both measure 15.8–16.0 px. TOKENS' "≈20px" was approximate.
- Navbar **84px** desktop (`h-21`) · **64px** mobile (`h-16`).
- Nav "Request Access" button **48px** tall × ~208px wide desktop (84 − 20 − 16 = 48 ✓).
- Container max width **1440px** → `--container-site`.

## Content (verbatim from Figma — don't rewrite)
- Nav: **Home · Solutions · How it works · Blog · Contact Us** · **Log In** · **Request Access →**.
- Hero H1: **"One Secure Platform for Every Record That Matters"**.
- Hero sub: "Digitize, manage and retrieve your records, run examination practices and conduct computer based examinations - all through TDARS".
- Hero form: "Enter your work email to get started *" → **Get Started**.
- Trust strip: Designed for controlled environments · Tenant-isolated · Auditable · Cloud / on-premises / air-gapped.
- CTA card: "Get started" · **"Ready to go digital?"** · "Replace paper files and scattered spreadsheets with a secure, searchable archive your whole organisation can trust." · **Talk to our team**.
- Footer tagline: "Secure digital archive and career dossier systems engineered specifically for national agencies, military commands, and security structures."
- Footer contact: +1 (999) 888-77-66 · hello@cK.com · Location: 483920, Abuja, Nigeria, 22/2/5, Office 4 · Languages: Eng / Yor / Igb / Hau / Fre · © 2025 Copyright.
- Request-success modal: "Request submitted" / "Thank you for your interest in TDARS. Our team will review your request and reach out within 2 business days to schedule a walkthrough." (auto-navigates after 1200ms).
- Also full pages: **Terms and Conditions** (H1 Bricolage, "Last updated 31st July, 2026", numbered sections).

## Provisional / confirm against screens
- Exact H1/H4/Body **px sizes** per breakpoint are read per-element from the Figma
  H1/H4/Body/Body1 styles (Bricolage for H*, Inter for Body) — set them from the
  screenshots as each section is built; don't guess a global scale.
  Measured so far (from glyph ascender bands ÷ per-screenshot scale):
  - **H1** — mobile `32px / 37px`, desktop `60px / 72px`, Bricolage Bold 700
    → `--text-h1`, `--text-h1-lg`.
  - **H2** (section headings: "Four modules…", "Access controls…", "Still running on paper?")
    — mobile `28px / 34px`, desktop `36px / 44px`, Bricolage Bold 700
    → `--text-h2`, `--text-h2-lg`.
  - **H3** (column headings: "Practice with TDARS Mock…", "Capture from anywhere")
    — mobile `18px / 26px`, desktop `20px / 28px`, Bricolage SemiBold 600
    → `--text-h3`, `--text-h3-lg`.
  - **H4** (card titles: "Scan", "Government", "Capture") — `18px / 24px` at both breakpoints,
    Bricolage SemiBold 600 → `--text-h4`.
  - **Display** (the rust CTA "Ready to go digital?") — mobile `32px / 38px`, desktop
    `54px / 60px`. Smaller than H1 on desktop: it sets 26.9 px/char against the hero H1's
    29.8 px/char at the same 1440 scale → `--text-display`, `--text-display-lg`.
  - **Micro** — `11px / 16px`, Inter. The audience chips (`web6`) and every label inside
    the two product mock-ups (`web7`, `web8`) measure 11px; Tailwind's smallest default
    is 12px and the mock-up's "Export documents · Named approvers only" row does not fit
    its 317px column at that size → `--text-micro`.
  - **Body** follows the Figma "Mobile" typography mode: section intros are `16px` at both
    breakpoints, but card/list copy steps **down** from `16px` mobile to `14px` desktop
    (Body 1/Regular → Body/Regular). Rendered with Tailwind's `text-base` / `lg:text-sm`
    rather than new tokens, matching the shared shell.
  More sizes get added here as each page lands.
- Hero background is a very light gradient. Sampling `web1` shows it is **not**
  near-white → `#F8F8F8` but a cool wash: white at the edges, peaking at `#EEF5FD`
  top-centre (x ≈ 450–700) and back to white by the bottom of the hero. Modelled as
  `--gradient-hero`, a top-centred radial. **TODO(review)** — exact Figma stops.
