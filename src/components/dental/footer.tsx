"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  Youtube,
  Send,
  ArrowUp,
  Heart,
} from "lucide-react";
import { OmdcLogo } from "./logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NAV = [
  { label: "Beranda", href: "#home" },
  { label: "Tentang", href: "#about" },
  { label: "Layanan", href: "#services" },
  { label: "Dokter", href: "#doctors" },
  { label: "Harga", href: "#pricing" },
  { label: "Kontak", href: "#booking" },
];

const SERVICES_LIST = [
  "Scaling & Polishing",
  "Pemutihan Gigi",
  "Kawat Gigi / Behel",
  "Mahkota & Gigi Palsu",
  "Root Canal",
  "Dental Kids",
  "Implant Gigi",
];

const HOURS = [
  { day: "Senin – Jumat", time: "09.00 – 21.00" },
  { day: "Sabtu", time: "09.00 – 20.00" },
  { day: "Minggu", time: "10.00 – 16.00" },
  { day: "Hari Libur", time: "Sesuai janji" },
];

export function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({
        title: "Email tidak valid",
        description: "Mohon masukkan alamat email yang benar.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Berhasil berlangganan!",
      description: "Anda akan menerima tips gigi sehat & promo eksklusif OMDC.",
    });
    setEmail("");
  };

  return (
    <footer className="relative mt-20 overflow-hidden bg-gradient-to-b from-pink-950 via-pink-950 to-rose-950 text-pink-100">
      {/* decorative blobs */}
      <div className="absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-pink-600/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-rose-600/20 blur-3xl" />

      {/* Newsletter strip */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 py-10 text-center lg:flex-row lg:justify-between lg:px-8 lg:text-left">
          <div className="max-w-md">
            <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
              Tips gigi sehat langsung ke inbox Anda
            </h3>
            <p className="mt-2 text-sm text-pink-200/80">
              Berlangganan newsletter OMDC — dapatkan panduan perawatan gigi, promo eksklusif, dan
              tips keluarga sehat.
            </p>
          </div>
          <form onSubmit={subscribe} className="flex w-full max-w-md gap-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@anda.com"
              className="flex-1 rounded-full border-white/20 bg-white/10 px-5 py-6 text-white placeholder:text-pink-200/60 focus:border-pink-400 focus:bg-white/15"
            />
            <Button
              type="submit"
              className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-6 text-white shadow-soft-pink hover:from-pink-400 hover:to-rose-400"
            >
              <Send className="h-4 w-4" />
              <span className="ml-1.5 hidden sm:inline">Langganan</span>
            </Button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="rounded-2xl bg-white/5 p-4 backdrop-blur-sm ring-1 ring-white/10">
              <OmdcLogo className="[&_span]:text-white [&_span.text-gradient-pink]:!text-white" />
              <p className="mt-4 text-sm leading-relaxed text-pink-200/80">
                Oktri Manessa Dental Clinic — klinik gigi terpercaya di Bekasi. Memberikan
                perawatan gigi modern, aman, dan ramah untuk seluruh keluarga Indonesia sejak 2015.
              </p>
              <div className="mt-5 flex gap-2">
                {[
                  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
                  { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
                  { icon: Youtube, href: "https://youtube.com", label: "YouTube" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-pink-100 transition-colors hover:bg-pink-500 hover:text-white"
                  >
                    <s.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">Navigasi</h4>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-sm text-pink-200/80 transition-colors hover:text-white"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">Layanan</h4>
            <ul className="mt-4 space-y-2.5">
              {SERVICES_LIST.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="text-sm text-pink-200/80 transition-colors hover:text-white"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Hours */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-sm font-bold uppercase tracking-wide text-white">Kontak &amp; Jam</h4>
            <ul className="mt-4 space-y-3 text-sm text-pink-200/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" />
                <span>Jl. Melati Raya No. 17, Bekasi Selatan, Jawa Barat 17141</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-pink-400" />
                <a href="tel:+6281234567890" className="hover:text-white">
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-pink-400" />
                <a href="mailto:halo@omdc-dental.id" className="hover:text-white">
                  halo@omdc-dental.id
                </a>
              </li>
              <li className="mt-4 flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-pink-400" />
                <div className="space-y-1">
                  {HOURS.map((h) => (
                    <div key={h.day} className="flex justify-between gap-3 text-xs">
                      <span className="text-pink-200/70">{h.day}</span>
                      <span className="font-medium text-white">{h.time}</span>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-pink-200/70">
            &copy; {new Date().getFullYear()} Oktri Manessa Dental Clinic (OMDC). All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-pink-200/70">
            Dibuat dengan
            <Heart className="h-3.5 w-3.5 fill-pink-500 text-pink-500" />
            di Bekasi, Indonesia
          </div>
          <a
            href="#home"
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-pink-500"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            Kembali ke atas
          </a>
        </div>
      </div>
    </footer>
  );
}
