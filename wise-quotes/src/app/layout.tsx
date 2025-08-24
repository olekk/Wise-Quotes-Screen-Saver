import Link from "next/link";
import "./globals.css";
import { Inter, EB_Garamond } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const garamond = EB_Garamond({ subsets: ["latin"], variable: "--font-serif" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${garamond.variable}`}>
      <body className="min-h-dvh bg-black text-white font-sans">
        <header className="fixed top-0 inset-x-0 p-4 flex gap-4 bg-black/60 backdrop-blur">
          <Link href="/">Intro</Link>
          <Link href="/random">Random</Link>
          <Link href="/quote/mam-0001">First</Link>
        </header>
        <main className="pt-16">{children}</main>
      </body>
    </html>
  );
}
