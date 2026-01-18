import type { Metadata, Viewport } from "next";
import { Syncopate, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-syncopate",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: 'KINETIC | The Anti-Gym',
  description: 'A brutalist, high-performance training facility designed for biological optimization.',
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'KINETIC | The Anti-Gym',
    description: 'Biological optimization facility. Dark, raw, and focused.',
    url: 'https://kineticgym.netlify.app',
    siteName: 'KINETIC',
    images: [
      {
        url: '/preview.jpg', // <--- Points to public/preview.jpg
        width: 1200,
        height: 630,
        alt: 'KINETIC Facility Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KINETIC | The Anti-Gym',
    description: 'Biological optimization facility.',
    images: ['/preview.jpg'], // <--- Same image for Twitter cards
  },
};

export const viewport: Viewport = {
  themeColor: '#CCFF00',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syncopate.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-black text-white selection:bg-accent selection:text-black">
        <SmoothScroll>
          <CustomCursor />
          <Navbar />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}