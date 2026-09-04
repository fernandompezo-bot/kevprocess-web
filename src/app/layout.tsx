import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kevprocess | Automation & Process",
  description: "Soluciones industriales para continuidad operacional, supervisión, integración y modernización tecnológica.",
  icons: {
    icon: [
      { url: '/icon.png' },
      { url: '/favicon.ico' }
    ],
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} scroll-smooth antialiased`}>
      <body className="min-h-screen bg-navy text-slate-200 font-sans">
        {children}
      </body>
    </html>
  );
}
