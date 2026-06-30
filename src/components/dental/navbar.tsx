"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Phone, CalendarCheck, Smartphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { OmdcLogo } from "./logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useFocusTrap, useEscapeKey } from "@/lib/hooks/use-a11y";

const NAV_ITEMS = [
  { label: "Beranda", href: "#home" },
  { label: "Tentang", href: "/tentang" },
  { label: "Layanan", href: "/layanan" },
  { label: "Dokter", href: "/dokter" },
  { label: "Blog", href: "/blog" },
  { label: "Harga", href: "#pricing" },
  { label: "Kontak", href: "/kontak" },
];

export function Navbar() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Accessibility: focus trap + escape key for mobile drawer
  useFocusTrap(drawerRef, open);
  useEscapeKey(() => setOpen(false), open);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-100"
          : "bg-white shadow-sm",
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 lg:px-8">
        <a href="#home" aria-label="OMDC Beranda" className="transition-transform hover:scale-[1.02]">
          <OmdcLogo showSubtitle />
        </a>

        {/* Desktop menu */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-gray-700 hover:bg-primary/5"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="tel:+6281234567890"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/70 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Phone className="h-4 w-4" />
            +62 812-3456-7890
          </a>
          <button
            onClick={() => router.push("/app")}
            className="inline-flex items-center gap-1.5 rounded-full border border-fuchsia-200 bg-fuchsia-50/80 px-4 py-2 text-sm font-semibold text-fuchsia-700 transition-colors hover:bg-fuchsia-100 dark:border-fuchsia-800 dark:bg-fuchsia-950/40 dark:text-fuchsia-300"
          >
            <Smartphone className="h-4 w-4" />
            Patient App
          </button>
          <ThemeToggle />
          <Button asChild size="sm" className="rounded-full bg-gradient-to-r from-pink-600 to-gray-500 px-5 text-white shadow-soft-pink hover:from-pink-700 hover:to-pink-600">
            <a href="#booking">
              <CalendarCheck className="mr-1.5 h-4 w-4" />
              Buat Janji
            </a>
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white/80 text-gray-700 lg:hidden"
          onClick={() => setOpen(true)}
          aria-label="Buka menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-gray-900/30 backdrop-blur-sm transition-opacity duration-300",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu navigasi mobile"
          className={cn(
            "absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-out",
            open ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <OmdcLogo showSubtitle size="sm" />
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 text-gray-700"
              onClick={() => setOpen(false)}
              aria-label="Tutup menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <ul className="flex flex-col gap-1 p-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-2xl px-4 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-gray-50 hover:text-gray-700"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-2 space-y-2 px-4">
            <button
              onClick={() => {
                router.push("/app");
                setOpen(false);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-fuchsia-200 bg-fuchsia-50/80 px-4 py-3 text-sm font-semibold text-fuchsia-700"
            >
              <Smartphone className="h-4 w-4" />
              Buka Patient App
            </button>
            <a
              href="tel:+6281234567890"
              className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700"
            >
              <Phone className="h-4 w-4" />
              +62 812-3456-7890
            </a>
            <Button asChild className="w-full rounded-2xl bg-gradient-to-r from-pink-600 to-gray-500 text-white shadow-soft-pink">
              <a href="#booking" onClick={() => setOpen(false)}>
                <CalendarCheck className="mr-2 h-4 w-4" />
                Buat Janji Sekarang
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
