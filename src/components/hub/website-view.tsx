"use client";

import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { Navbar } from "@/components/dental/navbar";
import { Hero } from "@/components/dental/hero";
import { About } from "@/components/dental/about";
import { Services } from "@/components/dental/services";
import { SplashScreen } from "@/components/dental/splash-screen";
import { ScrollProgress } from "@/components/dental/loading";
import { FloatingActions } from "@/components/dental/floating-actions";
import { ChevronLeft, Smartphone } from "lucide-react";

// Lazy-load below-the-fold sections for faster initial render
const Features = lazy(() => import("@/components/dental/features").then((m) => ({ default: m.Features })));
const SmileGallery = lazy(() => import("@/components/dental/smile-gallery").then((m) => ({ default: m.SmileGallery })));
const Doctors = lazy(() => import("@/components/dental/doctors").then((m) => ({ default: m.Doctors })));
const Testimonials = lazy(() => import("@/components/dental/testimonials").then((m) => ({ default: m.Testimonials })));
const Pricing = lazy(() => import("@/components/dental/pricing").then((m) => ({ default: m.Pricing })));
const FAQ = lazy(() => import("@/components/dental/faq").then((m) => ({ default: m.FAQ })));
const Booking = lazy(() => import("@/components/dental/booking").then((m) => ({ default: m.Booking })));
const Footer = lazy(() => import("@/components/dental/footer").then((m) => ({ default: m.Footer })));

function SectionSkeleton() {
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto h-6 w-48 animate-pulse rounded-full bg-pink-100" />
        <div className="mx-auto mt-4 h-10 w-72 animate-pulse rounded-full bg-pink-100" />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 animate-pulse rounded-3xl bg-pink-100" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function WebsiteView() {
  const { setView } = useAppStore();

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SplashScreen />
      <ScrollProgress />
      <Navbar />

      {/* Floating back-to-hub button */}
      <motion.button
        onClick={() => setView("hub")}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 220 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full bg-pink-950 px-4 py-2.5 text-xs font-bold text-white shadow-soft-pink backdrop-blur"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        Hub
        <span className="mx-1 h-3 w-px bg-white/30" />
        <Smartphone className="h-3.5 w-3.5" />
        App
      </motion.button>

      <main className="flex-1">
        <Hero />
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
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <FloatingActions />
    </div>
  );
}
