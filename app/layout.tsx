import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react"
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Tech Alchemy Lab | Digital Solutions for African Businesses",
    template: "%s | The Tech Alchemy Lab",
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "Keketso Leu", url: "https://github.com/keketsoleu25" }],
  creator: "Keketso Leu",
  publisher: SITE_NAME,
  category: "technology",
  keywords: [
    "web development Johannesburg",
    "South African full-stack developer",
    "Next.js developer South Africa",
    "digital agency Johannesburg",
    "custom business websites",
    "CRM development",
    "The Tech Alchemy Lab",
    "Keketso Leu",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "/",
    siteName: SITE_NAME,
    title: "The Tech Alchemy Lab | Turning Code into Digital Gold",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "The Tech Alchemy Lab | Turning Code into Digital Gold",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#070806",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-ZA">
      <body>
        <div className="site-frame">
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
