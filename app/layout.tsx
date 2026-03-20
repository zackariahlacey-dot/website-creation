import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyBar from "@/components/StickyBar";

export const metadata: Metadata = {
  metadataBase: new URL("https://vizulux.com"),
  title: {
    default: "Vizulux — Premium Web Design Vermont | Sites Built in Days",
    template: "%s | Vizulux",
  },
  description:
    "Custom, enterprise-grade websites for Vermont service businesses. Built on Next.js + Vercel. Launched in 1–3 days. Zero deposit until you approve it.",
  keywords: [
    "web design Vermont",
    "website designer Vermont",
    "small business website Vermont",
    "fast web design",
    "mobile detailer website",
    "contractor website",
    "Next.js web design",
    "Vizulux",
  ],
  authors: [{ name: "Vizulux", url: "https://vizulux.com" }],
  creator: "Vizulux",
  icons: {
    icon: "/images/vizuluxlogo.png",
    apple: "/images/vizuluxlogo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vizulux.com",
    siteName: "Vizulux",
    title: "Vizulux — Premium Web Design Vermont | Sites Built in Days",
    description:
      "Custom, enterprise-grade websites for Vermont service businesses. Zero deposit until you approve.",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vizulux — Premium Web Design Vermont",
    description: "Websites built in days, not months. Zero deposit until you approve.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#6C63FF",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-dark text-white antialiased">
        <Navbar />
        <main className="has-sticky-bar">{children}</main>
        <Footer />
        <StickyBar />
      </body>
    </html>
  );
}
