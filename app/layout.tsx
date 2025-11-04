'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');

  return (
    <html lang="en">
      <head>
        <title>GameWave - Discover Live Gaming Streams</title>
        <meta name="description" content="Watch the best gaming streams on Twitch. Discover live gameplay, esports, and creative content from your favorite streamers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col`}>
        {!isAuthPage && <Navbar />}
        <main className="flex-1">
          {children}
        </main>
        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}
