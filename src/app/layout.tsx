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
 description: "Dawit Worku — Full-Stack Developer Portfolio, showcasing React, Next.js, TypeScript projects and contact info.",

  other: {
    "google-site-verification": "gH9AlvW45Q5hop0S8xJIwbXK46fgRsmptz1UqeP6WyU" 
  },
   icons: {
    icon: "/d-favicon.png",
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
