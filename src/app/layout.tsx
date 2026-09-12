import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { GridOverlay } from "@/components/global/grid-overlay";
import { GrainOverlay } from "@/components/global/grain-overlay";
import { LenisProvider } from "@/components/global/lenis-provider";
import { CustomCursor } from "@/components/global/custom-cursor";
import { siteConfig } from "@/content/site-config";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  // Falls back to localhost until siteConfig.domain is set (brief: "ask me") —
  // avoids Next's metadataBase warning; update siteConfig.domain once registered.
  metadataBase: new URL(siteConfig.domain ?? "http://localhost:3000"),
  title: {
    default: `${siteConfig.name} — Web Developer & Designer, Lagos`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: siteConfig.brand,
    title: `${siteConfig.name} — Web Developer & Designer, Lagos`,
    description: siteConfig.tagline,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Web Developer & Designer, Lagos`,
    description: siteConfig.tagline,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} h-full`}>
      <body className="min-h-full bg-ink text-paper antialiased">
        <GridOverlay />
        <GrainOverlay />
        <CustomCursor />
        <LenisProvider>
          <div className="relative z-10">{children}</div>
        </LenisProvider>
      </body>
    </html>
  );
}
