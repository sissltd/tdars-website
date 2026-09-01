import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

/**
 * The marketing shell: sticky nav, page content, dark footer. Every public page
 * lives under this group. `/request-access` sits outside it on purpose — its
 * Figma frame is a bare full-page form with its own "Close" affordance.
 */
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
