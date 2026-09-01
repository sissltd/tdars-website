import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";

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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bricolage.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
