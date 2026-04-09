import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Lucas & Amanda se casam",
  description: "Celebração do Sacramento do Matrimônio de Lucas e Amanda. Ofereça um terço e contribua com nossa caminhada.",
  authors: [{ name: "Lucas & Amanda" }],
  openGraph: {
    title: "Lucas & Amanda — Casamento Católico",
    description: "Celebração do Sacramento do Matrimônio. Ofereça um terço e participe do nosso ElevadorParaDois.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${cormorant.variable} ${lato.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
