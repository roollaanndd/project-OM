import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OMDC — Oktri Manessa Dental Clinic | Your Smile, Our Passion",
  description:
    "OMDC (Oktri Manessa Dental Clinic) menghadirkan perawatan gigi modern, aman, dan nyaman. Layanan scaling, behel, gigi palsu, whitening, dan perawatan kanal akar oleh dokter gigi berpengalaman.",
  keywords: [
    "OMDC",
    "Oktri Manessa Dental Clinic",
    "klinik gigi",
    "dokter gigi",
    "scaling gigi",
    "behel gigi",
    "whitening gigi",
    "dental clinic Indonesia",
    "perawatan gigi",
  ],
  authors: [{ name: "Oktri Manessa Dental Clinic" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "OMDC — Oktri Manessa Dental Clinic",
    description: "Your Smile, Our Passion. Perawatan gigi modern, aman, dan nyaman.",
    siteName: "OMDC",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "OMDC — Oktri Manessa Dental Clinic",
    description: "Your Smile, Our Passion.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
