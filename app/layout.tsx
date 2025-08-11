import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navigation/Navigation";
import G3LoopMark from "./components/ui/G3LoopMark";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Genesis Parallel Protocol - Decentralized Civilization Platform",
  description: "A parallel civilizational protocol based on loop economics, decentralized autonomous governance, and memetic structures for community coordination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <Navigation />
          <main className="pt-20">
            {children}
          </main>
          <G3LoopMark />
        </AuthProvider>
      </body>
    </html>
  );
}
