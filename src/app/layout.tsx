import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Arlotech Clothing | Fashion Without Limits",
    template: "%s | Arlotech Clothing",
  },
  description:
    "Premium fashion brand offering luxury ready-to-wear clothing, accessories, and footwear. Handcrafted pieces designed to transcend seasons. Shop worldwide with free shipping over $150.",
  keywords: [
    "luxury fashion",
    "premium clothing",
    "designer wear",
    "streetwear",
    "menswear",
    "womenswear",
    "accessories",
    "Arlotech",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Arlotech Clothing",
    title: "Arlotech Clothing | Fashion Without Limits",
    description:
      "Premium fashion brand offering luxury ready-to-wear clothing, accessories, and footwear.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arlotech Clothing | Fashion Without Limits",
    description:
      "Premium fashion brand offering luxury ready-to-wear clothing, accessories, and footwear.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
