"use client";

import { lazy, Suspense } from "react";
import { useAppStore } from "@/lib/app-store";
import { Navbar } from "@/components/dental/navbar";
import { Hero } from "@/components/dental/hero";
import { HeroV2 } from "@/components/dental/hero-v2";
import { About } from "@/components/dental/about";
import { Services } from "@/components/dental/services";
import { SplashScreen } from "@/components/dental/splash-screen";
import { ScrollProgress } from "@/components/dental/loading";
import { FloatingActions } from "@/components/dental/floating-actions";
import { SectionSkeleton } from "@/components/shared/skeletons";

// Lazy-load below-the-fold sections for faster initial render
const Features = lazy(() => import("@/components/dental/features").then((m) => ({ default: m.Features })));
const SmileGallery = lazy(() => import("@/components/dental/smile-gallery").then((m) => ({ default: m.SmileGallery })));
const Doctors = lazy(() => import("@/components/dental/doctors").then((m) => ({ default: m.Doctors })));
const Testimonials = lazy(() => import("@/components/dental/testimonials").then((m) => ({ default: m.Testimonials })));
const Pricing = lazy(() => import("@/components/dental/pricing").then((m) => ({ default: m.Pricing })));
const FAQ = lazy(() => import("@/components/dental/faq").then((m) => ({ default: m.FAQ })));
const Booking = lazy(() => import("@/components/dental/booking").then((m) => ({ default: m.Booking })));
const Footer = lazy(() => import("@/components/dental/footer").then((m) => ({ default: m.Footer })));

/**
 * Shared layout for ALL website pages.
 * Every page in the (website) route group automatically gets:
 * - Splash screen
 * - Scroll progress bar
 * - Navbar (sticky)
 * - Footer
 * - Floating actions (WhatsApp + scroll-to-top)
 */
export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const { appVersion } = useAppStore();
  const isV2 = appVersion === "v2.0.0";

  return (
    <div className={isV2 ? "relative flex min-h-screen flex-col bg-white" : "relative flex min-h-screen flex-col bg-background"}>
      <SplashScreen />
      <ScrollProgress />
      <Navbar />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <FloatingActions />
    </div>
  );
}

/**
 * Home page content (used by (website)/page.tsx)
 * Exported here so it can be imported by the page without duplication.
 */
export function WebsiteHome() {
  const { appVersion } = useAppStore();
  const isV2 = appVersion === "v2.0.0";

  return (
    <>
      {isV2 ? <HeroV2 /> : <Hero />}
      <About />
      <Services />
      <Suspense fallback={<SectionSkeleton />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <SmileGallery />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Doctors />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <FAQ />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Booking />
      </Suspense>
    </>
  );
}
