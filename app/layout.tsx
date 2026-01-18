import type { Metadata, Viewport } from "next";
import { Syncopate, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/layout/Navbar";

// 1. Display Font (Headlines)
const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-syncopate",
  display: "swap",
});

// 2. Primary Font (Body/UI) - Optimized Google Load
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrains",
  display: "swap",
});

// 2. Keep standard metadata here (Title, Description, Icons)
export const metadata: Metadata = {
  title: 'KINETIC | The Anti-Gym',
  description: 'A brutalist, high-performance training facility designed for biological optimization.',
  icons: {
    icon: '/icon.png',
  },
  // REMOVE themeColor from here
};

// 3. Add this new Viewport export
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