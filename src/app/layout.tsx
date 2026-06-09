import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";

const geistSans = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "CineSearch | Discover Movies",
  description: "A cinematic movie search application powered by TMDB.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white min-h-screen`}
      >
        <Providers>
          <Header />
          <main className="pt-24 min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
