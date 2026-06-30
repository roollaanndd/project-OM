import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { PwaController } from "@/components/pwa/pwa-controller";
import { ClientProviders } from "@/components/shared/client-providers";
import { Analytics } from "@/components/shared/analytics";

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

const SITE_URL = "https://omdc-dental.id";
const SITE_NAME = "OMDC — Oktri Manessa Dental Clinic";
const SITE_DESCRIPTION =
  "OMDC (Oktri Manessa Dental Clinic) — klinik gigi modern dengan booking online, rekam medis digital, pembayaran cashless, dan loyalty rewards. Your Smile, Our Passion.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s · OMDC",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "OMDC",
    "Oktri Manessa Dental Clinic",
    "klinik gigi",
    "dokter gigi",
    "scaling gigi",
    "behel gigi",
    "whitening gigi",
    "dental clinic Indonesia",
    "booking dokter gigi online",
    "rekam medis digital",
    "implant gigi",
  ],
  authors: [{ name: "Oktri Manessa Dental Clinic", url: SITE_URL }],
  creator: "OMDC",
  publisher: "OMDC",
  applicationName: "OMDC",
  formatDetection: { telephone: false, address: false, email: false },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
    languages: {
      "id-ID": "/",
      "x-default": "/",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.svg"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "OMDC",
    startupImage: ["/icons/apple-touch-icon.png"],
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: "OMDC",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/icons/og-image.png",
        width: 1200,
        height: 630,
        alt: "OMDC — Oktri Manessa Dental Clinic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/icons/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "google-site-verification-token-here",
  },
  category: "health",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#DB2777" },
    { media: "(prefers-color-scheme: dark)", color: "#9D174D" },
  ],
  colorScheme: "light",
};

// JSON-LD structured data: dental clinic + website
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Dentist",
      "@id": `${SITE_URL}/#organization`,
      name: "Oktri Manessa Dental Clinic",
      alternateName: "OMDC",
      description: SITE_DESCRIPTION,
      slogan: "Your Smile, Our Passion",
      url: SITE_URL,
      logo: `${SITE_URL}/icons/icon-512.png`,
      image: `${SITE_URL}/icons/og-image.png`,
      telephone: "+62-812-3456-7890",
      email: "halo@omdc-dental.id",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Melati Raya No. 17",
        addressLocality: "Bekasi Selatan",
        addressRegion: "Jawa Barat",
        postalCode: "17141",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -6.2839,
        longitude: 106.9756,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "21:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "20:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Sunday",
          opens: "10:00",
          closes: "16:00",
        },
      ],
      priceRange: "Rp 200.000 - Rp 18.000.000",
      paymentAccepted: "Cash, Credit Card, Debit Card, GoPay, OVO, DANA, QRIS, BPJS",
      currenciesAccepted: "IDR",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "2400",
        bestRating: "5",
      },
      sameAs: [
        "https://instagram.com/omdc.dental",
        "https://facebook.com/omdc.dental",
        "https://wa.me/6281234567890",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "OMDC",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "id-ID",
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebApplication",
      name: "OMDC Patient App",
      applicationCategory: "HealthApplication",
      operatingSystem: "Web, iOS, Android",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "IDR",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="application-name" content="OMDC" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="OMDC" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#DB2777" />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="mask-icon" href="/favicon.svg" color="#DB2777" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ClientProviders>{children}</ClientProviders>
        {/* ARIA live region for screen reader announcements */}
        <div id="aria-live-region" aria-live="polite" className="sr-only" role="status" />
        <Toaster />
        <PwaController />
        <Analytics />
      </body>
    </html>
  );
}
