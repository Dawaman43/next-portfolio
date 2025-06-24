import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Welcome from "@/components/Welcome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dawit Worku",
  description:
    "Dawit Worku Jima — Full-Stack Developer Portfolio, showcasing React, Next.js, TypeScript projects and contact info.",
  icons: {
    icon: "/d-favicon.png",
  },
  openGraph: {
    title: "Dawit Worku",
    description:
      "Full-Stack Developer Portfolio showcasing React, Next.js, and TypeScript projects.",
    url: "https://dawitportfoli.netlify.app",
    siteName: "Dawit Worku",
    images: [
      {
        url: "/d-image.png",
        width: 1200,
        height: 630,
        alt: "Dawit Worku Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dawit Worku",
    description:
      "Full-Stack Developer Portfolio showcasing React, Next.js, and TypeScript projects.",
    images: ["/d-image.png"],
  },
  other: {
    "google-site-verification": "gH9AlvW45Q5hop0S8xJIwbXK46fgRsmptz1UqeP6WyU",
  },
};


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
       
        <Welcome />
        {children}
      </body>
    </html>
  );
}
