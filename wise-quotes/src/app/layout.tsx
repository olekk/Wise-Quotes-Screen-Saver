"use client";
import Link from "next/link";
import "./globals.css";
import { Inter, EB_Garamond } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const garamond = EB_Garamond({ subsets: ["latin"], variable: "--font-serif" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuHidden, setIsMenuHidden] = useState(true);

  return (
    <html lang="en" className={`${inter.variable} ${garamond.variable}`}>
      <body className="min-h-dvh bg-black text-white font-sans">
        <div
          onMouseEnter={() => setIsMenuHidden(false)}
          className="fixed top-0 w-[100px] h-[100vh]"
        ></div>
        <header
          onMouseLeave={() => setIsMenuHidden(true)}
          className="fixed top-0 inset-x-0 p-4 flex flex-col gap-4 bg-white/60 backdrop-blur w-[250px] h-[100vh] transition-all"
          style={{ left: isMenuHidden ? "-250px" : "0" }}
        >
          <Link href="/">Intro</Link>
          <Link href="/random">Random</Link>
          <Link href="/quote/mam-0001">First</Link>
        </header>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
