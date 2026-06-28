import { Navbar } from "@/components/dental/navbar";
import { Hero } from "@/components/dental/hero";
import { About } from "@/components/dental/about";
import { Services } from "@/components/dental/services";
import { Features } from "@/components/dental/features";
import { Doctors } from "@/components/dental/doctors";
import { Testimonials } from "@/components/dental/testimonials";
import { Pricing } from "@/components/dental/pricing";
import { Booking } from "@/components/dental/booking";
import { Footer } from "@/components/dental/footer";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Features />
        <Doctors />
        <Testimonials />
        <Pricing />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}
