import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "./posts-data";
import { BlogFeatured, BlogCard, BlogHero } from "./blog-components";

export const metadata: Metadata = {
  title: "Blog Kesehatan Gigi OMDC — Tips, Panduan & Informasi Dental",
  description:
    "Blog OMDC: panduan scaling, behel, whitening, implant, tips gigi anak, dan kesehatan mulut. Artikel oleh dokter gigi spesialis bersertifikat.",
  alternates: { canonical: "/blog" },
  keywords: [
    "blog klinik gigi",
    "tips gigi sehat",
    "panduan scaling",
    "behel gigi",
    "whitening",
    "implant gigi",
    "kesehatan gigi",
  ],
  openGraph: {
    title: "Blog Kesehatan Gigi OMDC",
    description: "Tips, panduan, dan informasi dental oleh dokter gigi spesialis OMDC.",
    images: [{ url: "/icons/og-image.png", width: 1200, height: 630 }],
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);
  const categories = [...new Set(posts.map((p) => p.category))];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-12 lg:pt-32">
        <div className="absolute inset-0 -z-10 mesh-gradient-animated" />
        <div className="mx-auto max-w-5xl px-5 text-center lg:px-8">
          <BlogHero />

          {/* Category pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${encodeURIComponent(cat)}`}
                className="glass rounded-full px-4 py-1.5 text-xs font-bold text-pink-700 hover:bg-white/80"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured article */}
      {featured && (
        <section className="mx-auto max-w-5xl px-5 pb-12 lg:px-8">
          <BlogFeatured post={featured} />
        </section>
      )}

      {/* All articles grid */}
      <section className="mx-auto max-w-5xl px-5 pb-16 lg:px-8">
        <h2 className="mb-6 font-display text-2xl font-bold text-pink-950">Semua Artikel</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-5 pb-20 lg:px-8">
        <div className="glass relative overflow-hidden rounded-3xl p-8 text-center shadow-soft-pink">
          <h2 className="font-display text-2xl font-extrabold text-pink-950">
            Punya pertanyaan tentang kesehatan gigi?
          </h2>
          <p className="mt-2 text-sm text-foreground/65">
            Konsultasi gratis dengan dokter gigi spesialis OMDC. Tim kami siap membantu.
          </p>
          <Link
            href="/#booking"
            className="btn-magnetic mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-3 text-sm font-bold text-white shadow-soft-pink"
          >
            Buat Janji Konsultasi
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
