"use client";

import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

/**
 * Light/dark theming, matched to the application (tdars-frontend) so the two
 * products behave identically:
 *
 *   attribute="class"     — next-themes puts `class="dark"` on <html>, which is
 *                           what `@custom-variant dark` in globals.css keys off.
 *   defaultTheme="light"  — the design is drawn light; that is the default.
 *   enableSystem={false}  — a deliberate choice, not an oversight. The app does
 *                           not follow the OS setting either, so a visitor who
 *                           picks light here and signs in does not get flipped.
 *   disableTransitionOnChange — without it every colour-transitioned element on
 *                           the page animates at once when the theme flips,
 *                           which reads as a slow smear rather than a switch.
 */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
