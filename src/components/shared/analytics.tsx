/**
 * Analytics components for OMDC.
 * Includes: Google Analytics 4, Meta Pixel, Google Ads conversion tracking.
 *
 * All IDs are read from environment variables.
 * Scripts only load when IDs are present (no-op in development).
 */

import Script from "next/script";

export function Analytics() {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;

  return (
    <>
      {/* Google Analytics 4 */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_title: document.title,
                page_location: window.location.href,
                send_page_view: true,
              });
            `}
          </Script>
        </>
      )}

      {/* Google Ads (conversion tracking) */}
      {GOOGLE_ADS_ID && (
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
      )}

      {/* Meta (Facebook) Pixel */}
      {META_PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* Structured data: WebSite + Organization (for SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                name: "Oktri Manessa Dental Clinic",
                alternateName: "OMDC",
                url: "https://omdc-dental.id",
                logo: "https://omdc-dental.id/icons/icon-512.png",
                sameAs: [
                  "https://instagram.com/omdc.dental",
                  "https://facebook.com/omdc.dental",
                  "https://wa.me/6281234567890",
                ],
              },
              {
                "@type": "WebSite",
                url: "https://omdc-dental.id",
                name: "OMDC",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://omdc-dental.id/blog?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
            ],
          }),
        }}
      />
    </>
  );
}

/**
 * Track a conversion event (for Google Ads / Meta Pixel).
 * Call this when user completes booking, payment, etc.
 */
export function trackConversion(eventName: string, value?: number, currency = "IDR") {
  if (typeof window === "undefined") return;

  // Google Analytics
  if (typeof (window as any).gtag === "function") {
    (window as any).gtag("event", eventName, {
      value: value,
      currency: currency,
    });
  }

  // Meta Pixel
  if (typeof (window as any).fbq === "function") {
    if (eventName === "booking_complete") {
      (window as any).fbq("track", "Lead", { value: value, currency: currency });
    } else if (eventName === "payment_complete") {
      (window as any).fbq("track", "Purchase", { value: value, currency: currency });
    } else {
      (window as any).fbq("trackCustom", eventName, { value: value, currency: currency });
    }
  }
}
