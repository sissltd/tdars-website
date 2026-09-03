import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

// Inter — body / UI. Bricolage Grotesque — headings (matches the TDARS brand).
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

// TODO(review): confirm the production host. Taken from the browser chrome in
// design/site/mobile/home-mobile1.png, which shows "tdars.org".
const SITE_URL = "https://tdars.org";

const SITE_DESCRIPTION =
  "Digitize, manage and retrieve your records, run examination practices and conduct computer based examinations - all through TDARS.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "TDARS — One Secure Platform for Every Record That Matters",
    template: "%s · TDARS",
  },
  description: SITE_DESCRIPTION,
  applicationName: "TDARS",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "TDARS",
    url: "/",
    title: "TDARS — One Secure Platform for Every Record That Matters",
    description: SITE_DESCRIPTION,
    locale: "en_GB",
    // TODO(review): no 1200×630 OG image exists in the Figma export. Drop one in
    // and it goes here (or as src/app/opengraph-image.png).
  },
  twitter: {
    card: "summary_large_image",
    title: "TDARS — One Secure Platform for Every Record That Matters",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

/*
  Colours the browser chrome around the page — the address bar on Android, the
  status bar on iOS. Two entries keyed to the OS preference rather than one, so
  the chrome is never the opposite of the page.

  It keys off `prefers-color-scheme` because that is all a <meta> tag can do; the
  in-page toggle cannot drive it. A visitor whose OS is light but who chooses
  dark here gets light chrome. That is the honest limit of the tag, and it is
  still better than a single hardcoded colour.
*/
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /*
      `suppressHydrationWarning` is REQUIRED here, not optional tidying:
      next-themes writes `class="dark"` onto <html> from a blocking inline
      script before paint (which is what prevents a white flash), so the
      server-rendered markup and the first client render legitimately differ on
      this one element. Without it React logs a hydration mismatch on every load.
    */
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
