import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vizulux | Architectural Web Design & SEO Vermont",
  description: "High-converting digital engines for clinicians, contractors, and real estate professionals in Vermont. Zero upfront cost. Pay on launch.",
  metadataBase: new URL('https://vizulux.com'),
  icons: {
    icon: '/vizulux.png?v=4',
    shortcut: '/vizulux.png?v=4',
    apple: '/vizulux.png?v=4',
  },
  openGraph: {
    title: "Vizulux | Architectural Web Design Vermont",
    description: "Boutique digital architecture for elite Vermont businesses. We build the engines that win market share.",
    url: 'https://vizulux.com',
    siteName: 'Vizulux',
    images: [
      {
        url: '/vizulux.png',
        width: 1200,
        height: 630,
        alt: 'Vizulux | Digital Architecture',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vizulux | Architectural Web Design Vermont',
    description: 'High-performance digital real estate. Built for the future of search.',
    images: ['/vizulux.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Vizulux',
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
