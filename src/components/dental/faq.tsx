"use client";

import { m } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircleQuestion, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

const FAQS = [
  {
    q: "Apakah perawatan gigi di OMDC menyakitkan?",
    a: "Tidak. Kami menggunakan teknik anestesi modern dan pendekatan minim trauma. Untuk perawatan sensitif seperti pencabutan atau root canal, kami selalu memberikan anestesi lokal yang efektif. Tim dokter juga akan komunikatif sepanjang proses — Anda bisa memberi tanda jika merasa tidak nyaman, dan perawatan akan dijeda.",
  },
  {
    q: "Berapa lama proses pemasangan behel (kawat gigi)?",
    a: "Durasi pemasangan behel bervariasi tergantung tingkat kepadatan gigi dan usia pasien. Rata-rata 12–24 bulan untuk kasus standar, dan 24–36 bulan untuk kasus kompleks. Setelah konsultasi awal, dr. Oktri akan memberikan estimasi waktu yang lebih akurat beserta rencana treatment yang detail.",
  },
  {
    q: "Apakah OMDC menerima BPJS Kesehatan?",
    a: "Ya, OMDC menerima BPJS Kesehatan untuk layanan dasar (pemeriksaan, tambal sederhana, pencabutan). Untuk perawatan spesialistik seperti behel, implant, dan veneer, tidak termasuk dalam cakupan BPJS. Kami juga bekerja sama dengan berbagai asuransi swasta seperti Allianz, Manulife, Prudential, dan BCA Life.",
  },
  {
    q: "Bagaimana sistem pembayaran di OMDC? Apakah tersedia cicilan?",
    a: "Kami menerima pembayaran tunai, kartu debit/kredit, transfer bank, dan QRIS. Untuk perawatan di atas Rp 3 juta, tersedia cicilan 0% hingga 12 bulan melalui kartu kredit bank mitra (BCA, Mandiri, BNI, CIMB Niaga). Untuk perawatan kompleks seperti implant atau orthodontic, tersedia juga opsi pembayaran bertahap sesuai kesepakatan.",
  },
  {
    q: "Apakah ada layanan gigi untuk anak-anak?",
    a: "Tentu! Kami memiliki spesialis gigi anak (drg. Adelia Putri, Sp.KGA) dan ruang khusus anak dengan suasana ramah, mainan, dan TV dengan kartun favorit. Teknik minim trauma kami membuat anak-anak merasa nyaman dan tidak takut ke dokter gigi. Disarankan kunjungan pertama sejak usia 1 tahun untuk pemeriksaan rutin.",
  },
  {
    q: "Seberapa sering saya harus kontrol/scaling gigi?",
    a: "Untuk menjaga kesehatan gusi dan gigi, kami merekomendasikan scaling setiap 6 bulan sekali untuk pasien dewasa dengan kondisi gigi normal. Pasien dengan kawat gigi, riwayat penyakit gusi, atau kebiasaan merokok disarankan setiap 3–4 bulan. Kontrol rutin membantu mencegah masalah gigi yang lebih serius dan mahal perawatannya.",
  },
  {
    q: "Apakah hasil whitening gigi permanen?",
    a: "Hasil whitening profesional OMDC dapat bertahan 1–2 tahun tergantung gaya hidup (konsumsi kopi, teh, merokok, dll). Kami menyediakan paket maintenance whitening dengan diskon khusus untuk pasien yang telah melakukan whitening sebelumnya. Untuk hasil maksimal, hindari makanan/minuman pewarna 48 jam pertama setelah perawatan.",
  },
  {
    q: "Bagaimana jika ada kasus darurat gigi di luar jam operasional?",
    a: "Untuk kasus darurat (sakit gigi hebat, gigi patah/lepas karena benturan, perdarahan), hubungi nomor darurat kami di +62 812-3456-7890 (WhatsApp aktif 24/7). Tim kami akan memberikan pertolongan pertama via telepon dan menjadwalkan kunjungan darurat pada hari yang sama jika diperlukan.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-20 lg:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-gray-50/40 to-white" />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          {/* Left header */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-pink-700">
              <HelpCircle className="h-3.5 w-3.5" />
              Pertanyaan Umum
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
              Hal yang sering
              <br />
              <span className="text-gradient-pink">ditanyakan pasien</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/65">
              Belum menemukan jawaban yang Anda cari? Tim OMDC siap membantu menjawab pertanyaan
              spesifik seputar perawatan gigi, biaya, atau jadwal janji temu. Hubungi kami via
              WhatsApp untuk respons cepat.
            </p>

            <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-500 to-rose-600 text-white">
                  <MessageCircleQuestion className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-900">Masih bingung?</div>
                  <div className="text-xs text-foreground/60">Tim kami online 7 hari seminggu</div>
                </div>
              </div>
              <Button
                asChild
                className="mt-4 w-full rounded-full bg-gradient-to-r from-pink-600 to-gray-500 text-white shadow-soft-pink hover:from-pink-700 hover:to-rose-600"
              >
                <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer">
                  <PhoneCall className="mr-2 h-4 w-4" />
                  Tanya via WhatsApp
                </a>
              </Button>
            </div>
          </m.div>

          {/* Accordion */}
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Accordion
              type="single"
              collapsible
              defaultValue="faq-0"
              className="space-y-3"
            >
              {FAQS.map((item, i) => (
                <m.div
                  key={item.q}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-soft-pink"
                >
                  <AccordionItem value={`faq-${i}`} className="border-0">
                    <AccordionTrigger className="px-5 py-4 text-left text-base font-semibold text-gray-900 hover:no-underline hover:bg-gray-50/40 [&[data-state=open]>svg]:rotate-45">
                      <span className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-700">
                          {i + 1}
                        </span>
                        <span className="leading-snug">{item.q}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="px-5 pb-5 pt-0 text-sm leading-relaxed text-foreground/70">
                      <div className="pl-9">{item.a}</div>
                    </AccordionContent>
                  </AccordionItem>
                </m.div>
              ))}
            </Accordion>
          </m.div>
        </div>
      </div>
    </section>
  );
}
