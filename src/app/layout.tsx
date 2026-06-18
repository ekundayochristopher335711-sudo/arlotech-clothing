import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
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
    "Premium streetwear brand from Lagos, Nigeria. Bold designs influenced by Afrobeats, street culture, and the energy of the city. Shop worldwide.",
  keywords: ["streetwear", "Nigerian fashion", "Lagos", "Arlotech", "clothing brand", "Afrobeats fashion"],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Arlotech Clothing",
    title: "Arlotech Clothing | Fashion Without Limits",
    description: "Premium streetwear brand from Lagos, Nigeria.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
