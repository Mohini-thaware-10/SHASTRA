import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope, Sora } from "next/font/google";
import type { ReactNode } from "react";

import { MotionProvider } from "@/components/providers/motion-provider";
import { brand } from "@/config/brand";

import "./globals.css";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const title = "SHATRA — Learn Beyond Limits.";
const description =
  "A premium learning universe for Class 1–12, shaped around each student's pace, curiosity and potential.";

export const metadata: Metadata = {
  title: {
    default: title,
    template: "%s · SHATRA",
  },
  description,
  applicationName: brand.name,
  keywords: [
    "SHATRA",
    "personalised learning",
    "AI learning companion",
    "Class 1 to 12",
    "adaptive learning",
    "education platform",
  ],
  category: "education",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: brand.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fbf8f2",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${manrope.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-plum focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
