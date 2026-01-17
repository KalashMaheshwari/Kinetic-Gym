import type { Metadata } from "next";
import { Syncopate } from "next/font/google"; // Import Syncopate
import localFont from "next/font/local";
import "./globals.css";
import "@fontsource/unifrakturmaguntia";
import "@fontsource/jetbrains-mono";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";

// Configure Syncopate
const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"], // Syncopate only comes in these weights
  variable: "--font-syncopate",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: 'KINETIC | The Anti-Gym',
  description: 'A brutalist, high-performance training facility designed for biological optimization.',
  icons: {
    icon: '/icon.png', // Make sure you actually have a favicon!
  },
  themeColor: '#CCFF00',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // Add syncopate.variable to the class list here
        className={`${geistSans.variable} ${geistMono.variable} ${syncopate.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}