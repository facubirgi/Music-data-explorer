import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Music Data Explorer - Análisis de Artistas con Spotify",
  description: "Descubre los patrones ocultos en la discografía de tus artistas favoritos. Analiza características musicales como energía, bailabilidad y positividad.",
  keywords: ["spotify", "music analysis", "data visualization", "audio features"],
  authors: [{ name: "Music Data Explorer" }],
  openGraph: {
    title: "Music Data Explorer",
    description: "Analiza la música de tus artistas favoritos con visualizaciones de datos",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
