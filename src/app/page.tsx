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

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SplashScreen />
      <ScrollProgress />
      <Navbar />
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
