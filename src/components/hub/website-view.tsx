"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/lib/app-store";
import { Navbar } from "@/components/dental/navbar";
import { Hero } from "@/components/dental/hero";
import { About } from "@/components/dental/about";
import { Services } from "@/components/dental/services";
import { Features } from "@/components/dental/features";
import { SmileGallery } from "@/components/dental/smile-gallery";
import { Doctors } from "@/components/dental/doctors";
import { Testimonials } from "@/components/dental/testimonials";
import { Pricing } from "@/components/dental/pricing";
import { FAQ } from "@/components/dental/faq";
import { Booking } from "@/components/dental/booking";
import { Footer } from "@/components/dental/footer";
import { SplashScreen } from "@/components/dental/splash-screen";
import { ScrollProgress } from "@/components/dental/loading";
import { FloatingActions } from "@/components/dental/floating-actions";
import { ChevronLeft, Smartphone } from "lucide-react";

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
        <Features />
        <SmileGallery />
        <Doctors />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Booking />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
