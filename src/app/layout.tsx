import type { Metadata } from "next";
import { localFont } from "next/font/local";
import "./globals.css";

// Títulos: Cinzel Decorative Bold
const cinzelDecorative = localFont({
  src: [
    {
      path: "../fonts/CinzelDecorative-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/CinzelDecorative-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cinzel-decorative",
});

// Subtítulos: Cinzel Bold
const cinzel = localFont({
  src: [
    {
      path: "../fonts/Cinzel-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/Cinzel-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cinzel",
});

// Texto normal: Cormorant Garamond
const cormorantGaramond = localFont({
  src: [
    {
      path: "../fonts/CormorantGaramond-VariableFont_wght.ttf",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../fonts/CormorantGaramond-Italic-VariableFont_wght.ttf",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Monster Pack Opening",
  description: "Open monster packs with authenticated Supabase sessions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzelDecorative.variable} ${cinzel.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
