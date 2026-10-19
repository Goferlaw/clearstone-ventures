import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/editorial";
export const metadata: Metadata = {
  metadataBase: new URL("https://www.clearstone-ventures.com"),
  title: {
    default: "Clearstone Ventures LTD | Real Estate Investment & Acquisitions",
    template: "%s | Clearstone Ventures LTD",
  },
  description:
    "An emerging, privately held real estate investment and acquisition company.",
  robots: { index: true, follow: true },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Clearstone Ventures LTD",
              url: "https://www.clearstone-ventures.com",
              logo: "https://www.clearstone-ventures.com/clearstone-logo.png",
            }),
          }}
        />
      </body>
    </html>
  );
}
