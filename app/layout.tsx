import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { GlossaryProvider, initialGlossaryTerms } from "@/contexts/GlossaryContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0D0F14',
};

export const metadata: Metadata = {
  title: "Genesis Parallel Protocol - Decentralized Civilization Platform",
  description: "A parallel civilizational protocol based on loop economics, decentralized autonomous governance, and memetic structures for community coordination",
  icons: {
    icon: '/golden-rings-logo.svg',
    shortcut: '/golden-rings-logo.svg',
    apple: '/golden-rings-logo.svg',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Genesis Protocol',
  },
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
          <GlossaryProvider initialTerms={initialGlossaryTerms}>
            <MainLayout>
              {children}
            </MainLayout>
          </GlossaryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
